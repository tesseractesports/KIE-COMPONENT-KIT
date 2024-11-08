<script>
  import { onMount } from "svelte";
  import { Route, router } from "tinro";
  import Comments from "../../Components/Comments.svelte";
  import NavTab from "../../Components/NavTabs/NavTab.svelte";
  import TabLink from "../../Components/NavTabs/TabLink.svelte";
  import { vendorStore } from "../../Stores/VendorsStore";
  import VendorChat from "./VendorChat.svelte";
  import { getFileTypeUrl } from "../../Utils/libs";
  import { dateToString } from "../../Utils/converters";

  const meta = router.meta();
  let vendorData = {};
  export let vendor = {
    status: "",
    _id:"",
    statusCode: 0,
    firstName: "",
    lastName: "",
    designation: "",
    companyName: "",
    dateOfBirth: "",
    companyMarketName: "",
    companyEmail: "",
    companyPhone: "",
    companyBio: "",
    website: "",
    logo: [{ url: "" }],
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    address: "",
    totalTurnover: "",
    operationalStaffCount: 0,
    contentStaffCount: 0,
    designStaffCount: 0,
    productionStaffCount: 0,
    otherStaffCount: 0,
    categoryA: 0,
    categoryB: 0,
    categoryC: 0,
    tournaments: [
      {
        tournamentName: "",
        prizePool: "",
        reportCertificate: "",
      },
    ],
    legalInformation: {
      legalName: "",
      entityType: "",
      // pan: "",
      gst: "",
      incorporationDate: null,
      gstCertificate: "",
      incorporationCertificate: "",
      country: " ",
      state: " ",
      city: " ",
    },
    applicationDate: null,
  };

  vendorStore.subscribe((value) => {
    vendor = { ...vendor, ...value };
    vendorData = vendor;
  });
  let routePath = "/vendorProfile";

  function getStatusClasses(status) {
    switch (status) {
      case 0:
        return "bg-yellow-100 text-yellow-800";
      case 1:
        return "bg-yellow-100 text-yellow-800 ";
      case 2:
        return "bg-yellow-100 text-yellow-800";
      case 3:
        return "bg-green-100 text-green-800";
      case 4:
        return "bg-red-100 text-red-800";
    }
  }
</script>

