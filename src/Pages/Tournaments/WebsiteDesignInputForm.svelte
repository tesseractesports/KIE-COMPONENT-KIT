<script>
	import { Test } from 'kie-ui-kit';
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    import Input from '../../Components/Form/Input.svelte';
    import Textarea from '../../Components/Form/Textarea.svelte';
    import { Route, router } from "tinro";
    import UploadBox from '../../Components/Form/UploadBox.svelte';
    import { RESTClient } from "../../Utils/RESTClient";
    const rest = new RESTClient("tournament");
    export let tournament;
    // console.log(tournament)
    
    
    let formData = {
        banner: {
            title: "",
            description: "",
            logo: "",
            background: "",
        },
        info: {
            overview: {
                isEnabled: true,
                videoTitle: '',
                videoUrl: '',
                videoThumbnail: '',
                aboutTournament: '',
                startDate: '',
                endDate: '',
                totalTeams: '',
                location: ''
            },
            format: {
                isEnabled: true,
                rounds : [
                    { roundName: '', roundDescription: '', startDate: '', endDate: '' }
                ]
            },
            schedule: {
                isEnabled: true,
            },
            teams: {
                isEnabled: true,
            },
            leaderboard: {
                isEnabled: true,
            },
            videos: {
                isEnabled: true,
                videos:[{ videoTitle: '', videoUrl: '', videoThumbnail: '' }]},
            support: false
        },
        prizePool: {
            totalPrize: '',
            rightCharacter: '',
            background: '',
            prizeDetails: [
                { positionTitle: '', positionPrize: '' }
            ],
            specialRewards: [
                { positionTitle: '', positionPrize: '' }
            ]
        },
        highlights: [
            { videoTitle: '', videoUrl: '', videoThumbnail: '' }
        ]
    };

    // Function to add a new format entry
    function addNewFormat() {
        formData.info.format.rounds = [
            ...formData.info.format.rounds,
            { roundName: '', roundDescription: '', startDate: '', endDate: '' }
        ];
    }

    function addNewVideo() {
        formData.info.videos.videos = [
            ...formData.info.videos.videos,
            { videoTitle: '', videoUrl: '', videoThumbnail: '' }
        ];
    }

    // Function to add new entries to prize pool details
    function addNewPrizeDetail() {
        formData.prizePool.prizeDetails = [
            ...formData.prizePool.prizeDetails,
            { positionTitle: '', positionPrize: '' }
        ];
    }

    // Function to add new entries to special rewards
    function addNewSpecialReward() {
        formData.prizePool.specialRewards = [
            ...formData.prizePool.specialRewards,
            { positionTitle: '', positionPrize: '' }
        ];
    }

    // Function to add new highlight entries
    function addNewHighlight() {
        formData.highlights = [
            ...formData.highlights,
            { videoTitle: '', videoUrl: '', videoThumbnail: '' }
        ];
    }

    async function saveDraft() {
        try {
            console.log(formData)
            const response = await rest.put(`/website-config/${tournament._id}`, {'websiteConfig': JSON.stringify(formData)});
            console.log("Draft saved successfully:", response);
            return response;
        } catch (error) {
            console.error("Failed to save draft:", error);
            throw error; // Re-throw if you want error propagation
        }
    }

    // Example publish to live function
    async function publishLive() {
        alert();
    }
    onMount (()=> {
        if (!tournament || tournament.status != "accepted") {
            router.goto("/tournaments/all")
        };
        if (Object.keys(JSON.parse(tournament.websiteConfig)).length != 0 ) {
            formData = JSON.parse(tournament.websiteConfig);
        }
    }) 
