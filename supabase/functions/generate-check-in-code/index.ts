
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

    // Generate a random 4-digit check-in code
    const checkInCode = Math.floor(1000 + Math.random() * 9000).toString();

    // Update the trip with the check-in code
    const { error: updateError } = await supabaseClient
      .from('trips')
      .update({ check_in_code: checkInCode })
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

    // If conversation exists, send a message with the check-in code
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
        // Send message with check-in code
        const message = `Your check-in code is [${checkInCode}]. Please use this code upon arrival at ${trip.property.title}. Valid until check-out date.`;

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
          console.error("Error sending check-in message:", messageError);
        } else {
          console.log("Check-in message sent successfully:", messageData);
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        checkInCode,
        message: "Check-in code generated and sent successfully" 
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  } catch (error) {
    console.error("Error generating check-in code:", error);
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
