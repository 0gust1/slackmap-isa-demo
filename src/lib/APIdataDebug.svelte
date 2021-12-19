<script lang="ts">
	import { dataFromAPI } from '$lib/Map/coordinatesStore';
</script>

<div class="">
    <p>
    {$dataFromAPI.length} markers (clusters or spots)
    </p>
	<p class="text-xs">
		{JSON.stringify($dataFromAPI, null, 2)}
	</p>
</div>
