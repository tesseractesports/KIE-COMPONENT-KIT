<script>
    import { Route, router } from "tinro";
  import TournamentApplication from "./TournamentApplication.svelte";
  import TournamentView from "./TournamentView.svelte";
  import Can from "../../Utils/Can.svelte";
  import { Tasks } from "kie-tmp-config";
  import { RESTClient } from "../../Utils/RESTClient";
  import { vendorStore } from "../../Stores/VendorsStore";
  const meta = router.meta();  
  const rest = new RESTClient("tournament");
  let tournaments = [];
  let vendor;
  let simultaneousTournaments = false;

  

  rest.get("/gettournamentsbyvendor").then((res) => {
    if (!res.message) {
      tournaments = [...res];
      vendorStore.subscribe((data) => {
        vendor = data;
        canHaveSimultaneousTournaments(tournaments);
      });
    }
  });

  function canHaveSimultaneousTournaments(tournaments) {
    if (!vendor.allowSimultaneousTournaments) {
      // count the number of tournaments whose end date is greater than or equal to the current date
      const count = tournaments.filter((tournament) => {
        if ( tournament.status !== "rejected" && tournament.status !== "completed" ) {
          const endDate = new Date(tournament.tournamentDate.endDate);
          endDate.setHours(23, 59, 59, 999);
          return endDate >= new Date();
        }
      }).length;
      if (count > 0) {
        router.goto("/tournaments/all")
      }
    }
  }
  </script>
  
  {#if $meta.url.startsWith("/tournaments/tournament-application") || Object.keys($meta.query).length > 0 } 
    <Can permissions={[Tasks.createTournament]} >  
      <Route path="/tournament-application">
        <TournamentApplication />
      </Route>
      <Route path="/tournament-application/:id" let:params>
        <TournamentApplication {params} />
      </Route>
    </Can>
    {:else}
      <TournamentView />
  {/if}
