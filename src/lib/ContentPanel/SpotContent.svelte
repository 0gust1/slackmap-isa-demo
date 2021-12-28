<script lang="ts">
  import {ItemSubtype as SpotType} from '$lib/slackMapAPITypes';  import type { SpotEntity, SlackmapSpotContent, ItemSubtype } from '$lib/slackMapAPITypes';
  import { spotLabelsMap } from './contentUtils';
  import Spot from './Spot.svelte';
  import Area from './Area.svelte';

  export let spotContent;
  let spot: SpotEntity = spotContent.spot;
  let content: SlackmapSpotContent[] = spotContent.content;
</script>

<section class="content">
  {#if spot.subtype <= SpotType.SPOT_SPACELINE}
    <Spot {spot} {content}/>
  {:else}
    <Area {spot} {content}/>
  {/if}


  <p>{spot.views_count} views</p>
  <p>created at: {spot.created_at}</p>


  <p>
    <a title="Go to this place using Google maps"
    target="_blank"
    rel="noopener noreferrer"
    href={`https://www.google.com/maps/dir/?api=1&destination=${spot.coordinates.coordinates[1]},${spot.coordinates.coordinates[0]}`}>Go to this place using Google maps</a>
  </p>

  <p>
    <a title="See this place on Google maps"
    target="_blank"
    rel="noopener noreferrer"
    href={`https://www.google.com/maps/search/?api=1&query=${spot.coordinates.coordinates[1]},${spot.coordinates.coordinates[0]}`}>See this place on Google maps</a>
  </p>

  <p>Share this spot (TODO)</p>

  {#if spot.photos && spot.photos.length > 0}
  <p>There are photos!</p>
  {/if}
  <hr>
  {#if spot}
    <p>
      {JSON.stringify(spot, null, 2)}
    </p>
    {#if content}
      <p>{JSON.stringify(content, null, 2)}</p>
    {/if}
  {:else}
    <p>No content was set for this spot</p>
  {/if}
</section>
