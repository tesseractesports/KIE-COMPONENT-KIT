<script>
  import SectionKit from "./SectionKIT.svelte";

  //******** STATIC DATA FOR LEADERBOARD *************
  
  // filter data
 const defaultLeaderboardData = {
   filterOptions : {
    Round: ["Round 1", "Round 2", "Round 3"],
    Day: ["Day 1", "Day 2", "Day 3"],
    Group: ["Group A", "Group B", "Group C"],
  },
  //headerdata
  head: ["Rank", "Team", "Group", "WWCD", "Position Points", "Finish Points", "Overall Points"],
  //rows data
  rows:[
    { 
        startingRank: 1, 
        team: { name: "Team A" }, 
        group: "Group A", 
        wwcd: 10, 
        positionPoints: 20, 
        finishPoints: 30, 
        overAllPoints: 60 
    },
    {     
        startingRank: 2, 
        team: { name: "Team B" }, 
        group: "Group B", 
        wwcd: 15, 
        positionPoints: 25, 
        finishPoints: 35,         
        overAllPoints: 75 
    },
  ]
 }


  // *************** DYNAMIC DATA FOR LEADERBOARD ***************** 
  
  const leaderBoardData={
    // No UI IN VENDOR 
  };
</script>
<SectionKit>
<!-- If matches is true -->
<div
class="w-full py-6 sm:py-8 md:py-10 bg-[#1d1d1d] flex-col justify-start items-start gap-4 sm:gap-5 md:gap-6 lg:gap-7 inline-flex overflow-hidden px-6"
>
<!-- Top Filters -->
<div class="w-full justify-start items-center gap-2 sm:gap-3 inline-flex">
  {#each ["Round", "Day", "Group"] as filter}
    <div
      class="pl-4 pr-3 py-2 bg-[#313131] rounded-md shadow border border-[#3e3e3e] justify-center items-center gap-2 flex relative w-full sm:w-auto"
    >
      <select
        class="appearance-none bg-[#313131] text-[#888888] text-xs sm:text-sm font-medium leading-tight border-none focus:ring-0 pr-8 w-full sm:w-auto"
      >
        <option value="">{filter}</option>

        {#each defaultLeaderboardData.filterOptions[filter] as option}
        <option value={option}>{option}</option>
      {/each}
      </select>
      <div class="pointer-events-none absolute right-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-[#888888]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  {/each}
</div>

<!-- Table Section -->
<div
  class="w-full flex-col justify-start items-start gap-4 md:gap-5 flex overflow-x-auto whitespace-nowrap"
>
  <table class="w-full bg-[#1d1d1d] border-collapse px-6">
    <thead>
      <tr>
        {#each defaultLeaderboardData.head as header}
          <th
            class="px-6 py-3 bg-[#111111] text-amber-400 text-xs font-medium uppercase leading-none tracking-wide text-left"
            >{header}</th
          >
        {/each}
      </tr>
    </thead>
    <tbody>
      <!-- Example of table rows -->
      {#each defaultLeaderboardData.rows as row, index}
        <tr
          class={`transition duration-300 
          ${index % 2 === 0 ? "bg-[#272727]" : "bg-[#212121]"} 
          hover:bg-gray-600`}
        >
          <td
            class="px-6 py-5 text-[#b8b8b8] text-sm font-medium leading-tight"
            >{index+ row.startingRank}</td
          >
          <td
            class="px-6 py-5 text-[#b8b8b8] text-sm font-medium leading-tight"
          >
            <img
              class="rounded-xl inline-block mr-2"
              src="/images/Avatar.png"
              alt=""
            />
            <span>{row.team.name}</span>
          </td>
          <td class="px-6 py-5 text-[#888888] text-sm font-normal"
            >{row.group}</td
          >
          <td class="px-6 py-5 text-[#888888] text-sm font-normal"
            >{row.wwcd}</td
          >
          <td class="px-6 py-5 text-[#888888] text-sm font-normal"
            >{row.positionPoints}</td
          >
          <td class="px-6 py-5 text-[#888888] text-sm font-normal"
            >{row.finishPoints}</td
          >
          <td class="px-6 py-5 text-[#888888] text-sm font-normal"
            >{row.overAllPoints}</td
          >
        </tr>
      {/each}
    </tbody>
  </table>
</div>
</div>
</SectionKit>
<!-- ADDED FOR PAGINATION -->
<!-- <div class="-Charcoal/900">
<ServerPagination {...pagination} on:onPageChange={handlePageChange} />
</div> -->

