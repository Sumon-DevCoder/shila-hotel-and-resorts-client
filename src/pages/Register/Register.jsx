import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import useAuthContext from "../../hooks/useAuthContext";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const image_hoting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hoting_api = `https://api.imgbb.com/1/upload?key=${image_hoting_key}`;

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const [showPass, setShowPass] = useState(false);
  const { signUp, updateUserProfile } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    // setup apis imgbb
    const imageFile = { image: data.image[0] };

    const res = await axiosPublic.post(image_hoting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const name = data.name;
      const email = data.email;
      const password = data.password;
      const image = res.data.data.display_url;

      // signUp setup
      signUp(email, password).then((result) => {
        console.log(result.user);

        // update Profile
        updateUserProfile(name, image).then(() =>
          console.log("Profile Update Successful")
        );

        // setup user entry data
        const userData = {
          name,
          email,
          password,
          image,
        };

        axiosPublic.post("/users", userData).then((res) => {
          if (res.data.insertedId) {
            // reset
            reset();

            // success alert
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Registration Successful",
              showConfirmButton: false,
              timer: 1500,
            });

            // navigate
            navigate(from, { replace: true });
          }
        });
      });
    }
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
                  Sign Up
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
                    {...register("name", { required: true })}
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <span className="text-red-500 font-semibold">
                      Please input your name
                    </span>
                  )}
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
                  <input
                    {...register("image", { required: true })}
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="file"
                    placeholder=""
                  />
                  {errors.image && (
                    <span className="text-red-500 font-semibold">
                      Please submit your image
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
                  {errors.password?.type === "minLength" && (
                    <span className="text-red-500 font-semibold">
                      Password Must have 6 characters
                    </span>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <span className="text-red-500 font-semibold">
                      Password Must have less than 20 characters
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="text-red-500 font-semibold">
                      Password Must have one uppercase, lowercase,special
                      character, and number
                    </span>
                  )}
                  {errors.password && (
                    <span className="text-red-500 font-semibold">
                      Please input password
                    </span>
                  )}{" "}
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
                    <span className="ml-3">Sign Up</span>
                  </button>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Already have an account?{" "}
                    <Link to={"/login"}>
                      <span className="text-blue-900 font-semibold">
                        Sign in
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

export default Register;
