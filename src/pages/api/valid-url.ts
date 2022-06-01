import { prisma } from "@backend/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const slug = req.query.slug;

	if(!slug || Array.isArray(slug)) {
		res.status(404);
		return
	}

	const targetUrl = await prisma.link.findUnique({ where: { id: slug }, select: { target: true } });

	if(!targetUrl) {
		res.status(404);
		return
	}

	res.setHeader("Content-Type", "application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader( "Cache-Control", "s-maxage=1000000000, stale-while-revalidate");
	res.status(200).json({ target: targetUrl.target });

	return;
}