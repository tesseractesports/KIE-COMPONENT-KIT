<script>
  import SectionKit from "./SectionKIT.svelte";
  import { webConfig } from '../stores/webConfig.js';
  import { THEMES } from "../stores/ThemeConfig";
  import Svgc from "./Svgc.svelte";

  $: leaderboard = $webConfig?.info?.leaderboard;
    $: theme = $webConfig?.theme || THEMES.DEFAULT;
</script>

<div 
    class="w-full py-6 sm:py-8 md:py-10 flex-col justify-start items-start gap-4 sm:gap-5 md:gap-6 lg:gap-7 inline-flex overflow-hidden px-6"
    style:background-color={theme.colors.background}
>
    <!-- Filters Section -->
    <div class="w-full justify-start items-center gap-2 sm:gap-3 inline-flex">
        {#each Object.keys(leaderboard?.filterOptions || {}) as filter}
            <div 
                class="pl-4 pr-3 py-2 rounded-md shadow border justify-center items-center gap-2 flex relative w-full sm:w-auto"
                style:background-color={theme.colors.background}
                style:border-color={theme.colors.primary}
            >
                <select
                    class="appearance-none text-xs sm:text-sm font-medium leading-tight border-none focus:ring-0 pr-8 w-full sm:w-auto"
                    style:background-color={theme.colors.background}
                    style:color={theme.colors.foreground}
                >
                    <option value="">{filter}</option>
                    {#each leaderboard?.filterOptions[filter] || [] as option}
                        <option value={option}>{option}</option>
                    {/each}
                </select>
                <div class="pointer-events-none absolute right-3"
                    style:color={theme.colors.foreground}>

                    <Svgc type="downarrow" />
                </div>
            </div>
        {/each}
    </div>

    <!-- Table Section -->
    <div class="w-full flex-col justify-start items-start gap-4 md:gap-5 flex overflow-x-auto whitespace-nowrap">
        <table class="w-full border-collapse px-6" style:background-color={theme.colors.background}>
            <thead>
                <tr>
                    {#each leaderboard?.head || [] as header}
                        <th 
                            class="px-6 py-3 text-xs font-medium uppercase leading-none tracking-wide text-left"
                            style:background-color={theme.colors.background}
                            style:color={theme.colors.primary}
                        >
                            {header}
                        </th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each leaderboard?.rows || [] as row, index}
                    <tr
                        class="transition duration-300 hover:bg-opacity-50"
                        style:background-color={index % 2 === 0 ? theme.colors.background : theme.colors.foreground}
                        style:background-opacity={index % 2 === 0 ? '1' : '0.05'}
                    >
                        <td class="px-6 py-5 text-sm font-medium leading-tight"
                            style:color={theme.colors.foreground}>
                            {index + (row.startingRank || 1)}
                        </td>
                        <td class="px-6 py-5 text-sm font-medium leading-tight"
                            style:color={theme.colors.foreground}>
                            <img class="rounded-xl inline-block mr-2"
                                 src={row.team?.logo} 
                                 alt={row.team?.name} />
                            <span>{row.team?.name}</span>
                        </td>
                        <td class="px-6 py-5 text-sm font-normal"
                            style:color={theme.colors.foreground}>
                            {row.group}
                        </td>
                        <td class="px-6 py-5 text-sm font-normal"
                            style:color={theme.colors.foreground}>
                            {row.matches}
                        </td>
                        <td class="px-6 py-5 text-sm font-normal"
                            style:color={theme.colors.foreground}>
                            {row.points}
                        </td>
                        <td class="px-6 py-5 text-sm font-normal"
                            style:color={theme.colors.foreground}>
                            {row.status}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>