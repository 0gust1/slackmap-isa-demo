<script lang="ts">
  import type { SlackmapSpot } from '$lib/slackMapAPITypes';
  
  import { getContext } from 'svelte';
  import L from 'leaflet';
  import { Marker } from 'svelte-leafletjs';
  import DivIcon from './DivIcon.svelte';
  import GeoJson from './GeoJson.svelte';

  import { contentPaneOpen, spotReferenceId } from '$lib/ContentPanel/contentPaneStore';

  export let poi: SlackmapSpot;
  const { getMap } = getContext(L);

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

{#if poi.shape}
  <GeoJson
    geoJSONdata={[poi.shape]}
    events={['click']}
    on:click={() => {
      spotClickHandler(poi.rid);
    }}
  />
{/if}
<Marker
  latLng={[poi.coordinates.coordinates[1], poi.coordinates.coordinates[0]]}
  events={['click']}
  on:click={() => {
    spotClickHandler(poi.rid);
  }}
>
  <DivIcon
    options={{
      className: '',
      html: getSpotMarkerHtml(poi)
    }}
  />
</Marker>
