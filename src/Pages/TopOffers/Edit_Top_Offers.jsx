import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { editSchema, schema } from "./schema";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastMessage } from "../../utils/ToastMessage";
import { useEffect, useState } from "react";
import { editTopOffer } from "../../store/Slices/userSlice";
import LukeApp from "../../Api/config";

function Edit_Top_Offers() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const topOffer = useSelector((state) => {
    return state.user?.topOffers.find((value) => value._id == id);
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
    formData.append("title", data.title);
    formData.append("point", data.point);
    formData.append("url", data.url);
    formData.append("description", data.description);
    // formData.append("offerType", "offersWall");
    if (data?.image?.length > 0) {
      formData.append("image", data.image[0]);
    }
    setIsLoading(true);
    try {
      const res = await LukeApp.patch(`offers/top/${id}`, formData);
      ToastMessage("success", res.data.message);
      dispatch(editTopOffer({ _id: id, data: res.data.result }));
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
      description: topOffer?.description,
      url: topOffer?.url,
      point: topOffer?.point,
      title: topOffer?.title,
    });
  }, [
    reset,
    topOffer?.description,
    topOffer?.point,
    topOffer?.title,
    topOffer?.url,
  ]);

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
          defaultValue={topOffer?.title}
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
          defaultValue={topOffer?.description}
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
          defaultValue={topOffer?.url}
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
          defaultValue={topOffer?.point}
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
  );
}

export default Edit_Top_Offers;
