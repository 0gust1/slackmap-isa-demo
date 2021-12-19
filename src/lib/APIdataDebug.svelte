<script lang="ts">
	import { dataFromAPI } from '$lib/Map/coordinatesStore';
</script>

<div class="overflow-scroll h-screen">
    <p>
        number of markers: {$dataFromAPI.length}
    </p>
	<p class="text-xs">
		{JSON.stringify($dataFromAPI, null, 2)}
	</p>
</div>
