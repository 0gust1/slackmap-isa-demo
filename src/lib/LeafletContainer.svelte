<script>
  import { LeafletMap, TileLayer, Marker, ScaleControl } from 'svelte-leafletjs';
  import { centerPos, bounds, dataFromAPI } from '$lib/coordinatesStore';
  import { onMount } from 'svelte';
  import { debounce } from './utils'
  import 'leaflet/dist/leaflet.css';

  const mapOptions = {
    // starting point is Lille (FR)
    center: [50.64118957519531, 3.0376534461975098],
    zoom: 11
  };
  
  //const tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tileLayerOptions = {
    minZoom: 0,
    maxZoom: 20,
    maxNativeZoom: 19,
    attribution: '© OpenStreetMap contributors'
  };
  const scaleControlOptions = {
    maxWidth: 200
  };

  let scaleControl;
  let leafletMapElement;
  let map;

  onMount(() => {
    map = leafletMapElement.getMap();
    dragZoomHandler();
  });

  const dragZoomHandler = () => {
    // after a map drag or zoom, update the reactive stores with new map center and bounds
    centerPos.set(map.getCenter());
    bounds.set(map.getBounds());
  };

  const debouncedDragZoomHandler = debounce(dragZoomHandler,300)
</script>

<div class="relative leaflet-container">
    <LeafletMap
    bind:this={leafletMapElement}
    options={mapOptions}
    events={['dragend', 'zoomend', 'resize']}
    on:dragend={debounce(dragZoomHandler,300)}
    on:zoomend={debounce(dragZoomHandler,500)}
    on:resize={debounce(dragZoomHandler,500)}
  >
    <TileLayer url={tileUrl} options={tileLayerOptions} />
    {#each $dataFromAPI as poi}
      <Marker latLng={[poi.coordinates.coordinates[1], poi.coordinates.coordinates[0]]} />
    {/each}
    <ScaleControl bind:this={scaleControl} position="bottomleft" options={scaleControlOptions} />
  </LeafletMap>
</div>

<style lang="postcss">
    .leaflet-container{
        height: calc(100vh - theme(spacing.4));
        width: 100vw;
    }
</style>

