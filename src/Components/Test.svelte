<!-- src/components/Banner.svelte -->
<script>
    export let title = "Welcome!";
    export let description = "This is a reusable banner component.";
    export let logo = "./images/Group 2.png";
    export let logo1 = "./images/Group 2.png";
    export let logo2 = "/images/Group 2.png";
    export let logo3 = "./assets/images/Group 2.png";
    export let logo4 = "../assets/images/Group 2.png";
    export let logo5 = "/assets/images/Group 2.png";
  </script>
  
  <div class="banner bg-cover bg-center text-white p-8 rounded-lg shadow-lg" style="background-image: url('../assets/images/comingsoon-banner.png');">
    <img src="{logo}" alt="Logo" class="w-16 h-16 mb-4" />
    <img src="{logo1}" alt="Logo" class="w-16 h-16 mb-4" />
    <img src="{logo2}" alt="Logo" class="w-16 h-16 mb-4" />
    <img src="{logo3}" alt="Logo" class="w-16 h-16 mb-4" />
    <img src="{logo4}" alt="Logo" class="w-16 h-16 mb-4" />
    <img src="{logo5}" alt="Logo" class="w-16 h-16 mb-4" />
    <h1 class="text-2xl font-bold">{title}</h1>
    <p class="mt-2">{description}</p>
  </div>
  
  <style>
    .banner {
      max-width: 400px;
    }
  </style>
  