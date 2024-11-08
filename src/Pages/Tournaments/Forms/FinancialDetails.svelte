<script>
    import { RESTClient } from './../../../Utils/RESTClient.js';
    import UploadBox from './../../../Components/Form/UploadBox.svelte';
    import Input from "../../../Components/Form/Input.svelte";
    import Select from "../../../Components/Form/Select.svelte";
    import Textarea from "../../../Components/Form/Textarea.svelte";
    import { validateTotalPrizePool, validatePrize, validatePosition, validateSponsorName, validateCategory, validateContribution, validateWebsite, validateSocialMediaUrl, validateType } from "../../../Utils/tournamentValidations"
    import { sponsorCategoryOptions , sponsorContributionOptions } from '../dropdown.constants.js';

    export let tournament;
    $: (tournament) => {
        if (tournament._id) {
            const rest = new RESTClient("tournament");
            rest
                .get(`/tournament/${tournament._id}`)
                .then((response) => {
                    if (response.code) {

                    } else if (response) {
                        tournament = response;
                    }
                })
        }
    }

    let validTotalPrizePool = true;
    let totalPrizePoolError = "please enter valid prize pool";
    let totalPrizePoolTouched = false;
    let validTotalSum = true;
    let totalSumError = null;

    $: errors = tournament.financialDetails.prizeDivision.map(() => ({
        validPosition: true,
        validTotalPrize: true,
        positionTouched: false,
        totalPrizeTouched: false,
    }));

    $: specialPrizeErrors = tournament.financialDetails.specialPrize.map(() => ({
        validType: true,
        validPrize: true,
        typeTouched: false,
        PrizeTouched: false,
    }));

    let errors2 = [];

    function initializeErrors2() {
        errors2 = tournament.financialDetails.sponsors.map(() => ({
        validSponsorName: true,
        sponsorNameTouched: false,
        validCategory: true,
        categoryTouched: false,
        validContribution: true,
        contributionTouched: false,
        validWebsiteUrl: true,
        websiteUrlTouched: false,
        validSocialMediaurl1: true,
        socialMediaurl1Touched: false,
        validSocialMediaurl2: true,
        socialMediaurl2Touched: false,
    }));
}

$: initializeErrors2();

