import * as yup from "yup";

export const schema = yup
  .object({
    title: yup.string().min(3).required(),
    description: yup.string().min(10).required(),
    url: yup.string().min(10).required(),
  })
  .required();
