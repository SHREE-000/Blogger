import { useReducer, useState, useEffect } from "react";
import {
  Alert,
  ErrorMsg,
  Footer,
  Heading2,
  InputField,
  Label,
  Navbar,
  SubmitButton,
} from "../shared/components";
import {
  CONTACT_FORM,
  EMAIL_INPUT_NAME,
  EMAIL_PLACEHOLDER,
  USERNAME_INPUT_NAME,
  USERNAME_PLACEHOLDER,
  PHONE_INPUT_NAME,
  PHONE_PLACEHOLDER,
  CONTACT_MSG,
  BUTTON_NAME,
  FIELD_NULL_ERROR,
  CONTACT_URL,
  CONTACT_US,
  BACKEND_BASE_URL,
} from "../constants";
import {
  apiHandler,
  changeToSmallCase,
  formReducer,
  trimElement,
} from "../shared/utils";
import "./Component.scss";
import { setOption } from "../../features/navbar/navbarSlice";
import { useDispatch } from "react-redux";

const initialData = {
  username: "",
  email: "",
  phoneNum: "",
  message: "",
};

export const Contact = () => {
  const [formData, dispatch] = useReducer(formReducer, initialData);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);
  const dispatchRedux = useDispatch();

  const mail = changeToSmallCase(EMAIL_INPUT_NAME);
  const username = changeToSmallCase(USERNAME_INPUT_NAME);
  const contactMsg = changeToSmallCase(CONTACT_MSG);
  const btn = changeToSmallCase(BUTTON_NAME);

  const handleInputChange = (event) => {
    dispatch({
      type: "SET_FIELD_VALUE",
      fieldName: event.target.name,
      fieldValue: event.target.value,
    });
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const isMailContent = trimElement(formData.email);
    const isUsername = trimElement(formData.username);
    const isMessage = trimElement(formData.message);
    const isMobile = trimElement(formData.phoneNum);
    if (!isMailContent || !isUsername || !isMessage || !isMobile) {
      setError(FIELD_NULL_ERROR);
    } else {
      const response = await apiHandler(
        formData,
        "",
        "CONTACT",
        BACKEND_BASE_URL,
        CONTACT_URL,
        CONTACT_US
      );
      if (response || response.data) {
        setAlert(true);
        dispatch({
          type: "RESET_FORM",
        });
      }
    }
  };

  useEffect(() => {
    dispatchRedux(setOption("CONTACT"));
    const timer1 = setTimeout(() => {
      setError("");
    }, 3000);
    const timer2 = setTimeout(() => {
      setAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [error, alert]);

  return (
    <>
      <Navbar />
      <div className="outer-box-contact">
        <Heading2 heading={CONTACT_FORM} />
        <form className="container">
          <Label htmlFor="username" label={USERNAME_INPUT_NAME} />
          <InputField
            value={formData.username}
            focus={false}
            onChange={handleInputChange}
            type="text"
            id={username}
            name={username}
            placeholder={USERNAME_PLACEHOLDER}
          />

          <Label htmlFor={mail} label={EMAIL_INPUT_NAME} />
          <InputField
            value={formData.email}
            onChange={handleInputChange}
            type={mail}
            id={mail}
            name={mail}
            placeholder={EMAIL_PLACEHOLDER}
          />

          <Label htmlFor="phone_num" label={PHONE_INPUT_NAME} />
          <InputField
            value={formData.phoneNum}
            onChange={handleInputChange}
            type="number"
            id="phone_num"
            name="phoneNum"
            placeholder={PHONE_PLACEHOLDER}
          />

          <Label htmlFor={contactMsg} label={CONTACT_MSG} />
          <div>
            <textarea
              id="message"
              name="message"
              className="textareaStyle"
              value={formData.message}
              onChange={handleInputChange}
            ></textarea>
          </div>

          {error && <ErrorMsg msg={error} />}
          {alert && <Alert msg="Your Response Saved Successfully" />}

          <SubmitButton onClick={handleClick} type={btn} name={BUTTON_NAME} />
        </form>
      </div>
      <Footer />
    </>
  );
};
