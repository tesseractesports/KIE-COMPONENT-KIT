<script>
  import { role_permissions } from "../Stores/UserStore";
  import { RESTClient } from "./RESTClient";

  export let permissions = [];
  export let altMessage = "You are not authorized";
  export let showAltMessage = false;

  const restAuth = new RESTClient("auth");

  let list = [];
  role_permissions.subscribe((value) => {
    list = [...value];
    if (!value || (value && value.length === 0)) {
      restAuth.get("/getConfigs").then((response) => {
        role_permissions.update((value) => response.permissions);
      });
    }
  });

  $: allowed = permissions.every((value) => {
    return list.includes(value);
  });
</script>

{#if allowed}
  <slot></slot>
{:else if showAltMessage}
  <h3 class="text-sm font-semibold text-gray-900">{altMessage}</h3>
{/if}
<!-- <Can permissions={['bhhbv','hghghgh'}>
  
  </Can> -->
