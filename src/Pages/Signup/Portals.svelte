<script>
  import { vendorStore } from "../../Stores/VendorsStore";
  import { onMount } from "svelte";
  import { RESTClient } from "../../Utils/RESTClient";
  import AuthService from "../../Services/AuthService";
  import { router } from "tinro";

  vendorStore.subscribe(value => {
   // console.log(value);
  });

  let vendorNotAvailable = false;

  onMount(async () => {
    AuthService.getUser().userId;
    const rest = new RESTClient("vendor");
    rest
      .post("/check/checkandassignvendor", {})
      .then(_vendor => {
        if (_vendor) {
          // incompleted
          // 0: Incomplete, 1: Complete, 2: Under Process, 3: Accepted, 4: Rejected
          vendorStore.set(_vendor);
          if(_vendor.statusCode == 0) {
            router.goto("/vendor/vendor-registration");
          } else if (_vendor.statusCode == 1 || _vendor.statusCode == 2 || _vendor.statusCode == 4) {
            if(_vendor.isQuery) {
              router.goto("/vendorapplication");
            } else {
              router.goto("/vendorStatus");
            }
          } else if (_vendor.statusCode == 3) {
            router.goto("/calendar");
          }         
        } else {
          vendorStore.set(null);
          vendorNotAvailable = true;

          // router.goto("/vendor-registration");
        }
      })
      .catch(error => {});
  });
</script>

<div class="text-center">
  {#if vendorNotAvailable}
    <h1 class="text-xl font-bold mb-8">
      Need help? Contact support for assistance.
    </h1>
  {/if}
</div>
