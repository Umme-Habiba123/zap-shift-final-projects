import React from 'react';
import { NavLink, Outlet } from 'react-router';
import ProFastLogo from '../pages/shared/ProfastLogo/ProFastLogo';
import { FaHome, FaBoxOpen, FaHistory, FaMapMarkerAlt, FaUserEdit, FaClock, FaCheckCircle, FaWallet } from 'react-icons/fa';
import { FaMotorcycle, FaUserClock, FaUserPlus } from 'react-icons/fa';
import { RiAdminFill } from "react-icons/ri";
import useUserRole from '../hooks/UseUserRole';

const DashBoardLayout = () => {

  const { role } = useUserRole()
  console.log('role', role)


  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none ">
            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
          <div className="hidden flex-none lg:hidden">
          </div>
        </div>
        {/* Page content here */}

        <Outlet>

        </Outlet>

      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2">
          <ProFastLogo />

          <li>
            <NavLink to={'/'}>
              <FaHome className="inline mr-2" /> Home
            </NavLink>
          </li>

          <li>
            <NavLink to={'/dashboard/myParcels'}>
              <FaBoxOpen className="inline mr-2" /> My Parcels
            </NavLink>
          </li>

          <li>
            <NavLink to={'/dashboard/paymentHistory'}>
              <FaHistory className="inline mr-2" /> Payment History
            </NavLink>
          </li>

          <li>
            <NavLink to={'/dashboard/trackParcel'}>
              <FaMapMarkerAlt className="inline mr-2" /> Track a Package
            </NavLink>
          </li>

          <li>
            <NavLink to={'/dashboard/profile'}>
              <FaUserEdit className="inline mr-2" /> Update Profile
            </NavLink>
          </li>

          <li>
            <NavLink to={'/dashboard/assignRider'}>
              <FaUserPlus className="inline mr-2" /> Assign Rider
            </NavLink>


          </li>
          {/* rider linkss---- */}
          <li>
            <NavLink to={'/dashboard/pendingDeliveries'}>
              <FaClock className="inline mr-2" /> Pending Deliveries
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/completedDeliveries">
              <FaCheckCircle className="inline mr-2" /> Completed Deliveries
            </NavLink>
          </li>

          <li>
            <NavLink to={'/dashboard/myEarnings'}>
              <FaWallet className="inline mr-2" /> My Earnings
            </NavLink>
          </li>






          {/* admin linkss------------ */}
          {/* {
            !isLoading && role === 'admin' && */}
          <>
            <li>
              <NavLink to={'/dashboard/activeRiders'}>
                <FaMotorcycle className="inline mr-2" /> Active Riders
              </NavLink>
            </li>

            <li>
              <NavLink to={'/dashboard/pendingRiders'}>
                <FaUserClock className="inline mr-2" /> Pending Riders
              </NavLink>
            </li>

            <li>
              <NavLink to={'/dashboard/makeAdmin'}>
                <RiAdminFill className="inline mr-2" />Make Admin
              </NavLink>
            </li>

          </>
          {/* } */}

        </ul>




      </div>


    </div>
  );
};

export default DashBoardLayout;