import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config(); // Loads .env

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log("Checking products table...");
  const { data, error } = await supabase.from('products').select('*').limit(1);
  if (error) {
    console.error("DB Error fetching products:", error);
  } else {
    console.log("Successfully fetched products!", data);
  }
}

check();
