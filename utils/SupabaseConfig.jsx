import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    'https://aphvtjwmqujgqsxnfarn.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwaHZ0andtcXVqZ3FzeG5mYXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwMzM4MDIsImV4cCI6MjA0NTYwOTgwMn0.mDYyQt_EkAeWSodzRMPMO6pegnA7aK75lRHt5dkaMsQ'
);
