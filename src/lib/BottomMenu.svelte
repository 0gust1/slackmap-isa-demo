<script lang="ts">
    import {sidePaneOpen } from '$lib/sidePaneStore'
    const openSidePane = ()=>{
        sidePaneOpen.set(true)
    }
</script>

<nav class=" bg-gray-700">
    <ul class="h-8 flex items-center justify-around text-xs text-gray-200">
        <li>
            <button class="" type="button">
                button 1
            </button>
        </li>
        <li>
            <button type="button">
                button 2
            </button>
        </li>
        <li>
            <button type="button">
                button 3
            </button>
        </li>
        <li>
            <button type="button" on:click={openSidePane}>
                see live API data 
            </button>
        </li>
    </ul>
</nav>