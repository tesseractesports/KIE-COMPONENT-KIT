<script>
  import { getContext } from "svelte";
  import { TABS } from "./Tabs.svelte";

  export let active = false;
  export let Count;

  const tab = { active };
  const { registerTab, selectTab, selectedTab } = getContext(TABS);

  registerTab(tab);
</script>

<button
  class="border-transparent  uppercase hover:border-gray-200 flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium {$selectedTab === tab ? "text-yellow-400 border-b-2 border-yellow-400": "text-Charcoal/100"}"
  class:selected={$selectedTab === tab}
  on:click={() => selectTab(tab)}
>
  <slot />
  <!-- {#if Count}
    <span
      class="bg-gray-100 text-gray-900 ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block {$selectedTab === tab ? "text-indigo-600 bg-indigo-100": ""}"
      >{Count}</span
    >
  {/if} -->
</button>

<style>

</style>
