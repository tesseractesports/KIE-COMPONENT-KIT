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
  class="border-transparent  uppercase hover:border-transparent flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium {$selectedTab === tab ? "text-yellow-400 border-b-2 border-yellow-400": "text-Charcoal/100"}"
  class:selected={$selectedTab === tab}
  on:click={() => selectTab(tab)}
>
  <slot />
</button>

<style>

</style>
