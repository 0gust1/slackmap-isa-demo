<script lang="ts">
    import { sidePaneOpen } from '$lib/sidePaneStore'
import ApIdataDebug from './APIdataDebug.svelte';

    const closeMenu = ()=>{
      sidePaneOpen.set(false);
    }


</script>
{#if $sidePaneOpen}
    
<div class="smap-side-menu">
  <div>
    <button type="button" on:click={closeMenu} class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      <span class="sr-only">Close panel</span>
      <!-- Heroicon name: outline/x -->
      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
  <div>
    <ApIdataDebug/>
  </div>
</div>
{/if}
  
  <style lang='postcss'>
      .smap-side-menu{
        z-index:10000;
        inset: 0 0 0 auto;
        @apply absolute w-2/5 bg-gray-200 px-4 shadow-2xl;
      }


  </style>