<script>
  import { onMount } from "svelte";

  export let steps = [],
    currentActive = 1;
  let circles, progress;
  let stepLabels = [
    "ADMIN DETAILS ",
    "COMPANY DETAILS",
    "BUSINESS DETAILS",
    "LEGAL DETAILS",
    "PREVIEW & SUBMIT",
  ];

  export const handleProgress = (stepIncrement) => {
    circles = document.querySelectorAll(".circle");
    if (stepIncrement == 1 && currentActive <= circles.length) {
      currentActive++;
    } else if (stepIncrement == 0 && currentActive > 1) {
      currentActive--;
    }

    update();
  };

  const handleStepClick = (index) => {
    if (
      index <= currentActive ||
      circles[index].classList.contains("completed")
    ) {
      currentActive = index;
    } else if (
      index === currentActive ||
      circles[index].classList.contains("current")
    ) {
      currentActive = index;
    }
  };

  function update() {
    circles.forEach((circle, index) => {
      if (index < currentActive) {
        // Completed circle
        circle.classList.add("completed");
        circle.classList.remove("current");
        circle.classList.remove("next");
      } else if (index === currentActive) {
        // Active circle
        circle.classList.add("current");
        circle.classList.remove("next");
      } else {
        // Pending circle
        circle.classList.add("next");
      }
    });
  }
  onMount(() => {
    // update();
  });
</script>

<div bind:this={circles}>
  <ol
    role="list"
    class="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-gray-200"
  >
    {#each steps as step, i}
      <li class="relative overflow-hidden lg:flex-1 circle">
        <div
          class="overflow-hidden border border-gray-200 rounded-t-md border-b-0 lg:border-0"
        >
          <a
            href="#"
            class="group"
            on:click|preventDefault={() => handleStepClick(i)}
          >
            <span
              class="absolute bottom-line left-0 top-0 h-full w-1 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full {i ==
              currentActive
                ? ' bg-blue-600 '
                : ''}"
              aria-hidden="true"
            ></span>
            <span class="flex px-6 py-5 text-sm font-medium items-center">
              <span class="flex-shrink-0">
                <span class="flex-shrink-0">
                  <span
                    class="circle-bg flex h-10 w-10 items-center justify-center rounded-full {i ==
                    currentActive
                      ? 'border-2 border-blue-600 bg-white'
                      : 'border-2 border-gray-300 bg-white'}"
                  >
                    {#if currentActive <= i}
                      <span class="flex-shrink-0">
                        <span
                          class="circle-bg flex h-10 w-10 items-center justify-center rounded-full {i ==
                          currentActive
                            ? 'border-2 border-blue-600 bg-white'
                            : 'border-2 border-gray-300 bg-white'}"
                        >
                          <span
                            class="cirlce-inner-text {i == currentActive
                              ? ' text-blue-600'
                              : ' text-gray-400'}">{i + 1}</span
                          >
                        </span>
                      </span>
                    {:else}
                      <span class="flex-shrink-0">
                        <span
                          class="circle-bg flex h-10 w-10 items-center justify-center rounded-full border-2 bg-blue-600 border-blue-600"
                        >
                          <svg
                            class="h-6 w-6 text-white"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                      </span>
                    {/if}
                  </span>
                </span>
              </span>
              <span class="ml-4 mt-0.5 flex min-w-0 flex-col">
                <span
                  class="text-sm font-medium circle-lable {i == currentActive
                    ? ' text-blue-600'
                    : ' text-gray-400'}">{stepLabels[i]}</span
                >
              </span>
            </span>
          </a>
          <div
            class="absolute inset-0 left-0 top-0 hidden w-3 lg:block"
            aria-hidden="true"
          >
            <svg
              class="h-full w-full text-gray-300"
              viewBox="0 0 12 82"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0.5 0V31L10.5 41L0.5 51V82"
                stroke="currentcolor"
                vector-effect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
      </li>
    {/each}
  </ol>
</div>

<style>
  :global(.circle.completed .line),
  :global(.circle.completed .circle-bg) {
    background:#2563eb !important;
  }

  :global(.circle.completed .circle-bg) {
    background:#2563eb !important;
    border-color:#2563eb !important;
  }

  :global(.circle.completed .cirlce-inner-text) {
    color: #fff;
  }

  :global(.circle.completed .circle-lable),
  :global(.circle.current .circle-lable) {
    color:#2563eb !important;
  }

  :global(.circle.current .circle-bg) {
    border-color:#2563eb !important;
  }

  :global(.circle.current .cirlce-inner-text) {
    color:#2563eb !important;
  }

  :global(.circle.current.completed .cirlce-inner-text) {
    color: #fff !important;
  }

  :global(.circle .line:last-child) {
    display: none !important;
  }
</style>
