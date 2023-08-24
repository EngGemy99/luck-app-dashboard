import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, TextField } from "@mui/material"
import { useForm } from "react-hook-form";
import { editSchema, schema } from "./schema";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastMessage } from "../../utils/ToastMessage";
import { useEffect, useState } from "react";
import { editTopOffer, editVideo } from "../../store/Slices/userSlice";
import LukeApp from "../../Api/config";

function EditVideo() {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(false);
    const video = useSelector((state) => {
        return state.user?.videos.find(value => value._id == id);
    });


    const dispatch = useDispatch()
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
        formData.append("title", data.title);
        formData.append("url", data.url);
        formData.append("description", data.description);
        if (data?.image?.length > 0) {
            formData.append("image", data.image[0]);
        }
        setIsLoading(true);
        try {
            const res = await LukeApp.patch(`video/${id}`, formData);
            ToastMessage("success", res.data.message);
            dispatch(editVideo({ _id: id, data: res.data.video }));
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
            description: video?.description,
            url: video?.url,
            title: video?.title,
        });
    }, [reset, video?.description, video?.title, video?.url]);

    return (
        <Paper
            sx={{
                p: 4,
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="title"
                    focused
                    error={errors.title}
                    helperText={errors.title?.message}
                    {...register("title")}
                    fullWidth
                    defaultValue={video?.title}
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
                    defaultValue={video?.description}
                    variant="outlined"
                    focused
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
                    variant="outlined"
                    defaultValue={video?.url}
                    fullWidth
                    focused
                    sx={{
                        mb: 3,
                    }}
                />
                <br />
                <TextField
                    type="file"
                    focused
                    label='image'
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
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : " edit Video"}
                </Button>
            </form>
        </Paper>
    )
}

export default EditVideo