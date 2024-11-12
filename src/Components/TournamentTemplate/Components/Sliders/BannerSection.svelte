<script>
  import Section from '../Section.svelte';
import CardSlider from './CardSlider.svelte';
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';
  export let data = {};
  console.log(data );
  // Array of banner data for looping
  const bannerData = {
  title: data.banner.title ? data.banner.title : "Tournament Name",
  description: data.banner.description,
  logo: data.banner.logo,
  backgroundUrl: data.banner.background,
  isLargeBackground: data.banner.largeBackground,
  largeBackgroundUrl: data.banner.largeBackgroundUrl, 
  button1: { text: "Watch Live", url: data.banner.liveChannerUrl},
  button2: { text: "Tournament details", url:"#info" }
}
    
</script>
{#if bannerData.isLargeBackground}
  <div class="main-bg bg-cover" style="background-image: url({bannerData.largeBackgroundUrl ? bannerData.largeBackgroundUrl : "https://api.dev.kie.tesseractesports.com/assets/cms_assets/main_banner_bg.png"});">
    <Section>
      <div class="flex items-start w-full">
        <div class="h-full w-full">
          <div class="bg-image flex max-h-full max-w-full flex-col bg-no-repeat">
            <div class="z-0 flex flex-col justify-end gap-y-4 bg-cover bg-center pb-16 lg:pb-28 pt-[320px] lg:pt-[420px] w-f">
              <img src={bannerData.logo} alt="" class="z-10 h-[120px] w-24 flex-shrink-0">
              <div class="flex items-end pt-2">
                <div class="font-manrope flex-grow text-[56px] font-extrabold leading-[normal] text-yellow-400">
                  {bannerData.title}
                </div>
              </div>
              <div class="flex items-end pt-1 w-full">
                <div class="flex flex-grow items-end text-lg leading-8 text-white">
                  <p class="max-w-lg">{bannerData.description}</p>
                </div>
              </div>
              <div class="flex flex-wrap items-end justify-between gap-x-6 gap-y-5 ">
                <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-5 leading-6 ">
                  <a href="" class="flex items-center justify-center gap-x-3 rounded-md border border-solid border-neutral-600 bg-neutral-800 px-3 py-2 drop-shadow-lg">
                    <span class="material-symbols-outlined text-red-700">
                      videocam
                      </span>
                    <div class="text-[silver]">{bannerData.button1.text}</div>
                  </a>
                  <a href="" class="rounded-md bg-yellow-400 px-3 py-2 text-center text-neutral-900 drop-shadow-lg">
                    {bannerData.button2.text}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  </div>
  {:else}
  <div class="main-bg bg-cover" style="background-image: url({bannerData.backgroundUrl ? bannerData.backgroundUrl : "https://dev-kie-tmp-docs.s3.ap-south-1.amazonaws.com/tournament-page-assets/BGMI_background.png"});">
    <Section>
      <div class="h-80 w-full py-16 justify-start items-center gap-2.5 inline-flex">
        <div class="grow shrink basis-0 h-48 justify-start items-center gap-2.5 flex">
          <div class="grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
            <div class="self-stretch text-white text-6xl font-extrabold leading-10">{bannerData.title}</div>
            <div class="self-stretch text-white text-xl font-semibold leading-loose">{bannerData.description}</div>
          </div>
          <div class="w-44 h-48 relative items-center justify-end hidden sm:flex">
            <img src={bannerData.logo} alt="" class="">
          </div>
        </div>
      </div>
    </Section>
  </div>
{/if}

  
  
