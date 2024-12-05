<script>
	import PrizepoolKIT from './components/PrizepoolKIT.svelte';
	import InfoSectionKIT from './components/InfoSectionKIT.svelte';
  import BannerSectionKIT from './components/BannerSectionKIT.svelte';
  import LeaderBoardKit from './Components/LeaderBoardKIT.svelte';
  import OverviewKit from './components/OverviewKIT.svelte';
  import SectionKit from './components/SectionKIT.svelte';
  import RegisterNowKIT from './Components/RegisterNowKIT.svelte';
  import FileUploadModal from './Components/FileUploadModal.svelte';

  let isUploadModalOpen = false;
  let isUploadModalOpen2 = false;

  function openUploadModal() {
    isUploadModalOpen = true;
  }

</script>
<div class=" bg-Charcoal/900">
  <button 
    on:click={openUploadModal}
    class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-"
  >
    Open Upload Modal
  </button>
  <FileUploadModal bind:isOpen={isUploadModalOpen} />
  <BannerSectionKIT />  
  <InfoSectionKIT />
  <PrizepoolKIT />
  <RegisterNowKIT />
</div>





  
