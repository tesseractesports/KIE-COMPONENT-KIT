<script>
  import { getContext } from "svelte";
  import { TABS } from "./Tabs.svelte";

  export let active = false;

  const panel = { active };
  const { registerPanel, selectedPanel } = getContext(TABS);

  registerPanel(panel);
</script>

{#if $selectedPanel === panel}
  <slot />
{/if}
