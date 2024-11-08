<script>
    export let title = "";
    export let subTitle = "";
    export let link = "";
    export let redirect = false;
    export let linkText = ""
  </script>
  
  <!-- profile under review -->
  <div
    class="border-l-4 border-green-400 bg-white shadow-xl p-4 max-w-3xl mx-auto mt-8 mb-8 rounded-sm"
  >
    <div class="flex">
      <div class="flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle opacity="0.2" cx="19.75" cy="20" r="19.75" fill="#34D399"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 32.25C26.1274 32.25 31.5 26.8774 31.5 20.25C31.5 13.6226 26.1274 8.25 19.5 8.25C12.8726 8.25 7.5 13.6226 7.5 20.25C7.5 26.8774 12.8726 32.25 19.5 32.25ZM25.0607 18.3107C25.6464 17.7249 25.6464 16.7751 25.0607 16.1893C24.4749 15.6036 23.5251 15.6036 22.9393 16.1893L18 21.1287L16.0607 19.1893C15.4749 18.6036 14.5251 18.6036 13.9393 19.1893C13.3536 19.7751 13.3536 20.7249 13.9393 21.3107L16.9393 24.3107C17.5251 24.8964 18.4749 24.8964 19.0607 24.3107L25.0607 18.3107Z" fill="#34D399"/>
            </svg>
      </div>
      <div class="ml-3 flex justify-between items-center w-full">
        <div>
            <p class="text-black text-2xl font-medium">
                {title}
            </p>
            <p class=" text-sm text-black mt-2">
                {subTitle}
            </p>
        </div>
        
        {#if redirect}
            <a class=" border-gray-900 bg-gray-900 text-white rounded flex justify-center items-center text-sm font-medium h-9 px-5" href="{link}">{linkText}</a>
        {/if}
      </div>
    </div>
  </div>
  