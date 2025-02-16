import { getPrismaClient } from "~/helpers/getPrismaClient";

export async function getClassesByUserId(userId: number) {
  const prisma = getPrismaClient();
  const classes = await prisma.class.findMany({
    where: { userId },
    include: {
      _count: {
        select: {
          UploadGroup: true,
        },
      },
    },
  });

  return classes;
}
