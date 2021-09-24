import React, { useState, useEffect, } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

// @material-ui/core components
import Hidden from "@material-ui/core/Hidden";

// core components
import GridContainer from "@/components/Grid/GridContainer.js";
import GridItem from "@/components/Grid/GridItem.js";
import Button from "@/components/CustomButtons/Button.js";
import Card from "@/components/Card/Card.js";
import CardBody from "@/components/Card/CardBody.js";

// Icons
import userAvatar from "@/assets/img/icons/userAvatar.png";

import SweetAlert from "react-bootstrap-sweetalert";

// styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "@/assets/jss/material-dashboard-pro-react/views/commonPageStyle.js";
const useStyles = makeStyles(styles);

// actions
import { LogoutAction, } from '@/redux/actions/AuthActions';
import { GetTokenListService } from '@/services/UserServices';

// contract
import { useUmblContract } from "@/hooks";

export default function Profile() {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();

    const { isAuthenticated, isAdmin, } = useSelector((state) => state.userAuth);
    const { status, account, } = useSelector((state) => state.userWallet);

    const umblNFTContract = useUmblContract();

    const [alert, setAlert] = React.useState(null);
    const [accountError, setAccountError] = React.useState(false);
    const [userBadges, setUserBadges] = useState([]);

    useEffect(() => {
        if(isAdmin && isAuthenticated) {
            history.push('/admin');
            return;
        } else if(!isAuthenticated) {
            dispatch(LogoutAction(history));
            return;
        } 
    }, [isAdmin, isAuthenticated]);   

    useEffect(async () => {
        if(status && account) {
            if (!umblNFTContract) {
                return;
            } 

            let tokensOfOwner = await umblNFTContract.methods
            .tokensOfOwner(account)
            .call({ from: account })
            .catch(err => {
                console.log(err);
            });

            const tokenIds = tokensOfOwner.join(',');

            GetTokenListService({tokenIdList: tokenIds})
            .then(res => {
                const selectedTokenList = res.tokenList.filter((data) => {
                    return data.category.id === 7;
                });
                setUserBadges(selectedTokenList.map((prop, key) => {
                    return {
                        tokenId: prop.tokenId,
                        name: prop.name,
                        description: prop.description,
                        category: prop.category.name,
                        rarity: prop.rarity.id,
                        rarityName: prop.rarity.name,
                        assigned: prop.assigned,
                        equipped: prop.equipped,
                        image: prop.image,
                        attributes: JSON.parse(prop.attributes)
                    };
                }));                
            })
            .catch(err => {
                showErrorMsg(err);
                return;
            });


        } else {
            setAccountError(true);
        }
    }, [status, account]);

    useEffect(() => {
        if(accountError) {
            setAlert(
                <SweetAlert
                  closeOnClickOutside={false}
                  style={{ display: "block", marginTop: "-100px" }}
                  title="ERROR"
                  onConfirm={() => hideAlert()}
                  onCancel={() => hideAlert()}
                  confirmBtnCssClass={classes.button + " " + classes.info}
                  customClass="blackMsg"
                >
                    Please connect metamask
                </SweetAlert>
              );
        }
    }, [accountError])
    
    const showErrorMsg = (message) => {
        setAlert(
          <SweetAlert
            closeOnClickOutside={false}
            style={{ display: "block", marginTop: "-100px" }}
            title="Error!"
            onConfirm={() => hideAlert()}
            onCancel={() => hideAlert()}
            confirmBtnCssClass={classes.button + " " + classes.info}
            customClass="blackMsg"
          >
            {message}
          </SweetAlert>
        );
    };  

    const handleLogout = () => {
        dispatch(LogoutAction(history));
    }

    const hideAlert = () => {
        setAlert(null);
    };

    const handleViewInventory = () => {
        history.push('/inventory');
    }
    
    const handleViewProfile = () => {
        history.push('/account');
    }

    return(
        <div className={classes.container}> 
            <GridContainer justifyContent="flex-start">
                <GridItem xs={12} sm={12} md={12}>
                    <div className="account-navbar">
                        <div className="account-navbar-item" onClick={() => {history.push('/account')}}>
                            <div className="account-navbar-item-icon">
                                <i className="far fa-address-card"></i>
                            </div>
                            <div className="account-navbar-item-text">
                                General
                            </div>
                        </div>
                        <div className="account-navbar-item active" onClick={() => {history.push('/account/profile')}}>
                            <div className="account-navbar-item-icon">
                                <i className="fas fa-user"></i>
                            </div>
                            <Hidden smDown>
                                <div className="account-navbar-item-text">
                                    Profile
                                </div>
                            </Hidden>
                        </div>
                        <div className="account-navbar-item" onClick={() => {history.push('/account/security')}}>
                            <div className="account-navbar-item-icon">
                                <i className="fas fa-lock"></i>
                            </div>
                            <Hidden smDown>
                                <div className="account-navbar-item-text">
                                    Security
                                </div>
                            </Hidden>
                        </div>
                    </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <div className="account-block">
                        <GridContainer justifyContent="flex-start" >                            
                            <GridItem xs={12} sm={12} md={6}>
                                <div className="profile-block">
                                    <div className="profile-avatar">
                                        <img src={userAvatar} alt='user_avatar' />                                        
                                    </div>
                                    <div className="profile-description">
                                        <div className="whiteTitleText">Your User Profile</div>
                                        <div className="smallDescText">Customize your User Profile</div>
                                    </div>
                                </div>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6} style={{display: "flex", justifyContent: "flex-end"}}>
                                <Button color="auth" size="lgAuth" style={{marginRight: "10px"}} onClick={handleViewInventory}>View Inventory</Button>
                                <Button color="auth" size="lgAuth" onClick={handleViewProfile}>View Profile</Button>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <div className="badges-block">
                                    <div className="badges-title">
                                        Badges                                     
                                    </div>
                                    <div className="badges-block-container">
                                        { userBadges.length ? userBadges.map((prop, key) => {
                                            return (
                                                <div className="badge-item-block" key={key}> 
                                                    <div className="badge-item-rarity">{prop.rarityName}</div>                                           
                                                    <div className="badge-item-image">
                                                        <img src={'/img/' + prop.image} alt='user_avatar' />     
                                                    </div>
                                                    <div className="badge-item-class">{prop.name}</div>                                                    
                                                    <div className="badge-item-action">
                                                        <Button color="auth" size="sm">Take</Button>
                                                    </div>
                                                </div>
                                            )
                                        }): null }
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>
                    </div>
                </GridItem>
                { alert }
            </GridContainer>
        </div>
    );
};