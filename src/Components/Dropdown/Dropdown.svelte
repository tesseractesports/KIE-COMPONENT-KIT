<script>
  import { Route, router } from "tinro";

  export let options = [];
  export let defaultSelected = "";
  export let placeholder = "Select option";
  export let onSelect;
  export let navigate = true;
  let container;

  let isOpen = false;
  let selectedValue = defaultSelected;

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  function handleItemClick(value) {
    selectedValue = value;
    if (navigate) {
      router.goto(selectedValue);
    } else {
      if (onSelect) onSelect(selectedValue);
    }
    isOpen = false;
  }

  function onWindowClick(e) {
    if (container.contains(e.target) == false) isOpen = false;
  }
</script>

<svelte:window on:click={onWindowClick} />
<div bind:this={container} class=" relative">
  <button
    class="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    on:click={toggleDropdown}
  >
    {selectedValue
    ? options.find((opt) => opt.value === selectedValue)?.label
    : placeholder}
    <svg
      class="-mr-1 h-5 w-5 text-gray-400"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clip-rule="evenodd"
      />
    </svg>
</button>

  {#if isOpen}
    <div
      class="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <div class="py-1" role="none">
        {#each options as option}
          <div
            class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
            on:click={() => handleItemClick(option.value)}
          >
            {option.label}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>


