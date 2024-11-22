<script>
  import { getContext } from "svelte";
  import { TABS } from "./Tabs.svelte";
  import { ThemeConfig } from '../../stores/ThemeConfig';
  
  export let active = false;
  export let Count;

  const tab = { active };
  const { registerTab, selectTab, selectedTab } = getContext(TABS);
  
  // Subscribe to theme
  $: theme = $ThemeConfig;

  registerTab(tab);

  // Compute styles based on theme
  $: tabStyles = {
      default: {
          color: theme.colors.foreground,
          borderColor: 'transparent'
      },
      selected: {
          color: theme.colors.primary,
          borderColor: theme.colors.primary
      },
      hover: {
          borderColor: `${theme.colors.primary}66` // Semi-transparent primary color
      }
  };
</script>

<button
  class="relative flex whitespace-nowrap py-4 px-1 text-sm font-medium uppercase transition-all duration-200"
  class:selected={$selectedTab === tab}
  on:click={() => selectTab(tab)}
  style="
      color: {$selectedTab === tab ? tabStyles.selected.color : tabStyles.default.color};
      border-bottom: 2px solid {$selectedTab === tab ? tabStyles.selected.borderColor : tabStyles.default.borderColor};
  "
>
  <!-- Active Tab Indicator -->
  {#if $selectedTab === tab}
      <div 
          class="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-200"
          style:background-color={theme.colors.primary}
      ></div>
  {/if}

  <!-- Tab Content -->
  <div class="relative z-10">
      <slot />
  </div>
</button>

<style>
  button {
      position: relative;
      overflow: hidden;
  }

  button::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
  }

  button:hover::after {
      transform: translateX(0);
  }

  /* Ensure smooth transitions */
  button, div {
      transition: all 0.2s ease-in-out;
  }

  /* Remove default button styles */
  button:focus {
      outline: none;
  }

  button:focus-visible {
      ring: 2px solid var(--theme-primary);
      ring-offset: 2px;
  }
</style>