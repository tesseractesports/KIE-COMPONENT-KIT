<script>
  import { sidebarOpen } from "../Stores/SidebarStore.js"; // Import the store
  import SideNavLinks from "./SideNavLinks.svelte";
  let open;
  sidebarOpen.subscribe((value) => (open = value)); // Subscribe to the store

  function toggleSidebar() {
    sidebarOpen.update((value) => !value); // Toggle the sidebar state
  }
</script>

<!-- Static sidebar for desktop -->
<!-- <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">

  <div
    class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-gray-100 px-6 pb-4"
  >
    <div class="flex h-16 shrink-0 items-center">
      <img
        class="mx-auto h-10 w-auto"
        src="/images/krafton_login_logo.png"
        alt="Your Company"
      />
    </div>
    <nav class="flex flex-1 flex-col">
      <SideNavLinks />
    </nav>
  </div>
</div> -->
<!-- <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col" > -->
<div
  class=" hidden md:fixed md:inset-y-0 md:z-50 md:flex lg:w-64 md:w-16 md:flex-col"
>
  <!-- Sidebar component, swap this element with another sidebar if you like -->
  <div
    class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-800 lg:px-6 pb-4 md:p-2"
  >
    <div class="flex h-16 shrink-0 items-center">
      <img
        class="h-10 w-auto"
        src="/images/header-logo.svg"
        alt="Your Company"
      />
    </div>
    <nav class="flex flex-1 flex-col">
      <SideNavLinks />
    </nav>
  </div>
</div>

{#if open}
  <div class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-900/80"></div>

    <div class="fixed inset-0 flex">
      <div class="relative mr-16 flex w-full max-w-xs flex-1">
        <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
          <button type="button" class="-m-2.5 p-2.5" on:click={toggleSidebar}>
            <span class="sr-only">Close sidebar</span>
            <svg
              class="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div
          class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4"
        >
          <div class="flex h-16 shrink-0 items-center">
            <img
              class="h-10 w-auto"
              src="/images/header-logo.svg"
              alt="Your Company"
            />
          </div>
          <nav class="flex flex-1 flex-col">
            <SideNavLinks />
          </nav>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(.link-active) {
     color: #ffffff;
     background: var(--gray-900, #111827);
 }
</style>
