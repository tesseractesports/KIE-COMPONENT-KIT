<script>
  import FormButton from "../../Components/Form/FormButton.svelte";
  import Input from "./../../Components/Form/Input.svelte";
  import { RESTClient } from "../../Utils/RESTClient";
  import AuthService from "../../Services/AuthService";
  import { validateEmail } from "../../Utils/validations";
  import { onMount } from "svelte";
  import { userEmail } from "../../Stores/UserStore.js";
  import { get } from "svelte/store";

  let user = {};
  let email = user.email || "";
  let validEmail = true;
  let emailTouched = false;
  let emailError = "Please enter a valid email address";
  let formSubmitted = false;
  let error = "";

  $: disabled = !email || !validEmail;

  let showValidStatusEmail = false;

  const emailValidation = (value) => {
    validEmail = emailTouched ? validateEmail(value) : true;
    showValidStatusEmail = validateEmail(value);
  };

  const rest = new RESTClient("auth");

  let submitForm = () => {
    emailTouched = true;
    emailValidation(email);
    if (!validEmail) {
      return;
    }
    rest
      .post("/forgot-password", { email })
      .then((response) => {
        if (response.code) {
          error = response.message;
        } else {
          formSubmitted = true;
          error = "";
        }
      })
      .catch((err) => {
        console.error("Error:", err.message);
        error = err.message
        AuthService.logout();
        formSubmitted = false;
      });
  };
  onMount(() => {
    email = get(userEmail); 
    if (email) {
      emailValidation(email); 
    }
  });
</script>

{#if !formSubmitted}
<div class="bg-white p-6 rounded-xl py-8">
  <div class="space-y-6">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-8 w-auto mb-6" src="/images/krafton_login_logo.png" alt="Your Company" />
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <div>
        <h2 class="text-center mt-1 text-xl font-medium leading-9 tracking-tight text-gray-900">
          Forgot Password
        </h2>
      </div>
      {#if error}
      <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
        <span class="font-medium">Error: </span>
        {error}
      </div>
      {/if}
      <div class="mt-6">
        <form action="#" on:submit|preventDefault={submitForm} method="POST">
          <div class="mt-2">
            <Input type="email" label="Email address" placeholder="Enter email address" error={!validEmail}
              errorMessage={emailError} bind:value={email} on:input={()=> emailValidation(email)}
            on:blur={() => {
            emailTouched = true;
            emailValidation(email);
            }}
            />
          </div>
          <div class="mt-6">
            <FormButton bind:disabled on:click={submitForm} valid={showValidStatusEmail}>
              Reset password
            </FormButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
{/if}

{#if formSubmitted}
<div class="bg-white p-6 rounded-xl py-6">
  <div class="space-y-6 mt-8 mb-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm text-center">
      <img class="mx-auto h-8 w-auto mb-6" src="/images/krafton_login_logo.png" alt="Your Company" />
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm text-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none" class="m-auto">
        <circle opacity="0.2" cx="40" cy="40" r="39.5" fill="#34D399" />
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M39.5 64.501C52.7548 64.501 63.5 53.7558 63.5 40.501C63.5 27.2461 52.7548 16.501 39.5 16.501C26.2452 16.501 15.5 27.2461 15.5 40.501C15.5 53.7558 26.2452 64.501 39.5 64.501ZM50.6213 36.6223C51.7929 35.4507 51.7929 33.5512 50.6213 32.3797C49.4497 31.2081 47.5502 31.2081 46.3787 32.3797L36.5 42.2583L32.6213 38.3797C31.4497 37.2081 29.5502 37.2081 28.3787 38.3797C27.2071 39.5512 27.2071 41.4507 28.3787 42.6223L34.3787 48.6223C35.5502 49.7939 37.4497 49.7939 38.6213 48.6223L50.6213 36.6223Z"
          fill="#34D399" />
      </svg>
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center mt-1 text-xl font-medium leading-9 tracking-tight text-green-500">
        Successful!
      </h2>
      <h2 class="text-center font-medium text-2xl text-gray-900">
        Your email has been sent!
      </h2>
      <p class="text-center text-gray-500 font-normal mt-6 text-sm">
        You can now log in using your new password
      </p>
    </div>
    <div class="mt-2">
      <a href="/"
        class="flex w-full justify-center rounded-m bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 rounded-md">
        Log In
      </a>
    </div>
  </div>
</div>
{/if}

<p class="mt-10 text-center text-sm text-white">
  Already have a Krafton account?
  <a href="/" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Log in</a>
</p>