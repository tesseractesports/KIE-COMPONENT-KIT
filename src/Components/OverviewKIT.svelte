<script>
  import { webConfig } from '../stores/webConfig';
  import { THEMES } from '../stores/ThemeConfig';
    
  $: overview = $webConfig?.info?.overview;
    $: format = $webConfig?.info?.format;
    $: theme = $webConfig?.theme || THEMES.DEFAULT;

    function formatDate(dateString) {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString();
    }
</script>

<div class="w-full"  >   

    <div class="pt-5 pb-10 lg:pt-10 lg:pb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 items-start lg:gap-7">
            <!-- Left Section with Image - Desktop -->
            <div class="relative rounded-xl overflow-hidden max-w-screen-sm"
                 style:background-color={theme.colors.background}>
                <a href={overview.videoUrl} target="_blank">
                <img 
                    src={overview?.videoThumbnail} 
                    alt="Tournament Banner"
                    class="w-full h-full object-cover"
                />
                 <div
                        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-black/20 backdrop-blur rounded-full flex items-center justify-center"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path id="Polygon 1" d="M15.2874 6.90473C16.2375 7.3913 16.2375 8.60773 15.2874 9.0943L2.13782 15.8283C1.18768 16.3148 -4.79569e-08 15.7066 0 14.7335L6.63702e-07 1.26555C7.11659e-07 0.292404 1.18768 -0.31581 2.13782 0.170762L15.2874 6.90473Z" fill="white" />
                        </svg>
                    </div>
                </a>
            </div>

            <!-- Right Section -->
            <div class="flex-1 flex flex-col gap-10">
                <!-- About Tournament -->
                <div class="flex flex-col gap-3">
                    <h2 class="text-sm font-semibold font-['Inter'] uppercase leading-tight tracking-wide mt-2"
                        style:color={theme.colors.primary}>
                        ABOUT THIS TOURNAMENT
                    </h2>
                    <p class="text-sm lg:text-base font-normal font-['Inter'] mt-2"
                       style:color={theme.colors.foreground}>
                        {overview?.aboutTournament}
                    </p>

                    <!-- Tournament Details Grid -->
                    <div class="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                        <div class="flex flex-col gap-2">
                            <span class="text-sm lg:text-base font-medium"
                                  style:color={theme.colors.foreground}>Start Date</span>
                            <span class="text-sm lg:text-base font-medium"
                                  style:color={theme.colors.foreground}>
                                {overview?.startDate}
                            </span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <span class="text-sm lg:text-base font-medium"
                                  style:color={theme.colors.foreground}>End Date</span>
                            <span class="text-sm lg:text-base font-medium"
                                  style:color={theme.colors.foreground}>
                                {overview?.endDate}
                            </span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <span class="text-sm lg:text-base font-medium"
                                  style:color={theme.colors.foreground}>Total Teams</span>
                            <span class="text-sm lg:text-base font-medium"
                                  style:color={theme.colors.foreground}>
                                {overview?.totalTeams}
                            </span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <span class="text-sm lg:text-base font-medium lg:mt-6 "
                                  style:color={theme.colors.foreground}>Registration</span>
                            <span class="text-sm lg:text-base font-medium"
                                  style:color={theme.colors.foreground}>
                                Invite only
                            </span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <span class="text-sm lg:text-base font-medium lg:mt-6"
                                  style:color={theme.colors.foreground}>Location</span>
                            <span class="text-sm lg:text-base font-medium whitespace-nowrap"
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