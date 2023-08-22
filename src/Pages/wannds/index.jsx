import { Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";

function Wannds() {
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
          label="Api Key"
          error={errors.apiKey}
          helperText={errors.apiKey?.message}
          {...register("apiKey")}
          fullWidth
          variant="outlined"
          sx={{
            mb: 3,
          }}
        />
        <TextField
          label="Api Scrit"
          error={errors.apiScrit}
          helperText={errors.apiScrit?.message}
          {...register("apiScrit")}
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

export default Wannds;