$: {
  if (tournament.financialDetails.sponsors.length !== errors2.length) {
    initializeErrors2();
  }
}



    export let disabled = true;
    $: disabled = !validTotalPrizePool ||
        !validTotalSum ||
        tournament.financialDetails.prizeDivision.some((t, index) =>
            !errors[index].validPosition ||
            !t.position ||
            !errors[index].validTotalPrize ||
            !t.totalPrize
        ) ||
        tournament.financialDetails.specialPrize.some((t, index) =>
            !specialPrizeErrors[index].validType ||
            !t.description ||
            !specialPrizeErrors[index].validPrize ||
            !t.prize
        ) ||
        (tournament.financialDetails.sponsors.length > 0 && tournament.financialDetails.sponsors.some((x, index) =>
            !errors2[index] || 
            !errors2[index].validSponsorName ||
            !x.name ||
            !errors2[index].validCategory ||
            !x.category ||
            !errors2[index].validContribution ||
            !x.contribution ||
            !errors2[index].validWebsiteUrl ||
            !x.websiteURL ||
            !errors2[index].validSocialMediaurl1 ||
            !x.socialMediaURL1 ||
            !errors2[index].validSocialMediaurl2 ||
            !x.socialMediaURL2
        ));

    const totalPrizePoolValidation = (value) => {
        validTotalPrizePool = totalPrizePoolTouched ? validateTotalPrizePool(value) : true;
        validateTotalPrize();
    }

    function positionValidation(index, value) {
        errors[index].positionTouched = true;
        errors[index].validPosition = value ? validatePosition(value) : false;
    }

    function typeValidation(index, value) {
        specialPrizeErrors[index].typeTouched = true;
        specialPrizeErrors[index].validType = value ? validateType(value) : false;
    //     errors[index].typeTouched = true;
    //     errors[index].validType = value ? validatePosition(value) : false;
    }

    function prizeDivisionValidation(index, value) {
        errors[index].totalPrizeTouched = true;
        errors[index].validTotalPrize = value ? validatePrize(value) : false;
        validateTotalPrize();
    }

    function prizeSpecialValidation(index, value) {
        specialPrizeErrors[index].PrizeTouched = true;
        specialPrizeErrors[index].validPrize = value ? validatePrize(value) : false;
        validateTotalPrize();
    }

    function sponsorNameValidation(index, value) {
        errors2[index].sponsorNameTouched = true;
        errors2[index].validSponsorName = value ? validateSponsorName(value) : false;
    }
    function categoryValidation(index, value) {
        errors2[index].categoryTouched = true;
        errors2[index].validCategory = value ? validateCategory(value) : false;
    }
    function contributionValidation(index, value) {
        errors2[index].contributionTouched = true;
        errors2[index].validContribution = value ? validateContribution(value) : false;
    }
    function websiteUrlValidation(index, value) {
        errors2[index].websiteUrlTouched = true;
        errors2[index].validWebsiteUrl = value ? validateWebsite(value) : false;
    }
    const socialMediaUrlValidation = (index, value, isUrl = true) => {
        if (isUrl) {
            errors2[index].socialMediaurl1Touched = true;
            errors2[index].validSocialMediaurl1 = value ? validateSocialMediaUrl(value) : false;
        } else {
            errors2[index].socialMediaurl2Touched = true;
            errors2[index].validSocialMediaurl2 = value ? validateSocialMediaUrl(value) : false;
        }
    };

    function handleSponsorship(event) {
        if (!event.target.checked) {
            tournament.financialDetails.sponsors = [{
                name: "",
                category: "",
                contribution: "",
                websiteURL: "",
                socialMediaURL1: "",
                socialMediaURL2: "",
            }]
        }
        else{
            tournament.financialDetails.sponsors = []
        }
        initializeErrors2(); 
    }



    function addPrizeDivision(event) {
        tournament.financialDetails.prizeDivision = [
            ...tournament.financialDetails.prizeDivision,
            {
                position: "",
                totalPrize: ""
            }
        ];
        errors = [
            ...errors,
            {
                validPosition: true,
                validTotalPrize: true,
                positionTouched: false,
                totalPrizeTouched: false,
            },
        ];
    }

    function addSpecialPrize(event) {
        tournament.financialDetails.specialPrize = [
            ...tournament.financialDetails.specialPrize,
            {
                description: "",
                prize: ""
            }
        ];
        specialPrizeErrors = [
            ...specialPrizeErrors,
            {
                validType: true,
                validPrize: true,
                typeTouched: false,
                prizeTouched: false,
            },
        ];
    }

    function removePrizeDivision(index) {
        if (tournament.financialDetails.prizeDivision.length > 1) {
            tournament.financialDetails.prizeDivision.splice(index, 1);
            errors = errors.filter((_, i) => i !== index);
            tournament = { ...tournament };     
            validateTotalPrize();      
        } else {
            alert('Each round must have at least one division.');
        }
    }

    function removeSpecialPrize(index) {
        if (tournament.financialDetails.specialPrize.length > 1) {
            tournament.financialDetails.specialPrize.splice(index, 1);
            errors = errors.filter((_, i) => i !== index);
            tournament = { ...tournament };     
            validateTotalPrize();      
        } else {
            alert('Each round must have at least one division.');
        }
    }

    function addSponsor(event) {
        tournament.financialDetails.sponsors = [
            ...tournament.financialDetails.sponsors,
            {
                name: "",
                category: "",
                contribution: "",
                websiteURL: "",
                socialMediaURL1: "",
                socialMediaURL2: ""
            }
        ];
        errors2 = [
            ...errors2,
            {
                validSponsorName: true,
                sponsorNameTouched: false,
                validCategory: true,
                categoryTouched: false,
                validContribution: true,
                contributionTouched: false,
                validWebsiteUrl: true,
                websiteUrlTouched: false,
                validSocialMediaurl1: true,
                socialMediaurl1Touched: false,
                validSocialMediaurl2: true,
                socialMediaurl2Touched: false,
            },
        ];
    }

    function removeSponsor(index) {
        if (tournament.financialDetails.sponsors.length > 1) {
            tournament.financialDetails.sponsors.splice(index, 1);
            errors2 = errors2.filter((_, i) => i !== index);
            tournament = { ...tournament };
        } else {
            alert('There must be at least one sponsor.');
        }
    }

    function validateTotalPrize() {
        let totalPrize = tournament.financialDetails.prizeDivision.reduce((acc, curr) => acc + +curr.totalPrize, 0);
         totalPrize += tournament.financialDetails.specialPrize.reduce((acc, curr) => acc + +curr.prize, 0);
        validTotalSum = totalPrize === +tournament.prizePool;
        if ( totalPrize < +tournament.prizePool ) {
            totalSumError = validTotalSum ? null : `Remaining Prize pool amount is ${+tournament.prizePool - totalPrize}`;
        } else if (totalPrize > +tournament.prizePool) {
            totalSumError = validTotalSum ? null : `Total Prize pool exceeds by ${totalPrize - +tournament.prizePool}`;
        }
    }

