import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

const NewsletterSubscription = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success toast
    toast({
      title: "Subscription successful!",
      description: "You've been added to our newsletter list.",
    });
    
    // Reset form
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="bg-gray-100 rounded-xl p-8 md:p-12">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-3">Subscribe to Our Newsletter</h3>
        <p className="text-gray-600 mb-6">
          Stay updated with our latest travel insights, company news, and industry trends.
        </p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input 
                      placeholder="Your email address" 
                      {...field} 
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="h-12 bg-flapabay-yellow" disabled={isSubmitting}>
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </Form>
        
        <p className="text-xs text-gray-500 mt-4">
          By subscribing, you agree to our Privacy Policy and consent to receive updates from FlapaBay.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
