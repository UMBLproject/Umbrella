import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, } from 'react-redux';
import { injected } from "@/utils/connectors";

import * as ActionTypes from '@/redux/ActionTypes';

const useInactiveListener = (suppress = false) => {
  const dispatch = useDispatch();

  const { active, error, activate, deactivate, account, chainId } = useWeb3React();

  const getErrorMessage = (error) => {
    if (error instanceof NoEthereumProviderError) {
        return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
    } else if (error instanceof UnsupportedChainIdError) {
        return "You're connected to an unsupported network."
    } else if (
        error instanceof UserRejectedRequestErrorInjected ||
        error instanceof UserRejectedRequestErrorWalletConnect ||
        error instanceof UserRejectedRequestErrorFrame
    ) {
        return 'Please authorize this website to access your Ethereum account.';
    } else {
        console.error(error);
        return 'An unknown error occurred. Check the console for more details.';
    }
  }

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = () => {
        console.log('handleChainChanged');

        dispatch({type: ActionTypes.WALLET_DISCONNECT_START});
        deactivate();
        dispatch({type: ActionTypes.WALLET_DISCONNECT_SUCCESS});

        dispatch({type: ActionTypes.RESTART_WALLET_CONNECT});
        activate(injected, undefined, true).then(() => {
          dispatch({type: ActionTypes.WALLET_CONNECT_SUCCESS, payload: {
            chainId: chainId,
            account: account,
            active: active
          }});
        }).catch((error) => {
          console.error("Failed to activate after chain changed", error);
        });
      };
      const handleAccountsChanged = (accounts) => {
        console.log('handleAccountsChanged');

        dispatch({type: ActionTypes.WALLET_DISCONNECT_START});
        deactivate();
        dispatch({type: ActionTypes.WALLET_DISCONNECT_SUCCESS});
        
        if (accounts.length > 0) {    
          dispatch({type: ActionTypes.RESTART_WALLET_CONNECT});      
          activate(injected, undefined, true).then(() => {
            dispatch({type: ActionTypes.WALLET_CONNECT_SUCCESS, payload: {
              chainId: chainId,
              account: account,
              active: active
            }});
          }).catch((error) => {
            dispatch({type: ActionTypes.WALLET_CONNECT_ERROR, payload: {
              error: getErrorMessage(error)
            }});
            console.error("Failed to activate after accounts changed", error);
          });
        }
      };

      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
    return undefined;
  }, [active, error, suppress, activate]);
};

export default useInactiveListener;
