import * as yup from "yup";
export const schema = yup
  .object({
    paymentName: yup.string().min(3).required(),
    image: yup.mixed().required("A file is required"),
  })
  .required();
export const editSchema = yup
  .object({
    paymentName: yup.string().min(3).optional(),
    image: yup.mixed().optional().test('fileType', 'Invalid file type', (value) => {
      if (value && value !== null) {
        const supportedTypes = ['image/jpeg', 'image/png'];
        return supportedTypes.includes(value.type);
      }
      return true; // Pass validation if value is null or not provided
    }),
  })
  .optional();
