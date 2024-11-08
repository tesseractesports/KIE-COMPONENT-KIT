<script>
  // disable the button on disable true
  export let disabled = false;
  export let valid = true;
  export let className = ""; // Accepts custom classes from the parent
</script>
<!-- disable the button on disable true -->
<div>
  <button
    type="button"
    {disabled}
    class={`flex w-full justify-center rounded-m px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-md ${className}`}
    class:bg-gray-800={valid && !className.includes('bg-')}  
    class:bg-gray-400={!valid && !className.includes('bg-')}
    on:click
  >
    <slot />
  </button>
</div>