<script>
  import { onMount } from "svelte";
  import Approved from "../../Components/StatusCards/Approved.svelte";
  import Rejected from "../../Components/StatusCards/Rejected.svelte";
  import UnderReview from "../../Components/StatusCards/UnderReview.svelte";
  import { vendorStore } from "../../Stores/VendorsStore";
  import VendorService from "../../Services/VendorService";

  let vendor = {};

  vendorStore.subscribe(value => {
    vendor = value;
  });
  // 0: Incomplete, 1: Complete, 2: Under Process, 3: Accepted, 4: Rejected
  onMount(()=>{
    VendorService.loadVendor();
  })
</script>

 
{#if vendor?.statusCode == 0}
  <UnderReview
    title="Your profile is incompleted"
    subTitle="Complete your vendor profile and submit for review"
  ></UnderReview>
{:else if vendor?.statusCode == 1}
  <UnderReview
    title="Your vendor application process was successfully completed"
    subTitle="Will send soon for review"
  />
{:else if vendor?.statusCode == 2}
  <UnderReview
    title="Your profile is under review"
    subTitle="You will be notified once your vendor profile has been approved"
  />
{:else if vendor?.statusCode == 3}
  <Approved
    title="Your profile has been approved"
    subTitle="Log-in to access the KIE platform for further steps"
    redirect={true}
    link="/calendar"
    linkText="Go to Calendar"
  />
{:else if vendor?.statusCode == 4}
  <Rejected
    title="Your profile has been rejected."
    subTitle="Your profile has been rejected by the Krafton India Esports team after review. Kindly reach out to our support team for further queries or try again after 30 days."
  />
{/if}
