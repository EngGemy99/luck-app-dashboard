import { Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";

function TabJoy() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
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
        >
          Add
        </Button>
      </form>
    </div>
  );
}

export default TabJoy;
