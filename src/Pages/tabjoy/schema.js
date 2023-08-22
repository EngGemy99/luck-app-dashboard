import * as yup from "yup";
export const schema = yup
  .object({
    apiAndroid: yup.string().min(3).required(),
    apiIos: yup.string().min(3).required(),
  })
  .required();
