<script>
  import { vendorStore } from "./Stores/VendorsStore.js";
  // import Signup from "./Pages/Signup/Signup.svelte";
  import { Route, router } from "tinro";
  import LoginLayout from "./Layouts/LoginLayout.svelte";
  import Reset from "./Pages/Signup/ResetPassword.svelte";
  import SetPassword from "./Pages/Signup/SetPassword.svelte";
  import EsportsCalendar from "./Pages/EsportsCalendar.svelte";
  import Tournaments from "./Pages/Tournaments/Tournaments.svelte";
  import Reports from "./Pages/Reports.svelte";
  // import Login from "./Pages/Signup/Login.svelte";
  import Profile from "./Pages/Signup/Profile.svelte";
  import UpdateProfile from "./Pages/Signup/updateProfile.svelte";
  import MainLayout from "./Layouts/MainLayout.svelte";
  import Portals from "./Pages/Signup/Portals.svelte";
  import Logout from "./Pages/Signup/Logout.svelte";
  import AdminLandingPage from "./Pages/Admin/AdminLandingPage.svelte";
  import PlainLayout from "./Layouts/PlainLayout.svelte";
  import VendorRegistration from "./Pages/Vendor/VendorRegistration.svelte";
  import VendorLandingPage from "./Pages/Vendor/Vendor.svelte";
  import Vendor from "./Pages/Vendor/Vendor.svelte";
  import VendorStatus from "./Pages/Vendor/VendorStatus.svelte";
  import Dashboard from "./Pages/Dashboard.svelte";
  import PasswordSuccess from "./Pages/Signup/PasswordSuccess.svelte";
  import AccountSuccess from "./Pages/Signup/AccountSuccess.svelte";
  import AccountRegistred from "./Pages/Signup/AccountRegistred.svelte";
  import { onMount } from "svelte";
  import AuthService from "./Services/AuthService";
  import VendorProfile from "./Pages/Vendor/VendorProfile.svelte";
  import VendorPreview from "./Pages/Vendor/VendorPreview.svelte";
  import Calendar from "./Pages/Calendar/Calendar.svelte";
  import ForgotPassowrd from "./Pages/Signup/ForgotPassword.svelte";
  import MyTeam from "./Pages/UserManagement/MyTeam.svelte";
  import Auth from "./Pages/Signup/Auth.svelte";
  import FormStatus from "./Pages/Tournaments/FormStatus.svelte";
  import PlainLayoutWithHeader from "./Layouts/PlainLayoutWithHeader.svelte";
  import VendorApplicationChat from "./Pages/Vendor/VendorApplicationChat.svelte";
  import Login from "./Pages/Signup/Login.svelte";

  $: vendor = {statusCode:''};
  vendorStore.subscribe((value) => {
    vendor = value;
  });
</script>

<!-- <Route path="/">
  <LoginLayout>
    <Login />
  </LoginLayout>
</Route> -->

<!-- <Route path="/signup">
  <LoginLayout>
    <Signup />
  </LoginLayout>
</Route> -->

<!-- <Route path="/login">
  <LoginLayout>
    <Login />
  </LoginLayout>
</Route> -->

  <Route path="/dashboard">
    <MainLayout>
      <Dashboard />
    </MainLayout>
  </Route>
  <Route path="/calendar/*">
    <MainLayout>
      <Calendar />
    </MainLayout>
  </Route>
  <Route path="/esportsCalendar">
    <MainLayout>
      <EsportsCalendar />
    </MainLayout>
  </Route>
  <Route path="/tournaments/*">
    <MainLayout>
      <Tournaments />
    </MainLayout>
  </Route>

  <Route path="/reports">
    <MainLayout>
      <Reports />
    </MainLayout>
  </Route>
  <Route path="/vendorProfile/*">
    <MainLayout>
      <VendorProfile />
    </MainLayout>
  </Route>
  <Route path="/admin">
    <MainLayout>
      <AdminLandingPage />
    </MainLayout>
  </Route>
  <Route path="/users/*">
    <MainLayout>
      <MyTeam />
      <!-- <UserManagement /> -->
    </MainLayout>
  </Route>

  <Route path="/tournament/apply/:id" let:params>
    <MainLayout>
      <FormStatus {params} />
    </MainLayout>
  </Route>

<Route path="/login">
  <LoginLayout>
    <!-- <Auth /> -->
     <Login />
  </LoginLayout>
</Route>
<Route path="/">
  <LoginLayout>
    <!-- <Auth /> -->
    <Login />
  </LoginLayout>
</Route>

<Route path="/forgotpwd">
  <LoginLayout>
    <ForgotPassowrd />
  </LoginLayout>
</Route>

<Route path="/reset-password">
  <LoginLayout>
    <SetPassword />
  </LoginLayout>
</Route>
<Route path="/successPassword">
  <LoginLayout>
    <PasswordSuccess />
  </LoginLayout>
</Route>
<Route path="/set-password">
  <LoginLayout>
    <SetPassword />
  </LoginLayout>
</Route>

<Route path="/accountSuccess">
  <LoginLayout>
    <AccountSuccess />
  </LoginLayout>
</Route>
<Route path="/accountRegistred">
  <LoginLayout>
    <AccountRegistred />
  </LoginLayout>
</Route>

<Route path="/portals">
  <PlainLayout>
    <Portals />
  </PlainLayout>
</Route>

<Route path="/vendorStatus">
  <PlainLayoutWithHeader>
    <VendorStatus />
  </PlainLayoutWithHeader>
</Route>

<Route path="/vendor/*">
  <PlainLayout>
    <Vendor />
  </PlainLayout>
</Route>

<Route path="/vendorapplication/*">
  <PlainLayoutWithHeader>
    <VendorApplicationChat />
  </PlainLayoutWithHeader>
</Route>

<Route path="/profile">
  <PlainLayout>
    <Profile />
  </PlainLayout>
</Route>
<Route path="/updateprofile">
  <PlainLayout>
    <UpdateProfile />
  </PlainLayout>
</Route>

<Route path="/logout">
  <PlainLayout>
    <Logout />
  </PlainLayout>
</Route>
<Route path="/vendorPreview">
  <PlainLayout>
    <VendorPreview />
  </PlainLayout>
</Route>

<Route fallback>No page found</Route>
