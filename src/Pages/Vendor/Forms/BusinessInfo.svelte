<script>
  import Input from "../../../Components/Form/Input.svelte";
  import UploadBox from "../../../Components/Form/UploadBox.svelte";
  import {
    validatePrizePool,
    validateReportCertificate,
    validateTournamentName,
  } from "../../../Utils/vendorValidations";

  export let preview;
  export let vendor = { tournaments: [] };

  let errors = vendor.tournaments.map(() => ({
    validTournamentName: true,
    validPrizePool: true,
    validReportCertificate: true,
    tournamentNameTouched: false,
    prizePoolTouched: false,
    reportCertificateTouched: false,
  }));

  export let disabled = true;

  $: disabled = vendor.tournaments.some(
    (t, index) =>
      !errors[index].validTournamentName ||
      !t.tournamentName ||
      !errors[index].validPrizePool ||
      !t.prizePool ||
      !errors[index].validReportCertificate ||
      !t.reportCertificate
  );

  function addTournament() {
    vendor.tournaments = [
      ...vendor.tournaments,
      {
        tournamentName: "",
        prizePool: "0",
        reportCertificate: "",
      },
    ];
    errors = [
      ...errors,
      {
        validTournamentName: true,
        validPrizePool: true,
        validReportCertificate: true,
        tournamentNameTouched: false,
        prizePoolTouched: false,
        reportCertificateTouched: false,
      },
    ];
  }

  function tournamentNameValidation(index, value) {
    errors[index].tournamentNameTouched = true;
    errors[index].validTournamentName = value
      ? validateTournamentName(value)
      : false;
  }

  function prizePoolValidation(index, value) {
    errors[index].prizePoolTouched = true;
    errors[index].validPrizePool = value ? validatePrizePool(value) : false;
  }

  function reportCertificateValidation(index, value) {
    errors[index].reportCertificateTouched = true;
    errors[index].validReportCertificate = value
      ? validateReportCertificate(value)
      : false;
  }

  function removeTournament(index) {
    vendor.tournaments.splice(index, 1);
    vendor.tournaments = [...vendor.tournaments];
    errors.splice(index, 1);
  }

  function handleInput(e, property) {
    const target = e.target;
    const value = parseInt(target.value);
    if (value < 0 || isNaN(value)) {
      vendor[property] = 0;
    } else {
      vendor[property] = value;     
    }
  }

</script>

<div class="px-4 py-6 sm:p-8 space-y-6 bg-white">
  <div class="w-full border-b flex flex-col mb-2">
    <p class=" font-normal text-xl">Business Details</p>
    <span class=" font-light text-sm text-gray-400 mb-2">
      This section collects key operational details and history of the company.
    </span>
  </div>
  <div>
    <p class="block text-sm font-medium text-gray-600">Staffing & resources</p>
    <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-12">
      <div class="sm:col-span-2">
        <Input {preview} type="number" bind:value={vendor.operationalStaffCount} label="Operations staff" on:input={e => handleInput(e, 'operationalStaffCount')}/>
      </div>
      <div class="sm:col-span-2">
        <Input {preview} type="number" bind:value={vendor.contentStaffCount} label="Content staff" on:input={e => handleInput(e, 'contentStaffCount')}/>
      </div>
      <div class="sm:col-span-2">
        <Input {preview} type="number" bind:value={vendor.designStaffCount} label="Design staff" on:input={e => handleInput(e, 'designStaffCount')}/>
      </div>
      <div class="sm:col-span-2">
        <Input {preview} type="number" bind:value={vendor.productionStaffCount} label="Production staff" on:input={e => handleInput(e, 'productionStaffCount')}/>
      </div>
      <div class="sm:col-span-2">
        <Input {preview} type="number" bind:value={vendor.otherStaffCount} label="Others" on:input={e => handleInput(e, 'otherStaffCount')}/>
      </div>
    </div>
  </div>
  <hr class="h-px my-8 bg-gray-100 border-0" />
  <div>
    <p class="block text-sm font-medium text-gray-600 mb-2">
      Total tournaments organised
    </p>
    <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6 bg-gray-50 rounded p-4">
      <div class="sm:col-span-2">
        <p class="block text-sm font-medium text-gray-600 mb-1">Tier 1</p>
        <Input {preview} type="number" bind:value={vendor.categoryA} label="(Prize Pool Above INR 50 Lakhs)" on:input={e => handleInput(e, 'categoryA')}/>
      </div>
      <div class="sm:col-span-2">
        <p class="block text-sm font-medium text-gray-600 mb-1">Tier 2</p>
        <Input {preview} type="number" bind:value={vendor.categoryB} label="(Prize Pool Above INR 5 Lakhs)" on:input={e => handleInput(e, 'categoryB')}/>
      </div>
      <div class="sm:col-span-2">
        <p class="block text-sm font-medium text-gray-600 mb-1">Tier 3</p>
        <Input {preview} type="number" bind:value={vendor.categoryC} label="(Prize Pool Less than INR 5lakhs)" on:input={e => handleInput(e, 'categoryC')}/>
      </div>
    </div>
  </div>
  <div class="previous-tournament-block">
    <p class=" font-normal text-lg">Past tournaments</p>
    <span class=" font-light text-sm text-gray-400 mb-3">
      This section collects details for previously organised tournaments.
    </span>
    {#each vendor.tournaments as tournament, index}
    <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6 bg-gray-50 rounded p-4 relative mt-2">
      <button on:click|preventDefault={()=> removeTournament(index)} type="button"
        class="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
        &times;
      </button>
      <div class="sm:col-span-3">
        <Input {preview} type="text" bind:value={tournament.tournamentName} error={errors[index].tournamentNameTouched
          && !errors[index].validTournamentName} errorMessage={tournament.tournamentName ? "Tournament name is invalid"
          : "Tournament name is required" } label="Tournament name" on:blur={()=>
        tournamentNameValidation(index, tournament.tournamentName)}
        />
      </div>
      <div class="sm:col-span-3">
        <Input {preview} type="number" bind:value={tournament.prizePool} error={errors[index].prizePoolTouched &&
          !errors[index].validPrizePool} errorMessage={tournament.prizePool ? "Prize pool amount is invalid"
          : "Prize pool is required" } label="Prize pool (in INR)" on:blur={()=> prizePoolValidation(index,
        tournament.prizePool)}
        showErrorIcon={false}
        />
      </div>
      <div class="sm:col-span-full">
        <UploadBox bind:uploadUrl={tournament.reportCertificate}
          accept="image/png, image/jpg, image/jpeg, application/pdf" label="Upload tournament report"
          helpText="PDF, JPG or JPEG only" maxFileSize="10mb" useTooltip={true}
          error={!errors[index].validReportCertificate} errorMessage="Report certificate is invalid"
          on:fileSelected={(event)=> reportCertificateValidation(index, event.detail.file)}
          />
      </div>
    </div>
    {#if !preview}
    <hr class="h-px my-8 bg-gray-100 border-0" />
    {/if}
    {/each}
    {#if !preview}
    <div class="flex items-center w-full">
      <span class="flex-grow bg-gray-200 rounded h-0.5"></span>
      <button on:click|preventDefault={addTournament} type="button"
        class="flex items-center justify-between rounded-full border border-gray-100 py-1 px-3 text-sm text-gray-600">
        <svg class="mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 4V8M8 8V12M8 8H12M8 8L4 8" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
        Add tournament
      </button>
      <span class="flex-grow bg-gray-200 rounded h-0.5"></span>
    </div>
    {/if}
  </div>
</div>