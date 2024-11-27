<script>
  import { webConfig } from '../stores/webConfig.js';
  import { THEMES } from '../stores/ThemeConfig.js';
    
  $: overview = $webConfig?.info?.overview;
    $: format = $webConfig?.info?.format;
    $: theme = $webConfig?.theme || THEMES.DEFAULT;

    function formatDate(dateString) {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString();
    }
</script>

<div class="w-full" style:background-color={theme.colors.background}>
    <!-- Banner Image - Mobile -->
    <div class="lg:hidden w-full h-[184px]">
        <img 
            src={overview?.videoThumbnail} 
            alt="Tournament Banner" 
            class="w-full h-full object-cover"
        />
    </div>

    <!-- Main Content Container -->
    <div class="px-6 pt-5 pb-10 lg:px-10 lg:pt-10 lg:pb-16 flex flex-col gap-10">
        <div class="flex flex-col lg:flex-row gap-10 items-start lg:gap-7">
            
            <!-- Left Section with Image - Desktop -->
            <div class="hidden lg:block w-full lg:w-[620px] rounded-xl overflow-hidden max-w-screen-sm"
                 style:background-color={theme.colors.background}>
                <img 
                    src={overview?.videoThumbnail} 
                    alt="Tournament Banner"
                    class="w-full h-full object-cover"
                />
            </div>

            <!-- Right Section -->
            <div class="flex-1 flex flex-col gap-10">
                <!-- About Tournament -->
                <div class="flex flex-col gap-3">
                    <h2 class="text-sm font-semibold font-['Inter'] uppercase leading-tight tracking-wide"
                        style:color={theme.colors.primary}>
                        ABOUT THIS TOURNAMENT
                    </h2>
                    <p class="text-sm lg:text-base font-normal font-['Inter']"
                       style:color={theme.colors.foreground}>
                        {overview?.aboutTournament}
                    </p>

                    <!-- Tournament Details Grid -->
                    <div class="grid grid-cols-2 lg:grid-cols-5 gap-5 mt-4">
                        <div class="flex flex-col gap-2">
                            <span class="text-sm lg:text-base font-medium"
                                  style:color={theme.colors.foreground}>Start Date:</span>
                            <span class="text-sm lg:text-base font-medium"
                                  style:color={theme.colors.foreground}>
                                {overview?.startDate}
                            </span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <span class="text-sm lg:text-base font-medium"
                                  style:color={theme.colors.foreground}>End Date:</span>
                            <span class="text-sm lg:text-base font-medium"
                                  style:color={theme.colors.foreground}>
                                {overview?.endDate}
                            </span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <span class="text-sm lg:text-base font-medium"
                                  style:color={theme.colors.foreground}>Total Teams:</span>
                            <span class="text-sm lg:text-base font-medium"
                                  style:color={theme.colors.foreground}>
                                {overview?.totalTeams}
                            </span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <span class="text-sm lg:text-base font-medium"
                                  style:color={theme.colors.foreground}>Registration:</span>
                            <span class="text-sm lg:text-base font-medium"
                                  style:color={theme.colors.foreground}>
                                Invite only
                            </span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <span class="text-sm lg:text-base font-medium"
                                  style:color={theme.colors.foreground}>Location:</span>
                            <span class="text-sm lg:text-base font-medium"
                                  style:color={theme.colors.foreground}>
                                {overview?.location}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Important Dates Timeline
                {#if format?.rounds?.length > 0}
                    <div class="flex flex-col gap-3">
                        <h2 class="text-sm font-semibold font-['Inter'] uppercase tracking-wide mb-6"
                            style:color={theme.colors.primary}>
                            IMPORTANT DATES
                        </h2>

                        Timeline Container
                        <div class="relative flex flex-col gap-8">
                            Timeline Line (Desktop)
                            <div class="hidden lg:block absolute left-4 h-full w-[2px] top-0 bottom-0"
                                 style:background-color={`${theme.colors.foreground}33`}>
                            </div>

                            {#each format.rounds as round, index}
                                <div class="flex flex-col lg:flex-row items-start gap-4">
                                    Status Circle
                                    <div class="flex items-center gap-4 relative">
                                        <div class="w-8 h-8 rounded-full flex items-center justify-center bg-opacity-20"
                                             style:background-color={theme.colors.primary}>
                                            <div class="w-4 h-4 rounded-full"
                                                 style:background-color={theme.colors.primary}>
                                            </div>
                                        </div>
                                    </div>

                                    Round Info
                                    <div class="flex-1">
                                        <h3 class="text-base font-semibold mb-1"
                                            style:color={theme.colors.foreground}>
                                            {round.roundName}
                                        </h3>
                                        <p class="text-sm"
                                           style:color={`${theme.colors.foreground}99`}>
                                            {formatDate(round.startDate)} - {formatDate(round.endDate)}
                                        </p>
                                        {#if round.roundDescription}
                                            <p class="mt-2 text-sm"
                                               style:color={theme.colors.foreground}>
                                                {round.roundDescription}
                                            </p>
                                        {/if}
                                    </div>
                                </div>

                                Connector (except for last item)
                                {#if index !== format.rounds.length - 1}
                                    <div class="hidden lg:block w-[2px] h-4 ml-4"
                                         style:background-color={`${theme.colors.foreground}33`}>
                                    </div>
                                {/if}
                            {/each}
                        </div>
                    </div>
                {/if} -->
            </div>
        </div>
    </div>
</div>

<style>
    /* Optional: Add smooth transitions for theme changes */
    div {
        transition: background-color 0.3s ease, color 0.3s ease;
    }
</style>