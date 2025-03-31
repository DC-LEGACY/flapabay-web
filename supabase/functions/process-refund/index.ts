
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

    const { tripId, action, adminNotes } = await req.json();

    if (!tripId || !action) {
      throw new Error("Trip ID and action are required");
    }

    if (action !== 'approve' && action !== 'reject') {
      throw new Error("Action must be either 'approve' or 'reject'");
    }

    // Get trip details
    const { data: trip, error: tripError } = await supabaseClient
      .from('trips')
      .select(`
        *,
        property:property_id(title)
      `)
      .eq('id', tripId)
      .single();

    if (tripError) {
      throw tripError;
    }

    // Update the refund status
    const updateData = {
      refund_status: action === 'approve' ? 'completed' : 'rejected',
      refund_admin_notes: adminNotes
    };

    const { error: updateError } = await supabaseClient
      .from('trips')
      .update(updateData)
      .eq('id', tripId);

    if (updateError) {
      throw updateError;
    }

    // Get conversation between guest and host
    const { data: conversation, error: conversationError } = await supabaseClient
      .from('conversations')
      .select('id')
      .eq('guest_id', trip.user_id)
      .eq('property_id', trip.property_id)
      .single();

    if (conversationError && conversationError.code !== 'PGRST116') {
      throw conversationError;
    }

    // If conversation exists, send a refund status message
    if (conversation) {
      // Get property host ID
      const { data: property, error: propertyError } = await supabaseClient
        .from('properties')
        .select('host_id')
        .eq('id', trip.property_id)
        .single();

      if (propertyError && propertyError.code !== 'PGRST116') {
        console.error("Error fetching property:", propertyError);
      }

      if (property) {
        // Prepare message based on action
        let message;
        if (action === 'approve') {
          message = `Your refund request for ${trip.property.title} has been approved. The refund of $${trip.refund_amount} will be processed to your original payment method within 3-5 business days.`;
        } else {
          message = `Your refund request for ${trip.property.title} has been declined. ${adminNotes ? `Reason: ${adminNotes}` : 'Please contact customer support for more information.'}`;
        }

        const { data: messageData, error: messageError } = await supabaseClient
          .from('messages')
          .insert({
            conversation_id: conversation.id,
            sender_id: 'system',
            receiver_id: trip.user_id,
            content: message,
          })
          .select()
          .single();

        if (messageError) {
          console.error("Error sending refund message:", messageError);
        } else {
          console.log("Refund message sent successfully:", messageData);

          // Notify host
          const hostMessage = `A refund for booking at ${trip.property.title} has been ${action === 'approve' ? 'approved' : 'rejected'}.`;

          await supabaseClient
            .from('messages')
            .insert({
              conversation_id: conversation.id,
              sender_id: 'system',
              receiver_id: property.host_id,
              content: hostMessage,
            });
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Refund ${action === 'approve' ? 'approved' : 'rejected'} successfully` 
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  } catch (error) {
    console.error("Error processing refund:", error);
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
