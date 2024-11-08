<script>
  import { onMount } from "svelte";
  import Input from "../../../Components/Form/Input.svelte";
  import Textarea from "../../../Components/Form/Textarea.svelte";
  import Select from "../../../Components/Form/Select.svelte";
  import UploadBox from "../../../Components/Form/UploadBox.svelte";
  import { RESTClient } from "../../../Utils/RESTClient";
  import {
    validateCompanyName,
    validateMarketName,
    validateCountry,
    validateState,
    validateCity,
    validateEmail,
    validateWebsite,
    validatePhoneNumber,
    validateCompanyLogo,
    validateCompanyBio,
  } from "../../../Utils/vendorValidations";
  export let preview;

  let countries = [];
  let states = [];
  let cities = [];
  let error = { message: "" };
  export let vendor = {};

  let validCompanyName = true;
  let validaMarketName = true;
  let validCountry = true;
  let validState = true;
  let validCity = true;
  let validCompanyEmail = true;
  let validWebsite = true;
  let validPhoneNumber = true;
  let validCompanyBio = true;
  let validCompanyLogo = true;

  let companyNameError = "please enter valid company name";
  let companyMarketNameError = "please enter valid market name";
  let countryError = "please select country";
  let stateError = "please select state";
  let cityError = "please select city";
  let companyEmailError = "please select valid email";
  let comapnyPhoneError = "please select valid number";
  let websiteError = "please select valid website";
  let logoError = "please select valid logo";
  let companyBioError = "Please enter a valid company bio";


  let companyNameTouched = false;
  let companyMarketNameTouched = false;
  let countryTouched = false;
  let stateTouched = false;
  let cityTouched = false;
  let companyEmailTouched = false;
  let companyPhoneTouched = false;
  let websiteTouched = false;
  let logoTouched = false;
  let phonecode = "";
  let companyBioTouched = false;

  export let disabled = true;

  $: disabled =
    !validCompanyName ||
    !vendor.companyName ||
    !validaMarketName ||
    !vendor.companyMarketName ||
    !validCountry ||
    !vendor.country ||
    !validState ||
    !vendor.state ||
    !validCity ||
    !vendor.city ||
    !validCompanyEmail ||
    !vendor.companyEmail ||
    !validWebsite ||
    !vendor.website ||
    !validPhoneNumber ||
    !vendor.companyPhone ||
    !validCompanyLogo ||
    !validCompanyBio ||
    !vendor.logo ||
    !validCompanyBio

  const companyNameValidation = (value) => {
    validCompanyName = companyNameTouched ? validateCompanyName(value) : true;
  };
  const emailValidation = (value) => {
    validCompanyEmail = companyEmailTouched ? validateEmail(value) : true;
  };

  const phoneNumberValidation = (value) => {
    validPhoneNumber = companyPhoneTouched ? validatePhoneNumber(value) : true;
  };
  const marketNameValidation = (value) => {
    validaMarketName = companyMarketNameTouched
      ? validateMarketName(value)
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
  const websiteValidation = (value) => {
    validWebsite = websiteTouched ? validateWebsite(value) : true;
  };
  const companyBioValidation = (value) => {
    validCompanyBio = companyBioTouched ? validateCompanyBio(value) : true;
    //console.log("in general info:" + disabled);
  };
  const logoValidation = (value) => {
    validCompanyLogo = logoTouched ? validateCompanyLogo(value) : true;
  };

  onMount(() => {
    if (vendor.countryId && vendor.stateId && vendor.cityId) {
      loadCountry();
      loadState(vendor.countryId);
      loadCity(vendor.stateId);
    } else {
      loadCountry();
    }
  });

  function countryUpdated(event) {
    vendor.countryId = event.detail.id;
    vendor.country = event.detail.name;
    vendor.stateId = null;
    vendor.cityId = null;
    vendor.state = null;
    vendor.city = null;
    phonecode = event.detail.phonecode;
    loadState(event.detail.id);
  }

  function stateUpdated(event) {
    vendor.stateId = event.detail.id;
    vendor.state = event.detail.name;
    vendor.cityId = null;
    vendor.city = null;
    loadCity(event.detail.id);
  }

  function cityUpdated(event) {
    vendor.cityId = event.detail.id;
    vendor.city = event.detail.name;
    //console.log(event.detail);
  }

  function loadCountry() {
    const rest = new RESTClient("general");
    rest
      .get("/countries")
      .then((response) => {
        if (response.code) {
          error = response.message;
        } else if (response) {
          countries = response;
          let countryName = vendor.country
            ? vendor.country
            : "Please select country";
          let country = countries.find((option) => option.name === countryName);
          if (!country) {
            country = countries[0];
          }
          phonecode = country.phonecode;
        }
      })
      .catch((error) => {
        console.error("error :", error.message);
      });
  }

  function loadState(countryId) {
    const rest = new RESTClient("general");
    rest.get(`/states/${countryId}`).then((response) => {
      if (response.code) {
        error = response.message;
      } else if (response) {
        states = response;
        let stateName = vendor.state ? vendor.state : "Please select state";
        let state = states.find((option) => option.name === stateName);
        if (!state) {
          state = states[0];
        }
        vendor.stateId = state.id;
        vendor.state = state.name;
      }
    });
  }

  function loadCity(stateId) {
    const rest = new RESTClient("general");
    rest.get(`/cities/${stateId}`).then((response) => {
      if (response.code) {
        error = response.message;
      } else if (response) {
        cities = response;
        let cityName = vendor.city ? vendor.city : "Please select city";
        let city = response.find((option) => option.name === cityName);
        if (!city) {
          city = response[0];
        }
        vendor.cityId = city.id;
        vendor.city = city.name;
      }
    });
  }
</script>

<div class="px-4 py-6 sm:p-8 space-y-6 bg-white">
  <div class="w-full border-b flex flex-col mb-2">

    <p class="font-normal text-xl">Company Details</p>
    <span class="font-light text-sm text-gray-400 mb-2"
      >This section gathers key details & location about the company.</span
    >

  </div>

  <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <Input {preview} type="text" label="Company Name" bind:value={vendor.companyName} placeholder="Company Name"
        error={!validCompanyName} errorMessage={companyNameError} on:blur={()=> {
      companyNameTouched = true;
      companyNameValidation(vendor.companyName);
      }}
      />
    </div>
    <div class="sm:col-span-3">
      <Input {preview} type="text" label="Market name " bind:value={vendor.companyMarketName} error={!validaMarketName}
        errorMessage={companyMarketNameError} placeholder="Market name " on:blur={()=> {
      companyMarketNameTouched = true;
      marketNameValidation(vendor.companyMarketName);
      }}
      />
    </div>
  </div>

  <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
    <div class="sm:col-span-2">
      <Select value={vendor.countryId} labelKey="name" valueKey="id" options={countries} label="Country"
        placeholder="Select Country" error={!validCountry} errorMessage={countryError} on:change={countryUpdated}
        on:blur={()=> {
        countryTouched = true;
        countryValidation(vendor.countryId);
        }}
        />
    </div>
    <div class="sm:col-span-2">
      <Select value={vendor.stateId} labelKey="name" valueKey="id" options={states} label="State"
        placeholder="Select State" error={!validState} errorMessage={stateError} on:change={stateUpdated} on:blur={()=>
        {
        stateTouched = true;
        stateValidation(vendor.stateId);
        }}
        />
    </div>
    <div class="sm:col-span-2">
      <Select value={vendor.cityId} labelKey="name" valueKey="id" options={cities} label="City"
        placeholder="Select City" error={!validCity} errorMessage={cityError} on:change={cityUpdated} on:blur={()=> {
        cityTouched = true;
        cityValidation(vendor.cityId);
        }}
        />
    </div>
  </div>

  <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
    <div class="sm:col-span-2">
      <Input {preview} type="email" label="Company e-mail" bind:value={vendor.companyEmail} error={!validCompanyEmail}
        errorMessage={companyEmailError} placeholder="ui@kraftonindia.com" on:blur={()=> {
      companyEmailTouched = true;
      emailValidation(vendor.companyEmail);
      }}
      />
    </div>
    <div class="sm:col-span-2">
      <Input {preview} {phonecode} type="phone" label="Phone Number" bind:value={vendor.companyPhone}
      showErrorIcon={true}
        error={!validPhoneNumber} errorMessage={comapnyPhoneError} placeholder="Phone Number" on:blur={()=> {
      companyPhoneTouched = true;
      phoneNumberValidation(vendor.companyPhone);
      }}
      />
    </div>
    <div class="sm:col-span-2">
      <Input {preview} type="text" label="Website" bind:value={vendor.website} error={!validWebsite}
        errorMessage={websiteError} placeholder="Website" on:blur={()=> {
      websiteTouched = true;
      websiteValidation(vendor.website);
      }}
      />
    </div>
  </div>
  <div class="sm:col-span-full">
    <Textarea {preview} label="Company Bio" bind:value={vendor.companyBio} error={!validCompanyBio}
      errorMessage={companyBioError} placeholder="max 250 characters" on:blur={()=> {
        companyBioTouched = true;
        companyBioValidation(vendor.companyBio);
      }}
    />
  </div>
  <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
    <div class="sm:col-span-full">
      <UploadBox
        label="Upload Company Logo"
        bind:uploadUrl={vendor.logo}
        accept="image/png, image/jpg, image/jpeg"
        helpText="JPG, JPEG or PNG Only"
        maxFileSize="5mb"
        on:fileSelected={(event) => {
          logoTouched = true;
          logoValidation(event.detail.file);}
        }
        error={!validCompanyLogo}
        errorMessage={logoError}
      />
    </div>
  </div>
</div>
{#if preview}
  <div
    class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 bg-gray-100"
  >
    <button
      class="text-sm font-semibold leading-6 text-gray-900 bg-white border rounded px-2 py-1"
      >Edit details</button
    >
  </div>
{/if}