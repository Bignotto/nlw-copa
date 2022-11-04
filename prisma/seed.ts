import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Dunha",
      email: "dunha@gmail.com",
      avatarUrl: "https://github.com/bignotto",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      name: "zero day bolão",
      code: "bola123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  const match1 = await prisma.match.create({
    data: {
      date: "2022-11-24T12:00:00.000Z",
      homeTeamCountryCode: "BR",
      awayTeamCountryCode: "DE",
    },
  });

  const match2 = await prisma.match.create({
    data: {
      date: "2022-11-28T12:00:00.000Z",
      homeTeamCountryCode: "BR",
      awayTeamCountryCode: "AR",

      guesses: {
        create: {
          homeTeamScore: 2,
          awayTeamScore: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
