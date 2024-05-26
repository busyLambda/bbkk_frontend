<script lang="ts">
	import { getPaperData } from '$lib/mserver';
	import { createEventDispatcher } from 'svelte';
	import Modal from './Modal.svelte';
	export let isOpen: boolean;

    const dispatch = createEventDispatcher();
</script>

<Modal {isOpen} title="Create new server">
	{#await getPaperData()}
		<p>Loading...</p>
	{:then paper_data}
		<form class="flex flex-col">
			<label for="name">Name</label>
			<input
				type="text"
				id="name"
				class="bg-slate-600 py-1 border border-slate-400 rounded-md px-2"
				placeholder="name"
			/>
			<label class="mt-2" for="dedicated_ram">Dedicated ram (mb)</label>
			<input
				type="number"
				id="dedicated_ram"
				class="bg-slate-600 py-1 border border-slate-400 rounded-md px-2"
				placeholder="1024"
			/>

			{#if paper_data.versions.length != 0}
				<select
					class="bg-slate-600 mt-4 py-2 px-2 rounded-md"
					name="Paper version"
					id="paper_version"
				>
					{#each paper_data.versions as version}
						<option value={version}>{version}</option>
					{/each}
				</select>
			{/if}
			<input
				class="mt-4 bg-violet-600 py-2 rounded-md hover:bg-violet-700"
				type="button"
				value="Create server"
			/>
            <button on:mousedown={() => dispatch('close')} class="mt-2 py-2 bg-slate-600 hover:bg-slate-700 rounded-md">Close</button>
		</form>
	{:catch error}
		<p>Error loading paper data: {error}</p>
	{/await}
</Modal>
