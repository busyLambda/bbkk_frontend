<script>
	import { user } from '$lib/auth';
</script>

{#if $user}
	<div class="text-slate-100 m-4">
		<div class="w-full bg-slate-800 rounded-md border border-slate-500 flex flex-col">
            <h1 class="text-2xl font-bold p-4 border-b border-slate-500">Settings &rarr; <span class="text-violet-500">{$user.username}</span></h1>
            <div class="p-2 bg-slate-950">
                <h1>Hello</h1>
            </div>
        </div>
	</div>
{/if}
