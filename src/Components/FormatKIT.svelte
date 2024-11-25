<script>
    import { webConfig } from '../stores/webConfig.js';
    import { THEMES } from '../stores/ThemeConfig.js';

    $: format = $webConfig?.info?.format;
    $: rounds = format?.rounds || [];
    $: theme = $webConfig?.theme || THEMES.DEFAULT;
    let selectedRound = null; 

    // Function to parse a date in "day-month-year" format (e.g., "7-12-24")
    function parseDate(dateString) {
        if (!dateString) return new Date(); 
        const [day, month, year] = dateString.split('-');
        const fullYear = year.length === 2 ? `20${year}` : year;
        const parsedDate = new Date(`${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
        if (isNaN(parsedDate)) {
            console.error(`Invalid date: ${dateString}`);
            return new Date(); 
        }
        return parsedDate;
    }

    // Function to get the status based on dates
    function getRoundStatus(round) {
        const now = new Date();
        const startDate = parseDate(round.startDate);
        const endDate = parseDate(round.endDate);

        if (now < startDate) return 'upcoming';
        if (now >= startDate && now <= endDate) return 'active';
        return 'completed';
    }

    // Function to format dates (e.g., "7 Nov 2024 - 10 Nov 2024")
    function formatDates(startDate, endDate) {
        if (!startDate || !endDate) return 'Dates not available';

        try {
            const options = { day: 'numeric', month: 'short', year: 'numeric' };
            const start = parseDate(startDate).toLocaleDateString('en-GB', options);
            const end = parseDate(endDate).toLocaleDateString('en-GB', options);
            return `${start} - ${end}`;
        } catch (error) {
            console.error('Error formatting dates:', error);
            return 'Invalid dates';
        }
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
        <div class="flex items-center gap-6 overflow-x-auto sm:overflow-visible">
            {#each rounds as round, index}
            <div class="flex flex-col items-center -ml-[24px] gap-5"  >
                <div class="flex flex-row  w-full ml-[100px] items-center">
                    <div
                        on:click={() => (selectedRound = round)}
                        class="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center cursor-pointer"
                        style:background-color={selectedRound === round ? theme.colors.primary : `${theme.colors.foreground}33`}
                        style:border={selectedRound === round ? `2px solid ${theme.colors.primary}` : 'none'}
                        style:color={selectedRound === round ? theme.colors.background : theme.colors.foreground}
                    >
                    </div>
                    {#if index !== rounds.length - 1} 
                    <div
                        class="h-[2px]"
                        style:background-color={`${theme.colors.primary}33`}
                        style="width:100%;"
                    ></div>
                    {/if}
                    </div>
                    <div class="text-center mr-6">
                        <h3
                            class="text-xs font-semibold"
                            style:color={theme.colors.foreground}
                        >
                            {round.roundName}
                        </h3>
                        <p
                            class="text-xs whitespace-nowrap ml-4"
                            style:color={`${theme.colors.foreground}99`}
                        >
                            {formatDates(round.startDate, round.endDate)}
                        </p>
                    </div>
                </div>
            {/each}
        </div>

        {#if selectedRound}
            <div
                class="mt-8 p-4 rounded-lg"
                style:background-color={`${theme.colors.foreground}0a`}
            >
                <p
                    class="text-sm lg:text-base"
                    style:color={theme.colors.foreground}
                >
                    {selectedRound.roundDescription}
                </p>
            </div>
        {/if}
    </div>
</div>


<style>
    div {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }

    .cursor-pointer:hover {
        transform: scale(1.1);
        transition: transform 0.2s ease-in-out;
    }
</style>
