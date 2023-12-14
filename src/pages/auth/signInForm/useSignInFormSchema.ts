import * as Yup from 'yup';

const characterErrorMessage = (str: string) => {
  return `Your password must have at least 1 ${str} character`; // translations
};

export const useSignInFormSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(4)
    .max(32)
    .required()
    .matches(/[0-9]/, characterErrorMessage('digit'))
    .matches(/[a-z]/, characterErrorMessage('lowercase'))
    .matches(/[A-Z]/, characterErrorMessage('uppercase'))
    .matches(/[^\w ]/g, characterErrorMessage('simbol')),
});
