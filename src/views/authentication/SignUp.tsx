import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import Styles from "./SignUp.module.scss";

import useLoader from "src/components/hooks/useLoader";
import { userService } from "src/services/user.services";
import { useNavigate } from "react-router-dom";
import useNotification from "src/components/hooks/useNotification";
import ISignUpFormValue from "src/types/ISignUpFormValue";

const defaultFormValue: ISignUpFormValue = {
  id: 0,
  userid: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmpassword: "",
  contact: "",
  brokerid: "",
  office: "",
  token: "",
};

const SignUp = () => {
  const { t } = useTranslation(["common", "authentication"]);
  const notification = useNotification();

  const formSchema = Yup.object().shape({
    userid: Yup.string()
      .trim()
      .required(t("form.yup.required_userid", { ns: "authentication" }))
      .max(100, t("form.yup.max_userid", { ns: "authentication", max: 100 })),
    firstname: Yup.string()
      .trim()
      .required(t("form.yup.required_firstname", { ns: "authentication" }))
      .max(50, t("form.yup.max_firstname", { ns: "authentication", max: 50 })),
    lastname: Yup.string()
      .trim()
      .required(t("form.yup.required_lastname", { ns: "authentication" }))
      .max(50, t("form.yup.max_lastname", { ns: "authentication", max: 50 })),
    email: Yup.string()
      .trim()
      .required(t("form.yup.required_email", { ns: "authentication" }))
      .max(100, t("form.yup.max_email", { ns: "authentication", max: 100 })),
    password: Yup.string()
      .trim()
      .required(t("form.yup.required_password", { ns: "authentication" }))
      .min(6, t("form.yup.min_password", { ns: "authentication", min: 6 }))
      .max(18, t("form.yup.max_password", { ns: "authentication", max: 18 })),
    confirmpassword: Yup.string()
      .trim()
      .required(
        t("form.yup.required_confirmpassword", { ns: "authentication" })
      )
      .min(
        6,
        t("form.yup.min_confirmpassword", { ns: "authentication", min: 6 })
      )
      .max(
        18,
        t("form.yup.max_confirmpassword", { ns: "authentication", max: 18 })
      )
      .test(
        "passwords-match",
        t("form.yup.match_password", { ns: "authentication" }),
        function (value) {
          return this.parent.password === value;
        }
      ),
    contact: Yup.string()
      .trim()
      .max(15, t("form.yup.max_contact", { ns: "authentication", max: 15 })),
    brokerid: Yup.string()
      .trim()
      .max(20, t("form.yup.max_brokerid", { ns: "authentication", max: 20 })),
  });
  const { handleSubmit, control, formState, reset } = useForm<ISignUpFormValue>(
    {
      defaultValues: { ...defaultFormValue },
      resolver: yupResolver(formSchema),
    }
  );
  const { isSubmitting } = formState;
  const loader = useLoader();
  const navigate = useNavigate();

  const handleFormSubmit: SubmitHandler<ISignUpFormValue> = (values) => {
    loader.show();
    userService
      .register(values)
      .then(() => {
        loader.hide();
        reset(defaultFormValue);
        notification.show(
          "success",
          t("form.success.UserRegistered", { ns: "authentication" })
        );
      })
      .catch((error) => {
        loader.hide();
        debugger;
        let errMessage = error;
        if (errMessage.includes("User Id already in Use")) {
          errMessage = t("form.errors.UserIdExists", { ns: "authentication" });
        } else if (errMessage.includes("Email already in Use")) {
          errMessage = t("form.errors.EmailExists", { ns: "authentication" });
        } else {
          errMessage = t("form.errors.defaultError", { ns: "authentication" });
        }
        notification.show("warning", errMessage);
      });
  };
  return (
    <Box className={Styles["SignUp-main"]}>
      <Box className={Styles["form-heading"]}>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              component="h4"
              fontWeight="bold"
              sx={{ fontSize: { xs: 18, md: 24 } }}
            >
              {t("headings.signup", { ns: "authentication" })}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box className={Styles["form-section"]}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12}>
            <Controller
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl fullWidth size="small">
                  <TextField
                    label={t("form.labels.userid", {
                      ns: "authentication",
                    })}
                    type="text"
                    variant="standard"
                    size="small"
                    value={value}
                    error={!!error}
                    onChange={onChange}
                    InputLabelProps={{ shrink: true }}
                    helperText={error ? error.message : null}
                  />
                </FormControl>
              )}
              name="userid"
              control={control}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Controller
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl fullWidth size="small">
                  <TextField
                    label={t("form.labels.password", {
                      ns: "authentication",
                    })}
                    type="password"
                    variant="standard"
                    size="small"
                    value={value}
                    error={!!error}
                    onChange={onChange}
                    InputLabelProps={{ shrink: true }}
                    helperText={error ? error.message : null}
                  />
                </FormControl>
              )}
              name="password"
              control={control}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Controller
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl fullWidth size="small">
                  <TextField
                    label={t("form.labels.confirmpassword", {
                      ns: "authentication",
                    })}
                    type="password"
                    variant="standard"
                    size="small"
                    value={value}
                    error={!!error}
                    onChange={onChange}
                    InputLabelProps={{ shrink: true }}
                    helperText={error ? error.message : null}
                  />
                </FormControl>
              )}
              name="confirmpassword"
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl fullWidth size="small">
                  <TextField
                    label={t("form.labels.email", {
                      ns: "authentication",
                    })}
                    type="text"
                    variant="standard"
                    size="small"
                    value={value}
                    error={!!error}
                    onChange={onChange}
                    InputLabelProps={{ shrink: true }}
                    helperText={error ? error.message : null}
                  />
                </FormControl>
              )}
              name="email"
              control={control}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Controller
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl fullWidth size="small">
                  <TextField
                    label={t("form.labels.firstname", {
                      ns: "authentication",
                    })}
                    type="text"
                    variant="standard"
                    size="small"
                    value={value}
                    error={!!error}
                    onChange={onChange}
                    InputLabelProps={{ shrink: true }}
                    helperText={error ? error.message : null}
                  />
                </FormControl>
              )}
              name="firstname"
              control={control}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Controller
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl fullWidth size="small">
                  <TextField
                    label={t("form.labels.lastname", {
                      ns: "authentication",
                    })}
                    type="text"
                    variant="standard"
                    size="small"
                    value={value}
                    error={!!error}
                    onChange={onChange}
                    InputLabelProps={{ shrink: true }}
                    helperText={error ? error.message : null}
                  />
                </FormControl>
              )}
              name="lastname"
              control={control}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Controller
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl fullWidth size="small">
                  <TextField
                    label={t("form.labels.contact", {
                      ns: "authentication",
                    })}
                    type="text"
                    variant="standard"
                    size="small"
                    value={value}
                    error={!!error}
                    onChange={onChange}
                    InputLabelProps={{ shrink: true }}
                    helperText={error ? error.message : null}
                  />
                </FormControl>
              )}
              name="contact"
              control={control}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Controller
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl fullWidth size="small">
                  <TextField
                    label={t("form.labels.brokerid", {
                      ns: "authentication",
                    })}
                    type="text"
                    variant="standard"
                    size="small"
                    value={value}
                    error={!!error}
                    onChange={onChange}
                    InputLabelProps={{ shrink: true }}
                    helperText={error ? error.message : null}
                  />
                </FormControl>
              )}
              name="brokerid"
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl fullWidth size="small">
                  <TextField
                    label={t("form.labels.office", {
                      ns: "authentication",
                    })}
                    type="text"
                    variant="standard"
                    size="small"
                    value={value}
                    error={!!error}
                    onChange={onChange}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit(handleFormSubmit)();
                      }
                    }}
                    InputLabelProps={{ shrink: true }}
                    helperText={error ? error.message : null}
                  />
                </FormControl>
              )}
              name="office"
              control={control}
            />
          </Grid>
        </Grid>
      </Box>
      <Box className={Styles["form-footer"]}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                onClick={handleSubmit(handleFormSubmit)}
                sx={{ marginTop: 1 }}
              >
                {t("buttons.register", { ns: "common" })}
              </Button>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Button
                color="info"
                type="reset"
                variant="outlined"
                disabled={isSubmitting}
                onClick={() => {
                  reset(defaultFormValue);
                }}
                sx={{ marginTop: 1 }}
              >
                {t("buttons.reset", { ns: "common" })}
              </Button>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Button
                color="info"
                type="button"
                variant="outlined"
                disabled={isSubmitting}
                onClick={() => {
                  navigate("signin");
                }}
                sx={{ marginTop: 1 }}
              >
                {t("buttons.gotologin", { ns: "common" })}
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUp;
