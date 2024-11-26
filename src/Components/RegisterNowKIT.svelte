<script>
  import SectionKit from "./SectionKIT.svelte";
  import { webConfig } from '../stores/webConfig.js';
  import { THEMES } from "../stores/ThemeConfig";

  // $: leaderboard = $webConfig?.info?.leaderboard;
  $:registerNowSection = $webConfig.registerNowSection;
    $: theme = $webConfig?.theme || THEMES.DEFAULT;
  // const defaultRegisterNow={
  //     imageURL: '../images/registernow-banner.png',
  //     title: 'Battle for Glory: BGIS 2025 Begins!',
  //     description: 'The BGIS 2025 Championship is coming soon! Gear up to witness the nation’s teams clash in an epic battle for victory and glory.',
  //     buttonText: 'Register Now'
  // }


  </script>
  
  <div class="bg-no-repeat bg-cover bg-center" style="background-image: url({registerNowSection.background});">
      <SectionKit>
          <div class="relative z-0 flex flex-col items-start justify-center gap-y-3 py-24 font-medium" >
              <div class=" self-stretch text-4xl font-extrabold leading-10 text-yellow-400" >
               {registerNowSection.title}
              </div>
              <div class="flex items-start self-stretch text-sm leading-5 text-white max-w-lg" >
                <p>
                 {registerNowSection.description}
                </p>
              </div>
              <div class="flex items-end pt-4">
                <a href="" class="rounded-md bg-yellow-400 px-8 py-2 text-center leading-6 text-neutral-900 drop-shadow-lg" >
                Register Now
                </a>
              </div>
            </div>
      </SectionKit>
    </div>
  