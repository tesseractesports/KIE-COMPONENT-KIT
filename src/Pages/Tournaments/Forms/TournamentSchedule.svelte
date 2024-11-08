<script>
  import Radio from "./../../../Components/Form/Radio.svelte";
  import UploadBox from "./../../../Components/Form/UploadBox.svelte";
  import Input from "../../../Components/Form/Input.svelte";
  import Select from "../../../Components/Form/Select.svelte";
  import Textarea from "../../../Components/Form/Textarea.svelte";
  import { RESTClient } from "../../../Utils/RESTClient";
  import {
    validateTotalGames,
    validateTournamentType,
    validateTotalTeams,
    validateRoundTitle,
    validateRoundNumber,
    validateRoundFormat,
    validateDay,
    validateDate,
    validateTimeSlot,
    validateRoundDate,
    validateMatches,
  } from "../../../Utils/tournamentValidations";
  import {
    roundFormatOptions,
    tournamentTypeOptions,
  } from "../dropdown.constants";
  import { router } from "tinro";
  import { vendorStore } from "../../../Stores/VendorsStore";

  export let tournament;
  const meta = router.meta();
  let validTotalGames = true;
  let validTournamentType = true;
  let validTotalTeams = true;
  $: errors = tournament.schedule.rounds.map((round) => ({
    validRoundTitle: true,
    roundTitleTouched: false,
    validRoundNumber: true,
    roundNumberTouched: false,
    validRoundFormat: true,
    roundFormatTouched: false,
    days: round.days.map((day) => ({
      validDay: true,
      // validDate: true,
      validStartDate: true,
      validEndDate: true,
      validMatchesPerDay: true,
      validStartTime: true,
      validEndTime: true,
      dayTouched: false,
      // dateTouched: false,
      startTimeTouched: false,
      endTimeTouched: false,
      startDateTouched: false,
      endDateTouched: false,
      matchesPerDayTouched: false,
    })),
  }));
  let vendorTier = "";
  vendorStore.subscribe((value) => (vendorTier = value.tier));
  export let disabled = true;
  $: {
  tournament.schedule.rounds.forEach((round, roundIndex) => {
    const previousRoundEndDate =
      roundIndex > 0 
        ? tournament.schedule.rounds[roundIndex - 1].days[tournament.schedule.rounds[roundIndex - 1].days.length - 1]?.endDate 
        : tournament.tournamentDate.startDate;

    round.days.forEach((day, dayIndex) => {
      // Validate start date
      if (errors[roundIndex].days[dayIndex].startDateTouched) {
        if (!day.startDate) {
          errors[roundIndex].days[dayIndex].validStartDate = false;
          console.error("Start date is required.");
        } else {
          const isValidStartDate = 
            day.startDate > previousRoundEndDate && 
            validateRoundDate(day.startDate, tournament.tournamentDate.startDate, tournament.tournamentDate.endDate);

          // Ensure start date is equal to tournament start date if no existing rounds
          if (roundIndex === 0) {
            errors[roundIndex].days[dayIndex].validStartDate = day.startDate >= tournament.tournamentDate.startDate && day.startDate <= tournament.tournamentDate.endDate;
          } else {
            errors[roundIndex].days[dayIndex].validStartDate = isValidStartDate;
          }
        }
      }

      // Validate end date
      if (errors[roundIndex].days[dayIndex].endDateTouched) {
        if (!day.endDate) {
          errors[roundIndex].days[dayIndex].validEndDate = false;
          console.error("End date is required.");
        } else {
          const isValidEndDate = day.endDate >= day.startDate && day.endDate <= tournament.tournamentDate.endDate;
          errors[roundIndex].days[dayIndex].validEndDate = isValidEndDate;
        }
      }
    });
  });

  // If no rounds exist, initialize error states for a new round
  if (tournament.schedule.rounds.length === 0) {
    errors.push({
      days: [{
        validStartDate: tournament.tournamentDate.startDate === tournament.tournamentDate.startDate,
        validEndDate: true // Valid until set
      }]
    });
  }
}


  $: {
    const isRoundValid = tournament.schedule.rounds.every((round, index) => {
      const roundErrors = errors[index];
      return (
        roundErrors.validRoundTitle &&
        round.roundTitle &&
        roundErrors.validRoundNumber &&
        round.roundNumber &&
        roundErrors.validRoundFormat &&
        round.roundFormat &&
        round.days.every((day, dayIndex) => {
          const dayErrors = roundErrors.days[dayIndex];
          return (
            dayErrors.validDay &&
            day.day &&
            // dayErrors.validDate &&
            // day.date &&
            dayErrors.validStartTime &&
            day.startTime &&
            dayErrors.validEndTime &&
            day.endTime &&
            dayErrors.validStartDate &&
            day.startDate &&
            dayErrors.validEndDate &&
            day.endDate &&
            dayErrors.validMatchesPerDay &&
            day.matchesPerDay
          );
        })
      );
    });

    disabled =
      !validTotalGames ||
      !tournament.schedule.totalGames ||
      !validTournamentType ||
      !tournament.schedule.tournamentType ||
      !validTotalTeams ||
      !tournament.schedule.totalTeams ||
      !isRoundValid;
  }

  let totalGamesError = "Please enter a valid number of games";
  let tournamentTypeError = "Please enter a valid tournament type";
  let totalTeamsError = "Please enter a valid number of teams";
  let totalGamesTouched = false;
  let tournamentTypeTouched = false;
  let totalTeamsTouched = false;

  const totalGamesValidation = (value) => {
    validTotalGames = totalGamesTouched ? validateTotalGames(value) : true;
  };
  const tournamentTypeValidation = (value) => {
    validTournamentType = tournamentTypeTouched
      ? validateTournamentType(value)
      : true;
  };
  const totalTeamsValidation = (value) => {
    validTotalTeams = totalTeamsTouched ? validateTotalTeams(value) : true;
  };
  const roundTitleValidation = (index, value) => {
    errors[index].roundTitleTouched = true;
    errors[index].validRoundTitle = value ? validateRoundTitle(value) : false;
  };
  const roundNumberValidation = (index, value) => {
    errors[index].roundNumberTouched = true;
    errors[index].validRoundNumber = value ? validateRoundNumber(value) : false;
  };
  const roundFormatValidation = (index, value) => {
    errors[index].roundFormatTouched = true;
    errors[index].validRoundFormat = value ? validateRoundFormat(value) : false;
  };

  // Helper function to calculate the number of days between two dates
  const calculateDaysBetween = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end - start;
    return Math.ceil(differenceInTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include the start day
  };

  // Function to validate the day count based on updated start and end dates
  const revalidateDaysForRound = (roundIndex) => {
    const roundDays = tournament.schedule.rounds[roundIndex].days;

    roundDays.forEach((day, dayIndex) => {
      const dayCount = calculateDaysBetween(day.startDate, day.endDate);
      const dayValue = day.day; // Current day value entered by the user

      // Re-check if the day value is within the updated range
      errors[roundIndex].days[dayIndex].validDay =
        dayValue > 0 && dayValue <= dayCount;

      if (!errors[roundIndex].days[dayIndex].validDay) {
        console.error(
          `Invalid day value. Day should be between 1 and ${dayCount} based on the updated start and end dates.`
        );
      }
    });
  };

  const dayValidation = (roundIndex, dayIndex, value) => {
    errors[roundIndex].days[dayIndex].dayTouched = true;

    // Validate the day input and set to false if the input is invalid
    errors[roundIndex].days[dayIndex].validDay = value
      ? validateDay(value)
      : false;

    const day = tournament.schedule.rounds[roundIndex].days[dayIndex];
    const dayCount = calculateDaysBetween(day.startDate, day.endDate);

    // Check if the input day value falls within the valid range
    if (value > dayCount || value <= 0) {
      errors[roundIndex].days[dayIndex].validDay = false;
      console.error(
        `Invalid day value. Day should be between 1 and ${dayCount} based on the start and end dates.`
      );
    } else {
      errors[roundIndex].days[dayIndex].validDay = true;
    }
  };
  const dateValidation = (roundIndex, dayIndex, value, start, end) => {
    errors[roundIndex].days[dayIndex].dateTouched = true;
    errors[roundIndex].days[dayIndex].validDate = value
      ? validateRoundDate(value, start, end)
      : false;
  };

