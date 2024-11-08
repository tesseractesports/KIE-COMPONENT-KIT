<script>
    export let agendaObj;
    import moment from "moment";
  import { timeFormatter } from "../../../Utils/converters";
  import { getEventColor } from "../../../Utils/colorCodes";
</script>

<div class="flex gap-x-6">
    <div class="">
        <p class=" font-medium whitespace-nowrap truncate text-base" style="color: {getEventColor(agendaObj)}">{timeFormatter(agendaObj, "start")} - {timeFormatter(agendaObj, "end")}</p>
        <!-- <p class=" font-normal text-sm text-gray-400 whitespace-nowrap truncate">{agendaObj.event.vendorName ? agendaObj.event.vendorName : "Vendor name" }</p> -->
    </div>
    <div class="">
        <p class=" font-medium whitespace-nowrap truncate text-base" style="color: {getEventColor(agendaObj)}">{agendaObj.event.title}</p>
        <!-- <p class=" font-normal text-sm text-gray-400 whitespace-nowrap truncate"> Round {agendaObj.round ? agendaObj.round : "00"}, Day {agendaObj.day ? agendaObj.day : "00"}</p> -->
    </div>
</div>
<div class="flex flex-none items-center gap-x-4">
    {#if (agendaObj.streemStatus && agendaObj.streemStatus == "online")}
            <div class="rounded-full flex py-1 px-2 text-xs font-medium bg-red-100">
                <div class="flex-none rounded-full p-1">
                    <div class="h-2 w-2 rounded-full bg-current bg-red-400"></div>
                </div>
                <span class=" mx-1 capitalize text-red-800">Streaming</span>
            </div>
            {:else if agendaObj.streemStatus == "offline"}
            <div class="rounded-full flex py-1 px-2 text-xs font-medium  bg-gray-100">
                <div class="flex-none rounded-full p-1">
                    <div class="h-2 w-2 rounded-full bg-current"></div>
                </div>
                <span class=" mx-1 capitalize">Offline</span>
            </div>
            {:else}
            <span></span>
        {/if}
    
    
    <button type="button" class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900" id="options-menu-0-button" aria-expanded="false" aria-haspopup="true">
        <span class="sr-only">Open options</span>
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
        </svg>
      </button>
</div>