<script>
    export let link;
    export let color;
    export let border;

</script>
<li class=" mb-0.5 leading-normal truncate">
    <a href="{link}" class="group flex truncate leading-normal cursor-pointer">
        <div class="flex float-left truncate">
            <div class=" w-1 mr-1 truncate" style="background-color: {border};"></div> 
            <p class="truncate font-medium" style="color: {color};">
                <slot />
            </p> 
        </div>
    </a>
</li>