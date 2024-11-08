// 'Corporation', 'LLC', 'LLP', 'Private Limited', 'Other'
const EntityTypes = Object.freeze({
  Corporation: "Corporation",
  LLC: "LLC",
  LLP: "LLP",
  PrivateLimited: "Private Limited",
  Other: "Other",
});

// vendor tires: ('S', 'A', 'B', 'C','X')
const VendorTiers = Object.freeze({
  S: "S",
  A: "A",
  B: "B",
  C: "C",
  X: "X",
});

const TournamentTier = Object.freeze({
  1: "1",
  2: "2",
  3: "3",
});

const VendorStatusCode = Object.freeze({
  Incomplete: 0,
  Complete: 1,
  UnderProcess: 2,
  Accepted: 3,
  Rejected: 4,
  Suspended: 5,
  Deleted: 6,
});

const VendorApplicationStatus = Object.freeze({
  generalInformation: "generalInformation",
  companyInformation: "companyInformation",
  businessInformation: "businessInformation",
  legalInformation: "legalInformation",
  accepted: "accepted",
  rejected: "rejected",
  inactive: "inactive",
  underProcess: "underProcess",
  deleted: "deleted",
  notApplied: "notApplied",
  applied: "applied",
  suspended: "suspended",
});

const TournamentApplicationStatus = Object.freeze({
  tournamentDetails: "tournament-details",
  tournamentSchedule: "tournament-schedule",
  financialDetails: "financial-details",
  contactInformation: "contact-information",
  applied: "applied",
  accepted: "accepted",
  rejected: "rejected",
  completed: "completed",
  active: "active",
});

const TotalTurnover = Object.freeze({
  UnderLoss: "UnderLoss",
  HundredThousand: "100000",
  FiveHundredThousand: "500000",
  OneMillion: "1000000",
});

module.exports = {
  EntityTypes,
  VendorTiers,
  VendorStatusCode,
  VendorApplicationStatus,
  TournamentApplicationStatus,
  TotalTurnover,
  TournamentTier
};
