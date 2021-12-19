// Here the reactive svelte stores handling the maps coordinates and the
import { derived, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import type { SlackmapCluster, SlackmapSpot } from '$lib/slackMapApiTypes';
type LeafletBounds = {
  _southWest: LeafletCoords;
  _northEast: LeafletCoords;
};

type LeafletCoords = {
  lat: number;
  lng: number;
};

type ViewPortCoordinates = {
  centerPos: LeafletCoords;
  bounds: LeafletBounds;
  zoom: number;
};

const API_URLS = {
  clusters: 'api/clusters.json',
  spots: 'api/spots.json',
  items: 'api/items.json'
};

// Reactively expose the map component coordinates features (zoom, centerPosition, mapBounds)
export const viewPortCoordinates: Writable<ViewPortCoordinates | Record<string, never>> = writable(
  {}
);

// This is a reactive derived asynchronous store. It is derived from the `viewPortCoordinates` store
// whenever the map bounds change:
// - we query the server, which in turn queries the slackmap API with the right parameters
// - the result is then reactively exposed to consumer components
export const dataFromAPI: Readable<Array<SlackmapCluster> | Array<SlackmapSpot>> = derived(
  viewPortCoordinates,
  ($viewPortCoordinates, set) => {
    if ($viewPortCoordinates?.bounds && $viewPortCoordinates.bounds['_southWest']) {
      const SWlat = $viewPortCoordinates.bounds['_southWest'].lat;
      const SWlng = $viewPortCoordinates.bounds['_southWest'].lng;
      const NElat = $viewPortCoordinates.bounds['_northEast'].lat;
      const NElng = $viewPortCoordinates.bounds['_northEast'].lng;

      const zoom = $viewPortCoordinates.zoom;
      const center = $viewPortCoordinates.centerPos;

      let APIFeaturesEndpoint = '';

      if (zoom >= 17) {
        APIFeaturesEndpoint = API_URLS.spots;
      } else {
        APIFeaturesEndpoint = API_URLS.clusters;
      }

      // here we fetch the server endpoint (which will in turn query the slackmap API)
      fetch(
        `${APIFeaturesEndpoint}?bbox=${SWlng},${SWlat},${NElng},${NElat}&zoom=${zoom}&center[type]=Feature&center[geometry][type]=Point&center[geometry][coordinates][]=${center.lng},${center.lat}`
      )
        .then((r) => r.json())
        .then((d) => {
          set(d);
        });
    } else {
      set([]);
    }
  }
);
