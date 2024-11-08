import {
  namePattern,
  titlePattern,
  datePattern,
  titlepattern,
  websitePattern,
  addressPattern,
  totalPattern,
  dayPattern,
  positionPattern,
  companyNamePattern,
  emailPattern,
  phoneNumberPattern,
  channelPattern,
} from "./regex";
const validateTournamentName = (name) => {
  return name.trim().length >= 1;
};

const validatePrizePool = (prize) => {
  return prize && !isNaN(prize) && Number(prize) > 0;
};

const validateDescription = (description) => {
  return description.length >= 1 && description.length <= 250;
};

const validateGameTitle = (title) => {
  return titlepattern.test(title);
};
const validateStartDate = (date) => {
  if (!datePattern.test(date)) return false;
  const inputDate = new Date(date);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  return inputDate >= currentDate;
};

const validateRoundDate = (roundDate, start, end) => {
  roundDate = roundDate.split('T')[0];
  start = start.split('T')[0];
  end = end.split('T')[0];
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(roundDate.split('T')[0])) return false;
  return roundDate >= start && roundDate <= end;
}

const validateEndtDate = (date, startDate) => {


  //console.log(date)
  //console.log(startDate)
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;


  if (!datePattern.test(date)) return false;
  const inputDate = new Date(date);
  const startDay = new Date(startDate.split("-"));
  inputDate.setHours(0, 0, 0, 0);
  startDay.setHours(0, 0, 0, 0);
  return inputDate >= startDay;
};
const validateDate = (date) => validateStartDate(date);
const validateEndDate = (date, startDate) => validateEndtDate(date, startDate);

const validateIgnAccountName = (name) => {
  return name.length > 1 && name.length <= 14;
};

const validateUidAccountNumber = (number) => { 
  const uidPattern = /^[0-9]+$/;
  return number.length >= 9 && number.length <= 12 && uidPattern.test(number);
};

const validateTournamentLogo = (logo) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  const maxSize = 5 * 1024 * 1024;
  return logo && allowedTypes.includes(logo.type) && logo.size <= maxSize;
};

const validateTournamentBanner= (banner) => {
  const allowedTypes = ["image/jpeg" , "image/png", "image/jpg"];
  const maxSize = 5 * 1024 * 1024;
  return banner && allowedTypes.includes(banner.type) && banner.size <= maxSize;
}

const validatePlatformName = (title) => {
  return titlepattern.test(title);
};

const validateChannelUrl = (website) => {
  return channelPattern.test(website.trim());
};

const validateCountry = (country) => {
  return country !== "";
  //Select Country in above value
};

const validateState = (state) => {
  return state !== "";
};

const validateCity = (city) => {
  return city !== "";
};

const validateAddress = (address) => {
  return addressPattern.test(address);
};

const validateTotalGames = (total) => {
  return totalPattern.test(total);
};

const validateTournamentType = (tournamentType) => {
  return tournamentType !== "";
};

const validateTotalTeams = (total) => {
  return totalPattern.test(total);
};

const validateRoundTitle = (title) => {
  return titlePattern.test(title);
};

const validateRoundNumber = (roundnumber) => {
  const roundPattern = /^(?!0$)\d+$/;
  return roundPattern.test(roundnumber);
};

const validateRoundFormat = (roundFormat) => {
  return roundFormat !== "";
};

const validateDay = (day) => {
  return dayPattern.test(day);
};

const validateMatches = (day) => {
  return dayPattern.test(day);
};

const validateTimeSlot = (time) => {
  return time !== "";
};

const validateTotalPrizePool = (prize) => {
  return prize && !isNaN(prize) && Number(prize) > 0;
};

const validatePosition = (position) => {
  return positionPattern.test(position);
};

const validateType = (name) => {
  const typePattern = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
  return typePattern.test(name);
};

const validatePrize = (prize) => {
  return prize && !isNaN(prize) && Number(prize) > 0;
};

const validateSponsorName = (name) => {
  return namePattern.test(name);
};

const validateCategory = (category) => {
  return category !== "";
};

const validateContribution = (contribution) => {
  return contribution !== "";
};

const validateWebsite = (website) => {
  return websitePattern.test(website);
};

const validateSocialMediaUrl = (url) => {
  return websitePattern.test(url);
};
const validateName = (name) => {
  const namePattern = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
  return namePattern.test(name);
};

const validateDesignation = (designation) => {
  return designation !== "";
}

const validateCompanyName = (companyName) => {
  return companyNamePattern.test(companyName);
};

const validateEmail = (email) => {
  if (!emailPattern.test(email)) {
    return false;
  }
  return true;
};

const validatePhoneNumber = (phoneNumber) => {
  return phoneNumberPattern.test(phoneNumber);
};

const validateCompanyBio = (companyBio) => {
  const minLength = 1;
  const maxLength = 500;
  return companyBio.length >= minLength && companyBio.length <= maxLength;
};

export {
  validateTournamentName,
  validatePrizePool,
  validateDescription,
  validateGameTitle,
  validateDate,
  validateEndDate,
  validateIgnAccountName,
  validateUidAccountNumber,
  validatePlatformName,
  validateChannelUrl,
  validateCountry,
  validateState,
  validateCity,
  validateAddress,
  validateTournamentLogo,
  validateTournamentBanner,
  validateTotalGames,
  validateTournamentType,
  validateTotalTeams,
  validateRoundTitle,
  validateRoundNumber,
  validateRoundFormat,
  validateDay,
  validateTimeSlot,
  validateTotalPrizePool,
  validatePosition,
  validatePrize,
  validateSponsorName,
  validateCategory,
  validateContribution,
  validateWebsite,
  validateSocialMediaUrl,
  validateName,
  validateCompanyName,
  validateDesignation,
  validateEmail,
  validatePhoneNumber,
  validateCompanyBio,
  validateRoundDate,
  validateMatches,
  validateType
}
