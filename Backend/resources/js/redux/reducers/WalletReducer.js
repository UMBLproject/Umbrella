import * as ActionTypes from '../ActionTypes';

const initState = {
    loading: false,
    active: false,
    account: null,
    chainId: null,
    error: "",    
};

const WalletReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.RESTART_WALLET_CONNECT:
            return {
                ...state,   
                loading: true,             
                active: false,
                account: null,
                chainId: null,
                error: "",
            };
        case ActionTypes.WALLET_CONNECT_SUCCESS:
            return {
                ...state,
                loading: false,
                active: action.payload.active,
                account: action.payload.account,
                chainId: action.payload.chainId,
                error: "",
            };
        case ActionTypes.WALLET_CONNECT_ERROR:
            return {
                ...state,
                loading: false,
                active: false,
                account: null,
                chainId: null,
                error: action.payload.error,
            }; 
        case ActionTypes.WALLET_DISCONNECT_START:
            return {
                ...state,   
                loading: true,
            };
        case ActionTypes.WALLET_DISCONNECT_SUCCESS:
            return {
                ...state,
                loading: false,
                active: false,
                account: null,
                chainId: null,
                error: "",
            }; 
        case ActionTypes.WALLET_DISCONNECT_ERROR:
            return {
                ...state,
                loading: false,
                active: false,
                account: null,
                chainId: null,
                error: action.payload.error,
            }; 
        default:
            return state;
    }
};

export default WalletReducer;