<script>
  import { Steps, StepsLayout } from "./TournamentStepper/index";
  import { onMount } from "svelte/internal";
  import AuthService from "./../../Services/AuthService";
  import { RESTClient } from "../../Utils/RESTClient";
  import { Route, router } from "tinro";
  import PlainNavbar from "../../Components/PlainNavbar.svelte";
  import { vendorStore } from "../../Stores/VendorsStore";
  import FormFooter from "../../Components/FormFooter.svelte";
  import TournamentDetails from "./Forms/TournamentDetails.svelte";
  import TournamentSchedule from "./Forms/TournamentSchedule.svelte";
  import FinancialDetails from "./Forms/FinancialDetails.svelte";
  import ContactDetails from "./Forms/ContactDetails.svelte";
    import Toast from "../../Services/ToastService";
  import { tournamentLoading } from "../../Stores/TournamentStore";
  const meta = router.meta();
  const rest = new RESTClient("tournament");
  export let params = {};

  let steps = [
      "tournament-details",
      "tournament-schedule",
      "financial-details",
      "contact-information",
    ],
    currentActive = 0,
    progressBar;

  let tournament = {
    name: "",
    prizePool: 0,
    description: "",
    gameTitle: "",
    ignPrimaryAccount: "",
    uidPrimaryAccount: "",
    tournamentDate: {
      startDate: "",
      endDate: "",
    },
    logo: "",
    banner: "",
    location: {
      platforms: [{ name: "", url: "" }],
      online: true,
      offline:true,
      country: "",
      state: "",
      city: "",
      fullAddress: "",
    },
    schedule: {
      totalGames: 0,
      tournamentType: "",
      totalTeams: 0,
      rounds: [
        {
          roundTitle: "",
          roundNumber: 1,
          roundFormat: "",
          days: [
            {
              day: 1,
              // date: "",
              startDate:"",
              endDate:"",
              startTime: "",
              endTime: "",
              liveStreaming: false,
              matchesPerDay: 1,
            },
          ],
        },
      ],
    },
    financialDetails: {
      prizeDivision: [{ position: 0, totalPrize: 0 }],
      specialPrize: [{ description: "", prize: 0 }],
      sponsorNotApplicable: false,
      sponsors: [
        {
          name: "",
          category: "",
          contribution: "",
          websiteURL: "",
          socialMediaURL1: "",
          socialMediaURL2: "",
        },
      ],
    },
    contactInformation: {
      firstName: "",
      lastName: "",
      companyName: "",
      designation: "",
      email: "",
      phoneNumber: "",
      companyBio: "",
    },
    status: "",
    termsAndConditions: false,
  };

  function getTournament(currentPage,tournament) {
    switch (currentPage) {
      case "tournament-details":
        let temp_platforms = tournament.location.platforms.map((platform) => {
          return { name: platform.name, url: platform.url };
        });
        let location = { ...tournament.location, platforms: temp_platforms };
        return {
          name: tournament.name,
          prizePool: tournament.prizePool,
          description: tournament.description,
          gameTitle: tournament.gameTitle,
          ignPrimaryAccount: tournament.ignPrimaryAccount,
          uidPrimaryAccount: tournament.uidPrimaryAccount,
          tournamentDate: tournament.tournamentDate,
          logo: tournament.logo,
          banner: tournament.banner,
          location: location,
          status: "tournament-details",
        };
      case "tournament-schedule":
        return {
          schedule: tournament.schedule,
          status: "tournament-schedule",
        };
      case "financial-details":
        return {
          financialDetails: {...tournament.financialDetails},
          status: "financial-details",
          prizePool: tournament.prizePool,
        };
      case "contact-information":
        return {
          contactInformation: tournament.contactInformation,
          status: "contact-information",
        };
      default:
        return { ...tournament };
    }
  }

  let error = { message: "" };
  export let disabled = true;
  $: {
    const query = $meta.query;
    if(query.section) {
      if (query.edit === "true") {
        disabled = false;
      } else {
        disabled = true;
      }
    }
  }

  export let active_step;
  $: active_step = steps[currentActive];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleProgress = (stepIncrement) => {
    progressBar.handleProgress(stepIncrement);
  };

  function saveTournament() {
    AuthService.getUser().userId;
    let currentPage = steps[currentActive];
    let _tournament = getTournament(currentPage,tournament);
    // set tournament status to applied if it is applied , rejected or accepted
    if(tournament.status === "applied" || tournament.status === "rejected" || tournament.status === "accepted"){
      _tournament.status = "applied";
    }


    if(tournament._id){
        rest
          .put(`/${currentPage}/${tournament._id}`,{..._tournament,status:steps.includes(tournament.status)?(steps.indexOf(_tournament.status)<=steps.indexOf(tournament.status)?tournament.status:_tournament.status):_tournament.status})
          .then((response)=>{
            if(!response.message){
              if($meta.query.section && $meta.query.edit === "true") {
                router.goto(`/tournaments/details/${response._id}/${$meta.query.section}`)
              } else {
                let tempTournament = getTournament(currentPage,response)
                tournament = {...tournament,...tempTournament}
                handleProgress(1);
              }
            } else {
              error = response
            }
            disabled = true;
          })
          .catch((_error) => {
            error = _error
          })
      }
      else{
        rest
        .post(`/${currentPage}`, _tournament)
        .then((res_tournament) => {
          //console.log(res_tournament)
          if(!res_tournament.message){
            tournament = {...tournament,_id:res_tournament._id,vendor:res_tournament.vendor,status:res_tournament.status}
            handleProgress(1);
          } else {
            error = res_tournament
          }
        })
        .catch((_error) => {
          error = _error;
        });
        
      } 

    // //this is for edit functionality routing
    // if(Object.keys($meta.query).length > 0) {
    //     router.goto('/tournaments/details/'+$meta.query.id+'/'+$meta.query.section);
    //   }
  }

  function handleDates(response){
    if(tournament.tournamentDate.startDate != ""){
      setTimeout(() => {
        tournament.tournamentDate.startDate = new Date(response.tournamentDate.startDate).toISOString().split('T')[0];
        tournament.tournamentDate.endDate = new Date(response.tournamentDate.endDate).toISOString().split('T')[0];
      },500)
    }
    if(tournament.schedule.rounds[0].days[0].startDate != "") {
      response.schedule.rounds.forEach((round , roundIndex) => {
        round.days.forEach((day , dayIndex) => {
          tournament.schedule.rounds[roundIndex].days[dayIndex].startDate = day.startDate.split('T')[0];
        }) 
      })
    }
    if(tournament.schedule.rounds[0].days[0].endDate != "") {
      response.schedule.rounds.forEach((round , roundIndex) => {
        round.days.forEach((day , dayIndex) => {
          tournament.schedule.rounds[roundIndex].days[dayIndex].endDate = day.endDate.split('T')[0];
        }) 
      })
    }
  }

  function loadTournament(id){
    rest
        .get(`/tournament/${id}`)
        .then((response) => {
          //console.log(response)
          //if(["accepted","rejected","completed","active"].includes(response.status)){
         //   router.goto(`/tournaments/details/${id}/${$meta.query.section}`);
          //}
         // else {
            if(!response.message){
              let temp = {...response}
              if(response.location.platforms.length === 0){
                temp.location.platforms = tournament.location.platforms;
              }
              if(response.schedule.rounds.length === 0){
                temp.schedule.rounds = tournament.schedule.rounds;
              }
              if(response.financialDetails.prizeDivision.length === 0){
                temp.financialDetails.prizeDivision = tournament.financialDetails.prizeDivision;
              }
              if(response.financialDetails.sponsors.length === 0){
                temp.financialDetails.sponsors = tournament.financialDetails.sponsors;
              }
              if(Object.keys($meta.query).length === 0) {
                currentActive = steps.indexOf(response.status);
                if(response.status != "contact-information"){
                  currentActive++
                }
              }
              if(!response.contactInformation){
                temp.contactInformation = {
                  firstName: "",
                  lastName: "",
                  companyName: "",
                  designation: "",
                  email: "",
                  phoneNumber: "",
                  companyBio: "",
                }
              }
              // if(temp.location.online===false){
              //   temp.location.platforms=[]
              // }

              if(temp.financialDetails.sponsorNotApplicable===true){
                temp.financialDetails.sponsors=[]
              }
              tournament = {...temp};
              handleDates(response);
              tournamentLoading.update((value) => {
                return "false"
              })
            } else {
              Toast.error("we are having some technical issue")
              setTimeout(() => {
                router.goto("/tournaments")
              })
            }
         // }
        })
  }

  onMount(() => {

    if (Object.keys($meta.query).length > 0) {
      loadTournament($meta.query.id)
      currentActive = Number($meta.query.selectedTab);
    } else if(params.id) {
     // console.log('continue')
      if(params.id.length===24){
        loadTournament(params.id)
      } else {
        router.goto("/tournament-application")
      }
    }
  });
  //$: console.log($meta.query.section);
