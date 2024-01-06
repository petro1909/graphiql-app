import { useLocale } from '@localization/useLocale';
import * as Yup from 'yup';

export function SignUpFormSchema() {
  const { language } = useLocale();

  return Yup.object().shape({
    name: Yup.string()
      .max(20, language.strings.errorMessages.nameLong)
      .matches(/^[A-Z]/, language.strings.errorMessages.nameFirstLetter)
      .required(language.strings.errorMessages.nameRequired),
    email: Yup.string().email(language.strings.errorMessages.emailNotValid).required(language.strings.errorMessages.emailRequired),
    password: Yup.string()
      .required(language.strings.errorMessages.passwordRequired)
      .min(8, language.strings.errorMessages.passwordShort)
      .max(32)
      .matches(/[0-9]/, language.strings.errorMessages.passwordDigit)
      .matches(/[a-z]/, language.strings.errorMessages.passwordLowercase)
      .matches(/[A-Z]/, language.strings.errorMessages.passwordUppercase)
      .matches(/[^\w ]/g, language.strings.errorMessages.passwordSymbol),

    confirmPassword: Yup.string()
      .required(language.strings.errorMessages.confirmPassword)
      .oneOf([Yup.ref('password')], language.strings.errorMessages.passwordMatch),
  });
}
