<script>
  import { Route, router } from "tinro";
  import UsersForm from "./UsersForm.svelte";
  import UsersView from "./UsersView.svelte";
  import Can from "../../Utils/Can.svelte";
  import { Tasks } from "kie-tmp-config";
  const meta = router.meta();
</script>

{#if $meta.url == "/users/create" || Object.keys($meta.query).length > 0}
  <Can permissions={[Tasks.manageVendorUsers]} >
    <Route path="/create">
      <UsersForm />
    </Route>
  </Can>
{:else}
  <UsersView />
{/if}
