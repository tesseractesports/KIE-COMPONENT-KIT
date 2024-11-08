<script>
    import { Route, router } from "tinro";
    import Td from "../../Components/Table/TD.svelte";
    import TH from "../../Components/Table/TH.svelte";
    import Table from "../../Components/Table/Table.svelte";
    import TableBody from "../../Components/Table/TableBody.svelte";
    import TableHeader from "../../Components/Table/TableHeader.svelte";
    import TableRow from "../../Components/Table/TableRow.svelte";
  import Can from "../../Utils/Can.svelte";
  import { Tasks } from "kie-tmp-config";
  import { tournamentLoading } from "../../Stores/TournamentStore";
    const meta = router.meta(); 
    export let items = [];
    export let toggleGridView = false;

    let selectedTournaments = [];
    const inProgress = [
      "tournament-details",
      "tournament-schedule",
      "financial-details",
      "contact-information",
    ];
  
    function toggleSelection(tournamentId) {
      if (selectedTournaments.includes(tournamentId)) {
        selectedTournaments = selectedTournaments.filter(id => id !== tournamentId);
      } else {
        selectedTournaments = [...selectedTournaments, tournamentId];
      }
    }
    function getStatusClasses(status) {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'applied':
        return 'bg-gray-100 text-gray-800';
      case 'past':
        return 'bg-gray-100 text-gray-800';
      case 'tournament-details':
        return 'bg-yellow-100 text-yellow-800';
      case 'tournament-schedule':
        return 'bg-yellow-100 text-yellow-800';
      case 'financial-details':
        return 'bg-yellow-100 text-yellow-800';
      case 'contact-information':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  function getStatusIndicatorColor(status) {
    switch (status) {
      case 'active':
        return 'bg-green-400';
      case 'rejected':
        return 'bg-red-400';
      case 'pending':
        return 'bg-yellow-400';
      case 'past':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  }
  </script>
  
  {#if $meta.url === '/tournaments/past'}
    <Table>
      <TableHeader customClass="bg-gray-50">
        <TableRow>
          <TH customClass="bg-gray-50 w-20 text-center">
            <input
              id="selectAll"
              name="selectAll"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </TH>
          <TH>Tournament name</TH>
          <TH>FORMAT</TH>
          <TH>VENDOR NAME</TH>
          <TH>Tier</TH>
          <TH>Date applied</TH>
          <TH>Prize pool</TH>
          <TH>Status</TH>
          <TH></TH>
        </TableRow>
      </TableHeader>
      <TableBody>
        {#each items as tournament}
          <TableRow>
            <Td customClass="text-center">
              <input
                id="user_"
                name="user_"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                on:change={() => toggleSelection(tournament.id)}
              />
            </Td>
            <Td>
              <div class="flex gap-2 items-center">
                <img src="https://via.placeholder.com/150" alt="" class="rounded-full w-8 h-8 overflow-hidden" />
                {tournament.name}
              </div>
            </Td>
            <Td>{tournament.format}</Td>
            <Td>{tournament.vendor}</Td>
            <Td>{tournament.tier}</Td>
            <Td>{tournament.dateApplied}</Td>
            <Td>{tournament.prizePool}</Td>
            <Td>
                <div class="flex items-center {getStatusClasses(tournament.status)} rounded-full p-1 px-4 w-fit">
                    <!-- <div class="h-2.5 w-2.5 rounded-full {getStatusIndicatorColor(tournament.status)} me-2"></div>  -->
                    <span class="capitalize text-sm">{tournament.status}</span>
                  </div>
            </Td>
            <Td>
              <a href={`/tournaments/details/${tournament.id}`} class="text-indigo-600">View details</a>
            </Td>
          </TableRow>
        {/each}
      </TableBody>
    </Table>
  {:else if $meta.url === '/tournaments/inprogress'}
    <Table>
      <TableHeader customClass="bg-gray-50">
        <TableRow>
          <TH customClass="bg-gray-50 w-20 text-center">
            <input
              id="selectAll"
              name="selectAll"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </TH>
          <TH>Tournament name</TH>
          <TH>Prize pool</TH>
          <TH>Game Title</TH>
          <TH>Status</TH>
        </TableRow>
      </TableHeader>
      <TableBody>
        {#each items as tournament}
          <TableRow>
            <Td customClass="text-center">
              <input
                id="user_"
                name="user_"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                on:change={() => toggleSelection(tournament.id)}
              />
            </Td>
            <Td>
              <div class="flex gap-2 items-center">
                <img src={tournament.logo} alt="logo" class="rounded-full w-8 h-8 overflow-hidden" />
                {tournament.name}
              </div>
            </Td>
            <Td>{tournament.prizePool}</Td>
            <Td>{tournament.gameTitle}</Td>
            <Td>
              <div class="flex items-center {getStatusClasses(tournament.status)} rounded-full p-1 px-4 w-fit">
                  <!-- <div class="h-2.5 w-2.5 rounded-full {getStatusIndicatorColor(tournament.status)} me-2"></div>  -->
                  <span class="capitalize text-sm">{tournament.status}</span>
              </div>
            </Td>
            <Td>
              <Can permissions={[Tasks.createTournament]} >
                <a href={`/tournaments/tournament-application/${tournament._id}`} class="text-blue-600">Continue to apply</a>
              </Can>
            </Td>
          </TableRow>
        {/each}
      </TableBody>
    </Table>
  {:else}
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
      {#each items as tournament}
        <li class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow p-6">
          <div class="flex flex-col gap-4">
            <div class="flex justify-between items-center">
              <img class="h-14 w-14 flex-shrink-0 rounded-full" src={tournament.logo} alt="">
              <div class="flex items-center {getStatusClasses(tournament.status)} rounded-full p-1 px-4">
                <!-- <div class="h-2.5 w-2.5 rounded-full {getStatusIndicatorColor(tournament.status)} me-2"></div>  -->
                <span class="capitalize text-sm">{tournament.status}</span>
              </div>
            </div>
            <h2 class=" text-gray-900 text-xl font-medium text-left truncate">{tournament.name}</h2>
            <div class="flex gap-8">
              <div class=" text-left">
                <p class=" text-gray-500 text-sm">Start date</p>
                <p class=" text-gray-900 text-sm font-medium">{`${new Date(tournament.tournamentDate.startDate).toLocaleString('default', { month: 'long' })} ${new Date(tournament.tournamentDate.startDate).getDate()}, ${new Date(tournament.tournamentDate.startDate).getFullYear()}`}</p>
              </div>
              <div class=" text-left">
                <p class=" text-gray-500 text-sm">End date</p>
                <p class=" text-gray-900 text-sm font-medium">{`${new Date(tournament.tournamentDate.endDate).toLocaleString('default', { month: 'long' })} ${new Date(tournament.tournamentDate.endDate).getDate()}, ${new Date(tournament.tournamentDate.endDate).getFullYear()}`}</p>
              </div>
            </div>
            <div class="grid grid-cols-{tournament.status == 'accepted' ? "2" : "1"} gap-6">
              <a href={inProgress.includes(tournament.status) ? `/tournaments/tournament-application/${tournament._id}`: `/tournaments/details/${tournament._id}`} class="border rounded px-6 p-2 w-full font-medium text-sm">
                {inProgress.includes(tournament.status) ? "Continue to Apply" : "View Details"}
              </a>
              {#if tournament.status == 'accepted'}
                <a href="/tournaments/details/{tournament._id}/designPage" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Design Website</a>
              {/if}
            </div>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
  