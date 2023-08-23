import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, TextField } from "@mui/material"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { schema } from "./schema";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Edit_Offers() {
    const {id} = useParams()
    const offer = useSelector((state) => {
        return state.user?.offers.find(value => value._id == id);
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
                    label="title"
                    error={errors.title}
                    helperText={errors.title?.message}
                    {...register("title")}
                    focused
                    value={offer?.title}
                    fullWidth
                    variant="outlined"
                    sx={{
                        mb: 3,
                    }}
                />
                <br />
                <TextField
                    label="description"
                    error={errors.description}
                    helperText={errors.description?.message}
                    {...register("description")}
                    focused
                    value={offer?.description}
                    variant="outlined"
                    fullWidth
                    sx={{
                        mb: 3,
                    }}
                />
                <br />
                <TextField
                    error={errors.url}
                    helperText={errors.url?.message}
                    {...register("url")}
                    label="url"
                    value={offer?.url}
                    variant="outlined"
                    fullWidth
                    focused
                    sx={{
                        mb: 3,
                    }}
                />
                <br />
                <TextField
                    type="file"
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
                >
                    Edit Offer Wall
                </Button>
            </form>
        </Paper>
    )
}

export default Edit_Offers