// components/UserProfile.js
'use client'

import { useState } from 'react';
import { useClerk } from '@clerk/clerk-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;
const supabase = createClient(
  'https://yxrleetlywttvvziyzsh.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4cmxlZXRseXd0dHZ2eml5enNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1NjM0ODIsImV4cCI6MjAwNzEzOTQ4Mn0.m_4gLRsQxRen5JfSnPjfwaDbNC-7hV1oazltoxgwDLc'
  );

function UserProfileForm() {
  const { user } = useClerk();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userData = {
        name,
        age: parseInt(age),
        // Add other user data fields
      };

      // Call the function to add/update user profile in Supabase
      await addOrUpdateUserProfile(user.id, userData);

      console.log('User profile updated successfully');
    } catch (error) {
      console.error('Error updating user profile:', error.message);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <p>Welcome</p>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Age:
          <input type="number" value={age} onChange={handleAgeChange} />
        </label>
        <br />
        {/* Add other form fields */}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

async function addOrUpdateUserProfile(clerkUserId, userData) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert([
        {
          clerk_user_id: clerkUserId,
          ...userData,
        },
      ], { onConflict: ['clerk_user_id'] });

    if (error) {
      throw error;
    }

    console.log('User profile added/updated:', data);
  } catch (error) {
    console.error('Error adding/updating user profile:', error.message);
    throw error;
  }
}

export default UserProfileForm;

