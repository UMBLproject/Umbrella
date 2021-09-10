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

import { GetCratesService, } from '@/services/UserServices';
import { LogoutAction } from '@/redux/actions/AuthActions';
import { Grid } from "@material-ui/core";

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

  // state variables
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState(null);
  const [cratesData, setCratesData] = React.useState([]);

  // sweet alert functions
  const hideAlert = (refresh=false) => {
    setAlert(null);
    if(refresh) window.location.reload();
  };

  const showSuccessMsg = (message) => {
    setAlert(<SweetAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Success"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
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

  const combineRarity = (rarities) => {
    const temp = rarities.map((prop, key) => {
      return prop.name;
    });
    return temp.join(', ');
  };

  const handleEdit = (id) => {
    console.log('handleEdit ' + id);
  };

  const handleRemove = (id) => {
    console.log('handleRemove ' + id);
  };

  const handleAddNew = () => {
    console.log('handleAddNew');
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
        console.log(cratesDataValue);
        setCratesData(cratesDataValue);
      }
    });  
  }, []);

  return (    
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>        
        <Card>
          <CardHeader color="rose" text>
            <CardText color="rose">
              <h4 className={classes.cardTitle + ' ' + classes.cardTitleWhite}>CRATES</h4>
            </CardText>
          </CardHeader>
          <CardBody>
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