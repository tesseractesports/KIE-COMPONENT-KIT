<script>
  export let totalItems = 0;
  export let itemsPerPage = 10;
  export let currentPage = 1;
  export let onPageChange = () => {};

  $: totalPages = Math.ceil(totalItems / itemsPerPage);

  function handlePrevious() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }

  function handlePageClick(page) {
    if (page !== currentPage) {
      onPageChange(page);
    }
  }
</script>
<div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-5">
  <div class="flex flex-1 justify-between sm:hidden">
    <a href="#" on:click={handlePrevious}  class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 {currentPage === 1 ? 'disabled' : ''}">Previous</a>
    <a href="#" on:click={handleNext} class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 {currentPage === 1 ? 'disabled' : ''}">Next</a>
  </div>
  <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
    <div>
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span>
        to
        <span class="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span>
        of
        <span class="font-medium">{totalItems}</span>
        results
      </p>
    </div>
    <div>
      <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <a href="#" on:click={handlePrevious} class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 {currentPage === 1 ? 'disabled' : ''}">
          <span class="sr-only">Previous</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
          </svg>
        </a>
        {#each Array(totalPages).fill().map((_, i) => i + 1) as page}
        <a href="#" on:click={() => handlePageClick(page)} class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 {currentPage === page ? 'bg-indigo-600 text-white' : ''}">{page}</a>
        {/each}
        <!-- <span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span> -->
        <a href="#" on:click={handleNext} class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 {currentPage === 1 ? 'disabled' : ''}">
          <span class="sr-only">Next</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" >
            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
          </svg>
        </a>
      </nav>
    </div>
  </div>
</div>



<!-- <nav>
  <ul class="pagination">
    <li class="page-item">
      <span
        class="page-link {currentPage === 1 ? 'disabled' : ''}"
        on:click={handlePrevious}
      >
        Previous
      </span>
    </li>
    {#each Array(totalPages).fill().map((_, i) => i + 1) as page}
      <li class="page-item">
        <span
          class="page-link {currentPage === page ? 'active' : ''}"
          on:click={() => handlePageClick(page)}
        >
          {page}
        </span>
      </li>
    {/each}
    <li class="page-item">
      <span
        class="page-link {currentPage === totalPages ? 'disabled' : ''}"
        on:click={handleNext}
      >
        Next
      </span>
    </li>
  </ul>
</nav> -->
