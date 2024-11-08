<script>
  import { createEventDispatcher, onMount } from "svelte";
  import UploadBox from "./../../../Components/Form/UploadBox.svelte";
  import Input from "../../../Components/Form/Input.svelte";
  import Select from "../../../Components/Form/Select.svelte";
  import Textarea from "../../../Components/Form/Textarea.svelte";
  import { RESTClient } from "../../../Utils/RESTClient";
  import { validateTournamentName, validatePrizePool, validateDescription, validateDate, validateGameTitle, validateCountry, validateState, validateCity, validateAddress, validateTournamentLogo, validateTournamentBanner , validateChannelUrl, validatePlatformName, validateEndDate, validateUidAccountNumber, validateIgnAccountName } from "../../../Utils/tournamentValidations"
  import { tournamentLoading } from "../../../Stores/TournamentStore";
  export let tournament = {};

  loadCountry();
  tournamentLoading.subscribe((value) => {
    if (value === "false") {
      setTimeout(() => {
        loadCountry();
      }, 300)
    }
  })

  let countries = [];
  let states = [];
  let cities = [];

  let countryId = "";
  let stateId = "";
  let cityId = "";

  let error = { message: "" };
  let startDate = '';

  let validTournamentName = true;
  let validprizePool = true;
  let validDescription = true;
  let validGameTitle = true;
  let validignPrimaryAccount = true;
  let validuidPrimaryAccount = true;
  let validStartDate = true;
  let validEndDate = true;
  let validTournamentLogo = true;
  let validTournamentBanner = true;
  let validCountry = true;
  let validState = true;
  let validCity = true;
  let validAddress = true;

  let errors = [];

  function initializeErrors() {
    errors = tournament.location.platforms.map(() => ({
      validPlatformName: true,
      validChannelUrl: true,
      platformNameTouched: false,
      channelUrlTouched: false,
    }));
  }

  $: initializeErrors();

  $: {
    if (tournament.location.platforms.length !== errors.length) {
      initializeErrors();
    }
  }

  let tournamentNameError = "please enter a valid tournament name";
  let prizePoolError = "please enter valid prize pool";
  let descriptionError = "please enter valid description";
  let gameTitleError = "please enter valid game title";
  let ignPrimaryAccountError = "please enter valid IGN account name";
  let uidPrimaryAccountError = "please enter valid UID account number";
  let startDateError = "please enter valid date";
  let endDateError = "please enter valid date";
  let logoError = "please select valid logo";
  let bannerError = "please select valid banner";
  let countryError = "please select country";
  let stateError = "please select state";
  let cityError = "please select city";
  let addressError = "please enter valid address";

  let tournamentNameTouched = false;
  let prizePoolTouched = false;
  let descriptionTouched = false;
  let gameTitleTouched = false;
  let ignPrimaryAccountTouched = false;
  let uidPrimaryAccountTouched = false;
  let startDateTouched = false;
  let endDateTouched = false;
  let logoTouched = false;
  let bannerTouched = false;
  let countryTouched = false;
  let stateTouched = false;
  let cityTouched = false;
  let addressTouched = false;

  export let disabled = false;
  $: onlineValidation = tournament.location.online ? 
    tournament.location.platforms.some((t, index) =>
      !errors[index].validPlatformName ||
      !t.name ||
      !errors[index].validChannelUrl ||
      !t.url
    ) : false;

  $: disabled =
    !tournament.name ||
    !validTournamentName ||
    !tournament.prizePool ||
    !validprizePool ||
    !tournament.description ||
    !validDescription ||
    !tournament.gameTitle ||
    !validGameTitle ||
    !tournament.ignPrimaryAccount ||
    !validignPrimaryAccount ||
    !tournament.uidPrimaryAccount ||
    !validuidPrimaryAccount ||
    !tournament.tournamentDate.startDate ||
    !validStartDate ||
    !tournament.tournamentDate.endDate ||
    !validEndDate ||
    !tournament.logo ||
    !tournament.banner ||
    !validTournamentLogo ||
    !validTournamentBanner ||
    !validLocation ||
    onlineValidation   
 
  $: validLocation = tournament.location.offline ? 
      tournament.location.country &&
      validCountry &&
      tournament.location.state &&
      validState &&
      tournament.location.city &&
      validCity &&
      tournament.location.fullAddress &&
      validAddress : true;

  const nameValidation = (value) => {
    validTournamentName = tournamentNameTouched ? validateTournamentName(value) : true;
  };

  const prizePoolValidation = (value) => {
    validprizePool = prizePoolTouched ? validatePrizePool(value) : true;
  }
  const descriptionValidation = (value) => {
    validDescription = descriptionTouched ? validateDescription(value) : true;
  }
  const gameTitleValidation = (value) => {
    validGameTitle = gameTitleTouched ? validateGameTitle(value) : true
  }
  const ignAccountValidation = (value, isignAccount1 = true) => {
    if (isignAccount1) {
      validignPrimaryAccount = ignPrimaryAccountTouched ? validateIgnAccountName(value) : true;
    } else {
      validuidPrimaryAccount = uidPrimaryAccountTouched ? validateUidAccountNumber(value) : true;
    }
  };
  const startDateValidation = (value) => {
    validStartDate = startDateTouched
      ? validateDate(value)
      : true;
    if(tournament.tournamentDate.endDate != "") {
      validEndDate = validateEndDate(tournament.tournamentDate.endDate, value)
    }
  };
  const endDateValidation = (value, startDate) => {
    validEndDate = endDateTouched ? validateEndDate(value, startDate) : true;
    //console.log(validEndDate);
  }
  const logoValidation = (value) => {
    validTournamentLogo = logoTouched ? validateTournamentLogo(value) : true;
  };
  const bannerValidation = (value) => {
    validTournamentBanner = bannerTouched ? validateTournamentBanner(value) : true;
  };
  function platformNameValidation(index, value) {
    errors[index].platformNameTouched = true;
    errors[index].validPlatformName = value ? validatePlatformName(value) : false;
  }
  function channelUrlValidation(index, value) {
    errors[index].channelUrlTouched = true;
    errors[index].validChannelUrl = value ? validateChannelUrl(value) : false;
  }
  const countryValidation = (value) => {
    validCountry = countryTouched ? validateCountry(value) : true;
  };
  const stateValidation = (value) => {
    validState = stateTouched ? validateState(value) : true;
  };
  const cityValidation = (value) => {
    validCity = cityTouched ? validateCity(value) : true;
  };
  const addressValidation = (value) => {
    validAddress = addressTouched ? validateAddress(value) : true;
  }

  onMount(() => {
    // load countries

  });

  $: (tournament) => {
    if (tournament._id) {
      const rest = new RESTClient("tournament");
      rest
        .get(`/tournament/${tournament._id}`)
        .then((response) => {
          if (response.code) {
            error = response.message;
          } else if (response) {
            tournament = response;
          }
        })
    }
  }

  function handleOnlineChange(event) {
  const isChecked = event.target.checked;

  // Reset platform fields and validation
  function resetPlatforms() {
    tournament.location.platforms = [{ name: "", url: "" }];
    errors = tournament.location.platforms.map(() => ({
      validPlatformName: true,
      validChannelUrl: true,
      platformNameTouched: false,
      channelUrlTouched: false,
    }));
  }

  if (isChecked) {
    resetPlatforms();
  } else {
    // Set offline to true and reset platform validation when online is unchecked
    tournament.location.offline = true;
    tournament.location.platforms.forEach((_, index) => {
      errors[index] = {
        validPlatformName: true,
        validChannelUrl: true,
        platformNameTouched: false,
        channelUrlTouched: false,
      };
    });
    resetPlatforms();
  }
}