<div class="bg-gray-50">
  <nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex items-center space-x-4 py-1">
      <li>
        <div class="flex items-center">
          <a
            href="/vendorProfile"
            class="ml-4 text-sm font-medium text-gray-700 hover:text-gray-700"
            >My Profile</a
          >
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <svg
            class="h-5 w-5 flex-shrink-0 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clip-rule="evenodd"
            />
          </svg>
          <a
            href="#"
            class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
            aria-current="page">{vendor.firstName} {vendor.lastName}</a
          >
        </div>
      </li>
    </ol>
  </nav>

  <div
    class="w-full border border-x-0 bg-white flex px-4 sm:px-6 lg:px-8 justify-between items-center"
  >
    <p class=" font-semibold py-4 text-xl capitalize">
      {vendor.firstName}
      {vendor.lastName}
    </p>
    <div class=" flex gap-3">
      <div
        class="flex items-center {getStatusClasses(
          vendor.statusCode
        )} rounded-full p-1 px-4"
      >
        <span class="capitalize text-sm">{vendor.status}</span>
      </div>
    </div>
  </div>
  <div
    class="grid grid-cols-1 gap-x-4 px-4 sm:px-6 lg:px-8 gap-y-5 md:grid-cols-6 overflow-hidden"
  >
    <div
      class=" md:col-span-4 space-y-5 overflow-y-scroll h-[calc(100vh-160px)]"
    >
      <div class="">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <NavTab>
              <TabLink Count="" link="{routePath}/GeneralInfo"
                >General details</TabLink
              >
              <TabLink Count="" link="{routePath}/CompanyInfo"
                >Company details</TabLink
              >
              <TabLink Count="" link="{routePath}/BusinessInfo"
                >Business details</TabLink
              >
              <TabLink Count="" link="{routePath}/LegalInfo"
                >Legal details</TabLink
              >
              <!-- <TabLink Count="" link="{routePath}/activity">Activity</TabLink> -->
            </NavTab>
          </div>
        </div>
        <div class="py-4">
          <Route path="/" redirect="{routePath}/GeneralInfo" let:meta />
          {#if $meta.url == routePath + "/GeneralInfo"}
            <div class=" shadow rounded-xl overflow-hidden">
              <div class="px-4 py-6 sm:p-8 space-y-6 bg-white">
                <div class="w-full border-b flex flex-col mb-2">
                  <p class="font-normal text-xl">General Details</p>
                  <span class="font-light text-sm text-gray-400 mb-2"
                    >This section collects general details about the admin.</span
                  >
                </div>
                <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
                  <div class="sm:col-span-3">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First Name
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {vendor.firstName}
                    </p>
                  </div>
                  <div class="sm:col-span-3">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last Name
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {vendor.lastName}
                    </p>
                  </div>
                  <div class="sm:col-span-3">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Date Of Birth
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {dateToString(vendor.dateOfBirth)}
                    </p>
                  </div>
                  <div class="sm:col-span-3">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Designation
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {vendor.designation}
                    </p>
                  </div>
                  <div class="sm:col-span-3">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      E-mail Address
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {vendor.email}
                    </p>
                  </div>
                  <div class="sm:col-span-3">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone Number
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {vendor.phone}
                    </p>
                  </div>
                </div>
              </div>
              {#if vendor.statusCode < 3}
                <div
                  class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 bg-gray-100"
                >
                  <a
                    href="/vendor/vendor-registration?id={vendor._id}&selectedTab=0&section=GeneralInfo"
                    class="text-sm font-semibold leading-6 text-gray-900 bg-white border rounded px-2 py-1"
                    >Edit details</a
                  >
                </div>
              {/if}
            </div>
          {:else if $meta.url == routePath + "/CompanyInfo"}
            <div class=" shadow rounded-xl overflow-hidden">
              <div class="px-4 py-6 sm:p-8 space-y-6 bg-white">
                <div class="w-full border-b flex flex-col mb-2">
                  <p class="font-normal text-xl">Company Details</p>
                  <span class="font-light text-sm text-gray-400 mb-2"
                    >This section gathers key details & location about the company.</span
                  >
                </div>
                <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
                  <div class="sm:col-span-3">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Company Name
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {vendor.companyName}
                    </p>
                  </div>
                  <div class="sm:col-span-3">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Market Name
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {vendor.companyMarketName}
                    </p>
                  </div>
                  <div class="sm:col-span-2">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Country
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {vendor.country}
                    </p>
                  </div>
                  <div class="sm:col-span-2">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {vendor.state}
                    </p>
                  </div>
                  <div class="sm:col-span-2">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {vendor.city}
                    </p>
                  </div>
                  <div class="sm:col-span-2">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      E-mail Address
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {vendor.companyEmail}
                    </p>
                  </div>
                  <div class="sm:col-span-2">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone Number
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {vendor.companyPhone}
                    </p>
                  </div>
                  <div class="sm:col-span-2">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Website
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {vendor.website}
                    </p>
                  </div>
                  <div class="sm:col-span-full">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Company Bio
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {vendor.companyBio}
                    </p>
                  </div>
                  <div class="sm:col-span-2">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Upload Company Logo
                    </p>
                    <ul role="list" class="mt-3">
                      <li class="col-span-2 flex rounded-md shadow-sm">
                        <div
                          class="flex w-16 h-16 flex-shrink-0 items-center justify-center border rounded-l-md text-sm font-medium uppercase text-gray-600"
                        >
                          <img
                            src={vendor.logo}
                            alt={vendor.logo}
                            class="p-2 object-fill"
                          />
                        </div>
                        <div
                          class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white"
                        >
                          <div
                            class="flex justify-between items-center truncate px-4 py-2 text-sm w-full"
                          >
                            <p
                              class="font-medium text-gray-900 hover:text-gray-600 truncate"
                            >
                              {typeof vendor.logo === "string"
                                ? vendor.logo.split("/").pop()
                                : ""}
                            </p>
                            <a href={vendor.logo} download class="">
                              <span
                                class="material-symbols-outlined font-medium text-gray-400 hover:text-gray-600"
                              >
                                download
                              </span>
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {#if vendor.statusCode < 3}
                <div
                  class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 bg-gray-100"
                >
                  <a
                    href="/vendor/vendor-registration?id={vendor._id}&selectedTab=1&section=CompanyInfo"
                    class="text-sm font-semibold leading-6 text-gray-900 bg-white border rounded px-2 py-1"
                    >Edit details</a
                  >
                </div>
              {/if}
            </div>
          {:else if $meta.url == routePath + "/BusinessInfo"}
            <div class=" shadow rounded-xl overflow-hidden">
              <div class="px-4 py-6 sm:p-8 space-y-6 bg-white">
                <div class="w-full border-b flex flex-col mb-2">
                  <p class=" font-normal text-xl">Business Details</p>
                  <span class=" font-light text-sm text-gray-400 mb-2"
                    >This section collects key operational details and history of the company.</span
                  >
                </div>

                <div>
                  <p class="block text-sm font-medium text-gray-600">
                    Staffing & resources
                  </p>
                  <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-12">
                    <div class="sm:col-span-2">
                      <p
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Operations staff
                      </p>
                      <p
                        class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                      >
                        {vendor.operationalStaffCount}
                      </p>
                    </div>
                    <div class="sm:col-span-2">
                      <p
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Content staff
                      </p>
                      <p
                        class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                      >
                        {vendor.contentStaffCount}
                      </p>
                    </div>
                    <div class="sm:col-span-2">
                      <p
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Design staff
                      </p>
                      <p
                        class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                      >
                        {vendor.designStaffCount}
                      </p>
                    </div>
                    <div class="sm:col-span-2">
                      <p
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Production staff
                      </p>
                      <p
                        class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                      >
                        {vendor.productionStaffCount}
                      </p>
                    </div>
                    <div class="sm:col-span-2">
                      <p
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Others
                      </p>
                      <p
                        class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                      >
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
                      <p class="block text-sm font-medium text-gray-600 mb-1">
                        Tier 1
                      </p>
                      <p
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        (Prize Pool Above INR 50 Lakhs)
                      </p>
                      <p
                        class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                      >
                        {vendor.categoryA}
                      </p>
                    </div>
                    <div class="sm:col-span-2">
                      <p class="block text-sm font-medium text-gray-600 mb-1">
                        Tier 2
                      </p>
                      <p
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        (Prize Pool Above INR 5 Lakhs)
                      </p>
                      <p
                        class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                      >
                        {vendor.categoryB}
                      </p>
                    </div>
                    <div class="sm:col-span-2">
                      <p class="block text-sm font-medium text-gray-600 mb-1">
                      Tier 3
                      </p>
                      <p
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        (Prize Pool Less than INR 5 lakhs)
                      </p>
                      <p
                        class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                      >
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
                        <p
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Tournament name
                        </p>
                        <p
                          class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                        >
                          {tournament.tournamentName}
                        </p>
                      </div>
                      <div class="sm:col-span-3">
                        <p
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Prize pool (in INR)
                        </p>
                        <p
                          class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                        >
                          {tournament.prizePool}
                        </p>
                      </div>
                      <div class="sm:col-span-2">
                        <p
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Upload tournament report certificate
                        </p>
                        <ul role="list" class="mt-3">
                          <li class="col-span-2 flex rounded-md shadow-sm">
                            <div
                              class="flex w-16 h-16 flex-shrink-0 items-center justify-center border rounded-l-md text-sm font-medium uppercase text-gray-600"
                            >
                              <img
                                src={getFileTypeUrl(tournament.reportCertificate) }
                                alt="reportCertificate"
                              />
                            </div>
                            <div
                              class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white"
                            >
                              <div
                                class="flex justify-between items-center truncate px-4 py-2 text-sm w-full"
                              >
                                <p
                                  class="font-medium text-gray-900 hover:text-gray-600 truncate"
                                >
                                  {tournament.reportCertificate
                                    ? tournament.reportCertificate
                                        .split("/")
                                        .pop()
                                    : "Certificate"}
                                </p>
                                <a
                                  href={tournament.reportCertificate}
                                  download
                                  class=""
                                >
                                  <span
                                    class="material-symbols-outlined font-medium text-gray-400 hover:text-gray-600"
                                  >
                                    download
                                  </span>
                                </a>
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
              {#if vendor.statusCode < 3}
                <div
                  class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 bg-gray-100"
                >
                  <a
                    href="/vendor/vendor-registration?id={vendor._id}&selectedTab=2&section=BusinessInfo"
                    class="text-sm font-semibold leading-6 text-gray-900 bg-white border rounded px-2 py-1"
                    >Edit details</a
                  >
                </div>
              {/if}
            </div>
          {:else if $meta.url == routePath + "/LegalInfo"}
            <div class=" shadow rounded-xl overflow-hidden">
              <div class="px-4 py-6 sm:p-8 space-y-6 bg-white">
                <div class="w-full border-b flex flex-col mb-2">
                  <p class="font-normal text-xl">Legal Details</p>
                  <span class="font-light text-sm text-gray-400 mb-2"
                    >This section collects legal details of the company.</span
                  >
                </div>
                <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
                  <div class="sm:col-span-3">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Company legal name
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {vendor.legalInformation.legalName}
                    </p>
                  </div>
                  <div class="sm:col-span-3">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Entity type
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {vendor.legalInformation.entityType}
                    </p>
                  </div>
                </div>
                <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
                  <!-- <div class="sm:col-span-3">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      PAN details
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {vendor.legalInformation.pan}
                    </p>
                  </div> -->
                  <div class="sm:col-span-3">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      GST details
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {vendor.legalInformation.gst}
                    </p>
                  </div>
                </div>
                <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
                  <div class="sm:col-span-3">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Incorporation Date
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {dateToString(vendor.legalInformation.incorporationDate)}
                    </p>
                  </div>
                </div>
                <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
                  <div class="sm:col-span-2">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Country
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {vendor.legalInformation.country}
                    </p>
                  </div>
                  <div class="sm:col-span-2">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {vendor.legalInformation.state}
                    </p>
                  </div>
                  <div class="sm:col-span-2">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </p>
                    <p
                      class="block w-full sm:text-sm sm:leading-4 text-gray-500"
                    >
                      {vendor.legalInformation.city}
                    </p>
                  </div>
                </div>
                <div class="grid gap-x-6 gap-y-8 grid-cols-2 sm:grid-cols-6">
                  <div class="sm:col-span-3">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Upload GST certificate
                    </p>
                    <ul role="list" class="mt-3">
                      <li class="col-span-2 flex rounded-md shadow-sm">
                        <div
                          class="flex w-16 h-16 flex-shrink-0 items-center justify-center border rounded-l-md text-sm font-medium uppercase text-gray-600"
                        >
                          <img
                            src={getFileTypeUrl(
                              vendor.legalInformation.gstCertificate
                            )}
                            alt="GST"
                          />
                        </div>
                        <div
                          class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white"
                        >
                          <div
                            class="flex justify-between items-center truncate px-4 py-2 text-sm w-full"
                          >
                            <p
                              class="font-medium text-gray-900 hover:text-gray-600 truncate"
                            >
                              {vendor.legalInformation
                                ? vendor.legalInformation.gstCertificate
                                    .split("/")
                                    .pop()
                                : "GST certificate"}
                            </p>
                            <a
                              href={vendor.legalInformation.gstCertificate}
                              download
                              class=""
                            >
                              <span
                                class="material-symbols-outlined font-medium text-gray-400 hover:text-gray-600"
                              >
                                download
                              </span>
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="sm:col-span-3">
                    <p
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
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
                          <div
                            class="flex justify-between items-center truncate px-4 py-2 text-sm w-full"
                          >
                            <p
                              class="font-medium text-gray-900 hover:text-gray-600 truncate"
                            >
                              {vendor.legalInformation
                                ? vendor.legalInformation.incorporationCertificate
                                    .split("/")
                                    .pop()
                                : "Incorporation certificate"}
                            </p>
                            <a
                              href={vendor.legalInformation
                                .incorporationCertificate}
                              download
                              class=""
                            >
                              <span
                                class="material-symbols-outlined font-medium text-gray-400 hover:text-gray-600"
                              >
                                download
                              </span>
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {#if vendor.statusCode < 3}
                <div
                  class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 bg-gray-100"
                >
                  <a
                    href="/vendor/vendor-registration?id={vendor._id}&selectedTab=3&section=LegalInfo"
                    class="text-sm font-semibold leading-6 text-gray-900 bg-white border rounded px-2 py-1"
                    >Edit details</a
                  >
                </div>
              {/if}
            </div>
          <!-- {:else if $meta.url == routePath + "/activity"}
            Activity -->
          {/if}
        </div>
      </div>
    </div>
    <div
      class="md:col-span-2 p-3 bg-gray-100 overflow-y-auto space-y-5 h-[calc(100vh-150px)]"
    >
      {#if vendor._id}
        <VendorChat id={vendor._id}  chatType="vendor" />
      {/if}
    </div>
  </div>
</div>
