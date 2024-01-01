import Link from "next/link";

import { CreateBottle } from "~/app/_components/create-bottle";
import { BottleList } from "~/app/_components/bottle-list";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";




export default async function Home() {
  const hello = await api.bottle.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();
  const options = (Array.from(Array(200).keys())).map((i) => <option key={i}>{i}</option>)

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#0d170d] to-[#17100b] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <CreateBottle />
        </div>
        <select className="w-full rounded-full px-4 py-2 text-black" >
          {options.map((option) => option)}
        </select>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <BottleList />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

