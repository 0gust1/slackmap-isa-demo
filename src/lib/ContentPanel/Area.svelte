<script lang="ts">
  import type { SlackmapSpotContent, SpotEntity } from '$lib/slackMapAPITypes';
  import { spotLabelsMap } from './contentUtils';
  export let spot: SpotEntity;
  export let content: SlackmapSpotContent[];
</script>

<h1>{spot.name ? spot.name : `unnamed area`}</h1>
<p>{spotLabelsMap.get(spot.subtype)}</p>