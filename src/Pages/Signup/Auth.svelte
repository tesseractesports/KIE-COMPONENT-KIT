<script>
  import { router } from "tinro";
  import FormButton from "../../Components/Form/FormButton.svelte";
  import Input from "../../Components/Form/Input.svelte";
  import AuthService from "../../Services/AuthService";
  import { RESTClient } from "../../Utils/RESTClient";
  import { validateEmail, validatePassword } from "../../Utils/validations";
  import {userEmail} from "../../Stores/UserStore.js"

  let email = "";
  let password = "";
  let confirmPassword = "";
  let error = "";
  let step = 0;
  let vendor = {};

  let validEmail = true;
  let validPassword = true;
  let validConfirmPassword = true;

  let showValidStatusEmail = false;
  let showValidStatusPassword = false;
  let showValidStatusConfirmPassword = false;

  let emailError = "Please enter a valid email address";
  let passwordError = "Please enter a valid password";
  let confirmPasswordError = "Passwords do not match";

  let emailTouched = false;
  let passwordTouched = false;
  let confirmPasswordTouched = false;

  let disabled = false;
  let disabled1 = false;
  let disabled2 = false;

  $: disabled = step === 0 && (!email || !validEmail);

  $: disabled1 = !password || !validPassword;
  $: disabled2 = !password || !validPassword || password !== confirmPassword;

  $: error = step <= 4 ? "" : "You are not allowed to proceed.";

  const emailValidation = (value) => {
    validEmail = emailTouched ? validateEmail(value) : true;
    showValidStatusEmail = validateEmail(value);
  };

  const passwordValidation = (value) => {
    validPassword = passwordTouched ? validatePassword(value) : true;
    showValidStatusPassword = validatePassword(value);
  };

  const confirmPasswordValidation = (value) => {
    validConfirmPassword = confirmPasswordTouched ? value == password : true;
    showValidStatusConfirmPassword = value === password;
  };
  const restUsers = new RESTClient("users");

  const isPublicDomain = (email) => {
    const publicDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
    ];
    const domain = email.split("@")[1];
    return publicDomains.includes(domain);
  };

  const checkVendorEmailStatus = () => {
    emailTouched = true;
    emailValidation(email);
    if (!validEmail) {
      return;
    }
    restUsers
      .post("/checkVendorEmailStatus", { email })
      .then((response) => {
        if (response.code) {
          error = response.message;
          return;
        }

        if (response.action == "login") {
          step = 2;
        } else if (response.action == "register") {
          step = 5;
        } else if (response.action == "contact_admin") {
          step = 3;
          vendor = response.vendor;
        } else if (response.action == "not_allowed") {
          step = 5;
        } else {
          step = 4;
        }
      })
      .catch((err) => {
        if (err.code == "not_allowed") {
          step = 5;
        }
        error = err.message || "Unknown error occurred";
        console.error("Email status check error:", err);
      });
  };

  const restAuth = new RESTClient("auth");

  // const register = () => {
  //   passwordTouched = true;
  //   confirmPasswordTouched = true;
  //   passwordValidation(password);
  //   confirmPasswordValidation(confirmPassword);

  //   if (
  //     !validPassword ||
  //     !validConfirmPassword ||
  //     password !== confirmPassword
  //   ) {
  //     // error = "Passwords do not match";
  //     return;
  //   }
  //   restAuth
  //     .post("/register", { email, password })
  //     .then((response) => {
  //       if (response.code) {
  //         error = response.message;
  //         return;
  //       }
  //       AuthService.login(response);
  //       step = 4;
  //     })
  //     .catch((err) => {
  //       error = err.message || "Registration error";
  //       console.error("Registration error:", err.message);
  //       AuthService.logout();
  //     });
  // };
  const login = () => {
    passwordTouched = true;
    passwordValidation(password);
    if (!validPassword) {
      return;
    }
    restAuth
      .post("/vendorLogin", { email, password })
      .then((response) => {
        if (response.code) {
          error = response.message;
          return;
        }
        AuthService.login(response);
        userEmail.set(email); // Save the email to the store
        router.goto(response.vendorStatus >= 3 ? "/dashboard" : "/portals");
      })
      .catch((err) => {
        error = err.message || "Login error";
        console.error("Login error:", err.message);
        AuthService.logout();
      });
  };
  function reloadPage() {
    window.location.reload();
  }
  const goToForgotPassword = () => {
    userEmail.set(email); // Save the email to the store before navigating
    router.goto("/forgot-password"); // Navigate to the Forgot Password page
  };
</script>

