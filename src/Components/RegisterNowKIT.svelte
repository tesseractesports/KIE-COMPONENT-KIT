<script>
  import { writable } from 'svelte/store';
  import SectionKit from "./SectionKIT.svelte";
  import { webConfig } from '../stores/webConfig.js';
  import { ThemeConfig } from '../stores/ThemeConfig.js';
  $: theme = $ThemeConfig;
  $:registerdata={
    title:$webConfig?.registerNowSection?.title,
    description:$webConfig?.registerNowSection?.description,
    logo:$webConfig?.registerNowSection?.logo,
  }

  </script>
  
  <div class="bg-no-repeat bg-cover bg-center" style="background-image: url({registerdata.logo ||'/api/placeholder/1920x1080'});">
      <SectionKit>
          <div class="relative z-0 flex flex-col items-start justify-center gap-y-3 py-24 font-medium" >
              <h1 class=" self-stretch text-4xl font-extrabold leading-10 text-yellow-400"
              style:color={theme.colors.primary}
             >
               {registerdata.title}
              </h1>
              <div class="flex items-start self-stretch text-sm leading-5 text-white max-w-lg" >
                <p  class="max-w-lg text-lg leading-8"
                   style:color={theme.colors.foreground}>
                 {registerdata.description}
                </p>
              </div>
              <div class="flex items-end pt-4">
                <a href="" class="rounded-md bg-yellow-400 px-8 py-2 text-center leading-6 text-neutral-900 drop-shadow-lg"
                 style="background-color: {theme.colors.primary}; color: {theme.colors.background};"
                >
                  Register Now
                </a>
              </div>
            </div>
      </SectionKit>
    </div>
  