function handleOfflineChange(event) {
    if (event.target.checked) {
        // Reset offline-related fields
        tournament.location.country = "";
        tournament.location.state = "";
        tournament.location.city = "";
        tournament.location.fullAddress = "";
        tournament.location.countryId = "";
        tournament.location.stateId = "";
        tournament.location.cityId = "";

        // Clear related validation errors
        validCountry = true;
        validState = true;
        validCity = true;
        validAddress = true;
        countryTouched = false;
        stateTouched = false;
        cityTouched = false;
        addressTouched = false;

    } else {
        // Disable offline fields and clear errors
        validCountry = true; 
        validState = true;
        validCity = true;
        validAddress = true;

        // If online is checked, reset touched states
        if (tournament.location.online) {
            tournament.location.country = ""; 
            tournament.location.state = "";
            tournament.location.city = "";
            tournament.location.fullAddress = "";
        }
    }

    // Existing logic
    if (event.target.checked) {
        tournament.location.country = "";
        tournament.location.state = "";
        tournament.location.city = "";
        tournament.location.fullAddress = "";
        tournament.location.countryId = "";
        tournament.location.stateId = "";
        tournament.location.cityId = "";
    } else {  
        tournament.location.online = true;
    }
    if (!event.target.checked) {
        tournament.location.country = "";
        tournament.location.state = "";
        tournament.location.city = "";
        tournament.location.fullAddress = "";
        tournament.location.countryId = "";
        tournament.location.stateId = "";
        tournament.location.cityId = "";
    }
}


  function countryUpdated(event) {
    if (event.detail) {
      tournament.location.country = event.detail.name;
      tournament.location.stateId = "";
      tournament.location.cityId = "";
      loadState(event.detail.id);
    }
  }

  function stateUpdated(event) {
    if (event.detail) {
      tournament.location.state = event.detail.name;

      tournament.location.cityId = "";
      loadCity(event.detail.id);
    }
  }

  function cityUpdated(event) {
    if (event.detail) {
      tournament.location.city = event.detail.name;
     // console.log(event.detail);
    }
  }

  function loadCountry() {
    // load countries
    const rest = new RESTClient("general");
    rest
      .get("/countries")
      .then((response) => {
        if (response.code) {
          error = response.message;
        } else if (response) {
          countries = response;
          if (tournament.location.countryId) {
            countryId = tournament.location.countryId;
            loadState(countryId);
          }
        }
      })
      .catch((error) => {
        console.error("error :", error.message);
      });
  }

  function loadState(countryId) {
    // load states
    const rest = new RESTClient("general");
    rest.get(`/states/${countryId}`).then((response) => {
      if (response.code) {
        error = response.message;
      } else if (response) {
        states = response;
        if (tournament.location.stateId) {
          loadCity(tournament.location.stateId);
        }
      }
    });
  }

  function loadCity(stateId) {
    // load cities
    const rest = new RESTClient("general");
    rest.get(`/cities/${stateId}`).then((response) => {
      if (response.code) {
        error = response.message;
      } else if (response) {
        cities = response;
      }
    });
  }

  function addPlatform() {
    tournament.location.platforms = [
      ...tournament.location.platforms,
      { name: "", url: "" }, // Adding a new platform with default values
    ];
    errors = [
      ...errors,
      {
        validPlatformName: true,
        validChannelUrl: true,
        platformNameTouched: false,
        channelUrlTouched: false,
      },
    ];
  }

  function removePlatform(index) {
    if (tournament.location.platforms.length > 1) {
      tournament.location.platforms.splice(index, 1);
      errors = errors.filter((_, i) => i !== index);
      tournament = { ...tournament };
    }
    else {
      alert("Atleast one platform should present")
    }
  }