{#if step !== 3}
{#if step !== 4 && step !== 5}
<div class="container mx-auto p-6">
  <div class="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
    <div class="text-center">
      <img class="mx-auto h-8 w-auto mb-6" src="/images/krafton_login_logo.png" alt="Your Company" />
      <h2 class="text-2xl font-semibold mb-4 text-gray-900">
        {#if step === 0}
        Register or Login to access KIE Platform
        {/if}
        {#if step === 1}
        Create an Account
        {/if}
        {#if step === 2}
        Login to access KIE Platform
        {/if}
      </h2>
    </div>

    {#if error}
    <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
      <span class="font-medium">Error:</span>
      {error}
    </div>
    {/if}

    {#if step === 0}
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <form on:submit|preventDefault={checkVendorEmailStatus} on:keydown={(e)=> {
      if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission
      checkVendorEmailStatus();
      }
      }}
      class="space-y-6"
      >
      <div class="mt-2">
        <Input type="email" label="Email address" placeholder="Enter email address" error={!validEmail}
          errorMessage={emailError} bind:value={email} on:input={()=> emailValidation(email)}
        on:blur={() => {
        emailTouched = true;
        emailValidation(email);
        }}
        />
      </div>
      <FormButton on:click={checkVendorEmailStatus} bind:disabled valid={showValidStatusEmail}>Go</FormButton>
      <p class="text-xs text-center text-gray-400 mt-2">
        By clicking “Login” I agree to the
        <a href="https://www.battlegroundsmobileindia.com/privacy" target="_blank"
          class="font-medium text-indigo-600 hover:text-indigo-500">Terms & Conditions</a> policy.
      </p>
    </form>
    {/if}

    <!-- {#if step === 1}
   
    <form on:submit|preventDefault={register} on:keydown={(e)=> {
      if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission
      register();
      }
      }}
      class="space-y-6"
      >
      <div class="mt-2">
        <Input type="password" label="Password" placeholder="Create new password" error={!validPassword}
          errorMessage={passwordError} bind:value={password} useTooltip={!validPassword} on:input={()=> {
        passwordTouched = true;
        passwordValidation(password);
        }}
        on:blur={() => {
        passwordTouched = true;
        passwordValidation(password);
        }}
        />
      </div>
      <div class="mt-2">
        <Input type="password" label="Confirm Password" placeholder="Confirm password" error={confirmPasswordTouched &&
          password !==confirmPassword} errorMessage={confirmPasswordError} bind:value={confirmPassword} on:input={()=>
        confirmPasswordValidation(confirmPassword)}
        on:blur={() => {
        confirmPasswordTouched = true;
        confirmPasswordValidation(confirmPassword);
        }}
        />
      </div>
      <FormButton on:click={register} bind:disabled={disabled2} valid={showValidStatusConfirmPassword}>Create account
      </FormButton>
      <p class="text-xs text-center text-gray-400 mt-2">
        By clicking “Sign up” I agree to the
        <a href="https://www.battlegroundsmobileindia.com/privacy" target="_blank"
          class="font-medium text-indigo-600 hover:text-indigo-500">Terms & Conditions</a> policy.
      </p>
    </form>
    {/if} -->

    {#if step === 2}
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <form on:submit|preventDefault={login} on:keydown={(e)=> {
      if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission
      login();
      }
      }}
      class="space-y-6"
      >
      <div class="mt-2">
        <Input type="password" label="Password" placeholder="Enter Password" error={!validPassword}
          errorMessage={passwordError} bind:value={password} on:input={()=> passwordValidation(password)}
        on:blur={() => {
        passwordTouched = true;
        passwordValidation(password);
        }}
        />
      </div>
      <p class=" text-sm leading-1 mt-1">
        <a href="/forgotpwd" on:click|preventDefault={goToForgotPassword} class=" font-medium text-center text-sm text-indigo-600 hover:text-indigo-500">Forgot
          password?</a>
      </p>
      <FormButton on:click={login} bind:disabled={disabled1} valid={showValidStatusPassword}>Login</FormButton>
      <p class="text-xs text-center text-gray-400 mt-2">
        By clicking “Login” I agree to the
        <a href="https://www.battlegroundsmobileindia.com/privacy" target="_blank"
          class="font-medium text-indigo-600 hover:text-indigo-500">Terms & Conditions</a> policy.
      </p>
    </form>
    {/if}
  </div>
</div>
{/if}
{/if}

{#if step == 3}
<div class="bg-white p-4 rounded-lg py-6">
  <div class="space-y-6 mt-8 mb-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-xs text-center">
      <img class="mx-auto h-8 w-auto mb-6" src="/images/krafton_login_logo.png" alt="Your Company" />
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-xs text-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 80 80" fill="none" class="m-auto">
        <circle opacity="0.2" cx="40" cy="40" r="39.5" fill="#FDE68A" />
        <path
          d="M36.5 28.5C36.5 33.4706 32.4706 37.5 27.5 37.5C22.5294 37.5 18.5 33.4706 18.5 28.5C18.5 23.5294 22.5294 19.5 27.5 19.5C32.4706 19.5 36.5 23.5294 36.5 28.5Z"
          fill="#F59E0B" />
        <path
          d="M60.5 28.5C60.5 33.4706 56.4706 37.5 51.5 37.5C46.5294 37.5 42.5 33.4706 42.5 28.5C42.5 23.5294 46.5294 19.5 51.5 19.5C56.4706 19.5 60.5 23.5294 60.5 28.5Z"
          fill="#F59E0B" />
        <path
          d="M48.2874 61.5C48.4275 60.5202 48.5001 59.5186 48.5001 58.5C48.5001 53.5945 46.818 49.0818 43.9993 45.5072C46.2057 44.2306 48.7676 43.5 51.5001 43.5C59.7843 43.5 66.5001 50.2157 66.5001 58.5V61.5H48.2874Z"
          fill="#F59E0B" />
        <path d="M27.5 43.5C35.7843 43.5 42.5 50.2157 42.5 58.5V61.5H12.5V58.5C12.5 50.2157 19.2157 43.5 27.5 43.5Z"
          fill="#F59E0B" />
      </svg>
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-xs">
      <h2 class="text-center mt-1 text-lg font-medium leading-7 tracking-tigh text-yellow-500">
        Account already exists
      </h2>
      <p class="text-center text-gray-500 font-normal mt-4 text-sm">
        Account already exists, kindly reach out to your domain admin for
        access to KIE platform
      </p>
    </div>
    <a href="https://kraftonindiaesports.com/"
      class="flex m-auto w-max px-6 items-center justify-center gap-3 rounded-md bg-white py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">Visit
      KIE website</a>
  </div>
</div>
<p class="mt-10 text-center text-sm text-white">
  Already have a Krafton account?
  <a href="/" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" on:click={reloadPage}>
    Log in
  </a>
</p>
{/if}

{#if step == 4}
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
      <h2 class=" text-center mt-1 text-xl font-medium leading-9 tracking-tight text-green-500">
        Congratulations!
      </h2>
      <h2 class="text-center font-medium text-2xl text-gray-900">
        Your account has been created!
      </h2>
      <p class="text-center text-gray-500 font-normal mt-6 text-sm">
        To access the KIE platform, register as a vendor with '{email}'
      </p>
    </div>
    <div class="mt-2">
      <a href="/portals"
        class="flex w-full justify-center rounded-m bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 rounded-md">Register
        as vendor</a>
    </div>
  </div>
</div>
{/if}

{#if step == 5}
<div class="bg-white p-4 rounded-lg py-6">
  <div class="space-y-6 mt-8 mb-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-xs text-center">
      <img class="mx-auto h-8 w-auto mb-6" src="/images/krafton_login_logo.png" alt="Your Company" />
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-xs text-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 80 80" fill="none" class="m-auto">
        <circle opacity="0.2" cx="40" cy="40" r="39.5" fill="#FDE68A" />
        <path
          d="M36.5 28.5C36.5 33.4706 32.4706 37.5 27.5 37.5C22.5294 37.5 18.5 33.4706 18.5 28.5C18.5 23.5294 22.5294 19.5 27.5 19.5C32.4706 19.5 36.5 23.5294 36.5 28.5Z"
          fill="#F59E0B" />
        <path
          d="M60.5 28.5C60.5 33.4706 56.4706 37.5 51.5 37.5C46.5294 37.5 42.5 33.4706 42.5 28.5C42.5 23.5294 46.5294 19.5 51.5 19.5C56.4706 19.5 60.5 23.5294 60.5 28.5Z"
          fill="#F59E0B" />
        <path
          d="M48.2874 61.5C48.4275 60.5202 48.5001 59.5186 48.5001 58.5C48.5001 53.5945 46.818 49.0818 43.9993 45.5072C46.2057 44.2306 48.7676 43.5 51.5001 43.5C59.7843 43.5 66.5001 50.2157 66.5001 58.5V61.5H48.2874Z"
          fill="#F59E0B" />
        <path d="M27.5 43.5C35.7843 43.5 42.5 50.2157 42.5 58.5V61.5H12.5V58.5C12.5 50.2157 19.2157 43.5 27.5 43.5Z"
          fill="#F59E0B" />
      </svg>
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-xs">
      <h2 class="text-center mt-1 text-lg font-medium leading-7 tracking-tigh text-yellow-500">
        Not Allowed to access KIE Vendor TMP platform.
      </h2>
      <p class="text-center text-gray-500 font-normal mt-4 text-sm">
       Kindly reach out to KIE Admin for access to KIE Vendor platform.
      </p>
    </div>
  </div>
</div>
<p class="mt-10 text-center text-sm text-white">
  Already have a Krafton account?
  <a href="/" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" on:click={reloadPage}>
    Log in
  </a>
</p>
{/if}