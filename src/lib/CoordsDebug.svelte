<script lang="ts">
  import { viewPortCoordinates } from '$lib/Map/coordinatesStore';
</script>

<div class="text-xs">
  <p>zoomLevel: {JSON.stringify($viewPortCoordinates.zoom,null,2)}</p>
  <p>center pos: {JSON.stringify($viewPortCoordinates.centerPos, null, 2)}</p>
  <p>map bounds: {JSON.stringify($viewPortCoordinates.bounds, null, 2)}</p>
</div>
