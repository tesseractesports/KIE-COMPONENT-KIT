<script>
  import { Route, router } from "tinro";
  import VendorRegistration from "./VendorRegistration.svelte";
  const meta = router.meta();
</script>

<!-- {#if $meta.url == "/tournaments/tournament-application" || Object.keys($meta.query).length > 0 } 
{:else}

{/if} -->
<Route path="/" redirect="/vendor/vendor-registration" />
<Route path="/vendor-registration">
  <VendorRegistration />
</Route>