</script>

<div class="pb-4 bg-gray-50">
  {#if Object.keys($meta.query).length > 0}
    <nav class="flex" aria-label="Breadcrumb">
      <ol role="list" class="flex items-center space-x-4 py-1">
        <li>
          <div class="flex items-center">
            <a
              href="/tournaments/all"
              class="ml-4 text-sm font-medium text-gray-700 hover:text-gray-700"
              >Tournament applications</a
            >
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <a
              href="/tournaments/details/{$meta.query.id}/{$meta.query.section}"
              class="ml-4 text-sm font-medium text-gray-700 hover:text-gray-700"
              >Tournament details</a
            >
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <svg
              class="h-5 w-5 flex-shrink-0 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
            <a
              href="#"
              class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              aria-current="page">Edit application form</a
            >
          </div>
        </li>
      </ol>
    </nav>
  {/if}
  <div
    class="w-full border border-x-0 bg-white flex justify-between items-center"
  >
    <p class=" font-semibold py-4 text-xl px-4 sm:px-6 lg:px-8 capitalize">
      Tournament application form
    </p>
  </div>
  <div class="w-full border-b bg-gray-50">
    <StepsLayout>
      <Steps {steps} bind:currentActive bind:this={progressBar} />
    </StepsLayout>
  </div>

  <div
    class="mx-auto px-4 sm:px-6 lg:px-8 mt-8 overflow-y-scroll h-[calc(100vh-280px)]"
  >
    <form on:submit={handleSubmit}>
      {#if active_step == "tournament-details"}
        <div class="mx-auto rounded-t-lg shadow-xl overflow-hidden">
          <TournamentDetails bind:tournament={tournament} bind:disabled/>
        </div>
      {:else if active_step == "tournament-schedule"}
        <div class="mx-auto rounded-t-lg shadow-xl overflow-hidden">
          <TournamentSchedule bind:tournament={tournament} bind:disabled/>
        </div>
      {:else if active_step == "financial-details"}
        <div class="mx-auto rounded-t-lg shadow-xl overflow-hidden">
          <FinancialDetails bind:tournament={tournament} bind:disabled/>
        </div>
      {:else if active_step == "contact-information"}
        <div class="mx-auto rounded-t-lg shadow-xl overflow-hidden">
          <ContactDetails bind:tournament={tournament} bind:disabled/>
        </div>
      {/if}
      {#if steps[currentActive] != "contact-information"}
        <div
          class="flex mx-auto rounded-b-lg shadow-xl overflow-hidden items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 bg-gray-100"
        >
          <button
            class="text-sm font-semibold leading-6 text-gray-900 border-gray-300 px-3 py-1.5 rounded-md bg-white"
            on:click={()=>router.goto('/tournaments/')}
           type="button"
            >Cancel</button
          >
          <button
            on:click={() => saveTournament()}
            type="button"
            {disabled}
            class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >{tournament.status === "accepted" || tournament.status === "rejected"?"Submit Changes for Review":"Save & proceed"}
            </button
          >
        </div>
      {/if}
    </form>
  </div>
</div>
