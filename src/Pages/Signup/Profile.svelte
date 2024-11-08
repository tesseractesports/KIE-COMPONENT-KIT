<script>
  import AuthService from "../../Services/AuthService";
  import { router } from "tinro";
  import UpdateProfile from "./updateProfile.svelte";
  import { userStore, fetchUsers } from "../../Stores/UserStore";
  import { onMount, onDestroy } from "svelte";

  export let close;
  let users = [];
  let user;  // We'll assign the current user from the store
  let profile = {};
  let showModal = false;

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

  function handleExit() {
    close(); // Close the modal or navigate elsewhere
  }

  function handleUpdate() {
    showModal = true; // Open the UpdateProfile modal
  }


  function handleClose() {
    showModal = false; // Close the modal
   
  }
  function handleCloseModal(updatedProfile) {
    showModal = false; // Close the modal

    if (updatedProfile) {
        // Assuming updatedProfile is structured correctly
        profile = {
            ...profile,
            ...updatedProfile // Merge the new profile data
        };
       
    } else {
        console.log("No updated profile received.");
    }
}


</script>

<div
  class="fixed inset-0 bg-gray-900 bg-opacity-40 flex justify-center items-center"
>
  <div
    class="w-[622px] h-[386px] bg-white rounded-xl border border-gray-300 flex-col justify-start items-start inline-flex z-50"
  >
    <div
      class="self-stretch h-[316px] p-6 flex-col justify-center items-start gap-6 flex"
    >
      <div class="justify-start items-center gap-5 inline-flex">
        <div
          class="w-[530px] flex-col justify-start items-start gap-1 inline-flex"
        >
          <div class="text-gray-900 text-xl font-bold leading-loose">
            My profile
          </div>
        </div>
        <div class="bg-white hover:bg-white-300 cursor-pointer rounded-md justify-center items-center flex">
          <div class="w-6 h-6 relative" on:click={handleExit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-6 h-6 text-gray-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
      <div
        class="self-stretch h-[212px] flex-col justify-start items-start gap-3 flex"
      >
        <div class="self-stretch justify-start items-start gap-6 inline-flex">
          <div
            class="w-[155px] self-stretch flex-col justify-start items-center gap-3 inline-flex"
          >
            <img
              class="w-16 h-16 rounded-[32px]"
              src={profile.avatar ? profile.avatar : "/images/user.png"}
              alt="Profile Image"
            />
          </div>
         
          <div class="w-0.5 bg-gray-200 h-[200px] mx-1"></div> 
          <div
            class="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-3 inline-flex"
          >
            <div
              class="self-stretch justify-start items-start gap-3 inline-flex"
            >
              <div
                class="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex"
              >
                <div class="text-gray-700 text-sm font-medium leading-tight">
                  First name
                </div>
                <div class="text-gray-500 text-sm font-normal leading-tight">
                  {profile.firstName}
                </div>
              </div>
              <div
                class="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex"
              >
                <div class="text-gray-700 text-sm font-medium leading-tight">
                  Last name
                </div>
                <div class="text-gray-500 text-sm font-normal leading-tight">
                  {profile.lastName}
                </div>
              </div>
            </div>
            <div
              class="self-stretch justify-start items-start gap-1 inline-flex"
            >
              <div
                class="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex"
              >
                <div class="text-gray-700 text-sm font-medium leading-tight">
                  Email ID
                </div>
                <div class="text-gray-500 text-sm font-normal leading-tight">
                  {profile.email}
                </div>
              </div>
            </div>
            <div
              class="self-stretch justify-start items-start gap-1 inline-flex"
            >
              <div
                class="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex"
              >
                <div class="text-gray-700 text-sm font-medium leading-tight">
                  Phone number
                </div>
                <div class="text-gray-500 text-sm font-normal leading-tight">
                  {profile.phone}
                </div>
              </div>
            </div>
            <div
              class="self-stretch justify-start items-start gap-1 inline-flex"
            >
              <div
                class="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex"
              >
                <div class="text-gray-700 text-sm font-medium leading-tight">
                  Role
                </div>
                <div class="text-gray-500 text-sm font-normal leading-tight">
                  {profile.role}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="self-stretch px-6 py-4 bg-gray-100 rounded-xl border-t border-gray-300 justify-end items-center gap-4 inline-flex">
      <div
        class="px-[17px] py-[9px] bg-blue-600 rounded-md shadow justify-center items-center flex"
      >
        <button
          on:click={handleUpdate}
          class="text-white text-sm font-medium leading-tight"
        >
          Edit details
        </button>
      </div>
    </div>
  </div>
</div>

{#if showModal}
<UpdateProfile
close={handleClose}
onProfileUpdate={handleCloseModal} 
/>

{/if}

<style>
  .fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .z-50 {
    z-index: 50;
  }
</style>
