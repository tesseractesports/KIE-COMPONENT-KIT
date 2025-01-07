<script>
  import { writable } from 'svelte/store';
  import { fly } from 'svelte/transition';

  // Component props
  export let isOpen = false;
  export let apiBaseUrl = 'https://dog.ceo/api/breeds';

  // Stores
  const uploadedAssets = writable([]);
  const selectedAssets = writable([]);
  const newFiles = writable([]);
  const isLoading = writable(false);
  const error = writable(null);

  // Fetch previous assets
  async function fetchAssets() {
    isLoading.set(true);
    error.set(null);

    try {
      const response = await fetch(`${apiBaseUrl}/image/random/12`);
      if (!response.ok) {
        throw new Error('Failed to fetch previous assets');
      }

      const data = await response.json();

      const transformedAssets = data.message.map((imageUrl, index) => ({
        id: `prev-asset-${index}`,
        name: `Previous Asset ${index + 1}`,
        type: 'image',
        size: 0,
        url: imageUrl
      }));

      uploadedAssets.set(transformedAssets);
    } catch (err) {
      error.set(err.message);
      console.error('Error fetching previous assets:', err);
    } finally {
      isLoading.set(false);
    }
  }

  fetchAssets();

  function handleFileSelect(event) {
    const input = event.target;
    if (input.files) {
      newFiles.set(
        Array.from(input.files).map(file => ({
          id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file.name || 'Unnamed File',
          size: file.size,
          type: file.type || 'unknown',
          file: file,
          previewUrl: URL.createObjectURL(file)
        }))
      );
    }
  }

  async function uploadNewFiles() {
    if (!$newFiles.length) return;

    isLoading.set(true);
    error.set(null);

    try {
      const formData = new FormData();
      $newFiles.forEach(fileItem => {
        formData.append('files', fileItem.file);
      });

      const newAssets = $newFiles.map(fileItem => ({
        id: fileItem.id,
        name: fileItem.name,
        size: fileItem.size,
        type: fileItem.type.split('/')[0],
        url: fileItem.previewUrl
      }));

      uploadedAssets.update(assets => [...assets, ...newAssets]);
      newFiles.set([]);
    } catch (err) {
      error.set(err.message);
      console.error('Error uploading files:', err);
    } finally {
      isLoading.set(false);
    }
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return 'Unknown size';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  }

  const fileTypeConfig = {
    image: {
      icon: '🖼️',
      bgClass: 'bg-blue-50',
      borderClass: 'border-blue-300'
    },
    video: {
      icon: '🎥',
      bgClass: 'bg-green-50',
      borderClass: 'border-green-300'
    },
    document: {
      icon: '📄',
      bgClass: 'bg-gray-50',
      borderClass: 'border-gray-300'
    },
    default: {
      icon: '📁',
      bgClass: 'bg-gray-50',
      borderClass: 'border-gray-300'
    }
  };

  function getFileTypeConfig(type) {
    const typeMap = {
      image: 'image',
      video: 'video',
      'application/pdf': 'document',
      'application/msword': 'document',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'document'
    };

    return fileTypeConfig[typeMap[type]] || fileTypeConfig.default;
  }

  function toggleAssetSelection(assetId) {
    selectedAssets.update(selected =>
      selected.includes(assetId)
        ? selected.filter(id => id !== assetId)
        : [...selected, assetId]
    );
  }

  function confirmSelection() {
    if (!$selectedAssets.length) return;
    console.log('Selected files:', $selectedAssets);
    isOpen = false;
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" transition:fly="{{ y: 200, duration: 300 }}">
    <div class="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
      {#if $isLoading}
        <div class="absolute inset-0 bg-black/25 flex items-center justify-center z-50">
          <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      {/if}

      <div class="p-6 pb-0 flex justify-between items-center border-b">
        <h2 class="text-2xl font-semibold text-gray-800">File Uploader</h2>
        <button on:click={() => (isOpen = false)} class="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full p-2 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="p-6 space-y-6">
        {#if $newFiles.length === 0}
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-all group">
            <input type="file" multiple on:change={handleFileSelect} class="hidden" id="file-upload" />
            <label for="file-upload" class="cursor-pointer block">
              <svg class="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="mt-2 text-sm text-gray-600 group-hover:text-blue-600">Click to upload or drag and drop files</p>
            </label>
          </div>
        {:else}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-700">Files to Upload</h3>
            <ul class="space-y-2">
              {#each $newFiles as fileItem}
                <li class="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                  <div class="flex items-center space-x-3">
                    {#if fileItem.type.startsWith('image/')}
                      <img src={fileItem.previewUrl} alt={fileItem.name} class="h-12 w-12 object-cover rounded" />
                    {:else}
                      <span class="text-2xl">{getFileTypeConfig(fileItem.type).icon}</span>
                    {/if}
                    <div>
                      <span class="font-medium block truncate max-w-[200px]">{fileItem.name}</span>
                      <span class="text-xs text-gray-500">{fileItem.type}</span>
                    </div>
                  </div>
                  <span class="text-sm text-gray-500">{formatFileSize(fileItem.size)}</span>
                </li>
              {/each}
            </ul>
            <div class="flex justify-end space-x-3">
              <button on:click={() => newFiles.set([])} class="text-gray-600 hover:text-gray-900 text-sm">Cancel</button>
              <button on:click={uploadNewFiles} class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Upload Files</button>
            </div>
          </div>
        {/if}
      </div>

      <div class="p-6 pt-0 flex-grow overflow-y-auto">
        <h3 class="text-lg font-medium text-gray-700 mb-4">Previous Assets</h3>
        {#if $uploadedAssets.length === 0}
          <div class="text-center text-gray-500 py-8">
            <p>No assets found</p>
          </div>
        {:else}
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {#each $uploadedAssets as asset}
              <div
                class="border rounded-lg p-4 cursor-pointer transition-all { $selectedAssets.includes(asset.id) ? 'bg-blue-50 border-blue-500' : 'hover:border-blue-300' }"
                on:click={() => toggleAssetSelection(asset.id)}
              >
                {#if asset.type === 'image'}
                  <img src={asset.url} alt={asset.name} class="w-full h-40 object-cover rounded-t-lg mb-3" />
                {:else}
                  <div class="text-5xl text-center mb-3">{getFileTypeConfig(asset.type).icon}</div>
                {/if}
                <div>
                  <h4 class="text-sm font-medium truncate">{asset.name}</h4>
                  <p class="text-xs text-gray-500">{asset.type}</p>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <div class="p-6 border-t flex justify-end space-x-3">
        <button on:click={() => (isOpen = false)} class="text-gray-600 hover:text-gray-900 text-sm">Cancel</button>
        <button on:click={confirmSelection} class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Confirm Selection</button>
      </div>
    </div>
  </div>
{/if}
