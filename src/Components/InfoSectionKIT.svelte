<script>
	import SectionKIT from './SectionKIT.svelte';
    import OverviewKIT from './OverviewKIT.svelte';
    import { Tab, Tabs, TabList, TabPanel } from './Tabs/tabs.js';
    import { webConfig } from '../stores/webConfig';

    $: infoData = $webConfig?.info;

    // Get enabled tabs from store
    $: tabs = [
        { name: "Overview", key: "overview", component: OverviewKIT },
        { name: "Format", key: "format", component: null },
        { name: "Schedule", key: "schedule", component: null },
        { name: "Teams", key: "teams", component: null },
        { name: "Leaderboard", key: "leaderboard", component: null },
        { name: "Videos", key: "videos", component: null }
    ].filter(tab => infoData?.[tab.key]?.isEnabled);
</script>


    <Tabs>
            <TabList>
                {#each tabs as tab}
                    <Tab>{tab.name}</Tab>
                {/each}
            </TabList>
        {#each tabs as tab}
            <SectionKIT>
                <TabPanel>
                    {#if tab.component}
                        <svelte:component 
                            this={tab.component}
                        />
                    {:else}
                        <div>Content for {tab.name} tab</div>
                    {/if}
                </TabPanel>
            </SectionKIT>
        {/each}
    </Tabs>


