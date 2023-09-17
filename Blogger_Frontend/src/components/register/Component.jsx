import { useState, useEffect, useReducer } from "react";
import "../shared/styles/Authentication.scss";
import { signup, reset } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  ErrorMsg,
  Heading2,
  InputField,
  Label,
  SelectField,
  SubmitButton,
} from "../shared/components";
import { useFocus } from "../customHooks";
import {
  changeToSmallCase,
  GENDERS,
  isValidEmail,
  isValidPasswrd,
  isValidPhoneNum,
  LOCATIONS,
  trimElement,
  formReducer,
} from "../shared/utils";
import {
  AUTH_ERROR_REGISTER,
  BUTTON_NAME,
  EMAIL_ERROR,
  EMAIL_INPUT_NAME,
  EMAIL_PLACEHOLDER,
  FIELD_NULL_ERROR,
  FIRST_NAME_INPUT_NAME,
  FIRST_NAME_PLACEHOLDER,
  GENDER_SELECT_NAME,
  LAST_NAME_INPUT_NAME,
  LAST_NAME_PLACEHOLDER,
  LOCATION_SELECT_NAME,
  PASSWORD_ERROR,
  PASSWORD_INPUT_NAME,
  PASSWORD_PLACEHOLDER,
  PHONE_INPUT_NAME,
  PHONE_PLACEHOLDER,
  PHONE_ERROR,
  REGISTER_HEADING,
  HOME,
  LOGIN,
} from "../constants";

const initialState = {
  firstname: "",
  lastname: "",
  gender: "",
  location: "",
  phoneNum: "",
  email: "",
  password: "",
};

export const Register = () => {
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();
  const { user, isError } = useSelector((state) => state.auth);

  const inputRef = useFocus();
  const nameFirst = changeToSmallCase(FIRST_NAME_INPUT_NAME);
  const nameLast = changeToSmallCase(LAST_NAME_INPUT_NAME);
  const mail = changeToSmallCase(EMAIL_INPUT_NAME);
  const passwrd = changeToSmallCase(PASSWORD_INPUT_NAME);
  const selectLocation = changeToSmallCase(LOCATION_SELECT_NAME);
  const selectGender = changeToSmallCase(GENDER_SELECT_NAME);
  const btn = changeToSmallCase(BUTTON_NAME);

  const [error, setError] = useState("");

  const handleInput = (event) => {
    dispatch({
      type: "SET_FIELD_VALUE",
      fieldName: event.target.name,
      fieldValue: event.target.value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const isFirstnameContent = trimElement(formData.firstname);
    const isLastnameContent = trimElement(formData.lastname);
    const isGenderContent = trimElement(formData.gender);
    const isLocationContent = trimElement(formData.location);
    const isMailContent = trimElement(formData.email);
    const isPasswrdContent = trimElement(formData.password);
    const isPhoneContent = trimElement(formData.phoneNum);

    if (
      !isMailContent ||
      !isPasswrdContent ||
      !isFirstnameContent ||
      !isLastnameContent ||
      !isGenderContent ||
      !isLocationContent ||
      !isPhoneContent
    ) {
      setError(FIELD_NULL_ERROR);
    } else {
      const isMail = isValidEmail(formData.email);
      const isPasswrd = isValidPasswrd(formData.password);
      const isPhoneNum = isValidPhoneNum(formData.phoneNum);

      if (!isPhoneNum) {
        setError(PHONE_ERROR);
      } else if (!isMail) {
        setError(EMAIL_ERROR);
      } else if (!isPasswrd) {
        setError(PASSWORD_ERROR);
      } else {
        const userData = {
          firstname: formData.firstname,
          lastname: formData.lastname,
          gender: formData.gender,
          location: formData.location,
          phoneNum: formData.phoneNum,
          email: formData.email,
          password: formData.password,
        };
        reduxDispatch(signup(userData));

        dispatch({
          type: "RESET_FORM",
        });
      }
    }
  };

  useEffect(() => {
    if (isError) setError(AUTH_ERROR_REGISTER);
  }, [isError]);

  useEffect(() => {
    if (user) navigate(HOME);
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
      reduxDispatch(reset());
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  return (
    <div>
      <Heading2 heading={REGISTER_HEADING} />
      <form className="container" action="">
        <Label htmlFor={nameFirst} label={FIRST_NAME_INPUT_NAME} />
        <InputField
          ref={inputRef}
          value={formData.firstname}
          onChange={handleInput}
          type="text"
          id={nameFirst}
          name={nameFirst}
          placeholder={FIRST_NAME_PLACEHOLDER}
        />

        <Label htmlFor={nameLast} label={LAST_NAME_INPUT_NAME} />
        <InputField
          value={formData.lastname}
          onChange={handleInput}
          type="text"
          id={nameLast}
          name={nameLast}
          placeholder={LAST_NAME_PLACEHOLDER}
        />

        <div>
          <Label htmlFor={selectGender} label={GENDER_SELECT_NAME} />
          <SelectField
            value={formData.gender}
            className="selectOneStyle"
            onChange={handleInput}
            id={selectGender}
            name={selectGender}
            options={GENDERS}
          />

          <Label htmlFor={selectLocation} label={LOCATION_SELECT_NAME} />
          <SelectField
            value={formData.location}
            id={selectLocation}
            name={selectLocation}
            className="selectOneStyle"
            options={LOCATIONS}
            onChange={handleInput}
          />
        </div>

        <Label htmlFor="phoneNum" label={PHONE_INPUT_NAME} />
        <InputField
          value={formData.phoneNum}
          onChange={handleInput}
          type="number"
          id="phoneNum"
          name="phoneNum"
          placeholder={PHONE_PLACEHOLDER}
        />

        <Label htmlFor={mail} label={EMAIL_INPUT_NAME} />
        <InputField
          value={formData.email}
          onChange={handleInput}
          type={mail}
          id={mail}
          name={mail}
          placeholder={EMAIL_PLACEHOLDER}
        />

        <Label htmlFor={passwrd} label={PASSWORD_INPUT_NAME} />
        <InputField
          value={formData.password}
          focus={false}
          onChange={handleInput}
          type={passwrd}
          id={passwrd}
          name={passwrd}
          placeholder={PASSWORD_PLACEHOLDER}
        />

        {error && <ErrorMsg msg={error} />}

        <SubmitButton onClick={handleClick} type={btn} name={BUTTON_NAME} />
        <div className="link">
          <Link to={LOGIN}>Already registered?</Link>
        </div>
      </form>
    </div>
  );
};
