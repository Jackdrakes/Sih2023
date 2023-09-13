import { supabase } from '../utils/supabase';

// Fetch a list of songs from the Supabase database
async function fetchSongs() {
  const { data, error } = await supabase.from('songs').select('*');
  if (error) {
    console.error('Error fetching songs:', error);
    return [];
  }
  return data;
}
