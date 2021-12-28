<script lang="ts">
  import { Icon, ChevronDown } from 'svelte-hero-icons';
  import {
    contentPaneOpen,
    contentFromAPI,
    contentLoading
  } from '$lib/ContentPanel/contentPaneStore';
  import SpotContent from './SpotContent.svelte';

  const closePanel = () => {
    contentPaneOpen.set(false);
  };
</script>

{#if $contentPaneOpen}
  <div id="smap-content-panel" class="smap-content-panel">
    <button type="button" on:click={closePanel} class="w-full">
      <Icon src={ChevronDown} class="wh6 h-6 text-gray-700" />
    </button>
    {#if $contentLoading}
      loading...
    {:else}
    <SpotContent spotContent={$contentFromAPI}/>
    {/if}
  </div>
{/if}

<style lang="postcss">
  .smap-content-panel {
    z-index: 10000;
    @apply absolute max-h-screen bg-gray-400 w-full shadow-2xl rounded-t-md p-2;
    @apply text-xs;
    inset: auto auto 0 auto;
  }
  .content {
    @apply overflow-y-auto;
  }
</style>
