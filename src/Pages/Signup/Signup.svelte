<!-- <script>
  import { router } from "tinro";
  import FormButton from "../../Components/Form/FormButton.svelte";
  import Input from "./../../Components/Form/Input.svelte";
  import AuthService from "../../Services/AuthService";
  import { RESTClient } from "../../Utils/RESTClient";

  import {
    validateEmail,
    validateName,
    validatePassword,
  } from "../../Utils/validations";

  let email = "";
  let password = "";
  let firstName = "";
  let lastName = "";
  let confirmPassword = "";
  let error = "";
  let step = 0;
  let vendor = {};

  let validEmail = true;
  let validPassword = true;
  let validConfirmPassword = true;
  let validFirstName = true;
  let validLastName = true;

  let emailError = "Please enter a valid email address";
  let passwordError = "Please enter a valid password";
  let firstNameError = "Please enter a valid first name";
  let lastNameError = "Please enter a valid last name";
  let confirmPasswordError = "Passwords do not match";

  let emailTouched = false;
  let passwordTouched = false;
  let firstNameTouched = false;
  let lastNameTouched = false;
  let confirmPasswordTouched = false;

  let disabled = false;
  let disabled1 = false;

  $: disabled =
    step === 0 &&
    (!email ||
      !validEmail ||
      !firstName ||
      !validFirstName ||
      !lastName ||
      !validLastName);
  $: disabled1 = !password || !validPassword || password !== confirmPassword;

  const emailValidation = (value) => {
    validEmail = emailTouched ? validateEmail(value) : true;
  };
  const nameValidation = (value, isfirstName = true) => {
    if (isfirstName) {
      validFirstName = firstNameTouched ? validateName(value) : true;
    } else {
      validLastName = lastNameTouched ? validateName(value) : true;
    }
  };

  const passwordValidation = (value) => {
    validPassword = passwordTouched ? validatePassword(value) : true;
  };

  const confirmPasswordValidation = (value) => {
    validConfirmPassword = confirmPasswordTouched ? value == password : true;
  };

  const rest = new RESTClient("auth");

  let register = () => {
    error = null;
    if (
      (firstNameTouched && !validFirstName) ||
      (lastNameTouched && !validLastName) ||
      (emailTouched && !validEmail) ||
      (passwordTouched && !validPassword) ||
      (confirmPasswordTouched && !validConfirmPassword)
    ) {
      return;
    }

    rest
      .post("/register", {
        firstName,
        lastName,
        email,
        password,
      })
      .then((response) => {
        if (response.code) {
          error = response.message;
          return;
        } else if (response.user) {
          AuthService.login(response);
          router.goto("/portals");
        }
      })
      .catch((err) => {
        error = err.message;
        console.error("Registration error:", err.message);
        AuthService.logout();
      });
  };

  let checkVendorExists = () => {
    if (
      !email ||
      !validEmail ||
      !firstName ||
      !validFirstName ||
      !lastName ||
      !validLastName
    ) {
      return;
    }
    error = null;
    const rest = new RESTClient("vendor");
    rest
      .post("/checkVendorExists", {
        email,
      })
      .then((response) => {
        if (response.status == 404) {
          step = 1;
        } else if (response.email) {
          step = 2;
        }
      })
      .catch((err) => {
        error = err.message;
        console.error("Vendor check error:", err.message);
      });
  };
  function gotoLogin() {
    router.goto("/login");
  }
</script>

