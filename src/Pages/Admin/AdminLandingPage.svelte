<script>
   import moment from "moment";
   import { onMount,onDestroy } from "svelte";
   import { RESTClient } from "../../Utils/RESTClient";
   //import { user } from "../../Stores/UserStore";
   import ActiveTournaments from "./Charts/ActiveTournaments.svelte";
   import ActiveVendors from "./Charts/ActiveVendors.svelte";
   import {updateProfile, userStore,fetchUsers} from "../../Stores/UserStore";
   import AuthService from "../../Services/AuthService";
  //  import ActiveVendors from "./Charts/ActiveVendors.svelte";
   import { router } from "tinro";
  import { newDate } from "../../Stores/CalendarStore";
 
   const dashboardRestClient = new RESTClient("dashboard");
   const getEVENTSRest = new RESTClient("calendar")
   let eventDates = {};
   let currentDate = moment().startOf('month').format('YYYY-MM-DD');
   let currentMonth = moment(currentDate).month();
 
   let userObj = {};
   let users=[];
   let user; 
   let tournamentTierOne = [],
       tournamentTierTwo = [],
       tournamentTierThree = [],
       tournamentLabels = [],
       tournamentView = "month",
       tournamentRange = "1y";
 
   let vendorRange = "1y";
 
  //  user.subscribe((value) => {
  //    userObj = value;
  //  });
 
  onMount(() => {
    fetchUsers(); // This function fetches and populates the users in the store
  });
   // Subscribe to the userStore
   const unsubscribe = userStore.subscribe(value => {
    users = value;
    // Assuming you want to get the currently logged-in user
    user = users.find(u => u._id === AuthService.getUser()._id); 
    if (user) {
      userObj = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
      };
    }
  });
  let avatarPreview = userObj.avatar ?? "https://via.placeholder.com/64x64";
  // Cleanup the subscription when the component is destroyed
  onDestroy(() => {
    unsubscribe();
  });
   let showTournament = false;
   let showVendor = false;
 
   function getDateRange(period) {
 
     function formatDate(date, isStart) {
       if (!isStart) {
         date.setHours(23);
         date.setMinutes(59);
         date.setSeconds(59);
         return date;
       } else {
         return date;
       }
     }
 
     let presentDate = new Date();
     let previousDate;
 
     switch (period) {
       case "14d":
         previousDate = new Date(presentDate);
 
         previousDate.setDate(presentDate.getDate() - 13);
 
         break;
       case "30d":
         previousDate = new Date(presentDate);
 
         previousDate.setDate(presentDate.getDate() - 29);
 
         break;
       case "3m":
         previousDate = new Date(presentDate);
         previousDate.setMonth(presentDate.getMonth() - 2);
         previousDate.setDate(1);
         presentDate = new Date(presentDate.getFullYear(), presentDate.getMonth() + 1, 1);
         presentDate.setDate(presentDate.getDate() - 1);
         
         break;
       case "6m":
         previousDate = new Date(presentDate);
         previousDate.setMonth(presentDate.getMonth() - 5);
         previousDate.setDate(1);
         presentDate = new Date(presentDate.getFullYear(), presentDate.getMonth() + 1, 1);
         presentDate.setDate(presentDate.getDate() - 1);
 
         break;
       case "1y":
         previousDate = new Date(presentDate);
         previousDate.setMonth(presentDate.getMonth() - 11);
         previousDate.setDate(1);
         presentDate = new Date(presentDate.getFullYear(), presentDate.getMonth() + 1, 1);
         presentDate.setDate(presentDate.getDate() - 1);
 
         break;
       case "5y":
         previousDate = new Date(presentDate);
         previousDate.setFullYear(presentDate.getFullYear() - 4);
         previousDate.setMonth(0);
         previousDate.setDate(1);
         presentDate.setMonth(11)
         presentDate.setDate(31)
         break;
       default:
         throw new Error(
           "Invalid period. Use '14days', '30days', '1month', or '3months'."
         );
     }
     return {
       presentDate: new Date(formatDate(presentDate, false)),
       previousDate: new Date(formatDate(previousDate, true)),
     };
   }
 
   async function loadTournamentsData(fromDate, toDate) {
     try {
       const response = await dashboardRestClient.post(
         "/activeTournamentsCount",
         {fromDate, toDate, tournamentView},
       );
       
       if(tournamentView === "day") {
         tournamentLabels = Object.keys(response);
         tournamentLabels = tournamentLabels.map((label) => {
           const date = new Date(label);
           const options = { month: "long", day: "2-digit" };
           const str = date.toLocaleDateString("en-US", options);
           const firstThree = str.substring(0, 3); // First 3 characters
           const lastTwo = str.substring(str.length - 2); // Last 2 characters
           return `${lastTwo} ${firstThree}`;
         });
         Object.values(response).forEach((day) => {
           tournamentTierOne.push(day["1"]);
           tournamentTierTwo.push(day["2"]);
           tournamentTierThree.push(day["3"]);
         });
       } else if (tournamentView === "month") {
         tournamentLabels = Object.keys(response);
         tournamentLabels = tournamentLabels.map((label) => {
           // Split the input string to extract year and month
           let [year, month] = label.split('-');
           
           // Create a new Date object with the given year and month
           let date = new Date(+year, +month - 1); // month is 0-indexed, so subtract 1
           
           // Create an options object for formatting the month name
           let options = { month: 'short', year: 'numeric' };
           
           // Use toLocaleDateString to format the month and year
           return date.toLocaleDateString('en-US', options);
         })
         Object.values(response).forEach((month) => {
           tournamentTierOne.push(month["1"]);
           tournamentTierTwo.push(month["2"]);
           tournamentTierThree.push(month["3"]);
         });
       } else if (tournamentView === 'year') {
         tournamentLabels = Object.keys(response);
         Object.values(response).forEach((year) => {
           tournamentTierOne.push(year["1"]);
           tournamentTierTwo.push(year["2"]);
           tournamentTierThree.push(year["3"]);
         });
       }
     } catch (error) {
       console.error(error);
     }
   }
 
   const updateTournamentChart = async (currentRange, currentView) => {
     showTournament = false;
     tournamentTierOne = [];
     tournamentTierTwo = [];
     tournamentTierThree = [];
     tournamentRange = currentRange;
     tournamentView = currentView;
     const { presentDate, previousDate } = getDateRange(tournamentRange);
     await loadTournamentsData(previousDate, presentDate)
     showTournament = true;
   }
 
   async function countEventsByMonthAndYear(events, month, year) {
     const countByDate = {};
 
     events.forEach((event) => {
       const fromDate = new Date(event.event.fromDate);
       const toDate = new Date(event.event.toDate);
 
       // Define the start and end boundaries for the current month and year
       const startOfMonth = new Date(year, month - 1, 1); // First day of the month
       const endOfMonth = new Date(year, month, 0); // Last day of the month
 
       // Adjust the fromDate and toDate to only include days within the current month
       let currentFromDate = fromDate > startOfMonth ? fromDate : startOfMonth;
       let currentToDate = toDate < endOfMonth ? toDate : endOfMonth;
 
       // Only proceed if the event intersects with the current month
       if (currentFromDate <= currentToDate) {
         let currentDate = new Date(currentFromDate);
 
         // Iterate over each day between the adjusted fromDate and toDate (inclusive)
         while (currentDate <= currentToDate) {
           const dateStr = currentDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
 
           // Increment the count for that specific date
           if (!countByDate[dateStr]) {
             countByDate[dateStr] = 0;
           }
           countByDate[dateStr]++;
 
           // Move to the next day
           currentDate.setDate(currentDate.getDate() + 1);
         }
       }
     });
 
     return countByDate;
   }
 
   async function fetchEventsByDateRange(date, getBy) {
     const currentMonth = moment(currentDate).month();
     const currentYear = moment(currentDate).year();
     const body = { date, getBy };
     const url = `/vendorRecurringEventsByDateRange`;
     try {
       const response = await getEVENTSRest.post(url, body);
       const countByDays = await countEventsByMonthAndYear(response, currentMonth + 1, currentYear)
       let temp = {};
       const presentMonth = moment(currentDate).month();
       Object.keys(countByDays).forEach((date) => {
         const eventMonth = moment(date).month();
         if (presentMonth === eventMonth) {
           const eventDay = moment(date).date();
           temp[eventDay] = countByDays[date]
         }
       })
       eventDates = {...temp};
     } catch (error) {
       console.error("Error fetching events:", error);
     }
   }
 
   let selectedDate = moment();
   let days = [];
   const today = moment();
 
   function generateCalendarDays() {
     const startOfMonth = selectedDate.clone().startOf("month");
     const endOfMonth = selectedDate.clone().endOf("month");
     const startOfCalendar = startOfMonth.clone().startOf("week");
     const endOfCalendar = endOfMonth.clone().endOf("week");
 
     const date = startOfCalendar.clone().subtract(1, "day");
     days = [];
 
     while (date.isBefore(endOfCalendar, "day")) {
       days.push(date.add(1, "day").clone());
    }
     while (days.length < 42) {
        days.push(moment(days[days.length - 1]).add(1, "day"));
    }
   }
 
   function selectDay(day) {
     selectedDate = day;
     const selected = new Date(currentDate);
     selected.setDate(day.date());
     selected.setMonth(day.month());
     selected.setFullYear(day.year());
     newDate.set(moment(selected));
     router.goto(`/calendar/dayView?selectedView=Day%20View`);
   }
 
   async function previousMonth() {
     eventDates = {};
     const date = moment(currentDate, 'YYYY-MM-DD');
 
     // Subtract one month from the date
     date.subtract(1, 'months');
 
     // Format the updated date to a string
     const updatedDateStr = date.format('YYYY-MM-DD');
     currentDate = updatedDateStr;
     currentMonth = moment(currentDate).month();
     await fetchEventsByDateRange(currentDate, 'month');
 
     selectedDate = selectedDate.subtract(1, "month");
     generateCalendarDays();
   }
 
   async function nextMonth() {
     eventDates = {};
     const date = moment(currentDate, 'YYYY-MM-DD');
 
     // Subtract one month from the date
     date.add(1, 'months');
 
     // Format the updated date to a string
     const updatedDateStr = date.format('YYYY-MM-DD');
     currentDate = updatedDateStr;
     currentMonth = moment(currentDate).month();
     await fetchEventsByDateRange(currentDate, 'month');
 
     selectedDate = selectedDate.add(1, "month");
     generateCalendarDays();
   }

   async function refreshMetrics() {
    showTournament = false;
    let { presentDate, previousDate } = getDateRange(tournamentRange);
    // tournamentView = "day"
    await loadTournamentsData(previousDate, presentDate);
    await fetchEventsByDateRange(currentDate, 'month');
    showTournament = true;
   }
 
   onMount(async () => {
     generateCalendarDays();
     let { presentDate, previousDate } = getDateRange("1y");
     await loadTournamentsData(previousDate, presentDate);
     await fetchEventsByDateRange(currentDate, 'month');
     showTournament = true;
     showVendor = true;
   });
 </script>
 
 <div
   class="border-b bg-gray-50 border-gray-200 p-5 px-6 sm:flex sm:items-center sm:justify-between"
 >
   <h3 class="text-2xl font-semibold capitalize leading-6 text-gray-900">
     👋 Hello, {userObj.firstName}
     {userObj.lastName}
   </h3>
   <div class="mt-3 sm:ml-4 sm:mt-0">
     <button
       type="button"
       class="inline-flex gap-3 items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm focus-visible:outline focus-visible:outline-2 ring-1 ring-inset ring-gray-200 focus-visible:outline-offset-2"
       on:click={refreshMetrics}
     >
       <span class="material-symbols-outlined text-gray-400"> autorenew </span>
       Refresh all metrics
     </button>
   </div>
 </div>
 
 <div class="bg-gray-50 overflow-y-scroll h-[calc(100vh-150px)] relative">
   <div class="flex h-full flex-col">
     <div class="isolate md:flex flex-auto">
       <div class="flex flex-auto flex-col gap-y-5 px-6 pr-3 pb-16">
 
         <div class="grid grid-cols-1 gap-5 2xl:grid-cols-1 mt-5">
           <!-- Active tournaments graph -->
           <div
             class=" rounded-lg bg-white px-4 py-5 shadow ring-1 ring-gray-200 min-h-96"
           >
             <header class="flex items-center justify-between pb-2 mb-2">
               <h2
                 class="text-base font-medium leading-6 text-gray-900 flex items-center justify-center"
               >
                 Active tournaments
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 text-gray-400 ml-1">
                  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                </svg>
               </h2>
               <span class="isolate inline-flex rounded-md shadow-sm">
                 <button
                   type="button"
                   class="relative inline-flex items-center rounded-l-md {tournamentRange === '14d' ? 'bg-white-800 text-gray-500 hover:bg-gray-50' : 'bg-gray-100'} px-3 py-2 text-sm font-normal text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-10"
                   on:click={() => { updateTournamentChart('14d', 'day') }}
                   >14d</button
                 >
                 <button
                   type="button"
                   class="relative -ml-px inline-flex items-center {tournamentRange === '30d' ? 'bg-white-800 text-gray-500 hover:bg-gray-50' : 'bg-gray-100'} px-3 py-2 text-sm font-normal text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-10"
                   on:click={() => { updateTournamentChart('30d', 'day') }}
                   >30d</button
                 >
                 <button
                   type="button"
                   class="relative -ml-px inline-flex items-center {tournamentRange === '3m' ? 'bg-white-800 text-gray-500 hover:bg-gray-50' : 'bg-gray-100'} px-3 py-2 text-sm font-normal text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-10"
                   on:click={() => { updateTournamentChart('3m', 'month') }}
                   >3m</button
                 >
                 <button
                   type="button"
                   class="relative -ml-px inline-flex items-center {tournamentRange === '6m' ? 'bg-white-800 text-gray-500 hover:bg-gray-50' : 'bg-gray-100'} px-3 py-2 text-sm font-normal text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-10"
                   on:click={() => { updateTournamentChart('6m', 'month') }}
                   >6m</button
                 >
                 <button
                   type="button"
                   class="relative -ml-px inline-flex items-center {tournamentRange === '1y' ? 'bg-white-800 text-gray-500 hover:bg-gray-50' : 'bg-gray-100'} px-3 py-2 text-sm font-normal text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-10"
                   on:click={() => { updateTournamentChart('1y', 'month') }}
                   >1y</button
                 >
                 <button
                   type="button"
                   class="relative -ml-px inline-flex items-center {tournamentRange === '5y' ? 'bg-white-800 text-gray-500 hover:bg-gray-50' : 'bg-gray-100'} px-3 py-2 text-sm font-normal text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-10"
                   on:click={() => { updateTournamentChart('5y', 'year') }}
                   >5y</button
                 >
                 <!-- <button
                   type="button"
                   class="relative -ml-px inline-flex items-center rounded-r-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                   >Custom</button
                 > -->
               </span>
             </header>
            {#if showTournament }
             <div>
               <ActiveTournaments
                 title="Active tournaments"
                 bind:tierOneData={tournamentTierOne}
                 bind:tierTwoData={tournamentTierTwo}
                 bind:tierThreeData={tournamentTierThree}
                 bind:labels = {tournamentLabels}
               />
             </div>
            {/if}
           </div>
 
           <!-- Active Vendors graph -->
           <div class="relative">
            <div class="blur-container">
              <div
                class=" rounded-lg bg-white px-4 py-5 shadow ring-1 ring-gray-200 min-h-96"
              >
                <header class="flex items-center justify-between pb-2 mb-2">
                  <h2
                    class="text-base font-medium leading-6 text-gray-900 flex items-center justify-center"
                  >
                    Total Registered users
                    <span
                      class="material-symbols-outlined text-md ml-2 text-gray-500"
                    >
                      info
                    </span>
                  </h2>
                  <span class="isolate inline-flex rounded-md shadow-sm">
                    <button
                      type="button"
                      class="relative inline-flex items-center rounded-l-md {vendorRange === '14d' ? 'bg-gray-200' : 'bg-white hover:bg-gray-50'} px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10"
                      >14d</button
                    >
                    <button
                      type="button"
                      class="relative -ml-px inline-flex items-center {vendorRange === '30d' ? 'bg-gray-200' : 'bg-white hover:bg-gray-50'} px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10"
                      >30d</button
                    >
                    <button
                      type="button"
                      class="relative -ml-px inline-flex items-center {vendorRange === '3m' ? 'bg-gray-200' : 'bg-white hover:bg-gray-50'} px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10"
                      >3m</button
                    >
                    <button
                      type="button"
                      class="relative -ml-px inline-flex items-center {vendorRange === '6m' ? 'bg-gray-200' : 'bg-white hover:bg-gray-50'} px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10"
                      >6m</button
                    >
                    <button
                      type="button"
                      class="relative -ml-px inline-flex items-center {vendorRange === '1y' ? 'bg-gray-200' : 'bg-white hover:bg-gray-50'} px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10"
                      >1y</button
                    >
                    <button
                      type="button"
                      class="relative -ml-px inline-flex items-center {vendorRange === '5y' ? 'bg-gray-200' : 'bg-white hover:bg-gray-50'} px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10"
                      >5y</button
                    >
                    <button
                      type="button"
                      class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                      >Custom</button
                    >
                  </span>
                </header>
                {#if showVendor}
                  <div>
                    <ActiveVendors
                      title = ""
                    />
                  </div>
                {/if}
              </div>
              <div class="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-Rule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clip-Rule="evenodd" />
                  </svg>  
                </div>              
                <div>
                  <p class="text-black text-2xl">Coming Soon</p>
                </div>
              </div>
             </div>
           </div>
         </div>
       </div>
       <div
         class="md:w-1/2 md:max-w-md flex-none px-6 pl-3 sm:pl-6 md:pl-3 py-5"
       >
         <!-- Calender -->
         <div class=" rounded-lg bg-white px-4 py-6 shadow ring-1 ring-gray-200">
          <header class="flex items-center justify-between border-b pb-4 mb-5">
            <h2 class="text-base font-medium leading-6 text-gray-900">Esports Calendar</h2>
          </header>
           <div class="flex items-center text-center text-gray-900">
             <button
               type="button"
               class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
               on:click={previousMonth}
             >
               <span class="sr-only">Previous month</span>
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
             <div class="flex-auto text-gray-900 text-lg font-medium">
              {selectedDate.format("MMMM YYYY")}
             </div>
             <button
               type="button"
               class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
               on:click={nextMonth}
             >
               <span class="sr-only">Next month</span>
               <svg
                 class="h-5 w-5"
                 viewBox="0 0 20 20"
                 fill="currentColor"
                 aria-hidden="true"
               >
                 <path
                   fill-rule="evenodd"
                   d="M7.21 5.23a.75.75 0 00.02 1.06L11.168 10 7.23 13.71a.75.75 0 101.04 1.08l4.5-4.25a.75.75 0 000-1.08l-4.5-4.25a.75.75 0 00-1.06.02z"
                   clip-rule="evenodd"
                 />
               </svg>
             </button>
           </div>
 
           <div
             class="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500"
           >
             <div>S</div>
             <div>M</div>
             <div>T</div>
             <div>W</div>
             <div>T</div>
             <div>F</div>
             <div>S</div>
           </div>
 
           <div
             class="isolate mt-2 grid grid-cols-7 gap-px rounded-md bg-gray-200 text-sm shadow ring-1 ring-gray-200 overflow-hidden"
           >
           {#each days as day}
           {#if day}
             <button
               type="button"
               class="py-2 hover:bg-gray-100 focus:z-10 relative
               {day.month() !== selectedDate.month()
                 ? 'bg-gray-50 text-gray-500'
                 : 'bg-white text-gray-900'}"
               on:click={() => selectDay(day)}
             >
               <time
                 datetime={day.format("YYYY-MM-DD")}
                 class="mx-auto flex h-7 w-7 items-center justify-center rounded-full
                 {day.isSame(selectedDate, 'day')
                   ? ' text-white bg-blue-600'
                   : day.isSame(today, 'day')
                     ? ' text-indigo-600 font-semibold'
                     : day.month() !== selectedDate.month()
                       ? 'text-gray-300'
                       : ' text-gray-900'}"
               >
                 {day.date()}
               </time>
               {#if eventDates[day.date()] && currentMonth === day.month()}
                 <div
                   class="bg-orange-400 rounded-full absolute bottom-1 start-6"
                   style="width: {3}px; height: {3}px;"
                 ></div>
               {/if}
             </button>
           {:else}
             <div class="bg-gray-50 py-1.5 text-gray-400"></div>
           {/if}
         {/each}
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
 

<style>
  .blur-container {
    @apply blur-sm; /* Apply Tailwind's blur utility */
    filter: blur(0px) grayscale(100%); /* Optional: control the intensity of the blur */
  }
</style>