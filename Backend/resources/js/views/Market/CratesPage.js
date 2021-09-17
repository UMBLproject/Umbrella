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
import Assignment from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

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
import extendedTablesStyle from "@/assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

import sweetAlertStyle from "@/assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

import { GetCratesService, GetRaritiesService, AddNewCrateService, GetCrateService, UpdateCrateService, DeleteCrateService, } from '@/services/UserServices';
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
    justifyContent: "normal",
    paddingTop: "36px !important",
    paddingLeft: "50px !important",
  },
  bigTitle: {
    fontSize: "1.25rem !important",
    color: "#000 !important"
  },
  addNewItem: {
    textAlign: "right",
    margin: "20px",
  },
  gridItemCenter: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center"
  },
  customInputFormControl: {
    maxWidth: "600px"
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,
  ...validationFormsStyle,
  ...extendedFormStyle,
  ...sweetAlertStyle,
  ...extendedTablesStyle
};

function CratesPage(props) {
  const { classes } = props;
  const dispatch = useDispatch();

  const { status, account, } = useSelector(
    (state) => state.userWallet
  );

  const umblNFTContract = useUmblContract();

  // state variables
  const [loading, setLoading] = React.useState(false);
  const [accountError, setAccountError] = React.useState(false);
  const [alert, setAlert] = React.useState(null);
  const [cratesData, setCratesData] = React.useState([]);
  const [pageStatus, setPageStatus] = React.useState(0);
  const [crateName, setCrateName] = React.useState("");
  const [crateNameState, setCrateNameState] = React.useState("");
  const [crateFaction, setCrateFaction] = React.useState("");
  const [crateLevel, setCrateLevel] = React.useState("");
  const [crateQuantity, setCrateQuantity] = React.useState(1);
  const [cratePrice, setCratePrice] = React.useState(0.000);
  const [crateRarity, setCrateRarity] = React.useState([]);
  const [objectRarities, setObjectRarities] = React.useState([]);
  const [crateId, setCrateId] = React.useState(null);

  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };

  // sweet alert functions
  const hideAlert = (refresh=false) => {
    setAlert(null);
    if(refresh) window.location.reload();
  };

  const showSuccessMsg = (title='Success!', message='', refresh=false) => {
    setAlert(<SweetAlert
        success
        closeOnClickOutside={false}
        style={{ display: "block", marginTop: "-100px" }}
        title={title}
        onConfirm={() => hideAlert(refresh)}
        onCancel={() => hideAlert(refresh)}
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

  const combineRarity = (rarities) => {
    const temp = rarities.map((prop, key) => {
      return prop.name;
    });
    return temp.join(', ');
  };

  const extractRarity = (rarities) => {
    return rarities.map((prop, key) => {
      return prop.id;
    });
  };

  const handleEdit = (id) => {
    setCrateId(id);
    setPageStatus(2);
  };

  const successDelete = async (id) => {
    hideAlert();
    setLoading(true);

    if (!umblNFTContract || !status) {
      errMsg = "Non-Ethereum browser detected. You should consider trying MetaMask!";
      showErrorMsg(errMsg);
      return;
    }

    const transaction = await umblNFTContract.methods
        .deleteCrate(parseInt(id))
        .send({ from: account }, (error, transactionHash) => {
          if(transactionHash === undefined) {
            setLoading(false);
            return;
          }
        });   

    DeleteCrateService(id).then(res => {
      if(res.hasOwnProperty('success') && res.success === true) {
        setLoading(false);
        showSuccessMsg('Deleted!', 'The Crate has been deleted.', true);
      } else {
        setLoading(false);
      }
    }).catch(error => {
      setLoading(false);
      showErrorMsg(error);
    });    
  };

  const handleRemove = (id) => {
    setAlert(
      <SweetAlert
        warning
        closeOnClickOutside={false}
        style={{ display: "block", marginTop: "-100px" }}
        title="Are you sure?"
        onConfirm={() => successDelete(id)}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
        cancelBtnCssClass={classes.button + " " + classes.danger}
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        showCancel
      >
        You will not be able to recover this Crate!
      </SweetAlert>
    );
  };

  const handleAddNew = () => {
    setPageStatus(1);
  };

  const validateCrateForm = () => {
    if (crateNameState === "") {
      setCrateNameState("error");
    }
  };

  const cancelAdd = () => {
    setPageStatus(0);
  };

  const applyCrateInfo = async () => {
    var validation = true;
    var errMsg = [];

    validateCrateForm();

    if(crateNameState === "error") {
      validation = false;
      errMsg.push("Crate name cannot be empty.");
    }

    if(crateFaction === "") {
      validation = false;
      errMsg.push("Crate faction cannot be empty.");
    } 

    if(crateLevel === "") {
      validation = false;
      errMsg.push("Crate level cannot be empty.");
    } 

    if(crateRarity.length === 0) {
      validation = false;
      errMsg.push("Crate rarity cannot be empty.");
    }

    if(crateQuantity <= 0 ) {
      validation = false;
      errMsg.push("Crate quantity cannot be less than 1.");
    }

    if(cratePrice <= 0 ) {
      validation = false;
      errMsg.push("Crate price cannot be less than 0.");
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

    let postData = {
      'id': crateId,
      'name': crateName,
      'faction': crateFaction,
      'level': crateLevel,
      'rarity': crateRarity,
      'quantity': crateQuantity,
      'price': cratePrice,
    };

    setLoading(true);

    if(pageStatus === 1) {
      const previousValue = await umblNFTContract.methods
        .nextCrateId()
        .call({ from: account });

      const price = window.web3.utils.toWei(cratePrice.toString(), "Ether");

      const transaction = await umblNFTContract.methods
        .applyCrate(0, parseInt(crateQuantity), parseInt(crateFaction), parseInt(crateLevel), crateRarity, price)
        .send({ from: account }, (error, transactionHash) => {
          if(transactionHash === undefined) {
            setLoading(false);
            return;
          }
        });       
      
      console.log(transaction); 

      const nextValue = await umblNFTContract.methods
        .nextCrateId()
        .call({ from: account });

      if((parseInt(nextValue) - parseInt(previousValue)) === 1) {
        AddNewCrateService(postData).then(res => {
          if(res.hasOwnProperty('success') && res.success === true) {
            setLoading(false);
            showSuccessMsg('Success!', 'New Crate was successfully created!', true);
          } else {
            setLoading(false);
          }
        }).catch(error => {
          setLoading(false);
          showErrorMsg(error);
        });
      }
    } else if(pageStatus === 2) {
      const price = window.web3.utils.toWei(cratePrice.toString(), "Ether");

      const transaction = await umblNFTContract.methods
        .applyCrate(parseInt(crateId), parseInt(crateQuantity), parseInt(crateFaction), parseInt(crateLevel), crateRarity, price)
        .send({ from: account }, (error, transactionHash) => {
          if(transactionHash === undefined) {
            setLoading(false);
            return;
          }
        });   

      UpdateCrateService(crateId, postData).then(res => {
        if(res.hasOwnProperty('success') && res.success === true) {
          setLoading(false);
          showSuccessMsg('Success!', 'The Crate was successfully updated!', true);
        } else {
          setLoading(false);
        }
      }).catch(error => {
        setLoading(false);
        showErrorMsg(error);
      });
    }    
  };

  const updateCrateFaction = event => {
    setCrateFaction(event.target.value);
  };

  const updateCrateLevel = event => {
    setCrateLevel(event.target.value);
  };

  const updateCrateRarity = event => {
    setCrateRarity(event.target.value);
  };

  useEffect(() => {
    GetCratesService().then((res) => {
      if(res.hasOwnProperty('success') && res.success === true) {
        const cratesDataValue = res.crates.map((prop, key) => {
          return [
            prop.id,
            prop.name,
            prop.faction.name,
            prop.level,
            combineRarity(prop.rarities),
            prop.quantity,
            prop.price,
            <div>
              <Button color='success' simple className={classes.actionButton} onClick={() => handleEdit(prop.id)}><Edit className={classes.Edit} />
              </Button><Button color='danger' simple className={classes.actionButton} onClick={() => handleRemove(prop.id)}><Close className={classes.Close} /></Button>
            </div>
          ];
        });
        setCratesData(cratesDataValue);
      } else if(res.error === 'token') {
        dispatch(LogoutAction());
      }
    });  
  }, []);

  useEffect( async () => {
    const checkOwnerAccount = async () => {
      if (!umblNFTContract) {
        return;
      }  

      if (!status) {
        const errMsg = "Please connect with owner account";
        setAccountError(true);
        showErrorMsg(errMsg);
        return;
      }

      const ownerAccount = await umblNFTContract.methods
        .owner()
        .call({ from: account });

      if(ownerAccount.toLowerCase() !== account.toLowerCase()) {
        const errMsg = "Please connect with owner account";
        setAccountError(true);
        showErrorMsg(errMsg);
      } else {
        setAccountError(false);
      }
    }
    await checkOwnerAccount();
  }, [umblNFTContract, account, status]);

  useEffect(() => {
    GetRaritiesService().then((res) => {
      if(res.hasOwnProperty('success') && res.success === true) {
        let tempItemRarities = res.rarities.filter((data) => {
          return data.id < 8;
        })
        setObjectRarities(tempItemRarities);
      } else if(res.error === 'token') {
        dispatch(LogoutAction());
      }
    }); 

    if(pageStatus === 2 && crateId !== null) {
      GetCrateService(crateId).then((res) => {
        if(res.hasOwnProperty('success') && res.success === true) {
          let crateDataValue = res.crate;
          setCrateName(crateDataValue.name);
          setCrateFaction(crateDataValue.faction.id);
          setCrateLevel(crateDataValue.level);
          setCrateRarity(extractRarity(crateDataValue.rarities));
          setCrateQuantity(crateDataValue.quantity);
          setCratePrice(crateDataValue.price);
        } 
      }); 
    }
  }, [pageStatus]);

  return (    
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>        
        <Card>
          <CardHeader color="info" text>
            <CardText color="info">
              <h4 className={classes.cardTitle + ' ' + classes.cardTitleWhite}>CRATES</h4>
            </CardText>
          </CardHeader>
          <CardBody style={{padding: "30px"}}>
            { !accountError ? 
            pageStatus === 0 ? (
            <div>
              <GridContainer>
                <GridItem xs={12} sm={12} className={classes.addNewItem}>
                  <Button color="info" className={classes.clearButton} onClick={handleAddNew}>
                    Add New
                  </Button>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12}>
                  <Table
                    tableHead={[
                      "#",
                      "Name",
                      "Faction",
                      "Level",
                      "Rarity",
                      "Quantity",
                      "Price",
                      "Actions",
                    ]}
                    tableData={cratesData}
                    customCellClasses={[classes.center]}
                    customClassesForCells={[7]}
                    customHeadCellClasses={[
                      classes.center
                    ]}
                    customHeadClassesForCells={[7]}
                  />
                </GridItem>
              </GridContainer>
            </div>
            ) : (
              <form>                       
                <GridContainer>
                  <GridItem xs={12} sm={3} lg={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Name
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9} lg={6}>
                    <FormControl fullWidth className={classes.customInputFormControl}>
                      <CustomInput
                        success={crateNameState === "success"}
                        error={crateNameState === "error"}
                        id="crate_name"
                        value={crateName}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event => {
                            if (verifyLength(event.target.value, 0)) {
                              setCrateNameState("success");
                            } else {
                              setCrateNameState("error");
                            }
                            setCrateName(event.target.value);
                          },
                          type: "text",
                          endAdornment:
                            crateNameState === "error" ? (
                              <InputAdornment position="end">
                                <Close className={classes.validationError} />
                              </InputAdornment>
                            ) : (
                              undefined
                            )
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} lg={3} ></GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3} lg={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Faction
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9} lg={6}>
                    <FormControl fullWidth className={classes.selectFormControl}>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={crateFaction}
                        onChange={updateCrateFaction}
                        inputProps={{
                          name: "crateFaction",
                          id: "crate_faction"
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Choose Faction
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value='1'
                        >
                          Survivors
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value='2'
                        >
                          Scientists
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} lg={3}></GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3} lg={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Level
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9} lg={6}>
                    <FormControl fullWidth className={classes.selectFormControl}>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={crateLevel}
                        onChange={updateCrateLevel}
                        inputProps={{
                          name: "crateLevel",
                          id: "crate_level"
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Choose Level
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value='1'
                        >
                          Level 1
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value='2'
                        >
                          Level 2
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} lg={3}></GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3} lg={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Rarity
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9} lg={6}>
                    <FormControl fullWidth className={classes.selectFormControl}>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        multiple
                        value={crateRarity}
                        onChange={updateCrateRarity}
                        inputProps={{
                          name: "crateRarity",
                          id: "crate_rarity"
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Choose Rarities
                        </MenuItem>
                        {objectRarities ? objectRarities.map((prop, key) => {
                          return (
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value={prop.id}
                              key={prop.id}
                            >
                              {prop.name}
                            </MenuItem>
                          )
                        }) : null }
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} lg={3}></GridItem>
                </GridContainer>
                <GridContainer  className={classes.p20}>
                  <GridItem xs={12} sm={3} lg={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Quantity
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9} lg={6}>
                    <FormControl fullWidth className={classes.customInputFormControl}>
                      <CustomInput
                        id="crate_quantity"
                        value={crateQuantity}
                        formControlProps={{
                          fullWidth: true
                        }}
                        value={crateQuantity}
                        inputProps={{
                          onChange: event => {
                            setCrateQuantity(event.target.value);
                          },
                          type: "number",
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} lg={3}></GridItem>
                </GridContainer>
                <GridContainer  className={classes.p20}>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Price
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9} lg={6}>
                    <FormControl fullWidth className={classes.customInputFormControl}>
                      <CustomInput
                        id="crate_price"
                        formControlProps={{
                          fullWidth: true
                        }}
                        value={cratePrice}
                        inputProps={{
                          onChange: event => {
                            setCratePrice(parseFloat(event.target.value).toFixed(3));
                          },
                          type: "number",
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} lg={3}></GridItem>
                </GridContainer>                
                <GridContainer>
                  <GridItem xs={12} sm={12} lg={9} className={classes.gridItemCenter}>
                    <Button color="rose" onClick={cancelAdd} style={{ marginRight: '30px'}}>
                      Cancel
                    </Button>
                    <Button color="info" onClick={applyCrateInfo}>
                      Apply
                    </Button>
                  </GridItem>
                  <GridItem xs={12} sm={12} lg={3}></GridItem>
                </GridContainer>
              </form>
            ) : (
              <h4 style={{margin: "30px"}}>Please connect with owner account, and refresh this page again</h4>
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

export default withStyles(style)(CratesPage) ;