</script>

<div class="px-4 py-6 sm:p-8 space-y-6 bg-white">
  <div class="w-full border-b flex flex-col mb-2">
    <p class="font-normal text-xl">Tournament Details</p>
    <span class="font-light text-sm text-gray-400 mb-2">We would like to know you more</span>
  </div>
  <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <Input type="text" label="Name of the Tournament" bind:value={tournament.name}
        placeholder="Name of the Tournament" error={!validTournamentName} errorMessage={tournamentNameError}
        on:blur={()=>{
      tournamentNameTouched=true;
      nameValidation(tournament.name);
      }}
      />
    </div>
    <div class="sm:col-span-3">
      <Input type="number" label="Prize pool" bind:value={tournament.prizePool} placeholder="" showErrorIcon={false}
        error={!validprizePool} errorMessage={prizePoolError} on:blur={()=>{
      prizePoolTouched=true;
      prizePoolValidation(tournament.prizePool);
      }}
      />
    </div>
    <div class="sm:col-span-full">
      <Textarea label="Tournament description" bind:value={tournament.description} placeholder="250 characters only"
        error={!validDescription} errorMessage={descriptionError} on:blur={()=>{
          descriptionTouched=true;
          descriptionValidation(tournament.description);
        }}
      />
    </div>
    <div class="sm:col-span-3">
      <Input
        type="text"
        label="Game title"
        bind:value={tournament.gameTitle}
        placeholder="Name of the game"
        error={!validGameTitle} 
        errorMessage={gameTitleError} 
        on:blur={()=>{
          gameTitleTouched=true;
          gameTitleValidation(tournament.gameTitle);
        }}
      />
    </div>
    <div class="sm:col-span-3">
      <Input
        type="text"
        label="IGN of primary account"
        bind:value={tournament.ignPrimaryAccount}
        placeholder=""
        error={!validignPrimaryAccount} 
        errorMessage={ignPrimaryAccountError} 
        on:input={(e) => {
          tournament.ignPrimaryAccount = e.target.value.replace(/\s/g, '');
        }}        
        on:blur={()=>{
          ignPrimaryAccountTouched=true;
          ignAccountValidation(tournament.ignPrimaryAccount)
        }}
      />
    </div>
    <div class="sm:col-span-3">
      <Input
        type="text"
        label="UID of primary account"
        bind:value={tournament.uidPrimaryAccount}
        placeholder=""
        error={!validuidPrimaryAccount} 
        errorMessage={uidPrimaryAccountError}
        on:input={(e) => {
          tournament.uidPrimaryAccount = e.target.value.replace(/\D/g, '');
        }} 
        on:blur={()=>{
          uidPrimaryAccountTouched=true;
          ignAccountValidation(tournament.uidPrimaryAccount, false)
          }}
      />
    </div>
  </div>
  <div>
    <p class="block text-sm font-medium text-gray-600 mb-2">
      Select tournament date
    </p>
    <div
      class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6 bg-gray-50 rounded p-4"
    >
      <div class="sm:col-span-3">
        <Input
          type="date"
          label="Start date"
          bind:value={tournament.tournamentDate.startDate}
          error = {!validStartDate}
          errorMessage={startDateError}
          on:blur={() => {
            startDateTouched = true;
            startDate = tournament.tournamentDate.startDate;
            startDateValidation(
              tournament.tournamentDate.startDate
            );
          }}
        />
      </div>
      <div class="sm:col-span-3">
        <Input
          type="date"
          label="End date"
          bind:value={tournament.tournamentDate.endDate}
          error = {!validEndDate} 
          errorMessage={endDateError}
          on:blur={() => {
            endDateTouched = true;
            endDateValidation(
              tournament.tournamentDate.endDate,
              tournament.tournamentDate.startDate
            );
          }}
        />
      </div>
    </div>
  </div>
  <div
    class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6 bg-gray-50 rounded p-4"
  >
    <div class="sm:col-span-6">
      <UploadBox
          label="Upload tournament logo"
          fileName="Upload document"
          helpText="Only JPG, JPEG or PNG Only"
          bind:uploadUrl={tournament.logo}
          accept="image/png, image/jpg, image/jpeg"
           on:fileSelected={(event) => {
            logoTouched = true;
            logoValidation(event.detail.file);}
          }
          error={!validTournamentLogo}
          errorMessage={logoError}
        />
    </div>
  </div>
  <div
    class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6 bg-gray-50 rounded p-4"
  >
    <div class="sm:col-span-6">
      <UploadBox
          label="Upload tournament banner"
          fileName="Upload document"
          helpText="Only JPG, JPEG or PNG Only"
          bind:uploadUrl={tournament.banner}
          accept="image/png, image/jpg, image/jpeg"
           on:fileSelected={(event) => {
            bannerTouched = true;
            bannerValidation(event.detail.file);}
          }
          error={!validTournamentBanner}
          errorMessage={bannerError}
        />
    </div>
  </div>

  <div>
    <div>
      <p class="block text-sm font-medium text-gray-600 mb-2">  
        Tournament location
      </p>
      <div class="p-4 flex gap-3 items-center w-40">
        <input
          id="online"
          aria-describedby="online-description"
          bind:checked={tournament.location.online}
          on:change={handleOnlineChange}
          name="online"
          type="checkbox"
          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        /> Online
      </div>
    </div>
    <div class="bg-gray-50 rounded p-4">
      {#each tournament.location.platforms as platform, index}
        <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-7 mb-3">
          <div class="sm:col-span-3">
            <Input
              type="text"
              disabled={!tournament.location.online}
              label="Platform name"
              bind:value={platform.name}
              error={errors[index].platformNameTouched &&
                !errors[index].validPlatformName}
              errorMessage={platform.name
                ? "Platform name is invalid"
                : "Platform name is required"}
              on:blur={() => platformNameValidation(index, platform.name)}
            />
          </div>
          <div class="sm:col-span-3">
            <Input type="text" label="Channel URL"
            disabled={!tournament.location.online}
             bind:value={platform.url}
              error={errors[index].channelUrlTouched&&
              !errors[index].validChannelUrl}
              errorMessage={platform.url
              ? "Channel Url is invalid"
              : "Channel Url is required"}
              placeholder="https://www.youtube.com/channel"
            on:blur={() => channelUrlValidation(index, platform.url)} 
            />
          </div>
          <div class="sm:col-span-1 flex items-center justify-end">
            {#if index > 0}
            <button class="remove-button" on:click|preventDefault={() => removePlatform(index)}
              disabled={!tournament.location.online}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z"/>
                </svg>
            </button>
            {/if}
          </div>
        </div>
      {/each}
      <button
        on:click|preventDefault={addPlatform}
        class="flex items-center gap-2 mt-4 font-sans text-xs font-bold text-center text-blue-600 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none"
        type="button"
        disabled={!tournament.location.online}

      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M10 7.5V10M10 10V12.5M10 10H12.5M10 10H7.5M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
            stroke="#2563EB"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Add more
      </button>
    </div>
  </div>
  <div>
    <div>
      <div class="r rounded p-4 flex gap-3 items-center w-40">
        <input
          id="offline"
          aria-describedby="offline-description"
          name="offline"
          type="checkbox"
          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          bind:checked={tournament.location.offline}
          on:change={handleOfflineChange}

        /> 
    
        Offline
      </div> 
    </div>
    <!-- {#if tournament.location.offline} -->
    <div class="bg-gray-50 rounded p-4">
      <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
        <div class="sm:col-span-2">
          <Select
            labelKey="name"
            valueKey="id"
            options={countries}
            label="Country"
            disabled={!tournament.location.offline}
            on:change={countryUpdated}
            placeholder="Select Country"
            bind:value={tournament.location.countryId}
            error={!validCountry}
            errorMessage={countryError}
            on:blur={() => {
              countryTouched = true;
              countryValidation(tournament.location.countryId);
            }}
          />
        </div>
        <div class="sm:col-span-2">
          <Select
            labelKey="name"
            valueKey="id"
            options={states}
            disabled={!tournament.location.offline}
            label="State"
            on:change={stateUpdated}
            placeholder="Select State"
            bind:value={tournament.location.stateId}
            error={!validState}
            errorMessage={stateError}
            on:blur={() => {
              stateTouched = true;
              stateValidation(tournament.location.stateId);
            }}
          />
        </div>
        <div class="sm:col-span-2">
          <Select
            labelKey="name"
            valueKey="id"
            options={cities}
            label="City"
            on:change={cityUpdated}
            disabled={!tournament.location.offline}
            placeholder="Select City"
            bind:value={tournament.location.cityId}
            error={!validCity}
            errorMessage={cityError}
            on:blur={() => {
            cityTouched = true;
            cityValidation(tournament.location.cityId);
            }}
          />
        </div>
        <div class="sm:col-span-full">
          <Textarea
            label="Full address"
            bind:value={tournament.location.fullAddress}
            placeholder="250 characters only"
            disabled={!tournament.location.offline}
            error={!validAddress} 
            errorMessage={addressError} 
            on:blur={()=>{
              addressTouched=true;
              addressValidation(tournament.location.fullAddress);
            }}
          />
        </div>
      </div>
    </div>
    <!-- {/if} -->
  </div>
  
</div>