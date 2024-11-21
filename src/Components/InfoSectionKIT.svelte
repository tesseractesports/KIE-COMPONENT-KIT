<script>
    import OverviewKIT from './OverviewKIT.svelte';
    import { Tab, Tabs, TabList, TabPanel } from './Tabs/tabs.js';

    export let data = {};
    // let webconfigObject = JSON.parse(data.websiteConfig);

    // Set the data object with default values or external data
    data = {
        "banner": {
            "title": "IQOO BMPS 2024",
            "description": "",
            "logo": "",
            "background": "",
            "largeBackground": false,
            "largeBackgroundUrl": "",
            "liveChannerUrl": ""
        },
        "info": {
            "overview": {
                "isEnabled": true,
                "videoTitle": "",
                "videoUrl": "",
                "videoThumbnail": "",
                "aboutTournament": "This is a great tournament",
                "startDate": "2024-01-01",
                "endDate": "2024-02-01",
                "totalTeams": "16",
                "location": "Online"
            },
            "format": {
                "isEnabled": true,
                "rounds": [
                    {
                        "roundName": "Round 1",
                        "roundDescription": "Introductory round",
                        "startDate": "2024-01-01",
                        "endDate": "2024-01-05"
                    }
                ]
            },
            "schedule": {
                "isEnabled": false
            },
            "teams": {
                "isEnabled": false
            },
            "leaderboard": {
                "isEnabled": false
            },
            "videos": {
                "isEnabled": true,
                "videos": [
                    {
                        "videoTitle": "Introduction Video",
                        "videoUrl": "https://example.com/video1",
                        "videoThumbnail": "https://example.com/thumb1.jpg"
                    }
                ]
            },
            "support": false
        }
    };

    // Dynamically generate tab content based on data sections
    const tabs = [
        { name: "Overview", key: "overview", component: OverviewKIT },
        { name: "Format", key: "format", component: null },
        { name: "Schedule", key: "schedule", component: null },
        { name: "Teams", key: "teams", component: null },
        { name: "Leaderboard", key: "leaderboard", component: null },
        { name: "Videos", key: "videos", component: null }
    ];

</script>

<Tabs>
    <TabList>
        {#each tabs as { name, key } }
            {#if data.info[key]?.isEnabled}
                <Tab>{name}</Tab>
            {/if}
        {/each}
    </TabList>

    {#each tabs as { name, key, component } }
        {#if data.info[key]?.isEnabled}
            <TabPanel>
                {#if component}
                <!-- {JSON.stringify(data.info[key])}  -->
                    <component {...data.info[key]} />
                {:else}
                    <p>No content available for {name}.</p>
                {/if}
            </TabPanel>
        {/if}
    {/each}
</Tabs>
