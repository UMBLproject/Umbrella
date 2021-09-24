import React, { useState, useEffect, } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import Button from "@/components/CustomButtons/Button.js";
import React360Viewer from "@/components/360/React360Viewer.js";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import SweetAlert from "react-bootstrap-sweetalert";

// styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "@/assets/jss/material-dashboard-pro-react/views/commonPageStyle.js";
const useStyles = makeStyles(styles);

import tokenThumbnail from "@/assets/img/test/weapon-2.png";

// actions
import { LogoutAction, } from '@/redux/actions/AuthActions';

import { GetCrateInfoService, } from '@/services/UserServices';

// contract
import { useUmblContract } from "@/hooks";

export default function CrateItemPage() {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const { crateId } = useParams();

    const { isAuthenticated, isAdmin, } = useSelector((state) => state.userAuth);
    const { status, account, } = useSelector((state) => state.userWallet);

    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = React.useState(false);
    const [crateInfo, setCrateInfo] = useState(null); 
    const [purchasedTokens, setPurchasedTokens] = useState(null);
    const [pageStatus, setPageStatus] = useState(0);

    const umblNFTContract = useUmblContract();

    useEffect(() => {
        if(isAdmin && isAuthenticated) {
            history.push('/admin');
            return;
        } else if(!isAuthenticated) {
            dispatch(LogoutAction(history));
            return;
        } 
    }, [isAdmin, isAuthenticated]);

    useEffect(() => {
        GetCrateInfoService(crateId).then(res => {
            if(res.hasOwnProperty('success') && res.success === true) {
                setCrateInfo(res.crate);
            } else {
                history.push('/crates');
            }            
        }).catch(err => {
            console.log('Error => ' + err);
            history.push('/crates');
        })
    }, [crateId]);

    const handleGoBack = () => {
        history.push('/crates');
    };

    // sweet alert functions
    const hideAlert = () => {
        setAlert(null);
    };

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
    
    const handleBuyWithBnb = async () => {
        console.log('handleBuyWithBnb');
        if(!status || !account) {
            showErrorMsg('Please connect with metamask');
            return;
        } else {
            if (!umblNFTContract) {
                return;
            } 

            setLoading(true);

            const crateInfo = await umblNFTContract.methods
            .crateUmblData(parseInt(crateId))
            .call({ from: account });

            console.log(crateInfo);

            const price = crateInfo.price;
            const transaction = await umblNFTContract.methods
            .buyCrate(parseInt(crateId))
            .send({ from: account, value: price.toString() }, (error, transactionHash) => {
                if(transactionHash === undefined) {
                    setLoading(false);
                    return;
                } else {
                    console.log(transactionHash);
                }
            });

            console.log(transaction);

            let approvedTokens = [];

            for(let i=0; i<transaction.events.Approval.length; i++) {
                const tokenId = transaction.events.Approval[i].returnValues.tokenId;

                const tokenURI = await umblNFTContract.methods
                .tokenURI(parseInt(tokenId))
                .call({ from: account });

                let response = await fetch(tokenURI);
                let responseJson = await response.json();

                approvedTokens.push({
                    id: tokenId,
                    name: responseJson.name,
                    image: responseJson.image
                });
            }

            setPurchasedTokens(approvedTokens);
            setPageStatus(1);

            setLoading(false);
        }
    };

    const handleRefresh = () => {
        setPageStatus(0);
        setPurchasedTokens(null);
    }

    const handleGotoInventory = () => {
        history.push('/inventory');
    }

    return(
        <div className="crate-item-block">
            <div className="block-body">
                <div className="block-header">
                    <div className="header-left">
                        <div className="top-type">
                            <div className="top-category">Category:</div>
                            <div className="top-typeval">Survivor</div>
                        </div>
                        <div className="bottom-type">
                            <p>Each crate contains <span className="red-text">Four</span> objects</p>
                        </div>
                    </div>
                    <div className="header-center">
                        <div className="crate-type">
                            <div className="crate-level">Basic</div>
                            <div className="white-title">Crate</div>
                        </div>
                        <div className="crate-rarities">
                            <div className="crate-rarity">Common</div>
                            <div className="crate-rarity-divider">/</div>
                            <div className="crate-rarity">Uncommon</div>
                        </div>
                    </div>
                    <div className="header-right">
                        <Button color="auth" size="lgAuth" className="crate-btn" onClick={handleGoBack}>GO BACK</Button>
                    </div>
                </div>
                <div className="block-main">
                    <React360Viewer
                        amount={72}
                        imagePath="https://scaleflex.cloudimg.io/crop/1920x700/n/https://scaleflex.airstore.io/demo/360-car"
                        // imagePath="https://umbrella-s3-bucket-1.s3.us-east-2.amazonaws.com/collections/12345678"
                        // imagePath="https://scaleflex.airstore.io/demo/360-car"
                        imagePath="https://aadbxsetjq.cloudimg.io/v7/umbrella-s3-bucket-1.s3.us-east-2.amazonaws.com/collections/12345678/xxxx?func=crop&width=960&height=540"
                        fileName="{index}.png"
                        spinReverse
                        autoplay
                        loop
                        buttonClass="dark"
                    />
                </div>
                <div className="block-footer">
                    <Button color="auth" size="lgAuth" className="crate-btn" onClick={handleBuyWithBnb}>BUY WITH BNB</Button>
                </div>
                { pageStatus === 1 && purchasedTokens.length ? (
                <div className="block-popup">
                    <div className="popup-header">
                        You have been earned the following objects:
                    </div>
                    <div className="popup-body">
                        {purchasedTokens.map((prop, key) => {
                            return (
                            <div className="token-item" key={key}>
                                <div className="token-item-img">
                                    <img src={prop.image} />
                                </div>
                                <div className="token-item-name">
                                    {prop.name}
                                </div>
                            </div>
                            );
                        })}
                        
                    </div>
                    <div className="popup-footer">
                        <Button color="auth" size="lgAuth" className="crate-btn" onClick={handleRefresh}>GO BACK</Button>
                        <Button color="auth" size="lgAuth" className="crate-btn" onClick={handleGotoInventory}>GO TO INVENTORY</Button>
                    </div>
                </div>) : null }
            </div>
            <Backdrop className="backdrop" open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            { alert }
        </div>
    );
};