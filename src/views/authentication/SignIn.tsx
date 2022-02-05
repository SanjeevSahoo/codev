import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  Link,
  TextField,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Styles from "./SignIn.module.scss";
import useLoader from "src/components/hooks/useLoader";
import { useAppSelector } from "src/store/hooks";

interface ILoginFormValue {
  email: string;
  password: string;
  remember: boolean;
}

const formSchema = Yup.object().shape({
  email: Yup.string().required("Login Id is required"),
  password: Yup.string()
    .trim()
    .required("Password is required")
    .max(18, "Maximum 50 characters can be entered"),
});
const SignIn = () => {
  const { handleSubmit, control, formState } = useForm<ILoginFormValue>({
    defaultValues: { email: "", password: "", remember: false },
    resolver: yupResolver(formSchema),
  });
  const { isSubmitting } = formState;
  const loader = useLoader();
  const loadingState = useAppSelector((state) => state.loader.value);

  const handleFormSubmit: SubmitHandler<ILoginFormValue> = (values) => {
    console.log(values);
    loader.show();
    setTimeout(() => {
      loader.hide();
    }, 2000);
  };
  return (
    <Grid container className={Styles["SignIn-main"]}>
      <Grid item xs={12} md={6} className={Styles["login-section"]}>
        <Grid container className={Styles["login-inner"]}>
          <Grid
            item
            xs={12}
            display={{ xs: "block", md: "none" }}
            className={Styles["inner-top"]}
          ></Grid>
          <Grid item xs={12} className={Styles["inner-bottom"]}></Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        className={Styles["side-section"]}
        display={{ xs: "none", md: "block" }}
      ></Grid>
      <Box className={Styles["inner-div"]} sx={{ boxShadow: 10 }}>
        <Grid container className={Styles["grid-main"]}>
          <Grid item xs={12} md={6} className={Styles["grid-login"]}>
            <Grid container className={Styles["login-inner"]}>
              <Grid
                item
                xs={12}
                display={{ xs: "block", md: "none" }}
                className={Styles["inner-top"]}
              ></Grid>
              <Grid item xs={12} className={Styles["inner-bottom"]}>
                <Box className={Styles["login-box"]}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Controller
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl fullWidth size="small">
                            <TextField
                              label="Email"
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
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl fullWidth size="small">
                            <TextField
                              label="Password"
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
                    <Grid
                      item
                      xs={6}
                      sx={{ justifyContent: "left", alignItems: "center" }}
                    >
                      <Controller
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
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
                                <span
                                  style={{
                                    fontSize: "0.825rem",
                                    color: "gray",
                                  }}
                                >
                                  Keep me logged in
                                </span>
                              }
                            />
                          </FormControl>
                        )}
                        name="remember"
                        control={control}
                      />
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                      <Link href="#" color="inherit">
                        <span
                          style={{
                            fontSize: "0.825rem",
                            color: "gray",
                          }}
                        >
                          Forgot Password
                        </span>
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
                          Log In
                        </Button>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Box className={Styles["inner"]}></Box>
            <Box className={Styles["inner-icon-div"]}>
              <Box className={Styles["inner-icon"]}>
                {loadingState ? (
                  <CircularProgress color="primary" />
                ) : (
                  <LockIcon fontSize="large" color="primary" />
                )}
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display={{ xs: "none", md: "block" }}
            className={Styles["grid-side"]}
          >
            <Box className={Styles["inner"]}></Box>
            <Box className={Styles["inner-icon-div"]}>
              <Box className={Styles["inner-icon"]}>
                {loadingState ? (
                  <CircularProgress color="primary" />
                ) : (
                  <LockIcon fontSize="large" color="primary" />
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default SignIn;
