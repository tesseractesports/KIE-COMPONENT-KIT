<script>
  import { onMount } from "svelte";
  import { router } from "tinro";
  import AuthService from "../Services/AuthService";
  import Loader from "../Components/Loader.svelte";
  import { vendorStore } from "../Stores/VendorsStore";
  import { RESTClient } from "./../Utils/RESTClient";

  let vendor = {};

  vendorStore.subscribe(value => {
    vendor = value;
  });

  onMount(() => {
    const token = AuthService.isLoggedIn();
    if (!token) {
      router.goto("/login"); // Redirect to login if login is required and no token
    }

    let user = AuthService.getUser();

    const rest = new RESTClient("vendor");
    rest
      .post("/check/checkandassignvendor", {})
      .then(_vendor => {
        if (_vendor) {
          vendorStore.set(_vendor);
        } else {
          vendorStore.set(null);
        }
      })
      .catch(error => {});
  });
</script>

<Loader />
<slot />
