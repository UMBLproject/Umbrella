import {
  container,
  defaultFont,
  cardTitle,
  roseColor,
  whiteColor,
  grayColor,
  hexToRgb
} from "@/assets/jss/material-dashboard-pro-react.js";

const homePageStyle = theme => ({
  container: {
    ...container,
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px"
    }
  },
  description: {
    ...defaultFont,
    color: whiteColor,
    textAlign: "left",
    fontWeight: "500",
    lineHeight: "3"
  },
  title: {
    ...defaultFont,
    fontSize: "40px",
    color: whiteColor,
    textAlign: "left",
    fontWeight: "bold"
  },
  cardTitleWhite: {
    ...cardTitle,
    color: whiteColor + " !important"
  },
  cardCategory: {
    color: grayColor[0],
    marginTop: "10px"
  },
  cardCategoryWhite: {
    color: whiteColor,
    marginTop: "10px"
  },
  icon: {
    color: "rgba(" + hexToRgb(whiteColor) + ", 0.76)",
    margin: "10px auto 0",
    width: "130px",
    height: "130px",
    border: "1px solid " + grayColor[11],
    borderRadius: "50%",
    lineHeight: "174px",
    "& svg": {
      width: "55px",
      height: "55px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      width: "55px",
      fontSize: "55px"
    }
  },
  iconWhite: {
    color: whiteColor
  },
  iconRose: {
    color: roseColor[0]
  },
  marginTop30: {
    marginTop: "30px"
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
  welcomeMsg: {
    textTransform: "uppercase",
    minHeight: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  adminLogin: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  navLink: {
    color: whiteColor,
    margin: "0 5px",    
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    lineHeight: "20px",
    position: "relative",
    display: "flex",
    padding: "10px 15px",
    textDecoration: "none",
    "&:hover,&:focus": {
      color: whiteColor,
    }
  },
  listItemIcon: {
    marginTop: "3px",
    width: "30px",
    color: "inherit",
    marginRight: "12px",
  },
  listItemText: {
    ...defaultFont,
    color: whiteColor,
    textAlign: "left",
    fontSize: "16px",
    fontWeight: "500",
  },
});

export default homePageStyle;
