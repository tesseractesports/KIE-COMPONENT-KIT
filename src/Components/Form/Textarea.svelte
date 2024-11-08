<!-- Textarea.svelte -->
<script>
  export let value = "";
  export let placeholder = "";
  export let label = "";
  export let maxLength = 250;
  export let preview = false;
  export let error;
  export let errorMessage = "";
  export let disabled = false;
</script>

<div>
  {#if label}
    <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
      >{label}</label
    >
  {/if}
  <div class="mt-2 relative">
    {#if !preview}
      <textarea
      disabled={disabled}
        class:error
        class="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 {error
              ? 'ring-red-300 text-red-500'
              : ''}"
        bind:value
        {placeholder}
        on:input
        on:blur
        maxlength={maxLength}
      ></textarea>
      {#if error}
        <span
          class="material-symbols-outlined absolute inset-y-0 right-0 flex items-center pr-2 text-red-500 text-lg"
        >
          error
        </span>
      {/if}
    {:else}
      <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
        {value ? value : placeholder}
      </p>
    {/if}
  </div>
  {#if error}
    <span class="block error-text text-xs text-red-500 pt-1"
      >{errorMessage}</span
    >
  {/if}
</div>
