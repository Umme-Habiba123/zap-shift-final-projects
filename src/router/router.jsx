import {
  createBrowserRouter,
 
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register";
import Coverage from "../pages/coverage/Coverage";
import PrivateRoute from "../routes/PrivateRoute";
import SendParcel from "../pages/sendParcel/SendParcel";
import DashBoardLayout from "../layouts/DashBoardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory/PaymentHistory";
import TrackParcel from "../pages/Dashboard/Payment/TrackParcel/TrackParcel";
import BeARider from "../pages/Dashboard/BeARider/BeARider";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PendingRiders from "../pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../pages/Dashboard/ActiveRiders/ActiveRiders";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component:Home
      },
      {
        path: 'coverage',
        Component : Coverage,
        loader :()=>fetch('/serviceCenter.json') 
      },
      {
        path:'sendParcel',
        loader :()=>fetch('/serviceCenter.json').then(res => res.json()) ,
        element:<PrivateRoute>
          <SendParcel></SendParcel>
        </PrivateRoute>
      },
      {
        path:'beARider',
        element:<PrivateRoute>
          <BeARider></BeARider>
        </PrivateRoute>
      }
      
    ]
  },
  {
    path:'/',
    Component: AuthLayout,
    children:[
      {
        path: 'login',
        Component: Login
      },
      {
        path:'register',
        Component: Register
      }
    ]
  },
  {
    path:'dashboard',
    element:<PrivateRoute>
      <DashBoardLayout></DashBoardLayout>
    </PrivateRoute>,
    children:[
      {
        path:'myParcels',
       element:<MyParcels></MyParcels>
      },
      {
        path:'payment/:parcelId',
        Component: Payment
      },
      {
        path:'paymentHistory',
        Component:PaymentHistory
      },
      {
        path:'trackParcel',
        Component:TrackParcel
      },
      {
        path:'pendingRiders',
        Component:PendingRiders
      },
      {
        path:'pendingRiders',
        Component:PendingRiders
      },
      {
        path:'activeRiders',
        Component:ActiveRiders
      },
     
    ]
  }
]);

export default router;