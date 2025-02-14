import { getPrismaClient } from "~/helpers/getPrismaClient";
import type { Flashcard } from "~/types/flashcard";

export async function saveUploadGroup(
  classId: number,
  uploadName: string,
  userId: number,
  files: File[],
  flashcards: Flashcard[]
) {
  const prisma = getPrismaClient();

  await prisma.uploadGroup.create({
    data: {
      name: uploadName,
      classId,
      createdById: userId,
      files: {
        createMany: {
          data: await Promise.all(
            files.map(async (fb) => {
              const buffer = await fb.arrayBuffer();
              const blob = new Uint8Array(buffer);

              return {
                fileData: blob,
                mimeType: fb.type,
              };
            })
          ),
        },
      },
      noteCards: {
        createMany: {
          data: flashcards,
        },
      },
    },
  });
}
