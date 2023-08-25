import * as yup from "yup";

export const schema = yup
  .object({
    userName: yup.string().required(),
  })
  .required();

export const schemaChangePassword = yup
  .object({
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Password must be at least 8 characters long"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();
