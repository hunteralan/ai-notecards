import { getPrismaClient } from "~/helpers/getPrismaClient";

export async function getClassDetailsById(id: number, userId: number) {
  const prisma = getPrismaClient();
  const classDetails = await prisma.class.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      UploadGroup: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          _count: {
            select: {
              files: true,
              noteCards: true,
            },
          },
        },
      },
    },
  });

  return classDetails;
}
