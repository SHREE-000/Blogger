export const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailPattern.test(email)) return true;
  else return false;
};

export const isValidPasswrd = (passwrd) => {
  const strPasswrd = passwrd.toString();
  if (strPasswrd.length > 5) return true;
  else return false;
};

export const isValidPhoneNum = (number) => {
  const strNumber = number?.toString();
  if (Number.isInteger(Number(number)) && strNumber.length > 3) return true;
  else return false;
};

const allowedImgExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.jfif|\.webp)$/i;
export const isValideImgFileExtn = (fileName) => {
  if (allowedImgExtensions.exec(fileName)) return true;
  else return false;
};
