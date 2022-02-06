import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import Styles from "./SignIn.module.scss";
import useLoader from "src/components/hooks/useLoader";
import { useAppSelector } from "src/store/hooks";
import logo_medium from "src/assets/images/logo_medium.png";

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
  const { i18n } = useTranslation();
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
                sx={{ textAlign: "center" }}
                className={Styles["inner-top"]}
              >
                <img src={logo_medium} alt="Codev" height={120} />
              </Grid>
              <Grid item xs={12} className={Styles["inner-bottom"]}>
                <Box className={Styles["login-box"]}>
                  <Grid container spacing={3}>
                    <Grid
                      item
                      xs={12}
                      sx={{ textAlign: "center", marginBottom: 2 }}
                    >
                      <Typography variant="h5" component="h4" fontWeight="bold">
                        Welcome to Codev Online
                      </Typography>
                    </Grid>
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
                                  Remember Me
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
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      <Typography
                        component="span"
                        sx={{
                          fontSize: "0.875rem",
                          color: "gray",
                        }}
                      >
                        Don't have account yet?
                      </Typography>{" "}
                      <Link href="#" color="inherit">
                        <span
                          style={{
                            fontSize: "0.875rem",
                            color: "blueviolet",
                          }}
                        >
                          Sign Up
                        </span>
                      </Link>
                    </Grid>
                  </Grid>
                  <Box
                    className={Styles["help-box"]}
                    display={{ xs: "flex", md: "none" }}
                  >
                    <IconButton>
                      <SupportAgentIcon />
                    </IconButton>
                    <IconButton>
                      <HelpCenterIcon />
                    </IconButton>
                  </Box>
                  <Box className={Styles["locale-box"]}>
                    <Select
                      size="small"
                      sx={{ transform: "scale(0.625)", color: "#a6a6ab" }}
                      variant="standard"
                      value={i18n.language}
                      onChange={(e) => {
                        i18n.changeLanguage(e.target.value);
                      }}
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="pt">Portugese</MenuItem>
                    </Select>
                  </Box>
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
            display={{ xs: "none", md: "flex" }}
            className={Styles["grid-side"]}
            sx={{ justifyContent: "center" }}
          >
            <Box
              sx={{
                height: "100%",
                width: "75%",
                maxWidth: "500px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid container spacing={1}>
                <Grid
                  item
                  xs={12}
                  sx={{ textAlign: "center", marginTop: 2, marginBottom: 2 }}
                >
                  <img src={logo_medium} alt="Codev" />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <span style={{ fontSize: "0.875rem", color: "#7c86b7" }}>
                    This would be the description of the website , what it does,
                    etc. It should be a 2 line description or more. only visible
                    in desktop view.
                  </span>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <span style={{ fontSize: "0.875rem", color: "#7c86b7" }}>
                    This would be the description of the website , what it does,
                    etc. It should be a 2 line description or more. only visible
                    in desktop view.
                  </span>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center", color: "gray" }}>
                  <Button
                    type="button"
                    variant="outlined"
                    color="warning"
                    size="small"
                    sx={{ marginTop: 5 }}
                  >
                    Contact Us
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    color="info"
                    size="small"
                    sx={{ marginTop: 5, marginLeft: 1 }}
                  >
                    Help
                  </Button>
                </Grid>
              </Grid>
            </Box>
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
