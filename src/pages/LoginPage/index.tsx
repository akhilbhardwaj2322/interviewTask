import React from "react";
import { useForm } from "react-hook-form";
import ErrorBanner from "web/components/ErrorBanner";
import { useErrorAlert } from "web/hooks/useErrorAlert";
import "./index.module.scss";
// import classanames from "classnames";

interface LoginForm {
  username: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<LoginForm>();
  const { errorAlert, setErrorAlert } = useErrorAlert();

  const onSubmit = (data: LoginForm) => {
    setErrorAlert("Login failed. Not Implemented.");
    console.log("Login with data", data);
    clearErrors();
    reset();
  };

  return (
    <>
      <div className="formContainer">
        <div className="formOutter">
          <div className="title">
            <h4>Log In</h4>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            // className={classanames("flex flex-col gap-2", styles.form)}
            className={`flex flex-col gap-4`}
          >
            <ErrorBanner message={errorAlert} />
            <div className="feildOutter">
              <label>Email*</label>
              <input
                type="text"
                {...register("username", { required: "Username is required." })}
              />
              {errors.username ? (
                <span className="error">{errors.username.message}</span>
              ) : (
                <span className="example">E.g., john.doe@example.com</span>
              )}
            </div>
            <div className="feildOutter">
              <label>Password*</label>
              <input
                type="password"
                {...register("password", { required: "Password is required." })}
                />
                {errors.password ? (
                  <span className="error">{errors.password.message}</span>
                ) : (
                  <span className="example">At least 8 characters with a number & symbol</span>
                )}
            </div>
            <div className="flex md:flex-row flex-col items-center gap-5">
              <button type="submit" className="thm-btn-1 md:w-1/2 w-full">
                Login
              </button>
              <div>
                <p className="thmLink">Forgot password?</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
