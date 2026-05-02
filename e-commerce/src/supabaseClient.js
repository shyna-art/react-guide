import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://daaesyciqqzuitjechdp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhYWVzeWNpcXF6dWl0amVjaGRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NjEyNDQsImV4cCI6MjA5MjUzNzI0NH0.u2RlXXO-vSqqLr78c-pV9nwCz9y7pwEi9sYYKCFp508'

export const supabase = createClient(supabaseUrl, supabaseKey)