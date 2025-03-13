"use client"

import { authClient } from "@/lib/auth-client";
import Link from 'next/link';

export default function Home() {

  const { data: session } = authClient.useSession()

  return (
    <>
    <div>
      <h1>Olá</h1>
      <h1>Bem vindo,</h1>
      <p className="text-black">{session?.user.name}</p>
    </div>

    <Link href={"/naosei"}>
      <div>
        <h1>Hello</h1>
      </div>
    </Link>
    </>
  );
}
