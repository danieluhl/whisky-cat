import { getServerAuthSession } from "~/server/auth";
import Image from 'next/image'
import { api } from "~/trpc/server";

export async function BottleList() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    return null;
  }

  const latestBottle = await api.bottle.getLatest.query();

  // todo: add broken image if the image is missing
  return (
    <div className="w-full max-w-xs">
      {latestBottle ? (
        <div>
          <p className="truncate">Your most recent bottle: {latestBottle.number}</p>
          <Image
            src={latestBottle.image || ""}
            width={500}
            height={500}
            alt="Picture of a bottle of whisky"
          />
        </div>
      ) : (
        <p>You have no bottles yet.</p>
      )}
    </div>
  );
}
