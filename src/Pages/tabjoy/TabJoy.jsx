import { Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import LukeApp from "../../Api/config";
import { ToastMessage } from "../../utils/ToastMessage";
import { useState } from "react";

function TabJoy() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await LukeApp.post(`tab-joy`, data);
      ToastMessage("success", res.data.message);
    } catch (error) {
      ToastMessage("error", error.response.data.error);
    } finally {
      reset();
      setIsLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Api Android"
          error={errors.apiAndroid}
          helperText={errors.apiAndroid?.message}
          {...register("apiAndroid")}
          fullWidth
          variant="outlined"
          sx={{
            mb: 3,
          }}
        />
        <br />
        <TextField
          label="Api Ios"
          error={errors.apiIos}
          helperText={errors.apiIos?.message}
          {...register("apiIos")}
          fullWidth
          variant="outlined"
          sx={{
            mb: 3,
          }}
        />
        <Button
          variant="contained"
          color="success"
          type="submit"
          sx={{
            color: "inherit",
          }}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Add"}
        </Button>
      </form>
    </div>
  );
}

export default TabJoy;
