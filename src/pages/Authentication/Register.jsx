import React, {useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import registerImg from "../../assets/illustration.svg";
import { IoIosEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import useAuth from "../../hooks/useAuth";
import toast from 'react-hot-toast'
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPass, setConfirmShowPass] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure()
  const {
    signInWithGoogle,
    createUser,
    updateUserProfile,
    user,
    setUser,
    loading,
  } = useAuth();

  const from = location?.state || "/login"

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setConfirmShowPass(!confirmShowPass);
  };

  // Google SignIn
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const { data } = await axiosSecure.post(`/jwt`, {
        email: result?.user?.email,
      });
      const user = result?.user;
      if (user) {
       setUser(user);
     }
     toast.success("Account registered successfully");
     navigate(from, {replace: true});
    } catch (error) {
     console.log(error);
      toast.error('Something is wrong please try again')
    }
  };

  const handleRegister = async(e) => {
    e.preventDefault();
   const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const remember = form.remember.checked;
    const registerData = {name, email, photo, password, confirmPassword, remember };

    if (password !== confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
   }
   
   try {
    const result = await createUser(email, password)
    await updateUserProfile(name, photo);
     setUser({ ...result?.user, photoURL: photo, displayName: name });
     const { data } = await axiosSecure.post(`/jwt`, {
       email: result?.user?.email,
       withCredentials: true,
     });
     console.log(data);
    toast.success('Account registered successfully')
    navigate(from, {replace: true});
   } catch (error) {
    console.log(error);
    toast.error('Something is wrong please try again')
   }

  };

  if (user || loading) return;
  return (
    <section className="dark:bg-gray-900 my-20">
      <div className="flex flex-row-reverse items-center justify-center container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700 border">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Register your account
              </h1>
              <form
                onSubmit={handleRegister}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    autoComplete="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    autoComplete="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="photo"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Photo
                  </label>
                  <input
                    type="text"
                    autoComplete="photo"
                    name="photo"
                    id="photo"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Photo URL"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white relative"
                  >
                    Password
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      autoComplete="current-password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
                      required=""
                    />
                    <button
                      type="button"
                      onClick={handleShowPassword}
                      className="absolute top-1/2 right-3 text-gray-400 dark:text-gray-500"
                    >
                      {showPassword ? (
                        <IoIosEye className="text-2xl" />
                      ) : (
                        <IoMdEyeOff className="text-2xl" />
                      )}
                    </button>
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white relative"
                  >
                    Confirm Password
                    <input
                      autoComplete="current-password"
                      type={confirmShowPass ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
                      required=""
                    />
                    <button
                      type="button"
                      onClick={handleShowConfirmPassword}
                      className="absolute top-1/2 right-3 text-gray-400 dark:text-gray-500"
                    >
                      {confirmShowPass ? (
                        <IoIosEye className="text-2xl" />
                      ) : (
                        <IoMdEyeOff className="text-2xl" />
                      )}
                    </button>
                  </label>
                  {!passwordMatch && (
                    <p className="text-sm text-red-600">
                      Password is not matched!
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        name="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        defaultChecked={false}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Register
                </button>
              </form>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleGoogleSignIn}
                  aria-label="Register with Google"
                  className="p-3 rounded-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                  </svg>
                </button>
                <button
                  onClick={""}
                  aria-label="Register with GitHub"
                  className="p-3 rounded-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                  </svg>
                </button>
              </div>
              <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:block flex-1 drop-shadow-md">
          <img src={registerImg} alt="login image" />
        </div>
      </div>
    </section>
  );
};

export default Register;
