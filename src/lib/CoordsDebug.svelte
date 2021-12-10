<script lang="ts">
  import { centerPos, bounds } from '$lib/coordinatesStore';
</script>

<div class="text-xs">
  <p>center pos: {JSON.stringify($centerPos, null, 2)}</p>
  <p>map bounds: {JSON.stringify($bounds, null, 2)}</p>
</div>
