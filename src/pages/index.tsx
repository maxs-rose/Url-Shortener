import { trpc } from "@utils/trpc";
import type { NextPage } from 'next'

const Home: NextPage = () => {
	const hello = trpc.useQuery(['hello', { text: "client" }]);

	if(hello.isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div className="border border-gray-300 rounded">{hello.data!.greeting}</div>
	)
}

export default Home
