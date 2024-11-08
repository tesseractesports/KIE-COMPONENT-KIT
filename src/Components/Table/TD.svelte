<script>
  export let customClass;
  export let rowspan;
</script>

<td
  class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 {customClass}"
  {rowspan}
>
  <slot />
</td>
