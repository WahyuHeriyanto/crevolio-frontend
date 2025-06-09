// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wzisgjjffapzxyfwhprn.supabase.co'; // Ganti pakai Project URL kamu
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6aXNnampmZmFwenh5ZndocHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NzMzOTEsImV4cCI6MjA2NTA0OTM5MX0.rffu9VxyaOHnKUOrUuS12wUcIaZapmV0tFKqG_Bj7fo'; // Ganti pakai Anon public key kamu

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
