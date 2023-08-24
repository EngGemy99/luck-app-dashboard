import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { editSchema, schema } from "./schema";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LukeApp from "../../Api/config";
import { ToastMessage } from "../../utils/ToastMessage";
import { addOffersWall, editOffor } from "../../store/Slices/userSlice";
import { useEffect } from "react";

function Edit_Offers() {
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const offer = useSelector((state) => {
    return state.user?.offers.find((value) => value._id == id);
  });

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
    formData.append("description", data.description);
    formData.append("url", data.url);
    // formData.append("offerType", "offersWall");
    if (data?.image?.length > 0) {
      formData.append("image", data.image[0]);
    }
    setIsLoading(true);
    try {
      const res = await LukeApp.patch(`offers/wall/${id}`, formData);
      console.log(res);
      ToastMessage("success", res.data.message);
      dispatch(editOffor({ _id: id, data: res.data.result }));
    } catch (error) {
      console.log(error);
      ToastMessage("error", error.response.data.error);
    } finally {
      reset();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reset({
      title: offer?.title,
      url: offer?.url,
      description: offer?.description,
    });
  }, [reset, offer?.title, offer?.url, offer?.description]);
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
          defaultValue={offer?.title}
          fullWidth
          focused
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
          defaultValue={offer?.description}
          variant="outlined"
          fullWidth
          focused
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
          defaultValue={offer?.url}
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
        >
          Edit Offer Wall
        </Button>
      </form>
    </Paper>
  );
}

export default Edit_Offers;
