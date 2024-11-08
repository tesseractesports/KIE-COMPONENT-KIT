<script>
  import { prevent_default } from "svelte/internal";
  // import auth service and get user
  import AuthService from "../Services/AuthService";
  let user = AuthService.getUser();
  let profileMenuToggle = false;
  let container;
  function onWindowClick(e) {
    if (container.contains(e.target) == false) profileMenuToggle = false;
  }
</script>

<svelte:window on:click={onWindowClick} />
<div
  class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
>
  <div class="flex flex-1 gap-x-4 items-center lg:gap-x-6">
    <span class="flex flex-1 items-center justify-start">
      <img
        class="h-8 w-auto"
        src="/images/krafton_login_logo.png"
        alt="Your Company"
      />
    </span>
    <div class="flex items-center gap-x-4 lg:gap-x-6" bind:this={container}>
      <!-- Profile dropdown -->
      <div class="relative border border-gray-200 rounded p-1">
        <button
          type="button"
          on:click={() => (profileMenuToggle = !profileMenuToggle)}
          class="-m-1.5 flex items-center p-1.5"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span class="sr-only">Open user menu</span>
          <img
            class="h-8 w-8 rounded-full bg-gray-50"
            src="../images/user.png"
            alt=""
          />
          <span class="hidden lg:flex lg:items-center">
            {#if user.firstName && user.lastName}
              <span
                class="ml-4 text-sm font-semibold leading-6 text-gray-900 uppercase"
                aria-hidden="true">
                {user.firstName + " " + user.lastName}
                </span
              >
            {/if} 
            <svg
              class="ml-2 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>
        {#if profileMenuToggle}
          <div
            class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabindex="-1"
          >
            <!-- Active: "bg-gray-50", Not Active: "" -->
            <!-- <a
              href="#"
              class="block px-3 py-1 text-sm leading-6 text-gray-900"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-0">Your profile</a
            > -->
            <a
              href="/logout"
              class="block px-3 py-1 text-sm leading-6 text-gray-900"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-1">Sign out</a
            >
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
