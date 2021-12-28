<script lang="ts">
    import {getContext} from 'svelte';
    import L from 'leaflet';
    const {getMarker} = getContext(L.Marker);
    export let options = {};
    let icon;
    $: {
        icon = L.divIcon(options);
        getMarker().setIcon(icon);
    }
    export function getIcon() {
        return icon;
    }
</script>