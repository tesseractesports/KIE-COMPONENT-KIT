<script>
  import AuthService from "../Services/AuthService";

  export let watermark = "Watermark"; // Default watermark text
  let user = null;

  // get loged in user
  watermark = AuthService.getUser().email;
</script>

<div class="watermark-container">
  <slot />
  <!-- Content of the component -->
  <div class="watermark">{watermark}</div>
  <div class="watermark1">{watermark}</div>

</div>

<style>
  .watermark-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .watermark {
    position: absolute;
    top: 550px;
    left: 25%;
    transform: translate(-50%, -50%);
    opacity: 0.1;
    font-size: 3rem;
    color: gray;
    pointer-events: none; /* Prevent interactions */
    white-space: nowrap;
    rotate: 35deg;
  }

  .watermark1 {
    position: absolute;
    top: 550px;
    left: 55%;
    transform: translate(-50%, -50%);
    opacity: 0.1;
    font-size: 3rem;
    color: gray;
    pointer-events: none; /* Prevent interactions */
    white-space: nowrap;
    rotate: 35deg;
  }

  
</style>
