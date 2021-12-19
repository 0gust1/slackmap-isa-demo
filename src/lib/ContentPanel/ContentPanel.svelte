<script lang="ts">
  import { Icon, ChevronUp } from 'svelte-hero-icons';
  import { contentPaneOpen } from '$lib/ContentPanel/contentPaneStore';
</script>

{#if $contentPaneOpen}
<div class="smap-content-panel">
  <button type="button" class="w-full">
    <Icon src={ChevronUp} class="wh6 h-6 text-gray-700" />
  </button>

  <p>Content panel</p>
  <p>Another content</p>
  <p>Content again</p>
</div>
{/if}

<style lang="postcss">
  .smap-content-panel {
    z-index: 10000;
    @apply absolute bg-gray-400 w-full shadow-2xl rounded-t-md p-2;
    inset: auto auto 0 auto;
  }
</style>
