<script>
    import Textarea from './../../Components/Form/Textarea.svelte';
    import Select from './../../Components/Form/Select.svelte';
    import Input from './../../Components/Form/Input.svelte';
    import { createEventDispatcher } from 'svelte';
    import Dropdown from '../../Components/Dropdown/Dropdown.svelte';
    import { RESTClient } from "../../Utils/RESTClient";
    import Toast from '../../Services/ToastService';

    const addEventRestClient = new RESTClient("calendar");

    const dispatch = createEventDispatcher();
    export let event = {};

    let title = '';
    let fromDate = "";
    let toDate = "";
    let startTime = '';
    let endTime = '';
    let allDay = false;
    let description = '';
    let showAs = 'public';
    let priority = false;
    let isBlocked = false;
    let isKIETournament = false;

    function handleClose() {
        dispatch('close');
    }

    async function handleSubmit() {
        handleClose();
    }

    // Initialize form fields if in preview or edit mode
    if (Object.keys(event).length !== 0) {
        title = event.event.title || '';
        fromDate = event.event.fromDate ? new Date(event.event.fromDate).toISOString().split('T')[0] : '';
        toDate = event.event.toDate ? new Date(event.event.toDate).toISOString().split('T')[0] : '';
        startTime = event.event.startTime || '';
        endTime = event.event.endTime || '';
        allDay = event.event.allDay || false;
        description = event.event.description || '';
        showAs = event.event.showAs || 'public';
        priority = event.event.priority || false;
        isBlocked = event.event.isBlocked || false;
        isKIETournament = event.event.isKIETournament || false;
    }
</script>


<div class="relative z-50" role="dialog" aria-modal="true">
    <div class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" aria-hidden="true"></div>
    <div class="fixed inset-0 z-50 w-screen overflow-y-auto">
      <div class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
        <div class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
          <div class="relative w-full items-center overflow-hidden bg-white  shadow-2xl rounded-md">
            <button on:click={handleClose} type="button" class="absolute right-4 top-4  text-gray-400 z-50 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8">
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div class="flex h-full flex-col overflow-y-scroll pb-0">
                <div class="p-4 px-8 pt-8 sticky top-0 bg-white z-10">
                    <h2 class="text-base font-semibold leading-6 text-gray-900 pb-3" id="slide-over-title">KIE Calendar</h2>
                </div>
                <form on:submit|preventDefault={handleSubmit}>
                    <div class="space-y-4 px-8">
                        <div class="space-y-2 sm:grid sm:grid-cols-1 sm:gap-4 sm:space-y-0">
                            <Input disabled = {true} error="" type="text" label="Event title" placeholder="Event Title" bind:value={title} />
                        </div>
                        <div class="space-y-2 sm:grid sm:grid-cols-8 sm:gap-2 sm:space-y-0 px-4 py-4 bg-gray-100 rounded">
                            <div class="sm:col-span-{allDay ? "4": "2"}">
                                <Input disabled = {true} error="" type="date" label="From" bind:value={fromDate} />
                            </div>
                            {#if !allDay}
                                <div class="sm:col-span-{allDay ? "4": "2"}">
                                    <Input disabled = {true} error="" type="time" label="&nbsp" bind:value={startTime} />
                                </div>
                                {/if}
                            <div class="sm:col-span-{allDay ? "4": "2"}">
                                <Input disabled = {true} error="" type="date" label="To" bind:value={toDate} />
                            </div>
                            {#if !allDay}
                                <div class="sm:col-span-{allDay ? "4": "2"}">
                                    <Input disabled = {true} error="" type="time" label="&nbsp" bind:value={endTime} />
                                </div>
                            {/if}
                            <div class="sm:col-span-2">
                                <div class="relative flex items-start">
                                    <div class="flex h-6 items-center">
                                        <input disabled id="AllDay" aria-describedby="AllDay-description" name="AllDay" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" bind:checked={allDay}>
                                    </div>
                                    <div class="ml-3 text-sm leading-6">
                                        <label for="AllDay" class="font-medium text-gray-900">All Day</label>
                                    </div>
                                </div>
                            </div>
                            <div class="sm:col-span-2">
                                <div class="relative flex items-start">
                                    <div class="flex h-6 items-center">
                                        <input disabled id="isBlocked" aria-describedby="isBlocked-description" name="isBlocked" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" bind:checked={isBlocked}>
                                    </div>
                                    <div class="ml-3 text-sm leading-6">
                                        <label for="isBlocked" class="font-medium text-gray-900">Is blocked</label>
                                    </div>
                                </div>
                            </div>
                            <div class="sm:col-span-2">
                                <div class="relative flex items-start">
                                    <div class="flex h-6 items-center">
                                        <input disabled id="isKIETournament" aria-describedby="isKIETournament-description" name="isKIETournament" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" bind:checked={isKIETournament}>
                                    </div>
                                    <div class="ml-3 text-sm leading-6">
                                        <label for="isKIETournament" class="font-medium text-gray-900">Tournament</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="space-y-2 sm:grid sm:grid-cols-6 sm:gap-2 sm:space-y-0 py-2">
                            <div class="sm:col-span-full">
                                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div class="mt-2">
                                    <textarea
                                        class="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-left text-start"
                                        style="text-align: left;"
                                        disabled
                                    >
                                        {description}
                                    </textarea>
                                </div>                                
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-shrink-0 justify-end px-4 py-4 bg-gray-100">
                        <button type="submit" class="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Close</button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
