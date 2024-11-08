<script>
  import { prevent_default } from "svelte/internal";
  import { sidebarOpen } from "../Stores/SidebarStore";
  import { active, Route, router } from "tinro";
  import AuthService from "../Services/AuthService";
  import Profile from "../Pages/Signup/Profile.svelte"; // Import the profile modal component
  import { userStore, fetchUsers } from "../Stores/UserStore";
  import { onMount, onDestroy } from "svelte";
  
  let container;
  //let user = AuthService.getUser();
  let users = [];
  let user; 
  let profile = {};
  let profileMenuToggle = false;
  let showProfileModal = false; // Modal visibility state
   // Fetch users when the component mounts
   onMount(() => {
    fetchUsers(); // This function fetches and populates the users in the store
  });

  const unsubscribe = userStore.subscribe(value => {
    users = value;
    user = users.find(u => u._id === AuthService.getUser()._id);

    if (user) {
        profile = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            avatar: user.avatar,
        };
        
    }
});


  // Cleanup the subscription when the component is destroyed
  onDestroy(() => { 
    unsubscribe();
  });

  function onWindowClick(e) {
    if (container.contains(e.target)==false) profileMenuToggle = false;
  }

  function toggleSidebar() {
    sidebarOpen.update((value) => !value); // Toggle the sidebar state
  }

  function handleProfileClick() {
    // Toggle the profile modal display
    showProfileModal = true;
    profileMenuToggle = false; // Hide the dropdown
  }

  function closeProfileModal() {
    showProfileModal = false;
  }

  router.subscribe(() => {
    sidebarOpen.set(false); // Close the sidebar
  });
</script>

<svelte:window on:click={onWindowClick} />
<div
  class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
>
  <button
    type="button"
    class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
    on:click={toggleSidebar}
  >
    <span class="sr-only">Open sidebar</span>
    <svg
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  </button>

  <!-- Separator -->
  <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true"></div>

  <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
    <span class="relative flex flex-1"> </span>
    <div class="flex items-center gap-x-4 lg:gap-x-6">
      <button
        type="button"
        class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
      >
        <!-- Placeholder for notifications or other elements -->
      </button>

      <!-- Separator -->
      <div
        class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
        aria-hidden="true"
      ></div>

      <!-- Profile dropdown -->
      <div class="relative" bind:this={container}>
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
            class="h-8 w-8 object-cover rounded-full bg-gray-50"
            src={profile.avatar? profile.avatar : "/images/user.png"}
            alt=""
          />
          <span class="hidden lg:flex lg:items-center">
            <span
              class="ml-4 text-sm font-semibold leading-6 text-gray-900"
              aria-hidden="true"> {profile.firstName && profile.lastName? `${profile.firstName} ${profile.lastName}`: ""}</span
            >
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
            <a
              href="#"
              on:click|preventDefault={handleProfileClick} 
              class="block px-3 py-1 text-sm leading-6 text-gray-900"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-0">Your profile</a>
            <a
              href="/logout"
              class="block px-3 py-1 text-sm leading-6 text-gray-900"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-1">Sign out</a>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<!-- Profile Modal -->
{#if showProfileModal}
  <Profile close={closeProfileModal} />
{/if}
