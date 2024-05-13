<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Modal from './Modal.svelte';
	import { login } from '../auth';

	const dispatch = createEventDispatcher();

	export let isOpen: boolean;

	let username: string;
	let password: string;

	const submitLogin = async () => {
		try {
			await login(username, password);

			dispatch('close');
		} catch (error) {
			console.error(error);
		}
	};
</script>

<Modal
	{isOpen}
	on:close={() => {
		dispatch('close');
	}}
	title="Login"
>
	<form class="flex flex-col">
		<label for="username">username</label>
		<input
			bind:value={username}
			class="bg-slate-900 p-2 rounded-md border border-slate-500"
			type="text"
			id="username"
		/>
		<label for="password">password</label>
		<input
			bind:value={password}
			class="bg-slate-900 p-2 rounded-md border border-slate-500"
			type="password"
			id="password"
		/>
	</form>
	<button on:click={submitLogin} class="bg-violet-500 hover:bg-violet-700 w-full py-2 rounded-md mt-4">Login</button>
</Modal>
