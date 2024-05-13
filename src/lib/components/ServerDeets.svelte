<script lang="ts">
	import { reportStatus, startServer, type Server } from '$lib/mserver';

	export let server: Server;

	const start = async () => {
		try {
			startServer(server.ID)
		} catch(error) {
			console.log(error)
		}
	}

	reportStatus(server.ID)

	let isRunning = false;
</script>

<div class="bg-slate-950 p-4 rounded-md border border-slate-500 flex-col space-y-4">
	<div class="flex justify-between items-center mx-4">
		<h1 class="text-3xl font-bold">{server.Name}</h1>
        <button on:click={start} class="w-24 bg-emerald-700 hover:bg-emerald-800 py-1 rounded-md">Start</button>
	</div>
	<!-- Console -->
	<div
		class="bg-slate-900 w-full h-[30rem] rounded-sm flex items-center justify-around border border-slate-500"
	>
		<button class="w-48 py-1 bg-slate-700 rounded-md flex items-center justify-around pt-2">
			<div class="flex items-center text-xl">
				<code>Open Console</code>
			</div>
		</button>
	</div>
</div>
