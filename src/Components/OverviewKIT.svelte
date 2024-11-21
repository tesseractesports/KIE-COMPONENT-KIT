<script>
  export let data = {
    comingSoon:"/assets/images/Coming Soon Section.png",
    tournamentName: "BATTLEGROUNDS MOBILE INDIA Pro Series 2024",
    description: "BATTLEGROUNDS MOBILE INDIA Pro Series 2024, the biggest esports event in India is back. The tournament will feature 128 invited teams, who will battle it out between 20th August to 29th September for the coveted championship title of BMPS 2024. With a total prize pool of 2 Crore INR at stake, who will emerge victorious?",
    eventDetails: {
      startDate: "20th August 2024",
      endDate: "29th September 2024",
      totalTeams: "128",
      registration: "Invite only",
      location: "To be announced"
    },
    stages: [
      {
        name: "Qualifier Rounds",
        date: "20 Aug 2024 to 5 Aug 2024",
        status: "active"
      },
      {
        name: "Semi Finals",
        date: "20 Aug 2024 to 5 Aug 2024",
        status: "upcoming"
      },
      {
        name: "Grand Finals",
        date: "20 Aug 2024 to 5 Aug 2024",
        status: "pending"
      }
    ]
  };

  console.log(data)
</script>

<div class="lg:hidden w-full h-[184px]">
  <img src="https://via.placeholder.com/378x184" alt="small-screen banner" class="w-full h-full object-cover">
</div>

<div class="bg-[#111111] px-6 pt-5 pb-10 flex flex-col gap-10 lg:px-10 lg:pt-10 lg:pb-16 lg:bg-Charcoal/900">
  <div class="flex flex-col lg:flex-row gap-10 items-start lg:items-center lg:gap-7">
    
    <!-- Image for large screens -->
    <div class="hidden lg:flex bg-black/20 rounded-xl justify-center items-center">
      <img src="{data.comingSoon}" alt="">
    </div>

    <div class="flex-1 flex flex-col gap-10">
      <!-- About the Tournament Section -->
      <div class="flex flex-col gap-3">
        <h2 class="text-amber-400 text-sm font-semibold font-['Inter'] uppercase leading-tight tracking-wide">
          ABOUT THIS TOURNAMENT
        </h2>
        <p class="text-[#b8b8b8] text-sm lg:text-base font-normal font-['Inter']">
          {data.description}
        </p>

        <!-- Event Details -->
        <div class="flex flex-col gap-5 lg:flex-row lg:gap-10">
          <div class="flex flex-row lg:flex-col gap-5 lg:gap-2">
            <span class="text-[#b8b8b8] text-sm lg:text-base font-medium">Start Date:</span>
            <span class="text-white text-sm lg:text-base font-medium">{data.eventDetails.startDate}</span>
          </div>
          <div class="flex flex-row lg:flex-col gap-5 lg:gap-2">
            <span class="text-[#b8b8b8] text-sm lg:text-base font-medium">End Date:</span>
            <span class="text-white text-sm lg:text-base font-medium">{data.eventDetails.endDate}</span>
          </div>
          <div class="flex flex-row lg:flex-col gap-5 lg:gap-2">
            <span class="text-[#b8b8b8] text-sm lg:text-base font-medium">Total Teams:</span>
            <span class="text-white text-sm lg:text-base font-medium">{data.eventDetails.totalTeams}</span>
          </div>
          <div class="flex flex-row lg:flex-col gap-5 lg:gap-2">
            <span class="text-[#b8b8b8] text-sm lg:text-base font-medium">Registration:</span>
            <span class="text-white text-sm lg:text-base font-medium">{data.eventDetails.registration}</span>
          </div>
          <div class="flex flex-row lg:flex-col gap-5 lg:gap-2">
            <span class="text-[#b8b8b8] text-sm lg:text-base font-medium">Location:</span>
            <span class="text-white text-sm lg:text-base font-medium">{data.eventDetails.location}</span>
          </div>
        </div>
      </div>

      <!-- Important Dates Section -->
      <!-- <div class="flex flex-col gap-3">
        <h2 class="text-amber-400 text-sm font-semibold font-['Inter'] uppercase leading-tight tracking-wide">
          IMPORTANT DATES
        </h2>
        <div class="flex flex-col gap-6 lg:flex-row lg:gap-4">
          {#each data.stages as stage}
            <div class="flex items-center gap-6">
              <div class="w-8 h-8 {stage.status === 'active' ? 
                'bg-amber-400' : 
                stage.status === 'upcoming' ? 
                'bg-[#111111] border-2 border-amber-400 flex justify-center items-center' : 
                'bg-[#111111] border-2 border-[#313131]'} 
                rounded-full">
                {#if stage.status === 'upcoming'}
                  <div class="w-4 h-4 bg-amber-400 rounded-full"></div>
                {/if}
              </div>
              <div>
                <h3 class="text-{stage.status === 'upcoming' ? 'amber-400' : 
                  stage.status === 'active' ? 'white' : '[#b8b8b8]'} 
                  text-sm lg:text-base font-semibold">
                  {stage.name}
                </h3>
                <p class="text-[#888888] text-sm lg:text-base">{stage.date}</p>
              </div>
            </div>
          {/each}
        </div>
      </div> -->

    </div>
  </div>
</div>