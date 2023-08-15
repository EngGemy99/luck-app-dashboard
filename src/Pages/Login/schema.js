import * as yup from "yup";

export const schema = yup
  .object({
    userName: yup.string().required("Username is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  })
  .required();
