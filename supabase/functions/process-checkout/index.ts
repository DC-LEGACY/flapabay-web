
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

    const { tripId } = await req.json();

    if (!tripId) {
      throw new Error("Trip ID is required");
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

    // Update the trip as checked out and completed
    const { error: updateError } = await supabaseClient
      .from('trips')
      .update({ 
        has_checked_out: true,
        status: 'completed'
      })
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

    // If conversation exists, send a checkout confirmation message
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
        // Send checkout message
        const message = `${trip.property.title}: Thank you for your stay! Your checkout has been processed successfully. We hope you enjoyed your trip and would love to hear your feedback.`;

        const { data: messageData, error: messageError } = await supabaseClient
          .from('messages')
          .insert({
            conversation_id: conversation.id,
            sender_id: property.host_id,
            receiver_id: trip.user_id,
            content: message,
          })
          .select()
          .single();

        if (messageError) {
          console.error("Error sending checkout message:", messageError);
        } else {
          console.log("Checkout message sent successfully:", messageData);

          // Send notification to host
          const hostMessage = `${trip.property.title}: Your guest has checked out. The property is now ready for cleaning and your next guests.`;

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
        message: "Checkout processed successfully" 
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  } catch (error) {
    console.error("Error processing checkout:", error);
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
