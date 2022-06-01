import { prisma } from "@backend/prisma";
import { Link } from "@prisma/client";
import * as trpc from "@trpc/server";
import { nanoid } from "nanoid";
import { z } from 'zod';

export const appRouter = trpc
.router()
.query("clearOldLinks", {
	async resolve() {
		const oldLinks = new Date();
		oldLinks.setDate(oldLinks.getDate() - 30);
		return await prisma.link.deleteMany({ where: { createdAt: { lte: oldLinks } }});
	}
})
.mutation("createLink", {
	input: z.object({ target: z.string().url() }),
	async resolve({ input }) {
		let result: Link | undefined;

		// generate a random slug
		let tries = 0;
		while(tries < 10) {
			const id = nanoid(8);

			try {
				result = await prisma.link.create({ data: { id, target: input.target }});
				break;
			} catch {
				console.log(`failed to create new link id tries: ${tries}`);
			}

			tries++;
		}

		return result;
	}
});

export type AppRouter = typeof appRouter;