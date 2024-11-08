<script>
  import moment from "moment";
  import CalendarHeader from "../CalendarHeader.svelte";
  import AgendaBlock from "./AgendaBlock.svelte";
  import { RESTClient } from "../../../Utils/RESTClient";
  import { onMount } from "svelte";
  const getEVENTSRest = new RESTClient("calendar");
  import {newDate} from '../../../Stores/CalendarStore';
  import { Route, router } from "tinro";
  import EventDetails from "../EventDetails.svelte";
  import WaterMark from "../../../Components/WaterMark.svelte";

  let currentDate;

  // Subscribe to the date store
  newDate.subscribe(value => {
    currentDate = moment(value);
  });

  let events = [];
  let selectedEvent = {};
  let today = moment();
  let selectedDate = moment(currentDate);
  let currentMonth = currentDate.month();
  let currentYear = currentDate.year();
  
  const updateDays = () => {
    let firstDay = moment(selectedDate).startOf('month').day();
    let daysInMonth = moment(selectedDate).daysInMonth();

    let days = [];

    // Add days from the previous month
    let prevMonthDays = moment(selectedDate).subtract(1, 'months').daysInMonth();
    for (let i = firstDay - 1; i >= 0; i--) {
      days.unshift(moment(selectedDate).subtract(1, 'months').date(prevMonthDays - i));
    }

    // Add days from the current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(moment(selectedDate).date(i));
    }

    // Add days from the next month
    let nextMonthDays = 42 - days.length; // 42 is the maximum number of cells in a 6-week calendar
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push(moment(selectedDate).add(1, 'months').date(i));
    }

    return days;
  };

  const previousMonth = () => {
    selectedDate = moment(selectedDate).subtract(1, 'months').date(1);
  };

  const nextMonth = () => {
    selectedDate = moment(selectedDate).add(1, 'months').date(1);
  };

  const previousDay = () => {
    selectedDate = moment(selectedDate).subtract(1, 'days');
  };

  const nextDay = () => {
    selectedDate = moment(selectedDate).add(1, 'days');
  };

  const goToToday = () => {
    selectedDate = moment(today);
  };

  const selectDay = (day) => {
    selectedDate = moment(day);
  };

  let days = [];
  let filteredEvents = [];

  $: {
    days = updateDays();
    fetchEventsByDateRange(moment(selectedDate).format('YYYY-MM-DD'), "date");
    newDate.set(selectedDate);
  }

  let showAddEventPopup = false;

  function handleAddEvent() {
    showAddEventPopup = true;
    selectedEvent = {};
  }

  function handleSaveEvent(event) {
    showAddEventPopup = false;
  }

  function handleClosePopup(event) {
    showAddEventPopup = false;
    if (event.detail) {
      newDate.set(event.detail["fromDate"]);
      const startofDay = moment(event.detail["fromDate"]).format('YYYY-MM-DD');
      fetchEventsByDateRange(startofDay, "date");
    }
  }

  async function fetchEventsByDateRange(date, getBy) {
    const body = { date, getBy };
    const url = `/vendorRecurringEventsByDateRange`;

    try {
      const response = await getEVENTSRest.post(url, body);
      events = response; 
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  function handleAgendaBlockClick(event) {
    if (event.event.tournament) {
      router.goto(`/tournaments/details/${event.event.tournament}`);
    } else {
      showEventPreviewPopup(event);
    }
  }

  function showEventPreviewPopup(event) {
    showAddEventPopup = true;
    selectedEvent = event;
  }
</script>
<WaterMark>
<CalendarHeader 
  on:addEvent={handleAddEvent} 
  onNext={nextDay} 
  onPrevious={previousDay} 
  onToday={goToToday} 
  month={moment(new Date(currentYear, currentMonth)).format("MMMM")} 
  year={currentYear}  
/>

<div class="flex h-full flex-col">
  <div class="isolate flex flex-auto overflow-hidden bg-white">
    <div class="flex flex-auto flex-col overflow-auto gap-y-4">
      <div class="">
        <div class="bg-gray-50 p-4 px-6 sticky top-0">
          <h2 class="flex items-center">
            <span class="text-gray-500 text-base font-semibold leading-7">
              {selectedDate.format('ddd')}
            </span>
            <span class="text-gray-500 text-sm font-normal leading-tight ml-1">
              {selectedDate.format('DD')}
            </span>
          </h2>        </div>
        <div class="px-6 py-2">
          {#if events.length > 0}
            <ul class="space-y-2">
              {#each events as event}
              <div on:click={() => handleAgendaBlockClick(event)} class="cursor-pointer">
                <AgendaBlock agendaObj={event} />
              </div>
              {/each}
            </ul>
          {:else}
            <p class=" text-gray-500">No events for this date.</p>
          {/if}
        </div>
      </div>
    </div>
    <div class="hidden w-1/2 max-w-md flex-none border-l border-gray-100 px-8 py-10 md:block">
      <div class="flex items-center text-center text-gray-900">
        <button 
          type="button" 
          class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500" 
          on:click="{previousMonth}">
          <span class="sr-only">Previous month</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
          </svg>
        </button>
        <div class="flex-auto text-sm font-semibold">{selectedDate.format('MMMM YYYY')}</div>
        <button 
          type="button" 
          class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500" 
          on:click="{nextMonth}">
          <span class="sr-only">Next month</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5-4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <div class="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div class="isolate mt-2 grid grid-cols-7 gap-px rounded-md bg-gray-200 text-sm shadow ring-1 ring-gray-200 overflow-hidden">
        {#each days as day}
          {#if day}
            <button 
              type="button" 
              class="py-1.5 hover:bg-gray-100 focus:z-10
              {day.month() !== selectedDate.month() ? 'bg-gray-100 text-gray-500' :'bg-white text-gray-900'}"
              on:click="{() => selectDay(day)}">
              <time 
                datetime="{day.format('YYYY-MM-DD')}" 
                class="mx-auto flex h-7 w-7 items-center justify-center rounded-full 
                {day.isSame(selectedDate, 'day') ? ' text-white bg-black' : 
                  day.isSame(today, 'day') ? ' text-indigo-600 font-semibold' : day.month() !== selectedDate.month() ? "text-gray-300" :' text-gray-900'}">
                {day.date()}
              </time>
            </button>
          {:else}
            <div class="bg-gray-50 py-1.5 text-gray-400"></div>
          {/if}
        {/each}
      </div>
    </div>
  </div>
</div>
</WaterMark>
{#if showAddEventPopup}
  <EventDetails event={selectedEvent} on:close={handleClosePopup} />
{/if}