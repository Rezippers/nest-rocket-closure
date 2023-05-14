import * as bcrypt from 'bcrypt';

export const PasswordHelper = {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  },

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  },

  validatePassword(password: string): void {
    if (!password) throw new Error('É obrigatório informar a senha.');

    if (password.length < 8)
      throw new Error('A senha deve ter no mínimo 8 caracteres.');

    const lowerCaseRegex = /[a-z]/g;
    if (!lowerCaseRegex.test(password))
      throw new Error('A senha deve ter no mínimo uma letra minúscula.');

    const upperCaseRegex = /[A-Z]/g;
    if (!upperCaseRegex.test(password))
      throw new Error('A senha deve ter no mínimo uma letra maiúscula.');

    const numberRegex = /\d/g;
    if (!numberRegex.test(password))
      throw new Error('A senha deve ter no mínimo um número.');
  },
};
