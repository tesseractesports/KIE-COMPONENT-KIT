<script>
    import { webConfig } from '../stores/webConfig.js';
    import { THEMES } from '../stores/ThemeConfig.js';
    
    $: format = $webConfig?.info?.format;
    $: rounds = format?.rounds || [];
    $: theme = $webConfig?.theme || THEMES.DEFAULT;

    // Function to get status based on dates
    function getRoundStatus(round) {
        const now = new Date();
        const startDate = new Date(round.startDate);
        const endDate = new Date(round.endDate);

        if (now < startDate) return 'upcoming';
        if (now >= startDate && now <= endDate) return 'active';
        return 'completed';
    }

    // Function to format date
    function formatDate(dateString) {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString();
    }
</script>

<div class="w-full" style:background-color={theme.colors.background}>
    <!-- Main Content Container -->
    <div class="w-full py-6 sm:py-8 md:py-10 flex-col justify-start items-start gap-10 px-6 lg:px-10">
        <!-- Format Description -->
        <div class="flex flex-col gap-3">
            <h2 
                class="text-sm font-semibold font-['Inter'] uppercase leading-tight tracking-wide"
                style:color={theme.colors.primary}
            >
                TOURNAMENT FORMAT
            </h2>
            <p 
                class="text-sm lg:text-base font-normal font-['Inter']"
                style:color={theme.colors.foreground}
            >
                {format?.description || "Tournament format details and progression structure."}
            </p>
        </div>

        <!-- Rounds Timeline -->
        <div class="flex flex-col gap-8">
            {#each rounds as round, index}
                <div class="flex flex-col lg:flex-row gap-6 lg:items-start">
                    <!-- Round Status and Info -->
                    <div class="flex items-start gap-4 lg:w-1/3">
                        <!-- Status Circle -->
                        <div 
                            class="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center mt-1"
                            style:background-color={
                                getRoundStatus(round) === 'active' 
                                    ? theme.colors.primary 
                                    : getRoundStatus(round) === 'upcoming'
                                        ? 'transparent'
                                        : `${theme.colors.foreground}33`
                            }
                            style:border={
                                getRoundStatus(round) === 'upcoming'
                                    ? `2px solid ${theme.colors.primary}`
                                    : 'none'
                            }
                        >
                            {#if getRoundStatus(round) === 'upcoming'}
                                <div 
                                    class="w-4 h-4 rounded-full"
                                    style:background-color={theme.colors.primary}
                                ></div>
                            {/if}
                        </div>

                        <!-- Round Title and Dates -->
                        <div class="flex flex-col gap-1">
                            <h3 
                                class="text-sm lg:text-base font-semibold"
                                style:color={
                                    getRoundStatus(round) === 'active'
                                        ? theme.colors.primary
                                        : theme.colors.foreground
                                }
                            >
                                {round.roundName}
                            </h3>
                            <div 
                                class="flex flex-col text-sm"
                                style:color={`${theme.colors.foreground}99`}
                            >
                                <span>Starts: {formatDate(round.startDate)}</span>
                                <span>Ends: {formatDate(round.endDate)}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Round Description -->
                    <div 
                        class="lg:flex-1 p-4 rounded-lg"
                        style:background-color={`${theme.colors.foreground}0a`}
                    >
                        <p 
                            class="text-sm lg:text-base"
                            style:color={theme.colors.foreground}
                        >
                            {round.roundDescription}
                        </p>
                    </div>
                </div>

                <!-- Connector Line (except for last item) -->
                {#if index !== rounds.length - 1}
                    <div 
                        class="w-[2px] h-8 ml-4"
                        style:background-color={`${theme.colors.foreground}33`}
                    ></div>
                {/if}
            {/each}
        </div>

        <!-- Points System -->
        {#if format?.pointSystem}
            <div class="mt-8">
                <h2 
                    class="text-sm font-semibold font-['Inter'] uppercase tracking-wide mb-6"
                    style:color={theme.colors.primary}
                >
                    POINTS SYSTEM
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {#each Object.entries(format.pointSystem) as [position, points]}
                        <div 
                            class="flex justify-between items-center p-4 rounded-lg"
                            style:background-color={`${theme.colors.foreground}0a`}
                        >
                            <span style:color={theme.colors.foreground}>{position}</span>
                            <span 
                                class="font-semibold"
                                style:color={theme.colors.primary}
                            >
                                {points} points
                            </span>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}

        <!-- Additional Information -->
        {#if format?.additionalInfo}
            <div class="mt-8">
                <div 
                    class="p-6 rounded-lg"
                    style:background-color={`${theme.colors.foreground}0a`}
                >
                    <h3 
                        class="text-sm lg:text-base font-semibold mb-3"
                        style:color={theme.colors.primary}
                    >
                        Additional Information
                    </h3>
                    <p 
                        class="text-sm lg:text-base"
                        style:color={theme.colors.foreground}
                    >
                        {format.additionalInfo}
                    </p>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    /* Optional: Add smooth transitions for theme changes */
    div {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }

    /* Optional: Add hover effect for point system cards */
    .point-card {
        transition: transform 0.2s ease-in-out;
    }
    
    .point-card:hover {
        transform: translateY(-2px);
    }
</style>