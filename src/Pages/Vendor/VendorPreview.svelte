<script>
	import { dateToString } from './../../Utils/converters.js';
  import { checkboxChecked } from "./../../Stores/CheckboxStore";
  import { getFileTypeUrl } from "../../Utils/libs";
  

  export let vendor = {};
  export let currentActive = 0;

  const handleStepClick = (index) => {
    if (index <= currentActive || index === currentActive) {
      currentActive = index;
    }
  };

  $: checkboxChecked.set(vendor.isTermsAccepted);
</script>

<!-- General Information -->
<div class=" shadow rounded-xl overflow-hidden">
  <div class="px-4 py-6 sm:p-8 space-y-6 bg-white">
    <div class="w-full border-b flex flex-col mb-2">
      <p class="font-normal text-xl">Admin Details</p>
      <span class="font-light text-sm text-gray-400 mb-2"
        >This section collects general details about the admin.</span
      >
    </div>
    <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
      <div class="sm:col-span-3">
        <p class="block text-sm font-medium leading-6 text-gray-900">
          First Name
        </p>
        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
          {vendor.firstName}
        </p>
      </div>
      <div class="sm:col-span-3">
        <p class="block text-sm font-medium leading-6 text-gray-900">
          Last Name
        </p>
        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
          {vendor.lastName}
        </p>
      </div>
      <div class="sm:col-span-3">
        <p class="block text-sm font-medium leading-6 text-gray-900">
          Date of Birth
        </p>
        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
          {dateToString(vendor.dateOfBirth)}
        </p>
      </div>
      <div class="sm:col-span-3">
        <p class="block text-sm font-medium leading-6 text-gray-900">
          Designation
        </p>
        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
          {vendor.designation}
        </p>
      </div>
      <div class="sm:col-span-3">
        <p class="block text-sm font-medium leading-6 text-gray-900">
          E-mail Address
        </p>
        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
          {vendor.email}
        </p>
      </div>
      <div class="sm:col-span-3">
        <p class="block text-sm font-medium leading-6 text-gray-900">
          Phone Number
        </p>
        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
          {vendor.phone}
        </p>
      </div>
    </div>
  </div>
  <div
    class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 bg-gray-100"
  >
    <button
      class="text-sm font-semibold leading-6 text-gray-900 bg-white border rounded px-2 py-1"
      on:click|preventDefault={() => handleStepClick(0)} type="button">Edit details</button
    >
  </div>
</div>

<!-- Company Information -->
<div class=" shadow rounded-xl overflow-hidden">
  <div class="px-4 py-6 sm:p-8 space-y-6 bg-white">
    <div class="w-full border-b flex flex-col mb-2">
      <p class="font-normal text-xl">Company Details</p>
      <span class="font-light text-sm text-gray-400 mb-2"
        >This section gathers key details & location about the company.</span
      >
    </div>
    <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
      <div class="sm:col-span-2">
        <p class="block text-sm font-medium leading-6 text-gray-900">
          Company Name
        </p>
        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
          {vendor.companyName}
        </p>
      </div>
      <div class="sm:col-span-2">
        <p
          class="block text-sm font-medium leading-6 text-gray-900
        "
        >
          Market Name
        </p>
        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
          {vendor.companyMarketName}
        </p>
      </div>
      <div class="sm:col-span-2">
        <p class="block text-sm font-medium leading-6 text-gray-900">Country</p>
        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
          {vendor.country}
        </p>
      </div>
      <div class="sm:col-span-2">
        <p class="block text-sm font-medium leading-6 text-gray-900">State</p>
        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
          {vendor.state}
        </p>
      </div>
      <div class="sm:col-span-2">
        <p class="block text-sm font-medium leading-6 text-gray-900">City</p>
        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
          {vendor.city}
        </p>
      </div>
      <div class="sm:col-span-2">
        <p class="block text-sm font-medium leading-6 text-gray-900">
          E-mail Address
        </p>
        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
          {vendor.companyEmail}
        </p>
      </div>
      <div class="sm:col-span-2">
        <p class="block text-sm font-medium leading-6 text-gray-900">Website</p>
        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
          {vendor.website}
        </p>
      </div>
      <div class="sm:col-span-2">
        <p class="block text-sm font-medium leading-6 text-gray-900">
          Company Bio
        </p>
        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
          {vendor.companyBio}
        </p>
      </div>
      <div class="sm:col-span-2">
        <p class="block text-sm font-medium leading-6 text-gray-900">
          Phone Number
        </p>
        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
          {vendor.companyPhone}
        </p>
      </div>

      <div class="sm:col-span-full">
        <p class="block text-sm font-medium leading-6 text-gray-900">
          Upload Company Logo
        </p>
        <ul role="list" class="mt-3">
          <li class="col-span-2 flex rounded-md shadow-sm">
            <div
              class="flex w-16 h-16 flex-shrink-0 items-center justify-center border rounded-l-md text-sm font-medium uppercase text-gray-600"
            >
              <!-- {file.name.slice(0,2)} -->
              <img
                src={vendor.logo}
                alt={vendor.logo}
                class="p-2 object-fill"
              />
            </div>
            <div
              class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white"
            >
              <div class="flex-1 truncate px-4 py-2 text-sm">
                <p
                  class="font-medium text-gray-900 hover:text-gray-600 truncate"
                >
                  {vendor.logo ? vendor.logo.split("/").pop() : "logo"}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div
    class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 bg-gray-100"
  >
    <button
      class="text-sm font-semibold leading-6 text-gray-900 bg-white border rounded px-2 py-1"
      on:click|preventDefault={() => handleStepClick(1)} type="button">Edit details</button
    >
  </div>
