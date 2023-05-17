import { useContext } from "react";
import { AuthContext } from "../../../Provider/Context/AuthProvider";

const SocialLogin = () => {
  
  const { googleSignIn } = useContext(AuthContext);

  const handleGoogleSingIn = () => {
    googleSignIn()
    .then(result => {
        console.log(result.user)
    })
    .catch(error => console.log(error.message))
  }

  return (
    <div>
      <div className="divider">OR</div>
      <div onClick={handleGoogleSingIn} className="text-center">
        <button className="btn btn-circle btn-outline">G</button>
      </div>
    </div>
  );
};

export default SocialLogin;
