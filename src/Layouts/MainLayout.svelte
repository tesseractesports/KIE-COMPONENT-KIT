<script>
  import SideNav from "../Components/SideNav.svelte";
  import TopNavbar from "../Components/TopNavbar.svelte";
  import { onDestroy, onMount } from "svelte";
  import { router } from "tinro";
  import AuthService from "../Services/AuthService";
  import Loader from "../Components/Loader.svelte";
  import VendorService from "../Services/VendorService";
  import { vendorStore } from "../Stores/VendorsStore";


  import { lastActivityTime } from "../Stores/ActivityTrackerStore";

  import { RESTClient } from "../Utils/RESTClient.js";


  let vendor = null;
  vendorStore.subscribe(value => {
    vendor = value;
    if (vendor && vendor.statusCode === 4) {
      router.goto("/vendorStatus")
    } else if (vendor && vendor.statusCode != 3) {
      router.goto('/portals')
    }
  });

  onMount(() => {
    const token = AuthService.isLoggedIn();
    if (!token) {
      router.goto("/login"); // Redirect to login if login is required and no token
    }
    if (vendor == null) {
      VendorService.loadVendor();
    }

  });


  const ACTIVITY_THRESHOLD = import.meta.env.VITE_IDEALTIME_CHECK_THRESHOLD * 60 * 1000;

  const API_ENDPOINT = import.meta.env.VITE_API_URL;
  const restAuth = new RESTClient("auth");

  let lastActivity = null;
  lastActivityTime.subscribe((value) => (lastActivity = value));

  async function checkAndRefreshToken() {
    const currentTime = Date.now();

    // Check if the user is logged in and if there has been activity within the threshold
    const isLoggedIn = AuthService.isLoggedIn();
    if (isLoggedIn) {
      //console.log(currentTime +"----"+ lastActivity +"----"+ (currentTime-lastActivity) +"  <  "+ ACTIVITY_THRESHOLD);
      if ((currentTime - lastActivity) < ACTIVITY_THRESHOLD) {
        try {
          const refreshToken = restAuth.refreshToken();
          if (refreshToken) {
            const response = await fetch(`${API_ENDPOINT}/auth/refresh-tokens`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(refreshToken),
            });
            const data = await response.json();

            if (!data || !response.ok) {
              //console.error("Failed to refresh token", response);
              return;
            }

            AuthService.login(data); // Assuming 'data' contains the new token information
            //console.log("Access token refreshed");
          }
        } catch (error) {
          console.error("Failed to refresh token", error);
        }
      } else {
        console.log("No activity detected");
        if (!window.location.href.includes("/login")) {
          router.goto("/logout");
        }
      }
    } else if (!window.location.href.includes("/login")) {
      router.goto("/login");
    }
  }

  const intervals = setInterval(checkAndRefreshToken, ACTIVITY_THRESHOLD);
  onDestroy(() => clearInterval(intervals));



</script>

<Loader />
<div>
  <SideNav />
  <div class="lg:pl-64 md:pl-16">
    <TopNavbar />
    <!-- <main class="h-screen overflow-auto" style="height: calc(100vh - 64px);"> -->
    <main class="h-[calc(100vh-64px)]">
      <slot />
    </main>
  </div>
</div>