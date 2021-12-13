<script lang="ts">
	import '../app.css';
    import {sideMenuOpen } from '$lib/menuStore'
    import CoordsDebug from '$lib/CoordsDebug.svelte';
    import ApIdataDebug from '$lib/APIdataDebug.svelte';
    import BottomMenu from '$lib/BottomMenu.svelte';
    const openMenu = ()=>{
        sideMenuOpen.set(true)
    }
</script>

<header class="smap-over-leaflet fixed flex flex-col w-full bg-gray-700 bg-opacity-70 text-gray-200">
    <div class="flex">
        <h1>Slackmap dummy app 1</h1>
        <button on:click={openMenu}>open menu</button>
    </div>
	
    <CoordsDebug/>
</header>

<main class="relative">
    <slot />
</main>

<BottomMenu/>
<!-- <footer class="smap-footer">
    <span class="bg-opacity-90 inline-block bg-indigo-100 px-1"> Proof Of Concept app</span>
</footer> -->

<style lang="postcss">
	.smap-over-leaflet  {
		z-index: 1000;
	}
    .smap-footer{
        @apply smap-over-leaflet bg-indigo-300 w-full fixed bottom-0 text-xs text-right;
    }
</style>
