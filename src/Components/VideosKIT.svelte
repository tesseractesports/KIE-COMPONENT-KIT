<script>
	import { THEMES } from './../stores/ThemeConfig.js';
    import { webConfig } from '../stores/webConfig.js';
    $: videos = $webConfig?.info?.videos?.videos || [];
    $: theme = $webConfig?.theme || THEMES.DEFAULT;

    // Function to handle video click
    function handleVideoClick(url) {
        if (url) window.open(url, '_blank');
    }

    // Function to format duration if provided
    function formatDuration(duration) {
        return duration || '';
    }
</script>

<div class="w-full" style:background-color={theme.colors.background}>
    <div class="w-full py-6 sm:py-8 md:py-10 flex-col justify-start items-start gap-10 px-6 lg:px-10">
        <!-- Videos Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each videos as video}
                <div 
                    class="flex flex-col bg-opacity-20 rounded-xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
                    on:click={() => handleVideoClick(video.videoUrl)}
                    style:background-color={theme.colors.background}
                >
                    <!-- Thumbnail Container -->
                    <div class="relative w-full aspect-video">
                        <img 
                            src={video.videoThumbnail}
                            alt={video.videoTitle}
                            class="w-full h-full object-cover"
                        />
                        
                        <!-- Play Button Overlay -->
                        <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <div 
                                class="w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center"
                                style:background-color={theme.colors.primary}
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 24 24" 
                                    fill="currentColor" 
                                    class="w-6 h-6 lg:w-8 lg:h-8 text-white ml-1"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>

                        <!-- Duration Badge -->
                        {#if video.duration}
                            <div 
                                class="absolute bottom-2 right-2 px-2 py-1 rounded text-xs"
                                style:background-color={theme.colors.background}
                                style:color={theme.colors.foreground}
                            >
                                {formatDuration(video.duration)}
                            </div>
                        {/if}
                    </div>

                    <!-- Video Info -->
                    <div class="p-4 flex flex-col gap-2" style:border-color={theme.colors.primary}>
                        <h3 
                            class="text-sm lg:text-base font-semibold line-clamp-2"
                            style:color={theme.colors.foreground}
                        >
                            {video.videoTitle}
                        </h3>
                        
                        {#if video.description}
                            <p 
                                class="text-sm line-clamp-2"
                                style:color={`${theme.colors.foreground}99`}
                            >
                                {video.description}
                            </p>
                        {/if}
                        
                        {#if video.uploadDate}
                            <span 
                                class="text-xs"
                                style:color={`${theme.colors.foreground}99`}
                            >
                                {new Date(video.uploadDate).toLocaleDateString()}
                            </span>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>

        <!-- Empty State -->
        {#if videos.length === 0}
            <div 
                class="w-full flex flex-col items-center justify-center py-20 px-4 rounded-lg"
                style:background-color={`${theme.colors.background}22`}
            >
                <div 
                    class="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style:background-color={`${theme.colors.primary}22`}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        class="w-8 h-8" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor"
                        style:color={theme.colors.primary}
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 
                    class="text-lg font-semibold mb-2"
                    style:color={theme.colors.foreground}
                >
                    No Videos Available
                </h3>
                <p 
                    class="text-center text-sm"
                    style:color={`${theme.colors.foreground}99`}
                >
                    Videos will be added as the tournament progresses.
                </p>
            </div>
        {/if}

        <!-- Load More Button (if needed) -->
        {#if videos.length >= 9}
            <div class="w-full flex justify-center mt-8">
                <button 
                    class="px-6 py-3 rounded-lg transition-colors duration-300"
                    style:background-color={theme.colors.primary}
                    style:color={theme.colors.background}
                >
                    Load More Videos
                </button>
            </div>
        {/if}
    </div>
</div>

<style>
    /* Optional: Add hover effect for video cards */
    .video-card {
        transition: transform 0.2s ease-in-out;
    }
    
    .video-card:hover {
        transform: translateY(-4px);
    }

    /* Optional: Add smooth transitions for theme changes */
    div {
        transition: background-color 0.3s ease, color 0.3s ease;
    }
</style>