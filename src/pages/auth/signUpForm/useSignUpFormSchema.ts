import * as Yup from 'yup';

const characterErrorMessage = (str: string) => {
  return `Your password must have at least 1 ${str} character`; // translations
};

export const useSignUpFormSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Z]/, 'First name must start with an uppercase letter')
    .required('enter yours name'),
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(4)
    .max(32)
    .required()
    .matches(/[0-9]/, characterErrorMessage('digit'))
    .matches(/[a-z]/, characterErrorMessage('lowercase'))
    .matches(/[A-Z]/, characterErrorMessage('uppercase'))
    .matches(/[^\w ]/g, characterErrorMessage('simbol')),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});
