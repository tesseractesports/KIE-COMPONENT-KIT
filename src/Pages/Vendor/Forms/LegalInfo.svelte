<script>
  import { onMount } from "svelte";
  import Input from "../../../Components/Form/Input.svelte";
  import Select from "../../../Components/Form/Select.svelte";
  import Textarea from "../../../Components/Form/Textarea.svelte";
  import UploadBox from "../../../Components/Form/UploadBox.svelte";
  import { RESTClient } from "../../../Utils/RESTClient";
  import {
    validateCompanyLegalName,
    validateEntityType,
    validateIncorporationDate,
    validateGST,
    // validatePAN,
    validateFileUpload,
    validateCountry,
    validateCity,
    validateState,
  } from "../../../Utils/vendorValidations";

  export let preview;
  let entityType = [
    { name: "Please Select Entity" },
    { name: "Public Limited" },
    { name: "Private Limited" },
    { name: "Partnership" },
    { name: "Sole Proprietorship" },
    { name: "Limited Liability Partnership" },
    { name: "Others" },
  ];
  let countries = [];
  let states = [];
  let cities = [];
  let error = { message: "" };
  export let vendor = {
    legalInformation: {
      legalName: "",
      entityType: "",
      // pan: "",
      gst: "",
      incorporationDate: "",
      country: "",
      countryId: null,

      state: "",
      stateId: null,
      city: "",
      cityId: null,
      gstCertificate: "",
      incorporationCertificate: "",
    },
  };

  let validLegalName = true;
  let validEntityType = true;
  let validPan = true;
  let validGst = true;
  let validIncorporationDate = true;
  let validCountry = true;
  let validState = true;
  let validCity = true;
  let validIncorporationCertificate = true;
  let validGstCertificate = true;

  let legalNameError = "please enter valid legal name";
  let entityTypeError = "please enter valid entity";
  let panError = "please enter valid pan details";
  let gstError = "please enter valid gst details";
  let incorporationDateError = "please enter valid date";
  let countryError = "please select valid country";
  let stateError = "please select valid state";
  let cityError = "please select valid city";
  let incorporationCertificateError = "please upload valid certificate";

  let legalNameTouched = false;
  let entityTypeTouched = false;
  let panTouched = false;
  let gstTouched = false;
  let incorporationDateTouched = false;
  let countryTouched = false;
  let stateTouched = false;
  let cityTouched = false;
  let incorporationCertificateTouched = false;
  let gstCertificateTouched = false;

  export let disabled = true;

  $: disabled =
    !vendor.legalInformation.legalName ||
    !validLegalName ||
    !vendor.legalInformation.entityType ||
    !validEntityType ||
    // !vendor.legalInformation.pan ||
    // !validPan ||
    !vendor.legalInformation.stateId ||
    !validState ||
    !vendor.legalInformation.cityId ||
    !validCity ||
    !vendor.legalInformation.gst ||
    !validGst ||
    !vendor.legalInformation.incorporationDate ||
    !validIncorporationDate ||
    !vendor.legalInformation.countryId ||
    !validCountry ||
    !vendor.legalInformation.incorporationCertificate ||
    !validIncorporationCertificate ||
    !validGstCertificate;

  const legalNameValidation = (value) => {
    validLegalName = legalNameTouched ? validateCompanyLegalName(value) : true;
  };

  const entityTypeValidation = (value) => {
    validEntityType = entityTypeTouched ? validateEntityType(value) : true;
  };

  // const panValidation = (value) => {
  //   validPan = panTouched ? validatePAN(value) : true;
  // };

  const gstValidation = (value) => {
    validGst = gstTouched ? validateGST(value) : true;
  };

  const incorporationDateValidation = (value) => {
    validIncorporationDate = incorporationDateTouched
      ? validateIncorporationDate(value)
      : true;
  };

  const countryValidation = (value) => {
    validCountry = countryTouched ? validateCountry(value) : true;
  };

  const stateValidation = (value) => {
    validState = stateTouched ? validateState(value) : true;
  };

  const cityValidation = (value) => {
    validCity = cityTouched ? validateCity(value) : true;
  };

  const incorporationCertificateValidation = (file) => {
    validIncorporationCertificate = incorporationCertificateTouched
      ? validateFileUpload(file)
      : true;
  };
  const gstCertificateValidation = (file) => {
    validGstCertificate = gstCertificateTouched
      ? validateFileUpload(file)
      : true;
  };

  onMount(() => {
    vendor;
    if (
      vendor.legalInformation.countryId &&
      vendor.legalInformation.stateId &&
      vendor.legalInformation.cityId
    ) {
      loadCountry();
      loadState(vendor.legalInformation.countryId);
      loadCity(vendor.legalInformation.stateId);
    } else {
      loadCountry();
    }
  });

  function countryUpdated(event) {
    vendor.legalInformation.country = event.detail.name;
    vendor.legalInformation.countryId = event.detail.id;
    vendor.legalInformation.stateId = null;
    vendor.legalInformation.cityId = null;
    loadState(event.detail.id);
  }

  function stateUpdated(event) {
    vendor.legalInformation.state = event.detail.name;
    vendor.legalInformation.stateId = event.detail.id;
    vendor.legalInformation.cityId = null;
    loadCity(event.detail.id);
  }

  function cityUpdated(event) {
    vendor.legalInformation.cityId = event.detail.id;
    vendor.legalInformation.city = event.detail.name;
  }

  function entityTypeUpdated(event) {
    vendor.legalInformation.entityType = event.detail.name;
  }

  function loadCountry() {
    const rest = new RESTClient("general");
    rest
      .get("/countries")
      .then((response) => {
        if (response.code) {
          error.message = response.message;
        } else {
          countries = response;
          let country = countries.find(
            (option) => option.id === vendor.legalInformation.countryId
          );
          vendor.legalInformation.countryId = country.id;
        }
      })
      .catch((error) => {
        console.error("error:", error.message);
      });
  }

  function loadState(countryId) {
    const rest = new RESTClient("general");
    rest
      .get(`/states/${countryId}`)
      .then((response) => {
        if (response.code) {
          error.message = response.message;
        } else {
          states = response;
          let state =
            states.find(
              (option) => option.id === vendor.legalInformation.stateId
            ) || states[0];
          vendor.legalInformation.stateId = state.id;
        }
      })
      .catch((error) => {
        console.error("error:", error.message);
      });
  }

  function loadCity(stateId) {
    const rest = new RESTClient("general");
    rest
      .get(`/cities/${stateId}`)
      .then((response) => {
        if (response.code) {
          error.message = response.message;
        } else {
          cities = response;
          let city =
            cities.find(
              (option) => option.id === vendor.legalInformation.cityId
            ) || cities[0];
          vendor.legalInformation.cityId = city.id;
        }
      })
      .catch((error) => {
        console.error("error:", error.message);
      });
  }
