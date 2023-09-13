import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useUser } from '@/hook/useUser'; // You need to implement the `useUser` hook

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseApiKey);

function AddSongForm() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const user = useUser(); // Assuming you have implemented the `useUser` hook

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleArtistChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtist(event.target.value);
  };

  const handleAudioFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setAudioFile(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user || !audioFile) {
      return; // Ensure that both user and audioFile are defined
    }

    try {
      const audioUrl = await uploadAudioFile(audioFile);
      await addSongToSupabase(title, artist, audioUrl, user.id);
      // Clear form fields
      setTitle('');
      setArtist('');
      setAudioFile(null);
    } catch (error) {
      console.error('Error adding song:', error);
    }
  };

  const uploadAudioFile = async (file: File): Promise<string> => {
    const { data, error } = await supabase.storage.from('audio').upload(file.name, file);
    if (error) {
      throw error;
    }
    return data!.Key;
  };

  const addSongToSupabase = async (
    title: string,
    artist: string,
    audioUrl: string,
    userId: string
  ) => {
    await supabase.from('songs').insert([
      { title, artist, audio_url: audioUrl, user_id: userId },
    ]);
  };

  if (!user) {
    return <p>Please log in to add songs.</p>;
  }

  return (
    <div>
      <h2>Add Song</h2>
      <form onSubmit={handleSubmit}>
        {/* ... form inputs ... */}
      </form>
    </div>
  );
}

export default AddSongForm;
