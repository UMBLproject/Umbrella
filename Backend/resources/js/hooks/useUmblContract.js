import useContract from "./useContract";

import UmblNFT from "@/abis/UmblNFT.json";

const useUmblContract = () =>
  useContract(process.env.MIX_UMBL_NFT_ADDRESS, UmblNFT, true);

export default useUmblContract;