</script>

<div class="px-4 py-6 sm:p-8 space-y-6 bg-white">
  <div class="w-full border-b flex flex-col mb-2">

    <p class="font-normal text-xl">Legal Details</p>
    <span class="font-light text-sm text-gray-400 mb-2"
      >This section collects legal details of the company.</span
    >

  </div>
  <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <Input {preview} type="text" label="Company legal name" placeholder=" "
        bind:value={vendor.legalInformation.legalName} error={!validLegalName} errorMessage={legalNameError}
        on:blur={()=> {
      legalNameTouched = true;
      legalNameValidation(vendor.legalInformation.legalName);
      }}
      />
    </div>
    <div class="sm:col-span-3">
      <Select {preview} value={vendor.legalInformation.entityType} options={entityType} labelKey="name" valueKey="name"
        label="Entity type" error={!validEntityType} errorMessage={entityTypeError} on:change={entityTypeUpdated}
        on:blur={()=> {
        entityTypeTouched = true;
        entityTypeValidation(vendor.legalInformation.entityType);
        }}
        />
    </div>
  </div>
  <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
    <!-- <div class="sm:col-span-3">
      <Input {preview} type="text" label="PAN details" placeholder=" " bind:value={vendor.legalInformation.pan}
        error={!validPan} errorMessage={panError} on:blur={()=> {
      panTouched = true;
      panValidation(vendor.legalInformation.pan);
      }}
      />
    </div> -->
    <div class="sm:col-span-3">
      <Input {preview} type="date" label="Incorporation Date" placeholder=" " bind:value={vendor.legalInformation.incorporationDate}
        error={!validIncorporationDate} errorMessage={incorporationDateError} on:blur={()=> {
         incorporationDateTouched = true;
      incorporationDateValidation(
      vendor.legalInformation.incorporationDate
        );
      }}
      />
    </div>
    <div class="sm:col-span-3">
      <Input {preview} type="text" label="GST details" placeholder=" " bind:value={vendor.legalInformation.gst}
        error={!validGst} errorMessage={gstError} on:blur={()=> {
      gstTouched = true;
      gstValidation(vendor.legalInformation.gst);
      }}
      />
    </div>
  </div>
  <div class="grid gap-x-3 gap-y-8 grid-cols-1">
  <div class="grid gap-x-3 gap-y-8 grid-cols-3">
    <div class="sm:col-span-1">
      <Select {preview} value={vendor.legalInformation.countryId} options={countries} label="Country" labelKey="name"
        valueKey="id" placeholder="Select Country" error={!validCountry} errorMessage={countryError}
        on:change={countryUpdated} on:blur={()=> {
        countryTouched = true;
        countryValidation(vendor.legalInformation.countryId);
        }}
        />
    </div>
    <div class="sm:col-span-1">
      <Select {preview} value={vendor.legalInformation.stateId} options={states} label="State" labelKey="name"
        valueKey="id" placeholder="Select State" error={!validState} errorMessage={stateError} on:change={stateUpdated}
        on:blur={()=> {
        stateTouched = true;
        stateValidation(vendor.legalInformation.stateId);
        }}
        />
    </div>
    <div class="sm:col-span-1">
      <Select {preview} value={vendor.legalInformation.cityId} options={cities} label="City" labelKey="name"
        valueKey="id" placeholder="Select City" error={!validCity} errorMessage={cityError} on:change={cityUpdated}
        on:blur={()=> {
        cityTouched = true;
        cityValidation(vendor.legalInformation.cityId);
        }}
        />
    </div>
  </div>
  </div>
  <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <UploadBox id="gstCertificate" bind:uploadUrl={vendor.legalInformation.gstCertificate}
        accept="image/png, image/jpeg, image/jpg, application/pdf" error={!validGstCertificate}
        errorMessage={incorporationCertificateError} label="Upload GST certificate" fileName="Upload document"
        helpText="JPG, JPEG OR PDF only" maxFileSize="10mb" on:fileSelected={(event)=> {
        gstCertificateTouched = true;
        gstCertificateValidation(event.detail.file);}
        }
        />
    </div>
    <div class="sm:col-span-3">
      <UploadBox id="incorporationCertificate" bind:uploadUrl={vendor.legalInformation.incorporationCertificate}
        accept="image/png, image/jpeg, image/jpg, application/pdf" error={!validIncorporationCertificate}
        errorMessage={incorporationCertificateError} label="Upload Incorporation certificate" fileName="Upload document"
        helpText="JPG, JPEG OR PDF only" maxFileSize="10mb" on:fileSelected={(event)=> {
        incorporationCertificateTouched = true;
        incorporationCertificateValidation(event.detail.file);}
        }
        />
    </div>
  </div>
</div>
{#if preview}
<div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 bg-gray-100">
  <button class="text-sm font-semibold leading-6 text-gray-900 bg-white border rounded px-2 py-1">Edit details</button>
</div>
{/if}