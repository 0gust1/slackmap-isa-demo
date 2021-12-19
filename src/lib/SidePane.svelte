<script lang="ts">
  import { sidePaneOpen } from '$lib/sidePaneStore';
  import {Icon, X} from 'svelte-hero-icons'
  import ApIdataDebug from './APIdataDebug.svelte';

  const closeMenu = () => {
    sidePaneOpen.set(false);
  };
</script>

{#if $sidePaneOpen}
  <div class="smap-side-menu">
    <div>
      <button
        type="button"
        on:click={closeMenu}
        class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span class="sr-only">Close panel</span>
        <!-- Heroicon name: outline/x -->
        <Icon src={X} class="h6 w-6"/>
      </button>
    </div>
    <div class="smap-side-menu-content">
      <ApIdataDebug />
    </div>
  </div>
{/if}

<style lang="postcss">
  .smap-side-menu {
    z-index: 100000;
    inset: 0 0 0 auto;
    //height: calc(100vh - theme(spacing.12));
    height: 100vh;
    @apply overflow-y-hidden;
    @apply absolute w-2/5 bg-gray-200 px-4 shadow-2xl;
  }

  .smap-side-menu-content{
    @apply overflow-y-auto h-full;
  }
</style>
