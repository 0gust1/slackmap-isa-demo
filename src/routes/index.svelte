<script lang="ts">
  import { browser } from '$app/env';
  import SideMenu from '$lib/SideMenu.svelte';
  import { onMount } from 'svelte';

  let LeafletContainer;

  // we have to dynamically import the map component, because the server-side rendering complains about the window object (because of Leaflet)
  onMount(async () => {
    if (browser) {
      LeafletContainer = (await import('$lib/LeafletContainer.svelte')).default;
    }
  });
</script>

<SideMenu />


<div class="bg-gray-500">
  {#if browser}
    <svelte:component this={LeafletContainer} />
  {/if}
</div>
