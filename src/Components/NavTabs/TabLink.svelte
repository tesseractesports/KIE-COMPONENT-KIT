<script>
  import { active } from "tinro";
  export let Count;
  export let link;
</script>

<a
  href={link}
  use:active
  on:click
  active-class="tab-active"
  class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
>
  <slot />
  {#if Count}
    <span
      class="bg-gray-100 text-gray-900 ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block"
      >{Count}</span
    >
  {/if}
</a>

<style>
  :global(.tab-active) {
    color: #2563eb;
    border-bottom: 2px solid;
  }

  :global(.tab-active span) {
    background: #e0e7ff;
  }
</style>
