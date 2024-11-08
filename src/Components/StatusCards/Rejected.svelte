<script>
  export let title = "";
  export let subTitle = "";
  export let link = "";
  export let redirect = false;
  export let linkText = "";
</script>

<!-- profile under review -->
<div
  class="border-l-4 border-red-400 bg-white shadow-xl p-4 max-w-3xl mx-auto mt-8 mb-8 rounded-sm"
>
  <div class="flex">
    <div class="flex-shrink-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <circle opacity="0.2" cx="19.75" cy="19.75" r="19.75" fill="#F87171" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19.5 32C26.1274 32 31.5 26.6274 31.5 20C31.5 13.3726 26.1274 8 19.5 8C12.8726 8 7.5 13.3726 7.5 20C7.5 26.6274 12.8726 32 19.5 32ZM17.5607 15.9393C16.9749 15.3536 16.0251 15.3536 15.4393 15.9393C14.8536 16.5251 14.8536 17.4749 15.4393 18.0607L17.3787 20L15.4393 21.9393C14.8536 22.5251 14.8536 23.4749 15.4393 24.0607C16.0251 24.6464 16.9749 24.6464 17.5607 24.0607L19.5 22.1213L21.4393 24.0607C22.0251 24.6464 22.9749 24.6464 23.5607 24.0607C24.1464 23.4749 24.1464 22.5251 23.5607 21.9393L21.6213 20L23.5607 18.0607C24.1464 17.4749 24.1464 16.5251 23.5607 15.9393C22.9749 15.3536 22.0251 15.3536 21.4393 15.9393L19.5 17.8787L17.5607 15.9393Z"
          fill="#DC2626"
        />
      </svg>
    </div>
    <div class="ml-3">
      <p class="text-black text-2xl font-medium">
        {title}
      </p>
      <p class=" text-sm text-black mt-2">
        {subTitle}
      </p>
    </div>
    {#if redirect}
      <a
        class=" border-gray-900 bg-gray-900 text-white rounded flex justify-center items-center text-sm font-medium h-9 px-5"
        href={link}>{linkText}</a
      >
    {/if}
  </div>
</div>
