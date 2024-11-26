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
                        <svg xmlns="http://www.w3.org/2000/svg" width="330" height="304" viewBox="0 0 330 304" fill="none">
                            <path d="M246.143 111.38C251.446 111.267 257.174 110.606 263.054 109.898C263.427 109.853 263.801 109.808 264.176 109.763C269.709 109.094 275.365 108.411 280.955 108.116C292.898 107.485 304.437 108.631 313.681 115.39C320.864 121.128 325.694 129.299 327.259 138.358L327.26 138.367L327.262 138.376C330.52 153.829 330.327 173.025 325.985 190.863C321.643 208.707 313.167 225.128 299.917 235.107L300.218 235.506L299.917 235.107C285.488 245.981 267.542 250.519 248.978 251.694C230.416 252.869 211.278 250.68 194.498 248.135C156.198 242.32 118.059 232.231 83.3389 214.885L83.3387 214.885C68.3031 207.381 51.9585 197.88 37.926 186.118C23.8918 174.354 12.1964 160.35 6.41643 143.844L6.41623 143.843C2.55647 132.863 -0.0990996 119.583 0.616725 106.956C1.33233 94.3318 5.41243 82.4072 14.9708 74.0459C26.3599 64.5965 40.4942 59.074 55.2728 58.2995L55.2728 58.2996L55.2814 58.299C70.3307 57.2497 80.8311 64.1898 92.5786 73.0564C110.516 86.7053 130.663 98.5234 152.625 104.618C174.996 110.849 198.866 111.799 222.32 111.799L222.323 111.799C230.33 111.743 238.308 111.575 246.143 111.38ZM246.143 111.38C246.143 111.38 246.142 111.38 246.142 111.38L246.131 110.88M246.143 111.38C246.144 111.38 246.144 111.38 246.144 111.38L246.131 110.88M246.131 110.88C251.742 110.761 257.839 110.024 264.12 109.266C281.459 107.171 300.202 104.908 313.985 114.993M246.131 110.88C238.297 111.076 230.322 111.243 222.32 111.299L313.985 114.993M313.985 114.993C321.267 120.807 326.165 129.09 327.751 138.273L313.985 114.993Z" fill="#151515" stroke="#323232"/>
                            <path d="M267.195 296.645C267.171 296.68 267.102 296.759 266.914 296.874C266.617 297.057 266.143 297.254 265.473 297.458C264.141 297.864 262.153 298.262 259.561 298.645C254.384 299.408 246.879 300.097 237.589 300.677C219.015 301.836 193.346 302.553 164.988 302.553C136.631 302.553 110.962 301.836 92.3873 300.677C83.0979 300.097 75.593 299.408 70.416 298.645C67.824 298.262 65.8355 297.864 64.5036 297.458C63.834 297.254 63.3598 297.057 63.063 296.874C62.8746 296.759 62.806 296.68 62.7819 296.645C62.806 296.61 62.8746 296.532 63.063 296.416C63.3598 296.234 63.834 296.036 64.5036 295.832C65.8355 295.426 67.824 295.028 70.416 294.646C75.593 293.882 83.0979 293.193 92.3873 292.613C110.962 291.455 136.631 290.738 164.988 290.738C193.346 290.738 219.015 291.455 237.589 292.613C246.879 293.193 254.384 293.882 259.561 294.646C262.153 295.028 264.141 295.426 265.473 295.832C266.143 296.036 266.617 296.234 266.914 296.416C267.102 296.532 267.171 296.61 267.195 296.645Z" fill="#151515" stroke="#323232"/>
                            <path d="M314.073 69.0214C314.073 70.2597 313.069 71.2635 311.831 71.2635C310.593 71.2635 309.589 70.2597 309.589 69.0214C309.589 67.7831 310.593 66.7793 311.831 66.7793C313.069 66.7793 314.073 67.7831 314.073 69.0214Z" fill="#5A5A5A" stroke="#323232"/>
                            <path d="M195.825 49.4897C195.825 50.728 194.821 51.7318 193.582 51.7318C192.344 51.7318 191.34 50.728 191.34 49.4897C191.34 48.2514 192.344 47.2476 193.582 47.2476C194.821 47.2476 195.825 48.2514 195.825 49.4897Z" fill="#5A5A5A" stroke="#323232"/>
                            <path d="M84.0381 230.021V242.081" stroke="#323232" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M78.0239 236.038H90.0557" stroke="#323232" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M39.9136 1V13.0597" stroke="#323232" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M33.8965 7.01685H45.9282" stroke="#323232" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M258.024 63.0059V75.0376" stroke="#323232" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M252.007 69.02H264.067" stroke="#323232" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M149.123 224.089C162.049 242.161 181.613 254.371 203.527 258.043C225.44 261.714 247.915 256.548 266.026 243.676C268.27 242.094 270.427 240.395 272.49 238.583L305.871 248.629L293.084 211.246C299.467 197.885 302.202 183.072 301.011 168.312C299.82 153.552 294.746 139.37 286.303 127.204C277.86 115.039 266.35 105.323 252.94 99.043C239.529 92.763 224.696 90.1423 209.946 91.4467C195.195 92.7512 181.052 97.9344 168.952 106.47C156.852 115.006 147.225 126.591 141.049 140.05C134.872 153.508 132.366 168.361 133.784 183.101C135.202 197.841 140.494 211.943 149.123 223.978V224.089Z" fill="#272727" stroke="#323232" stroke-miterlimit="10"/>
                            <path d="M251.45 175.403C251.45 178.187 249.193 180.443 246.41 180.443C243.626 180.443 241.37 178.187 241.37 175.403C241.37 172.619 243.626 170.363 246.41 170.363C249.193 170.363 251.45 172.619 251.45 175.403Z" fill="#5A5A5A" stroke="#323232"/>
                            <path d="M224.729 175.403C224.729 178.187 222.472 180.443 219.689 180.443C216.905 180.443 214.648 178.187 214.648 175.403C214.648 172.619 216.905 170.363 219.689 170.363C222.472 170.363 224.729 172.619 224.729 175.403Z" fill="#5A5A5A" stroke="#323232"/>
                            <path d="M198.035 175.403C198.035 178.187 195.778 180.443 192.995 180.443C190.211 180.443 187.955 178.187 187.955 175.403C187.955 172.619 190.211 170.363 192.995 170.363C195.778 170.363 198.035 172.619 198.035 175.403Z" fill="#5A5A5A" stroke="#323232"/>
                            <path d="M176.487 167.011C163.561 185.083 143.997 197.292 122.083 200.964C100.17 204.635 77.6945 199.469 59.5837 186.597C57.3453 184.974 55.1628 183.295 53.1202 181.505L19.7671 191.634L32.5263 154.251C26.1463 140.889 23.4147 126.076 24.6087 111.316C25.8027 96.5566 30.8798 82.3754 39.3248 70.2118C47.7698 58.0482 59.2822 48.335 72.6936 42.0578C86.1051 35.7806 100.938 33.1628 115.688 34.4701C130.438 35.7774 144.58 40.9632 156.679 49.5014C168.777 58.0395 178.402 69.6261 184.576 83.0854C190.75 96.5447 193.253 111.398 191.833 126.137C190.412 140.877 185.118 154.978 176.487 167.011Z" fill="#272727" stroke="#323232" stroke-miterlimit="10"/>
                            <path d="M84.374 134.553C86.8569 130.359 90.3802 126.877 94.6031 124.443C98.826 122.01 103.606 120.708 108.479 120.663C113.353 120.618 118.155 121.831 122.423 124.186C126.69 126.541 130.277 129.958 132.837 134.105" stroke="#323232" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M143.417 106.04C143.417 107.942 141.874 109.485 139.972 109.485C138.069 109.485 136.526 107.942 136.526 106.04C136.526 104.137 138.069 102.594 139.972 102.594C141.874 102.594 143.417 104.137 143.417 106.04Z" fill="#5A5A5A" stroke="#323232"/>
                            <path d="M80.9355 106.04C80.9355 107.942 79.393 109.485 77.4902 109.485C75.5874 109.485 74.0449 107.942 74.0449 106.04C74.0449 104.137 75.5874 102.594 77.4902 102.594C79.393 102.594 80.9355 104.137 80.9355 106.04Z" fill="#5A5A5A" stroke="#323232"/>
                            </svg>
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