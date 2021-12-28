<script lang="ts">
  export let spotContent;
  let { spot, content } = spotContent;
</script>

<section class="content">
  <h1>{spot.name}</h1>
  {#if spot}
    <p>
      {JSON.stringify(content, null, 2)}
    </p>
    {#if content}
      <p>{JSON.stringify(content, null, 2)}</p>
    {/if}
  {:else}
    <p>No content was set for this spot</p>
  {/if}
</section>
