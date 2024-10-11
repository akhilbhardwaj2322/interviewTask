import React, { useState } from "react";
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

type FormDataType = {
  [key: string]: string; // Adjust the type as per your form data structure
};

const SignupPage = () => {
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [formData, setFormData] = useState<SignupForm>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    organisationName: "",
    promoCode: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    watch,
    trigger,
  } = useForm<SignupForm>();
  const { errorAlert, setErrorAlert } = useErrorAlert();

  const handleChange =
    (input: keyof FormDataType) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [input]: e.target.value });
    };

  let passwordValue = watch("password");
  let confirmPassword = watch("confirmPassword");

  const nextStep = async () => {
    const resutl = await trigger(["password", "confirmPassword", "email"]);
    if (resutl === true) {
      if (errors.email || errors.password || errors.confirmPassword) {
        return;
      }
      if (passwordValue !== confirmPassword) {
        return;
      }
      setStep(step + 1);
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
                    type="email"
                    {...register("email", {
                      required: "Email is required.",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address",
                      },
                    })}
                    value={formData.email}
                    onChange={handleChange("email")}
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
                      value={formData.password}
                      onChange={handleChange("password")}
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
                      {...register("confirmPassword", {
                        required: "Password is required.",
                      })}
                      value={formData.confirmPassword}
                      onChange={handleChange("confirmPassword")}
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
                  {errors.password ? (
                    <span className="error">{errors.password.message}</span>
                  ) : (
                    <span className="example">
                      Re-enter the same password to confirm
                    </span>
                  )}
                </div>
                <div className="thm-btn-1 w-full" onClick={nextStep}>
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
                        value={formData.firstName}
                        onChange={handleChange("firstName")}
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
                        value={formData.lastName}
                        onChange={handleChange("lastName")}
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
                    value={formData.organisationName}
                    onChange={handleChange("organisationName")}
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
                    value={formData.promoCode}
                    onChange={handleChange("promoCode")}
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
