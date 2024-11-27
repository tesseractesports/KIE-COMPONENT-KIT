<script>
    import { webConfig } from '../stores/webConfig.js';
    import { THEMES } from '../stores/ThemeConfig.js';
    import moment from 'moment';

    $: format = $webConfig?.info?.format;
    $: rounds = format?.rounds || [];
    $: theme = $webConfig?.theme || THEMES.DEFAULT;
    // Select the first round by default
    let selectedRound = null;
    $: if (rounds.length > 0 && !selectedRound) {
        selectedRound = rounds[0];
    }
    
</script>

<div class="w-full overflow-hidden" style:background-color={theme.colors.background}>
    <!-- Main Content Container -->
    <div class="w-full py-6 sm:py-8 md:py-10 flex-col justify-start items-start gap-10 px-6  lg:px-10 overflow-hidden">
        <!-- Format Description -->
        <div class="flex flex-col gap-3">
            <h2 
                class="text-sm font-semibold font-['Inter'] uppercase leading-tight tracking-wide py-2"
                style:color={theme.colors.primary}
            >
                TOURNAMENT FORMAT
            </h2>
            <p 
                class="text-sm lg:text-base font-normal font-['Inter'] py-2"
                style:color={theme.colors.foreground}
            >
                {format?.description || "Tournament format details and progression structure."}
            </p>
        </div>

        <!-- Rounds Timeline -->
        <div class="flex items-center gap-6 overflow-x-auto px-3 py-12">
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
                        {moment(round.startDate).format("DD MMM YYYY")} - {moment(round.endDate).format("DD MMM YYYY")}                        </p>
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
