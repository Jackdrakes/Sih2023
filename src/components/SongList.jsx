//songlist
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import ReactPlayer from 'react-player';
import SearchBar from '@/components/SearchBar'; 

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseApiKey);

function SongList() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  
  useEffect(() => {
    async function fetchSongs() {
      const { data, error } = await supabase.storage.from('audio').list();
      if (error) {
        console.error('Error fetching songs:', error);
      } else {
        setSongs(data);
        setFilteredSongs(data);
      }
    }

    fetchSongs();
  }, []);

  const handleSearch = (query) => {
    const filtered = songs.filter((song) =>
      song.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSongs(filtered);
  };

  return (
    <div>
      <h2>Songs</h2>
      <SearchBar 
      onSearch={handleSearch}
      className='rounded-lg' />
      <ul>
        {filteredSongs.map((song) => (
          <li key={song.id}>
            <h3>{song.name}</h3>
            <ReactPlayer url={song.url} controls />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;
