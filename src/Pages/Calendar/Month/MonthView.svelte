<script>
	import WaterMark from './../../../Components/WaterMark.svelte';
  import { onMount } from "svelte";
  import MonthBookingBlock from "./MonthBookingBlock.svelte";
  import CalendarHeader from "../CalendarHeader.svelte";
  import { RESTClient } from "../../../Utils/RESTClient";
  import moment from 'moment';
  const getEVENTSRest = new RESTClient("calendar");
  import {newDate} from '../../../Stores/CalendarStore';
  import { Route, router } from "tinro";
  import Modal from "../../../Components/Modal/Modal.svelte";
  import EventDetails from "../EventDetails.svelte";
  import { getEventBackground, getEventBorder, getEventColor } from "../../../Utils/colorCodes";


  let currentDate;
  let selectedEvent = {};
  $:showMoreEvents = false;
  let moreEvents = [];
  // Subscribe to the date store
  newDate.subscribe(value => {
    currentDate = moment(value);
  });
  let currentMonth = moment(currentDate).month(); 
  let currentYear = moment(currentDate).year();

  let days = [];
  let events = [];

  function updateCalendar() {
    days = [];
    const firstDayOfMonth = moment().year(currentYear).month(currentMonth).startOf('month').day();
    const daysToAddFromPrevMonth = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);

    const daysInPrevMonth = moment().year(currentYear).month(currentMonth).startOf('month').subtract(1, 'month').daysInMonth();
    for (let i = daysInPrevMonth - daysToAddFromPrevMonth + 1; i <= daysInPrevMonth; i++) {
      days.push({
        value: i,
        isCurrentMonth: false,
        events: []  // Initialize with an empty events array
      });
    }

    const daysInMonth = moment().year(currentYear).month(currentMonth).daysInMonth();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        value: i,
        isCurrentMonth: true,
        isActive: moment().year(currentYear).month(currentMonth).date(i).isSame(moment(), 'day'),
        events: []  // Initialize with an empty events array
      });
    }

    const totalCells = 6 * 7; // 6 rows, 7 columns
    const remainingDays = totalCells - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        value: i,
        isCurrentMonth: false,
        events: []  // Initialize with an empty events array
      });
    }
    
    // Update the days array based on events
    events.forEach(event => {
      const startDate = moment(event.startTime);
      const endDate = moment(event.endTime);
      const duration = endDate.diff(startDate, 'days');
      for (let i = 0; i <= duration; i++) {
        const eventDate = moment(startDate).add(i, 'days');
        if (eventDate.year() === currentYear && eventDate.month() === currentMonth) {
          const day = days.find(d => d.isCurrentMonth && d.value === eventDate.date());
          if (day) {
            day.events.push(event);
          }
        }
      }
    });
  }

  async function fetchEventsByDateRange(date, getBy) {
    const body = { date, getBy };
    const url = `/vendorRecurringEventsByDateRange`;
    try {
      const response = await getEVENTSRest.post(url, body);
      events = response; 
      updateCalendar();
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  function nextMonth() {
    currentDate.add(1, 'month');
    currentMonth = currentDate.month();
    currentYear = currentDate.year();
    fetchEventsByDateRange(currentDate.startOf('month').format('YYYY-MM-DD'), "month");
    updateCalendar();
    newDate.set(currentDate);
  }

  function previousMonth() {
    currentDate.subtract(1, 'month');
    currentMonth = currentDate.month();
    currentYear = currentDate.year();
    fetchEventsByDateRange(currentDate.startOf('month').format('YYYY-MM-DD'), "month");
    updateCalendar();
    newDate.set(currentDate);
  }

  function goToToday() {
    currentDate = moment();
    currentMonth = currentDate.month();
    currentYear = currentDate.year();
    fetchEventsByDateRange(currentDate.startOf('month').format('YYYY-MM-DD'), "month");
    updateCalendar();
    newDate.set(currentDate);
  }

  let showAddEventPopup = false;

  function handleAddEvent() {
    showAddEventPopup = true;
    selectedEvent = {};
  }
  function handleClosePopup(event) {
    showAddEventPopup = false;
    if (event.detail) {
      newDate.set(event.detail["fromDate"]);
      const startOfMonth = moment(event.detail["fromDate"]).startOf('month').format('YYYY-MM-DD');
      fetchEventsByDateRange(startOfMonth, "month");
    }
  }

  function handleMonthBookingBlockClick(event) {
    if (event.event.tournament) {
    router.goto(`/tournaments/details/${event.event.tournament}`);
  } else {
    // } else if (event.isEventOnly) {
      showEventPreviewPopup(event);
      showMoreEvents = false;
    }
  }


  function showEventPreviewPopup(event) {
    showAddEventPopup = true;
    selectedEvent = event;
    showMoreEvents = false;
  }

  function showMorePopup(events) {
    showMoreEvents = true;
    moreEvents = events;
  }

  onMount(() => {
    updateCalendar();
    fetchEventsByDateRange(currentDate.startOf('month').format('YYYY-MM-DD'), "month");
  });
</script>
<WaterMark>
<CalendarHeader on:addEvent={handleAddEvent} onNext={nextMonth} onPrevious={previousMonth} onToday={goToToday} month={moment().year(currentYear).month(currentMonth).format('MMMM')} year={currentYear} />
<div class="lg:h-full overflow-scroll">
  <div class="shadow ring-1 ring-black ring-opacity-5 flex">
    <div class="grid grid-rows-7 grid-flow-col grid-cols gap-px border min-w-24 border-gray-200 bg-gray-200 text-xs font-semibold leading-6 text-gray-500">
      {#each ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as day}
        <div class="flex justify-center bg-white py-2">
          <span>{day}</span>
        </div>
      {/each}
    </div>
    <div class="grid relative grid-rows-7 grid-flow-col grid-cols-6 w-full gap-px border-b border-gray-200 bg-gray-200 text-xs font-semibold leading-6 text-gray-700">
      {#each days as day}
        {#if day.isCurrentMonth}
          <div class="relative bg-white px-3 py-2 min-h-28">
            {#if day.events && day.events.some(e => e.isBlocked && e.showAs === 'public')}
              <div class="absolute inset-0 bg-gray-200 opacity-50 z-10"></div>
            {/if}
            <div class="relative z-20">
              <div class="text-right">
                <time class={day.isActive ? " p-1 h-6 w-6 items-center inline-flex justify-center rounded-full bg-blue-600 font-semibold text-white" : ""}>{day.value}</time>
              </div>
              <ol class="">
                {#each day.events.slice(0,5) as event}
                  {#if event.event.showAs === 'public' }
                  <!-- svelte-ignore a11y-no-static-element-interactions -->
                  <div on:click={() => handleMonthBookingBlockClick(event)} class=" cursor-pointer">
                    <MonthBookingBlock color={getEventColor(event)} link="" border={getEventBorder(event)}>
                      {event.event.title}
                    </MonthBookingBlock>
                  </div>
                    
                  {/if}
                {/each}
                {#if day.events.length > 5}
                  <span class="text-sm text-gray-400 font-normal mt-1" on:click|preventDefault={()=>showMorePopup(day.events)}>+{(day.events.length)-5} more</span>
                {/if}
              </ol>
            </div>
          </div>
        {:else}
          <div class="relative bg-gray-50 px-3 py-2 min-h-28 text-gray-500">
            {#if day.events && day.events.some(e => e.isBlocked || e.showAs === 'public')}
              <div class="absolute inset-0 bg-gray-300 opacity-50 z-10"></div>
            {/if}
            <div class="relative z-20">
              <div class="text-right">
                <time datetime="2021-12-27">{day.value}</time>
              </div>
              <ol class="mt-2">
                <!-- Add any additional content here if needed -->
              </ol>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</div>
</WaterMark>
{#if showAddEventPopup}
  <EventDetails event={selectedEvent} on:close={handleClosePopup} />
{/if}

  <Modal bind:showModal={showMoreEvents} >
      <div class="text-base font-semibold leading-6 text-gray-900 pb-3">More Events</div>
      {#each moreEvents as event }
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div on:click={() => handleMonthBookingBlockClick(event)} class="h-8 border-l-4  mt-2 flex items-center justify-between px-3 overflow-hidden overflow-x-auto rounded-sm cursor-pointer s-R5M0PM3cJk7n" style=" background: {getEventBackground(event)}; border-left: 4px solid {getEventBorder(event)};">
            <div class="flex gap-x-6">
              <div class="">
                <p class="font-medium whitespace-nowrap truncate text-base" style="color: {getEventColor(event)};">{event.event.title}</p>
              </div>
            </div> 
        </div>
      {/each}
  </Modal>




