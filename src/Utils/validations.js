import { emailPattern, namePattern, passwordPattern } from "./regex";

const validateEmail = (email) => {
  if (!emailPattern.test(email)) {
    return false;
  }
  return true;
};

const validateName = (name) => {
  return namePattern.test(name);
};

const validatePassword = (password) => {
  
  if (!passwordPattern.test(password)) {
    return false;
  }
  return true;
};

const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return false;
  }
  return true;
};

export {
  validateEmail,
  validateName,
  validatePassword,
  validateConfirmPassword,
};
