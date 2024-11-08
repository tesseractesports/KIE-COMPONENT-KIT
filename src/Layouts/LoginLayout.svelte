<script>
  import { onMount } from "svelte";
  import { router } from "tinro";
  import AuthService from "../Services/AuthService";
  import Loader from "../Components/Loader.svelte";
  import { vendorStore } from "../Stores/VendorsStore";
  import VendorService from "../Services/VendorService";

  let vendor = {};
  vendorStore.subscribe(value => {
    vendor = value;
  });

  onMount(() => {
    const token = AuthService.isLoggedIn();
    if (token) {
      if (vendor == null) {
         VendorService.loadVendor();
      }
      router.goto("/portals"); // Redirect to dashboard if login is not required and token is present
    }

  });
</script>

<Loader />
<div class="flex min-h-screen items-center flex-col justify-center px-6 py-8 lg:px-8 relative">
  <img
      class="absolute inset-0 h-full w-full object-cover -z-10"
      src="/images/loading.png"
      alt=""
    />
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
    <slot />
  </div>
</div>

