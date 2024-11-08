<script>
    import Input from "../../../Components/Form/Input.svelte";
    import Select from "../../../Components/Form/Select.svelte";
    import Textarea from "../../../Components/Form/Textarea.svelte";
    import Toast from "../../../Services/ToastService";
    import { RESTClient } from "../../../Utils/RESTClient";
    import { router } from "tinro";
    import {
        validateName,
        validateCompanyName,
        validateDesignation,
        validateEmail,
        validatePhoneNumber,
        validateCompanyBio,
    } from "../../../Utils/tournamentValidations";
    import { checkboxChecked } from "../../../Stores/CheckboxStore";
    import { designationOptions } from "../dropdown.constants";

    export let tournament;
    const rest = new RESTClient("tournament");
    const meta = router.meta();

    $: (tournament) => {
        if (tournament._id) {
            const rest = new RESTClient("tournament");
            rest
                .get(`/tournament/${tournament._id}`)
                .then((response) => {
                    if (response.code) {

                    } else if (response) {
                        tournament = response;
                    }
                })
        }
    }

    let validFirstName = true;
    let validLastName = true;
    let validCompanyName = true;
    let validDesignation = true;
    let validEmail = true;
    let validPhoneNumber = true;
    let validCompanyBio = true;

    let firstNameError = "please enter valid first name";
    let lastNameError = "please enter valid last name";
    let companyNameError = "please enter valid company name";
    let designationError = "please enter valid designation";
    let emailError = "please enter valid email";
    let phoneNumberError = "please enter valid phone number";
    let companyBioError = "please enter valid Company Bio";

    let firstNameTouched = false;
    let lastNameTouched = false;
    let companyNameTouched = false;
    let designationTouched = false;
    let emailTouched = false;
    let phoneNumberTouched = false;
    let companyBioTouched = false;

    export let disabled = true;


    $: disabled =
        !tournament.contactInformation.firstName ||
        !validFirstName ||
        !tournament.contactInformation.lastName ||
        !validLastName ||
        !tournament.contactInformation.companyName ||
        !validCompanyName ||
        !tournament.contactInformation.designation ||
        !validDesignation ||
        !tournament.contactInformation.email ||
        !validEmail ||
        !tournament.contactInformation.phoneNumber ||
        !validPhoneNumber ||
        !tournament.contactInformation.companyBio ||
        !validCompanyBio;

    const nameValidation = (value, isfirstName = true) => {
        if (isfirstName) {
            validFirstName = firstNameTouched ? validateName(value) : true;
        } else {
            validLastName = lastNameTouched ? validateName(value) : true;
        }
    };
    const companyNameValidation = (value) => {
        validCompanyName = companyNameTouched ? validateCompanyName(value) : true;
    };
    const designationValidation = (value) => {
        validDesignation = designationTouched ? validateDesignation(value) : true;
    };
    const emailValidation = (value) => {
        validEmail = emailTouched ? validateEmail(value) : true;
    };
    const phoneNumberValidation = (value) => {
        validPhoneNumber = phoneNumberTouched ? validatePhoneNumber(value) : true;
    };
    const companyBioValidation = (value) => {
        validCompanyBio = companyBioTouched ? validateCompanyBio(value) : true;
    };

    function changeDesignation(e) {
        tournament.contactInformation.designation = e.detail.name;
    }

    function saveContactInformation(event) {
        if (event) {
            event.preventDefault();
        }
        rest.put(`/contact-information/${tournament._id}`, {
            vendor: tournament.vendor,
            status: $meta.query.section && $meta.query.edit === "true" ? "applied" : "contact-information",
            contactInformation: tournament.contactInformation,
        }).then((response) => {
           // console.log(response);
            if (!response.message) {
                if ($meta.query.section && $meta.query.edit === "true") {
                    router.goto(`/tournaments/details/${response._id}/${$meta.query.section}`)
                } else {
                    tournament = { ...tournament, ...response };
                    Toast.success("successfully saved");
                }
            } else {
                Toast.error(response.message);
            }
        });
    }

    function applyTournament(e) {
        e.preventDefault();
        if (tournament.status === "financial-details") {
            Toast.error("save the contact information first");
        } else {
            router.goto(`/tournament/apply/${tournament._id}`);
        }
    }
</script>

