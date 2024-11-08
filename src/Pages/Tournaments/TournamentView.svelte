<script>
	import { Test } from 'kie-ui-kit';
  import { Route, router } from "tinro";
  import NavTab from "../../Components/NavTabs/NavTab.svelte";
  import TabLink from "../../Components/NavTabs/TabLink.svelte";
  import TableFilters from "../../Components/Table/TableFilters.svelte";
  import TablePagination from "../../Components/Table/TablePagination.svelte";
  import TournamentTable from "./TournamentTable.svelte";
  import ViewDetails from "./ViewDetails.svelte";
  import { onMount } from "svelte";
  import { RESTClient } from "../../Utils/RESTClient";
  import Toast from "../../Services/ToastService";
  import Can from "../../Utils/Can.svelte";
  import { Tasks } from "kie-tmp-config";
  import { vendorStore } from "../../Stores/VendorsStore";
  const meta = router.meta();

  export let tournaments = [];
  let searchFilter = "";
  let vendor;
  let simultaneousTournaments = false;

  vendorStore.subscribe((data) => {
    vendor = data;
  });

  onMount(() => {
    const rest = new RESTClient("tournament");
    rest.get("/gettournamentsbyvendor").then((res) => {
      if (!res.message) {
        tournaments = [...res];
        simultaneousTournaments = canHaveSimultaneousTournaments(tournaments);
      } else {
        Toast.error("technical error");
      }
    });
  });

  function canHaveSimultaneousTournaments(tournaments) {
    if (vendor.allowSimultaneousTournaments) {
      return true;
    } else {
      // count the number of tournaments whose end date is greater than or equal to the current date
      const count = tournaments.filter((tournament) => {
        if ( tournament.status !== "rejected" && tournament.status !== "completed" ) {
          const endDate = new Date(tournament.tournamentDate.endDate);
          endDate.setHours(23, 59, 59, 999);
          return endDate >= new Date();
        }
      }).length;

      return count < 1;
    }
  }

  export let deleteTournament;
  let isGridView = false;
  let itemsPerPage = 8;
  let currentPage = 1;
  let currentTab = "/tournaments/all";
  const inProgressStatus = [
    "tournament-details",
    "tournament-schedule",
    "financial-details",
    "contact-information",
  ];

  function handleDelete(tournamentId) {
    deleteTournament(tournamentId);
  }

  $: filteredItems = tournaments
    .filter((tournament) => {
      if ($meta.url === "/tournaments/all") return true;
      if ($meta.url === "/tournaments/active")
        return tournament.status === "accepted";
      if ($meta.url === "/tournaments/rejected")
        return tournament.status === "rejected";
      if ($meta.url === "/tournaments/pending-approval")
        return tournament.status === "applied";
      if ($meta.url === "/tournaments/past")
        return tournament.status === "completed";
      if ($meta.url === "/tournaments/inprogress")
        return inProgressStatus.includes(tournament.status);
    })
    .filter((tournament) => {
      if (searchFilter === "") return true;
      else
        return tournament.name
          .toLowerCase()
          .includes(searchFilter.toLowerCase());
    });

  $: {
    if (searchFilter != "") {
      currentPage = 1;
    }
  }

  $: currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function handlePageChange(page) {
    currentPage = page;
  }

  function resetPage() {
    currentPage = 1;
  }

  function toggleView(e) {
    isGridView = !isGridView;
  }

  function handleTabChange(tab) {
    currentTab = tab;
    currentPage = 1; // Reset to first page on tab change
  }

  // Calculate the counts for each tab
  $: allCount = tournaments.length;
  $: activeCount = tournaments.filter(
    (tournament) => tournament.status === "accepted"
  ).length;
  $: rejectedCount = tournaments.filter(
    (tournament) => tournament.status === "rejected"
  ).length;
  $: pendingApprovalCount = tournaments.filter(
    (tournament) => tournament.status === "applied"
  ).length;
  /* $: pendingReportCount = pendingApprovalCount; // Assuming same as pending approval */
  $: pastCount = tournaments.filter(
    (tournament) => tournament.status === "completed"
  ).length; // tournaments that are completed, comes under past
  $: inProgressCount = tournaments.filter((tournament) =>
    inProgressStatus.includes(tournament.status)
  ).length;

  $: isDetailsView = $meta.url.startsWith("/tournaments/details");
</script>
<Test />
{#if tournaments.length > 0}
{#if !isDetailsView}
<div class="md:flex md:items-center md:justify-between px-4 sm:px-6 lg:px-8 border-b border-gray-100 py-2">
  <div class="min-w-0 flex-1">
    <h2 class="text-xl font-medium leading-2 text-gray-900 sm:truncate">
      Tournament application details
    </h2>
  </div>
  {#if tournaments.length > 0}
  <div class="mt-4 flex md:ml-4 md:mt-0">
    <Can permissions={[Tasks.createTournament]} >
      {#if simultaneousTournaments}
        <a href="/tournaments/tournament-application"
        class="ml-3 inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-white mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.75v14.5m7.25-7.25H4.75"/>
          </svg>
        New tournament</a>
      {/if}
    </Can>
  </div>
  {/if}
</div>
<div class="px-4 sm:px-6 lg:px-8">
  <div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
      <NavTab>
        <TabLink Count={allCount} on:click={resetPage} link="/tournaments/all">All</TabLink>
        <TabLink Count={activeCount} on:click={resetPage} link="/tournaments/active">Accepted</TabLink>
        <TabLink Count={rejectedCount} on:click={resetPage} link="/tournaments/rejected">Rejected</TabLink>
        <TabLink Count={pendingApprovalCount} on:click={resetPage} link="/tournaments/pending-approval">Pending approval
        </TabLink>
        <!-- <TabLink Count={pendingReportCount} on:click={resetPage} link="/tournaments/pending-report">Pending report</TabLink> -->
        <TabLink Count={pastCount} on:click={resetPage} link="/tournaments/past">Past</TabLink>
        <TabLink Count={inProgressCount} on:click={resetPage} link="/tournaments/inprogress">In progress</TabLink>
      </NavTab>
    </div>
  </div>
</div>
<div class="overflow-y-scroll h-[calc(100vh-180px)] relative">
  <div class="px-4 sm:px-6 lg:px-8">
    <Test />
    <TableFilters enableGridView={true} onToggleView={toggleView} bind:searchItem={searchFilter} />
    <Route path="/" redirect="/tournaments/all" />
    <TournamentTable items={currentItems} toggleGridView={isGridView} />
    <TablePagination totalItems={filteredItems.length} {itemsPerPage} {currentPage} onPageChange={handlePageChange} />
  </div>
</div>
{:else}
<Route path="/details/:id/*" let:params>
  <ViewDetails id={params.id} {tournaments} />
</Route>
{/if}
{:else}
<div class="text-center flex items-center justify-center h-[calc(100vh-120px)] flex-col">
  <div class=" pb-40">
    <Can permissions={[Tasks.createTournament]} showAltMessage={true}
      altMessage="No tournaments available. You don’t have permission to create new tournaments. Please contact your administrator if you need access.">
      <h3 class="text-sm font-semibold text-gray-900">No details to show</h3>
      <a href="/tournaments/tournament-application"
        class="inline-flex items-center rounded-md mt-4 bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
        Submit tournament application
      </a>
    </Can>
  </div>
</div>
{/if}