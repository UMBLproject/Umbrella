import React, { useState, useEffect, } from "react";
import { useDispatch, useSelector, } from 'react-redux';

import Web3 from 'web3'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected,  } from '@web3-react/injected-connector'
import { injected } from '@/utils/connectors';
import { useEagerConnect, useInactiveListener } from '@/hooks';

import Button from "@/components/CustomButtons/Button.js";

import { makeStyles } from "@material-ui/core/styles";
import styles from "@/assets/jss/material-dashboard-pro-react/components/connectWalletStyle.js";
const useStyles = makeStyles(styles);

import { WalletNonceAction, WalletAuthAction, WalletDisconnectAction, } from '@/redux/actions/WalletActions';

export default function ConnectButton() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { status, nonce, tried, } = useSelector(
        (state) => state.userWallet
    );

    const { connector, chainId, account, activate, deactivate, active, error } = useWeb3React();

    const [ activatingConnector, setActivatingConnector ] = useState(null);

    const getErrorMessage = (error) => {
        if (error instanceof NoEthereumProviderError) {
            return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
        } else if (error instanceof UnsupportedChainIdError) {
            return "You're connected to an unsupported network.";
        } else if (error instanceof UserRejectedRequestErrorInjected) {
            return 'Please authorize this website to access your Ethereum account.';
        } else {
            return 'An unknown error occurred. Check the console for more details.';
        }
    };

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);

            if(active && account && error === undefined) {
                dispatch(WalletNonceAction(account));
            }
        }
    }, [activatingConnector, connector]);

    useEffect(() => {
        if(!!error) {
            const errMsg = getErrorMessage(error);
            console.log(errMsg);

            dispatch(WalletDisconnectAction());

            window.alert(errMsg);
        }
    }, [error]);

    // useEffect(() => {
    //     window.ethereum.enable();
    // }, []);

    useEffect( async () => { 
        if(nonce && active && account && tried && !status) {
            const web3 = new Web3(window.ethereum);
            const authMsg = 'Nonce: ' + nonce;
            let signed = await web3.eth.personal.sign(authMsg, account,
                function (err, sig) {
                    console.dir("Signature: " + sig);
                    dispatch(WalletAuthAction(account, sig));
                });
        }
    }, [nonce, tried, status]);

    const handleConnect = async (e) => {
        if(!status) {
            if(!active) {
                setActivatingConnector(injected);
                await activate(injected);                
            } else {
                if(account && error === undefined) {
                    dispatch(WalletNonceAction(account));
                }
            }
        } else {
            dispatch(WalletDisconnectAction());
        }
    };

    const showWalletAddress = (str) => {
        return str.substring(0, 6) + '...' + str.substring(str.length-4);
    };

    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect();

    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector);

    return (
        <Button color="auth" size="lgAuth" className={classes.connectWallet} onClick={handleConnect}>
            {/* { account !== null && account && active ? showWalletAddress(account) : "CONNECT WALLET" } */}
            { status ? "Disconnect" : "CONNECT WALLET" }
        </Button>
    )
}