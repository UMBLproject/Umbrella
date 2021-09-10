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
import Switch from '@material-ui/core/Switch';

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
  toggleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "30px !important"
  },
  bigTitle: {
    fontSize: "1.25rem !important",
    color: "#000 !important"
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,
  ...validationFormsStyle,
  ...extendedFormStyle,
  ...sweetAlertStyle
};

function ToggleMarketPage(props) {
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
  const [marketFlag, setMarketFlag] = React.useState(false);

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

  useEffect( async () => {
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

    const loadSaleFlag = async () => {
      if (!umblNFTContract) {
        return;
      }  
      await umblNFTContract.methods
        .isEnabledSale()
        .call({ from: account })
        .then(res => {
          setMarketFlag(res);
        });
    }

    await loadTotalSupply();
    await checkOwnerAccount();
    await loadSaleFlag();
  }, [umblNFTContract, account]);
  
  const handleMarketFlag = async () => {
    if(accountError) return;

    setLoading(true);
    if(!marketFlag) {
      await umblNFTContract.methods
        .startMarketPlace()
        .send({ from: account })
        .then((res) => {
          setMarketFlag(true);
          setLoading(false);
          showSuccessMsg('Marketplace function was successfully started!');
        })
        .catch((err) => {        
          console.log(err);
          setLoading(false);
        });     
    } else {
      await umblNFTContract.methods
        .pauseMarketPlace()
        .send({ from: account })
        .then((res) => {
          setMarketFlag(false);
          setLoading(false);
          showSuccessMsg('Marketplace function was successfully paused!');
        })
        .catch((err) => {        
          console.log(err);
          setLoading(false);
        });     
    }
    
  };

  return (    
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>        
        <Card>
          <CardHeader color="rose" text>
            <CardText color="rose">
              <h4 className={classes.cardTitle + ' ' + classes.cardTitleWhite}>TOGGLE MARKETPLACE</h4>
            </CardText>
          </CardHeader>
          <CardBody>
            { !accountError ? (
            <GridContainer>
              <GridItem xs={12} sm={2}>
                <FormLabel className={classes.labelHorizontal + ' ' + classes.bigTitle}>
                  Market Flag
                </FormLabel>
              </GridItem>
              <GridItem xs={12} sm={4} className={classes.toggleContainer}>
                <Switch
                  checked={marketFlag}
                  onChange={handleMarketFlag}
                  name="Market Flag"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              </GridItem>
              <GridItem xs={12} sm={6}></GridItem>
            </GridContainer>) : (
              <h4>Please connect with owner account, and refresh this page again</h4>
            )}
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

export default withStyles(style)(ToggleMarketPage) ;