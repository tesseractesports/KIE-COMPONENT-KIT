<div class="mx-auto w-full max-w-sm lg:w-96">
  <div class="inline-flex text-gray-400">
    <span>
      <span class="material-icons">
        chevron_left
      </span>
    </span>
    <span class=" mx-2">Step 1/5</span>
    <span>
      <span class="material-icons">
        chevron_right
      </span>
    </span>
  </div>
  <div>
    <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Company details</h2>
  </div>

  <div class="mt-10">
    <div>
      <form action="#" method="POST" class="space-y-6">
        <div>
          <label for="company_Name" class="block text-sm font-medium leading-6 text-gray-900">Company Name*</label>
          <div class="mt-2">
            <input id="company_Name" name="company_Name" type="text" autocomplete="" required
              class="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <div>
          <label for="company-website" class="block text-sm font-medium leading-6 text-gray-900">Company Website
            URL</label>
          <div class="mt-2 flex rounded-md shadow-sm">
            <span
              class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">http://</span>
            <input type="text" name="company-website" id="company-website"
              class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="www.example.com">
          </div>
        </div>
        <div>
          <label for="active_since" class="block text-sm font-medium leading-6 text-gray-900">Active since*</label>
          <div class="mt-2">
            <input id="active_since" name="active_since" type="text" autocomplete="" required
              class="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <div>
          <label for="account-number" class="block text-sm font-medium leading-6 text-gray-900">Company logo*</label>
          <input
            class="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            aria-describedby="file_input_help" id="file_input" type="file">
          <!-- <p class="mt-1 text-xs text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p> -->
        </div>
        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Next</button>
        </div>
      </form>
    </div>
  </div>
</div>