<script>
	import OverviewKIT from './OverviewKIT.svelte';
import {Tab, Tabs, TabList, TabPanel } from './Tabs/tabs.js';
    export let data = {};
    let webconfigObject = JSON.parse(data.websiteConfig);
    console.log(webconfigObject)
</script>
<Tabs>
    <TabList>
        <Tab>Overview</Tab>
        <Tab>Format</Tab>
        <Tab>Schedule</Tab>
        <Tab>Teams</Tab>
        <Tab>Leaderboard</Tab>
        <Tab>Videos</Tab>
    </TabList>
    <TabPanel>
        <OverviewKIT/>
    </TabPanel>
    <TabPanel>
        Format
    </TabPanel>
    <TabPanel>
        Schedule
    </TabPanel>
    <TabPanel>
        Teams
    </TabPanel>
    <TabPanel>
        Leaderboard
    </TabPanel>
    <TabPanel>
        Videos
    </TabPanel>
</Tabs>