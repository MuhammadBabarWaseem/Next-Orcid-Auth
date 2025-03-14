"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function MyData() {
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

  return (
    <div className="flex justify-center items-center h-screen w-full">
      {!session ? (
        <button
          className="text-white w-xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => signIn("orcid")}
        >
          Sign in
        </button>
      ) : (
        <>
          <p>Welcome, {session?.user?.name}</p>
          <p>ORCID: {session?.user?.id}</p>
          <p>Access Token: {session?.accessToken}</p>

          <p>
            <button
              className="text-white w-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={fetchData}
            >
              Show My ORCID Data in the Console
            </button>
          </p>

          <button
            className="text-white w-xl bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </>
      )}
    </div>
  );
}
