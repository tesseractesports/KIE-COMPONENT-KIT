<script>
  export let show = false;
  export let onConfirm;
  export let onCancel;
  import Toast from "../../Services/ToastService";


  function handleConfirm() {
    onConfirm();
    show = false;
    Toast.success(`User has been deleted`);

  }

  function handleCancel() {
    onCancel();
    show = false;
  }
</script>

{#if show}
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-lg z-50">
      <div class="flex justify-center mb-4">
        <span class="material-symbols-outlined delete-icon text-red-600 bg-red-100 rounded-full p-2 flex items-center justify-center font-bold">delete</span></div>
      <p class="text-center text-m font-semibold">Are you sure you want to delete this user?</p>
      <div class="mt-4 flex justify-end space-x-4">
        <button on:click={handleCancel} class="w-40 border border-gray-300 bg-white  px-8 py-1 rounded">Cancel</button>
        <button on:click={handleConfirm} class="w-40 bg-red-700 text-white px-8 py-1 rounded">Delete user</button>
      </div>
    </div>
    <div class="fixed inset-0 bg-black opacity-50 z-40"></div>
  </div>
{/if}
