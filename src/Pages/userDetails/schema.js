import * as yup from "yup";

export const schema = yup
  .object({
    userName: yup.string().required(),
  })
  .required();
