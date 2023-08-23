import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, TextField } from "@mui/material"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { schema } from "./schema";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Edit_Payments() {
    const { id } = useParams()
    const payment = useSelector((state) => {
        return state.user?.payments.find(value => value._id == id);
    });

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
        <Paper
            sx={{
                p: 4,
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="payment Name"
                    error={errors.paymentName}
                    helperText={errors.paymentName?.message}
                    {...register("paymentName")}
                    fullWidth
                    focused
                    value={payment?.paymentName}
                    variant="outlined"
                    sx={{
                        mb: 3,
                    }}
                />
                <br />
                <TextField
                    type="file"
                    error={errors.image}
                    helperText={errors.image?.message}
                    {...register("image")}
                    variant="outlined"
                    fullWidth
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
                >
                    Edit Payment 
                </Button>
            </form>
        </Paper>
    )
}

export default Edit_Payments