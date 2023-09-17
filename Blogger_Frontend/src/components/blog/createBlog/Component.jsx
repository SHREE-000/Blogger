import { useEffect, useState, useReducer } from "react";
import { Footer, Navbar } from "../../shared/components";
import "../../shared/styles/Authentication.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BACKEND_BASE_URL,
  BLOG_CREATE_URL,
  BLOG_DESC,
  BLOG_MEDIA,
  BLOG_LOCATION,
  BLOG_TITLE,
  BLOG_TOPIC,
  BLOG_URL,
  CREATE_BLOG,
  FIELD_NULL_ERROR,
  MEDIA_ERROR,
  BUTTON_NAME,
  TITLE_PLACEHOLDER,
  TOPIC_PLACEHOLDER,
  HOME,
  SHOW_BLOGS,
} from "../../constants";

import {
  apiHandler,
  changeToSmallCase,
  formReducer,
  isValideImgFileExtn,
  LOCATIONS,
  trimElement,
} from "../../shared/utils";
import { setOption } from "../../../features/navbar/navbarSlice";
import "../Component.scss";
import { setCreateBlog } from "../../../features/blog/blogSlice";
import { CreateBlogs } from "../../shared/components";

const initialState = {
  desc: "",
  location: "",
  media: "",
  title: "",
  topic: "",
};

export const CreateBlog = () => {
  const dispatchRedux = useDispatch();
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const blogTitle = changeToSmallCase(BLOG_TITLE);
  const blogTopic = changeToSmallCase(BLOG_TOPIC);
  const selectLocation = changeToSmallCase(BLOG_LOCATION);
  const blogDesc = changeToSmallCase(BLOG_DESC);
  const blogMedia = changeToSmallCase(BLOG_MEDIA);
  const btn = changeToSmallCase(BUTTON_NAME);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [img, setImg] = useState("");
  const [error, setError] = useState("");

  const handleInput = (event) => {
    if (event.target.name === "media") {
      setImg(event.target.value);
      const file = event.target.files[0];
      const data = new FormData();
      data.append("image", file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64data = reader.result;
        dispatch({
          type: "SET_FIELD_VALUE",
          fieldName: event.target.name,
          fieldValue: {
            filename: file.name,
            contents: base64data.split(",")[1],
          },
        });
      };
    } else {
      dispatch({
        type: "SET_FIELD_VALUE",
        fieldName: event.target.name,
        fieldValue: event.target.value,
      });
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const isTitle = trimElement(formData.title);
    const isTopic = trimElement(formData.topic);
    const isDesc = trimElement(formData.desc);
    const isLocation = trimElement(formData.location);
    const isImg = trimElement(img);
    const isImgFile = isValideImgFileExtn(img);

    if (!isTitle || !isTopic || !isDesc || !isLocation || !isImg) {
      setError(FIELD_NULL_ERROR);
    } else if (!isImgFile) {
      setError(MEDIA_ERROR);
    } else {
      const userDetails = {
        desc: formData.desc,
        location: formData.location,
        media: formData.media,
        title: formData.title,
        topic: formData.topic,
      };
      await apiHandler(
        userDetails,
        user?.userDetails?.token,
        "CREATE_BLOG",
        BACKEND_BASE_URL,
        BLOG_URL,
        BLOG_CREATE_URL
      );
      dispatch({
        type: "RESET_FORM",
      });
      dispatchRedux(setCreateBlog());
      navigate(SHOW_BLOGS);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  useEffect(() => {
    dispatchRedux(setOption("NEWBLOG"));
    if (!user) navigate(HOME);
  }, [user]);

  const props = {
    heading: CREATE_BLOG,
    labelTitle: BLOG_TITLE,
    titleValue: formData.title,
    onChange: handleInput,
    textType: "text",
    titleIdNameHtml: blogTitle,
    titlePlaceHolder: TITLE_PLACEHOLDER,
    topicIdNameHtml: blogTopic,
    labelTopic: BLOG_TOPIC,
    topicPlaceHolder: TOPIC_PLACEHOLDER,
    topicValue: formData.topic,
    descValue: formData.desc,
    descHtml: blogDesc,
    labelDesc: BLOG_DESC,
    descIdName: "desc",
    selectIdNameHtml: selectLocation,
    options: LOCATIONS,
    labelSelect: BLOG_LOCATION,
    fileType: "file",
    mediaLabel: BLOG_MEDIA,
    mediaIdNameHtml: blogMedia,
    mediaValue: img,
    handleClick: handleClick,
    submitType: btn,
    buttonName: BUTTON_NAME,
    error,
  };

  return (
    <div>
      <Navbar />
      <CreateBlogs props={props} />
      <Footer />
    </div>
  );
};