function startDateValidation(roundIndex, dayIndex, value,start,end) {
  errors[roundIndex].days[dayIndex].startDateTouched = true;
  // Check if the start date is empty
  if (!value) {
    errors[roundIndex].days[dayIndex].validStartDate = false;
    console.error("Start date is required.");
    return;
  }

    // If it's the first round, ensure the start date is equal to or greater than the tournament's start date
    if (roundIndex === 0) {
    if (value < start) {
      errors[roundIndex].days[dayIndex].validStartDate = false;
      console.error("Start date must be equal to or greater than the tournament start date.");
      return;
    }
  }

  const previousRoundEndDate = roundIndex > 0 
    ? tournament.schedule.rounds[roundIndex - 1].days[tournament.schedule.rounds[roundIndex - 1].days.length - 1]?.endDate 
    : tournament.tournamentDate.startDate;

  if (value <= previousRoundEndDate) {
    errors[roundIndex].days[dayIndex].validStartDate = false;
    console.error("Start date must be greater than the previous round's end date.");
    return;
  }

  if (value > end) {
    errors[roundIndex].days[dayIndex].validStartDate = false;
    console.error("Start date must be within the tournament date range.");
  } else {
    errors[roundIndex].days[dayIndex].validStartDate = true;
  }

  if (!errors[roundIndex].days[dayIndex].validStartDate) {
    console.error("Start date must be within the valid range and greater than the previous round's end date.");
  }

  revalidateSubsequentRounds(roundIndex);
  revalidateDaysForRound(roundIndex);
}


