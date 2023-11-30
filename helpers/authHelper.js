import bcrypt from "bcryptjs";

export const hashPassword = async (passoword) => {
  try {
    const saltRounds = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(passoword, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};
