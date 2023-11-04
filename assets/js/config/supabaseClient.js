//Database Connection
const SUPABASE_URL = 'https://jkgbqvwvkrhzylwqrtxe.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprZ2Jxdnd2a3Joenlsd3FydHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUxMDU0NTMsImV4cCI6MjAxMDY4MTQ1M30.H5U41DwXiVF6DDHdYjUWogsZHm-qL2inUIbxgB5M_8c';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
window.userToken = null;

export default sb;