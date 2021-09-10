/*eslint-disable*/
import React, { useEffect, } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { useUmblContract } from "@/hooks";

import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

// material ui icons
import MailOutline from "@material-ui/icons/MailOutline";
import Contacts from "@material-ui/icons/Contacts";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "@/components/Grid/GridContainer.js";
import GridItem from "@/components/Grid/GridItem.js";
import CustomInput from "@/components/CustomInput/CustomInput.js";
import Button from "@/components/CustomButtons/Button.js";
import Card from "@/components/Card/Card.js";
import CardHeader from "@/components/Card/CardHeader.js";
import CardText from "@/components/Card/CardText.js";
import CardIcon from "@/components/Card/CardIcon.js";
import CardBody from "@/components/Card/CardBody.js";
import CardFooter from "@/components/Card/CardFooter.js";
import ImageUpload from "@/components/CustomUpload/ImageUpload.js";
import Table from "@/components/Table/Table.js";

// style for this view
import validationFormsStyle from "@/assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import customSelectStyle from "@/assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import customCheckboxRadioSwitch from "@/assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";

import extendedFormStyle from "@/assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

import sweetAlertStyle from "@/assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

import { GetTokenInformationService, } from '@/services/UserServices';
import { LogoutAction } from '@/redux/actions/AuthActions';

const style = {
  alertMsg: {
    paddingTop: '30px !important',
    color: 'red !important'
  },
  backdrop: {
    zIndex: 99999,
    color: '#fff',
  },
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  choiche: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px"
  },
  cardTitleWhite: {
    color: "white !important"
  },
  clearButton: {
    marginLeft: "10px"
  },
  p20: {
    paddingTop: "16px !important"
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,
  ...validationFormsStyle,
  ...extendedFormStyle,
  ...sweetAlertStyle
};

