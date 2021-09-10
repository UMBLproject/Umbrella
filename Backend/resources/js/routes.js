import Buttons from "@/views/Components/Buttons.js";
import Calendar from "@/views/Calendar/Calendar.js";
import Charts from "@/views/Charts/Charts.js";
import Dashboard from "@/views/Dashboard/Dashboard.js";
import ErrorPage from "@/views/Pages/ErrorPage.js";
import ExtendedForms from "@/views/Forms/ExtendedForms.js";
import ExtendedTables from "@/views/Tables/ExtendedTables.js";
import FullScreenMap from "@/views/Maps/FullScreenMap.js";
import GoogleMaps from "@/views/Maps/GoogleMaps.js";
import GridSystem from "@/views/Components/GridSystem.js";
import Icons from "@/views/Components/Icons.js";
import LockScreenPage from "@/views/Pages/LockScreenPage.js";
import LoginPage from "@/views/Pages/LoginPage.js";
import Notifications from "@/views/Components/Notifications.js";
import Panels from "@/views/Components/Panels.js";
import PricingPage from "@/views/Pages/PricingPage.js";
import RTLSupport from "@/views/Pages/RTLSupport.js";
import ReactTables from "@/views/Tables/ReactTables.js";
import RegisterPage from "@/views/Pages/RegisterPage.js";
import RegularForms from "@/views/Forms/RegularForms.js";
import RegularTables from "@/views/Tables/RegularTables.js";
import SweetAlert from "@/views/Components/SweetAlert.js";
import TimelinePage from "@/views/Pages/Timeline.js";
import Typography from "@/views/Components/Typography.js";
import UserProfile from "@/views/Pages/UserProfile.js";
import ValidationForms from "@/views/Forms/ValidationForms.js";
import VectorMap from "@/views/Maps/VectorMap.js";
import Widgets from "@/views/Widgets/Widgets.js";
import Wizard from "@/views/Forms/Wizard.js";
import HomePage from "@/views/Pages/HomePage.js";
import UserListPage from "@/views/Users/UserList.js";
import MintNFTPage from "@/views/Tokens/MintNFTPage.js";
import AssignNFTPage from "@/views/Tokens/AssignNFTPage.js";
import ToggleMarketPage from "@/views/Market/ToggleMarketPage.js";

// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRange from "@material-ui/icons/DateRange";
import GridOn from "@material-ui/icons/GridOn";
import Image from "@material-ui/icons/Image";
import Place from "@material-ui/icons/Place";
import Timeline from "@material-ui/icons/Timeline";
import WidgetsIcon from "@material-ui/icons/Widgets";
import PeopleAltSharpIcon from '@material-ui/icons/PeopleAltSharp';
import PaymentIcon from '@material-ui/icons/Payment'; 
import ReceiptIcon from '@material-ui/icons/Receipt';

var dashRoutes = [  
  {
    path: "/",
    name: "Home Page",
    component: HomePage,
    layout: "/user"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin"
  },
  {
    collapse: true,
    name: "Users",
    icon: PeopleAltSharpIcon,
    state: "usersCollapse",
    views: [
      {
        path: "/user-list",
        name: "Users List",
        rtlName: "عالتسعير",
        mini: "L",
        rtlMini: "ع",
        component: UserListPage,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Tokens",
    icon: PaymentIcon,
    state: "tokenCollapse",
    views: [
      {
        path: "/mint",
        name: "Mint",
        rtlName: "عالتسعير",
        mini: "M",
        rtlMini: "ع",
        component: MintNFTPage,
        layout: "/admin"
      },
      {
        path: "/assign",
        name: "Assign",
        rtlName: "عالتسعير",
        mini: "A",
        rtlMini: "ع",
        component: AssignNFTPage,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Market",
    icon: ReceiptIcon,
    state: "marketCollapse",
    views: [
      {
        path: "/market",
        name: "Toggle",
        rtlName: "عالتسعير",
        mini: "M",
        rtlMini: "ع",
        component: ToggleMarketPage,
        layout: "/admin"
      }
    ]
  }  
];
export default dashRoutes;
