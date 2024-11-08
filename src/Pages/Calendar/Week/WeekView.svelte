<script>
  import CalendarHeader from './../CalendarHeader.svelte';
  import { onMount } from "svelte";
  import AgendaBlock from './AgendaBlock.svelte';
  import moment from 'moment';
  import { RESTClient } from "../../../Utils/RESTClient";
  import { newDate } from '../../../Stores/CalendarStore';
  import { Route, router } from "tinro";
  import EventDetails from '../EventDetails.svelte';
  import { getEventBackground, getEventBorder } from '../../../Utils/colorCodes';
  import WaterMark from '../../../Components/WaterMark.svelte';

  const getEVENTSRest = new RESTClient("calendar");
  let currentDate;
  let today = moment();
 

  let currentMonday = moment().startOf('isoWeek');
  let days = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let year, month, weekNumber;
  let events = [];
  let selectedEvent = {};
  let showAddEventPopup = false;
   newDate.subscribe(value => {
    currentDate = moment(value);
    currentMonday = moment(currentDate).startOf('isoWeek');
  });
  async function updateCalendar() {
    days = [];
    for (let i = 0; i < 7; i++) {
      const day = moment(currentMonday).add(i, 'days');
      const isCurrentMonth = day.month() === currentDate.month();
      days.push({
        name: dayNames[day.day()],
        value: day.date(),
        isCurrentMonth,
        isCurrentDay: day.isSame(today, 'day'),
        events: [],
        isPlaceholder: !isCurrentMonth
      });
    }
    year = currentMonday.year();
    month = currentDate.format('MMMM');
    weekNumber = Math.ceil(currentMonday.date() / 7);
    await fetchEventsByDateRange(moment(currentMonday).format('YYYY-MM-DD'), "week");
     assignEventsToDays();
    newDate.set(moment(currentDate));
  }

  function nextWeek() {
    currentMonday = moment(currentMonday).add(7, 'days').startOf('isoWeek');
    currentDate = moment(currentMonday);
    newDate.set(currentDate);
    updateCalendar();
  }

  function previousWeek() {
    currentMonday = moment(currentMonday).subtract(7, 'days').startOf('isoWeek');
    currentDate = moment(currentMonday);
    newDate.set(currentDate);
    updateCalendar();
  }

  function goToToday() {
    currentMonday = moment().startOf('isoWeek');
    currentDate = moment();
    newDate.set(currentDate);
    updateCalendar();
  }

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
      const startOfWeek = moment(event.detail["fromDate"]).startOf('week').add(1, 'days');
      fetchEventsByDateRange(startOfWeek, "week");
    }
  }

  async function fetchEventsByDateRange(date, getBy) {
    const body = { date, getBy };
    const url = `/vendorRecurringEventsByDateRange`;

    try {
      const response = await getEVENTSRest.post(url, body);
      console.log(response)
      events = response;
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  function assignEventsToDays() {
    days.forEach(day => {
      day.events = events.filter(event => {
        const eventDate = moment(event.startTime);
        return eventDate.date() === day.value &&
               eventDate.year() === currentMonday.year();
      });
    });
    days = days;
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

  function getEventStyle(event, index) {
    const isSpecialEvent = event.isBlocked || event.isPublic;
    const bgColor = isSpecialEvent ? '#E5E7EB' : getEventBackground(event);
    const borderColor = isSpecialEvent ? '#9CA3AF' : getEventBorder(event);
    if (event.event.startTime && event.event.endTime) {
      const startTime = event.event.tournament ? new Date(event.startTime).toISOString().slice(11, 16) : event.event.startTime;
      const endTime = event.event.tournament ? new Date(event.endTime).toISOString().slice(11, 16) : event.event.endTime;
      const left = calculateLeftPosition(startTime);
      const width = calculateWidth(startTime, endTime);
      return `left: ${left}%; width: ${width}%; top: calc(${40 * index}px + 20px); bottom: 0; background: ${bgColor}; border-left: 4px solid ${borderColor};`;
    } else {
      return `left: 0; width: 100%; top: calc(${40 * index}px + 20px); background: ${bgColor}; border-left: 4px solid ${borderColor};`;
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
    updateCalendar();
  });
</script>

<WaterMark>
<CalendarHeader
  on:addEvent={handleAddEvent}
  onNext={nextWeek}
  onPrevious={previousWeek}
  onToday={goToToday}
  {year}
  {month}
/>

<div class="lg:h-full overflow-scroll pb-8">
  <div class="shadow ring-1 ring-black ring-opacity-5 inline-flex custom-width sticky top-0 z-20">
    <div class="sticky left-0 z-10 grid grid-flow-col grid-cols gap-px border border-gray-100 text-xs font-semibold leading-6 text-black">
      <div class="flex items-center justify-center py-3 px-2 min-w-20 bg-gray-50 sticky left-0 z-10">
        Week {weekNumber}
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

  {#each days as day}
    <div class="inline-flex custom-width">
      <div class="sticky left-0 z-10 grid grid-flow-col grid-cols gap-px border-b border-r border-l border-gray-200 text-xs font-semibold text-gray-500">
        <div class="flex justify-center py-3 px-2 min-w-20 {day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'} sticky left-0 z-10">
          <div class="text-center">
            <div>{day.name}</div>
            <div class={ day.isCurrentDay ? "p-1 h-6 w-6 items-center inline-flex justify-center rounded-full bg-blue-600 font-semibold text-white" : ""}>{day.value}</div>
          </div>
        </div>
      </div>
      <div style="height: {day.events.length * 45}px;" class="min-h-24 isolate relative custom-width grid grid-flow-col gap-px border-b divide-x divide-gray-200 divide-dashed text-xs font-semibold leading-6 text-gray-700">
        {#each Array.from({ length: 24 }).map((_, index) => index) as hour}
          <div class="flex items-center justify-center py-3 px-0 min-w-16 bg-white">
            <span class="sr-only"></span>
          </div>
        {/each}
        {#each day.events as event, eventIndex}
            <div class="absolute h-8 border-l-4 flex items-center justify-between px-3 overflow-hidden overflow-x-auto rounded-sm cursor-pointer"
            on:click={() => handleAgendaBlockClick(event)}
            style={getEventStyle(event, eventIndex)}>
              <AgendaBlock agendaObj={event} />
            </div>
          {/each}
      </div>
    </div>
  {/each}
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
