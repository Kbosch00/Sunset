import { createUploadthing, type FileRouter } from "uploadthing/next";
import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const f = createUploadthing();

export const ourFileRouter = {
  memoryUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 30 },
    video: { maxFileSize: "64MB", maxFileCount: 10 },
  })
    .input(z.object({ albumId: z.number().nullable() }))
    .middleware(async ({ input }) => {
      return { albumId: input.albumId };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      const type = file.type.startsWith("video/") ? "video" : "image";

      await db.orm.public.Memory.create({
        url: file.ufsUrl,
        type,
        albumId: metadata.albumId,
      });
      revalidatePath("/memories");
      return { url: file.ufsUrl, type };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
