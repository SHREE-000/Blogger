import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  BACKEND_BASE_URL,
  BLOG_URL,
  BLOG_SINGLE,
  BLOG_DELETE,
  HOME,
  SHOW_BLOGS,
  UPDATE_BLOGS,
} from "../../constants";
import "../Component.scss";
import { Navbar, Footer, Modal } from "../../shared/components";
import { setUpdateBlog } from "../../../features/blog/blogSlice";
import { apiHandler } from "../../shared/utils";

export const ShowOneFullBlog = () => {
  const currentLocation = useLocation();
  const id = currentLocation?.state?.id;
  const userId = currentLocation?.state?.userId;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [blog, setBlog] = useState("");
  const [isAuthor, setAuthor] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);

  const deleteHandler = (event) => {
    setModal(true);
  };

  const confirmHandler = async (event) => {
    if (event === "delete") {
      const response = await apiHandler(
        "",
        user?.userDetails?.token,
        "DELETE_BLOG",
        BACKEND_BASE_URL,
        BLOG_URL,
        BLOG_DELETE,
        id
      );
      if (response.data || response) {
        setModal(false);
        dispatch(setUpdateBlog());
        navigate(SHOW_BLOGS);
      }
    }
  };
  const cancelHandler = (event) => {
    if (event === "cancel") setModal(false);
  };

  const fetchApi = async (id) => {
    const response = await apiHandler(
      "",
      user?.userDetails?.token,
      "AUTHOR_BLOGS",
      BACKEND_BASE_URL,
      BLOG_URL,
      BLOG_SINGLE,
      id
    );
    setBlog(response?.data);
  };

  useEffect(() => {
    if (id) {
      fetchApi(id);
    } else {
      navigate(HOME);
    }
  }, [id]);

  useEffect(() => {
    const date = new Date(blog.createdAt);
    const readableTime = date.toLocaleDateString();
    setDate(readableTime);
  }, [blog]);

  useEffect(() => {
    if (
      user?.userDetails?.id === userId ||
      user?.userDetails?.isAdmin === true
    ) setAuthor(true);
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="outerContainer-showOneFullBlog">
        <div className="firstHalf">
          <img
            className="img"
            src={`data:image/png;base64,${blog.media}`}
            alt="Blog"
          />
        </div>
        <div className="secondHalf">
          <div>
            <h1>{blog.title}</h1>
          </div>
          <div className="subHeading">
            <h3>{date}</h3>
            <div className="middle"></div>
            <h3>
              {blog.author ||
                user?.userDetails?.email ||
                "Name is not available"}
            </h3>
          </div>
          {blog.desc}
        </div>
      </div>
      {modal && (
        <Modal confirmHandler={confirmHandler} cancelHandler={cancelHandler} />
      )}
      {isAuthor && (
        <div className="updateButtons">
          <button>
            <Link
              to={UPDATE_BLOGS}
              state={{
                id,
                userId,
              }}
              className="link-router-dom"
            >
              Edit Post
            </Link>
          </button>
          <button onClick={deleteHandler}>Delete Post</button>
        </div>
      )}
      <Footer />
    </>
  );
};
