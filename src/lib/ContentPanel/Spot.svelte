<script lang="ts">
  import type { SlackmapSpotContent, SpotEntity } from '$lib/slackMapAPITypes';
  import { spotLabelsMap } from './contentUtils';
  export let spot: SpotEntity;
  export let content: SlackmapSpotContent[];
</script>

<h1>{spot.name ? spot.name : `unnamed line`}</h1>
<p>{Math.round(spot.length)}m {spotLabelsMap.get(spot.subtype)}</p>
