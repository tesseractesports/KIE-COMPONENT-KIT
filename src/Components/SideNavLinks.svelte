<script>
  import { active, Route, router } from "tinro";
  import { sidebarOpen } from "../Stores/SidebarStore";
  import Link from "./Link.svelte";
  const meta = router.meta();
</script>

<!-- <ul class="flex flex-1 flex-col gap-y-7">
  <li>
    <ul class="-mx-2 md:mx-0 space-y-1">
      <li>
        <a
          href="/calendar"
          use:active
          active-class="link-active"
          class="text-gray-300 hover:text-white hover:bg-gray-900 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold lg:justify-start md:justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
              stroke="#9CA3AF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Calendar
        </a>
      </li>

      <li>
        <a
          href="/tournaments"
          use:active
          active-class="link-active"
          class="text-gray-300 hover:text-white hover:bg-gray-900 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold lg:justify-start md:justify-center"
        >
          <svg
            class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              d="M11.9999 11C11.9999 14.5172 10.9911 17.7988 9.24707 20.5712M5.80688 18.5304C5.82459 18.5005 5.84273 18.4709 5.8613 18.4413C7.2158 16.2881 7.99991 13.7418 7.99991 11C7.99991 8.79086 9.79077 7 11.9999 7C14.209 7 15.9999 8.79086 15.9999 11C15.9999 12.017 15.9307 13.0186 15.7966 14M13.6792 20.8436C14.2909 19.6226 14.7924 18.3369 15.1707 17M19.0097 18.132C19.6547 15.8657 20 13.4732 20 11C20 6.58172 16.4183 3 12 3C10.5429 3 9.17669 3.38958 8 4.07026M3 15.3641C3.64066 14.0454 4 12.5646 4 11C4 9.54285 4.38958 8.17669 5.07026 7"
              stroke="#9CA3AF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Tournaments
        </a>
      </li>
      <li>
        <a
          href="/vendorProfile"
          use:active
          active-class="link-active"
          class="text-gray-300 hover:text-white hover:bg-gray-900 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold lg:justify-start md:justify-center"
        >
          <svg
            class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>
          Vendor Profile
        </a>
      </li>

      <li>
        <a
          href="/reports"
          use:active
          active-class="link-active"
          class="text-gray-300 hover:text-white hover:bg-gray-900 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold lg:justify-start md:justify-center"
        >
          <svg
            class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
            />
          </svg>
          Reports
        </a>
      </li>
      <li>
        <a
          href="/users"
          use:active
          active-class="link-active"
          class="text-gray-300 hover:text-white hover:bg-gray-900 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold lg:justify-start md:justify-center"
        >
          <svg
            class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>
          My team
        </a>
      </li>
    </ul>
  </li>
</ul> -->
<ul class="flex flex-1 flex-col gap-y-7">
  <li>
    <ul class="-mx-2 md:mx-0 space-y-1">
      <Link href="/admin" text="Dashboard" icon="analytics" />
      <Link href="/calendar" text="Calendar" icon="calendar_today" />
      <Link href="/tournaments" text="Tournaments" icon="emoji_events" />
      <Link href="/vendorProfile" text="Vendor Profile" icon="person" />
      <!-- <Link href="/reports" text="Tournament Reports" icon="report" /> -->
      <Link href="/users" text="My team" icon="group" />
    </ul>
  </li>
</ul>
