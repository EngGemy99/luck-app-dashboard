import * as yup from "yup";

export const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .matches(/^(010|011|012|015)\d{8}$/, "Invalid phone number")
      .required("Phone is required"),
    address: yup.string().required(),
    role: yup
      .string()
      .oneOf(["Admin", "User", "Manager"], "Invalid role")
      .required(),
  })
  .required();
