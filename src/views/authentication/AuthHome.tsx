import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { useTranslation } from "react-i18next";

import Styles from "./AuthHome.module.scss";

import { useAppSelector } from "src/store/hooks";
import logo_medium from "src/assets/images/logo_medium.png";
import { Outlet, useNavigate } from "react-router-dom";

const AuthHome = () => {
  const { t, i18n } = useTranslation(["common", "authentication"]);

  const loadingState = useAppSelector((state) => state.loader.value);
  const authState = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <Grid container className={Styles["AuthHome-main"]}>
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
                  <Outlet />
                  <Box
                    className={Styles["help-box"]}
                    display={{ xs: "flex", md: "none" }}
                  >
                    <IconButton
                      onClick={() => {
                        navigate("contactus");
                      }}
                    >
                      <SupportAgentIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        navigate("help");
                      }}
                    >
                      <HelpCenterIcon />
                    </IconButton>
                  </Box>
                  <Box className={Styles["locale-box"]}>
                    <Select
                      size="small"
                      sx={{ transform: "scale(0.625)", color: "#a6a6abc" }}
                      variant="standard"
                      value={i18n.resolvedLanguage}
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
                ) : authState.token !== "" ? (
                  <LockOpenIcon fontSize="large" color="primary" />
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
                    onClick={() => {
                      navigate("contactus");
                    }}
                  >
                    {t("buttons.contactus", { ns: "common" })}
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    color="info"
                    size="small"
                    sx={{ marginTop: 5, marginLeft: 1 }}
                    onClick={() => {
                      navigate("help");
                    }}
                  >
                    {t("buttons.help", { ns: "common" })}
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box className={Styles["inner"]}></Box>
            <Box className={Styles["inner-icon-div"]}>
              <Box className={Styles["inner-icon"]}>
                {loadingState ? (
                  <CircularProgress color="primary" />
                ) : authState.token !== "" ? (
                  <LockOpenIcon fontSize="large" color="primary" />
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

export default AuthHome;
