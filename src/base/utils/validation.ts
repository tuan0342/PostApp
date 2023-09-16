// validation email
export const isValidEmail = (emailString: string) => {
  if (emailString.length === 0) return true;
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailString)) {
    return true;
  }
  return false;
};

// validation password
export const isValidPassword = (passwordString: string) => {
  if (passwordString.length === 0) return true;
  return passwordString.length >= 3;
};
