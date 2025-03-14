"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession() as {
    data: {
      user: {
        id: string;
        name?: string | null;
      };
      accessToken: string;
    } | null;
  };

  const fetchData = async () => {
    if (session && session.user) {
      const res = await fetch(`/api/orcid/${session.user.id}`);
      const data = await res.json();
      console.log(data);
    }
  };

  const handleOrcidLogin = async () => {
    try {
      const res = await signIn("orcid", { callbackUrl: "/" });
      if (res?.error) {
        console.log({ ERROR: res.error });
      } else {
        setTimeout(() => {
          console.log("LOGGED IN --->", JSON.stringify(res, null, 6));
        }, 3000);
      }
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px]  items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col justify-center items-center h-full gap-20">
        {!session ? (
          <button
            onClick={handleOrcidLogin}
            className="px-6 py-2 rounded-lg flex gap-4 cursor-pointer text-black items-center justify-center w-full bg-blue-500 text-sm"
          >
            Sign In with Orcid
          </button>
        ) : (
          <>
            <p>Welcome, {session?.user?.name}</p>
            <p>ORCID: {session?.user?.id}</p>
            <p>Access Token: {session?.accessToken}</p>

            <p>
              <button
                className="px-6 py-2 rounded-lg flex gap-4 cursor-pointer text-black items-center justify-center w-full bg-green-500 text-sm"
                onClick={fetchData}
              >
                Show My ORCID Data in the Console
              </button>
            </p>

            <button
              className="px-6 py-2 rounded-lg flex gap-4 cursor-pointer text-black items-center justify-center w-full bg-red-500 text-sm"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