</div>

<!-- Bussiness Preview -->
<div class=" shadow rounded-xl overflow-hidden">
  <div class="px-4 py-6 sm:p-8 space-y-6 bg-white">
    <div class="w-full border-b flex flex-col mb-2">
      <p class=" font-normal text-xl">Business Details</p>
      <span class=" font-light text-sm text-gray-400 mb-2"
        > This section collects key operational details and history of the company.</span
      >
    </div>

    <div>
      <p class="block text-sm font-medium text-gray-600">
        Staffing & resources
      </p>
      <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-12">
        <div class="sm:col-span-2">
          <p class="block text-sm font-medium leading-6 text-gray-900">
            Operations staff
          </p>
          <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
            {vendor.operationalStaffCount}
          </p>
        </div>
        <div class="sm:col-span-2">
          <p class="block text-sm font-medium leading-6 text-gray-900">
            Content staff
          </p>
          <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
            {vendor.contentStaffCount}
          </p>
        </div>
        <div class="sm:col-span-2">
          <p class="block text-sm font-medium leading-6 text-gray-900">
            Design staff
          </p>
          <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
            {vendor.designStaffCount}
          </p>
        </div>
        <div class="sm:col-span-2">
          <p class="block text-sm font-medium leading-6 text-gray-900">
            Production staff
          </p>
          <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
            {vendor.productionStaffCount}
          </p>
        </div>
        <div class="sm:col-span-2">
          <p class="block text-sm font-medium leading-6 text-gray-900">
            Others
          </p>
          <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
            {vendor.otherStaffCount}
          </p>
        </div>
      </div>
    </div>
    <hr class="h-px my-8 bg-gray-100 border-0" />
    <div>
      <p class="block text-sm font-medium text-gray-600 mb-2">
        Total tournaments organised
      </p>
      <div
        class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6 bg-gray-50 rounded p-4"
      >
        <div class="sm:col-span-2">
          <p class="block text-sm font-medium text-gray-600 mb-1">Tier 1</p>
          <p class="block text-sm font-medium leading-6 text-gray-900">
            (Prize Pool Above INR 50 Lakhs)
          </p>
          <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
            {vendor.categoryA}
          </p>
        </div>
        <div class="sm:col-span-2">
          <p class="block text-sm font-medium text-gray-600 mb-1">Tier 2</p>
          <p class="block text-sm font-medium leading-6 text-gray-900">
            (Prize Pool Above INR 5 Lakhs)
          </p>
          <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
            {vendor.categoryB}
          </p>
        </div>
        <div class="sm:col-span-2">
          <p class="block text-sm font-medium text-gray-600 mb-1">Tier 3</p>
          <p class="block text-sm font-medium leading-6 text-gray-900">
            (Prize Pool Less than INR 5 Lakhs)
          </p>
          <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
            {vendor.categoryC}
          </p>
        </div>
      </div>
    </div>
    <div class="previous-tournament-block">
      <p class="block text-sm font-medium text-gray-600 mb-2">
        Previous tournaments
      </p>
      {#each vendor.tournaments as tournament, index}
        <div
          class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6 bg-gray-50 rounded p-4"
        >
          <div class="sm:col-span-3">
            <p class="block text-sm font-medium leading-6 text-gray-900">
              Tournament name
            </p>
            <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
              {tournament.tournamentName}
            </p>
          </div>
          <div class="sm:col-span-3">
            <p class="block text-sm font-medium leading-6 text-gray-900">
              Prize pool (in INR)
            </p>
            <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
              {tournament.prizePool}
            </p>
          </div>
          <div class="sm:col-span-2">
            <p class="block text-sm font-medium leading-6 text-gray-900">
              Upload tournament report certificate
            </p>
            <ul role="list" class="mt-3">
              <li class="col-span-2 flex rounded-md shadow-sm">
                <div
                  class="flex w-16 h-16 flex-shrink-0 items-center justify-center border rounded-l-md text-sm font-medium uppercase text-gray-600"
                >
                  <img
                    src={getFileTypeUrl(tournament.reportCertificate)}
                    alt="reportCertificate"
                  />
                </div>
                <div
                  class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white"
                >
                  <div class="flex-1 truncate px-4 py-2 text-sm">
                    <p
                      class="font-medium text-gray-900 hover:text-gray-600 truncate"
                    >
                      {tournament.reportCertificate
                        ? tournament.reportCertificate.split("/").pop()
                        : "Certificate"}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <hr class="h-px my-8 bg-gray-100 border-0" />
      {/each}
    </div>
  </div>
  <div
    class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 bg-gray-100"
  >
    <button
      class="text-sm font-semibold leading-6 text-gray-900 bg-white border rounded px-2 py-1"
      on:click|preventDefault={() => handleStepClick(2)} type="button">Edit details</button
    >
  </div>
</div>
<!-- legal info preview -->
<div class="shadow rounded-xl overflow-hidden">
  <div class="px-4 py-6 sm:p-8 space-y-6 bg-white">
    <div class="w-full border-b flex flex-col mb-2">
      <p class="font-normal text-xl">Legal Details</p>
      <span class="font-light text-sm text-gray-400 mb-2"
        >This section collects legal details of the company.</span
      >
    </div>

    <!-- 3 inputs in a row -->
    <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
      <div class="sm:col-span-2">
        <p class="block text-sm font-medium leading-6 text-gray-900">
          Company legal name
        </p>
        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
          {vendor.legalInformation.legalName}
        </p>
      </div>
      <div class="sm:col-span-2">
        <p class="block text-sm font-medium leading-6 text-gray-900">
          Entity type
        </p>
        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
          {vendor.legalInformation.entityType}
        </p>
      </div>
      <!-- <div class="sm:col-span-2">
        <p class="block text-sm font-medium leading-6 text-gray-900">
          PAN details
        </p>
        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
          {vendor.legalInformation.pan}
        </p>
      </div> -->
    </div>

    <!-- 3 inputs in a row -->
    <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
      <div class="sm:col-span-2">
        <p class="block text-sm font-medium leading-6 text-gray-900">
          GST details
        </p>
        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
          {vendor.legalInformation.gst}
        </p>
      </div>
      <div class="sm:col-span-2">
        <p class="block text-sm font-medium leading-6 text-gray-900">
          Incorporation Date
        </p>
        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
          {dateToString(vendor.legalInformation.incorporationDate)}
        </p>
      </div>
    </div>

    <!-- 3 inputs in a row -->
    <div class="grid gap-x-3 gap-y-8 grid-cols-1">
      <div class="grid gap-x-3 gap-y-8 grid-cols-3">
        <div class="sm:col-span-1">
          <p class="block text-sm font-medium leading-6 text-gray-900">Country</p>
          <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
            {vendor.legalInformation.country}
          </p>
        </div>
      <div class="sm:col-span-1">
        <p class="block text-sm font-medium leading-6 text-gray-900">State</p>
        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
          {vendor.legalInformation.state}
        </p>
      </div>
      <div class="sm:col-span-1">
        <p class="block text-sm font-medium leading-6 text-gray-900">City</p>
        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
          {vendor.legalInformation.city}
        </p>
      </div>
    </div>
    </div>
    <!-- Upload certificates occupying full width -->
    <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
      <div class="sm:col-span-3">
        <p class="block text-sm font-medium leading-6 text-gray-900">
          Upload GST certificate
        </p>
        <ul role="list" class="mt-3">
          <li class="col-span-2 flex rounded-md shadow-sm">
            <div
              class="flex w-16 h-16 flex-shrink-0 items-center justify-center border rounded-l-md text-sm font-medium uppercase text-gray-600"
            >
              <img
                src={getFileTypeUrl(vendor.legalInformation.gstCertificate)}
                alt="GST"
              />
            </div>
            <div
              class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white"
            >
              <div class="flex-1 truncate px-4 py-2 text-sm">
                <p
                  class="font-medium text-gray-900 hover:text-gray-600 truncate"
                >
                  {vendor.legalInformation
                    ? vendor.legalInformation.gstCertificate.split("/").pop()
                    : "GST certificate"}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="sm:col-span-3">
        <p class="block text-sm font-medium leading-6 text-gray-900">
          Upload Incorporation certificate
        </p>
        <ul
          role="list"
          class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2"
        >
          <li class="col-span-2 flex rounded-md shadow-sm">
            <div
              class="flex w-16 h-16 flex-shrink-0 items-center justify-center border rounded-l-md text-sm font-medium uppercase text-gray-600"
            >
              <img
                src={getFileTypeUrl(
                  vendor.legalInformation.incorporationCertificate
                )}
                alt="incorporation"
              />
            </div>
            <div
              class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white"
            >
              <div class="flex-1 truncate px-4 py-2 text-sm">
                <p
                  class="font-medium text-gray-900 hover:text-gray-600 truncate"
                >
                  {vendor.legalInformation
                    ? vendor.legalInformation.incorporationCertificate
                        .split("/")
                        .pop()
                    : "Incorporation certificate"}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div
    class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 bg-gray-100"
  >
    <button
      on:click|preventDefault={() => handleStepClick(3)} type="button"
      class="text-sm font-semibold leading-6 text-gray-900 bg-white border rounded px-2 py-1"
      >Edit details</button
    >
  </div>
</div>

<!-- T&C -->
<div class=" pt-6">
  <h3 class=" text-base font-medium text-black mb-4">Terms & Conditions</h3>
  <div class=" mb-3 mt-1">
    <p class="font-medium text-sm text-black">
      Information Collection and Usage
    </p>
    <ol class="ps-2 mt-2 space-y-1 list-decimal list-inside">
      <li class=" text-gray-500 font-normal text-sm mb-2 ps-2">
        We collect and store information provided by you during the registration
        process, including but not limited to your name, email address, contact
        information, and other relevant details. We may also collect information
        automatically through the use of cookies or other tracking technologies.
      </li>
      <li class=" text-gray-500 font-normal text-sm mb-2 ps-2">
        We use the collected information for purposes including but not limited
        to providing and improving our service, communicating with you, and
        personalizing your experience.
      </li>
      <li class=" text-gray-500 font-normal text-sm mb-2 ps-2">
        For the complete details, please check our
        <a
          class="font-medium text-indigo-600 hover:text-indigo-500"
          href="https://www.battlegroundsmobileindia.com/privacy"
          target="_blank"
        >
          privacy policy.
        </a>
      </li>
    </ol>
  </div>
  <div class=" mb-3 mt-1">
    <p class="font-medium text-sm text-black">Data Sharing and Disclosure</p>
    <ol class="ps-2 mt-2 space-y-1 list-decimal list-inside">
      <li class=" text-gray-500 font-normal text-sm mb-2 ps-2">
        We may share your data with third-party service providers who assist us
        in providing and improving our service, subject to confidentiality
        obligations. We may also disclose your data when required by law or in
        response to valid legal requests.
      </li>
    </ol>
  </div>
  <div class=" mb-3 mt-1">
    <p class="font-medium text-sm text-black">Changes to These Terms</p>
    <ol class="ps-2 mt-2 space-y-1 list-decimal list-inside">
      <li class=" text-gray-500 font-normal text-sm mb-2 ps-2">
        We reserve the right to update or modify these terms and conditions at
        any time. Any changes will be effective immediately upon posting on our
        website or notifying you through other means. Your continued use of our
        service after such changes constitutes your acceptance of the revised
        terms.
      </li>
    </ol>
  </div>
  <div class="relative flex gap-x-3 mb-10">
    <div class="flex h-6 items-center">
      <input
        id="comments"
        name="comments"
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        bind:checked={vendor.isTermsAccepted}
      />
    </div>
    <div class="text-sm leading-6">
      <label for="comments" class="font-medium text-gray-600"
        >By accessing or using our service, you consent to the collection,
        storage, and usage of your data in accordance with these terms and
        conditions.
      </label>
    </div>
  </div>
</div>