</script>

<div class="px-4 py-6 sm:p-8 space-y-6 bg-white">
    <div class="w-full border-b flex flex-col mb-2">
        <p class="font-normal text-xl">Financial Details</p>
        <span class="font-light text-sm text-gray-400 mb-2">We would like to know you more</span>
    </div>
    <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
        <div class="sm:col-span-3">
            <Input type="number" label="Total prize pool" bind:value={tournament.prizePool}
                showErrorIcon={false} error={!validTotalPrizePool} errorMessage={totalPrizePoolError} on:blur={()=>{
            totalPrizePoolTouched=true;
            totalPrizePoolValidation(tournament.prizePool)
            }}/>
        </div>
    </div>
    <div>
        <p class="block text-sm font-medium text-gray-600 mb-2">Prize pool division</p>
        <div class="bg-gray-50 rounded p-4">
            {#each tournament.financialDetails.prizeDivision as division, index}
            <div class="grid gap-x-6 grid-cols-1 sm:grid-cols-12">
                <div class="sm:col-span-5">
                    <Input type="number" label="Position" bind:value={division.position} showErrorIcon={false}
                        error={!errors[index].validPosition} errorMessage={"Position is required"} on:blur={()=>
                    positionValidation(index, division.position)}
                    />
                </div>
                <div class="sm:col-span-6">
                    <Input type="number" label="Total prize" bind:value={division.totalPrize} showErrorIcon={false}
                        error={!errors[index].validTotalPrize} errorMessage={"Prize is required"} on:blur={()=>
                    prizeDivisionValidation(index, division.totalPrize)}
                    />
                </div>
                <div class="sm:col-span-1 flex items-center justify-end">
                    {#if index>0}
                    <button class="mt-6" on:click|preventDefault={()=> removePrizeDivision(index)} type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.68342 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z"
                                fill="#6B7280"></path>
                        </svg>
                    </button>
                    {/if}
                </div>
            </div>
            {/each}
            {#if !validTotalSum}
                <span class="block error-text text-sm text-red-500 pt-1 mt-3">{totalSumError}</span>
            {/if}
            <button on:click|preventDefault={addPrizeDivision}
                class="flex items-center gap-2 mt-4 font-sans text-xs font-bold text-center text-indigo-600 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none"
                type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                        d="M10 7.5V10M10 10V12.5M10 10H12.5M10 10H7.5M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                        stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                Add more
            </button>
        </div>
    </div>

    <div>
        <p class="block text-sm font-medium text-gray-600 mb-2">Special Rewards</p>
        <div class="bg-gray-50 rounded p-4">
            {#each tournament.financialDetails.specialPrize as division, index}
            <div class="grid gap-x-6 grid-cols-1 sm:grid-cols-12">
                <div class="sm:col-span-5">
                    <Input type="text" label="Type" bind:value={division.description} showErrorIcon={false}
                    error={!specialPrizeErrors[index].validType} errorMessage={"Type is required"} on:blur={()=>
                    typeValidation(index, division.description)}
                    />
                </div>
                <div class="sm:col-span-6">
                    <Input type="number" label="Total prize" bind:value={division.prize} showErrorIcon={false}
                        error={!specialPrizeErrors[index].validPrize} errorMessage={"Prize is required"} on:blur={()=>
                    prizeSpecialValidation(index, division.prize)}
                    />
                </div>
                <div class="sm:col-span-1 flex items-center justify-end">
                    {#if index>0}
                    <button class="mt-6" on:click|preventDefault={()=> removeSpecialPrize(index)} type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.68342 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z"
                                fill="#6B7280"></path>
                        </svg>
                    </button>
                    {/if}
                </div>
            </div>
            {/each}
            {#if !validTotalSum}
                <span class="block error-text text-sm text-red-500 pt-1 mt-3">{totalSumError}</span>
            {/if}
            <button on:click|preventDefault={addSpecialPrize}
                class="flex items-center gap-2 mt-4 font-sans text-xs font-bold text-center text-indigo-600 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none"
                type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                        d="M10 7.5V10M10 10V12.5M10 10H12.5M10 10H7.5M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                        stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                Add more
            </button>
        </div>
    </div>

    
    <div>
        <div class="flex items-center justify-between">
            <p class="block text-sm font-medium text-gray-600 mb-2">Sponsorship information (optional)</p>
            <div class="flex items-center gap-3">
                <input id="sponsors" bind:checked={tournament.financialDetails.sponsorNotApplicable}
                    on:change={handleSponsorship} type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                <span class="block text-sm font-medium text-gray-600">No sponsors applicable</span>
            </div>
        </div>
        {#if !tournament.financialDetails.sponsorNotApplicable}
        <div class="flex flex-col gap-5">
            {#each tournament.financialDetails.sponsors as sponsor, index}
            <div class="grid gap-x-6 gap-y-8 sm:grid-cols-12 bg-gray-50 rounded p-4">
                <div class="sm:col-span-11">
                    <div class="grid gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-2">
                            <Input type="text" label={`Sponsor name ${index+1}`} bind:value={sponsor.name}
                                error={errors2[index].sponsorNameTouched && !errors2[index].validSponsorName}
                                errorMessage={sponsor.name ? "Sponsor name is invalid" : "Sponsor name is required" }
                                on:blur={()=> sponsorNameValidation(index, sponsor.name)}
                            />
                        </div>
                        <div class="sm:col-span-2">
                            <Select bind:value={sponsor.category} labelKey="label" valueKey="value"
                                label="Sponsor category" options={sponsorCategoryOptions} placeholder="Select category"
                                error={errors2[index].categoryTouched && !errors2[index].validCategory}
                                errorMessage={sponsor.category ? "Sponsor Category is invalid"
                                : "Sponsor Category is required" } on:blur={()=> categoryValidation(index,
                                sponsor.category)}
                                />
                        </div>
                        <div class="sm:col-span-2">
                            <Select bind:value={sponsor.contribution} labelKey="label" valueKey="value"
                                label="Sponsor contribution" options={sponsorContributionOptions}
                                placeholder="Select contribution" error={errors2[index].contributionTouched &&
                                !errors2[index].validContribution} errorMessage={sponsor.contribution
                                ? "Sponsor contribution is invalid" : "Sponsor contribution is required" } on:blur={()=>
                                contributionValidation(index, sponsor.contribution)}
                                />
                        </div>
                        <div class="sm:col-span-2">
                            <Input type="text" label="Website URL" bind:value={sponsor.websiteURL}
                                placeholder="http:// example.com" error={errors2[index].websiteUrlTouched &&
                                !errors2[index].validWebsiteUrl} errorMessage={sponsor.websiteURL
                                ? "Website URL is invalid" : "Website URL is required" } on:blur={()=>
                            websiteUrlValidation(index, sponsor.websiteURL)}
                            />
                        </div>
                        <div class="sm:col-span-2">
                            <Input type="text" label="Social media URL 1" bind:value={sponsor.socialMediaURL1}
                                placeholder="http:// example.com" error={errors2[index].socialMediaurl1Touched &&
                                !errors2[index].validSocialMediaurl1} errorMessage={sponsor.socialMediaURL1
                                ? "Social Media URL is invalid" : "Social Media URL is required" } on:blur={()=>
                            socialMediaUrlValidation(index, sponsor.socialMediaURL1)}
                            />
                        </div>
                        <div class="sm:col-span-2">
                            <Input type="text" label="Social media URL 2" bind:value={sponsor.socialMediaURL2}
                                placeholder="http:// example.com" error={errors2[index].socialMediaurl2Touched &&
                                !errors2[index].validSocialMediaurl2} errorMessage={sponsor.socialMediaURL2
                                ? "Social Media URL is invalid" : "Social Media URL is required" } on:blur={()=>
                            socialMediaUrlValidation(index, sponsor.socialMediaURL2,false)}
                            />
                        </div>
                    </div>
                </div>
                {#if index>0}
                <div class="sm:col-span-1 flex items-center justify-center">
                    <button on:click|preventDefault={()=> removeSponsor(index)}  type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6V16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z"
                                fill="#6B7280" />
                        </svg>
                    </button>
                </div>
                {/if}
            </div>
            {/each}

            <div class="flex items-center w-full">
                <span class="flex-grow bg-gray-200 rounded h-0.5"></span>
                <button on:click|preventDefault={addSponsor} type="button"
                    class="flex items-center justify-between rounded-full border border-gray-100 py-1 px-3 text-sm text-gray-600">
                    <svg class="mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                        fill="none">
                        <path d="M8 4V8M8 8V12M8 8H12M8 8L4 8" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    Add sponsor details
                </button>
                <span class="flex-grow bg-gray-200 rounded h-0.5"></span>
            </div>
        </div>
        {/if}
    </div>
</div>