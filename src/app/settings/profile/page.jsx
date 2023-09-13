// pages/settings/profile.js
'use client'
import { useUser } from '@clerk/clerk-react';
import ProfileForm from '@/components/ProfileForm';

export default function EditProfile() {
  const user = useUser();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Edit Profile</h1>
      <ProfileForm initialValues={user.publicMetadata} />
    </div>
  );
}
