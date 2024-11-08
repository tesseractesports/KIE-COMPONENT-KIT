<script>
  import { Route, router } from "tinro";
  import { createEventDispatcher } from 'svelte';
  import Dropdown from "../../Components/Dropdown/Dropdown.svelte";

  const meta = router.meta();  

  export let onNext;
  export let onPrevious;
  export let onToday;
  export let month;
  export let year;
  
  const dispatch = createEventDispatcher();
  function handleAddEvent() {
    dispatch('addEvent');
  }

  let selectedView;
  const options = [
    { label: 'Month View', value: 'monthView?selectedView=Month View'},
    { label: 'Week View', value: 'weekView?selectedView=Week View'},
    { label: 'Day View', value: 'dayView?selectedView=Day View'},
    { label: 'Agenda View', value: 'agendaView?selectedView=Agenda View' }
  ];

  let encodedRouteParamToFind = $meta.query.selectedView;
  let decodedRouteParamToFind = decodeURIComponent(encodedRouteParamToFind);
  let foundedRoute = options.find((opt) => opt.label === decodedRouteParamToFind)
  selectedView = foundedRoute.value;

  let status = [
    {label: "Active", value: "pending"},
    {label: "Pending approval", value: "pendingApproval"},
    {label: "Rejected", value: "rejected"},
    {label: "Report Pending", value: "reportPending"},
    {label: "Live", value: "live"}
  ]

    
</script>

<header
  class="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4 sticky top-16 z-30 bg-white"
>
  <div class="flex items-center gap-2">
    <h1 class="text-base font-semibold leading-6 text-black">
      <time datetime="2022-01">{month} {year}</time>
    </h1>
    <div
      class="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch"
    >
      <button
        on:click={onPrevious}
        type="button"
        class="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
      >
        <span class="sr-only">Previous</span>
        <svg
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <button
        on:click={onToday}
        type="button"
        class="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:relative md:block"
        >Today</button
      >
      <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
      <button
        on:click={onNext}
        type="button"
        class="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
      >
        <span class="sr-only">Next</span>
        <svg
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <!-- <Dropdown   
      placeholder="GMT +350"
      navigate={false}
    /> -->
    
    <Dropdown   
      options={options}
      defaultSelected={selectedView}
      placeholder=""
      navigate={true}
    />
  </div>

  <div class="flex items-center gap-2" hidden>
    <!-- <Dropdown   
      options={status}
      placeholder="Status"
      navigate={false}
    />

    <Dropdown   
      placeholder="Game titles"
      navigate={false}
    />

    <Dropdown   
      placeholder="Tier"
      navigate={false}
    />
    <div class="hidden md:ml-4 md:flex md:items-center">
      <div class=" h-6 w-px bg-gray-300"></div>
      <button on:click={handleAddEvent}
        type="button"
        class="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >Add event</button
      >
    </div> -->
  </div>
</header>
