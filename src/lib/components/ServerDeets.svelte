<script lang="ts">
	import { startServer, stopServer, type Server } from '$lib/mserver';
	import { createEventDispatcher } from 'svelte';

	let console_elem: HTMLElement;

	const dispatch = createEventDispatcher();

	export let server: Server;

	let running = false;
	let mem_usage: number = 0;

	const stop = async () => {
		try {
			stopServer(server.ID);
			closeConsole();
		} catch (error) {
			console.log(error);
		}
	};

	const start = async () => {
		try {
			await startServer(server.ID);
		} catch (error) {
			console.log(error);
		}
	};

	let console_ws: null | WebSocket = null;

	let console_data = '';

	const openConsole = async () => {
		console_ws = new WebSocket(`ws://localhost:3000/server/console/${server.ID}`);

		console_ws.addEventListener('message', (message: any) => {
			console.log(message);
			console_data = console_data + message.data + '\n';
			console_elem.scroll({ top: console_elem.scrollHeight, behavior: 'instant' });
		});
	};

	const closeConsole = async () => {
		if (console_ws) {
			console_ws.close();
			console_ws = null;
		} else {
			console.log("Attempted to close console when it wasn't open :(");
		}
	};

	let ws = new WebSocket(`ws://localhost:3000/server/statusreport/${server.ID}`);

	ws.addEventListener('message', (message: any) => {
		const status = JSON.parse(message.data);
		if (status.not_running) {
			running = false;
			console_data = '';
		} else {
			running = true;
			mem_usage = Math.floor(status.mem_use / 1000);
		}
		console.log(message.data);
	});
</script>

<div class="bg-slate-950 p-4 rounded-md border border-slate-500 flex-col space-y-4">
	<div class="flex justify-between items-center mx-4">
		<div class="flex space-x-4 items-center">
			<button
				on:click={() => {
					ws.close();
					dispatch('back');
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 448 512"
					class="w-6 fill-slate-100 hover:fill-rose-500"
					><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
						d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
					/></svg
				>
			</button>
			<h1 class="text-3xl font-bold">{server.Name}</h1>
			{#if running}
				<div class="bg-yellow-600 px-2 py-1 rounded-sm">
					Memory usage: {mem_usage}/{server.DedicatedRam}mb
				</div>
			{/if}
		</div>
		{#if running}
			<button on:click={stop} class="w-24 bg-red-700 hover:bg-red-800 py-1 rounded-md">Stop</button>
		{:else}
			<button on:click={start} class="w-24 bg-emerald-700 hover:bg-emerald-800 py-1 rounded-md"
				>Start</button
			>
		{/if}
	</div>
	<!-- Console -->
	<div
		class="bg-slate-900 w-full h-[30rem] rounded-sm flex items-center justify-around border border-slate-500"
	>
		{#if running}
			{#if console_ws}
				<code class="w-full h-full p-4 whitespace-pre-line overflow-auto" bind:this={console_elem}>
					{console_data}
				</code>
			{:else}
				<button
					on:click={openConsole}
					class="w-48 py-1 bg-slate-700 rounded-md flex items-center justify-around pt-2"
				>
					<div class="flex items-center text-xl">
						<code>Open Console</code>
					</div>
				</button>
			{/if}
		{:else}
			<p>Please start the server before opening the console.</p>
		{/if}
	</div>
</div>
