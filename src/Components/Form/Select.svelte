<!-- Select.svelte -->
<script>
  import { createEventDispatcher } from "svelte";

  export let options = [];
  export let value = "";
  export let error;
  export let errorMessage = "";
  export let label = "";
  export let valueKey = "value";
  export let labelKey = "label";
  export let placeholder = "";
  export let disabled = false;

  const dispatch = createEventDispatcher();

  function handleChange(event) {
    value = event.target.value;
    const selected = options.find((option) => option[valueKey] === value);
    dispatch("change", selected);
  }
  export let preview = false;
</script>

<div class="sm:col-span-full">
  {#if label}
    <label
      for="select_{value}"
      class="block text-sm font-medium leading-6 text-gray-900">{label}</label
    >
  {/if}
  <div class="mt-2">
    {#if !preview}
      <select
        id="select_{value}"
        class:error
        name="select_{value}"
        autocomplete="select_{value}-name"
        on:change={handleChange}
        on:change
        on:blur
        disabled={disabled}
        class="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 {error
              ? 'ring-red-300 text-red-500'
              : ''}"
        >{#if placeholder != ""}
          <option value="">{placeholder}</option>
        {/if}
        {#if error}
          <span
            class="material-symbols-outlined absolute inset-y-0 right-0 flex items-center pr-2 text-red-500 text-lg"
          >
            error
          </span>
        {/if}
        {#each options as option}
          <option value={option[valueKey]} selected={option[valueKey] === value}
            >{option[labelKey]}</option
          >
        {/each}
      </select>
    {:else}
      <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
        {value ? value : label}
      </p>
    {/if}
  </div>
  {#if error}
    <span class="block error-text text-xs text-red-500 pt-1"
      >{errorMessage}</span
    >
  {/if}
</div>
