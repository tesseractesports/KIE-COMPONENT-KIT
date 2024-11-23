<script>
	import VideosKIT from './../Components/VideosKIT.svelte';
	import FormatKIT from './../Components/FormatKIT.svelte';
    import LeaderBoardKIT from './../Components/LeaderBoardKIT.svelte';
    import SectionKIT from './SectionKIT.svelte';
    import OverviewKIT from './OverviewKIT.svelte';
    import { Tab, Tabs, TabList, TabPanel } from './Tabs/tabs.js';
    import { webConfig } from '../stores/webConfig';

    $: infoData = $webConfig?.info;
    console.log(infoData)
    // Check if specific section has data
    function hasSectionData(sectionKey) {
        const section = infoData?.[sectionKey];
        if (!section) return false;

        switch (sectionKey) {
            case 'overview':
                return Boolean(
                    section.videoTitle || 
                    section.aboutTournament || 
                    section.startDate || 
                    section.endDate || 
                    section.totalTeams || 
                    section.location
                );
            case 'format':
                return Boolean(section.rounds?.length);
            case 'leaderboard':
                return Boolean(section.rows?.length);
            case 'videos':
                return Boolean(section.videos?.length);
            default:
                return false;
        }
    }

    // Get enabled tabs from store
    $: tabs = [
        { name: "Overview", key: "overview", component: OverviewKIT },
        { name: "Format", key: "format", component: FormatKIT },
        { name: "Schedule", key: "schedule", component: null },
        { name: "Teams", key: "teams", component: null },
        { name: "Leaderboard", key: "leaderboard", component: LeaderBoardKIT },
        { name: "Videos", key: "videos", component: VideosKIT }
    ].filter(tab => infoData?.[tab.key]?.isEnabled);
</script>

<Tabs>
    <TabList>
        {#each tabs as tab}
            <Tab>{tab.name}</Tab>
        {/each}
    </TabList>
    
    <div class="bg-[#151515]">
        {#each tabs as tab}
        <SectionKIT>
            <TabPanel>
                {#if hasSectionData(tab.key)}
                    {#if tab.component}
                        <svelte:component 
                            this={tab.component}
                        />
                    {:else}
                        <div>Content for {tab.name} tab</div>
                    {/if}
                {:else}
                    <div class="flex flex-col items-center justify-center min-h-[400px] bg-[#1d1d1d] p-6">
                       <img src="/assets/images/Group 4.png" alt="Zero state">
                        <h3 class="text-lg font-semibold text-white mb-2">
                            No {tab.name} Data Available
                        </h3>
                        <p class="text-[#888888] text-center max-w-md">
                            {#if tab.key === 'overview'}
                                No tournament overview information is available at the moment.
                            {:else if tab.key === 'format'}
                                Tournament format details have not been added yet.
                            {:else if tab.key === 'schedule'}
                                Tournament schedule has not been published yet.
                            {:else if tab.key === 'teams'}
                                No teams have been added to this tournament yet.
                            {:else if tab.key === 'leaderboard'}
                                Leaderboard data will be available once the tournament begins.
                            {:else if tab.key === 'videos'}
                                No videos have been uploaded for this tournament yet.
                            {/if}
                        </p>
                    </div>
                {/if}
            </TabPanel>
        </SectionKIT>
    {/each}
    </div>
   
</Tabs>