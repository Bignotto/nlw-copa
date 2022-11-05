import Fastify from "fastify";
import cors from "@fastify/cors";
import ShortUniqueId from "short-unique-id";
import { PrismaClient } from "@prisma/client";

import { z } from "zod";

const prisma = new PrismaClient({
  log: ["query"],
});

async function staticVoidMain() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  fastify.get("/pools/count", async () => {
    const poolsCount = await prisma.pool.count();

    return { count: poolsCount };
  });

  fastify.get("/users/count", async () => {
    const poolsCount = await prisma.user.count();

    return { count: poolsCount };
  });

  fastify.get("/guesses/count", async () => {
    const poolsCount = await prisma.guess.count();

    return { count: poolsCount };
  });

  fastify.post("/pools", async (request, reply) => {
    const createPoolBody = z.object({
      name: z.string(),
    });
    const { name } = createPoolBody.parse(request.body);
    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    const newPool = await prisma.pool.create({
      data: {
        name,
        code,
      },
    });

    return reply.status(201).send({ newPool });
  });

  await fastify.listen({ port: 3333, host: "0.0.0.0" });
}

staticVoidMain();
