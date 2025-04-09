import { buffer } from 'micro';
import Stripe from 'stripe';
import { supabase } from '../../utils/supabaseClient';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Get the customer ID from the session
    const userId = session.client_reference_id;
    
    if (!userId) {
      console.error('No user ID found in session');
      return res.status(400).send('No user ID found');
    }
    
    // Update user in database
    const { error } = await supabase
      .from('users')
      .update({ 
        is_paid: true, 
        payment_date: new Date().toISOString(),
        testimonial_limit: 999999 // Unlimited testimonials
      })
      .eq('id', userId);
      
    if (error) {
      console.error('Error updating user:', error);
      return res.status(500).send('Error updating user');
    }
  }
  
  res.status(200).json({ received: true });
} 