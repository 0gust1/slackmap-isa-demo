<script lang="ts">
  import { sidePaneOpen } from '$lib/sidePaneStore';
  import { Icon, X } from 'svelte-hero-icons';

  const closeMenu = () => {
    sidePaneOpen.set(false);
  };
</script>

<!-- {#if $sidePaneOpen} -->
<div id="smap-side-pane" class="smap-side-pane {$sidePaneOpen ? `opened` : `closed`}">
  <div>
    <button
      type="button"
      on:click={closeMenu}
      class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <span class="sr-only">Close panel</span>
      <!-- Heroicon name: outline/x -->
      <Icon src={X} class="h6 w-6" />
    </button>
  </div>
  <div id="smap-side-pane-content" class="smap-side-pane-content" />
</div>

<!-- {/if} -->
<style lang="postcss">
  .smap-side-pane {
    z-index: 1000;
    //height: calc(100vh - theme(spacing.12));
    height: 100vh;
    @apply overflow-y-hidden;
    @apply absolute w-2/5 bg-gray-200 px-4 shadow-2xl;
    top:0px;
    right:0px;
    transition: transform 0.3s;
  }

  .smap-side-pane.opened {
  }

  .smap-side-pane.closed {
    transform: translate3d(100%,0,0);
  }

  .smap-side-pane-content {
    @apply overflow-y-auto h-full;
  }
</style>
