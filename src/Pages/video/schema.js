import * as yup from "yup";

export const schema = yup
  .object({
    title: yup.string().min(3).required(),
    description: yup.string().min(5).required(),
    image: yup
      .mixed()
      .required()
      .test("fileType", "Images only", (value) => {
        if (!value.length) return false;
        return value[0] && value[0].type.startsWith("image/");
      }),
    url: yup
      .string()
      .matches(/^https?:\/\/.*$/, "URL must start with http or https")
      .required(),
  })
  .required();
