import {
  companyNamePattern,
  emailPattern,
  phoneNumberPattern,
  panPattern,
  marketNamePattern,
  websitePattern,
  gstPattern,
  datePattern,
  namePattern,
} from "./regex";
const validateName = (name) => {
  const namePattern = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
  return namePattern.test(name);
};

const validateCompanyName = (companyName) => {
  return companyNamePattern.test(companyName);
};

const validateDesignation = (designation) => {
  const designationPattern = /^[a-zA-Z\s]+$/;
  return designationPattern.test(designation);
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

const validateMarketName = (marketName) => {
  return marketNamePattern.test(marketName);
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
const validateWebsite = (website) => {
  return websitePattern.test(website);
};
const validateCompanyLogo = (logo) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  const maxSize = 5 * 1024 * 1024;
  return logo && allowedTypes.includes(logo.type) && logo.size <= maxSize;
};

const validateCompanyLegalName = (name) => {
  return companyNamePattern.test(name) && name.length > 3;
};

const validateEntityType = (entityType) => {
  return entityType !== "";
};

const validatePAN = (pan) => {
  return panPattern.test(pan);
};

const validateGST = (gst) => {
  return gstPattern.test(gst);
};

const validateDate = (date) => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(date)) return false;
  const inputDate = new Date(date);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  return inputDate <= currentDate;
};
const validateIncorporationDate = (date) => validateDate(date);
// const validateDateOfBirth = (date) => validateDate(date);
const validateFileUpload = (file) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
  const maxSize = 10 * 1024 * 1024; // 10MB
  return (
    file &&
    allowedTypes.includes(file.type) &&
    file.size <= maxSize
  );
};
const validateDateOfBirth = (date) => {
  if (!datePattern.test(date)) return false;

  const inputDate = new Date(date);
  const currentDate = new Date();
  const eighteenYearsAgo = new Date(currentDate);
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

  return inputDate <= eighteenYearsAgo;
};

const validateTournamentName = (name) => {
  return namePattern.test(name) && name.trim().length >= 1;
};

const validatePrizePool = (prize) => {
  return prize && !isNaN(prize) && Number(prize) > 0;
};
const validateReportCertificate = (certificate) => {
  const allowedTypes = ["application/pdf", "image/jpeg","image/jpg", "image/png"];
  const maxSize = 10 * 1024 * 1024; // 10MB
  return (
    certificate &&
    allowedTypes.includes(certificate.type) &&
    certificate.size <= maxSize
  );
};

export {
  validateEmail,
  validateName,
  validateCompanyName,
  validateDesignation,
  validatePhoneNumber,
  validateCompanyBio,
  validateMarketName,
  validateCompanyLogo,
  validateCountry,
  validateState,
  validateCity,
  validateWebsite,
  validateCompanyLegalName,
  validateEntityType,
  validateIncorporationDate,
  validateGST,
  validatePAN,
  validateFileUpload,
  validateTournamentName,
  validatePrizePool,
  validateReportCertificate,
  validateDateOfBirth,
};
