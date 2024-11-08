<script>
    import { active } from "tinro";
    export let href = "";
    export let text = "";
    export let icon = "";
  </script>
  
  <li>
    <a href={href} use:active active-class="link-active"
      class="text-gray-300 hover:text-white hover:bg-gray-900 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold lg:justify-start md:justify-center">
      <span class="material-symbols-outlined h-6 w-6 shrink-0 text-gray-300">
        {icon}
      </span>
      <span class="md:hidden lg:block ">{text}</span> 
    </a>
  </li>
  
  <style>
     :global(.link-active) {
        color: #ffffff;
        background: var(--gray-900, #111827);
    }
  </style>