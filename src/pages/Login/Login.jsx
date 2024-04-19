import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "./../../components/SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import Swal from "sweetalert2";
import { MdRemoveRedEye } from "react-icons/md";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    // input field
    const email = data.email;
    const password = data.password;

    // Login setup
    login(email, password)
      .then((result) => {
        console.log(result.user);

        // reset
        reset();

        // success alert
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        // navigate
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
        console.log(error.message);
      });
  };
  return (
    <div>
      <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
        <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 bg-blue-900 text-center hidden md:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
              }}
            ></div>
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className=" flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                  Sign In
                </h1>
                <p className="text-md  text-gray-500 font-medium pt-2">
                  Welcome to Shila Hotels and Resorts
                </p>
              </div>
              <div>
                <SocialLogin />
              </div>
              <div className="w-full flex-1 mt-2">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mx-auto max-w-xs flex flex-col gap-4"
                >
                  <input
                    {...register("email", { required: true })}
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <span className="text-red-500 font-semibold">
                      Please input your email
                    </span>
                  )}
                  <div className="flex relative">
                    <input
                      {...register("password", {
                        required: true,
                        maxLength: 20,
                        minLength: 6,
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
                      })}
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type={showPass ? "text" : "password"}
                      placeholder="Password"
                    />
                    <MdRemoveRedEye
                      className="absolute bottom-4 right-4"
                      onClick={() => setShowPass(!showPass)}
                    />
                  </div>
                  {/* {errors.password && (
                    <span className="text-red-500 font-semibold">
                      Please input password
                    </span>
                  )}{" "} */}
                  {error && <p className="text-red-500 font-bold">{error}</p>}
                  <button className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">Sign In</span>
                  </button>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    dont`t have an account?{" "}
                    <Link to={"/register"}>
                      <span className="text-blue-900 font-semibold">
                        Sign Up
                      </span>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
