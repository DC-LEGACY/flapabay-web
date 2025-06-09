
-- Update trips table to support check-in/check-out and payment functionality
ALTER TABLE public.trips 
ADD COLUMN IF NOT EXISTS check_in_code TEXT,
ADD COLUMN IF NOT EXISTS has_checked_in BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS has_checked_out BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS payment_method TEXT,
ADD COLUMN IF NOT EXISTS payment_amount DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS special_requests TEXT,
ADD COLUMN IF NOT EXISTS refund_status TEXT,
ADD COLUMN IF NOT EXISTS refund_amount DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS refund_reason TEXT;

-- Add new table for reviews if it doesn't exist
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL,
  reviewed_id UUID NOT NULL,
  property_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_guest_review BOOLEAN DEFAULT TRUE,
  is_public BOOLEAN DEFAULT TRUE
);

-- Add RLS to reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for reviews
CREATE POLICY "Users can create their own reviews" 
  ON public.reviews 
  FOR INSERT 
  WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Everyone can view public reviews" 
  ON public.reviews 
  FOR SELECT
  USING (is_public = TRUE);

CREATE POLICY "Users can view their own private reviews" 
  ON public.reviews 
  FOR SELECT
  USING (is_public = FALSE AND (auth.uid() = reviewer_id OR auth.uid() = reviewed_id));
