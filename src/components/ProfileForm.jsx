// pages/ProfileForm.js
import { useState } from 'react';
import { supabase } from '../lib/supabase';

function ProfileForm() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase.from('profiles').insert([
        { name, username, gender },
      ]);
      
      if (error) {
        console.error('Error saving profile:', error);
      } else {
        console.log('Profile saved successfully:', data);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <div>
      <h2>Create Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Gender:
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
        </label>
        <br />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default ProfileForm;
