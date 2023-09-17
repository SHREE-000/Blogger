import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Footer,
  Readless,
  Alert,
  Spinner,
  SearchBlog,
  Dropdown,
} from "../../shared/components";
import {
  BACKEND_BASE_URL,
  BLOG_URL,
  BLOG_USER,
  HOME,
  SHOW_BLOGS,
  SHOW_BLOGS_SEARCH,
} from "../../constants";
import { setOption } from "../../../features/navbar/navbarSlice";
import "../Component.scss";
import { setCreateBlog, setUpdateBlog } from "../../../features/blog/blogSlice";
import { apiHandler, trimElement } from "../../shared/utils";

export const ShowBlogs = () => {
  const { user } = useSelector((state) => state.auth);
  const { isCreateBlog, isUpdateBlog } = useSelector((state) => state.blog);
  const { isClickMyBlog } = useSelector((state) => state.navbar);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [userBlogs, setUserBlogs] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [location, setLocation] = useState("");
  const [isSearched, setSearched] = useState(false);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleLocation = (event) => {
    setSearchInput("");
    setLocation(event.target.value);
  };

  const handleClickSearch = (e) => {
    e.preventDefault();
    setLocation("");
    const isSearchContent = trimElement(searchInput);
    if (isSearchContent) setSearched(!isSearched);
  };

  const handleAlert = (timerId) => {
    if (isCreateBlog) {
      setAlert(true);
      timerId = setTimeout(() => {
        dispatch(setCreateBlog());
      }, 3000);
    }
    if (isUpdateBlog) {
      setAlert(true);
      timerId = setTimeout(() => {
        dispatch(setUpdateBlog());
      }, 3000);
    }
    return timerId;
  };

  const fetchApi = async () => {
    const response = await apiHandler(
      "",
      user?.userDetails?.token,
      "GET_BLOG",
      BACKEND_BASE_URL,
      BLOG_URL,
      BLOG_USER,
      location,
      searchInput
    );
    setUserBlogs(response?.data?.filteredblogs);
    if (response?.data?.filteredblogs.length === 0) setLoading(false);
  };

  useEffect(() => {
    if (!user) navigate(HOME);
    dispatch(setOption("MYBLOG"));
  }, [user]);

  useEffect(() => {
    let timerId = null;
    const timer = handleAlert(timerId);
    return () => {
      clearTimeout(timer);
    };
  }, [isCreateBlog, isUpdateBlog]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setAlert(false);
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [alert]);

  useEffect(() => {
    if (searchInput.trim()) navigate(SHOW_BLOGS_SEARCH);
    else navigate(SHOW_BLOGS);
    fetchApi();
  }, [isSearched]);

  useEffect(() => {
    if (location) navigate(`${SHOW_BLOGS}/${location}`);
    else navigate(SHOW_BLOGS);
    fetchApi();
  }, [location]);

  useEffect(() => {
    setSearchInput("");
    setLocation("");
    setSearched("");
  }, [isClickMyBlog]);

  return (
    <div className="show-blogs">
      <Navbar />
      <div className="filter-blog">
        <SearchBlog
          searchInput={searchInput}
          handleSearch={handleSearch}
          handleClickSearch={handleClickSearch}
        />
        <Dropdown handleLocation={handleLocation} location={location} />
      </div>
      {alert && <Alert msg="Your Blogs Updated Successfully" />}
      <div className="outer-box-parent">
        {userBlogs?.length !== 0 &&
          userBlogs.map((element, idx) => {
            return (
              <Readless
                key={idx}
                title={element.title}
                topic={element.topic}
                desc={element.desc}
                media={element.media}
                userId={element.userId}
                id={element._id}
              />
            );
          })}
        <div className="alert-showBlogs">
          {userBlogs.length === 0 && (
            <>
              {loading ? (
                <Spinner />
              ) : (
                <Alert msg="You haven't create any blogs yet with or without your filters" />
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
