
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { messageId } = await req.json();

    // Get message details with expanded relations
    const { data: message, error: messageError } = await supabaseClient
      .from('messages')
      .select(`
        *,
        sender: sender_id(id, email),
        receiver: receiver_id(id, email)
      `)
      .eq('id', messageId)
      .single();

    if (messageError) {
      throw messageError;
    }

    // Get conversation details
    const { data: conversation, error: conversationError } = await supabaseClient
      .from('conversations')
      .select(`
        *,
        property: property_id(title, location)
      `)
      .eq('id', message.conversation_id)
      .single();

    if (conversationError) {
      throw conversationError;
    }

    // Get sender profile for better personalization
    const { data: senderProfile, error: senderProfileError } = await supabaseClient
      .from('profiles')
      .select('first_name, last_name')
      .eq('id', message.sender.id)
      .single();

    if (senderProfileError && senderProfileError.code !== 'PGRST116') {
      console.error("Error fetching sender profile:", senderProfileError);
    }

    const senderName = senderProfile 
      ? `${senderProfile.first_name || ''} ${senderProfile.last_name || ''}`.trim() || message.sender.email
      : message.sender.email;

    // Check message type to customize notification
    const isBookingRequest = message.content.includes('Booking Request');
    const isBookingApproval = message.content.includes('I\'ve approved your booking request');
    const isBookingRejection = message.content.includes('I\'m unable to approve your booking request');
    const isBookingCancellation = message.content.includes('cancelled my reservation');
    const isCheckInReminder = message.content.includes('check-in code is');
    const isCheckOutReminder = message.content.includes('Your stay ends soon');
    
    // Build appropriate email subject and body
    let emailSubject, emailBody;
    
    if (isBookingRequest) {
      emailSubject = `Booking Request from ${senderName}`;
      emailBody = `
        Hello,
        
        You have received a booking request from ${senderName}:
        
        "${message.content}"
        
        Please log into your FlapaBay account to respond to this request.
        
        Best regards,
        The FlapaBay Team
      `;
    } else if (isBookingApproval) {
      emailSubject = `Your Booking Has Been Approved`;
      emailBody = `
        Hello,
        
        Great news! ${senderName} has approved your booking request:
        
        "${message.content}"
        
        Please log into your FlapaBay account to complete the payment.
        
        Best regards,
        The FlapaBay Team
      `;
    } else if (isBookingRejection) {
      emailSubject = `Your Booking Request Was Declined`;
      emailBody = `
        Hello,
        
        We're sorry to inform you that ${senderName} was unable to approve your booking request:
        
        "${message.content}"
        
        Please check your FlapaBay account to explore other available properties.
        
        Best regards,
        The FlapaBay Team
      `;
    } else if (isBookingCancellation) {
      emailSubject = `Booking Cancellation Notice`;
      emailBody = `
        Hello,
        
        ${senderName} has cancelled a reservation:
        
        "${message.content}"
        
        Please log into your FlapaBay account for more details.
        
        Best regards,
        The FlapaBay Team
      `;
    } else if (isCheckInReminder) {
      emailSubject = `Check-In Reminder for Your Stay`;
      emailBody = `
        Hello,
        
        This is a reminder about your upcoming check-in:
        
        "${message.content}"
        
        Please keep this code safe and use it when you arrive.
        
        Best regards,
        The FlapaBay Team
      `;
    } else if (isCheckOutReminder) {
      emailSubject = `Check-Out Reminder for Your Stay`;
      emailBody = `
        Hello,
        
        Your stay is coming to an end soon:
        
        "${message.content}"
        
        Please check out before the designated time.
        
        Best regards,
        The FlapaBay Team
      `;
    } else {
      emailSubject = `New message from ${senderName}`;
      emailBody = `
        Hello,
        
        You have received a new message from ${senderName}:
        
        "${message.content}"
        
        ${conversation.property ? `Regarding: ${conversation.property.title} in ${conversation.property.location}` : ''}
        
        Login to your FlapaBay account to respond.
        
        Best regards,
        The FlapaBay Team
      `;
    }

    console.log(`Would send email to: ${message.receiver.email}`);
    console.log(`Subject: ${emailSubject}`);
    console.log(`Body: ${emailBody}`);

    // Update the trips table if this is a booking status change message
    if (isBookingApproval && conversation.property_id) {
      try {
        // Find trip by property_id that's pending
        const { data: trips } = await supabaseClient
          .from('trips')
          .select('id')
          .eq('property_id', conversation.property_id)
          .eq('status', 'pending')
          .eq('user_id', message.receiver.id)
          .limit(1);
        
        if (trips && trips.length > 0) {
          // Update the trip status to confirmed
          await supabaseClient
            .from('trips')
            .update({ status: 'confirmed' })
            .eq('id', trips[0].id);
            
          console.log(`Updated trip ${trips[0].id} status to confirmed`);
        }
      } catch (error) {
        console.error("Error updating trip status:", error);
      }
    }
    
    // For check-in reminders, set check-in code
    if (isCheckInReminder && conversation.property_id) {
      try {
        const checkInCodeMatch = message.content.match(/check-in code is \[(\d+)\]/);
        if (checkInCodeMatch && checkInCodeMatch[1]) {
          const checkInCode = checkInCodeMatch[1];
          
          // Find trip for this guest and property
          const { data: trips } = await supabaseClient
            .from('trips')
            .select('id')
            .eq('property_id', conversation.property_id)
            .eq('user_id', message.receiver.id)
            .eq('status', 'confirmed')
            .limit(1);
            
          if (trips && trips.length > 0) {
            // Update the trip with check-in code
            await supabaseClient
              .from('trips')
              .update({ check_in_code: checkInCode })
              .eq('id', trips[0].id);
              
            console.log(`Set check-in code ${checkInCode} for trip ${trips[0].id}`);
          }
        }
      } catch (error) {
        console.error("Error setting check-in code:", error);
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  } catch (error) {
    console.error("Error sending notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  }
});
