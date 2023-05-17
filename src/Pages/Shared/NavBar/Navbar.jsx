import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg'
import { useContext } from 'react';
import { AuthContext } from '../../../Provider/Context/AuthProvider';
import Swal from 'sweetalert2'

const Navbar = () => {

  const { user , logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
    .then(() => {})
    .then(error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.message}`
      })
    })
  }

  const navBarItems = <>
        <li><Link to='/' className='mr-4 pb-1'>Home</Link></li>
       <li><Link to='/about' className='mr-4 pb-1'>About</Link></li>
        {
          user?.email ? <>
            <li><Link to='/bookings' className='mr-4 pb-1'>My Bookings</Link></li>
            <li><button onClick={handleLogOut} className='btn btn-danger'>Logout</button></li>
          </> : <li><Link to='/login'>Login</Link></li>
        }
  </>

  return (
    <div className="navbar bg-base-100 h-28 mb-4">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navBarItems}
          </ul>
        </div>
        <Link to='/' className="normal-case text-xl">
            <img src={logo} alt="logo"/>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navBarItems}
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-xs btn-outline btn-error sm:btn-sm md:btn-md lg:btn-md">Appoinment</button>
      </div>
    </div>
  );
};

export default Navbar;
