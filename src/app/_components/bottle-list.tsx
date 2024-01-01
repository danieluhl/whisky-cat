import { getServerAuthSession } from "~/server/auth";
import Image from 'next/image'
import { api } from "~/trpc/server";

const formatDate = (date: Date | null) => {
  if (!date) {
    return null;
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export async function BottleList() {
  // const session = await getServerAuthSession();
  // if (!session?.user) {
  //   return null;
  // }

  const latestBottle = await api.bottle.getLatest.query();
  const allBottles = await api.bottle.getAll.query();

  // todo: add broken image if the image is missing
  return (
    <div className="w-full max-w-xs">
      {latestBottle ? (
        <div className="flex flex-col gap-8" >
          <div>
            <h3 className="text-2xl font-bold">Latest Bottle</h3>
            <p className="truncate">{latestBottle.number}</p>
            <Image
              src={latestBottle.image || ""}
              width={500}
              height={500}
              alt="Picture of a bottle of whisky"
            />
          </div>
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl font-bold">All Bottles</h3>
            {allBottles.map((bottle) => (
              <div key={bottle.id}>
                <h4 className="text-xl truncate"># {bottle.number} - {formatDate(bottle.updatedAt) || formatDate(bottle.createdAt)}</h4>
                <Image
                  src={bottle.image || ""}
                  width={500}
                  height={500}
                  alt="Picture of a bottle of whisky"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>You have no bottles yet.</p>
      )}
    </div>
  );
}