function endDateValidation(roundIndex, dayIndex, value,start,end) {
  errors[roundIndex].days[dayIndex].endDateTouched = true;
  const startDate = tournament.schedule.rounds[roundIndex].days[dayIndex].startDate;

  // Check if the end date is empty
  if (!value) {
    errors[roundIndex].days[dayIndex].validEndDate = false;
    console.error("End date is required.");
    return;
  }

  if (value <= startDate) {
    errors[roundIndex].days[dayIndex].validEndDate = false;
    console.error("End date must be greater than the start date.");
  } else if (value > end) {
    errors[roundIndex].days[dayIndex].validEndDate = false;
    console.error("End date must be before the tournament end date.");
  } else {
    errors[roundIndex].days[dayIndex].validEndDate = true;
  }

  revalidateSubsequentRounds(roundIndex);
  revalidateDaysForRound(roundIndex);
}
  // Revalidate all subsequent rounds
  function revalidateSubsequentRounds(startingRoundIndex) {
    const tournamentStart = tournament.tournamentDate.startDate;
    const tournamentEnd = tournament.tournamentDate.endDate;

    for (
      let currentRoundIndex = startingRoundIndex + 1;
      currentRoundIndex < tournament.schedule.rounds.length;
      currentRoundIndex++
    ) {
      const round = tournament.schedule.rounds[currentRoundIndex];
      const previousRoundEndDate = tournament.schedule.rounds[currentRoundIndex - 1]?.days.slice(-1)[0] ?.endDate;

      round.days.forEach((day, dayIndex) => {
        // Validate each start date
        if (day.startDate) {
          errors[currentRoundIndex].days[dayIndex].validStartDate = day.startDate > previousRoundEndDate && validateRoundDate(day.startDate, tournamentStart, tournamentEnd);
        } else {
          errors[currentRoundIndex].days[dayIndex].validStartDate = false;
        }

        // Validate each end date
        if (day.endDate) {
          errors[currentRoundIndex].days[dayIndex].validEndDate = day.endDate > day.startDate && validateRoundDate(day.endDate, tournamentStart, tournamentEnd);
        } else {
          errors[currentRoundIndex].days[dayIndex].validEndDate = false;
        }
      });
    }
  }

  const matchesPerDayValidation = (roundIndex, dayIndex, value) => {
    errors[roundIndex].days[dayIndex].matchesPerDayTouched = true;
    errors[roundIndex].days[dayIndex].validMatchesPerDay =
      value && value > 0 ? validateMatches(value) : false;
  };

  const startTimeValidation = (roundIndex, dayIndex, value) => {
    errors[roundIndex].days[dayIndex].startTimeTouched = true;
    errors[roundIndex].days[dayIndex].validStartTime = value
      ? validateTimeSlot(value)
      : false;
  };
  const endTimeValidation = (roundIndex, dayIndex, value) => {
    errors[roundIndex].days[dayIndex].endTimeTouched = true;
    errors[roundIndex].days[dayIndex].validEndTime = value
      ? validateTimeSlot(value)
      : false;
  };

  // options for tournament types
  $: (tournament) => {
    if (tournament._id) {
      const rest = new RESTClient("tournament");
      rest.get(`/tournament/${tournament._id}`).then((response) => {
        if (response.code) {
        } else if (response) {
          tournament = response;
        }
      });
    }
  };

  function addRound() {
    // Get the last round's end date for validation
    const lastRound =
      tournament.schedule.rounds[tournament.schedule.rounds.length - 1];
    const lastRoundEndDate =
      lastRound.days[lastRound.days.length - 1]?.endDate ||
      tournament.tournamentDate.startDate;
    tournament.schedule.rounds = [
      ...tournament.schedule.rounds,
      {
        roundTitle: "",
        roundNumber: tournament.schedule.rounds.length + 1,
        roundFormat: "",
        days: [
          {
            day: 1,
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
            liveStreaming: false,
            matchesPerDay: 1,
          },
        ],
      },
    ];
    errors = [
      ...errors,
      {
        validRoundTitle: true,
        roundTitleTouched: false,
        validRoundNumber: true,
        roundNumberTouched: false,
        validRoundFormat: true,
        roundFormatTouched: false,
        days: [
          {
            validDay: true,
            // validDate: true,
            validStartDate: true,
            validEndDate: true,
            validMatchesPerDay: true,
            validStartTime: true,
            validEndTime: true,
            dayTouched: false,
            // dateTouched: false,
            startTimeTouched: false,
            endTimeTouched: false,
            startDateTouched: false,
            endDateTouched: false,
            matchesPerDayTouched: false,
          },
        ],
      },
    ];
    // Validate new round start and end dates against last round's end date and tournament end date
    const newRoundStartDate =
      tournament.schedule.rounds[tournament.schedule.rounds.length - 1].days[0]
        .startDate;
    const newRoundEndDate =
      tournament.schedule.rounds[tournament.schedule.rounds.length - 1].days[0]
        .endDate;

    if (newRoundStartDate && newRoundStartDate <= lastRoundEndDate) {
      errors[tournament.schedule.rounds.length - 1].days[0].validStartDate =
        false;
      console.error(
        "New round start date must be greater than the previous round's end date."
      );
    }

    if (newRoundEndDate > tournament.tournamentDate.endDate) {
      errors[tournament.schedule.rounds.length - 1].days[0].validEndDate =
        false;
      console.error(
        "New round end date must be before the tournament's end date."
      );
    }
  }
  function removeRound(roundIndex) {
    if (tournament.schedule.rounds.length > 1) {
      tournament.schedule.rounds.splice(roundIndex, 1);
      errors = errors.filter((_, i) => i !== roundIndex);
      tournament = { ...tournament };
    } else {
      alert("Each Tournament must have at least one Round.");
    }
  }

  // function addDay(roundIndex) {
  //     tournament.schedule.rounds[roundIndex].days = [
  //         ...tournament.schedule.rounds[roundIndex].days,
  //         {
  //             day: tournament.schedule.rounds[roundIndex].days.length + 1,
  //             // date: "",
  //             startDate:"",
  //             endDate:"",
  //             startTime: "",
  //             endTime: "",
  //             liveStreaming: false,
  //         },
  //     ];
  //     errors[roundIndex].days = [
  //         ...errors[roundIndex].days,
  //         {
  //             validDay: true,
  //             // validDate: true,
  //             validStartDate: true,
  //             validEndDate: true,
  //             validStartTime: true,
  //             validEndTime: true,
  //             dayTouched: false,
  //             // dateTouched: false,
  //             startTimeTouched: false,
  //             endTimeTouched: false,
  //             startDateTouched: false,
  //             endDateTouched: false,
  //         },
  //     ];
  // }

  // function removeDay(roundIndex, dayIndex) {
  //     if (tournament.schedule.rounds[roundIndex].days.length > 1) {
  //         tournament.schedule.rounds[roundIndex].days.splice(dayIndex, 1);
  //         errors[roundIndex].days = errors[roundIndex].days.filter((_, i) => i !== dayIndex);
  //         tournament = { ...tournament };
  //     } else {
  //         alert("Each round must have at least one day.");
  //     }
  // }

  const tournamentRoundTimeTypeOptions = [
    {
      value: {
        startTime: "12:00",
        endTime: "17:00",
      },
      label: "12:00 PM - 5:00 PM",
    },
    {
      value: {
        startTime: "17:00",
        endTime: "22:00",
      },
      label: "05:00 PM - 10:00 PM",
    },
  ];
