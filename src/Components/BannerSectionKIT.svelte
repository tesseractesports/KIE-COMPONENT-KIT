<script>
  import { writable } from 'svelte/store';
  import SectionKIT from './SectionKIT.svelte';
  import { ThemeConfig } from '../stores/ThemeConfig';
  import { webConfig } from '../stores/webConfig';
  
  $: theme = $ThemeConfig;
  $: bannerData = {
      title: $webConfig?.banner?.title,
      description: $webConfig?.banner?.description,
      logo: $webConfig?.banner?.logo,
      backgroundUrl: $webConfig?.banner?.background,
      isLargeBackground: $webConfig?.banner?.largeBackground,
      largeBackgroundUrl: $webConfig?.banner?.largeBackgroundUrl,
      button1: { 
          text: "Watch Live",
          url: $webConfig?.banner?.liveChannerUrl
      },
      button2: { 
          text: "Tournament details",
          url: "#info"
      }
  };
</script>

{#if bannerData.isLargeBackground}
  <div 
      class="main-bg bg-cover relative"
      style="background-image: url({bannerData.largeBackgroundUrl || '/api/placeholder/1920x1080'});"
  >
      <!-- Overlay gradient for better text readability -->
      <div class="absolute inset-0" style="background: linear-gradient(to top, {theme.colors.background}ee, {theme.colors.background}00);">
      </div>
      
      <SectionKIT>
          <div class="relative z-10 flex items-start w-full">
              <div class="h-full w-full">
                  <div class="flex max-h-full max-w-full flex-col bg-no-repeat">
                      <div class="flex flex-col justify-end gap-y-4 pb-16 lg:pb-28 pt-[320px] lg:pt-[420px] w-full">
                          <!-- Logo -->
                          {#if bannerData.logo}
                              <img 
                                  src={bannerData.logo} 
                                  alt="Tournament Logo" 
                                  class="z-10 h-[120px] w-24 flex-shrink-0"
                              />
                          {/if}

                          <!-- Title -->
                          <div class="flex items-end pt-2">
                              <h1 
                                  class="font-manrope flex-grow text-[56px] font-extrabold leading-[normal]"
                                  style:color={theme.colors.primary}
                              >
                                  {bannerData.title}
                              </h1>
                          </div>

                          <!-- Description -->
                          <div class="flex items-end pt-1 w-full">
                              <p 
                                  class="max-w-lg text-lg leading-8"
                                  style:color={theme.colors.foreground}
                              >
                                  {bannerData.description}
                              </p>
                          </div>

                          <!-- Buttons -->
                          <div class="flex flex-wrap items-end justify-between gap-x-6 gap-y-5">
                              <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-5 leading-6">
                                  <a 
                                      href={bannerData.button1.url} 
                                      class="flex items-center justify-center gap-x-3 rounded-md px-3 py-2 drop-shadow-lg transition-all duration-300"
                                      style="background-color: {theme.colors.background}22; border: 1px solid {theme.colors.foreground}33;"
                                  >
                                      <span 
                                          class="material-symbols-outlined"
                                          style:color={theme.colors.primary}
                                      >
                                          videocam
                                      </span>
                                      <div style:color={theme.colors.foreground}>
                                          {bannerData.button1.text}
                                      </div>
                                  </a>
                                  <a 
                                      href={bannerData.button2.url} 
                                      class="rounded-md px-3 py-2 text-center drop-shadow-lg transition-all duration-300"
                                      style="background-color: {theme.colors.primary}; color: {theme.colors.background};"
                                  >
                                      {bannerData.button2.text}
                                  </a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </SectionKIT>
  </div>
{:else}
  <div 
      class="main-bg bg-cover relative"
      style="background-image: url({bannerData.backgroundUrl || '/api/placeholder/1920x300'});"
  >
      <!-- Overlay gradient -->
      <div 
          class="absolute inset-0"
          style="background: linear-gradient(to right, {theme.colors.background}cc, {theme.colors.background}00);"
      >
      </div>

      <SectionKIT>
          <div class="relative z-10 h-80 w-full py-16 justify-start items-center gap-2.5 inline-flex">
              <div class="grow shrink basis-0 h-48 justify-start items-center gap-2.5 flex">
                  <div class="grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
                      <h1 
                          class="self-stretch text-6xl font-extrabold leading-10"
                          style:color={theme.colors.primary}
                      >
                          {bannerData.title}
                      </h1>
                      <p 
                          class="self-stretch text-xl font-semibold leading-loose"
                          style:color={theme.colors.foreground}
                      >
                          {bannerData.description}
                      </p>
                  </div>
                  {#if bannerData.logo}
                      <div class="w-44 h-48 relative items-center justify-end hidden sm:flex">
                          <img src={bannerData.logo} alt="Tournament Logo">
                      </div>
                  {/if}
              </div>
          </div>
      </SectionKIT>
  </div>
{/if}

<style>
  .main-bg {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
  }

  /* Smooth transitions for theme changes */
  div, h1, p, a {
      transition: all 0.3s ease;
  }
</style>