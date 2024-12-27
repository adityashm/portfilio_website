import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vbxjdrxsnahyaodirxaq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZieGpkcnhzbmFoeWFvZGlyeGFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxOTk5ODAsImV4cCI6MjA1MDc3NTk4MH0.HFPk9asA1dxBBEx0Uxhi_ckdZzWD_sQdL27NI9ccYuI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
