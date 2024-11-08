<script>
  import TableFilters from "./TableFilters.svelte";
import TablePagination from "./TablePagination.svelte";

  export let customClass;
  export let border;
  export let collapse;
  export let cellpadding;
  export let cellspacing;
  export let Id;
  export let pagination = false;
  export let filters = false;
  export let items;
</script>

<div class="relative overflow-x-auto space-y-5">
  <!-- {#if filters}
    <TableFilters />
  {/if} -->
<div
  class=" shadow rounded-md border-gray-100 border overflow-hidden mt-4 flex flex-col justify-between"
>
  <div class="space-y-6 bg-white">
    <div class="flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-x-auto relative">
            <table
              class="min-w-full divide-y divide-gray-300 {customClass}"
              id={Id}
              {border}
              {cellpadding}
              {cellspacing}
              style="border-collapse: {collapse};"
            >
              <slot />
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
