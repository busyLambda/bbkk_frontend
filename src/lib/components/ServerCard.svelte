<script lang="ts">
	import type { Server } from '$lib/mserver';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let server: Server;
</script>

<div>
	<div class="bg-slate-800 border border-slate-500 w-full p-4 rounded-md flex justify-between items-center">
		<div>
			<h1 class="text-2xl font-bold">{server.Name}</h1>
			<p class="text-slate-300">{server.DedicatedRam}MB of dedicated ram.</p>
		</div>
		<div>
			<button on:click={() => { dispatch('open', server) }} class="border border-slate-500 w-12 h-12 p-2 rounded-md hover:bg-slate-700">
				<svg class="fill-slate-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
					><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
						d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
					/></svg
				>
			</button>
		</div>
	</div>
</div>
