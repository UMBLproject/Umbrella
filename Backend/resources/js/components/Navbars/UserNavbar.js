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
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ShopIcon from '@material-ui/icons/Shop';

// core components
import Button from "@/components/CustomButtons/Button";

import styles from "@/assets/jss/material-dashboard-pro-react/components/userNavbarStyle.js";

import mainIcon from "@/assets/img/umbl_icon.png";

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
    let currentRoute = window.location.href;

    if(routeName === '/') {
      return false;
      return (currentRoute.length === currentRoute.lastIndexOf(routeName) + 1) ? true : false;
    } else {
      return window.location.href.indexOf(routeName) > -1 ? true : false;
    }
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
    <div className={classes.mainNavbarList}>
      <List className={classes.list + ' ' + classes.centerSubNav}>
        <ListItem className={classes.listItem}>
          <NavLink 
            to={"/"} 
            className={cx(classes.navLink, {
              [classes.navLinkActive]: activeRoute("/")
            })}>
            <House className={classes.listItemIcon} />
            <ListItemText
              primary={"Dashboard"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink
            to={"/inventory"}
            className={cx(classes.navLink, {
              [classes.navLinkActive]: activeRoute("/inventory")
            })}
          >
            <AccountBalanceIcon className={classes.listItemIcon} />
            <ListItemText
              primary={"Inventory"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink
            to={"/marketplace"}
            className={cx(classes.navLink, {
              [classes.navLinkActive]: activeRoute("/marketplace")
            })}
          >
            <ShopIcon className={classes.listItemIcon} />
            <ListItemText
              primary={"Marketplace"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>        
      </List>
      <List className={classes.list + ' ' + classes.rightSubNav}>
        <ListItem className={classes.listItem}>
          <NavLink 
            to={"/profile"} 
            className={cx(classes.navLink, {
              [classes.navLinkActive]: activeRoute("/profile")
            })}>
            <AccountCircle className={classes.listItemIcon} />
            <Hidden mdUp>
              <ListItemText
                primary={"Profile"}
                disableTypography={true}
                className={classes.listItemText}
              />
            </Hidden>
          </NavLink>
        </ListItem>     
      </List>
    </div>
  );
  var unAuthorizedList = (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        
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
                  className={classes.smallListItemText}
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
            { isAuthenticated ? (
            <Button
              className={classes.sidebarButton}
              color="transparent"
              justIcon
              aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <Menu />
            </Button>
            ) : null }
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
