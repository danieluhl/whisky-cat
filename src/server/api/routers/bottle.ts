import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { bottle } from "~/server/db/schema";

export const bottleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ number: z.number().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(bottle).values({
        number: input.number,
        image: "https://source.unsplash.com/random",
        createdById: ctx.session.user.id,
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.bottle.findFirst({
      orderBy: (bottle, { desc }) => [desc(bottle.createdAt)],
    });
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.bottle.findMany({
      orderBy: (bottle, { asc }) => [asc(bottle.number)],
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
