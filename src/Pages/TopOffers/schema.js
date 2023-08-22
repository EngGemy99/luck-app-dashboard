import * as yup from "yup";

export const schema = yup
  .object({
    title: yup.string().min(3).required(),
    description: yup.string().min(10).required(),
    url: yup
      .string()
      .matches(/^https?:\/\/.*$/, "URL must start with http or https")
      .required(),

    point: yup
      .number()
      .min(1, "Point must be at least 1")
      .required("Point is required"),
  })
  .required();
