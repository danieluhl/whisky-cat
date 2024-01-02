import Link from "next/link";

import { CreateBottle } from "~/app/_components/create-bottle";
import { BottleList } from "~/app/_components/bottle-list";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  // todo: currently there's no way to actually sign out
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#0d170d] to-[#17100b] text-white gap-8">
      {session && (
        <>
          <p className="text-center text-2xl text-white">
            Logged in as {session.user?.name}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <CreateBottle />
          </div>
        </>
      )}
      {!session && (
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          {session ? "Sign out" : "+"}
        </Link>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        <BottleList />
      </div>
    </main>
  );
}

