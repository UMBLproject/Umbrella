import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Menu from "@material-ui/icons/Menu";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
import LockOpen from "@material-ui/icons/LockOpen";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import AccountCircle from "@material-ui/icons/AccountCircle";
import House from "@material-ui/icons/House";
// core components
import Button from "@/components/CustomButtons/Button";

import styles from "@/assets/jss/material-dashboard-pro-react/components/userNavbarStyle.js";

import mainIcon from "@/assets/img/umbl_ico.png";

const useStyles = makeStyles(styles);

import { LogoutAction } from '@/redux/actions/AuthActions';

export default function UserNavbar(props) {
  const dispatch = useDispatch();
  const { isAdmin, isAuthenticated, } = useSelector(
    (state) => state.userAuth
  );
  const [open, setOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  // verifies if routeName is the one active (in browser input)
  const activeRoute = routeName => {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  };
  const classes = useStyles();
  const { color } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });

  const logoutClick = (e) => {
    e.preventDefault();    

    dispatch(LogoutAction());
  };

  var authorizedList = (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <NavLink to={"/"} className={classes.navLink}>
          <Dashboard className={classes.listItemIcon} />
          <ListItemText
            primary={"Dashboard"}
            disableTypography={true}
            className={classes.listItemText}
          />
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink
          to={"/pricing-page"}
          className={cx(classes.navLink, {
            [classes.navLinkActive]: activeRoute("/pricing-page")
          })}
        >
          <MonetizationOn className={classes.listItemIcon} />
          <ListItemText
            primary={"Pricing"}
            disableTypography={true}
            className={classes.listItemText}
          />
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink
          to={"/register"}
          className={cx(classes.navLink, {
            [classes.navLinkActive]: activeRoute("/register")
          })}
        >
          <PersonAdd className={classes.listItemIcon} />
          <ListItemText
            primary={"Register"}
            disableTypography={true}
            className={classes.listItemText}
          />
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink
          to={"/login"}
          className={cx(classes.navLink, {
            [classes.navLinkActive]: activeRoute("/login")
          })}
        >
          <Fingerprint className={classes.listItemIcon} />
          <ListItemText
            primary={"Login"}
            disableTypography={true}
            className={classes.listItemText}
          />
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink
          to={"/lock-screen-page"}
          className={cx(classes.navLink, {
            [classes.navLinkActive]: activeRoute("/lock-screen-page")
          })}
        >
          <LockOpen className={classes.listItemIcon} />
          <ListItemText
            primary={"Lock"}
            disableTypography={true}
            className={classes.listItemText}
          />
        </NavLink>
      </ListItem>
    </List>
  );
  var unAuthorizedList = (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <NavLink to={"/"} className={classes.navLink}>
          <House className={classes.listItemIcon} />
          <ListItemText
            primary={"Home"}
            disableTypography={true}
            className={classes.listItemText}
          />
        </NavLink>
      </ListItem>
    </List>
  );
  return (
    <AppBar position="static" className={classes.appBar + appBarClasses}>
      <div className={classes.content}>
        <div className={classes.mainLink}>
          <NavLink to={"/"} className={classes.navMainLink}>
            <img src={mainIcon} className={classes.mainIcon} alt="..." />
            <div className={classes.mainTitle}>
              <div color="transparent">
                <ListItemText
                  primary={"UMBLRELLA"}
                  disableTypography={true}
                  className={classes.largeListItemText}
                />
              </div>
              <div color="transparent">
                <ListItemText
                  primary={"PROJECT"}
                  disableTypography={true}
                  className={classes.listItemText}
                />
              </div>
            </div>
          </NavLink>
        </div>
        <Toolbar className={classes.container}>          
          <Hidden smDown>
            { isAuthenticated ? authorizedList : unAuthorizedList }
          </Hidden>
          <Hidden mdUp>
            <Button
              className={classes.sidebarButton}
              color="transparent"
              justIcon
              aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <Menu />
            </Button>
          </Hidden>
          <Hidden mdUp>
            <Hidden mdUp>
              <Drawer
                variant="temporary"
                anchor={"right"}
                open={open}
                classes={{
                  paper: classes.drawerPaper
                }}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
              >
                { isAuthenticated ? authorizedList : unAuthorizedList }
              </Drawer>
            </Hidden>
          </Hidden>
        </Toolbar>
        <div className={classes.rightLink}>
          { isAuthenticated ? (
          <Hidden smDown>
            <List className={classes.list}>
              <ListItem className={classes.listItem}>
                <Button
                  className={classes.walletButton}
                  color="transparent"
                  aria-label="open drawer"
                >
                  <div className={classes.connectWallet}>
                    Connect Wallet
                  </div>
                </Button>
              </ListItem>
              <ListItem className={classes.listItem}>
                <NavLink to={"/profile"} className={classes.navLinkOutline} onClick={logoutClick}>
                  <AccountCircle className={classes.largeListItemIcon} />
                </NavLink>
              </ListItem>              
            </List>
          </Hidden>
          ) : null }
        </div>
      </div>
    </AppBar>
  );
}

UserNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
};
