import {
  container,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  boxShadow,
  drawerWidth,
  transition,
  whiteColor,
  grayColor,
  blackColor,
  hexToRgb,
  darkRedColor,
} from "@/assets/jss/material-dashboard-pro-react.js";

const pagesHeaderStyle = theme => ({
  appBar: {    
    backgroundColor: "rgba(" + hexToRgb(grayColor[16]) + ", 0.5)",
    boxShadow: "none",
    borderBottomStyle: "solid",
    borderBottom: "3px",
    borderBottomColor: darkRedColor,
    marginBottom: "0",
    position: "absolute",
    width: "100%",
    zIndex: "1029",
    color: grayColor[6],
    borderRadius: "3px",
    padding: "0",
    transition: "all 150ms ease 0s",
    minHeight: "50px",
    display: "block",
    position: "fixed"
  },
  content: {
    margin: "0 auto",
    maxWidth: "1800px !important",
    position: "relative"
  },
  mainLink: {
    position: "absolute",
    left: "0",
    height: "100%"
  },
  rightLink: {
    position: "absolute",
    top: "0",
    right: "0",
    height: "100%",
    padding: "5px 15px 3px 15px",
    display: "flex",
    alignItems: "center",
    height: "100%"
  },
  mainIcon: {
    height: "32px !important"
  },
  container: {
    ...container,
    minHeight: "50px"
  },
  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    lineHeight: "30px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: whiteColor,
    letterSpacing: "unset",
    "&:hover,&:focus": {
      background: "transparent",
      color: whiteColor
    }
  },
  appResponsive: {
    top: "8px"
  },
  primary: {
    backgroundColor: primaryColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  info: {
    backgroundColor: infoColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  success: {
    backgroundColor: successColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  warning: {
    backgroundColor: warningColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  danger: {
    backgroundColor: dangerColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  list: {
    ...defaultFont,
    fontSize: "14px",
    margin: 0,
    marginRight: "-15px",
    paddingLeft: "0",
    listStyle: "none",
    color: whiteColor,
    paddingTop: "0",
    paddingBottom: "0"
  },
  listItem: {
    float: "left",
    position: "relative",
    display: "block",
    width: "auto",
    margin: "0",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      zIndex: "999",
      width: "100%",
      paddingRight: "15px"
    }
  },
  walletButton: {
    padding: "2px"
  },
  connectWallet: {
    textTransform: "uppercase",
    borderRadius: "10px",
    border: "2px solid white",
    fontSize: "12px",
    padding: "6px 12px"
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
    display: "block",
    padding: "10px 15px",
    textDecoration: "none",
    "&:hover,&:focus": {
      color: whiteColor,
      background: "rgba(" + hexToRgb(grayColor[17]) + ", 0.2)"
    }
  },
  navLinkOutline: {
    color: whiteColor,
    margin: "0 5px",    
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    lineHeight: "20px",
    position: "relative",
    display: "block",
    padding: "10px 15px",
    textDecoration: "none"
  },
  navMainLink: {    
    color: whiteColor,
    margin: "0 5px",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    lineHeight: "20px",
    position: "relative",
    display: "flex",
    padding: "10px 15px 8px 15px",
    textDecoration: "none",
    "&:hover,&:focus": {
      color: whiteColor,
      background: "rgba(" + hexToRgb(grayColor[17]) + ", 0.2)"
    }
  },
  mainTitle: {
    marginLeft: "10px",
    textAlign: "center",
    lineHeight: "16px"
  },
  listItemIcon: {
    marginTop: "-3px",
    top: "0px",
    position: "relative",
    marginRight: "3px",
    width: "20px",
    height: "20px",
    verticalAlign: "middle",
    color: "inherit",
    display: "inline-block"
  },
  largeListItemIcon: {
    marginTop: "-3px",
    top: "0px",
    position: "relative",
    marginRight: "3px",
    width: "32px",
    height: "32px",
    verticalAlign: "middle",
    color: "inherit",
    display: "inline-block",
    "&:hover,&:focus": {
      color: darkRedColor,
      boxShadow: "inset 1px 1px 1px 1px " + darkRedColor + " inset -1px -1px 1px 1px " + darkRedColor
    }
  },
  listItemText: {
    flex: "none",
    padding: "0",
    minWidth: "0",
    margin: 0,
    display: "inline-block",
    position: "relative",
    whiteSpace: "nowrap"
  },
  largeListItemText: {
    flex: "none",
    padding: "0",
    minWidth: "0",
    margin: 0,
    display: "inline-block",
    position: "relative",
    whiteSpace: "nowrap",
    fontSize: "14px",
    borderBottomStyle: "solid",
    borderBottom: "2px",
    borderBottomColor: darkRedColor,
  },
  mainItemText: {
    flex: "none",
    padding: "0",
    minWidth: "0",
    margin: 0,
    display: "inline-block",
    position: "relative",
    whiteSpace: "nowrap",
    marginLeft: "14px"
  },
  navLinkActive: {
    backgroundColor: "rgba(" + hexToRgb(whiteColor) + ", 0.1)"
  },
  drawerPaper: {
    border: "none",
    bottom: "0",
    transitionProperty: "top, bottom, width",
    transitionDuration: ".2s, .2s, .35s",
    transitionTimingFunction: "linear, linear, ease",
    ...boxShadow,
    width: drawerWidth,
    ...boxShadow,
    position: "fixed",
    display: "block",
    top: "0",
    height: "100vh",
    right: "0",
    left: "auto",
    visibility: "visible",
    overflowY: "visible",
    borderTop: "none",
    textAlign: "left",
    paddingTop: "10px",
    paddingRight: "0px",
    paddingLeft: "0",
    ...transition,
    "&:before,&:after": {
      position: "absolute",
      zIndex: "3",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      top: "0"
    },
    "&:after": {
      background: blackColor,
      opacity: ".8"
    }
  },
  sidebarButton: {
    position: "absolute",
    right: "10px",
    "&,&:hover,&:focus": {
      color: whiteColor
    },
    top: "-2px"
  }
});

export default pagesHeaderStyle;
