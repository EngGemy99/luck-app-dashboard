import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { editSchema, schema } from "./schema";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastMessage } from "../../utils/ToastMessage";
import { editPayment } from "../../store/Slices/userSlice";
import LukeApp from "../../Api/config";
import { useEffect } from "react";

function Edit_Payments() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const payment = useSelector((state) => {
    return state.user?.payments.find((value) => value._id == id);
  });

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editSchema),
  });
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("paymentName", data.paymentName);
    // formData.append("offerType", "offersWall");
    if (data?.image?.length > 0) {
      formData.append("image", data.image[0]);
    }
    setIsLoading(true);
    try {
      const res = await LukeApp.patch(`payment/${id}`, formData);
      console.log(res);
      ToastMessage("success", res.data.message);
      dispatch(editPayment({ _id: id, data: res.data.result }));
    } catch (error) {
      console.log(error);
      ToastMessage("error", error.response.message);
    } finally {
      reset();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reset({
      paymentName: payment?.paymentName,
    });
  }, [payment?.paymentName, reset]);
  return (
    <Paper
      sx={{
        p: 4,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="paymentName"
          error={errors.paymentName}
          helperText={errors.paymentName?.message}
          {...register("paymentName")}
          fullWidth
          focused
          defaultValue={payment?.paymentName}
          variant="outlined"
          sx={{
            mb: 3,
          }}
        />
        <br />
        <TextField
          type="file"
          label="image"
          variant="outlined"
          fullWidth
          focused
          sx={{
            mb: 3,
          }}
        />
        <br />
        <Button
          variant="contained"
          color="success"
          type="submit"
          sx={{
            color: "inherit",
          }}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Edit Payment"}
        </Button>
      </form>
    </Paper>
  );
}

export default Edit_Payments;
