<script>
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import { validateSession, user } from '$lib/auth';
	import { onMount } from 'svelte';

	let isLoading = true;

	const validate = async () => {
		try {
			const res = await validateSession();
		} catch (error) {
			console.error(error);
		}
		isLoading = false;
	};

    onMount(() => {
        validate();
    });
</script>

<main class="">
	{#if isLoading}
		<h1 class="text-center text-4xl font-bold text-slate-100">Loading...</h1>
	{:else if $user}
		<NavBar></NavBar>
		<slot><h1>Empty over here :(</h1></slot>
	{:else}
		<NavBar></NavBar>
		<div class="flex flex-col text-slate-100 items-center">
			<h1 class="text-2xl font-bold my-4">Not logged in :c</h1>
			<img class="w-96 rounded-md" src="notLoggedIn.gif" alt="silly cat shaking head">
		</div>
	{/if}
</main>
