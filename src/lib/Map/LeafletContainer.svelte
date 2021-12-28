<script lang="ts">
  import type { SlackmapSpot } from '$lib/slackMapAPITypes';

  import L from 'leaflet';
  import { LeafletMap, TileLayer, ScaleControl } from 'svelte-leafletjs';
  import AddButton from './AddButton.svelte';
  import ClusterMarker from './leafletComponents/ClusterMarker.svelte';
  import SpotMarker from './leafletComponents/SpotMarker.svelte';
  import { dataFromAPI, viewPortCoordinates } from '$lib/Map/coordinatesStore';
  import { onMount } from 'svelte';
  import { debounce } from '../utils';

  import { contentPaneOpen, spotReferenceId } from '$lib/ContentPanel/contentPaneStore';

  import 'leaflet/dist/leaflet.css';

  const MARKER_ZOOM_LEVEL = 17;

  L.Icon.Default.prototype.options = { iconUrl: null, className: 'my-div-icon' };
  //console.log(L);

  const mapOptions = {
    // TODO: Default map options
    // right now, the starting point is Lille (FR)
    // we should:
    //   plug to the geolocatiuon API of the browser
    //   manage the map position using localStorage (s)
    center: [50.64118957519531, 3.0376534461975098],
    zoom: 11
  };

  const tileUrl =
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
  const tileUrl2 = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tileUrl3 =
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
  const tileUrl4 =
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png';
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
    // close contentpane

    contentPaneOpen.set(false);

    // after a map drag or zoom, update the reactive stores with new map center and bounds
    const center = map.getCenter();
    const mapBounds = map.getBounds();
    const mapZoom = map.getZoom();

    viewPortCoordinates.set({
      centerPos: center,
      bounds: mapBounds,
      zoom: mapZoom
    });
  };

  const getSpotMarkerHtml = (poi: SlackmapSpot) => {
    if (poi.subtype <= 8) {
      return `<div class="spot-icon">
        <span class="spot-icon-length">${Math.round(poi.length)}m</span>
      </div>`;
    } else {
      return '';
    }
  };

  const spotClickHandler = (rid) => {
    console.log('spot clciker !');
    console.log(rid);
    spotReferenceId.set(rid);
    contentPaneOpen.set(true);
  };
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
    {#if $viewPortCoordinates.zoom >= 15}
      <TileLayer
        url={tileUrl}
        options={{ ...tileLayerOptions, attribution: 'Tiles &copy; Esri' }}
        opacity={1.0}
      />
      <TileLayer
        url={tileUrl4}
        options={{
          ...tileLayerOptions,
          attribution: "&copy; <a href='https://carto.com/attributions'>CARTO</a>"
        }}
        opacity={1.0}
      />
    {:else}
      <TileLayer
        url={tileUrl3}
        options={{ ...tileLayerOptions, attribution: 'Tiles &copy; Esri' }}
      />
    {/if}

    {#each $dataFromAPI as poi}
      {#if $viewPortCoordinates.zoom >= MARKER_ZOOM_LEVEL}
        <SpotMarker {poi} />
      {:else}
        <ClusterMarker {poi} />
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
    height: calc(100vh - theme(spacing.14));
    width: 100vw;
  }

  .over-map {
    z-index: 1000;
  }
</style>
