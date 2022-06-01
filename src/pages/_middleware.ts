import { NextRequest, NextResponse } from "next/server";

const redirect = async (originUrl: string, targetUrl: string): Promise<NextResponse> => {
	// valid request redirects to target otherwise go to the index page

	const response = await fetch(`${originUrl}/api/valid-url?slug=${targetUrl}`)

	if(response.status === 200)
		return response.json()
					   .then(
						   ({ target }) => NextResponse.redirect(target)
					   );

	return NextResponse.redirect(originUrl);
}

const middleware = async (req: NextRequest, _: never): Promise<NextResponse | undefined> => {
	// if its a request for the homepage or the api carry on as normal
	if (req.nextUrl.pathname.startsWith("/api/") || req.nextUrl.pathname.startsWith("/favicon") || req.nextUrl.pathname === "/")
		return;

	return redirect(req.nextUrl.origin, req.nextUrl.pathname.slice(1));
}

export default middleware;