</script>
<div class="">
    <!-- Form Sections for each part, using two-way binding with formData -->
    <form  class="space-y-6" on:submit|preventDefault={saveDraft}>
        <div>
            <div class="md:flex md:items-center md:justify-between mb-2">
              <div class="min-w-0 flex-1">
                <h2 class="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"></h2>
              </div>
              <div class="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
                <button type="button" on:click={saveDraft} class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Save</button>
                <button type="button" class="inline-flex items-center rounded-md bg-white ml-3 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Preview</button>
                <button type="button" on:click={publishLive} class="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Publish to Live</button>
              </div>
            </div>
        </div>
        <!-- Banner Section -->
        <section class="bg-white p-4 rounded shadow mb-4">
            <h2 class="text-xl font-semibold mb-4">Banner Section</h2>
            <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <Input
                  type="text"
                  label="Title"
                  bind:value={formData.banner.title}
                />
              </div>
              <div class="sm:col-span-3">
                <Textarea
                  label="Description"
                  bind:value={formData.banner.description}
                />
              </div>
              <div class="sm:col-span-3">
                <UploadBox
                  label="Upload Logo"
                  accept="image/png, image/jpg, image/jpeg"
                  bind:uploadUrl={formData.banner.logo}
                  helpText="Only JPG, JPEG or PNG allowed"
                />
              </div>
              <div class="sm:col-span-3">
                <UploadBox
                  label="Upload Background"
                  accept="image/png, image/jpg, image/jpeg"
                  bind:uploadUrl={formData.banner.background}
                  helpText="Only JPG, JPEG or PNG allowed"
                />
              </div>
            </div>
          </section>
        <!-- Info section -->
        <section class="bg-white p-4 rounded shadow mb-4">
            <h2 class="text-xl font-semibold mb-2">Info Section</h2>
            
            <!-- Overview -->
            <div class="bg-gray-100 rounded p-4 my-2 gap-2">
                <div class="flex justify-between py-3">
                    <h2 class="text-base font-semibold mb-2">Overview</h2>
                    <div class=" relative">
                        <label class="inline-flex items-center mb-5 cursor-pointer" for="enable_overview">
                            <input type="checkbox" id="enable_overview" name="enable_overview" bind:checked={formData.info.overview.isEnabled} value={formData.info.overview.isEnabled} class="sr-only peer">
                            <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    
                </div>
                <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                        <Input type="text" label="Video Title" bind:value={formData.info.overview.videoTitle} />
                    </div>
                    <div class="sm:col-span-3">
                        <Input type="text" label="Video Url" bind:value={formData.info.overview.videoUrl} />
                    </div>
                    <div class="sm:col-span-6">
                        <UploadBox bind:uploadUrl={formData.info.overview.videoThumbnail} label="Upload Video Thumbnail" fileName="Upload document" accept="image/png, image/jpg, image/jpeg" />
                    </div>
                    <div class="sm:col-span-6">
                        <Textarea label="About this tournament" bind:value={formData.info.overview.aboutTournament} />
                    </div>
                    <div class="sm:col-span-2">
                        <Input type="date" label="Start Date" bind:value={formData.info.overview.startDate} />
                    </div>
                    <div class="sm:col-span-2">
                        <Input type="date" label="End Date" bind:value={formData.info.overview.endDate} />
                    </div>
                    <div class="sm:col-span-2">
                        <Input type="text" label="Total Teams" bind:value={formData.info.overview.totalTeams} />
                    </div>
                    <div class="sm:col-span-6">
                        <Textarea label="Location" bind:value={formData.info.overview.location} />
                    </div>
                </div>
            </div>
        
            <!-- Format Section with Add More -->
            <div class="bg-gray-100 rounded p-4 my-2 gap-2">
                <div class="flex justify-between py-3">
                    <h2 class="text-base font-semibold mb-2">Format</h2>
                    <div class=" relative">
                        <label class="inline-flex items-center mb-5 cursor-pointer" for="enable_format">
                            <input 
                                type="checkbox" 
                                id="enable_format" 
                                name="enable_format" 
                                bind:checked={formData.info.format.isEnabled} 
                                class="sr-only peer"
                            />
                            <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    
                </div>
                {#each formData.info.format.rounds as format, index}
                    <div class="bg-white rounded p-4 my-2 gap-2">
                        <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
                            <div class="sm:col-span-3">
                                <Input type="text" label="Round Name" bind:value={format.roundName} />
                            </div>
                            <div class="sm:col-span-6">
                                <Textarea label="Round Description" bind:value={format.roundDescription} />
                            </div>
                            <div class="sm:col-span-3">
                                <Input type="date" label="Start Date" bind:value={format.startDate} />
                            </div>
                            <div class="sm:col-span-3">
                                <Input type="date" label="End Date" bind:value={format.endDate} />
                            </div>
                        </div>
                    </div>
                {/each}
                <div class="relative">
                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                      <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center">
                        <button
                            type="button"
                            on:click={addNewFormat}
                            class="inline-flex items-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            + Add more
                        </button>
                    </div>
                </div>
            </div>
            <div class=" bg-gray-100 rounded p-4 my-2 gap-2">
                <div class=" flex justify-between py-3">
                    <h2 class="text-base font-semibold mb-2">Schudule</h2>
                    <div class=" relative">
                        <label class="inline-flex items-center mb-5 cursor-pointer" for="enable_Schudule">
                            <input 
                                type="checkbox" 
                                id="enable_Schudule" 
                                name="enable_Schudule" 
                                bind:checked={formData.info.schedule.isEnabled} 
                                class="sr-only peer"
                            />
                            <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    
                </div>
            </div>
            <div class=" bg-gray-100 rounded p-4 my-2 gap-2">
                <div class=" flex justify-between py-3">
                    <h2 class="text-base font-semibold mb-2">Teams</h2>
                    <div class=" relative">
                        <label class="inline-flex items-center mb-5 cursor-pointer" for="enable_Teams">
                            <input 
                                type="checkbox" 
                                id="enable_Teams" 
                                name="enable_Teams" 
                                bind:checked={formData.info.teams.isEnabled} 
                                class="sr-only peer"
                            />
                            <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    
                </div>
            </div>
            <div class=" bg-gray-100 rounded p-4 my-2 gap-2">
                <div class=" flex justify-between py-3">
                    <h2 class="text-base font-semibold mb-2">Leaderboard</h2>
                    <div class=" relative">
                        <label class="inline-flex items-center mb-5 cursor-pointer" for="enable_Leaderboard">
                            <input 
                                type="checkbox" 
                                id="enable_Leaderboard" 
                                name="enable_Leaderboard" 
                                bind:checked={formData.info.leaderboard.isEnabled} 
                                class="sr-only peer"
                            />
                            <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    
                </div>
            </div>
            <!-- Videos Section with Add More -->
            <div class="bg-gray-100 rounded p-4 my-2 gap-2">
                <div class="flex justify-between py-3">
                    <h2 class="text-base font-semibold mb-2">Videos</h2>
                    <div class=" relative">
                        <label class="inline-flex items-center mb-5 cursor-pointer" for="enable_Videos">
                            <input 
                                type="checkbox" 
                                id="enable_Videos" 
                                name="enable_Videos" 
                                bind:checked={formData.info.videos.isEnabled} 
                                class="sr-only peer"
                            />
                            <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
                {#each formData.info.videos.videos as video, index}
                    <div class="bg-white rounded p-4 my-2 gap-2">
                        <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
                            <div class="sm:col-span-3">
                                <Input type="text" label="Video Title" bind:value={video.videoTitle} />
                            </div>
                            <div class="sm:col-span-3">
                                <Input type="text" label="Video Url" bind:value={video.videoUrl} />
                            </div>
                            <div class="sm:col-span-6">
                                <UploadBox
                                    bind:uploadUrl={video.videoThumbnail}
                                    label="Upload Video Thumbnail"
                                    fileName="Upload document"
                                    accept="image/png, image/jpg, image/jpeg"
                                />
                            </div>
                        </div>
                    </div>
                {/each}
                <div class="relative">
                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                      <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center">
                        <button
                            type="button"
                            on:click={addNewVideo}
                            class="inline-flex items-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            + Add more
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Prize pool -->
        <section class="bg-white p-4 rounded shadow mb-4">
            <h2 class="text-xl font-semibold mb-4">Prize Pool</h2>
            <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
                <div class="sm:col-span-3">
                    <UploadBox
                        label="Upload Right Character"
                        fileName="Upload document"
                        helpText="Only JPG, JPEG or PNG Only"
                        accept="image/png, image/jpg, image/jpeg"
                        bind:uploadUrl={formData.prizePool.rightCharacter}
                    />
                </div>
                <div class="sm:col-span-3">
                    <UploadBox
                        label="Upload Background"
                        fileName="Upload document"
                        helpText="Only JPG, JPEG or PNG Only"
                        accept="image/png, image/jpg, image/jpeg"
                        bind:uploadUrl={formData.prizePool.background}
                    />
                </div>
                <div class="sm:col-span-3">
                    <Input type="text" label="Total Prize Pool" bind:value={formData.prizePool.totalPrize} />
                </div>
            </div>
        
            <!-- Prize Pool Details Section -->
            <div>
                <div class="flex justify-between py-3">
                    <h2 class="text-base font-semibold mb-2">Prize Pool Details</h2>
                </div>
                {#each formData.prizePool.prizeDetails as prize, index}
                    <div class="bg-gray-100 rounded p-4 my-2 gap-2">
                        <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
                            <div class="sm:col-span-3">
                                <Input type="text" label="Position Title" bind:value={prize.positionTitle} />
                            </div>
                            <div class="sm:col-span-3">
                                <Input type="text" label="Position Prize" bind:value={prize.positionPrize} />
                            </div>
                        </div>
                    </div>
                {/each}
                <div class="relative">
                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                      <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center">
                        <button
                            type="button"
                            on:click={addNewPrizeDetail}
                            class="inline-flex items-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            + Add more
                        </button>
                    </div>
                </div>
                
            </div>
        
            <!-- Special Rewards Section -->
            <div>
                <div class="flex justify-between py-3">
                    <h2 class="text-base font-semibold mb-2">Special Rewards</h2>
                </div>
                {#each formData.prizePool.specialRewards as reward, index}
                    <div class="bg-gray-100 rounded p-4 my-2 gap-2">
                        <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
                            <div class="sm:col-span-3">
                                <Input type="text" label="Position Title" bind:value={reward.positionTitle} />
                            </div>
                            <div class="sm:col-span-3">
                                <Input type="text" label="Position Prize" bind:value={reward.positionPrize} />
                            </div>
                        </div>
                    </div>
                {/each}
                <div class="relative">
                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                      <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center">
                        <button
                            type="button"
                            on:click={addNewSpecialReward}
                            class="inline-flex items-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            + Add more
                        </button>
                    </div>
                </div>
                
            </div>
        </section>
        <!-- Highlights -->
        <section class="bg-white p-4 rounded shadow mb-4">
            <h2 class="text-xl font-semibold mb-4">Highlights</h2>
            {#each formData.highlights as highlight, index}
                <div class="bg-gray-100 rounded p-4 my-2 gap-2">
                    <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
                        <div class="sm:col-span-3">
                            <Input type="text" label="Video Title" bind:value={highlight.videoTitle} />
                        </div>
                        <div class="sm:col-span-3">
                            <Input type="text" label="Video Url" bind:value={highlight.videoUrl} />
                        </div>
                        <div class="sm:col-span-6">
                            <UploadBox
                                label="Upload Video Thumbnail"
                                fileName="Upload document"
                                helpText="Only JPG, JPEG or PNG Only"
                                accept="image/png, image/jpg, image/jpeg"
                                bind:uploadUrl={highlight.videoThumbnail}
                            />
                        </div>
                    </div>
                </div>
            {/each}
            <div class="relative">
                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center">
                    <button
                    type="button"
                    on:click={addNewHighlight}
                    class="inline-flex items-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    + Add more
                </button>
                </div>
            </div>
        </section>
    </form>
</div>
