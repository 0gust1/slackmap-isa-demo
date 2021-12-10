// Here the reactive svelte stores handling the maps coordinates and the 

import { derived, writable } from 'svelte/store';

// reactively expose the map center point
export const centerPos = writable({});

// reactively expose the map boundaries
export const bounds = writable({});

// This is a reactive derived asynchronous store. It is derived from the `bounds` store
// whenever the map bounds change: 
// - we query the server, which in turn queries the slackmap API with the right parameters
// - the result is then reactively exposed to consumer components
export const dataFromAPI = derived([centerPos, bounds], ([$centerPos, $bounds], set) => {
  if ($bounds && $bounds['_southWest']) {
    const SWlat = $bounds['_southWest'].lat;
    const SWlng = $bounds['_southWest'].lng;
    const NElat = $bounds['_northEast'].lat;
    const NElng = $bounds['_northEast'].lng;

	// here we fetch the server endpoint (which will in turn query the slackmap API)
    fetch(`api/features.json?bbox=${SWlng},${SWlat},${NElng},${NElat}`)
      .then((r) => r.json())
      .then((d) => {
        set(d);
      });
  } else {
    set([]);
  }

});
