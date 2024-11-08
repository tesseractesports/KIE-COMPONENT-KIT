<script>
  import AgendaBlock from "./AgendaBlock.svelte";
  import CalendarHeader from "../CalendarHeader.svelte";
  import { onMount, onDestroy } from "svelte";
  import { addEvent, eventsStore } from "../../../Stores/EventsStore";
  import { newDate } from "../../../Stores/CalendarStore";
  import moment from "moment";
  import { RESTClient } from "../../../Utils/RESTClient";
  import { Route, router } from "tinro";
  import EventDetails from "../EventDetails.svelte";
  import { getEventBackground, getEventBorder } from "../../../Utils/colorCodes";
  import WaterMark from "../../../Components/WaterMark.svelte";

  const getEVENTSRest = new RESTClient("calendar");
  const meta = router.meta();

  let currentDate;
  let events = [];
  let showAddEventPopup = false;
  let today = moment();
  let selectedEvent = {};

  let currentWeekDay, currentDayNumber, currentYear, currentMonth, currentWeekNumber;
  
  // Subscribe to the date store
  newDate.subscribe(value => {
    if (meta.query.selectedDate) {
      currentDate = moment(meta.query.selectedDate);
    } else {
      currentDate = moment(value);
    }
    updateCurrentDateInfo();
  });

  function updateCurrentDateInfo() {
    currentWeekDay = currentDate.format('ddd');
    currentDayNumber = currentDate.date();
    currentYear = currentDate.year();
    currentMonth = currentDate.month();
    currentWeekNumber = Math.ceil(currentDate.date() / 7)
  }

  function changeDay(delta) {
    currentDate.add(delta, 'days');
    updateCurrentDateInfo();
    newDate.set(moment(currentDate)); 
    fetchEventsByDateRange(currentDate.format('YYYY-MM-DD'), "date");
  }

  function goToToday() {
    currentDate = moment();
    updateCurrentDateInfo();
    newDate.set(moment(currentDate)); 
    fetchEventsByDateRange(currentDate.format('YYYY-MM-DD'), "date");
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

  function calculateLeftPosition(startTime) {
    const [hour, minute] = startTime.split(":").map(Number);
    return (hour + minute / 60) * (100 / 24);
  }

  function calculateWidth(startTime, endTime) {
    if (!startTime || !endTime) return 100;

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const start = startHour + startMinute / 60;
    const end = endHour + endMinute / 60;

    return (end - start) * (100 / 24);
  }

  function handleAddEvent() {
    showAddEventPopup = true;
    selectedEvent = {};
  }

  function handleSaveEvent(event) {
    addEvent(event.detail);
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

  function getEventStyle(event, index) {
    const isSpecialEvent = event.isBlocked || event.isPublic;
    const bgColor = isSpecialEvent ? '#E5E7EB' : getEventBackground(event);
    const borderColor = isSpecialEvent ? '#9CA3AF' : getEventBorder(event);

    if (event.event.startTime && event.event.endTime) {
      const startTime = event.event.tournament ? new Date(event.startTime).toISOString().slice(11, 16) : event.event.startTime;
      const endTime = event.event.tournament ? new Date(event.endTime).toISOString().slice(11, 16) : event.event.endTime;
      const left = calculateLeftPosition(startTime);
      const width = calculateWidth(startTime, endTime);
      return `left: ${left}%; width: ${width}%; top: calc(${70 * index}px + 20px); bottom: 0; background: ${bgColor}; border-left: 4px solid ${borderColor};`;
    } else {
      return `left: 0; width: 100%; top: calc(${70 * index}px + 20px); background: ${bgColor}; border-left: 4px solid ${borderColor};`;
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

  onMount(() => {
    if (meta.query.selectedDate) {
      fetchEventsByDateRange(meta.query.selectedDate, "date")
    } else {
      fetchEventsByDateRange(currentDate.format('YYYY-MM-DD'), "date");
    }
  });

  onDestroy(() => {
    // Clean up any event listeners or subscriptions if needed
  });
</script>
<WaterMark>
<CalendarHeader
  on:addEvent={handleAddEvent}
  onNext={() => changeDay(1)}
  onPrevious={() => changeDay(-1)}
  onToday={goToToday}
  year={currentYear}
  month={moment.months()[currentMonth]}
/>

<div class="h-dvh overflow-scroll pb-8">
  <div class="shadow ring-1 ring-black ring-opacity-5 inline-flex sticky top-0 z-20 bg-white custom-width">
    <div class="sticky left-0 z-30 grid grid-flow-col grid-cols gap-px border border-gray-100 text-xs font-semibold leading-6 text-black">
      <div class="flex items-center justify-center py-3 px-2 min-w-20 bg-gray-50 sticky left-0 z-10">
        Week {currentWeekNumber}
      </div>
    </div>
    <div class="isolate custom-width grid grid-flow-col gap-px border-b divide-x divide-gray-200 divide-dashed border-r border-gray-100 text-xs font-semibold leading-6 text-gray-700">
      {#each Array.from({ length: 24 }).map((_, index) => index) as hour}
        <div class="flex items-center justify-center py-3 px-0 min-w-16 bg-white">
          <span class="items-center justify-center font-normal text-sm text-gray-300 whitespace-nowrap">
            {hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}
            {hour < 12 ? "am" : "pm"}
          </span>
        </div>
      {/each}
    </div>
  </div>
  <div class="inline-flex custom-width">
    <div class="sticky left-0 bg-white z-10 grid grid-flow-col grid-cols gap-px border-b border-r border-l border-gray-200 text-xs font-semibold text-gray-700">
      <div class="flex justify-center py-3 px-2 min-w-20 sticky left-0 z-10">
        <div class="text-center">
          <p class="font-semibold text-gray-500 text-center">{currentWeekDay}</p>
          <div class="text-center">
            <p
              class="font-semibold text-xs {today.date() === currentDayNumber ? 'p-1 h-6 w-6 items-center inline-flex justify-center rounded-full bg-blue-600 text-white' : 'text-gray-600 bg-none'}"
            >
              {currentDayNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="h-dvh isolate relative custom-width grid grid-flow-col gap-px border-b divide-x divide-gray-200 divide-dashed text-xs font-semibold leading-6 text-gray-700">
      {#each Array.from({ length: 24 }).map((_, index) => index) as hour}
        <div class="flex items-center justify-center py-3 px-0 min-w-16 bg-white">
          <span class="sr-only"></span>
        </div>
        {#each events as event, i}
          {#if moment(event.startTime).format('YYYY-MM-DD') === currentDate.format('YYYY-MM-DD')}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click={() => handleAgendaBlockClick(event)}
              class="absolute h-16 border-l-4 flex items-center justify-between px-3 overflow-hidden overflow-x-auto cursor-pointer"
              style={getEventStyle(event, i)}
            >
              <AgendaBlock  agendaObj={event} />
            </div>
          {/if}
        {/each}
      {/each}
    </div>
  </div>
</div>
</WaterMark>
{#if showAddEventPopup}
  <EventDetails event={selectedEvent} on:close={handleClosePopup} />
{/if}

<style>
  @media (min-width: 1536px) {
    .custom-width {
      width: auto;
    }
  }

  @media (min-width: 2160px) {
    .custom-width {
      width: 100%;
    }
  }
</style>
