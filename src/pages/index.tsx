import { trpc } from "@utils/trpc";
import type { NextPage } from 'next'
import { ChangeEvent, useRef, useState } from "react";

const Home: NextPage = () => {
	const create = trpc.useMutation("createLink");
	const [badUrl, setBadUrl] = useState(false);
	const [result, setResult] = useState("");

	const [longLink, setLongLink] = useState("");
	const [copiedToClipboard, setCopiedToClipboard] = useState(false);
	const urlRef = useRef(null);

	const createLink = () => {
		create.mutate({ target: longLink }, {
			onSuccess: (r) => {
				setBadUrl(false);
				setLongLink("");
				if(r)
					setResult(`${window.document.URL}${r.id}`)
			},
			onError: (e) => {
				setResult("");
				setBadUrl(e.shape?.data.httpStatus === 400)
			}
		});
	}

	const isBadUrl = () => {
		if(badUrl) {
			return <div className="mt-3 text-white back bg-[#252627] p-2 rounded">❌ Bad URL ❌</div>
		}
	}

	const isGoodUrl = () => {
		if(!badUrl && result) {
			return <div className="mt-3 text-white back bg-[#252627] p-2 rounded hover:bg-[#212227]" title="Click to copy" ref={urlRef} onClick={selectAll}>{result}</div>
		}
	}

	const selectAll = async () => {
		navigator.clipboard.writeText(result).then(() => {
			setCopiedToClipboard(true)
			setTimeout(() => setCopiedToClipboard(false), 2000);
		});
	}

	const copiedDisplay = () => {
		if(!copiedToClipboard)
			return;

		return <span className="absolute top-4 text-xl text-white back bg-[#252627] p-2 rounded animate-bounce">Copied to clipboard!</span>
	}

	const updateInput = (e: ChangeEvent<HTMLInputElement>) => {
		setLongLink(e.target.value);
	}

	return (
		<main className="h-screen w-screen bg-[#af2bbf] relative">
			<div className="h-full flex flex-col justify-center items-center">
				<div className="flex flex-wrap flex-row justify-center gap-3">
					<input className="rounded p-2 w-52 w-fit drop-shadow-xl" placeholder="Enter Link" value={longLink} onChange={updateInput}/>
					<button className="bg-[#252627] text-white p-2 rounded hover:bg-[#212227] active:drop-shadow-2xl
					" onClick={() => createLink()}>Create Short Link</button>
				</div>
				{isBadUrl()}
				{isGoodUrl()}
				{copiedDisplay()}
			</div>
		</main>
	)
}

export default Home
