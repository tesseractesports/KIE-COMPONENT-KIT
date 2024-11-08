<script>
    import { onMount } from 'svelte';
    import { Route, router } from "tinro";
    import Comments from '../../Components/Comments.svelte';
    import NavTab from '../../Components/NavTabs/NavTab.svelte';
    import TabLink from '../../Components/NavTabs/TabLink.svelte';
    import VendorChat from '../Vendor/VendorChat.svelte';
    import Can from '../../Utils/Can.svelte';
    import { Tasks } from 'kie-tmp-config';
    import WebsiteDesignInputForm from './WebsiteDesignInputForm.svelte';
    const meta = router.meta(); 
    export let id;
    export let tournaments = [];
    let routePath = "/tournaments/details/"
    let tournament;
    let activeTab = "online"; // Set the initial active tab
    const handleTabClick = (tab) => {
        activeTab = tab;
    };
    const steps = [
      "tournament-details",
      "tournament-schedule",
      "financial-details",
      "contact-information",
    ]

    const notAccepted = [
        ...steps,
        "applied",
        "accepted",
        "rejected"
    ]

    onMount(() => {
      tournament = tournaments.find(t => t._id == id);
    });

  </script>
  
    {#if tournament}
        <div class="bg-gray-50">
            <nav class="flex" aria-label="Breadcrumb">
                <ol role="list" class="flex items-center space-x-4 py-1">
                  <li>
                    <div class="flex items-center">
                      <a href="/tournaments" class="ml-4 text-sm font-medium text-gray-700 hover:text-gray-700">Tournament applications</a>
                    </div>
                  </li>
                  <li>
                    <div class="flex items-center">
                      <svg class="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                      </svg>
                      <a href="#" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700" aria-current="page">{tournament.name}</a>
                    </div>
                  </li>
                </ol>
              </nav>
              
            <div class="w-full border border-x-0 bg-white flex px-4 sm:px-6 lg:px-8 justify-between items-center">
                <p class=" font-semibold py-4 text-xl capitalize">{tournament.name}</p>
                <div>
                    <button disabled class=" flex py-1 px-4 items-center gap-1 border rounded-md text-sm font-medium {tournament.status === "accepted" ? "border-green-600 text-green-500 bg-green-50" : tournament.status === "rejected" ? "text-red-500 border-red-500 bg-red-50" : "text-gray-500 border-gray-500 bg-gray-50"}">
                        <span class="material-symbols-outlined">{tournament.status === "accepted" ? "check" : "close"}</span>
                        {tournament.status}
                    </button>
                </div>
            </div>
            <div class="grid grid-cols-1 gap-x-4 px-4 sm:px-6 lg:px-8 gap-y-5 md:grid-cols-6 overflow-hidden">
                <div class=" md:col-span-4 space-y-5 overflow-y-scroll h-[calc(100vh-160px)]">
                    <div class="">
                        <div class="sm:flex sm:items-center">
                            <div class="sm:flex-auto">
                                <NavTab>
                                    <TabLink Count="" link="{routePath}{id}/tournament-details">Tournament details</TabLink>
                                    <TabLink Count="" link="{routePath}{id}/tournament-schedule">Tournament schedule</TabLink>
                                    <TabLink Count="" link="{routePath}{id}/financial-details">Financial details</TabLink>
                                    <TabLink Count="" link="{routePath}{id}/contact-information">Contact details</TabLink>
                                    {#if tournament.status === "accepted"}
                                        <TabLink Count="" link="{routePath}{id}/designPage">Design Website</TabLink>
                                    {/if}
                                    <!-- <TabLink Count="" link="{routePath}{id}/reports">Reports</TabLink>
                                    <TabLink Count="" link="{routePath}{id}/activity">Activity</TabLink> -->
                                </NavTab>
                            </div>
                        </div>
                        <div class="py-4">
                            <Route path="/" redirect="{routePath}{$meta.params.id}/tournament-details" let:meta />
                            {#if $meta.url == routePath+$meta.params.id+'/tournament-details'}
                                <div class=" shadow rounded-xl overflow-hidden">
                                    <div class="px-4 py-6 sm:p-8 space-y-6 bg-white ">
                                        <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
                                            <div class="sm:col-span-3">
                                                <p class="block text-sm font-medium leading-6 text-gray-900">Name of the tournament</p>
                                                <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                    {tournament.name}
                                                </p>
                                            </div>
                                            <div class="sm:col-span-3">
                                                <p class="block text-sm font-medium leading-6 text-gray-900">Prize pool</p>
                                                <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">{tournament.prizePool}</p>
                                            </div>
                                            <div class="sm:col-span-full">
                                                <p class="block text-sm font-medium leading-6 text-gray-900">Tournament description</p>
                                                <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                    {tournament.description}
                                                </p>
                                            </div>
                                            <div class="sm:col-span-3">
                                                <p class="block text-sm font-medium leading-6 text-gray-900">Game title</p>
                                                <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">{tournament.gameTitle}</p>
                                            </div>
                                            <div class="sm:col-span-3">
                                                <p class="block text-sm font-medium leading-6 text-gray-900">IGN of primary account</p>
                                                <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">{tournament.ignPrimaryAccount}</p>
                                            </div>
                                            <div class="sm:col-span-3">
                                                <p class="block text-sm font-medium leading-6 text-gray-900">UID of primary account</p>
                                                <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">{tournament.uidPrimaryAccount}</p>
                                            </div>
                                            <div class="sm:col-span-3">
                                                <p class="block text-sm font-medium leading-6 text-gray-900">Start Date</p>
                                                <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                    {`${new Date(tournament.tournamentDate.startDate).toLocaleString('default', { month: 'long' })} ${new Date(tournament.tournamentDate.startDate).getDate()}, ${new Date(tournament.tournamentDate.startDate).getFullYear()}`}
                                                </p>
                                            </div>
                                            <div class="sm:col-span-3">
                                                <p class="block text-sm font-medium leading-6 text-gray-900">End Date</p>
                                                <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                    {`${new Date(tournament.tournamentDate.endDate).toLocaleString('default', { month: 'long' })} ${new Date(tournament.tournamentDate.endDate).getDate()}, ${new Date(tournament.tournamentDate.endDate).getFullYear()}`}
                                                </p>
                                            </div>
                                            <div class="sm:col-span-2">
                                                <p
                                                  class="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                  Tournament logo
                                                </p>
                                                <ul role="list" class="mt-3">
                                                  <li class="col-span-2 flex rounded-md shadow-sm">
                                                    <div
                                                      class="flex w-16 h-16 flex-shrink-0 items-center justify-center border rounded-l-md text-sm font-medium uppercase text-gray-600"
                                                    >
                                                      <img
                                                        src={tournament.logo}
                                                        alt={tournament.logo}
                                                        class="p-2 object-fill"
                                                      />
                                                    </div>
                                                    <div
                                                      class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white"
                                                    >
                                                      <div
                                                        class="flex justify-between items-center truncate px-4 py-2 text-sm w-full"
                                                      >
                                                        <p
                                                          class="font-medium text-gray-900 hover:text-gray-600 truncate"
                                                        >
                                                          {typeof tournament.logo === "string"
                                                            ? tournament.logo.split("/").pop()
                                                            : ""}
                                                        </p>
                                                        <a href={tournament.logo} download class="">
                                                          <span
                                                            class="material-symbols-outlined font-medium text-gray-400 hover:text-gray-600"
                                                          >
                                                            download
                                                          </span>
                                                        </a>
                                                      </div>
                                                    </div>
                                                  </li>
                                                </ul>
                                            </div>
                                            <div class="sm:col-span-2">
                                                <p
                                                  class="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                  Tournament Banner
                                                </p>
                                                <ul role="list" class="mt-3">
                                                  <li class="col-span-2 flex rounded-md shadow-sm">
                                                    <div
                                                      class="flex w-16 h-16 flex-shrink-0 items-center justify-center border rounded-l-md text-sm font-medium uppercase text-gray-600"
                                                    >
                                                      <img
                                                        src={tournament.banner}
                                                        alt={tournament.banner}
                                                        class="p-2 object-fill"
                                                      />
                                                    </div>
                                                    <div
                                                      class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white"
                                                    >
                                                      <div
                                                        class="flex justify-between items-center truncate px-4 py-2 text-sm w-full"
                                                      >
                                                        <p
                                                          class="font-medium text-gray-900 hover:text-gray-600 truncate"
                                                        >
                                                          {typeof tournament.banner === "string"
                                                            ? tournament.banner.split("/").pop()
                                                            : ""}
                                                        </p>
                                                        <a href={tournament.banner} download class="">
                                                          <span
                                                            class="material-symbols-outlined font-medium text-gray-400 hover:text-gray-600"
                                                          >
                                                            download
                                                          </span>
                                                        </a>
                                                      </div>
                                                    </div>
                                                  </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div>
                                            <p class="block text-sm font-medium leading-6 text-gray-900">Tournament location</p>
                                            <div class=" bg-gray-50 p-4 space-y-4 mt-2">
                                                <div class="hidden sm:block">
                                                    <div class="border-b ">
                                                      <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                                                        <button on:click={() => handleTabClick("online")}
                                                          class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium {activeTab === "online" ? "tab-active" : ""} "
                                                          >Online</button
                                                        >
                                                        <button on:click={() => handleTabClick("offline")}
                                                          class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium {activeTab === "offline" ? "tab-active" : ""}"
                                                          >Offline </button
                                                        >
                                                      </nav>
                                                    </div>
                                                  </div>
                                                <div class="grid gap-x-6 gap-y-2 grid-cols-1 sm:grid-cols-6">
                                                    {#if activeTab == "online"}
                                                        {#each tournament.location.platforms as platform}
                                                            <div class="sm:col-span-2">
                                                                <p class="block text-sm font-medium leading-6 text-gray-900">Platform name</p>
                                                                <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">{platform.name}</p>
                                                            </div>
                                                            <div class="sm:col-span-4">
                                                                <p class="block text-sm font-medium leading-6 text-gray-900">Channel URL </p>
                                                                <p class="block w-full sm:text-sm sm:leading-6 text-indigo-500">
                                                                    <a class=" break-words" target="_blank" href={platform.url}>
                                                                        {platform.url}
                                                                    </a>
                                                                </p>
                                                            </div>
                                                        {/each}
                                                        {:else if activeTab == "offline"}
                                                        <!-- offline -->
                                                        <div class="sm:col-span-2">
                                                            <p class="block text-sm font-medium leading-6 text-gray-900">Country</p>
                                                            <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">{tournament.location.country}</p>
                                                        </div>
                                                        <div class="sm:col-span-2">
                                                            <p class="block text-sm font-medium leading-6 text-gray-900">State</p>
                                                            <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">{tournament.location.state}</p>
                                                        </div>
                                                        <div class="sm:col-span-2">
                                                            <p class="block text-sm font-medium leading-6 text-gray-900">City</p>
                                                            <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">{tournament.location.city}</p>
                                                        </div>
                                                        <div class="sm:col-span-full">
                                                            <p class="block text-sm font-medium leading-6 text-gray-900">Full address</p>
                                                            <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">{tournament.location.fullAddress}</p>
                                                        </div>
                                                    {/if}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {#if notAccepted.includes(tournament.status)}
                                        <Can permissions={[Tasks.updateTournament]} >
                                            <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 bg-gray-100 ">
                                                <a href={`/tournaments/tournament-application?id=${$meta.params.id}&selectedTab=0&section=tournament-details&edit=true`} class="text-sm font-semibold leading-6 text-gray-900 bg-white border rounded px-2 py-1" >Edit details</a>
                                            </div>
                                        </Can>
                                    {/if}
                                </div>
                                {:else if $meta.url == routePath+$meta.params.id+'/tournament-schedule'}
                                <div class=" shadow rounded-xl overflow-hidden">
                                    <div class="px-4 py-6 sm:p-8 space-y-6 bg-white ">
                                        <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
                                            <div class="sm:col-span-2">
                                                <p class="block text-sm font-medium leading-6 text-gray-900">Total games in tournament</p>
                                                <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                    {tournament.schedule.totalGames ? tournament.schedule.totalGames : "-"}
                                                </p>
                                            </div>
                                            <div class="sm:col-span-2">
                                                <p class="block text-sm font-medium leading-6 text-gray-900">Tournament type</p>
                                                <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                    {tournament.schedule.tournamentType ? tournament.schedule.tournamentType : "-"}
                                                </p>
                                            </div>
                                            <div class="sm:col-span-2">
                                                <p class="block text-sm font-medium leading-6 text-gray-900">Total teams</p>
                                                <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                    {tournament.schedule.totalTeams ? tournament.schedule.totalTeams : "-"}
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <p class="block text-sm font-medium leading-6 text-gray-900">Tournament schedule</p>
                                            {#each tournament.schedule.rounds as round}
                                                <div class="space-y-2">
                                                    <div class="space-y-2">
                                                        <div class="inline-flex items-center  w-full relative">
                                                            <hr class="w-full h-px bg-gray-200 border-0 ">
                                                            <p class=" absolute block text-sm font-medium leading-6 text-gray-600 z-20 bg-white pr-2">Round {round.roundNumber}</p>
                                                        </div>
                                                        {#each round.days as day}
                                                            <div class="grid grid-cols-3  bg-gray-50  p-4 border-l-4 border-indigo-600">
                                                                <div class="col-span-2">
                                                                    <div class="grid grid-cols-4 ">
                                                                        <div class="sm:col-span-2">
                                                                            <p class="block text-sm font-medium leading-6 text-gray-900">No.of Days</p>
                                                                            <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">{day.day}</p>
                                                                        </div>
                                                                        <div class="sm:col-span-2">
                                                                            <p class="block text-sm font-medium leading-6 text-gray-900">{round.roundTitle}</p>
                                                                            <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">{round.roundFormat}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <p class="block text-sm font-medium leading-6 text-gray-900">Start Date</p>
                                                                        <p class="block w-full sm:text-sm sm:leading-6 text-gray-500"> {`${new Date(day.startDate).toLocaleString('default', { month: 'long' })} ${new Date(day.startDate).getDate()}, ${new Date(day.startDate).getFullYear()}`}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p class="block text-sm font-medium leading-6 text-gray-900">End Time</p>
                                                                        <p class="block w-full sm:text-sm sm:leading-6 text-gray-500"> {`${new Date(day.endDate).toLocaleString('default', { month: 'long' })} ${new Date(day.endDate).getDate()}, ${new Date(day.endDate).getFullYear()}`}</p>
                                                                    </div>
                                                                </div>
                                                                <div class="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <p class="block text-sm font-medium leading-6 text-gray-900">Start Time</p>
                                                                        <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">{day.startTime}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p class="block text-sm font-medium leading-6 text-gray-900">End Time</p>
                                                                        <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">{day.endTime}</p>
                                                                    </div>
                                                                </div>
                                                                <div class="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <p class="block text-sm font-medium leading-6 text-gray-900">No.of Matches/day</p>
                                                                        <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">{day.matchesPerDay}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        {/each}
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>
                                    </div>
                                    {#if notAccepted.includes(tournament.status)}
                                        <Can permissions={[Tasks.updateTournament]} >
                                            <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 bg-gray-100 ">
                                                <a href={`/tournaments/tournament-application?id=${$meta.params.id}&selectedTab=1&section=tournament-schedule&edit=true`} class="text-sm font-semibold leading-6 text-gray-900 bg-white border rounded px-2 py-1" >Edit details</a>
                                            </div>
                                        </Can>
                                    {/if}
                                </div>
                                {:else if $meta.url == routePath+$meta.params.id+'/financial-details'}
                                <div class=" shadow rounded-xl overflow-hidden">
                                    <div class="px-4 py-6 sm:p-8 space-y-6 bg-white ">
                                        <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
                                            <div class="sm:col-span-2">
                                                <p class="block text-sm font-medium leading-6 text-gray-900">Total prize pool</p>
                                                <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                    {tournament.prizePool ? tournament.prizePool : "-"}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="">
                                            <p class="block text-sm font-medium leading-6 text-gray-900">Prize pool division </p>
                                            <div class=" bg-gray-50 p-4">
                                                <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
                                                    {#each tournament.financialDetails.prizeDivision as division}
                                                        <div class="sm:col-span-3">
                                                            <p class="block text-sm font-medium leading-6 text-gray-900">Position</p>
                                                            <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                                {division.position}
                                                            </p>
                                                        </div>
                                                        <div class="sm:col-span-3">
                                                            <p class="block text-sm font-medium leading-6 text-gray-900">Total prize</p>
                                                            <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                                {division.totalPrize}
                                                            </p>
                                                        </div>
                                                    {/each}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="">
                                            <p class="block text-sm font-medium leading-6 text-gray-900">Special Rewards</p>
                                            <div class=" bg-gray-50 p-4">
                                                <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
                                                    {#each tournament.financialDetails.specialPrize as division}
                                                        <div class="sm:col-span-3">
                                                            <p class="block text-sm font-medium leading-6 text-gray-900">Type</p>
                                                            <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                                {division.description}
                                                            </p>
                                                        </div>
                                                        <div class="sm:col-span-3">
                                                            <p class="block text-sm font-medium leading-6 text-gray-900">Prize</p>
                                                            <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                                {division.prize}
                                                            </p>
                                                        </div>
                                                    {/each}
                                                </div>
                                            </div>
                                        </div>
                                        <div class=" space-y-2">
                                            <p class="block text-sm font-medium leading-6 text-gray-900">Sponsorship information detail </p>
                                            {#each tournament.financialDetails.sponsors as sponsor}
                                                <div class="bg-gray-50 p-4">
                                                    <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
                                                        <div class="sm:col-span-2">
                                                            <p class="block text-sm font-medium leading-6 text-gray-900">Sponsor name </p>
                                                            <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                                {sponsor.name}
                                                            </p>
                                                        </div>
                                                        <div class="sm:col-span-2">
                                                            <p class="block text-sm font-medium leading-6 text-gray-900">Sponsor category</p>
                                                            <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                                {sponsor.category}
                                                            </p>
                                                        </div>

                                                        <div class="sm:col-span-2">
                                                            <p class="block text-sm font-medium leading-6 text-gray-900">Sponsor contribution</p>
                                                            <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                                {sponsor.contribution}
                                                            </p>
                                                        </div>
                                                        <div class="sm:col-span-2">
                                                            <p class="block text-sm font-medium leading-6 text-gray-900">Website </p>
                                                            <a href={sponsor.websiteURL} target="_blank" class="block w-full sm:text-sm sm:leading-6 text-indigo-500">
                                                                {sponsor.websiteURL}
                                                            </a>
                                                        </div>
                                                        <div class="sm:col-span-2">
                                                            <p class="block text-sm font-medium leading-6 text-gray-900">Social media 1 </p>
                                                            <a href={sponsor.socialMediaURL1} target="_blank" class="block w-full sm:text-sm sm:leading-6 text-indigo-500 break-words">
                                                                {sponsor.socialMediaURL1}
                                                            </a>
                                                        </div>
                                                        <div class="sm:col-span-2">
                                                            <p class="block text-sm font-medium leading-6 text-gray-900">Social media 2 </p>
                                                            <a href={sponsor.socialMediaURL2} target="_blank" class="block w-full sm:text-sm sm:leading-6 text-indigo-500 break-words">
                                                                {sponsor.socialMediaURL2}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>
                                    </div>
                                    {#if notAccepted.includes(tournament.status)}
                                        <Can permissions={[Tasks.updateTournament]} >
                                            <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 bg-gray-100 ">
                                                <a href={`/tournaments/tournament-application?id=${$meta.params.id}&selectedTab=2&section=financial-details&edit=true`} class="text-sm font-semibold leading-6 text-gray-900 bg-white border rounded px-2 py-1" >Edit details</a>
                                            </div>
                                        </Can>
                                    {/if}
                                </div>
                                {:else if $meta.url == routePath+$meta.params.id+'/contact-information'}
                                <div class=" shadow rounded-xl overflow-hidden">
                                    <div class="px-4 py-6 sm:p-8 space-y-6 bg-white ">
                                        {#if tournament.contactInformation}
                                            <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
                                                <div class="sm:col-span-3">
                                                    <p class="block text-sm font-medium leading-6 text-gray-900">First Name</p>
                                                    <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                        {tournament.contactInformation.firstName ? tournament.contactInformation.firstName : "-"}
                                                    </p>
                                                </div>
                                                <div class="sm:col-span-3">
                                                    <p class="block text-sm font-medium leading-6 text-gray-900">Last Name</p>
                                                    <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                        {tournament.contactInformation.lastName ? tournament.contactInformation.lastName : "-"}
                                                    </p>
                                                </div>
                                                <div class="sm:col-span-3">
                                                    <p class="block text-sm font-medium leading-6 text-gray-900">Company Name</p>
                                                    <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                        {tournament.contactInformation.companyName ? tournament.contactInformation.companyName : "-"}
                                                    </p>
                                                </div>
                                                <div class="sm:col-span-3">
                                                    <p class="block text-sm font-medium leading-6 text-gray-900">Designation</p>
                                                    <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                        {tournament.contactInformation.designation ? tournament.contactInformation.designation : "-"}
                                                    </p>
                                                </div>
                                                <div class="sm:col-span-3">
                                                    <p class="block text-sm font-medium leading-6 text-gray-900">Email</p>
                                                    <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                        {tournament.contactInformation.email ? tournament.contactInformation.email : "-"}
                                                    </p>
                                                </div>
                                                <div class="sm:col-span-3">
                                                    <p class="block text-sm font-medium leading-6 text-gray-900">Contact number</p>
                                                    <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                        {tournament.contactInformation.phoneNumber ? tournament.contactInformation.phoneNumber : "-"}
                                                    </p>
                                                </div>
                                                <div class="sm:col-span-full">
                                                    <p class="block text-sm font-medium leading-6 text-gray-900">Company Bio</p>
                                                    <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                        {tournament.contactInformation.companyBio ? tournament.contactInformation.companyBio : "-"}
                                                    </p>
                                                </div>
                                            </div>
                                            {:else}
                                            <p class="block w-full sm:text-sm sm:leading-6 text-gray-500">
                                                no details to show
                                            </p>
                                        {/if}
                                    </div>
                                    {#if notAccepted.includes(tournament.status)}
                                        <Can permissions={[Tasks.updateTournament]} >
                                            <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 bg-gray-100 ">
                                                <a href={`/tournaments/tournament-application?id=${$meta.params.id}&selectedTab=3&section=contact-information&edit=true`} class="text-sm font-semibold leading-6 text-gray-900 bg-white border rounded px-2 py-1" >Edit details</a>
                                            </div>
                                        </Can>
                                    {/if}
                                </div>
                                <!-- {:else if $meta.url == routePath+$meta.params.id+'/reports'}
                                Reports
                                {:else if $meta.url == routePath+$meta.params.id+'/activity'}
                                Activity -->
                                {:else if $meta.url == routePath+$meta.params.id+'/designPage'}
                                    <WebsiteDesignInputForm {tournament} />
                                {/if}
                        </div>
                    </div>
                </div>
                <div class="md:col-span-2 p-3 bg-gray-100 overflow-y-auto space-y-5 h-[calc(100vh-150px)] ">
                    <!-- <Comments /> -->
                     <VendorChat id={tournament._id} chatType="tournament" />
                </div>
            </div>
      </div>
    {:else}
        <p>Tournament not found.</p>
    {/if}
  
  