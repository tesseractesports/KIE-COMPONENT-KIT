<script>
  import { onMount } from "svelte";
  import { RESTClient } from "../../Utils/RESTClient";
  import Tooltip from "../Tooltip.svelte";
  import { getFileTypeUrl } from "../../Utils/libs";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let file = null;
  export let uploadUrl = "";
  export let label = "";
  export let helpText = "";
  export let maxFileSize = "5mb";
  export let fileName = "";
  export let id = "";
  export let accept = "";
  export let useTooltip = false;
  let showTooltip = false;
  export let multiple = false; // Keeping this for future flexibility, but it will always be false
  export let error;
  export let errorMessage = "";

  $: extension = getFileExtension(uploadUrl).toLowerCase();
  $: parts = uploadUrl.split("/");
  $: fileName = parts[parts.length - 1];
  $: file = {
    name: fileName,
  };

  const handleFileChange = (event) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles.length > 0) {
      file = uploadedFiles[0];
      dispatch('fileSelected', { file });
      uploadFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      file = droppedFiles[0];
      dispatch('fileSelected', { file });
      uploadFile(file);
    }
  };

  const clearUpload = () => {
    file = null;
    uploadUrl = "";
  };

  async function uploadFile(file) {
    const rest = new RESTClient("upload");
    rest
      .uploadFile("/", file)
      .then((response) => {
        fileName = file.name;
        uploadUrl = response.url;
        extension = getFileExtension(uploadUrl).toLowerCase();
      })
      .catch((error) => {
        console.log("error uploading file", error);
      });
  }

  function getFileExtension(url) {
    let parts = url.split(".");
    let extension = parts[parts.length - 1];
    return extension;
  }
</script>

<label for="file-upload_{id}"
  class="block text-sm font-medium leading-6 text-gray-900 flex flex-row items-center">{label}
  {#if useTooltip}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <span on:mouseenter={()=> (showTooltip = true)}
    on:mouseleave={() => (showTooltip = false)}
    >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
      class="size-5 text-gray-400 ml-3 mt-1">
      <path fill-rule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
        clip-rule="evenodd" />
    </svg>
    {#if showTooltip}
    <Tooltip visible={showTooltip} hoverOnSide={true} message="Tournament report should contain the
              following details about revenue, sponsorship,
              team and participants details, or any other
              information applicable" />
    {/if}
  </span>
  {/if}
</label>

{#if file.name === ""}
<label for="file-upload_{id}"
  class="relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-4 py-4 cursor-pointer"
  on:dragover={handleDragOver} on:drop={handleDrop}>
  <div class="text-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" class=" m-auto">
      <path
        d="M18 26H30M24 20L24 32M34 42H14C11.7909 42 10 40.2091 10 38V10C10 7.79086 11.7909 6 14 6H25.1716C25.702 6 26.2107 6.21071 26.5858 6.58579L37.4142 17.4142C37.7893 17.7893 38 18.298 38 18.8284V38C38 40.2091 36.2091 42 34 42Z"
        stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <div class="mt-1 text-sm text-center leading-6 text-gray-900">
      <span>Drag and drop a file here</span>
    </div>
    <p class="mt-1 text-xs leading-5 text-gray-600 font-semibold">
      Files supported: {helpText}
    </p>
    <button type="button" on:click={()=> document.getElementById(`file-upload_${id}`).click()}
      class="mt-1 text-sm h-10 w-auto leading-6 px-4 py-2 font-bold text-blue-500 shadow-sm focus:ring-blue-500
      rounded-md p-4 rounded-full bg-blue-200 focus:ring-black-2"
      >
      Choose file
    </button>
    <p class="text-xs leading-5 text-gray-600 mt-1 font-semibold">
      Maximum file size <span class="font-bold">{maxFileSize}</span>
    </p>
  </div>
  <input id="file-upload_{id}" name="file-upload_{id}" type="file" {accept} class="sr-only"
    on:change={handleFileChange} />
</label>
{:else}
<div class="mt-3 flex rounded-md shadow-sm">
  <div
    class="flex w-16 h-16 flex-shrink-0 items-center justify-center border rounded-l-md text-sm font-medium uppercase text-gray-600">
    {#if extension === "jpg" || extension === "jpeg" || extension === "png" || extension==="pdf"}
    <img src={getFileTypeUrl(uploadUrl)} alt={file.name} class=" p-2 object-fill" />
    {:else}
    <a href={uploadUrl} target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" class="m-auto">
        <path
          d="M4 1H12C13.1046 1 14 1.89543 14 3V13C14 14.1046 13.1046 15 12 15H4C2.89543 15 2 14.1046 2 13V3C2 1.89543 2.89543 1 4 1Z"
          stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10 1V5C10 5.55228 9.55228 6 9 6H5C4.44772 6 4 5.55228 4 5V1" stroke="#9CA3AF" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </a>
    {/if}
    <!-- {file.name.slice(0, 2)} -->
  </div>
  <div
    class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
    <div class="flex-1 truncate px-4 py-2 text-sm">
      <p class="font-medium text-gray-900 hover:text-gray-600">{file.name}</p>
    </div>
    <div class="flex-shrink-0 pr-2">
      <button on:click={clearUpload} type="button"
        class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-offset-2"
        disabled={uploadUrl==="" ? true : false}>
        <span class="material-symbols-outlined"> close </span>
      </button>
    </div>
  </div>
</div>
{/if}
{#if error}
<span class="block error-text text-xs text-red-500 pt-1">{errorMessage}</span>
{/if}