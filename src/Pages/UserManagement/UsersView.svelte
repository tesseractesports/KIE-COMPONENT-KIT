<script>
  import { onMount } from "svelte";
  import NavTab from "../../Components/NavTabs/NavTab.svelte";
  import TabLink from "../../Components/NavTabs/TabLink.svelte";
  import { Route, router } from "tinro";
  import TableFilters from "../../Components/Table/TableFilters.svelte";
  import TablePagination from "../../Components/Table/TablePagination.svelte";
  import UserTable from "./UserTable.svelte";
  import { fetchUsers, updateUser, userStore } from "../../Stores/UserStore";
  import { Tasks } from "kie-tmp-config";
  import Can from "../../Utils/Can.svelte";
  const meta = router.meta();
  let users = [];
  let filteredItems = [];
  let currentItems = [];
  let itemsPerPage = 10;
  let currentPage = 1;
  let searchFilter = "";

  $: if ($meta.url || searchFilter) {
    applyFilterAndPagination();
  }

  function applyFilterAndPagination() {
    filteredItems = users.filter((user) => {
        if (user.status !== "active") return false;
        if ($meta.url === "/users/all") return true;
        if ($meta.url === "/users/admin") {
          return ["vendor_admin"].includes(user.role);
        }
        if ($meta.url === "/users/member") {
          return [
            "vendor_manager",
            "vendor_super_admin",
            "vendor_assistant_manager",
            "vendor_creative_manager",
          ].includes(user.role);
        }
        return false;
      })
      .filter(user => {
        if (searchFilter === "") return true;
        return (user.firstName + user.lastname + user.email).toLowerCase().includes(searchFilter.toLowerCase());
      });
    currentItems = filteredItems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }

  $: {
    if (searchFilter != ""){
         currentPage=1
        }
  }


  function handlePageChange(page) {
    currentPage = page;
  }

  function handleTabChange(tab) {
    currentPage = 1; // Reset to first page on tab change
  }

  async function handleDelete(user) {
    await updateUser(user, (user.status = "inactive"));
    await fetchUsers();
    applyFilterAndPagination();
  }

  userStore.subscribe((value) => {
      users = value;
  });
  onMount(async () => {
    await fetchUsers();
    
    applyFilterAndPagination();
  });

  $: showUsers = users.length > 0;

</script>

<div
  class="md:flex md:items-center md:justify-between px-4 sm:px-6 lg:px-12 border-b border-gray-200 py-4"
  >
  <div class="min-w-0 flex-1">
    <h2 class="text-xl font-medium leading-2 text-gray-900 sm:truncate">
      My Team
    </h2>
  </div>
  {#if showUsers}
    <div class="mt-4 flex md:ml-4 md:mt-0">
      <Can permissions={[Tasks.manageVendorUsers]}> 
      <a
        href="/users/create"
        class="ml-3 inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-5 h-5 text-white mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.75v14.5m7.25-7.25H4.75"/>
          </svg>Add  User</a
      >
      </Can>
    </div>
  {/if}
</div>
{#if showUsers}
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <NavTab>
          <TabLink on:click={handleTabChange} link="/users/all">All</TabLink>
          <TabLink on:click={handleTabChange} link="/users/admin"
            >Admin Users</TabLink
          >
          <TabLink on:click={handleTabChange} link="/users/member"
            >Members</TabLink
          >
        </NavTab>
      </div>
    </div>
  </div>
  <div class="overflow-y-scroll h-[calc(100vh-180px)] relative">
    <div class="px-4 sm:px-6 lg:px-8">
      <TableFilters enableGridView={false} bind:searchItem={searchFilter} />
      <Route path="/" redirect="/users/all" />
      <UserTable items={currentItems} onDelete={handleDelete} />
      <!-- {#if filteredItems.length > 8} -->
      <TablePagination
        totalItems={filteredItems.length}
        {itemsPerPage}
        {currentPage}
        onPageChange={handlePageChange}
      />
      <!-- {/if} -->
    </div>
  </div>
{:else}
  <div class="text-center flex items-center justify-center h-full flex-col">
    <div class=" pb-40">
      <h3 class="text-sm font-semibold text-gray-900">No users to show</h3>
      <Can permissions={[Tasks.manageVendorUsers]} >
        <a
          href="/users/create"
          class="inline-flex items-center rounded-md mt-4 bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add user
        </a>
      </Can>
    </div>
  </div>
{/if}
