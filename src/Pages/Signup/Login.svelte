<script>
  import { router } from "tinro";
  import FormButton from "../../Components/Form/FormButton.svelte";
  import Input from "../../Components/Form/Input.svelte";
  import AuthService from "../../Services/AuthService";
  import { RESTClient } from "../../Utils/RESTClient";
  import { validateEmail, validatePassword } from "../../Utils/validations";
  import { updateProfile, userEmail } from "../../Stores/UserStore.js";

  let email = "";
  let password = "";
  let error = "";
 
  let validEmail = true;
  let validPassword = true; 

  let showValidStatusEmail = false;
  let showValidStatusPassword = false; 

  let emailTouched = false;
  let passwordTouched = false;
 
  $: disabled = !password || !validPassword;
  
  // Define error messages
  let emailError = '';
  let passwordError = '';

  const emailValidation = (value) => {
    validEmail = emailTouched ? validateEmail(value) : true;
    showValidStatusEmail = validateEmail(value);
    emailError = !validEmail ? "Invalid email address." : "";
  };

  const passwordValidation = (value) => {
    validPassword = passwordTouched ? validatePassword(value) : true;
    showValidStatusPassword = validatePassword(value);
    passwordError = !validPassword ? "Password must be at least 8 characters long." : "";
  };
 
  const restAuth = new RESTClient("auth");

  const login = () => {
    emailTouched = true;
    emailValidation(email);
    if (!validEmail) {
      return;
    }

    passwordTouched = true;
    passwordValidation(password);
    if (!validPassword) {
      return;
    }
    restAuth
      .post("/vendorLogin", { email, password })
      .then((response) => {
        if (response.code) {
          error = "Invalid credentials, please try again.";;
          return;
        }
        AuthService.login(response);
        updateProfile(response); // Save the user to the store
        userEmail.set(email); // Save the email to the store
        router.goto(response.vendorStatus >= 3 ? "/dashboard" : "/portals");
      })
      .catch((err) => {
        error = err.message || "Invalid credentials, please try again.";
        console.error("Login error:", err.message);
        AuthService.logout();
      });
  };

  const goToForgotPassword = () => {
    userEmail.set(email); // Save the email to the store before navigating
    router.goto("/forgot-password"); // Navigate to the Forgot Password page
  };
</script>

<div class="bg-white container rounded-xl p-6 py-8 space-y-4">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <div class="text-center">
      <img class="mx-auto h-8 w-auto mb-6" src="/images/krafton_login_logo.png" alt="Your Company" />
      <h2 class="text-2xl font-semibold mb-4 text-gray-900">
        Login to access KIE Platform
      </h2>
    </div>

    {#if error}
    <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
      <span class="font-medium">Error:</span>
      {error}
    </div>
    {/if}

    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <form on:submit|preventDefault={login} class="space-y-6"  on:keydown={(e)=> {
      if (e.key === "Enter") {
      e.preventDefault();
      login();
      }
      }} >
      <div class="mt-2">
        <Input 
          type="email" 
          label="Email address" 
          placeholder="Enter email address" 
          error={!validEmail}
          errorMessage={emailError} 
          bind:value={email} 
          on:input={() => emailValidation(email)}
          on:blur={() => {
            emailTouched = true;
            emailValidation(email);
          }}
        />
      </div>
      <div class="mt-2">
        <Input type="password" label="Password" placeholder="Enter Password" error={!validPassword}
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
      <p class="text-sm leading-1 mt-1">
        <a href="/forgotpwd" on:click|preventDefault={goToForgotPassword} class="font-medium text-center text-sm text-indigo-600 hover:text-indigo-500">
          Forgot password?
        </a>
      </p>
      <FormButton on:click={login} {disabled} valid={showValidStatusPassword && showValidStatusEmail}>Login</FormButton>
      <p class="text-xs text-center text-gray-400 mt-2">
        By clicking “Login” I agree to the
        <a href="https://www.battlegroundsmobileindia.com/privacy" target="_blank" class="font-medium text-indigo-600 hover:text-indigo-500">
          Terms & Conditions
        </a> policy.
      </p>
    </form>
  
  </div>
</div>