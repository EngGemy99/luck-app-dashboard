import * as yup from "yup";
export const schema = yup
  .object({
    paymentName: yup.string().min(3).required(),
    paymentImage: yup.mixed().required("A file is required"),
  })
  .required();
