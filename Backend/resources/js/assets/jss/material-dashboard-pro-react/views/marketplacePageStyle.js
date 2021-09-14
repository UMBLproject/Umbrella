import {
  container,
  grayColor,
  warmRedColor,
} from "@/assets/jss/material-dashboard-pro-react.js";

const marketplacePageStyle = theme => ({
  container: {
    ...container,
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px"
    }
  },
  welcomTitle: {
    fontFamily: '"Microgramma"',
    color: grayColor[19],
    fontSize: "28px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "22px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
    },
    textAlign: "right",
    fontWeight: "bold"
  },
  welcomeBanner: {
    textTransform: "uppercase",
    minHeight: "280px",
    [theme.breakpoints.down("md")]: {
      minHeight: "220px",
    },
    [theme.breakpoints.down("sm")]: {
      minHeight: "160px",
    },
    [theme.breakpoints.down("xs")]: {
      minHeight: "90px",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  fullBackImage: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "-webkit-flex",
    display: "flex",
    height: "100%",
    width: "100%",
    zIndex: "-1",
    overflow: "auto",
    transition: "all .35s!important",
    backgroundPosition: "0 50%",
    backgroundRepeat: "no-repeat"
  },
});

export default marketplacePageStyle;
