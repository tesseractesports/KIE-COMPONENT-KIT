<script>
  import { onMount } from "svelte";
  import { router } from "tinro";
  import FormButton from "../../Components/Form/FormButton.svelte";
  import Input from "../../Components/Form/Input.svelte";
  let API_ENDPOINT = import.meta.env.VITE_API_URL;
  import { validatePassword } from "../../Utils/validations";
  import { RESTClient } from "../../Utils/RESTClient";

  let token;
  let newPassword = "";
  let confirmPassword = "";
  let error = "";
  let resetSuccessful = false;

  let validPassword = true;
  let validConfirmPassword = true;
  let showValidStatusConfirmPassword = false;
  let showValidStatusPassword = false;

  let passwordError = "Please enter a valid password";
  let confirmPasswordError = "Passwords do not match";

  let passwordTouched = false;
  let confirmPasswordTouched = false;

  let disabled = false;

  $: disabled =
    !newPassword || !validPassword || newPassword !== confirmPassword;

  const passwordValidation = (value) => {
    validPassword = passwordTouched ? validatePassword(value) : true;
    showValidStatusPassword = validatePassword(value);
  };

  const confirmPasswordValidation = (value) => {
    validConfirmPassword = confirmPasswordTouched ? value == newPassword : true;
    showValidStatusConfirmPassword = (value === newPassword);
  };

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    token = urlParams.get("token");
  });

  let submitForm = async () => {
    const authClient = new RESTClient("auth");
    passwordTouched = true;
    confirmPasswordTouched = true;
    passwordValidation(newPassword);
    confirmPasswordValidation(confirmPassword);

    if (
      !validPassword ||
      !validConfirmPassword ||
      newPassword !== confirmPassword
    ) {
      // error = "Passwords do not match";
      return;
    }

    const url = `/reset-password?token=${token}`;

    authClient.post(url, {
      password: newPassword,
    }).then((response) => {
      if (response.code) {
        error = "Password reset failed";
      } else {
        error = "";
        resetSuccessful = true;
      }
    }).catch((error) => {
      console.error("Error resetting password:", error);
      error = error.message;
    });

   

    // try {
    //   const response = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ password: newPassword }),
    //   });

    //   if (response.ok) {
    //     error = "";
    //     resetSuccessful = true;
    //   } else {
    //     error = "Password reset failed";
    //   }
    // } catch (error) {
    //   console.error("Error resetting password:", error);
    //   error = error.message;
    // }
  };
</script>

{#if resetSuccessful}
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
        Your password has been reset!
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
{:else}
<div class="bg-white p-6 rounded-xl py-8">
  <div class="space-y-6">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="/images/krafton_login_logo_3x.png" alt="Your Company" />
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <div>
        <h2 class=" text-center mt-1 text-xl font-medium leading-9 tracking-tight text-gray-900">
          You’re almost there
        </h2>
        <p class="text-center text-gray-500 font-normal mt-2">
          Create a password to secure your account
        </p>
      </div>

      <div class="mt-6">
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <form action="#" method="POST" class="" on:keydown={(e)=> {
          if (e.key === "Enter") {
          e.preventDefault(); // Prevent default form submission
          submitForm();
          }
          }}>
          {#if error}
          <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert">
            <span class="font-medium">Error:</span>
            {error}
          </div>
          {/if}
          <div class="mt-2">
            <Input type="password" label="Password" placeholder="Create new password" error={!validPassword}
              errorMessage={passwordError} bind:value={newPassword} useTooltip={!validPassword} on:input={()=> {
            passwordTouched = true;
            passwordValidation(newPassword);
            }}
            on:blur={() => {
            passwordTouched = true;
            passwordValidation(newPassword);
            }}
            />
          </div>
          <div class="mt-2">
            <Input type="password" label="Confirm Password" placeholder="Confirm password" error={confirmPasswordTouched
              && newPassword !==confirmPassword} errorMessage={confirmPasswordError} bind:value={confirmPassword}
              on:input={()=>confirmPasswordValidation(confirmPassword)}
            on:blur={() => {
            confirmPasswordTouched = true;
            confirmPasswordValidation(confirmPassword);
            }}

            />
          </div>
          <div class="mt-6 grid grid-cols-1 gap-4">
            <FormButton on:click={submitForm} bind:disabled valid={showValidStatusConfirmPassword &&
              showValidStatusPassword}>Set Password</FormButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
{/if}