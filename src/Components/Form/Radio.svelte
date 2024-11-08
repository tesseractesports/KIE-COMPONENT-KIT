<script>
  export let title = "";
  export let preview;
  export let options;
  export let selectedValue = "";
  export let name;
  export let error;
  export let errorMessage = "";

  const slugify = (str = "") =>
    str.toLowerCase().replace(/ /g, "-").replace(/\./g, "");
</script>

<div class=" flex flex-col h-full justify-around">
  <p class="block text-sm font-medium leading-6 text-gray-900">{title}</p>
  {#if !preview}
    <div class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
      {#each options as { value, label }}
        <div class="flex items-center">
          <input
            class:error
            class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            type="radio"
            id={slugify(label)}
            bind:group={selectedValue}
            name={`${name}`}
            {value}
          />
          <label
            class="ml-3 whitespace-nowrap block text-sm font-medium leading-6 text-gray-500"
            for={slugify(label)}
          >
            {label}
          </label>
        </div>
      {/each}
    </div>
  {:else}
    <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
      {selectedValue ? selectedValue : "No option selected"}
    </p>
  {/if}
  {#if error}
    <span class="block error-text text-xs text-red-500 pt-1"
      >{errorMessage}</span
    >
  {/if}
</div>
