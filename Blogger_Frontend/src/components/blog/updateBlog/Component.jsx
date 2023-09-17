import { useEffect, useState, useReducer } from "react";
import { CreateBlogs, Footer, Navbar } from "../../shared/components";
import "../../shared/styles/Authentication.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BACKEND_BASE_URL,
  BLOG_DESC,
  BLOG_MEDIA,
  BLOG_LOCATION,
  BLOG_TITLE,
  BLOG_TOPIC,
  BLOG_SINGLE,
  BLOG_UPDATE,
  BLOG_URL,
  FIELD_NULL_ERROR,
  BUTTON_NAME,
  TITLE_PLACEHOLDER,
  TOPIC_PLACEHOLDER,
  UPDATE_BLOG,
  HOME,
  SHOW_BLOGS,
} from "../../constants";
import "../Component.scss";
import {
  apiHandler,
  changeToSmallCase,
  formReducer,
  LOCATIONS,
  trimElement,
} from "../../shared/utils";
import { setUpdateBlog } from "../../../features/blog/blogSlice";

export const UpdateBlog = () => {
  const currentLocation = useLocation();
  const id = currentLocation?.state?.id;
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const blogTitle = changeToSmallCase(BLOG_TITLE);
  const blogTopic = changeToSmallCase(BLOG_TOPIC);
  const selectLocation = changeToSmallCase(BLOG_LOCATION);
  const blogDesc = changeToSmallCase(BLOG_DESC);
  const blogMedia = changeToSmallCase(BLOG_MEDIA);
  const btn = changeToSmallCase(BUTTON_NAME);

  const [img, setImg] = useState("");
  const [error, setError] = useState("");
  const [blog, setBlog] = useState("");
  const [reducerInitState, setReducerState] = useState({});
  const [formData, dispatch] = useReducer(formReducer, reducerInitState);

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

    if (!isTitle || !isTopic || !isDesc || !isLocation) {
      setError(FIELD_NULL_ERROR);
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
        "UPDATE_BLOG",
        BACKEND_BASE_URL,
        BLOG_URL,
        BLOG_UPDATE,
        id
      );
      dispatch({
        type: "RESET_FORM",
      });
      dispatchRedux(setUpdateBlog());
      navigate(SHOW_BLOGS);
    }
  };

  const fetchApi = async () => {
    const response = await apiHandler(
      "",
      user?.userDetails?.token,
      "GET_ONE_BLOG",
      BACKEND_BASE_URL,
      BLOG_URL,
      BLOG_SINGLE,
      id
    );
    setBlog(response?.data);
  };

  useEffect(() => {
    if (!id) navigate(HOME);
    else fetchApi();
  }, [id]);

  useEffect(() => {
    if (blog) {
      const initialState = {
        desc: blog.desc,
        location: blog.location,
        media: blog.media,
        title: blog.title,
        topic: blog.topic,
      };
      setReducerState(initialState);
    }
  }, [blog]);

  useEffect(() => {
    if (!user) navigate(HOME);
  }, [user]);

  useEffect(() => {
    if (Object.keys(reducerInitState).length) {
      for (let elem in reducerInitState)
        dispatch({
          type: "SET_FIELD_VALUE",
          fieldName: elem,
          fieldValue: reducerInitState[elem],
        });
    }
  }, [reducerInitState]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const props = {
    heading: UPDATE_BLOG,
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
