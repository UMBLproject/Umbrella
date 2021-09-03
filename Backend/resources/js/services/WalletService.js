import Web3 from "web3";

export const WalletConnectService = async() => {
    if(window.ethereum === undefined) {
        return new Promise((resolve, reject) => {
            reject({
                error: 'Non-Ethereum browser detected. You should consider trying MetaMask!',
            });
        });
    }

    try {
        // await window.ethereum.enable();
        await window.ethereum.send('eth_requestAccounts');
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
            return new Promise((resolve, reject) => {
                reject({
                    error: 'Account is not detected!',
                });
            });
        }

        return new Promise((resolve, reject) => {
            resolve({
                'success': true,
                'address': accounts[0],
            });
        });
    } catch (err) {
        return new Promise((resolve, reject) => {
            reject({
                error: err,
            });
        });
    }
    
};