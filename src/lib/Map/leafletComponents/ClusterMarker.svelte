<script lang="ts">
  import type { SlackmapCluster } from '$lib/slackMapAPITypes';

  import { getContext } from 'svelte';
  import L from 'leaflet';
  import { Marker } from 'svelte-leafletjs';
  import DivIcon from './DivIcon.svelte';

  export let poi: SlackmapCluster;

  const { getMap } = getContext(L);

  const getClusterMarkerHtml = (poi: SlackmapCluster) => {
    let cssClass = '';
    const spotCount = poi.spot_count;
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
      getMap().setView(
        { lat: poi.coordinates.coordinates[1], lng: poi.coordinates.coordinates[0] },
        poi.expansion_zoom
      );
    };
  };
</script>

<Marker
  events={['click']}
  on:click={getZoomTo(poi)}
  latLng={[poi.coordinates.coordinates[1], poi.coordinates.coordinates[0]]}
>
  <DivIcon
    options={{
      className: '',
      html: getClusterMarkerHtml(poi)
    }}
  />
</Marker>
