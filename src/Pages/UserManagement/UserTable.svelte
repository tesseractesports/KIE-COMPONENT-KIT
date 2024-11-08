<script>
  import { Route, router } from "tinro";
  import { onMount } from "svelte";
  import Td from "../../Components/Table/TD.svelte";
  import TH from "../../Components/Table/TH.svelte";
  import Table from "../../Components/Table/Table.svelte";
  import TableBody from "../../Components/Table/TableBody.svelte";
  import TableHeader from "../../Components/Table/TableHeader.svelte";
  import TableRow from "../../Components/Table/TableRow.svelte";
  import { userStore, fetchUsers, updateUser } from "../../Stores/UserStore";
  import Popover from "./../UserManagement/Popover.svelte";
  import Can from "../../Utils/Can.svelte";
  import { Tasks } from "kie-tmp-config";
  import { user } from '../../Stores/UserStore';
  import AuthService from "../../Services/AuthService";

  let userObj = AuthService.getUser();
 
  const meta = router.meta();

  export let onDelete;
  export let items = [];
  const userType = [
    { value: "vendor_admin", label: "Admin" },
    { value: "vendor_manager", label: "Manager" },
    { value: "vendor_assistant_manager", label: "Assistant Manager" },
    { value: "vendor_creative_manager", label: "Creative Manager" },
    { value: "vendor_super_admin", label: "Super Admin" },
  ];
  let showPopover = false;
  let selectedUser = null;

  function confirmDelete(user) {
    selectedUser = user;
    showPopover = true;
  }

  function handleDelete() {
    if (selectedUser && onDelete) {
      onDelete(selectedUser);
      showPopover = false;
      selectedUser = null;
    }
  }

  function handleCancel() {
    showPopover = false;
    selectedUser = null;
  }

  onMount(() => {});
</script>

<Table>
  <TableHeader customClass="bg-gray-50">
    <TableRow>
      <TH customClass="bg-gray-50 w-20 text-center">
        <input
          id="selectAll"
          name="selectAll"
          type="checkbox"
          hidden
          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </TH>
      <TH customClass="bg-gray-50 text-gray-500 w-64">NAME</TH>
      <TH customClass="bg-gray-50 text-gray-500 text-left  text-sm  w-64">USER TYPE<span class="sr-only"></span></TH>
      <TH customClass="bg-gray-50 text-gray-500 text-left pl-2  text-sm">EMAIL</TH>
      <TH customClass="bg-gray-50 w-14"><span class="sr-only"></span></TH>
      <TH customClass="bg-gray-50 w-14"><span class="sr-only">Edit</span></TH>
    </TableRow>
  </TableHeader>
  <TableBody>
    {#if items && items.length > 0}
      {#each items as user}
        <TableRow>     
          <Td customClass="text-left pl-2">
            <input
              id="user_{user.id}"
              name="user_{user.id}"
              type="checkbox"
              hidden
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </Td>
          <Td>{user.firstName} {user.lastName}</Td>
          <Td customClass="text-left pl-2"
            ><span
              class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium capitalize {user.role ==
              'vendor_admin'
                ? 'bg-blue-50 text-blue-700  ring-blue-600/20 '
                : ' bg-gray-200 text-gray-700 '}   "
              >{userType.find((r) => r.value === user.role)?.label}</span
            >
          </Td>
          <Td customClass="text-left pl-2">{user.email}</Td>
          <Td
            customClass="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
          >
          {#if user._id !== userObj._id }
            <Can permissions={[Tasks.manageVendorUsers]} >
              <button
                on:click={() => confirmDelete(user)}
                class="text-indigo-600 hover:text-indigo-900 w-4 h-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20"
                    stroke="#9CA3AF"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg></button
              >
            </Can>
            {/if}
          </Td>
          <Td
            customClass="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
          >
          {#if user._id !== userObj._id }
            <Can permissions={[Tasks.manageVendorUsers]} >
              <a
                href="/users/create?id={user._id}"
                class="text-indigo-600 hover:text-indigo-900 w-4 h-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                <path
                d="M20.2677 3.73223L20.9748 3.02513V3.02513L20.2677 3.73223ZM6.5 21.0355V22.0355C6.76522 22.0355 7.01957 21.9301 7.20711 21.7426L6.5 21.0355ZM3 21.0355H2C2 21.5878 2.44772 22.0355 3 22.0355V21.0355ZM3 17.4644L2.29289 16.7573C2.10536 16.9448 2 17.1992 2 17.4644H3ZM17.4393 4.43934C18.0251 3.85355 18.9748 3.85355 19.5606 4.43934L20.9748 3.02513C19.608 1.65829 17.3919 1.65829 16.0251 3.02513L17.4393 4.43934ZM19.5606 4.43934C20.1464 5.02513 20.1464 5.97487 19.5606 6.56066L20.9748 7.97487C22.3417 6.60804 22.3417 4.39196 20.9748 3.02513L19.5606 4.43934ZM19.5606 6.56066L5.79289 20.3284L7.20711 21.7426L20.9748 7.97487L19.5606 6.56066ZM6.5 20.0355H3V22.0355H6.5V20.0355ZM16.0251 3.02513L2.29289 16.7573L3.70711 18.1715L17.4393 4.43934L16.0251 3.02513ZM2 17.4644V21.0355H4V17.4644H2ZM14.5251 5.93934L18.0606 9.47487L19.4748 8.06066L15.9393 4.52513L14.5251 5.93934Z"
                fill="#9CA3AF"
              />
                </svg></a
              >
            </Can>
            {/if}
          </Td>
        </TableRow>
      {/each}
    {/if}
  </TableBody>
</Table>
<Popover show={showPopover} onConfirm={handleDelete} onCancel={handleCancel} />
