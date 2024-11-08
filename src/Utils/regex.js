const emailPattern = /^[a-zA-Z][a-zA-Z0-9._]*@[a-zA-Z]+\.[a-zA-Z]+$/;
// const namePattern = /^(?=.*[a-zA-Z])[a-zA-Z ]*$/;
const namePattern = /^(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>-\s]*$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_–+=\{\[\}\}|:;"'<>,.?\/\-])[A-Za-z\d~`!@#$%^&*()_–+=\{\[\}\}|:;"'<>,.?\/\-]{8,}$/;
const companyNamePattern = /^[a-zA-Z][a-zA-Z0-9 &.,]*$/;
const phoneNumberPattern = /^\d{10}$/;
const marketNamePattern = /^[a-zA-Z][a-zA-Z0-9 &.,]*$/;
const websitePattern =
  /^(https?:\/\/)?([a-zA-Z\d-]+(\.[a-zA-Z\d-]+)*\.[a-zA-Z]{2,})(\/[^\s]*)?$/;
const channelPattern = 
  /^(https?:\/\/)?(www\.)?([a-zA-Z\d-]+(\.[a-zA-Z\d-]+)+)\/(@[a-zA-Z\d_-]+|[a-zA-Z\d_-]+(\/[a-zA-Z\d_-]*)*)$/;
const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
const gstPattern =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/i;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
/^[a-zA-Z][a-zA-Z0-9 &.,!@#$%^*()_+\-=\[\]{};':"\\|,.<>\/?`~]*$/;
const titlepattern =
  /^[a-zA-Z][a-zA-Z0-9 &.,!@#$%^*()_+\-=\[\]{};':"\\|,.<>\/?`~]*$/;
const totalPattern = /^(?!0$)\d+$/;
const titlePattern = /^[a-zA-Z0-9 &.,]+$/;
const dayPattern = /^(?!0$)\d+$/;
const positionPattern = /^(0*[1-9]\d*)$/;
const addressPattern = /^.{1,250}$/;



export {
  emailPattern,
  namePattern,
  passwordPattern,
  companyNamePattern,
  phoneNumberPattern,
  marketNamePattern,
  websitePattern,
  channelPattern,
  panPattern,
  gstPattern,
  datePattern,
  titlePattern,
  titlepattern,
  positionPattern,
  dayPattern,
  totalPattern,
  addressPattern
};
