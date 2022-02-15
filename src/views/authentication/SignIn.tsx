import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import Styles from "./SignIn.module.scss";

import useLoader from "src/components/hooks/useLoader";
import { userService } from "src/services/user.services";
import { useAppDispacth } from "src/store/hooks";
import { setAuth } from "src/store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { decryptData, encryptData } from "src/utils/crypto";
import IUser from "src/types/user";
import useNotification from "src/components/hooks/useNotification";

interface ILoginFormValue {
  email: string;
  password: string;
  remember: boolean;
}

const SignIn = () => {
  const { t } = useTranslation(["common", "authentication"]);
  const notification = useNotification();

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required(t("form.yup.required_email", { ns: "authentication" }))
      .max(100, t("form.yup.max_email", { ns: "authentication" })),
    password: Yup.string()
      .trim()
      .required(t("form.yup.required_password", { ns: "authentication" }))
      .max(18, t("form.yup.max_password", { ns: "authentication" })),
  });
  const { handleSubmit, control, formState } = useForm<ILoginFormValue>({
    defaultValues: { email: "", password: "", remember: false },
    resolver: yupResolver(formSchema),
  });
  const { isSubmitting } = formState;
  const loader = useLoader();
  const dispatch = useAppDispacth();
  const navigate = useNavigate();

  useEffect(() => {
    const remember = localStorage.getItem("remember");
    let userState: IUser = {
      id: 0,
      userid: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      contact: "",
      brokerid: "",
      office: "",
      token: "",
    };
    if (remember) {
      let user = decryptData(remember);
      if (user && user.token) {
        if (user.token !== "") {
          userState = user;
        }
      }
    }
    dispatch(setAuth(userState));
    if (userState.token !== "") {
      navigate("/home", { replace: true });
    }
  }, [dispatch, navigate]);

  const handleFormSubmit: SubmitHandler<ILoginFormValue> = (values) => {
    loader.show();
    userService
      .login(values.email, values.password)
      .then((user) => {
        if (values.remember) {
          localStorage.setItem("remember", encryptData(user));
        }
        dispatch(setAuth(user));
        loader.hide();
        setTimeout(() => {
          navigate("/home", { replace: true });
        }, 500);
      })
      .catch((error) => {
        loader.hide();
        let errMessage = error;

        if (errMessage.includes("Invalid User")) {
          errMessage = t("form.errors.InvalidUser", { ns: "authentication" });
        } else {
          errMessage = t("form.errors.defaultError", { ns: "authentication" });
        }

        notification.show("warning", errMessage);
      });
  };
  return (
    <Box className={Styles["SignIn-main"]}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid
          item
          xs={12}
          sx={{
            textAlign: "center",
            marginTop: 3,
            marginBottom: 2,
          }}
        >
          <Typography
            variant="h5"
            component="h4"
            fontWeight="bold"
            sx={{ fontSize: { xs: 18, md: 24 } }}
          >
            {t("headings.welcome", { ns: "authentication" })}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Controller
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
        <Grid item xs={12}>
          <Controller
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
            name="password"
            control={control}
          />
        </Grid>
        <Grid item xs={6} sx={{ justifyContent: "left", alignItems: "center" }}>
          <Controller
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl fullWidth size="small">
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={onChange}
                      size="small"
                      style={{ paddingTop: 0, paddingBottom: 0 }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "0.675rem",
                          md: "0.825rem",
                        },
                        color: "gray",
                      }}
                    >
                      {t("form.texts.remember_me", {
                        ns: "authentication",
                      })}
                    </Typography>
                  }
                />
              </FormControl>
            )}
            name="remember"
            control={control}
          />
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "right" }}>
          <Link
            to="/auth-home/forgotpassword"
            color="inherit"
            style={{ color: "gray" }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "0.675rem",
                  md: "0.825rem",
                },
                color: "gray",
              }}
            >
              {t("buttons.forgot_password", {
                ns: "common",
              })}
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              onClick={handleSubmit(handleFormSubmit)}
              sx={{ marginTop: 1 }}
            >
              {t("buttons.login", { ns: "common" })}
            </Button>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography
            component="span"
            sx={{
              fontSize: {
                xs: "0.725rem",
                md: "0.825rem",
              },
              color: "gray",
            }}
          >
            {t("form.texts.signup", { ns: "authentication" })}
          </Typography>{" "}
          <Link
            to="/auth-home/signup"
            color="inherit"
            style={{ color: "blueviolet" }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: {
                  xs: "0.725rem",
                  md: "0.825rem",
                },
                color: "blueviolet",
              }}
            >
              {t("buttons.signup", { ns: "common" })}
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignIn;
