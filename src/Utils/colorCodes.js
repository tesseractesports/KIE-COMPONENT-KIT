export const getEventColor = (event) => {
  let color = event.primaryColor ? event.primaryColor : "#92400E";
  const tournament = event.event.tournamentDetails;
  if (tournament) {
    if (tournament.tier === 1) {
      color = "#3730A3";
    } else if (tournament.tier === 2) {
      color = "#075985";
    } else if (tournament.tier === 3) {
      color = "#9D174D";
    }
  }
  return color;
};

export const getEventBorder = (event) => {
  let color = event.primaryColor ? event.primaryColor : "#D97706";
  const tournament = event.event.tournamentDetails;
  if (tournament) {
    if (tournament.tier === 1) {
      color = "#4F46E5";
    } else if (tournament.tier === 2) {
      color = "#0284C7";
    } else if (tournament.tier === 3) {
      color = "#EC4899";
    }
  }
  return color;
};

export const getEventBackground = (event) => {
  let background = "#FFFBEB";
  const tournament = event.event.tournamentDetails;
  if (tournament) {
    if (tournament.tier === 1) {
      background = "#EEF2FF";
    } else if (tournament.tier === 2) {
      background = "#ECFEFF";
    } else if (tournament.tier === 3) {
      background = "#FDF2F8";
    }
  }
  return background;
};
