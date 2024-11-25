<script>
  import SectionKIT from './../../Components/SectionKIT.svelte';
  import { ThemeConfig } from '../../stores/ThemeConfig';
    
    $: theme = $ThemeConfig;
</script>
<div class="border-b  border-transparent overflow-hidden overflow-x-auto">
  <SectionKIT>
    <nav class="-mb-px flex space-x-8" aria-label="Tabs" style:border-color={`${theme.colors.foreground}22`}>
      <slot />
    </nav>
  </SectionKIT>
  
</div>

<style>
  /* Hide scrollbar but maintain functionality */
  .scrollbar-hide::-webkit-scrollbar {
      display: none;
  }
  
  .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
  }
</style>
