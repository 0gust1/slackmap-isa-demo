<script lang="ts">
	import '../app.css';
    import CoordsDebug from '$lib/CoordsDebug.svelte';
    import ApIdataDebug from '$lib/APIdataDebug.svelte';
    import BottomMenu from '$lib/BottomMenu.svelte';
import SidePane from '$lib/SidePane.svelte';
</script>

<header class="smap-over-leaflet fixed flex flex-col w-full bg-gray-700 bg-opacity-70 text-gray-200">
    <CoordsDebug/>
</header>

<main class="relative">
    <slot />
</main>

<SidePane />

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
