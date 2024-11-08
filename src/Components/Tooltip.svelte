<script>
  export let visible = false;
  export let message = "";
  export let hoverOnSide = false;
</script>

<div class={`absolute mt-2 bg-black text-white py-1 px-2 rounded shadow-md z-10 ${visible ? "block" : "hidden" }
  ${hoverOnSide ? "left-4/5 text-xs w-1/3 transform translate-x-10 -translate-y-1/2 top-1/3" : "left-0 text-xs" }`}
  style="font-size: {hoverOnSide ? '0.7rem' : '0.6rem'};">
  {message}
</div>