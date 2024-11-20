const Joi = require("joi");

const email = Joi.string().regex(/^[a-zA-Z][a-zA-Z0-9._]*@[a-zA-Z]+\.[a-zA-Z]+$/).required();
const phoneNumber = Joi.string().regex(/^\d{10}$/);
const dateString = Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/); // Changed to ISO format (YYYY-MM-DD)
const filePNGJPG = Joi.string().regex(/\.(png|jpg)$/i);
const filePDFJPG = Joi.string().regex(/\.(pdf|jpg)$/i);
const website = Joi.string().regex(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/);
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_–+=\{\[\}\}|:;"'<>,.?\/\-])[A-Za-z\d~`!@#$%^&*()_–+=\{\[\}\}|:;"'<>,.?\/\-]{8,}$/;


const validatePassword = (password) => {
  if (!passwordPattern.test(password)) {
    return false;
  }
  return true;
};
 

const Validations =  Object.freeze({
    email,
    phoneNumber,
    dateString,
    filePNGJPG,
    filePDFJPG,
    website,
    validatePassword
});

exports.Validations = Validations;

    