<div class="px-4 py-6 sm:p-8 space-y-6 bg-white">
    <div class="w-full border-b flex flex-col mb-2">
        <p class="font-normal text-xl">Contact Details</p>
        <span class="font-light text-sm text-gray-400 mb-2">We would like to know you more</span>
    </div>
    <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
        <div class="sm:col-span-3">
            <Input type="text" label="First Name" placeholder="First Name"
                bind:value={tournament.contactInformation.firstName} error={!validFirstName}
                errorMessage={firstNameError} on:blur={()=>{
            firstNameTouched = true;
            nameValidation(tournament.contactInformation.firstName);
            }}

            />
        </div>
        <div class="sm:col-span-3">
            <Input type="text" label="Last Name" placeholder="Last Name"
                bind:value={tournament.contactInformation.lastName} error={!validLastName} errorMessage={lastNameError}
                on:blur={()=>{
            lastNameTouched = true;
            nameValidation(tournament.contactInformation.lastName,false);
            }}
            />
        </div>
        <div class="sm:col-span-3">
            <Input type="text" label="Company name " placeholder="Company name "
                bind:value={tournament.contactInformation.companyName} error={!validCompanyName}
                errorMessage={companyNameError} on:blur={()=>{
            companyNameTouched = true;
            companyNameValidation(tournament.contactInformation.companyName);
            }}
            />
        </div>
        <div class="sm:col-span-3">
            <Select labelKey="label" valueKey="value" label="Designation"
                bind:value={tournament.contactInformation.designation} placeholder="Select designation"
                options={designationOptions} error={!validDesignation} errorMessage={designationError} on:blur={()=>{
                designationTouched = true;
                designationValidation(tournament.contactInformation.designation);
                }}

                />
        </div>
        <div class="sm:col-span-3">
            <Input type="mail" label="E-mail address " placeholder="E-mail address "
                bind:value={tournament.contactInformation.email} error={!validEmail} errorMessage={emailError}
                on:blur={()=>{
            emailTouched = true;
            emailValidation(tournament.contactInformation.email);
            }}
            />
        </div>
        <div class="sm:col-span-3">
            <Input type="number" label="Phone Number" placeholder=" "
                bind:value={tournament.contactInformation.phoneNumber} showErrorIcon={false} error={!validPhoneNumber}
                errorMessage={phoneNumberError} on:blur={()=>{
            phoneNumberTouched = true;
            phoneNumberValidation(tournament.contactInformation.phoneNumber);
            }}
            />
        </div>
        <div class="sm:col-span-full">
            <Textarea label="Company Bio" placeholder="250 characters only"
                bind:value={tournament.contactInformation.companyBio} error={!validCompanyBio}
                errorMessage={companyBioError} on:blur={()=>{
                     companyBioTouched = true;
                     companyBioValidation(tournament.contactInformation.companyBio);
                }}
            />
        </div>
    </div>
    <div
        class="flex mx-auto rounded-b-lg overflow-hidden items-center w-full flex justify-end justify-end gap-x-6 border-gray-900/10 sm:px-8"
    >
        <button
        type="button"
            class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            {disabled}
            on:click={saveContactInformation}
        >
            Save
        </button>
    </div>

    {#if !($meta.query.section && $meta.query.edit === "true")}
    <!-- T&C -->
    <div class=" pt-6">
        <h3 class=" text-base font-medium text-black mb-4">
            Terms & Conditions
        </h3>
        <div class=" mb-3 mt-1">
            <p class="font-medium text-sm text-black">
                Information Collection and Usage
            </p>
            <ol class="ps-2 mt-2 space-y-1 list-decimal list-inside">
                <li class=" text-gray-500 font-normal text-sm mb-2 ps-2">
                    We collect and store information provided by you during the
                    registration process, including but not limited to your
                    name, email address, contact information, and other relevant
                    details. We may also collect information automatically
                    through the use of cookies or other tracking technologies.
                </li>
                <li class=" text-gray-500 font-normal text-sm mb-2 ps-2">
                    We use the collected information for purposes including but
                    not limited to providing and improving our service,
                    communicating with you, and personalizing your experience.
                </li>
                <li class=" text-gray-500 font-normal text-sm mb-2 ps-2">
                    For the complete details, please check our
                    <a
                      class="font-medium text-blue-600 hover:text-blue-500"
                      href="https://www.battlegroundsmobileindia.com/privacy"
                      target="_blank"
                    >
                      privacy policy.
                    </a>
                </li>
            </ol>
        </div>
        <div class=" mb-3 mt-1">
            <p class="font-medium text-sm text-black">
                Data Sharing and Disclosure
            </p>
            <ol class="ps-2 mt-2 space-y-1 list-decimal list-inside">
                <li class=" text-gray-500 font-normal text-sm mb-2 ps-2">
                    We may share your data with third-party service providers
                    who assist us in providing and improving our service,
                    subject to confidentiality obligations. We may also disclose
                    your data when required by law or in response to valid legal
                    requests.
                </li>
            </ol>
        </div>
        <div class=" mb-3 mt-1">
            <p class="font-medium text-sm text-black">Changes to These Terms</p>
            <ol class="ps-2 mt-2 space-y-1 list-decimal list-inside">
                <li class=" text-gray-500 font-normal text-sm mb-2 ps-2">
                    We reserve the right to update or modify these terms and
                    conditions at any time. Any changes will be effective
                    immediately upon posting on our website or notifying you
                    through other means. Your continued use of our service after
                    such changes constitutes your acceptance of the revised
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
                    bind:checked={tournament.termsAndConditions}
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
            </div>
            <div class="text-sm leading-6">
                <label for="comments" class="font-medium text-gray-600"
                    >By accessing or using our service, you consent to the
                    collection, storage, and usage of your data in accordance
                    with these terms and conditions.
                </label>
            </div>
        </div>
        <div class="flex mx-auto overflow-hidden justify-start">
            <button
                on:click={applyTournament}
                class="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black {tournament.termsAndConditions ? "hover:bg-gray-800 bg-gray-800" : "bg-gray-400 hover:bg-gray-400"}"
                disabled={!tournament.termsAndConditions}
                >Submit Form</button
            >
        </div>            
    </div>
    {/if}
</div>