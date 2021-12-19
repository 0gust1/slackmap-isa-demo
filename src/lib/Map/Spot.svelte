<script>
  import { createEventDispatcher, getContext, onDestroy, setContext } from 'svelte';
  import L from 'leaflet';
  import EventBridge from 'svelte-leafletjs';
  import { onMount } from 'svelte';
  //import EventBridge from '../lib/EventBridge';

  const { getMap } = getContext(L);

  export let geoJSONdata;
  export let options = {};
  export let events = [];

  let geojson;

  setContext(L.Layer, {
    getLayer: () => geojson
  });

  const dispatch = createEventDispatcher();
  let eventBridge;

  console.log("geoJSONdata")
  console.log(geoJSONdata)

  onMount(()=>{
    if (!geojson) {
      geojson = L.geoJSON(null, options).addTo(getMap());
      //eventBridge = new EventBridge(geojson, dispatch, events);
    }
    geojson.clearLayers();
    geojson.addData(geoJSONdata);
  });

  onDestroy(() => {
    //eventBridge.unregister();
    geojson.removeFrom(getMap());
  });

  export function getGeoJSON() {
    return geojson;
  }
</script>

<div>
  {#if geojson}
    <slot />
  {/if}
</div>
