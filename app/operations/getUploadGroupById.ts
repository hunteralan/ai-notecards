import { getPrismaClient } from "~/helpers/getPrismaClient";

export async function getUploadGroupbyId(id: number, userId: number) {
  const prisma = getPrismaClient();
  const upload = await prisma.uploadGroup.findUnique({
    where: {
      id,
      class: {
        userId,
      },
    },
    include: {
      noteCards: true,
      class: {
        select: {
          className: true,
        },
      },
    },
  });

  return upload;
}
