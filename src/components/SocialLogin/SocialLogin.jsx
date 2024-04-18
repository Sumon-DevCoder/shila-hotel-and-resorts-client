import { FaFacebookSquare, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useAuthContext from "../../hooks/useAuthContext";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
  const { loginInWithGoogle } = useAuthContext();
  //   const navigate = useNavigate();
  //   const location = useLocation();
  //   const axiosPublic = useAxiosPublic();

  //   const from = location?.state?.from?.pathname || "/";

  const handleGoogle = () => {
    loginInWithGoogle()
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex ">
      <div>
        <button
          onClick={handleGoogle}
          className="bg-cyan-700 rounded-lg text-white text-xs text-center self-center px-3 py-2 my-2 mx-2 flex items-center  gap-1"
        >
          <FcGoogle className="text-sm" />
          Google
        </button>
      </div>
      <div>
        <button className="bg-black rounded-lg text-white text-xs text-center self-center px-3 py-2 my-2 mx-2 flex items-center  gap-1">
          <FaGithub /> Github
        </button>
      </div>
      <div>
        <button className="bg-green-700 rounded-lg text-white text-xs text-center self-center px-3 py-2 my-2 mx-2 flex items-center  gap-1">
          <FaFacebookSquare /> Facebook
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
