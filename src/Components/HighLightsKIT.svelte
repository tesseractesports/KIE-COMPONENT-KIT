<script>
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import CardSlider from "./CardSliderKIT.svelte";
  import { webConfig } from '../stores/webConfig.js';
  import { ThemeConfig, THEMES } from '../stores/ThemeConfig.js';
  import SectionKit from "./SectionKIT.svelte";
      const splideOptions = {
        arrowPath: "",
        gap: "22px",
        autoplay: false,
        pagination: false,
        arrows: true,
        perMove: 1,
        focus: "left",
        autoWidth: true,
        type: "loop",
      };

      $: theme = $webConfig?.theme || THEMES.DEFAULT;  
      $:highlightsdata = $webConfig?.highlights ;
</script>

<SectionKit>
  <div class="video-slider-custom mb-16">
      <div class="py-10 flex-col justify-center items-end gap-5 inline-flex">
        <div
          class="self-stretch h-6  text-lg font-semibold font-['Inter'] uppercase leading-normal tracking-wide"
          style:color={theme.colors.primary}
        >
          HIGHLIGHTS
        </div>
      </div>
      <CardSlider options={splideOptions}>
        {#each highlightsdata as highlight  }
          <SplideSlide>
            <div
              class="flex flex-grow flex-col py-2 px-2 items-start justify-center gap-y-3 rounded-xl max-w-[238px] lg:max-w-[387px] transition duration-300 border border-transparent hover:border-[color:var(--Gold-800,#63542D)] bg-[var(--Charcoal-900,#111)]"
            >
              <div class="relative w-full h-full">
                <a href={highlight.videoUrl} target="_blank">
                    <img
                      alt=""
                      src={highlight.videoThumbnail}
                      loading="lazy"
                      class=" w-full flex-shrink-0 rounded-md object-cover object-center"
                    />
                  <div
                    class=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-black/20 backdrop-blur rounded-full flex items-center justify-center"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path id="Polygon 1" d="M15.2874 6.90473C16.2375 7.3913 16.2375 8.60773 15.2874 9.0943L2.13782 15.8283C1.18768 16.3148 -4.79569e-08 15.7066 0 14.7335L6.63702e-07 1.26555C7.11659e-07 0.292404 1.18768 -0.31581 2.13782 0.170762L15.2874 6.90473Z" fill="white"/>
                      </svg>
                  </div>
                </a>
              </div>
    
              <div
                class="flex items-start self-stretch font-['inter'] leading-7 text-white"
              >
                <p>
                  {highlight.videoTitle}
                </p>
              </div>
            </div>
          </SplideSlide>
        {/each}
      </CardSlider>
    </div>
  </SectionKit>
  
  <style>
    .video-slider-custom :global(.splide__arrow) {
      border-radius: 0 !important;
      opacity: 1 !important;
      bottom: -60px !important;
      outline: none !important;
      border-radius: 50% !important;
      display: flex !important;
      width: 32px !important;
      height: 32px !important;
      border-radius: 16px;
      opacity: 0.4;
      background: var(--Charcoal-700, #000000) !important;
    }
  
    .video-slider-custom :global(.splide__arrow--prev) {
      left: auto !important;
      right: 60px !important;
    }
    .video-slider-custom :global(.splide__arrow--next) {
      right: 15px !important;
    }
  
    .video-slider-custom :global(.splide__pagination) {
      bottom: auto !important;
    }
  
    .video-slider-custom :global(.splide__arrow) {
      z-index: 2 !important;
    }
  
    .video-slider-custom :global(.splide__arrows) {
      position: absolute;
      max-width: 1920px;
      margin: 0 auto;
      width: 100%;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
    }
  
    .video-slider-custom :global(.splide__arrow svg) {
      fill: #ffffff !important;
      width: 20px !important;
      height: 20px !important;
      color: #1d1d1d;
    }
  
    @media (max-width: 992px) {
      .video-slider-custom :global(.splide__arrows) {
        display: none !important;
      }
    }
  </style>
  