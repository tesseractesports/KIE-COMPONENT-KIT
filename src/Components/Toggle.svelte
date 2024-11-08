<script>
  import { createEventDispatcher } from "svelte";

  export let onLabel = "On";
  export let offLabel = "Off";
  export let isChecked = false;
  const dispatch = createEventDispatcher();

</script>

<div class="flex items-center space-x-3">
  <!-- Off Label -->
  <span class="text-gray-500 font-medium">{offLabel}</span>
  
  <!-- Toggle Switch -->
  <label class="relative inline-block w-16 h-8">
    <input type="checkbox" bind:checked={isChecked} on:change={(e) => dispatch('check',{isChecked: e.target.checked})} class="sr-only peer cursor-pointer" />    <div
      class="block bg-orange-300 peer-checked:bg-green-500 w-full h-full rounded-full transition-all duration-300 cursor-pointer"
    ></div>

    <!-- Left (Off) Indicator -->
    <img
      src="/images/left-indicator.png"
      alt="Off Indicator"
      class="absolute left-1 top-0 w-8 h-8 transition-opacity duration-300"
      class:opacity-0={isChecked}
    />
    
    <!-- Right (On) Indicator -->
    <img
      src="/images/right-indicator.png"
      alt="On Indicator"
      class="absolute right-1 top-0 w-8 h-8 transition-opacity duration-300"
      class:opacity-0={!isChecked}
    />
  </label>

  <!-- On Label -->
  <span class="text-gray-500 font-medium">{onLabel}</span>
</div>