import { buffer } from 'micro';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

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
    
    // Update user in database
    const { error } = await supabase
      .from('users')
      .update({ 
        is_paid: true, 
        payment_date: new Date(),
        testimonial_limit: 999999 
      })
      .eq('id', session.client_reference_id);
      
    if (error) {
      console.error('Error updating user:', error);
      return res.status(500).send('Error updating user');
    }
  }
  
  res.status(200).json({ received: true });
} 