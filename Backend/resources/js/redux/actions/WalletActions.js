import * as ActionTypes from '../ActionTypes';
import { WalletConnectService } from '../../services/WalletService';

export const WalletConnectAction = (res) => {
    return (dispatch) => {
        dispatch({type: ActionTypes.RESTART_WALLET_CONNECT});
        dispatch({type: ActionTypes.WALLET_CONNECT_SUCCESS, payload: res});
    }
}

export const WalletDisconnectAction = () => {
    return (dispatch) => {
        dispatch({type: ActionTypes.WALLET_DISCONNECT_START});
        dispatch({type: ActionTypes.WALLET_DISCONNECT_SUCCESS});
    }
}