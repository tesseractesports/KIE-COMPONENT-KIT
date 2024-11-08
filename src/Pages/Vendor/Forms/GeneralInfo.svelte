<script>
  import Input from "../../../Components/Form/Input.svelte";
  import Textarea from "../../../Components/Form/Textarea.svelte";

  export let vendor = {};
  import {
    validateEmail,
    validateName,
    validateDateOfBirth,
    validateDesignation,
    validatePhoneNumber,
  } from "../../../Utils/vendorValidations";

  let validFirstName = true;
  let validLastName = true;
  let validEmail = true;
  let validdateOfBirth = true;
  let validDesignation = true;
  let validPhone = true;

  let emailError = "Please enter a valid email address";
  let dateOfBirthError = "Please click a valid DOB";
  let firstNameError = "Please enter a valid first name";
  let lastNameError = "Please enter a valid last name";
  let designationError = "Please enter a valid designation";
  let phoneError = "Please enter a valid number";

  let emailTouched = false;
  let firstNameTouched = false;
  let lastNameTouched = false;
  let dateOfBirthTouched = false;
  let designationTouched = false;
  let phoneTouched = false;

  export let disabled = true;

  $: disabled =
    !vendor.firstName ||
    !validFirstName ||
    !vendor.lastName ||
    !validLastName ||
    !vendor.dateOfBirth ||
    !validdateOfBirth ||
    !vendor.designation ||
    !validDesignation ||
    !vendor.email ||
    !validEmail ||
    !vendor.phone ||
    !validPhone;

  const emailValidation = (value) => {
    validEmail = emailTouched ? validateEmail(value) : true;
    //console.log("in general info:" + disabled);
  };
  const nameValidation = (value, isfirstName = true) => {
    if (isfirstName) {
      validFirstName = firstNameTouched ? validateName(value) : true;
    } else {
      validLastName = lastNameTouched ? validateName(value) : true;
    }
    //console.log("in general info:" + disabled);
  };

  const dateOfBirthValidation = (value) => {
    validdateOfBirth = dateOfBirthTouched ? validateDateOfBirth(value) : true;
  };

  const phoneNumberValidation = (value) => {
    validPhone = phoneTouched ? validatePhoneNumber(value) : true;
    //console.log("in general info:" + disabled);
  };

  const designationValidation = (value) => {
    validDesignation = designationTouched ? validateDesignation(value) : true;
   // console.log("in general info:" + disabled);
  };

  function handleInput(event) {
    const input = event.target.value;
    vendor.phone = input.replace(/\D/g, '').slice(0, 10);
  }

  export let preview;
</script>

<div class="px-4 py-6 sm:p-8 space-y-6 bg-white">
  <div class="w-full border-b flex flex-col mb-2">
    <p class="font-normal text-xl">Admin Details</p>
    <span class="font-light text-sm text-gray-400 mb-2"
      >This section collects general details about the admin</span
    >
  </div>
  <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <Input
        {preview}
        type="text"
        label="First Name"
        bind:value={vendor.firstName}
        error={!validFirstName}
        errorMessage={firstNameError}
        placeholder="First Name"
        on:blur={() => {
          firstNameTouched = true;
          nameValidation(vendor.firstName);
        }}
      />
    </div>
    <div class="sm:col-span-3">
      <Input
        {preview}
        type="text"
        label="Last Name"
        bind:value={vendor.lastName}
        error={!validLastName}
        errorMessage={lastNameError}
        placeholder="Last Name"
        on:blur={() => {
          lastNameTouched = true;
          nameValidation(vendor.lastName, false);
        }}
      />
    </div>
    <div class="sm:col-span-3">
      <Input
        {preview}
        type="date"
        label="Date of Birth"
        bind:value={vendor.dateOfBirth}
        error={!validdateOfBirth}
        errorMessage={dateOfBirthError}
        on:blur={() => {
          dateOfBirthTouched = true;
          dateOfBirthValidation(vendor.dateOfBirth);
        }}
      />
    </div>
    <div class="sm:col-span-3">
      <Input
        {preview}
        type="text"
        label="Designation"
        bind:value={vendor.designation}
        error={!validDesignation}
        errorMessage={designationError}
        placeholder="Designation"
        on:blur={() => {
          designationTouched = true;
          designationValidation(vendor.designation);
        }}
      />
    </div>
    <div class="sm:col-span-3">
      <Input
        {preview}
        disabled={true}
        type="email"
        label="E-mail Address"
        bind:value={vendor.email}
        error={!validEmail}
        errorMessage={emailError}
        placeholder="ui@kraftonindia.com"
        on:blur={() => {
          emailTouched = true;
          emailValidation(vendor.email);
        }}
      />
    </div>
    <div class="sm:col-span-3">
      <Input
        {preview}
        type="text"
        enableCountryCode="false"
        label="Phone Number"
        bind:value={vendor.phone}
        error={!validPhone}
        errorMessage={phoneError}
        on:input={handleInput}
        placeholder="Phone Number"
        showErrorIcon={false}
        on:blur={() => {
          phoneTouched = true;
          phoneNumberValidation(vendor.phone);
        }}
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
