<script>
  export let title = "";
  export let subTitle = "";
  export let link = "";
  export let redirect = false;
  export let linkText = "";
</script>

<!-- profile under review -->
<div
  class="border-l-4 border-yellow-400 bg-white shadow-xl p-2 max-w-3xl mx-auto mt-3 mb-3 rounded-sm "
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
        <circle opacity="0.2" cx="19.75" cy="19.75" r="19.75" fill="#FCD34D" />
        <path
          d="M10.5 11C10.5 9.34315 11.8431 8 13.5 8H20.3787C21.1743 8 21.9374 8.31607 22.5 8.87868L27.6213 14C28.1839 14.5626 28.5 15.3257 28.5 16.1213V29C28.5 30.6569 27.1569 32 25.5 32H23.2083C24.6334 30.4077 25.5 28.3051 25.5 26C25.5 21.0294 21.4706 17 16.5 17C14.1949 17 12.0923 17.8666 10.5 19.2917V11Z"
          fill="#FBBF24"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.5 20C13.1863 20 10.5 22.6863 10.5 26C10.5 27.1121 10.8034 28.1546 11.3309 29.0477L9.43934 30.9393C8.85355 31.5251 8.85355 32.4749 9.43934 33.0607C10.0251 33.6464 10.9749 33.6464 11.5607 33.0607L13.4523 31.1691C14.3454 31.6966 15.3879 32 16.5 32C19.8137 32 22.5 29.3137 22.5 26C22.5 22.6863 19.8137 20 16.5 20ZM13.5 26C13.5 24.3431 14.8431 23 16.5 23C18.1569 23 19.5 24.3431 19.5 26C19.5 27.6569 18.1569 29 16.5 29C15.6712 29 14.9232 28.6659 14.3787 28.1213C13.8341 27.5768 13.5 26.8288 13.5 26Z"
          fill="#FBBF24"
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
