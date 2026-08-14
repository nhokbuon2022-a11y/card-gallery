import { createClient } from '@supabase/supabase-js';

// Thay 2 giá trị bên dưới bằng thông tin lấy từ Supabase Settings -> API
const SUPABASE_URL = 'https://cvnxpcsjnxiwddntwbxi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bnhwY3Nqbnhpd2RkbnR3YnhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2Njk2NjQsImV4cCI6MjEwMjI0NTY2NH0.AHF5RAQ0BeDj9LTU7hta0RBuM1KQEiZG4VgHvr_YB0o';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);