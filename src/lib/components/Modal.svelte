<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let isOpen: boolean;
	export let title = 'No title provided.';

    const dispatch = createEventDispatcher();

	const onEscape = (e: KeyboardEvent) => {
		if (e.key == 'Escape') {
            dispatch('close')
		}
	};
</script>

<svelte:window on:keydown={onEscape} />

<dialog
	open={isOpen}
	class="dialog bg-slate-950 text-slate-100 rounded-md overflow-hidden min-w-96"
>
	<div>
		<div class="p-4 bg-slate-700 border-b border-slate-500">
			<h1 class="text-3xl font-bold">{title}</h1>
		</div>
		<div class="p-2 bg-slate-800">
			<slot>Empty Modal</slot>
		</div>
	</div>
</dialog>

<style>
	.dialog {
		top: 45%;
		-webkit-transform: translateY(-45%);
		-moz-transform: translateY(-45%);
		-ms-transform: translateY(-45%);
		transform: translateY(-45%);
	}
</style>
