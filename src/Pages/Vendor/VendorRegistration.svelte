<script>
  import { checkboxChecked } from "./../../Stores/CheckboxStore.js";
  import { Steps, StepsLayout } from "./Stepper/index";
  import {
    BusinessInfo,
    CompanyInfo,
    GeneralInfo,
    LegalInfo,
  } from "./Forms/index";

  import { onMount } from "svelte/internal";
  import AuthService from "./../../Services/AuthService";
  import { RESTClient } from "../../Utils/RESTClient";
  import { router } from "tinro";
  import PlainNavbar from "../../Components/PlainNavbar.svelte";
  import { vendorStore } from "../../Stores/VendorsStore";
  import VendorPreview from "./VendorPreview.svelte";
  import FormFooter from "../../Components/FormFooter.svelte";
  import FormButton from "../../Components/Form/FormButton.svelte";

  const meta = router.meta();
  let steps = [
      "generalInformation",
      "companyInformation",
      "businessInformation",
      "legalInformation",
      "apply",
    ],
    currentActive = 0,
    progressBar;

  let vendor = {
    _id: "",
    isTermsAccepted: false,
    status: "",
    statusCode: 0,
    firstName: "",
    domain: "",
    lastName: "",
    designation: "",
    companyName: "",
    dateOfBirth: "",
    companyMarketName: "",
    companyEmail: "",
    companyPhone: "",
    companyBio: "",
    website: "",
    logo: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    countryId: "",
    stateId: "",
    cityId: "",
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
      incorporationDate: "",
      country: "",
      countryId: "",
      stateId: "",
      cityId: "",
      state: "",
      city: "",
      gstCertificate: "",
      incorporationCertificate: "",
    },
    applicationDate: "",
  };

  let error = { message: "" };
  let disabled = true;

  export let active_step;
  $: active_step = steps[currentActive];

  const handleSubmit = () => {
    //console.log("form data => ");
  };

  const handleProgress = (stepIncrement) => {
    progressBar.handleProgress(stepIncrement);
  };

  function getVendor(currentPage) {
    switch (currentPage) {
      case "generalInformation":
        return {
          firstName: vendor.firstName,
          lastName: vendor.lastName,
          email: vendor.email,
          phone: vendor.phone,
          dateOfBirth: vendor.dateOfBirth,
          designation: vendor.designation,
          status: "generalInformation",
        };
      case "companyInformation":
        return {
          companyName: vendor.companyName,
          companyMarketName: vendor.companyMarketName,
          country: vendor.country,
          state: vendor.state,
          city: vendor.city,
          cityId: vendor.cityId,
          stateId: vendor.stateId,
          countryId: vendor.countryId,
          companyEmail: vendor.companyEmail,
          companyBio: vendor.companyBio,
          companyPhone: vendor.companyPhone,
          website: vendor.website,
          logo: vendor.logo,
          status: "companyInformation",
        };
      case "businessInformation":
        return {
          operationalStaffCount: vendor.operationalStaffCount,
          contentStaffCount: vendor.contentStaffCount,
          designStaffCount: vendor.designStaffCount,
          productionStaffCount: vendor.productionStaffCount,
          otherStaffCount: vendor.otherStaffCount,
          categoryA: vendor.categoryA,
          categoryB: vendor.categoryB,
          categoryC: vendor.categoryC,
          tournaments: vendor.tournaments,
          status: "businessInformation",
        };
      case "legalInformation":
        return {
          legalInformation: {
            legalName: vendor.legalInformation.legalName,
            entityType: vendor.legalInformation.entityType,
            // pan: vendor.legalInformation.pan,
            gst: vendor.legalInformation.gst,
            incorporationDate: vendor.legalInformation.incorporationDate,
            country: vendor.legalInformation.country,
            countryId: vendor.legalInformation.countryId,
            stateId: vendor.legalInformation.stateId,
            cityId: vendor.legalInformation.cityId,
            state: vendor.legalInformation.state,
            city: vendor.legalInformation.city,
            gstCertificate: vendor.legalInformation.gstCertificate,
            incorporationCertificate:
              vendor.legalInformation.incorporationCertificate,
          },
          status: "legalInformation",
        };
      default:
        return { ...vendor };
    }
  }

  function saveVendor() {
    AuthService.getUser().userId;
    const rest = new RESTClient("vendor");
    let currentPage = steps[currentActive];
    let _vendor = getVendor(currentPage);

    if (currentPage != "apply") {
      vendor.status = currentPage;
      rest
        .post(`/${vendor._id}/${currentPage}`, _vendor, true)
        .then((vendor) => {
          if (!vendor.message) {
            //   vendorStore.set(vendor);
            handleProgress(1);
          } else {
            error = vendor;
          }
          disabled = true;
        })
        .catch((_error) => {
          error = _error;
        });
    } else {
      rest
        .post(
          `/${vendor._id}/apply`,
          { isTermsAccepted: vendor.isTermsAccepted },
          true
        )
        .then((vendor) => {
          if (!vendor.message) {
            vendorStore.set(vendor);
            router.goto("/vendorStatus");
          } else {
            error = vendor.message;
          }
        })
        .catch((_error) => {
          error = _error.message;
        });
    }

    if ($meta.query.edit) {
      router.goto("/vendorapplication/" + $meta.query.section);
    }else if (Object.keys($meta.query).length > 0) {
      router.goto("/vendorProfile/" + $meta.query.section);
    }
  }

  onMount(() => {
    // AuthService.getUser().userId;
    if(AuthService.isLoggedIn() == false){
      return;
    }
    const rest = new RESTClient("vendor");
    rest
      .get("/getVendor")
      .then((_vendor) => {
        if (_vendor) {
          vendor = { ...vendor, ..._vendor };
          let tempDate= _vendor.dateOfBirth;
          vendor.dateOfBirth=tempDate.split('T')[0]

          if (Object.keys($meta.query).length > 0) {
            currentActive = Number($meta.query.selectedTab);
          }

          if ($meta.query.edit) {
            _vendor.statusCode = 5;
            if (currentActive == 0) {
              vendor.status = "generalInformation";
            } else if (currentActive == 1) {
              vendor.status = "companyInformation";
            } else if (currentActive == 2) {
              vendor.status = "businessInformation";
            } else if (currentActive == 3) {
              vendor.status = "legalInformation";
            }
          }

          if (_vendor.statusCode == 0) {
            // get currentActive
            currentActive = steps.indexOf(_vendor.status) + 1;
          } else if (
            _vendor.statusCode == 1 ||
            _vendor.statusCode == 2 ||
            _vendor.statusCode == 4
          ) {
            router.goto("/vendorStatus");
          } else if (_vendor.statusCode == 3) {
            // router.goto("/vendorProfile");
          }
        } else {
        }
      })
      .catch((error) => {});
  });