function AssignNFTPage(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  const { active, account, chainId, error } = useSelector(
    (state) => state.userWallet
  );

  // const { account, active } = useWeb3React();
  const umblNFTContract = useUmblContract();
  
  // state variables
  const [accountError, setAccountError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [totalSupply, setTotalSupply] = React.useState(null);
  const [alert, setAlert] = React.useState(null);
  const [tokenId, setTokenId] = React.useState(null);
  const [tokenUri, setTokenUri] = React.useState(null);
  const [tokenOwner, setTokenOwner] = React.useState(null);
  const [tokenInfo, setTokenInfo] = React.useState([]);

  // sweet alert functions
  const hideAlert = () => {
    setAlert(null);
  };

  const hideAlertRefresh = () => {
    setAlert(null);
    window.location.reload();
  };

  const showSuccessMsg = (message) => {
    setAlert(<SweetAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Success"
        onConfirm={() => hideAlertRefresh()}
        onCancel={() => hideAlertRefresh()}
        confirmBtnCssClass={classes.button + " " + classes.success}
      >
        {message}
    </SweetAlert>);
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
      >
        {message}
      </SweetAlert>
    );
  };

  const handleTokenIdClear = () => {
    setTokenId(null);
    document.getElementById('token_id').value = '';
  };

  const handleTokenIdSearch = async () => {
    let tokenIdValue = document.getElementById('token_id').value;
    if(tokenIdValue === null || tokenIdValue === '' || tokenIdValue <= 0)
      return;

    if (!umblNFTContract) {
      return;
    }  

    setTokenId(null);
    setLoading(true);

    await umblNFTContract.methods
      .ownerOf(tokenIdValue)
      .call({ from: account })
      .then((res) => {
        setTokenId(tokenIdValue);
        setTokenOwner(res);
        setLoading(false);
      })
      .catch((err) => {        
        console.log(err);
        setLoading(false);
      });      
  };

  const handleAssign = async () => {
    let userAccount = document.getElementById('user_account').value;
    if(userAccount === null || userAccount === '')
      return;

    console.log(userAccount);

    if(!window.web3.utils.isAddress(userAccount)) {
      showErrorMsg('Account is not valid');
    }

    if (!umblNFTContract) {
      return;
    }  

    setLoading(true);

    await umblNFTContract.methods
      .safeTransferFrom(account, userAccount, tokenId)
      .send({ from: account })
      .then((res) => {
        setLoading(false);
        const msg = 'Token Id ' + tokenId + ' was succesfully assigned to ' + userAccount + '.';
        showSuccessMsg(msg);
      })
      .catch((err) => {
        setLoading(false);
        showErrorMsg(err);
      });
  };

  useEffect(async () => {
    if(tokenId === null) {
      setLoading(false);
      return;
    }

    if (!umblNFTContract) {
      setLoading(false);
      return;
    }  

    await umblNFTContract.methods
      .tokenURI(tokenId)
      .call({ from: account })
      .then((res) => {
        setTokenUri(res);        
      })
      .catch((err) => {
        setLoading(false);
        showErrorMsg(err);
        handleTokenIdClear();
      });
  }, [tokenId, tokenOwner]);

  useEffect(async () => {
    if(tokenId === null) {
      setLoading(false);
      return;
    }
    if(tokenOwner === null) {
      setLoading(false);
      return;
    }

    await GetTokenInformationService(tokenId)
      .then((res) => {
        if(res.hasOwnProperty('success') && res.success === true) {
          setLoading(false); 
          
          let tokenInfoVal = [                
            ['tokenId', res.tokenId],  
            ['owner', tokenOwner],  
            ['assigned', res.assigned ? 'Assigned' : 'Not Assigned'],
            ['equipped', res.equipped ? 'Equipped' : 'Not Equipped'],              
            ['name', res.name],
            ['description', res.description],
            ['image', res.image],                
            ['external_url', res.external_url],
            ['metadata', 'http://umbrella.localhost/metadata/'+res.tokenId]
          ];

          res.attributes.map((prop, key) => {
            tokenInfoVal.push([
              'attribute - ' + prop.trait_type, prop.value
            ]);
          });

          setTokenInfo(tokenInfoVal);          
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tokenId, tokenOwner])

  useEffect(() => {
    const loadTotalSupply = async () => {
      if (!umblNFTContract) {
        return;
      }     

      const totalSupplyValue = await umblNFTContract.methods
        .totalSupply()
        .call({ from: account });

      setTotalSupply(totalSupplyValue);
    };

    const checkOwnerAccount = async () => {
      if (!umblNFTContract) {
        return;
      }  
      const ownerAccount = await umblNFTContract.methods
        .owner()
        .call({ from: account });

      if(ownerAccount !== account) {
        const errMsg = "Please connect with owner account";
        setAccountError(true);
        showErrorMsg(errMsg);
      } else {
        setAccountError(false);
      }
    }

    loadTotalSupply();
    checkOwnerAccount();
  }, [umblNFTContract, account]);
  
  return (    
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>        
        <Card>
          <CardHeader color="rose" text>
            <CardText color="rose">
              <h4 className={classes.cardTitle + ' ' + classes.cardTitleWhite}>ASSIGN TOKEN</h4>
            </CardText>
          </CardHeader>
          <CardBody>
          { !accountError ? (
            <form>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Token ID
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    id="token_id"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "number",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} className={classes.p20}>
                  <Button color="rose" onClick={handleTokenIdSearch}>
                    Search
                  </Button>
                  <Button color="info" className={classes.clearButton} onClick={handleTokenIdClear}>
                    Clear
                  </Button>
                </GridItem>
              </GridContainer>
              { tokenId ? ( 
              <div>             
                <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Token Info
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={6}>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["Key", "Value"]}
                    tableData={tokenInfo}
                    coloredColls={[3]}
                    colorsColls={["primary"]}
                  />
                </GridItem>
                <GridItem xs={12} sm={4}></GridItem>
              </GridContainer>
                { tokenOwner && tokenOwner === account ? (
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Address
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={6}>
                    <CustomInput
                      id="user_account"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "string",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} className={classes.p20}>
                    <Button color="rose" onClick={handleAssign}>
                      Assign
                    </Button>
                  </GridItem>
                </GridContainer>) : (
                  <GridContainer>
                    <GridItem xs={12} sm={2}>
                    </GridItem>
                    <GridItem xs={12} sm={6} className={classes.alertMsg}>
                      The token(ID: {tokenId}) is owned by {tokenOwner}
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                    </GridItem>
                  </GridContainer>)}
              </div>
              ) : null }
            </form>
            ) :             
            (<h4>Please connect with owner account, and refresh this page again</h4>)}
          </CardBody>
          <CardFooter className={classes.justifyContentCenter}>
          </CardFooter>          
        </Card>        
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        {alert}
      </GridItem>
    </GridContainer>  
  );
}

export default withStyles(style)(AssignNFTPage) ;