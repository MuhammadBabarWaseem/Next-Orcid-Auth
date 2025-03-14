"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const handleGoogleLogin = async () => {
    try {
      const res = await signIn("google", { callbackUrl: "/workspace/recent" });
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
        <button
          onClick={handleOrcidLogin}
          className="px-6 py-2 rounded-lg flex gap-4 cursor-pointer text-black items-center justify-center w-full bg-blue-500 text-sm"
        >
          Sign In with Orcid
        </button>
      </div>
    </div>
  );
}
