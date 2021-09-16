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
  mainBlock: {
    textTransform: "uppercase",
    minHeight: "200px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    color: grayColor[19],
    "&:hover" : {
      color: warmRedColor,
    }
  },
  mainTitle: {
    fontFamily: '"Microgramma"',
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
