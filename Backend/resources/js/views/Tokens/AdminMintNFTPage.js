/*eslint-disable*/
import React, { useEffect, } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'; 

import { useUmblContract } from "@/hooks";

// SweetAlert
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormLabel from "@material-ui/core/FormLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

// material ui icons
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

// service and actions
import { GetObjectCategoriesService, GetObjectRaritiesService, PostMintTokensService, } from '@/services/UserServices';
import { LogoutAction } from '@/redux/actions/AuthActions';

// mix styles
const style = {
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
  ...sweetAlertStyle,
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,
  ...validationFormsStyle,
  ...extendedFormStyle  
};


function MintNFTPage(props) {
  const { classes } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const { status, account, } = useSelector((state) => state.userWallet);
  const umblNFTContract = useUmblContract();
  
  // state variables
  const [accountError, setAccountError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [totalSupply, setTotalSupply] = React.useState(null);
  const [itemCategories, setItemCategories] = React.useState([]);
  const [itemRarities, setItemRarities] = React.useState([]);
  const [badgeRarities, setBadgeRarities] = React.useState([]);
  const [tokenFaction, setTokenFaction] = React.useState('');
  const [tokenCategory, setTokenCategory] = React.useState('');
  const [tokenRarity, setTokenRarity] = React.useState('');
  const [tokenThumbnail, setTokenThumbnail] = React.useState(null);
  const [tokenName, setTokenName] = React.useState("");
  const [tokenNameState, setTokenNameState] = React.useState("");
  const [tokenDescription, setTokenDescription] = React.useState("");
  const [tokenDescriptionState, setTokenDescriptionState] = React.useState("");
  const [tokenCount, setTokenCount] = React.useState(null);
  const [tokenCountState, setTokenCountState] = React.useState("");
  const [tokenPrice, setTokenPrice] = React.useState(0.000);
  const [tokenModel, setTokenModel] = React.useState('');
  const [alert, setAlert] = React.useState(null);


  const handleCategory = event => {    
    const categoryId = parseInt(event.target.value);
    setTokenCategory(categoryId);
    setTokenFaction(itemCategories[categoryId - 1].faction.id);
  };
  const handleRarity = event => {
    setTokenRarity(parseInt(event.target.value));
  };
  const handletokenThumbnail = file => {
    setTokenThumbnail(file);
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

  const showSuccessMsg = (message) => {
    setAlert(<SweetAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Success"
        onConfirm={() => hideAlertRefresh()}
        onCancel={() => hideAlertRefresh()}
        confirmBtnCssClass={classes.button + " " + classes.success}
      >
        <p>{message}</p>
    </SweetAlert>);
  };

  const showErrorMsg = (message) => {
    setAlert(
      <SweetAlert
        closeOnClickOutside={false}
        html={true}
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

  const showMultiErrorMsg = (messages) => {
    setAlert(
      <SweetAlert
        closeOnClickOutside={false}
        html={true}
        style={{ display: "block", marginTop: "-100px" }}
        title="Error!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.info}
      >
        {messages.map((data, key) => {
          return (
            <p key={key}>{data}</p>
          )
        })}
      </SweetAlert>
    );
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const hideAlertRefresh = () => {
    setAlert(null);
    window.location.reload();
  };

  const handleMint = async () => {
    var validation = true;
    var errMsg = [];

    typeClick();

    if(tokenCategory === '') {
      validation = false;
      errMsg.push("Token category cannot be empty.");
    } 
    
    if(tokenRarity === '') {
      validation = false;
      errMsg.push("Token rarity cannot be empty.");
    } 
    
    if(tokenThumbnail === null) {
      validation = false;
      errMsg.push("Token thumbnail cannot be empty.");
    } 
    
    if(tokenNameState === "error") {
      validation = false;
      errMsg.push("Token name cannot be empty.");
    } 
    
    if(tokenDescriptionState === "error") {      
      validation = false;
      errMsg.push("Token description cannot be empty.");
    }

    if(tokenCount === null) {      
      validation = false;
      errMsg.push("Token count cannot be empty.");
    }

    if(tokenPrice === 0) {      
      validation = false;
      errMsg.push("Token price cannot be zero.");
    }

    if(!validation) {
      showMultiErrorMsg(errMsg);
      return;
    }

    if (!umblNFTContract || !status) {
      errMsg = "Non-Ethereum browser detected. You should consider trying MetaMask!";
      showErrorMsg(errMsg);
      return;
    }    

    setLoading(true);

    const previousTokenCount = totalSupply;

    const price = window.web3.utils.toWei(tokenPrice.toString(), "Ether");
    const transaction = await umblNFTContract.methods
      .mintToken(tokenCount, parseInt(tokenFaction), parseInt(tokenCategory), parseInt(tokenRarity), price)
      .send({ from: account }, (error, transactionHash) => {
        if(transactionHash === undefined) {
          setLoading(false);
          return;
        }
      });
    const nextTokenCount = await umblNFTContract.methods
      .totalSupply()
      .call({ from: account });

    if((parseInt(nextTokenCount) - parseInt(previousTokenCount)) === parseInt(tokenCount)) { // success
      // make attributes
      let attributes = [];
      for(var i=0; i<10; i++) {
        var keyId = 'attribute_key_' + (i+1);
        var valueId = 'attribute_value_' + (i+1);

        if(document.getElementById(keyId).value !== '' && document.getElementById(valueId).value !== '') {
          attributes.push({
            trait_type: document.getElementById(keyId).value,
            value: document.getElementById(valueId).value,
          });
        }
      }      

      let formData = new FormData();
      formData.append('category', tokenCategory);
      formData.append('rarity', tokenRarity);
      formData.append('thumbnail', tokenThumbnail);
      formData.append('name', tokenName);
      formData.append('description', tokenDescription);
      formData.append('count', tokenCount);
      formData.append('total', totalSupply);
      formData.append('attributes', JSON.stringify(attributes));
      formData.append('model', tokenModel);

      PostMintTokensService(formData).then((res) => {
        if(res.hasOwnProperty('success') && res.success === true) {
          setLoading(false);              
          const msg = tokenCount.toString() + ' tokens was minted!';
          showSuccessMsg(msg);
        } else {
          setLoading(false);
          showErrorMsg(res);
          if(res.error === 'token') {
            dispatch(LogoutAction(history));
          }
        }
      }).catch(error => {
        console.log(error);
        showErrorMsg(error);
        setLoading(false);
      });        
      
    } else {
      setLoading(false);
      showErrorMsg("Unknown error!");
      return;
    }
  };  

  useEffect(() => {
    const loadTotalSupply = async () => {
      if (!umblNFTContract || !status) {
        setAccountError(true);
        return;
      }     

      const totalSupplyValue = await umblNFTContract.methods
        .totalSupply()
        .call({ from: account });

      setTotalSupply(totalSupplyValue);
    };

    loadTotalSupply();
  }, [umblNFTContract, status]);

  useEffect(() => {
    GetObjectCategoriesService().then((res) => {
      if(res.hasOwnProperty('success') && res.success === true) {
        setItemCategories(res.categories);
      } else if(res.hasOwnProperty('success') && res.success === false) {
        if(res.error === 'token') {
          dispatch(LogoutAction(history));
        }
      }
    }, error => {
    })    
  }, []);

  useEffect(() => {
    GetObjectRaritiesService().then((res) => {
      if(res.hasOwnProperty('success') && res.success === true) {
        let tempItemRarities = res.rarities.filter((data) => {
          return data.id < 8;
        })
        setItemRarities(tempItemRarities);
        let tempBadgeRarities = res.rarities.filter((data) => {
          return data.id >= 8;
        })
        setBadgeRarities(tempBadgeRarities);
      } else if(res.hasOwnProperty('success') && res.success === false) {
        if(res.error === 'token') {
          dispatch(LogoutAction(history));
        }
      }
    }, error => {
    })    
  }, []);

  useEffect(() => {
    const checkAccunt = async () => {
      if (!umblNFTContract) {
        setAccountError(true);
        return;
      }  
      const ownerAccount = await umblNFTContract.methods
        .owner()
        .call({ from: account });

      if(ownerAccount.toLowerCase() !== account) {
        setAccountError(true);
        showErrorMsg("Please connect with owner account");
      } else {
        setAccountError(false);
      }
    }
    checkAccunt();
  }, [account]);

  return (    
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>        
        <Card>
          <CardHeader color="info" text>
            <CardText color="info">
              <h4 className={classes.cardTitle + ' ' + classes.cardTitleWhite}>UMBL TOKEN MINTING</h4>
            </CardText>
          </CardHeader>
          <CardBody>
          {!accountError ? (
            <form>                       
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Category
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <FormControl fullWidth className={classes.selectFormControl}>
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
                      { itemCategories.map((data, key) => {
                        return (
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value={data.id}
                            key={key}
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
                        Choose Rarity
                      </MenuItem>
                      { tokenCategory !== 7 ? itemRarities.map((data, key) => {
                        return (
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value={data.id}
                            key={key}
                          >
                            {data.name}
                          </MenuItem>
                        )
                      }) : badgeRarities.map((data, key) => {
                        return (
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value={data.id}
                            key={key}
                          >
                            {data.name}
                          </MenuItem>
                        )
                      }) }
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
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Attributes
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>                
                </GridItem>
              </GridContainer>
              {[...Array(10)].map((x, i) => (              
              <GridContainer key={i}>
                <GridItem xs={12} sm={2}>
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <CustomInput
                    labelText={"key_" + (i + 1)}
                    id={"attribute_key_" + (i + 1)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={3}> 
                  <CustomInput
                    labelText={"value_" + (i + 1)}
                    id={"attribute_value_" + (i + 1)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />                 
                </GridItem>
                <GridItem xs={12} sm={4}>
                </GridItem>
              </GridContainer>
              ))}
              <GridContainer  className={classes.p20}>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Price
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <FormControl fullWidth className={classes.customInputFormControl}>
                    <CustomInput
                      id="token_price"
                      formControlProps={{
                        fullWidth: true
                      }}
                      value={tokenPrice}
                      inputProps={{
                        onChange: event => {
                          setTokenPrice(parseFloat(event.target.value).toFixed(3));
                        },
                        type: "number",
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={3}></GridItem>
              </GridContainer> 
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Model
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <CustomInput
                    id="token_model"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event => {
                        if (verifyLength(event.target.value, 0)) {
                          setTokenModel(event.target.value);
                        }
                      },
                      type: "text",
                      endAdornment: (undefined)
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={3}>                  
                </GridItem>
              </GridContainer> 
            </form>
          ) : (<h4 style={{margin: "30px"}}>Please connect with owner account, and refresh this page again</h4>)}
          </CardBody>
          <CardFooter className={classes.justifyContentCenter}>            
            {!accountError ? (
            <Button color="info" onClick={handleMint} style={{ margin: "30px 0 50px 0"}}>
              Mint
            </Button>
            ) : null}
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

export default withStyles(style)(MintNFTPage);