<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import Input from "../../Components/Form/Input.svelte";
  import Radio from "../../Components/Form/Radio.svelte";
  import { Route, router } from "tinro";
  import {
    userStore,
    addUser,
    updateUser,
    fetchUsers,
  } from "./../../Stores/UserStore";
  import Toast from "../../Services/ToastService";
  const meta = router.meta();

  const dispatch = createEventDispatcher();
  let userId = $meta.query.id;
  let user = {
    firstName: "",
    lastName: "",
    email: "",
    role: "vendor_admin",
    status: "active",
  };
  let disabled = true;
  $: disabled = !user.firstName || !user.lastName || !user.email || !user.role;
  const userType = [
    { value: "vendor_admin", label: "Admin" },
    { value: "vendor_manager", label: "Manager" },
    { value: "vendor_assistant_manager", label: "Assistant Manager" },
    { value: "vendor_creative_manager", label: "Creative Manager" },
  ];

  async function handleSubmit(event) {
    event.preventDefault();
      if (userId) {
        await updateUser(user);
        Toast.success("User details has been updated");
      } else {
        await addUser(user);
        Toast.success("User successfully added");
      }
      await fetchUsers();
      router.goto("/users/all");
    } 
  
  

  onMount(() => {
    if (userId) {
      fetchUsers();
      userStore.subscribe((users) => {
        if (typeof userId !== "undefined") {
          user =
            users.find((u) => u && u._id !== undefined && u._id == userId) ||
            user;
        }
      });
    } else {
      user = user;
    }
  });
</script>

<div class="">
  <nav class="flex px-4 sm:px-6 lg:px-8" aria-label="Breadcrumb">
    <ol role="list" class="flex items-center space-x-4 py-1">
      <li>
        <div class="flex items-center">
          <a
            href="/users"
            class="text-sm font-medium text-gray-700 hover:text-gray-700"
            >My team</a
          >
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <svg
            class="h-5 w-5 flex-shrink-0 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <a
            href="#"
            class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
            aria-current="page"
            >{userId ? "Edit user details" : "New user details"}</a
          >
        </div>
      </li>
    </ol>
  </nav>
  <div
    class="md:flex md:items-center md:justify-between border-b px-4 sm:px-6 lg:px-8 border-t border-gray-100 py-5"
  >
    <div class="min-w-0 flex-1">
      <h2 class="text-xl font-medium leading-2 text-gray-900 sm:truncate">
        {userId ? "Edit user details" : "New user details"}
      </h2>
    </div>
  </div>
</div>

<div class="px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
  <div class="shadow rounded-xl overflow-hidden">
    <div class="space-y-6 bg-white">
      <form on:submit={handleSubmit}>
        <div class="px-4 py-6 sm:p-8">
          <div class="grid gap-x-6 gap-y-8 grid-cols-3 sm:grid-cols-6 mb-4">
            <div class="sm:col-span-6">
              <Radio
                options={userType}
                bind:selectedValue={user.role}
                title="User Type"
              />
            </div>
            <div class="sm:col-span-2">
              <Input
                type="text"
                label="First Name"
                placeholder="First Name"
                bind:value={user.firstName}
              />
            </div>  
            <div class="sm:col-span-2">
              <Input
                type="text"
                label="Last Name"
                placeholder="Last Name"
                bind:value={user.lastName}
              />
            </div>
            <div class="sm:col-span-2">
              <Input
                type="email"
                label="User Email"
                placeholder="example@gmail.com"
                bind:value={user.email}
              />
            </div>
          </div>
          <!-- <div class="relative flex gap-x-3 mb-4">
            <div class="flex h-6 items-center">
              <input
                id="sendStatus"
                name="sendStatus"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div class="text-sm leading-6">
              <label for="sendStatus" class="font-medium text-gray-500"
                >Automatically send an invite link when I save details</label
              >
            </div>
          </div> -->
        </div>
        <div
          class="flex items-center justify-between gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 bg-gray-100"
        >
          <p class="text-gray-500 text-sm">An invite link will automatically</p>
          <div class="flex items-center justify-end gap-x-4">
            <a
              href="/users"
              class="text-sm font-semibold leading-6 text-gray-900 bg-white border rounded px-2 py-1"
              >Cancel</a
            >
            <button
              type="submit"
              class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={disabled}
              >{userId ? "Update user details" : "Invite User"}</button
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
