<script>
	import SectionKIT from './SectionKIT.svelte';
  import { webConfig } from '../stores/webConfig.js';
  import { ThemeConfig } from '../stores/ThemeConfig.js';
  
  $: prizePool = $webConfig?.prizePool;
  $: theme = $ThemeConfig;

  // Helper function to generate gradient background style
  $: gradientStyle = `
      background-color: ${theme.colors.primary};
      background-image: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
  `;
</script>
<SectionKIT>

  <div class="flex flex-col gap-3 px-2 ">
    <!-- Total Prize Pool Banner -->
    <div class="relative w-full h-[180px] rounded-xl overflow-hidden mt-4">
        <!-- Background with Theme Color -->
        <div 
            class="absolute inset-0 bg-pattern"
            style={gradientStyle}
        ></div>
  
        <!-- Content -->
        <div class="relative z-10 h-full flex flex-col justify-center lg:px-8 lg:justify-center lg:items-start items-center text-center">
            <div class="text-sm font-medium uppercase tracking-wider mb-2"
                 style:color={theme.colors.background}>
                TOTAL PRIZE POOL
            </div>
            <div class="text-4xl font-bold"
                 style:color={theme.colors.background}>
                {prizePool?.totalPrize || "₹2,00,00,000"}
            </div>
        </div>
  
        <!-- Character/Helmet Image -->
        <img 
            src={prizePool?.rightCharacter || "https://via.placeholder.com/300x300"}
            alt="Prize Pool Character"
            class="absolute right-4 top-1/2 -translate-y-1/2 h-36 object-contain hidden lg:block "
        />
    </div>
  
    <!-- Top 3 Positions -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
        {#each prizePool?.prizeDetails.slice(0, 3) || [] as prize, index}
            <div 
                class="rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
                style:background-color={theme.colors.background}
                style:border={`1px solid ${theme.colors.foreground}22`}
            >
                <div 
                    class="text-sm font-medium uppercase tracking-wider mb-2"
                    style:color={`${theme.colors.foreground}88`}
                >
                    {prize.positionTitle || `${index + 1}${index === 0 ? 'ST' : index === 1 ? 'ND' : 'RD'} POSITION`}
                </div>
                <div 
                    class="text-3xl font-bold"
                    style:color={index === 0 ? theme.colors.primary : theme.colors.secondary}
                >
                    {prize.positionPrize}
                </div>
            </div>
        {/each}
    </div>
  
    <!-- Other Positions -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
        {#each prizePool?.prizeDetails.slice(3) || [] as prize}
            <div 
                class="rounded-xl p-4 transition-all duration-300 hover:-translate-y-1"
                style:background-color={theme.colors.background}
                style:border={`1px solid ${theme.colors.foreground}22`}
            >
                <div 
                    class="text-sm font-medium uppercase tracking-wider mb-2"
                    style:color={`${theme.colors.foreground}88`}
                >
                    {prize.positionTitle}
                </div>
                <div 
                    class="text-xl font-bold"
                    style:color={theme.colors.tertiary}
                >
                    {prize.positionPrize}
                </div>
            </div>
        {/each}
    </div>
  
    <!-- Special Rewards -->
    <div class="mt-4">
        <div 
            class="text-sm font-medium uppercase tracking-wider mb-4 text-start px-2"
            style:color={theme.colors.primary}
        >
            SPECIAL REWARDS
            <div class="flex-grow border-b"></div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            {#each prizePool?.specialRewards || [] as reward}
                <div 
                    class="rounded-xl p-4 transition-all duration-300 hover:-translate-y-1"
                    style:background-color={theme.colors.background}
                    style:border={`1px solid ${theme.colors.foreground}22`}
                >
                    <div 
                        class="text-sm font-medium uppercase tracking-wider mb-2"
                        style:color={`${theme.colors.foreground}88`}
                    >
                        {reward.positionTitle}
                    </div>
                    <div 
                        class="text-2xl font-bold"
                        style:color={theme.colors.quaternary}
                    >
                        {reward.positionPrize}
                    </div>
                </div>
            {/each}
        </div>
    </div>
  </div>
</SectionKIT>


<style>
  .bg-pattern {
      background-size: 30px 30px;
      background-image: 
          linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
  }

  /* Smooth transitions for theme changes */
  div {
      transition: all 0.3s ease;
  }
</style>