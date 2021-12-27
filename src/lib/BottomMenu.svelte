<script lang="ts">
    import {Icon, Annotation, Bookmark, Cog, Terminal} from "svelte-hero-icons";
    import Portal from "svelte-portal/src/Portal.svelte"
    import ApIdataDebug from "./APIdataDebug.svelte";
    import {sidePaneOpen } from '$lib/sidePaneStore'
    const openSidePane = ()=>{
        sidePaneOpen.set(true)
    }
</script>

<nav class="bg-gray-600">
    <ul class=" h-14 flex items-center justify-around text-xs text-gray-200">
        <li>
            <button class="" type="button">
                <Icon class="w-6 h-6" src={Annotation}/>
                <span>button 1 (fake)</span> 
            </button>
        </li>
        <li>
            <button type="button">
                <Icon class="w-6 h-6" src={Bookmark}/>
                <span>button 2 (fake)</span>
            </button>
        </li>
        <li>
            <button type="button">
                <Icon class="w-6 h-6" src={Cog}/>
                <span>button 3 (fake)</span>
            </button>
        </li>
        <li>
            <button type="button" on:click={openSidePane}>
                <Icon class="w-6 h-6" src={Terminal}/>
                <span>see live API data </span>
            </button>
        </li>
    </ul>
</nav>

<Portal target='#smap-side-pane-content'>
    <ApIdataDebug/>
</Portal>

<style lang='postcss'>
button {
    @apply flex flex-col items-center;
}

</style>