</script>

<div class="px-4 py-6 sm:p-8 space-y-6 bg-white">
  <div class="w-full border-b flex flex-col mb-2">
    <p class="font-normal text-xl">Tournament Schedule</p>
    <span class="font-light text-sm text-gray-400 mb-2"
      >We would like to know you more</span
    >
  </div>
  <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
    <div class="sm:col-span-2">
      <Input
        type="number"
        label="Total games in the tournament"
        placeholder="Total games in the tournament"
        bind:value={tournament.schedule.totalGames}
        showErrorIcon={false}
        error={!validTotalGames}
        errorMessage={totalGamesError}
        on:blur={() => {
          totalGamesTouched = true;
          totalGamesValidation(tournament.schedule.totalGames);
        }}
      />
    </div>
    <div class="sm:col-span-2">
      <Select
        label="Tournament type"
        placeholder="Select Type"
        options={tournamentTypeOptions}
        valueKey={"value"}
        labelKey={"label"}
        bind:value={tournament.schedule.tournamentType}
        error={!validTournamentType}
        errorMessage={tournamentTypeError}
        on:blur={() => {
          tournamentTypeTouched = true;
          tournamentTypeValidation(tournament.schedule.tournamentType);
        }}
      />
    </div>
    <div class="sm:col-span-2">
      <Input
        type="number"
        label="Total teams"
        bind:value={tournament.schedule.totalTeams}
        error={!validTotalTeams}
        showErrorIcon={false}
        errorMessage={totalTeamsError}
        on:blur={() => {
          totalTeamsTouched = true;
          totalTeamsValidation(tournament.schedule.totalTeams);
        }}
      />
    </div>
  </div>
  <p class="block text-sm font-medium text-gray-600 mb-2">
    Tournament schedule
  </p>
  {#each tournament.schedule.rounds as round, roundIndex}
    <div class="bg-gray-50 rounded p-4 space-y-4">
      <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6 items-start">
        <div class="sm:col-span-2">
          <Input
            type="text"
            label="Round Title"
            placeholder="Title name"
            bind:value={round.roundTitle}
            error={!errors[roundIndex].validRoundTitle}
            errorMessage="Please enter a valid round title"
            on:blur={() => roundTitleValidation(roundIndex, round.roundTitle)}
          />
        </div>
        <div class="sm:col-span-2">
          <Input
            type="number"
            label="Round Number"
            placeholder="Number"
            bind:value={round.roundNumber}
            error={!errors[roundIndex].validRoundNumber}
            errorMessage="Please enter a valid round number"
            showErrorIcon={false}
            on:blur={() => roundNumberValidation(roundIndex, round.roundNumber)}
          />
        </div>
        <div class="sm:col-span-2 flex relative">
          <div class="sm:col-span-3 w-3/4">
            <Select
              label="Round format"
              placeholder="Select format"
              bind:value={round.roundFormat}
              options={roundFormatOptions}
              labelKey={"label"}
              valueKey={"value"}
              error={!errors[roundIndex].validRoundFormat}
              errorMessage="Please select a valid round format"
              on:blur={() =>
                roundFormatValidation(roundIndex, round.roundFormat)}
            />
          </div>
          <div class="absolute right-0">
            <button
              class="remove-button"
              type="button"
              on:click|preventDefault={() => removeRound(roundIndex)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {#each round.days as day, dayIndex}
        <div class="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-12">
          <div class="sm:col-span-2">
            <Input
              type="number"
              label="No.of Days"
              bind:value={day.day}
              error={!errors[roundIndex].days[dayIndex].validDay}
              errorMessage="Please enter a valid days"
              showErrorIcon={false}
              on:blur={() => dayValidation(roundIndex, dayIndex, day.day)}
            />
          </div>
          <!-- <div class="sm:col-span-3">
                <Input type="date" label="Date" bind:value={day.date}
                    error={!errors[roundIndex].days[dayIndex].validDate}
                    errorMessage = "date not matching with tournament dates"
                    on:blur={()=> dateValidation(roundIndex,dayIndex,day.date, tournament.tournamentDate.startDate, tournament.tournamentDate.endDate)}
                />
            </div> -->
          <div class="sm:col-span-2">
            <Input
              type="date"
              label="Start Date"
              bind:value={day.startDate}
              error={!errors[roundIndex].days[0].validStartDate}
              errorMessage="Please select a valid start date"
              on:blur={() =>
                startDateValidation(
                  roundIndex,
                  0,
                  round.days[0].startDate,
                  tournament.tournamentDate.startDate,
                  tournament.tournamentDate.endDate
                )}
            />
          </div>
          <div class="sm:col-span-2">
            <Input
              type="date"
              label="End Date"
              bind:value={day.endDate}
              error={!errors[roundIndex].days[0].validEndDate}
              errorMessage="Please select a valid end date"
              on:blur={() =>
                endDateValidation(
                  roundIndex,
                  0,
                  round.days[0].endDate,
                  tournament.tournamentDate.startDate,
                  tournament.tournamentDate.endDate
                )}
            />
          </div>
          {#if vendorTier !== "S" && vendorTier !== "A"}
            <div class="sm:col-span-2">
              <Input
                type="time"
                label="Start time"
                bind:value={day.startTime}
                error={!errors[roundIndex].days[dayIndex].validStartTime}
                errorMessage="Please select a valid time"
                on:blur={() =>
                  startTimeValidation(roundIndex, dayIndex, day.startTime)}
                showErrorIcon={false}
              />
            </div>
            <div class="sm:col-span-2">
              <Input
                type="time"
                label="End time"
                bind:value={day.endTime}
                error={!errors[roundIndex].days[dayIndex].validEndTime}
                errorMessage="Please select a valid time"
                on:blur={() =>
                  endTimeValidation(roundIndex, dayIndex, day.endTime)}
                showErrorIcon={false}
              />
            </div>
          {:else}
            <div class="sm:col-span-2">
              <label
                for="timeSlot"
                class="block text-sm font-medium leading-6 text-gray-900 mb-2"
                >Select Time Slot</label
              >
              <select
                id="timeSlot"
                class={`form-select col-span-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!errors[roundIndex].days[dayIndex].validStartTime ? "border-red-500 ring-red-300 text-red-500" : ""}`}
                on:change={(e) => {
                  const selectedOption = e.target.value.split(",");
                  day.startTime = selectedOption[0];
                  day.endTime = selectedOption[1];
                  startTimeValidation(roundIndex, dayIndex, day.startTime);
                  endTimeValidation(roundIndex, dayIndex, day.endTime);
                }}
                on:blur={() => {
                  startTimeValidation(roundIndex, dayIndex, day.startTime);
                  endTimeValidation(roundIndex, dayIndex, day.endTime);
                }}
              >
                <option value="">Select Time Slot</option>
                {#each tournamentRoundTimeTypeOptions as option}
                  <option
                    value={[option.value.startTime, option.value.endTime]}
                    selected={`${day.startTime},${day.endTime}` ===
                      `${option.value.startTime},${option.value.endTime}`}
                  >
                    {option.label}
                  </option>
                {/each}
              </select>
              {#if !errors[roundIndex].days[dayIndex].validEndTime || !errors[roundIndex].days[dayIndex].validStartTime}
                <p
                  id={`timeSlotError-${roundIndex}-${dayIndex}`}
                  class="mt-1 block error-text text-xs text-red-500 pt-1"
                >
                  Please select a valid time slot.
                </p>
              {/if}
            </div>
          {/if}
          <div class="sm:col-span-2">
            <Input
              type="number"
              label="No.of Matches/Day"
              bind:value={day.matchesPerDay}
              error={!errors[roundIndex].days[dayIndex].validMatchesPerDay}
              errorMessage="Please enter a valid number of matches"
              showErrorIcon={false}
              on:blur={() =>
                matchesPerDayValidation(
                  roundIndex,
                  dayIndex,
                  day.matchesPerDay
                )}
            />
          </div>
          <div class="sm:col-span-2">
            <Radio
              options={[
                { value: true, label: "Yes" },
                { value: false, label: "No" },
              ]}
              title="Are you live streaming this?"
              bind:selectedValue={day.liveStreaming}
              name={`${JSON.stringify(roundIndex)}${JSON.stringify(dayIndex)}`}
            />
          </div>
          <div
            class="sm:col-span-1 flex items-center justify-center text-indigo-600"
          >
            {#if dayIndex > 0}
              <button
                type="button"
                class="remove-button"
                on:click|preventDefault={() => removeDay(roundIndex, dayIndex)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            {/if}
          </div>
        </div>
      {/each}

      <!-- <button
        type="button"
            class="flex items-center gap-2 mt-4 font-sans text-xs font-bold text-center text-indigo-600 uppercase align-middle transition-all rounded-lg select-none"
         on:click|preventDefault={()=> addDay(roundIndex)}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                    d="M10 7.5V10M10 10V12.5M10 10H12.5M10 10H7.5M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                    stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Add more days
        </button> -->
    </div>
  {/each}

  <div class="flex items-center w-full">
    <span class="flex-grow bg-gray-200 rounded h-0.5"></span>
    <button
      on:click|preventDefault={addRound}
      type="button"
      class="flex items-center justify-between rounded-full border border-gray-100 py-1 px-3 text-sm text-gray-600"
    >
      <svg
        class="mr-1"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 4V8M8 8V12M8 8H12M8 8L4 8"
          stroke="#9CA3AF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Add Round
    </button>
    <span class="flex-grow bg-gray-200 rounded h-0.5"></span>
  </div>
</div>
