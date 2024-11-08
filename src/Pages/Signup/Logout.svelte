<script>
  import { onMount } from "svelte/internal";
  import { router } from "tinro";
  import AuthService from "../../Services/AuthService";
  import { RESTClient } from "../../Utils/RESTClient";

  const rest = new RESTClient("auth");

  onMount(() => {
    const tokens = AuthService.getTokens();
    setTimeout(async () => {
      rest
        .post("/logout", { refreshToken: tokens.refresh.token })
        .then((response) => {
          AuthService.logout();
          window.localStorage.clear();
          window.sessionStorage.clear();
          router.goto("/login");
          window.location.reload();
          console.log("Logout successful");
        });
    }, 1000);
  });
</script>

<div>logout...</div>
