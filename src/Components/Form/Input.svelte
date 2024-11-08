<script>
  import { onMount } from "svelte";
  import Tooltip from "../Tooltip.svelte";
  export let type = "text";
  export let value = "";
  export let error;
  export let errorMessage = "";
  export let label = "";
  export let placeholder = "";
  export let preview = false;
  export let phonecode;
  export let enableCountryCode = "true";
  export let useTooltip = false;
  export let disabled = false;
  let showPassword = false;
  let showTooltip = false;
  export let showErrorIcon = true;

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }

  function handleInput({ target: t }) {
    showTooltip = true;
    if (type === "number") {
      value = t.value === "" ? null : t.valueAsNumber;
    } else {
      value = t.value;
    }
  }
  function handleBlur() {
    showTooltip = false;
  }

  onMount(() => {
    if (type === "date" && value) {
      const date = new Date(value);
      value = date.toISOString().split("T")[0];
    } else if (type === "number" && value) {
      value = value.toString();
    }
  });
</script>

<div>
  {#if label}
  <label for="email" class="block text-sm font-medium leading-6 text-gray-900">{label}</label>
  {/if}
  <div class="mt-2">
    {#if !preview}
    {#if type == "phone"}
    <div class:error class="flex items-center border border-gray-300 focus-outline-0 rounded-lg p-0 {error
            ? 'border-red-300 text-red-500'
            : ''}">
      {#if enableCountryCode == "true"}
      <button id="dropdown-phone-button" data-dropdown-toggle="dropdown-phone" class="flex-shrink-0 z-10 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-gray-900 border border-y-0 border-l-0 border-r-1 {error
                ? 'border-red-300 text-red-500'
                : ''}" type="button">
        {phonecode != undefined ? "+" + phonecode : ""}
      </button>
      {/if}
      <div id="dropdown-phone" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-52">
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-phone-button">
          <li>
            <button type="button"
              class="inline-flex w-full py-2 px-3 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              role="menuitem">
              <span class="inline-flex items-center">
                {phonecode}
              </span>
            </button>
          </li>
        </ul>
      </div>
      <div class="relative w-full">
        <input {disabled} type="text" id="phone-input" class="block py-2 px-3 w-full z-20 text-sm text-gray-900 border {enableCountryCode !=
              'true'
                ? 'rounded-lg'
                : 'border-s-0 rounded-e-lg'}   focus:ring-blue-500 focus:border-blue-500 {error
                ? 'ring-red-300 text-red-500'
                : ''}" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" class:error {placeholder} {value} on:input={handleInput}
          on:input on:blur />
        {#if error}
        <span class="material-symbols-outlined absolute inset-y-0 right-0 flex items-center pr-2 text-red-500 text-lg">
          error
        </span>
        {/if}
      </div>
    </div>
    {:else if type == "date"}
    <div class=" relative">
      <input {disabled} class:error type="date" {value} {placeholder} on:input={handleInput} on:input on:blur class="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 {error
              ? 'ring-red-300 text-red-500'
              : ''}" />
    </div>
    {:else if type == "password"}
    <div class="relative">
      <input {disabled} type={showPassword ? "text" : "password" } {placeholder} {value} on:input={handleInput} on:input
        on:blur={handleBlur} on:blur on:keydown class="password-input block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 {error
              ? 'ring-red-300 text-red-500'
              : ''}" />
      <button type="button" class="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500"
        on:click={togglePasswordVisibility}>
        <span class="material-symbols-outlined text-lg {error
                ? ' text-red-500'
                : ''}">
          {showPassword ? "visibility_off" : "visibility"}
        </span>
      </button>

      {#if useTooltip }
      <Tooltip message="Password must contain at least 1 lowercase letter, 1 uppercase letter, 1
            digit, 1 special character (@$!%*?&), and 8 characters minimum" visible={showTooltip} />

      {/if}
    </div>
    {:else}
    <div class=" relative">
      <input {disabled} class:error {type} {placeholder} {value} on:input={handleInput} on:input on:blur class="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 {error
              ? 'ring-red-300 text-red-500'
              : ''}" />
      {#if error && showErrorIcon}
      <span class="material-symbols-outlined absolute inset-y-0 right-0 flex items-center pr-2 text-red-500 text-lg">
        error
      </span>
      {/if}
    </div>
    {/if}
    {:else}
    <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
      {value ? value : placeholder}
    </p>
    {/if}
  </div>
  {#if error}
  <span class="block error-text text-xs text-red-500 pt-1">{errorMessage}</span>
  {/if}
</div>