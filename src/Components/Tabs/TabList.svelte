<script>
  import SectionKIT from './../../components/SectionKIT.svelte';
</script>
<div class="border-b  border-transparent">
  <SectionKIT>
    <nav class="-mb-px flex space-x-8" aria-label="Tabs">
      <slot />
    </nav>
  </SectionKIT>
  
</div>
