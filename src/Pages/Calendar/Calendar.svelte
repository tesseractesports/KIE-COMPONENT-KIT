<script>
  import AgendaView from "./Agenda/AgendaView.svelte";
  import WeekView from "./Week/WeekView.svelte";
  import CalendarHeader from "./CalendarHeader.svelte";
  import { Route, router } from "tinro";
  import MonthView from "./Month/MonthView.svelte";
  import DayView from "./Day/DayView.svelte";
  
</script>

<div class="flex h-full flex-col">
  <!-- <CalendarHeader /> -->
  <Route path="/" redirect="/calendar/monthView?selectedView=Month View" />
  <Route path="/monthView">
    <MonthView />
  </Route>
  <Route path="/weekView">
    <WeekView />
  </Route>
  <Route path="/dayView">
    <DayView />
  </Route>
  <Route path="/agendaView">
    <AgendaView />
  </Route>
</div>
