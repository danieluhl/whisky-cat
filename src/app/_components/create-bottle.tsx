"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";
import { UploadButton } from "~/utils/uploadthing";

export function CreateBottle() {
  const router = useRouter();
  const [bottleNumber, setBottleNumber] = useState("");
  const [bottleImageFile, setBottleImageFile] = useState("");
  const [showBottleForm, setShowBottleForm] = useState(false);

  const createBottle = api.bottle.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setBottleNumber("");
      setBottleImageFile("");
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
        // upload image, get real url, use to real url in mutation here
        if (bottleImageFile) {
          createBottle.mutate({
            number: Number(bottleNumber),
            image: bottleImageFile,
          });
        }
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
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          if (res.length > 0 && res?.[0]?.url) {
            setBottleImageFile(res[0].url);
          } else {
            console.error("Upload failed");
          }
        }}
        onUploadError={(error: Error) => {
          console.error(error);
        }}
      />
      {bottleImageFile && <span>Image ready: {bottleImageFile}</span>}
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createBottle.isLoading}
      >
        {createBottle.isLoading ? "Adding Bottle..." : "Add Bottle"}
      </button>
    </form>
  );
}
