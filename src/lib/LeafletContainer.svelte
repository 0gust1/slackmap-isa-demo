<script>
  import L from 'leaflet';
  import { LeafletMap, TileLayer, Marker, ScaleControl } from 'svelte-leafletjs';
  import Spot from '$lib/Spot.svelte';
  import AddButton from './AddButton.svelte';
  import DivIcon from '$lib/DivIcon.svelte';
  import { centerPos, bounds, dataFromAPI, zoom, viewPortCoordinates } from '$lib/coordinatesStore';
  import { onMount } from 'svelte';
  import { debounce } from './utils';
  import 'leaflet/dist/leaflet.css';
import ApIdataDebug from './APIdataDebug.svelte';

  const MARKER_ZOOM_LEVEL = 17;

  L.Icon.Default.prototype.options = { iconUrl: null, className: 'my-div-icon' };
  //console.log(L);

  const mapOptions = {
    // starting point is Lille (FR)
    center: [50.64118957519531, 3.0376534461975098],
    zoom: 11
  };

  const tileUrl =
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
  const tileUrl2 = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tileUrl3 = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
  const tileUrl4 = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png';
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
    map.attributionControl.setPosition('topright');
    dragZoomHandler();
    //console.dir(map);
  });

  const dragZoomHandler = () => {
    // after a map drag or zoom, update the reactive stores with new map center and bounds
    const center = map.getCenter();
    const mapBounds = map.getBounds();
    const mapZoom = map.getZoom();

    centerPos.set(center);
    bounds.set(mapBounds);
    zoom.set(mapZoom);

    viewPortCoordinates.set({
      centerPos: center,
      bounds: mapBounds,
      zoom: mapZoom
    });
  };

  const getClusterSize = (spotCount) => {
    return spotCount * 10;
  };

  const getClusterMarkerHtml = (spotCount) => {
    let cssClass = '';
    if (spotCount > 10) {
      if (spotCount > 100) {
        cssClass = 'cluster100';
      } else {
        cssClass = 'cluster10';
      }
    } else {
      cssClass = 'cluster1';
    }
    return `
    <div class="clusterIcon ${cssClass}">
    <span class="count">${spotCount}</span>
    </div>
    `;
  };

  const getZoomTo = (poi) => {
    return () => {
      map.setView(
        { lat: poi.coordinates.coordinates[1], lng: poi.coordinates.coordinates[0] },
        poi.expansion_zoom
      );
    };
  };

  const debouncedDragZoomHandler = debounce(dragZoomHandler, 300);
</script>

<div class="relative leaflet-container">
  <LeafletMap
    bind:this={leafletMapElement}
    options={mapOptions}
    events={['dragend', 'zoomend', 'resize']}
    on:dragend={debounce(dragZoomHandler, 300)}
    on:zoomend={debounce(dragZoomHandler, 500)}
    on:resize={debounce(dragZoomHandler, 500)}
  >
    
    {#if $zoom >= 15}
      <TileLayer url={tileUrl} options={{...tileLayerOptions, attribution:"Tiles &copy; Esri"}} opacity={1.0}/>
      <TileLayer url={tileUrl4} options={{...tileLayerOptions, attribution:"&copy; <a href='https://carto.com/attributions'>CARTO</a>"}} opacity={1.0}/>
    {/if}

    <TileLayer
      url={tileUrl3}
      options={{...tileLayerOptions, attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'}}
      opacity={$zoom >= MARKER_ZOOM_LEVEL ? 0.5 : 1.0}
    />

    {#each $dataFromAPI as poi}
      {#if $zoom >= MARKER_ZOOM_LEVEL}
        {#if poi.shape}
          <Spot geoJSONdata={[poi.shape]} />
        {/if}
        <Marker latLng={[poi.coordinates.coordinates[1], poi.coordinates.coordinates[0]]} />
      {:else}
        <Marker
          events={['click']}
          on:click={getZoomTo(poi)}
          latLng={[poi.coordinates.coordinates[1], poi.coordinates.coordinates[0]]}
        >
          <DivIcon
            options={{
              className: '',
              html: getClusterMarkerHtml(poi.spot_count)
            }}
          />
        </Marker>
      {/if}
    {/each}
    <ScaleControl bind:this={scaleControl} position="bottomleft" options={scaleControlOptions} />
  </LeafletMap>
  <div class="over-map absolute right-8 bottom-8">
    <AddButton />
  </div>
</div>

<style lang="postcss">
  .leaflet-container {
    /*  height: 100vh; */
    height: calc(100vh - theme(spacing.8));
    width: 100vw;
  }

  .over-map {
    z-index: 1000;
  }

  :global(.clusterIcon) {
    @apply w-10 h-10 rounded-full flex justify-center items-center flex-col;
  }
  :global(.count) {
    @apply w-8 h-8 rounded-full bg-opacity-40
    flex justify-center items-center text-center text-xs font-medium text-gray-700;
  }
  :global(.cluster1) {
    @apply bg-green-500 bg-opacity-30;
  }
  :global(.cluster1 .count) {
    @apply bg-green-500 bg-opacity-70;
  }
  :global(.cluster10) {
    @apply bg-yellow-500 bg-opacity-30;
  }
  :global(.cluster10 .count) {
    @apply bg-yellow-500 bg-opacity-70;
  }
  :global(.cluster100) {
    @apply bg-red-500 bg-opacity-30;
  }
  :global(.cluster100 .count) {
    @apply bg-red-500 bg-opacity-70;
  }
</style>