</script>

<div class="pb-4 bg-gray-50">
  <div class="w-full">
    <PlainNavbar />
  </div>
  <div class="w-full border-b bg-gray-50">
    <p class=" font-semibold py-4 text-xl text-center">
      Vendor Registration Details
    </p>
  </div>
  <div class="w-full border-b bg-gray-50">
    <StepsLayout>
      <Steps {steps} bind:currentActive bind:this={progressBar} />
    </StepsLayout>
  </div>

  <div
    class="mx-auto pb-20 px-4 sm:px-6 lg:px-8 mt-8 overflow-y-auto h-[calc(100vh-220px)] outline-0"
  >
    <form on:submit={handleSubmit} class=" space-y-4">
      {#if active_step == "generalInformation"}
        <div class="mx-auto max-w-5xl rounded-t-lg shadow-xl overflow-hidden">
          <GeneralInfo bind:disabled bind:vendor />
        </div>
      {:else if active_step == "companyInformation"}
        <div class="mx-auto max-w-5xl rounded-t-lg shadow-xl overflow-hidden">
          <CompanyInfo bind:disabled bind:vendor />
        </div>
      {:else if active_step == "businessInformation"}
        <div class="mx-auto max-w-5xl rounded-t-lg shadow-xl overflow-hidden">
          <BusinessInfo bind:disabled bind:vendor />
        </div>
      {:else if active_step == "legalInformation"}
        <div class="mx-auto max-w-5xl rounded-t-lg shadow-xl overflow-hidden">
          <LegalInfo bind:disabled bind:vendor />
        </div>
      {:else if active_step == "apply"}
        <div class="mx-auto max-w-5xl overflow-hidden space-y-4">
          <VendorPreview bind:vendor bind:currentActive />
        </div>
      {/if}
    </form>
    {#if active_step == "apply"}
      <div class="mx-auto max-w-5xl overflow-hidden mb-5">
        <button
          on:click={() => saveVendor()}
          class="rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 {vendor.isTermsAccepted ? "bg-gray-800 hover:bg-gray-800" : "bg-gray-400 hover:bg-gray-400"}"
          disabled={$checkboxChecked === false}>Submit</button
        >
      </div>
      <div class="mx-auto max-w-5xl overflow-hidden mb-5">
        <FormFooter />
      </div>
    {:else}
      <div
        class="flex mx-auto max-w-5xl rounded-b-lg shadow-xl overflow-hidden items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 bg-gray-100"
      >
        <!-- <button class="text-sm font-semibold leading-6 text-gray-900 border-gray-300 px-3 py-1.5 rounded-md bg-white">Cancel</button> -->
        <FormButton
          {disabled}
          on:click={() => saveVendor()}
          className="bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >Save & Proceed</FormButton
        >
      </div>
    {/if}
  </div>
</div>
