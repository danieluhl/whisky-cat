"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreateBottle() {
  const router = useRouter();
  const [bottleNumber, setBottleNumber] = useState("");
  const [showBottleForm, setShowBottleForm] = useState(false);

  const createBottle = api.bottle.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setBottleNumber("");
      setShowBottleForm(false);
    },
  });

  return showBottleForm ? (
    <button
      className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
      onClick={() => setShowBottleForm(true)}
    >
      <h3 className="text-2xl font-bold">Add Bottle</h3>
    </button>
  ) : (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createBottle.mutate({ number: Number(bottleNumber) });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Bottle Number"
        value={bottleNumber}
        onChange={(e) => setBottleNumber(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createBottle.isLoading}
      >
        {createBottle.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>)
}
