<script lang="ts">
  import { centerPos, bounds, zoom } from '$lib/Map/coordinatesStore';
</script>

<div class="text-xs">
  <p>zoomLevel: {JSON.stringify($zoom,null,2)}</p>
  <p>center pos: {JSON.stringify($centerPos, null, 2)}</p>
  <p>map bounds: {JSON.stringify($bounds, null, 2)}</p>
</div>
