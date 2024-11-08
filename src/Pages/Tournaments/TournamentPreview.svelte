<script>
    export let tournament = {};
    export let currentActive = 0;

    const handleStepClick = (index) => {
        if (index <= currentActive || index === currentActive) {
            currentActive = index;
        }
    };
</script>

<!-- Tournament Details -->
<div class=" shadow rounded-xl overflow-hidden">
    <div class="px-4 py-6 sm:p-8 space-y-6 bg-white">
        <div class="w-full border-b flex flex-col mb-2">
            <p class="font-normal text-xl">Tournament Details</p>
            <span class="font-light text-sm text-gray-400 mb-2"
                >We would like to know you more</span
            >
        </div>
        <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
            <div class="sm:col-span-2">
                <p class="block text-sm font-medium leading-6 text-gray-900">
                    Name of the Tournament
                </p>
                <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
                    {tournament.name}
                </p>
            </div>
            <div class="sm:col-span-2">
                <p class="block text-sm font-medium leading-6 text-gray-900">
                    Prize pool
                </p>
                <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
                    {tournament.prizePool}
                </p>
            </div>
            <div class="sm:col-span-2">
                <p class="block text-sm font-medium leading-6 text-gray-900">
                    Game title
                </p>
                <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
                    {tournament.gameTitle}
                </p>
            </div>
            <div class="sm:col-span-full">
                <p class="block text-sm font-medium leading-6 text-gray-900">
                    Tournament description
                </p>
                <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
                    {tournament.description}
                </p>
            </div>
            <div class="sm:col-span-full">
                <p class="block text-sm font-medium leading-6 text-gray-900">
                    Tournament Logo
                </p>
                <ul role="list" class="mt-3">
                    <li class="col-span-2 flex rounded-md shadow-sm">
                        <div
                            class="flex w-16 h-16 flex-shrink-0 items-center justify-center border rounded-l-md text-sm font-medium uppercase text-gray-600"
                        >
                            <!-- {file.name.slice(0,2)} -->
                            <img
                                src={tournament.logo}
                                alt={tournament.logo}
                                class="p-2 object-fill"
                            />
                        </div>
                        <div
                            class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white"
                        >
                            <div class="flex-1 truncate px-4 py-2 text-sm">
                                <p
                                    class="font-medium text-gray-900 hover:text-gray-600 truncate"
                                >
                                    {tournament.logo
                                        ? tournament.logo.split("/").pop()
                                        : "logo"}
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="sm:col-span-full">
                <p class="block text-sm font-medium leading-6 text-gray-900">
                    Tournament Banner
                </p>
                <ul role="list" class="mt-3">
                    <li class="col-span-2 flex rounded-md shadow-sm">
                        <div
                            class="flex w-16 h-16 flex-shrink-0 items-center justify-center border rounded-l-md text-sm font-medium uppercase text-gray-600"
                        >
                            <!-- {file.name.slice(0,2)} -->
                            <img
                                src={tournament.banner}
                                alt={tournament.banner}
                                class="p-2 object-fill"
                            />
                        </div>
                        <div
                            class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white"
                        >
                            <div class="flex-1 truncate px-4 py-2 text-sm">
                                <p
                                    class="font-medium text-gray-900 hover:text-gray-600 truncate"
                                >
                                    {tournament.banner
                                        ? tournament.banner.split("/").pop()
                                        : "banner"}
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="sm:col-span-3">
                <p class="block text-sm font-medium leading-6 text-gray-900">
                    IGN of primary account
                </p>
                <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
                    {tournament.ignPrimaryAccount}
                </p>
            </div>
            <div class="sm:col-span-3">
                <p class="block text-sm font-medium leading-6 text-gray-900">
                    UID of primary account
                </p>
                <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
                    {tournament.uidPrimaryAccount}
                </p>
            </div>
        </div>
        <div class="">
            <p class="block text-sm font-medium text-gray-600 mb-2">
                Tournament Dates
            </p>
            <div
                class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6 bg-gray-50 rounded p-4"
            >
                <div class="sm:col-span-3">
                    <p class="block text-sm font-medium text-gray-600 mb-1">
                        Start Date
                    </p>
                    <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
                        {tournament.tournamentDate.startDate}
                    </p>
                </div>
                <div class="sm:col-span-3">
                    <p class="block text-sm font-medium text-gray-600 mb-1">
                        End Date
                    </p>
                    <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
                        {tournament.tournamentDate.startDate}
                    </p>
                </div>
            </div>
        </div>
        <div class="">
            <p class="block text-sm font-medium text-gray-600 mb-2">
                Online
            </p>
            <div
                class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6 bg-gray-50 rounded p-4"
            >
                {#each tournament.location.platforms as platform}
                    <div class="sm:col-span-3">
                        <p class="block text-sm font-medium text-gray-600 mb-1">
                            Platform name
                        </p>
                        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
                            {platform.name}
                        </p>
                    </div>
                    <div class="sm:col-span-3">
                        <p class="block text-sm font-medium text-gray-600 mb-1">
                            Channel URL
                        </p>
                        <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
                            {platform.url}
                        </p>
                    </div>
                {/each}
            </div>
        </div>
        <div class="">
            <p class="block text-sm font-medium text-gray-600 mb-2">
                Tournament Location
            </p>
            <div
                class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6 bg-gray-50 rounded p-4"
            >
                <div class="sm:col-span-2">
                    <p class="block text-sm font-medium text-gray-600 mb-1">
                        Country
                    </p>
                    <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
                        {tournament.location.country}
                    </p>
                </div>
                <div class="sm:col-span-2">
                    <p class="block text-sm font-medium text-gray-600 mb-1">
                        State
                    </p>
                    <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
                        {tournament.location.state}
                    </p>
                </div>
                <div class="sm:col-span-2">
                    <p class="block text-sm font-medium text-gray-600 mb-1">
                        City
                    </p>
                    <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
                        {tournament.location.city}
                    </p>
                </div>
                <div class="sm:col-span-full">
                    <p class="block text-sm font-medium text-gray-600 mb-1">
                        Full address
                    </p>
                    <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">
                        {tournament.location.fullAddress}
                    </p>
                </div>
            </div>
        </div>

    </div>
    <div
        class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 bg-gray-100"
    >
        <button
            class="text-sm font-semibold leading-6 text-gray-900 bg-white border rounded px-2 py-1"
            on:click|preventDefault={() => handleStepClick(0)}
            >Edit details</button
        >
    </div>
</div>

<!-- <div class="sm:col-span-3">
    <p class="block text-sm font-medium leading-6 text-gray-900">Country</p>
    <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">{tournament.location.country} </p>
</div>
<div class="sm:col-span-3">
    <p class="block text-sm font-medium leading-6 text-gray-900">State</p>
    <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">{tournament.location.state} </p>
</div>
<div class="sm:col-span-3">
    <p class="block text-sm font-medium leading-6 text-gray-900">City</p>
    <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">{tournament.location.city} </p>
</div>
<div class="sm:col-span-3">
    <p class="block text-sm font-medium leading-6 text-gray-900">Full address</p>
    <p class="block w-full sm:text-sm sm:leading-4 text-gray-500">{tournament.location.fullAddress} </p>
</div> -->
