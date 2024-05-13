<script lang="ts">
	import LoginForm from '$lib/components/LoginForm.svelte';
	let isOpen = false;
	import { user } from '$lib/auth';
	import { selectedTab } from '$lib/extras';

	const closeModal = () => {
		isOpen = false;
	};

	const openModal = () => {
		isOpen = true;
	};
</script>

<nav class="p-4 bg-slate-950 border-b border-slate-600">
	<div class="flex justify-between text-slate-100 items-center max-w-[1080px] mx-auto">
		<a class="text-3xl font-bold" href="/">BBKK</a>

		<div>
			{#if $user}
				<div class="flex items-center space-x-4">
					{#if $selectedTab == 'dashboard'}
						<h1 class="text-center py-1 bg-violet-600 rounded-md border border-violet-400 w-32">
							dashboard
						</h1>
					{:else}
						<button
							on:click={() => {
								selectedTab.set('dashboard');
							}}
							class="px-4 py-1 bg-slate-800 rounded-md border border-slate-500 w-32 hover:bg-slate-700"
							>dashboard</button
						>
					{/if}
					{#if $selectedTab == 'settings'}
						<h1 class="text-center py-1 bg-violet-600 rounded-md border border-violet-400 w-32">
							settings
						</h1>
					{:else}
						<button
							on:click={() => {
								selectedTab.set('settings');
							}}
							class="w-32 px-4 py-1 bg-slate-800 rounded-md border border-slate-500 hover:bg-slate-700"
							>settings</button
						>
					{/if}
					<button
						class="bg-rose-500 px-8 py-1 rounded-md w-32 border border-rose-400 hover:bg-rose-600"
						>logout</button
					>
				</div>
			{:else}
				<button
					on:click={openModal}
					class="btn-hover-fancy border border-slate-100 px-8 py-1 rounded-lg text-1xl"
					>login</button
				>
			{/if}
		</div>
	</div>
</nav>

<LoginForm on:close={closeModal} {isOpen} />
