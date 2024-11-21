<script>
  import { webConfig } from '../stores/webConfig';
  
  $: overview = $webConfig?.info?.overview;
  $: format = $webConfig?.info?.format;
</script>

<div class="lg:hidden w-full h-[184px]">
  <img 
      src={overview?.videoThumbnail} 
      alt="small-screen banner" 
      class="w-full h-full object-cover"
  >
</div>

<div class="bg-[#111111] px-6 pt-5 pb-10 flex flex-col gap-10 lg:px-10 lg:pt-10 lg:pb-16 lg:bg-Charcoal/900">
  <div class="flex flex-col lg:flex-row gap-10 items-start lg:items-center lg:gap-7">
      
      <!-- Video thumbnail for large screens -->
      <div class="hidden lg:flex bg-black/20 rounded-xl justify-center items-center">
          <img src={overview?.videoThumbnail} alt={overview?.videoTitle} class=" max-w-md">
      </div>

      <div class="flex-1 flex flex-col gap-10">
          <!-- About Tournament Section -->
          <div class="flex flex-col gap-3">
              <h2 class="text-amber-400 text-sm font-semibold font-['Inter'] uppercase leading-tight tracking-wide">
                  ABOUT THIS TOURNAMENT
              </h2>
              <p class="text-[#b8b8b8] text-sm lg:text-base font-normal font-['Inter']">
                  {overview?.aboutTournament}
              </p>

              <!-- Event Details -->
              <div class="flex flex-col gap-5 lg:flex-row lg:gap-10">
                  <div class="flex flex-row lg:flex-col gap-5 lg:gap-2">
                      <span class="text-[#b8b8b8] text-sm lg:text-base font-medium">Start Date:</span>
                      <span class="text-white text-sm lg:text-base font-medium">
                          {overview?.startDate}
                      </span>
                  </div>
                  <div class="flex flex-row lg:flex-col gap-5 lg:gap-2">
                      <span class="text-[#b8b8b8] text-sm lg:text-base font-medium">End Date:</span>
                      <span class="text-white text-sm lg:text-base font-medium">
                          {overview?.endDate}
                      </span>
                  </div>
                  <div class="flex flex-row lg:flex-col gap-5 lg:gap-2">
                      <span class="text-[#b8b8b8] text-sm lg:text-base font-medium">Total Teams:</span>
                      <span class="text-white text-sm lg:text-base font-medium">
                          {overview?.totalTeams}
                      </span>
                  </div>
                  <div class="flex flex-row lg:flex-col gap-5 lg:gap-2">
                      <span class="text-[#b8b8b8] text-sm lg:text-base font-medium">Location:</span>
                      <span class="text-white text-sm lg:text-base font-medium">
                          {overview?.location}
                      </span>
                  </div>
              </div>
          </div>

          <!-- Tournament Rounds Section -->
          {#if format?.rounds?.length > 0}
              <div class="flex flex-col gap-3">
                  <h2 class="text-amber-400 text-sm font-semibold font-['Inter'] uppercase leading-tight tracking-wide">
                      TOURNAMENT ROUNDS
                  </h2>
                  <div class="flex flex-col gap-6 lg:flex-row lg:gap-4">
                      {#each format.rounds as round}
                          <div class="flex items-center gap-6">
                              <div class="w-8 h-8 bg-[#111111] border-2 border-amber-400 flex justify-center items-center rounded-full">
                                  <div class="w-4 h-4 bg-amber-400 rounded-full"></div>
                              </div>
                              <div>
                                  <h3 class="text-white text-sm lg:text-base font-semibold">
                                      {round.roundName}
                                  </h3>
                                  <p class="text-[#888888] text-sm lg:text-base">
                                      {round.startDate} - {round.endDate}
                                  </p>
                              </div>
                          </div>
                      {/each}
                  </div>
              </div>
          {/if}
      </div>
  </div>
</div>