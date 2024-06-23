<script lang="ts">
	import {
		getAllServers,
		getLatestBuild,
		getPaperData,
		getServerByName,
		type Server
	} from '$lib/mserver';
	import ServerCard from '$lib/components/ServerCard.svelte';
	import ServerDeets from '$lib/components/ServerDeets.svelte';
	import CreateServerModal from '$lib/components/CreateServerModal.svelte';

	let query = '';
	let server: Server | null = null;
	let servers: Server[] = [];
	let isCreatingServer = false;

	const queryServer = async () => {
		try {
			servers = await getServerByName(query);
			console.log(servers);
		} catch (error) {
			console.error(error);
		}
	};

	const openServer = (e: CustomEvent<Server>) => {
		server = e.detail;
		console.log(server);
	};

	const handleClose = (event: CustomEvent<null | Server>) => {
		if (event.detail) {
			servers = [...servers, event.detail];
		}

		isCreatingServer = false;
	};

	const initialState = async () => {
		try {
			query = '';
			servers = await getAllServers();
		} catch (error) {
			console.error(error);
		}
	};
</script>

<CreateServerModal on:close={handleClose} isOpen={isCreatingServer}></CreateServerModal>
<div class="m-4 flex-col space-y-4 text-slate-100">
	<div class="bg-slate-950 p-4 rounded-md border border-slate-500 flex justify-around">
		<div class="space-x-4 items-center flex">
			<button on:click={initialState} class="p-2 bg-slate-500 rounded-sm">
				<svg class="w-4 fill-slate-950" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
					><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
						d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"
					/></svg
				>
			</button>
			<input
				bind:value={query}
				class="px-2 py-1 rounded-sm bg-slate-900 border border-slate-500 text-slate-500"
				type="text"
				placeholder="Search for server..."
			/>
			<button class="p-2 bg-violet-500 rounded-sm" on:click={queryServer}>
				<svg class="w-4 fill-slate-950" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
					><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
						d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
					/></svg
				>
			</button>
		</div>
	</div>
	{#if server}
		<ServerDeets on:back={() => { server = null }} {server}></ServerDeets>
	{:else}
		{#await initialState()}
			Loading
		{:then success}
			<div class="flex space-x-4">
				<div class="bg-slate-950 border border-slate-500 w-[20rem] p-4 rounded-md">
					<h1 class="text-1xl font-bold">Summary</h1>
				</div>
				<div
					class="bg-slate-950 border border-slate-500 w-full p-4 rounded-md flex flex-col space-y-4"
				>
					<button
						on:mousedown={() => (isCreatingServer = true)}
						class="bg-violet-600 py-2 rounded-md hover:bg-violet-700">Create new server</button
					>
					{#if servers.length > 0}
						{#each servers as server}
							<ServerCard on:open={openServer} {server}></ServerCard>
						{/each}
					{:else}
						None...
					{/if}
				</div>
			</div>
		{:catch error}
			<h1 class="text-center font-bold text-2xl">There was an error getting inital data.</h1>
		{/await}
	{/if}
</div>