{#if step == 0}
  <div class="bg-white p-6 rounded-xl py-8">
    <div class="space-y-6">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-10 w-auto"
          src="/images/krafton_login_logo_3x.png"
          alt="Your Company"
        />
      </div>
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <h2
            class="text-center mt-1 text-xl font-medium leading-9 tracking-tight text-gray-900"
          >
            Register to access KIE Platform
          </h2>
        </div>
        <div class="mt-4">
    
          <form
            action="#"
            on:keydown={(e) => e.key === "Enter" && checkVendorExists(e)}
            method="POST"
            class="space-y-6"
          >
            {#if error}
              <div
                class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                role="alert"
              >
                <span class="font-medium">Error:</span>
                {error}
              </div>
            {/if}

            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col">
                <Input
                  type="text"
                  label="First Name"
                  placeholder="Enter First Name"
                  bind:value={firstName}
                  on:blur={() => {
                    firstNameTouched = true;
                    nameValidation(firstName);
                  }}
                />
                <p class="text-xs text-red-500 h-4">
                  {#if !validFirstName}{firstNameError}{/if}
                </p>
              </div>

              <div class="flex flex-col">
                <Input
                  type="text"
                  label="Last Name"
                  placeholder="Enter Last Name"
                  bind:value={lastName}
                  on:blur={() => {
                    lastNameTouched = true;
                    nameValidation(lastName, false);
                  }}
                />
                <p class="text-xs text-red-500 h-4">
                  {#if !validLastName}{lastNameError}{/if}
                </p>
              </div>

              <div class="flex flex-col col-span-2">
                <Input
                  type="email"
                  label="Email address"
                  placeholder="Enter Email"
                  bind:value={email}
                  on:blur={() => {
                    emailTouched = true;
                    emailValidation(email);
                  }}
                />
                <p class="text-xs text-red-500 h-4">
                  {#if !validEmail}{emailError}{/if}
                </p>
              </div>
            </div>

            <FormButton on:click={checkVendorExists} {disabled}>Next</FormButton
            >
          </form>
        </div>
      </div>
    </div>
    <p class="text-xs text-center text-gray-400 mt-2">
      By clicking “Sign up” I agree to the
      <a
        href="#"
        class="font-medium text-center text-indigo-600 hover:text-indigo-500"
      >
        Terms & Conditions
      </a>
      policy.
    </p>
  </div>
{/if}
{#if step == 1}
  <div class="bg-white p-6 rounded-xl py-8">
    <div class="space-y-6">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-10 w-auto"
          src="/images/krafton_login_logo_3x.png"
          alt="Your Company"
        />
      </div>
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <h2
            class="text-center mt-1 text-xl font-medium leading-9 tracking-tight text-gray-900"
          >
            You’re almost there
          </h2>
          <p class="text-center text-gray-500 font-normal mt-2">
            Create a password to secure your account
          </p>
        </div>
        <div class="mt-6">
          <form action="#" method="POST" class="">
            {#if error}
              <div
                class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                role="alert"
              >
                <span class="font-medium">Error:</span>
                {error}
              </div>
            {/if}
            <div class="mt-2">
              <Input
                type="password"
                label="Password"
                placeholder="Create new password"
                bind:value={password}
                on:blur={() => {
                  passwordTouched = true;
                  passwordValidation(password);
                }}
              />
              {#if !validPassword}
                <p class="text-xs text-red-500">{passwordError}</p>
              {/if}
            </div>
            <div class="mt-2">
              <Input
                type="password"
                label="Confirm Password"
                placeholder="Confirm password"
                bind:value={confirmPassword}
                on:blur={() => {
                  confirmPasswordTouched = true;
                  confirmPasswordValidation(confirmPassword);
                }}
              />
              {#if confirmPasswordTouched && password !== confirmPassword}
                <p class="text-xs text-red-500">{confirmPasswordError}</p>
              {/if}
            </div>
            <div class="mt-6 grid grid-cols-2 gap-4">
              <button
                on:click={gotoLogin}
                class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
              >
                Cancel
            </button>
              <FormButton on:click={register} bind:disabled={disabled1}
                >Create account</FormButton
              >
            </div>
            <p class="text-xs text-center text-gray-400 mt-2">
              By clicking “Sign up” I agree to the
              <a
                href="#"
                class="font-medium text-center text-indigo-600 hover:text-indigo-500"
              >
                Terms & Conditions
              </a>
              policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
{/if}

{#if step == 2}
  <div class="bg-white p-6 rounded-xl py-8">
    <div class="space-y-6 mt-10 mb-10">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="146"
          height="25"
          viewBox="0 0 146 25"
          fill="none"
          class="m-auto"
        >
          <path
            d="M11.4815 0.5L11.5526 1.64459L7.27511 9.56777H6.44142V1.9346L7.16065 0.5H0.921875L1.64188 1.93538V23.0639L0.921875 24.4992H7.16065L6.44142 23.0654V14.3681H7.21788L11.5549 23.3229L11.4815 24.4992H18.4403L16.977 22.6516L11.3662 11.3488L16.5571 1.97482L17.7203 0.5H11.4815Z"
            fill="black"
          />
          <path
            d="M28.9856 5.29954H33.786V12.6698H28.9856V5.29954ZM23.4661 0.5L24.1861 1.93538V23.0654L23.4661 24.5H29.7057L28.9856 23.0662V17.4708H30.6716L32.6831 22.9478L32.5865 24.5H39.0658L37.7959 22.6663L35.6266 17.0702L38.5855 14.1113H38.587V3.85952L35.226 0.5H23.4653H23.4661Z"
            fill="black"
          />
          <path
            d="M53.684 7.80216L55.7567 15.7741H51.6114L53.684 7.80216ZM49.8443 0.5L50.3686 1.89361L44.6952 23.1775L44.085 24.4985H50.084L49.8048 22.7243L50.4142 20.381H56.9538L57.5633 22.7243L57.2841 24.4985H63.2839L62.6729 23.1775L56.9995 1.89361L57.5246 0.5H49.845H49.8443Z"
            fill="black"
          />
          <path
            d="M138.837 0.5L139.557 1.93538V13.4091L134.517 0.5H128.759L129.479 1.93538V23.0639L128.759 24.4992H134.998L134.278 23.0654V11.5932L139.317 24.4992H145.078L144.357 23.0654V1.9346L145.078 0.5H138.837Z"
            fill="black"
          />
          <path
            d="M68.7227 0.5L69.4427 1.93538V23.0639L68.7227 24.4992H74.9614L74.2422 23.0654V14.9473H79.041L80.481 15.6697V9.42315L79.041 10.1462V10.1478H74.2422V5.29954H81.4431L82.8807 6.02186V0.5H68.7227Z"
            fill="black"
          />
          <path
            d="M87.9536 0.5V6.02186L89.3913 5.29954H93.2226V23.0639L92.5026 24.4992H98.7421L98.0229 23.0654V5.29954H101.864L103.302 6.02186V0.5H87.9536Z"
            fill="black"
          />
          <path
            d="M113.147 5.29954H118.427V19.6989H113.147V5.29954ZM111.707 0.5L108.347 3.85952V21.1397L111.706 24.4992H119.865L123.224 21.1397V3.85952L119.866 0.5H111.707Z"
            fill="black"
          />
        </svg>
      </div>
      <div class="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          class="m-auto"
        >
          <circle opacity="0.2" cx="40" cy="40" r="39.5" fill="#FDE68A" />
          <path
            d="M36.5 28.5C36.5 33.4706 32.4706 37.5 27.5 37.5C22.5294 37.5 18.5 33.4706 18.5 28.5C18.5 23.5294 22.5294 19.5 27.5 19.5C32.4706 19.5 36.5 23.5294 36.5 28.5Z"
            fill="#F59E0B"
          />
          <path
            d="M60.5 28.5C60.5 33.4706 56.4706 37.5 51.5 37.5C46.5294 37.5 42.5 33.4706 42.5 28.5C42.5 23.5294 46.5294 19.5 51.5 19.5C56.4706 19.5 60.5 23.5294 60.5 28.5Z"
            fill="#F59E0B"
          />
          <path
            d="M48.2874 61.5C48.4275 60.5202 48.5001 59.5186 48.5001 58.5C48.5001 53.5945 46.818 49.0818 43.9993 45.5072C46.2057 44.2306 48.7676 43.5 51.5001 43.5C59.7843 43.5 66.5001 50.2157 66.5001 58.5V61.5H48.2874Z"
            fill="#F59E0B"
          />
          <path
            d="M27.5 43.5C35.7843 43.5 42.5 50.2157 42.5 58.5V61.5H12.5V58.5C12.5 50.2157 19.2157 43.5 27.5 43.5Z"
            fill="#F59E0B"
          />
        </svg>
      </div>
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2
          class=" text-center mt-1 text-xl font-medium leading-9 tracking-tigh text-yellow-500"
        >
          Account already exists
        </h2>
        <p class="text-center text-gray-500 font-normal mt-6 text-sm">
          Account already exists, kindly reach out to '{vendor.email}' for
          access to KIE platform
        </p>
      </div>
      <a
        href="https://kraftonindiaesports.com/"
        class="flex m-auto w-max px-12 items-center justify-center gap-3 rounded-md bg-white py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
        >Visit KIE website</a
      >
    </div>
  </div>
{/if}

{#if step == 3}
  <div class="bg-white p-6 rounded-xl py-8">
    <div class="space-y-6 mt-10 mb-10">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="146"
          height="25"
          viewBox="0 0 146 25"
          fill="none"
          class="m-auto"
        >
          <path
            d="M11.4815 0.5L11.5526 1.64459L7.27511 9.56777H6.44142V1.9346L7.16065 0.5H0.921875L1.64188 1.93538V23.0639L0.921875 24.4992H7.16065L6.44142 23.0654V14.3681H7.21788L11.5549 23.3229L11.4815 24.4992H18.4403L16.977 22.6516L11.3662 11.3488L16.5571 1.97482L17.7203 0.5H11.4815Z"
            fill="black"
          />
          <path
            d="M28.9856 5.29954H33.786V12.6698H28.9856V5.29954ZM23.4661 0.5L24.1861 1.93538V23.0654L23.4661 24.5H29.7057L28.9856 23.0662V17.4708H30.6716L32.6831 22.9478L32.5865 24.5H39.0658L37.7959 22.6663L35.6266 17.0702L38.5855 14.1113H38.587V3.85952L35.226 0.5H23.4653H23.4661Z"
            fill="black"
          />
          <path
            d="M53.684 7.80216L55.7567 15.7741H51.6114L53.684 7.80216ZM49.8443 0.5L50.3686 1.89361L44.6952 23.1775L44.085 24.4985H50.084L49.8048 22.7243L50.4142 20.381H56.9538L57.5633 22.7243L57.2841 24.4985H63.2839L62.6729 23.1775L56.9995 1.89361L57.5246 0.5H49.845H49.8443Z"
            fill="black"
          />
          <path
            d="M138.837 0.5L139.557 1.93538V13.4091L134.517 0.5H128.759L129.479 1.93538V23.0639L128.759 24.4992H134.998L134.278 23.0654V11.5932L139.317 24.4992H145.078L144.357 23.0654V1.9346L145.078 0.5H138.837Z"
            fill="black"
          />
          <path
            d="M68.7227 0.5L69.4427 1.93538V23.0639L68.7227 24.4992H74.9614L74.2422 23.0654V14.9473H79.041L80.481 15.6697V9.42315L79.041 10.1462V10.1478H74.2422V5.29954H81.4431L82.8807 6.02186V0.5H68.7227Z"
            fill="black"
          />
          <path
            d="M87.9536 0.5V6.02186L89.3913 5.29954H93.2226V23.0639L92.5026 24.4992H98.7421L98.0229 23.0654V5.29954H101.864L103.302 6.02186V0.5H87.9536Z"
            fill="black"
          />
          <path
            d="M113.147 5.29954H118.427V19.6989H113.147V5.29954ZM111.707 0.5L108.347 3.85952V21.1397L111.706 24.4992H119.865L123.224 21.1397V3.85952L119.866 0.5H111.707Z"
            fill="black"
          />
        </svg>
      </div>
      <div class="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          class="m-auto"
        >
          <circle opacity="0.2" cx="40" cy="40" r="39.5" fill="#34D399" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M39.5 64.501C52.7548 64.501 63.5 53.7558 63.5 40.501C63.5 27.2461 52.7548 16.501 39.5 16.501C26.2452 16.501 15.5 27.2461 15.5 40.501C15.5 53.7558 26.2452 64.501 39.5 64.501ZM50.6213 36.6223C51.7929 35.4507 51.7929 33.5512 50.6213 32.3797C49.4497 31.2081 47.5502 31.2081 46.3787 32.3797L36.5 42.2583L32.6213 38.3797C31.4497 37.2081 29.5502 37.2081 28.3787 38.3797C27.2071 39.5512 27.2071 41.4507 28.3787 42.6223L34.3787 48.6223C35.5502 49.7939 37.4497 49.7939 38.6213 48.6223L50.6213 36.6223Z"
            fill="#34D399"
          />
        </svg>
      </div>
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2
          class=" text-center mt-1 text-xl font-medium leading-9 tracking-tight text-green-500"
        >
          Congratulations!
        </h2>
        <h2 class="text-center font-medium text-2xl text-gray-900">
          Your account has been created!
        </h2>
        <p class="text-center text-gray-500 font-normal mt-6 text-sm">
          To access the KIE platform, register as a vendor with '{email}'
        </p>
      </div>
      <div class="mt-6 grid grid-cols-2 gap-4">
        <a
          href="#"
          class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
          >Cancel</a
        >
        <a
          href="/portals"
          class="flex w-full justify-center rounded-m bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 rounded-md"
          >Register as vendor</a
        >
      </div>
    </div>
  </div>
{/if}

{#if step != 3}
  <p class="mt-10 text-center text-sm text-white">
    Already have a Krafton account?
    <a
      href="/login"
      class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >Log in</a
    >
  </p>
{/if} -->
