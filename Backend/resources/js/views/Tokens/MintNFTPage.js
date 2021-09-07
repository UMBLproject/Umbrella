/*eslint-disable*/
import React, { useEffect, } from "react";
import { useDispatch, useSelector } from 'react-redux';

import Web3 from "web3";
import UmblToken from "@/abis/UmblNFT.json";

import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";

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

// style for this view
import validationFormsStyle from "@/assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import customSelectStyle from "@/assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import customCheckboxRadioSwitch from "@/assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";

import extendedFormStyle from "@/assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

import sweetAlertStyle from "@/assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

import { GetObjectCategoriesService, GetObjectRaritiesService, PostMintTokensService, } from '@/services/UserServices';
import { LogoutAction } from '@/redux/actions/AuthActions';

const style = {
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
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,
  ...validationFormsStyle,
  ...extendedFormStyle,
  ...sweetAlertStyle
};

function MintNFTPage(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  
  //
  const [loading, setLoading] = React.useState(false);
  const [itemCategories, setItemCategories] = React.useState([]);
  const [itemRarities, setItemRarities] = React.useState([]);
  const [tokenCategory, setTokenCategory] = React.useState("");
  const [tokenRarity, setTokenRarity] = React.useState("");
  const [tokenThumbnail, setTokenThumbnail] = React.useState(null);
  const [tokenName, setTokenName] = React.useState("");
  const [tokenNameState, setTokenNameState] = React.useState("");
  const [tokenDescription, setTokenDescription] = React.useState("");
  const [tokenDescriptionState, setTokenDescriptionState] = React.useState("");
  const [tokenCount, setTokenCount] = React.useState(null);
  const [tokenCountState, setTokenCountState] = React.useState("");
  const [alert, setAlert] = React.useState(null);


  const handleCategory = event => {
    setTokenCategory(event.target.value);
  };
  const handleRarity = event => {
    setTokenRarity(event.target.value);
  };
  const handletokenThumbnail = file => {
    setTokenThumbnail(file);
  };
  // function that returns true if value is email, false otherwise
  const verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };
  // function that verifies if value contains only numbers
  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };
  // verifies if value is a valid URL
  const verifyUrl = value => {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  };
  const registerClick = () => {
    if (registerEmailState === "") {
      setregisterEmailState("error");
    }
    if (registerPasswordState === "") {
      setregisterPasswordState("error");
    }
    if (registerConfirmPasswordState === "") {
      setregisterConfirmPasswordState("error");
    }
    if (registerCheckboxState === "") {
      setregisterCheckboxState("error");
    }
  };
  const loginClick = () => {
    if (loginEmailState === "") {
      setloginEmailState("error");
    }
    if (loginPasswordState === "") {
      setloginPasswordState("error");
    }
  };
  const typeClick = () => {
    if (tokenNameState === "") {
      setTokenNameState("error");
    }
    if (tokenDescriptionState === "") {
      setTokenDescriptionState("error");
    }
    if (tokenCountState === "") {
      setTokenCountState("error");
    }
  };
  const rangeClick = () => {
    if (minLengthState === "") {
      setminLengthState("error");
    }
    if (maxLengthState === "") {
      setmaxLengthState("error");
    }
    if (rangeState === "") {
      setrangeState("error");
    }
    if (minValueState === "") {
      setminValueState("error");
    }
    if (maxValueState === "") {
      setmaxValueState("error");
    }
  };  

  const showAlertMsg = (message) => {
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

  const hideAlert = () => {
    setAlert(null);
  };

  const handleMint = async () => {    
    var validation = true;
    var errMsg = "";

    // typeClick();

    // if(tokenCategory === "") {
    //   validation = false;
    //   errMsg = "Token category cannot be empty.<br/>";
    // } 
    
    // if(tokenRarity === "") {
    //   validation = false;
    //   errMsg += "Token rarity cannot be empty.<br/>";
    // } 
    
    // if(tokenThumbnail === null) {
    //   validation = false;
    //   errMsg += "Token thumbnail cannot be empty.<br/>";
    // } 
    
    // if(tokenNameState === "error") {
    //   validation = false;
    //   errMsg += "Token Name cannot be empty.<br/>";
    // } 
    
    // if(tokenDescriptionState === "error") {      
    //   validation = false;
    //   errMsg += "Token Description cannot be empty.<br/>";
    // }

    // if(tokenCount === null) {      
    //   validation = false;
    //   errMsg += "Token Count cannot be empty.<br>";
    // }

    if(!validation) {
      showAlertMsg(errMsg);
    } else {
      if (!window.ethereum) {
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
        return;
      }
      web3 = new Web3(window.ethereum);
      setLoading(true);
      const networkId = await web3.eth.net.getId();
      window.alert(networkId);

      const umblNFTContract = new web3.eth.Contract(
        UmblToken,
        '0x067317D42E92F5F6534770D74abb91f8055E675E'
      );

      console.log(umblNFTContract);

      const tokenPrice = 2.5;
      const price = window.web3.utils.toWei(tokenPrice.toString(), "Ether");
      console.log(price);

      const accounts = await web3.eth.getAccounts();
      
      umblNFTContract.methods
          .mint(15, price)
          .send({ from: accounts[0] })
          .on("confirmation", (res) => {
            console.log(res);
          });

      setLoading(false);

      // let formData = new FormData();

      // formData.append('category', tokenCategory);
      // formData.append('rarity', tokenRarity);
      // formData.append('thumbnail', tokenThumbnail);
      // formData.append('name', tokenName);
      // formData.append('description', tokenDescription);
      // formData.append('count', tokenCount);

      // console.log(formData.get('thumbnail'));

      // PostMintTokensService(formData).then((res) => {
      //   if(res.hasOwnProperty('success') && res.success === true) {
      //   } else if(res.hasOwnProperty('success') && res.success === false) {
      //     if(res.error === 'token') {
      //       dispatch(LogoutAction());
      //     }
      //   }
      // }, error => {
      // })    
    }


  };  

  useEffect(() => {
    GetObjectCategoriesService().then((res) => {
      if(res.hasOwnProperty('success') && res.success === true) {
        setItemCategories(res.categories);
      } else if(res.hasOwnProperty('success') && res.success === false) {
        if(res.error === 'token') {
          dispatch(LogoutAction());
        }
      }
    }, error => {
    })    
  }, []);

  useEffect(() => {
    GetObjectRaritiesService().then((res) => {
      if(res.hasOwnProperty('success') && res.success === true) {
        setItemRarities(res.rarities);
      } else if(res.hasOwnProperty('success') && res.success === false) {
        if(res.error === 'token') {
          dispatch(LogoutAction());
        }
      }
    }, error => {
    })    
  }, []);

  return (    
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose" text>
            <CardText color="rose">
              <h4 className={classes.cardTitle}>UMBL TOKEN MINTING</h4>
            </CardText>
          </CardHeader>
          <CardBody>
            <form>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Category
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <FormControl fullWidth className={classes.selectFormControl}>
                    {/* <InputLabel
                      htmlFor="simple-select"
                      className={classes.selectLabel}
                    >
                      Choose Category
                    </InputLabel> */}
                    <Select
                      MenuProps={{
                        className: classes.selectMenu
                      }}
                      classes={{
                        select: classes.select
                      }}
                      value={tokenCategory}
                      onChange={handleCategory}
                      inputProps={{
                        name: "tokenCategory",
                        id: "object-select"
                      }}
                    >
                      <MenuItem
                        disabled
                        classes={{
                          root: classes.selectMenuItem
                        }}
                      >
                        Choose Category
                      </MenuItem>
                      {itemCategories.map((data) => {
                        return (
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value={data.id}
                            key={data.id}
                          >
                            {data.name}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Rarity
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <FormControl fullWidth className={classes.selectFormControl}>
                    {/* <InputLabel
                      htmlFor="simple-select"
                      className={classes.selectLabel}
                    >
                      Choose Rarity
                    </InputLabel> */}
                    <Select
                      MenuProps={{
                        className: classes.selectMenu
                      }}
                      classes={{
                        select: classes.select
                      }}
                      value={tokenRarity}
                      onChange={handleRarity}
                      inputProps={{
                        name: "tokenRarity",
                        id: "object-rarity"
                      }}
                    >
                      <MenuItem
                        disabled
                        classes={{
                          root: classes.selectMenuItem
                        }}
                      >
                        Choose Category
                      </MenuItem>
                      {itemRarities.map((data) => {
                        return (
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value={data.id}
                            key={data.id}
                          >
                            {data.name}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Thumbnail
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10} className={classes.imageUpload}>
                  {/* <legend>Regular Image</legend> */}
                  <ImageUpload
                    onChange={handletokenThumbnail}
                    addButtonProps={{
                      color: "rose",
                      round: true
                    }}
                    changeButtonProps={{
                      color: "rose",
                      round: true
                    }}
                    removeButtonProps={{
                      color: "danger",
                      round: true
                    }}
                  />
                </GridItem>
              </GridContainer>                          
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Name
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <CustomInput
                    success={tokenNameState === "success"}
                    error={tokenNameState === "error"}
                    id="token_name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event => {
                        if (verifyLength(event.target.value, 0)) {
                          setTokenNameState("success");
                        } else {
                          setTokenNameState("error");
                        }
                        setTokenName(event.target.value);
                      },
                      type: "text",
                      endAdornment:
                        tokenNameState === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.validationError} />
                          </InputAdornment>
                        ) : (
                          undefined
                        )
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={3}>                  
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Description
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <CustomInput
                    success={tokenDescriptionState === "success"}
                    error={tokenDescriptionState === "error"}
                    id="token_description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event => {
                        if (verifyLength(event.target.value, 0)) {
                          setTokenDescriptionState("success");
                        } else {
                          setTokenDescriptionState("error");
                        }
                        setTokenDescription(event.target.value);
                      },
                      type: "text",
                      endAdornment:
                        tokenDescriptionState === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.validationError} />
                          </InputAdornment>
                        ) : (
                          undefined
                        )
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={3}>                  
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Count
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <CustomInput
                    success={tokenCountState === "success"}
                    error={tokenCountState === "error"}
                    id="number"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event => {
                        if (verifyNumber(event.target.value)) {
                          setTokenCountState("success");
                        } else {
                          setTokenCountState("error");
                        }
                        setTokenCount(event.target.value);
                      },
                      type: "number",
                      endAdornment:
                        tokenCountState === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.validationError} />
                          </InputAdornment>
                        ) : (
                          undefined
                        )
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={3}>                  
                </GridItem>
              </GridContainer>
            </form>
          </CardBody>
          <CardFooter className={classes.justifyContentCenter}>
            {alert}
            <Button color="rose" onClick={handleMint}>
              Mint
            </Button>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>  
  );
}

export default withStyles(style)(MintNFTPage) ;