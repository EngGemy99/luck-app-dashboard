import * as yup from "yup";
export const schema = yup
  .object({
    apiKey: yup.string().min(3).required(),
    apiScrit: yup.string().min(3).required(),
  })
  .required();
