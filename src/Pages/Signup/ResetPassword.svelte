<script>
  import FormButton from "../../Components/Form/FormButton.svelte";
  import Input from "./../../Components/Form/Input.svelte";
  import { RESTClient } from "../../Utils/RESTClient";
  import AuthService from "../../Services/AuthService";
  let user = {};
  let message = null;
  let email = user.email;
  let password = "";
  let confirmPassword = "";

  const rest = new RESTClient("auth");
  let submitForm = () => {
    rest
      .post("/forgot-password", {
        email,
        password,
        confirmPassword,
      })
      .then((response) => {
        message = "Reset email sent successfully";
      })
      .catch((error) => {
        console.error("Login error :", error.message);
        AuthService.logout();
      });
  };
</script>

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
          class=" text-center mt-1 text-xl font-medium leading-9 tracking-tight text-gray-900"
        >
          Reset your passowrd
        </h2>
        <p class="text-center text-gray-500 font-normal mt-2">
          Create a password to secure your account
        </p>
      </div>
      <div class="mt-6">
        <form action="#" method="POST">
          <div class="mt-2">
            <Input
              type="email"
              label="Email address"
              placeholder="Enter email address"
              bind:value={email}
            />
          </div>
          <div class="mt-2">
            <Input
              type="password"
              label="Password"
              placeholder=""
              bind:value={password}
            />
          </div>
          <div class="mt-2">
            <Input
              type="password"
              label="Confirm Password"
              placeholder=""
              bind:value={confirmPassword}
            />
          </div>
          <p class=" text-gray-500 mb-6 font-normal text-sm mt-2">
            Create a password to secure your account
          </p>

          {#if message}
            <div
              class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
              role="alert"
            >
              <p class="font-bold">Success</p>
              <p>{message}</p>
            </div>
          {/if}
          <div class="mt-6">
            <FormButton on:click={submitForm}>Reset password</FormButton>
          </div>
        </form>
      </div>
      <p class=" text-xs text-center text-gray-400 mt-2">
        By clicking “Sign up” I agree to the
        <a
          href="#"
          class=" font-medium text-center text-indigo-600 hover:text-indigo-500"
          >Terms & Conditions</a
        >
        policy.
      </p>
    </div>
  </div>
</div>

<p class="mt-10 text-center text-sm text-white">
  Already have a Krafton account?
  <a
    href="/login"
    class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
    >Log in</a
  >
</p>
