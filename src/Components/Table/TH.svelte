<script>
  export let customClass;
  export let style;
</script>

<th
  scope="row"
  class="px-3 py-2 text-left text-sm font-semibold text-gray-500 bg-gray-50 {customClass}"
  {style}
>
  <slot />
</th>
