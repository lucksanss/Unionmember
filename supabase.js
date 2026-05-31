const SUPABASE_URL =
"https://xvieoniahwrogfblprfq.supabase.co";

const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2aWVvbmlhaHdyb2dmYmxwcmZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNDE5MDEsImV4cCI6MjA5NTcxNzkwMX0.oel97KWib2Q-B5pj-tF_Zcu62p8ekJBiiLcY0fMbte8";

const supabaseClient =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);// Add your Supabase URL and anon key