import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorBanner from "web/components/ErrorBanner";
import { useErrorAlert } from "web/hooks/useErrorAlert";
import Show from "../../assets/view.svg?react";
import Hide from "../../assets/hide.svg?react";
import Back from "../../assets/back.svg?react";
import "../../assets/view.svg";
import "../../assets/hide.svg";
// import styles from "./index.module.scss";
// import classanames from "classnames";

interface SignupForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  organisationNAme: string;
  promoCode: string;
}

const SignupPage = () => {
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<SignupForm>();
  const { errorAlert, setErrorAlert } = useErrorAlert();

  const nextStep = () => {
    setStep(step + 1);
    console.log(errors, "errors");
  };
  const pervStep = () => {
    setStep(step - 1);
  };

  const onSubmit = (data: SignupForm) => {
    if (step === 1) {
      nextStep();
    } else if (step === 2) {
      setErrorAlert("Signup failed. Not Implemented.");
      console.log("Signup with data", data);
      clearErrors();
      reset();
    }
  };

  const togglePasswordVisibilityOne = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibilityTwo = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="formContainer">
        <div className="formOutter">
          {step === 2 && (
            <div className="flex gap-3 items-center mb-5" onClick={pervStep}>
              <div>
                <Back className="w-5 h-5" />
              </div>
              <div>
                <p>Back to Account Information</p>
              </div>
            </div>
          )}
          <div className="title">
            <h4>Registration</h4>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`flex flex-col gap-4`}
          >
            <ErrorBanner message={errorAlert} />
            {step === 1 && (
              <>
                <div className="feildOutter">
                  <label className="example uppercase">
                    Account Infomation
                  </label>
                  <label>Email*</label>
                  <input
                    type="text"
                    {...register("email", { required: "Email is required." })}
                  />
                  {errors.email ? (
                    <span className="error">{errors.email.message}</span>
                  ) : (
                    <span className="example">E.g., john.doe@example.com</span>
                  )}
                </div>
                <div className="feildOutter">
                  <label>Password*</label>
                  <div className="relative z-0">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required.",
                      })}
                    />
                    <div
                      className="absolute right-3 top-1/3"
                      onClick={togglePasswordVisibilityOne}
                    >
                      {showConfirmPassword && <Show className="w-5 h-5" />}
                      {!showConfirmPassword && <Hide className="w-5 h-5" />}
                    </div>
                  </div>
                  {errors.password ? (
                    <span className="error">{errors.password.message}</span>
                  ) : (
                    <span className="example">
                      At least 8 characters with a number & symbol
                    </span>
                  )}
                </div>
                <div className="feildOutter">
                  <label>Confirm Password*</label>
                  <div className="relative z-0">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="password"
                      {...register("password", {
                        required: "Password is required.",
                      })}
                    />
                    <div
                      className="absolute right-3 top-1/3"
                      onClick={togglePasswordVisibilityTwo}
                    >
                      {showConfirmPassword && <Show className="w-5 h-5" />}
                      {!showConfirmPassword && <Hide className="w-5 h-5" />}
                    </div>
                  </div>
                  {errors.password ? (
                    <span className="error">{errors.password.message}</span>
                  ) : (
                    <span className="example">
                      Re-enter the same password to confirm
                    </span>
                  )}
                </div>
                <div
                  className="thm-btn-1 w-full"
                  onClick={handleSubmit(nextStep)}
                >
                  Continue
                </div>
                <div>
                  <p className="text-center font-semibold">
                    Already registered? <span className="thmLink">Sign In</span>
                  </p>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="feildOutter">
                  <label className="example uppercase">
                    Contact Infomation
                  </label>
                  <div className="flex lg:flex-row flex-col gap-5">
                    <div>
                      <label>First Name*</label>
                      <input
                        type="text"
                        {...register("firstName", {
                          required: "First Name is required.",
                        })}
                      />
                      {errors.firstName ? (
                        <span className="error">
                          {errors.firstName.message}
                        </span>
                      ) : (
                        <span className="example">E.g., John</span>
                      )}
                    </div>
                    <div>
                      <label>Last Name*</label>
                      <input
                        type="text"
                        {...register("lastName", {
                          required: "Last Name is required.",
                        })}
                      />
                      {errors.lastName ? (
                        <span className="error">{errors.lastName.message}</span>
                      ) : (
                        <span className="example">E.g., Doe</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="feildOutter">
                  <label>Organization Name*</label>
                  <input
                    type="text"
                    {...register("organisationNAme", {
                      required: "Organization Name is required.",
                    })}
                  />
                  {errors.organisationNAme ? (
                    <span className="error">
                      {errors.organisationNAme.message}
                    </span>
                  ) : (
                    <span className="example">
                      Enter the name of your organization
                    </span>
                  )}
                </div>
                <div className="feildOutter">
                  <label>Promo code*</label>
                  <input
                    type="text"
                    {...register("organisationNAme", {
                      required: "Promo code is required.",
                    })}
                  />
                  {errors.organisationNAme ? (
                    <span className="error">
                      {errors.organisationNAme.message}
                    </span>
                  ) : (
                    <span className="example">
                      Enter your promo code (if you have one).
                    </span>
                  )}
                </div>
                <div className="feildOutter">
                  <button type="submit" className="thm-btn-1 w-full">
                    Sign up
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
