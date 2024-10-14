import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ErrorBanner from "web/components/ErrorBanner";
import { useErrorAlert } from "web/hooks/useErrorAlert";
import Show from "../../assets/view.svg?react";
import Hide from "../../assets/hide.svg?react";
import Back from "../../assets/back.svg?react";
import "../../assets/view.svg";
import "../../assets/hide.svg";

interface SignupForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  organisationName: string;
  promoCode: string;
}
const DefaultValues = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  organisationName: "",
  promoCode: "",
};

const SignupPage = () => {
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [emailSuccess, setEmailSuccess] = useState<string>("");
  const [passwordSuccess, setPasswordSuccess] = useState<string>("");
  const [confirmPasswordSuccess, setConfirmPasswordSuccess] =
    useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const {
    register,
    handleSubmit,
    formState,
    clearErrors,
    reset,
    watch,
    trigger,
    getValues,
  } = useForm<SignupForm>({ defaultValues: DefaultValues });
  const { errors } = formState;
  const { errorAlert, setErrorAlert } = useErrorAlert();

  let email = watch("email");
  let password = watch("password");
  let confirmPassword = watch("confirmPassword");
  let getemail = getValues("email");
  let getpassword = getValues("password");
  let getconfirmPassword = getValues("confirmPassword");

  const email_validate = (email: string) => {
    var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return re.test(email);
  };
  const password_validate = (password: string) => {
    var re = {
      capital: /(?=.*[A-Z])/,
      length: /(?=.{10,40}$)/,
      specialChar: /[ -\/:-@\[-\`{-~]/,
      digit: /(?=.*[0-9])/,
    };
    return (
      re.capital.test(password) &&
      re.length.test(password) &&
      re.specialChar.test(password) &&
      re.digit.test(password)
    );
  };

  const validEmail = email_validate(getemail);
  const validPassword = password_validate(getpassword);
  const validConfirmPassword = getpassword === getconfirmPassword;

  useEffect(() => {
    if (email && validEmail) {
      setEmailSuccess("Valid email!");
    }

    if (password && validPassword) {
      setPasswordSuccess("Valid password!");
    }
    if (confirmPassword && validConfirmPassword) {
      setConfirmPasswordSuccess("Confirm Password Matched!");
    }
  }, [email, password, confirmPassword]);

  const nextStep = async () => {
    const resutl = await trigger(["password", "confirmPassword", "email"]);
    if (resutl) {
      if (validEmail && validPassword && validConfirmPassword) {
        clearErrors();
        setStep(step + 1);
      }
    }
  };
  const pervStep = () => {
    setStep(step - 1);
  };

  const onSubmit = (data: SignupForm) => {
    if (data) {
      console.log("Signup with data", data);
      clearErrors();
      reset();
    } else {
      setErrorAlert("Signup failed. Not Implemented.");
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
          {step == 2 && (
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
            {step == 1 && (
              <>
                <div className="feildOutter">
                  <label className="example uppercase">
                    Account Information
                  </label>
                  <label>Email*</label>
                  <input
                    className={`${validEmail && "valid"}`}
                    type="email"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is required.",
                      },
                      pattern: {
                        value:
                          /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && !validEmail ? (
                    <span className="error">{errors.email.message}</span>
                  ) : validEmail ? (
                    <p className="success">{emailSuccess}</p>
                  ) : (
                    <span className="example">E.g., john.doe@example.com</span>
                  )}
                </div>
                <div className="feildOutter">
                  <label>Password*</label>
                  <div className="relative z-0">
                    <input
                      className={`${validPassword && "valid"}`}
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is required.",
                        },
                        pattern: {
                          value:
                            /^(?=.*[A-Z])(?=.{7,40}$)(?=.*[ -\/:-@\[-\`{-~]{1,}).*$/,
                          message: "Please enter a strong password",
                        },
                      })}
                    />
                    <div
                      className="absolute z-10 right-3 top-1/3 cursor-pointer"
                      onClick={togglePasswordVisibilityOne}
                    >
                      {showPassword ? (
                        <Hide className="w-5 h-5" />
                      ) : (
                        <Show className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                  {errors.password && !validPassword ? (
                    <span className="error">{errors.password.message}</span>
                  ) : validPassword ? (
                    <p className="success">{passwordSuccess}</p>
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
                      className={`${
                        validConfirmPassword && confirmPassword && "valid"
                      }`}
                      type={showConfirmPassword ? "text" : "password"}
                      id="password"
                      {...register("confirmPassword", {
                        required: {
                          value: true,
                          message: "Confirm Password is required.",
                        },
                      })}
                    />
                    <div
                      className="absolute z-10 right-3 top-1/3 cursor-pointer"
                      onClick={togglePasswordVisibilityTwo}
                    >
                      {showConfirmPassword ? (
                        <Hide className="w-5 h-5" />
                      ) : (
                        <Show className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                  {errors.confirmPassword ? (
                    <span className="error">
                      {errors.confirmPassword.message}
                    </span>
                  ) : validConfirmPassword && confirmPassword ? (
                    <p className="success">{confirmPasswordSuccess}</p>
                  ) : (
                    <span className="example">
                      Re-enter the same password to confirm
                    </span>
                  )}
                </div>
                <div
                  className="thm-btn-1 w-full"
                  onClick={() => {
                    nextStep();
                  }}
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
                    {...register("organisationName", {
                      required: "Organization Name is required.",
                    })}
                  />
                  {errors.organisationName ? (
                    <span className="error">
                      {errors.organisationName.message}
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
                    {...register("promoCode", {
                      required: "Promo code is required.",
                    })}
                  />
                  {errors.promoCode ? (
                    <span className="error">{errors.promoCode.message}</span>
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
