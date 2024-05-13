<script lang="ts">
	import { selectedTab } from '$lib/extras';
	import Dashboard from '../lib/views/Dashboard.svelte';
    import Settings from '../lib/views/Settings.svelte';
</script>

<div class="max-w-[1080px] mx-auto">
    {#if $selectedTab == 'dashboard'}
        <Dashboard></Dashboard>
    {:else}
        <Settings></Settings>
    {/if}
</div>
