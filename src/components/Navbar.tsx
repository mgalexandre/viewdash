"use client"

import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { signOut } from '@/lib/auth-client';
import Link from 'next/link';

export default function Navbar() {
  const { data: session } = authClient.useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in"); // redirect to login page
          router.refresh();
        },
      },
    },
    );
  };

  return (
    <div className='flex justify-between items-center p-5'>
      <h1>Olá, {session?.user.name}</h1>
      <Button onClick={handleSignOut}>Sign Out</Button>
      <Link href={"/sign-in"}><Button>Sign In</Button></Link>

    </div>
  );
}
