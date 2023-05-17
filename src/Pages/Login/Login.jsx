import { useContext } from "react";
import img from "../../assets/images/login/login.svg";
import { AuthContext } from "../../Provider/Context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const Login = () => {
  const { userSignIn } = useContext(AuthContext);

  const location = useLocation()
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/'

  const handleSignIn = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    userSignIn(email , password)
    .then(result => {
        const user = result.user;
        Swal.fire(
          'Successfully Logged In',
          'Please exlpore the world of Car Doctor',
          'success'
        )
        navigate(from , { replace : true })
        const loggedUser = {
          email : user.email
        }

        fetch('http://localhost:5000/jwt' , {
          method : 'POST',
          headers : {
            'content-type'  : 'application/json'
          },
          body : JSON.stringify(loggedUser)
        })
        .then(res => res.json())
        .then(data => {
          console.log('jwt response' , data)
          localStorage.setItem('car-access-token' , data.token)
        })
    })
    .catch(error => alert(error.message))

    form.reset();
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left w-1/2">
          <img src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className="text-4xl font-bold text-center">Login</h2>
            <form onSubmit={handleSignIn}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  value="Login"
                  type="submit"
                />
              </div>
              <div className="pt-2">
                <label>
                  New to Cars Doctor?<Link to="/signup" className="ml-2">Sign Up</Link>
                </label>
              </div>
            </form>
            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
