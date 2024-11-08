<script>
    import AuthService from "../../Services/AuthService";
    import { router } from "tinro";
    import { RESTClient } from "../../Utils/RESTClient";
    import {updateProfile, userStore,fetchUsers} from "../../Stores/UserStore";
    export let close;
    import Toast from "../../Services/ToastService";
    import { onMount, onDestroy } from "svelte";
    export let onProfileUpdate;
    //let user = AuthService.getUser();
    let users=[];
    let user;   
    let profile={};
    let showModal = false;
    let avatarPreview = "/images/user.png"; // Default avatar preview
    let fileInput;
  

  // Subscribe to the userStore
  const unsubscribe = userStore.subscribe(value => {
    users = value;
    // Assuming you want to get the currently logged-in user
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
      avatarPreview = profile.avatar || "/images/user.png"; // Set the avatar preview to the user's current avatar or default if no avatar
    }
  });
 
  // Cleanup the subscription when the component is destroyed
  onDestroy(() => {
    unsubscribe();
  });
  
    function handleClose() {
        close(); // Close the modal
    }
  
    const userClient = new RESTClient("users")
  
async function handleUpdateProfile(event) {
    event.preventDefault();

    try {
        const { email, firstName, lastName, phone, role, avatar } = profile;

        // Make the API call to update the user's own profile
        const response = await userClient.patch(`/vendor/edit/${user._id}`, {
            email,
            firstName,
            lastName,
            role,
            phone,
            avatar,
        });
        // Ensure the response has the updated structure
        if (response) {
            Toast.success("Profile updated successfully");
            
            // Update the user store immediately
            updateProfile({ ...response, status: "active" });

            // Call the onProfileUpdate callback with the updated profile data
            onProfileUpdate(response); // Ensure this passes the correct updated user data

            handleClose(); // Close the modal
        } else {
            Toast.error("Error updating profile: Invalid response structure");
        }
    } catch (error) {
        Toast.error("Error updating profile: " + error.message);
    }
}

  
  
    const clearUpload = () => {
        avatarPreview = "/images/user.png"; // Set to default avatar
        profile.avatar = "/images/user.png"; // Clear the avatar in profile object
    };
  
    async function uploadFile(file) {
        const validTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validTypes.includes(file.type)) {
            console.error("Invalid file type");
            return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            console.error("File size exceeds limit");
            return;
        }
  
        const rest = new RESTClient("upload");
        try {
            const response = await rest.uploadFile("", file); // Make sure your RESTClient has the uploadFile method
            const url = response.url;
            profile.avatar = url; // Update profile avatar
            avatarPreview = url; // Update avatar preview
        } catch (error) {
            console.error("Error uploading file", error);
        }
    }
  
    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            uploadFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {

                if(file.size > 5*1024*1024){
                    Toast.error("File size exceeds limit 5mb");
                }else{
                    avatarPreview = e.target.result; // Display preview of the uploaded image
                }
                
            };
            reader.readAsDataURL(file);
        }
    }
  
    function triggerFileInput() {
        fileInput.click(); // Simulate click on hidden file input
    }
    onMount(() => {
    fetchUsers(); // This function fetches and populates the users in the store
  });
  </script>
  
  <div class="fixed inset-0 bg-gray-900 bg-opacity-40 flex justify-center items-center">
    <div class="w-[622px] h-[453px] bg-white rounded-xl border border-gray-300 flex-col justify-start items-start inline-flex">
        <div class="self-stretch h-[382px] p-6 flex-col justify-center items-start gap-6 flex">
            <div class="justify-start items-center gap-5 inline-flex">
                <div class="w-[530px] flex-col justify-start items-start gap-1 inline-flex">
                    <div class="text-gray-700 text-xl font-semibold leading-loose">
                        My Profile
                    </div>
                </div>
                <div class="bg-white rounded-md justify-center items-center flex cursor-pointer" on:click={handleClose}>
                    <div class="w-6 h-6 relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-gray-400">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="self-stretch h-[278px] flex-col justify-start items-start gap-3 flex">
                <div class="self-stretch justify-start items-start gap-6 inline-flex">
                    <div class="flex justify-center items-center gap-5 relative">
                        <!-- Icons Container Positioned Absolutely Above the Image -->
                        <div class="absolute top-0 right-0 flex gap-3">
                            <!-- Delete Icon -->
                             {#if avatarPreview !== "/images/user.png"}
                            <div class="w-5 h-5 cursor-pointer" title="Remove" on:click={clearUpload}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="18" height="18" viewBox="0 0 24 24" stroke-width="1" stroke="red">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </div>
                            {/if}
                            <!-- Upload Icon -->
                            <div class="w-5 h-5 cursor-pointer" title="Upload" on:click={triggerFileInput}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 17C3 16.4477 3.44772 16 4 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17ZM6.29289 6.70711C5.90237 6.31658 5.90237 5.68342 6.29289 5.29289L9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2C10.2652 2 10.5196 2.10536 10.7071 2.29289L13.7071 5.29289C14.0976 5.68342 14.0976 6.31658 13.7071 6.70711C13.3166 7.09763 12.6834 7.09763 12.2929 6.70711L11 5.41421L11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13L9 5.41421L7.70711 6.70711C7.31658 7.09763 6.68342 7.09763 6.29289 6.70711Z" fill="#9CA3AF" />
                                </svg>
                            </div>
                        </div>
                        <!-- Image Container -->
                        <div class="relative top-8 cursor-pointer w-40 h-42 object-fit">
                            <img class=" rounded-[50%] cursor-pointer" src={avatarPreview} alt="Avatar" on:click={triggerFileInput} />
                        </div>
                    </div>
                    <input type="file" accept="image/*" bind:this={fileInput} class="hidden" on:change={handleFileChange} />
                    <div class="w-0.5 bg-gray-200 h-[280px] mx-1"></div>
                    <div class="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-3 inline-flex">
                        <div class="self-stretch h-[60px] flex-col justify-start items-start gap-1 flex">
                            <div class="text-gray-700 text-sm font-medium leading-tight">First name</div>
                            <input
                                type="text"
                                bind:value={profile.firstName}
                                class="self-stretch grow shrink basis-0 px-[13px] py-[9px] bg-white rounded-md border border-gray-300"
                            />
                        </div>
                        <div class="self-stretch h-[60px] flex-col justify-start items-start gap-1 flex">
                            <div class="text-gray-700 text-sm font-medium leading-tight">Last name</div>
                            <input
                                type="text"
                                bind:value={profile.lastName}
                                class="self-stretch grow shrink basis-0 px-[13px] py-[9px] bg-white rounded-md border border-gray-300"
                            />
                        </div>
                        <div class="self-stretch h-[60px] flex-col justify-start items-start gap-1 flex">
                            <div class="text-gray-700 text-sm font-medium leading-tight">Email ID</div>
                            <!-- <input
                                type="email"
                                bind:value={profile.email}
                                class="self-stretch h-9 px-[13px] py-[9px] bg-white rounded-md border border-gray-300"
                                placeholder="example@gmail.com"
                            /> -->
                            <div class="self-stretch h-9 px-[13px] py-[9px] bg-white rounded-md border border-gray-300 flex justify-start items-center text-gray-400">
                                <span>{profile.email}</span>
                            </div>
                        </div>
                        <div class="self-stretch h-[62px] flex-col justify-start items-start gap-1 flex">
                            <div class="text-gray-700 text-sm font-medium leading-tight">Phone Number</div>
                            <div class="self-stretch h-[38px] bg-white rounded-md shadow border border-gray-300 justify-start items-center inline-flex">
                                <div class="text-gray-700 text-sm font-medium leading-tight px-2">+1</div>
                                <input
                                    type="tel"
                                    bind:value={profile.phone}
                                    class="grow shrink basis-0 h-full px-[13px] bg-white rounded-md border-0 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full  px-[13px] py-4 bg-gray-100 rounded-md border-t border-gray-300 justify-end items-center gap-4 inline-flex">
            <div class="self-stretch justify-center items-start gap-4 flex">
           
                <button class="border border-gray-300 bg-white rounded-md text-gray-700 font-semibold py-1.5 px-4" on:click={handleClose}>
                    Cancel
                </button>
                <button class="bg-blue-600 rounded-md text-white font-semibold py-2 px-6 leading-tight" on:click={handleUpdateProfile}>
                  update details
              </button>
            </div>

        </div>
    </div>
  </div>
  
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
  