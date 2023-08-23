import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, TextField } from "@mui/material"
import { useForm } from "react-hook-form";
import { schema } from "./schema";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Edit_Top_Offers() {
    const { id } = useParams()
    const offer = useSelector((state) => {
        return state.user?.topOffers.find(value => value._id == id);
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
                    fullWidth
                    focused
                    value={offer?.title}
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
                    variant="outlined"
                    fullWidth
                    focused
                    value={offer?.description}
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
                    variant="outlined"
                    fullWidth
                    focused
                    value={offer?.url}
                    sx={{
                        mb: 3,
                    }}
                />
                <br />
                <TextField
                    error={errors.point}
                    helperText={errors.point?.message}
                    {...register("point")}
                    label="point"
                    variant="outlined"
                    fullWidth
                    focused
                    value={offer?.point}
                    sx={{
                        mb: 3,
                    }}
                />
                <br />
                <TextField
                    type="file"
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
                    Edit Top Offer
                </Button>
            </form>
        </Paper>
    )
}

export default Edit_Top_Offers