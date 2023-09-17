import { useEffect, useState } from "react";
import {
  Navbar,
  Footer,
  Readless,
  Alert,
  Spinner,
  SearchBlog,
  Dropdown,
} from "../shared/components";
import "./Component.scss";
import {
  BACKEND_BASE_URL,
  BLOG_URL,
  BLOG_LIMIT,
  HOME,
  HOME_SEARCH,
} from "../constants";
import { apiHandler, trimElement } from "../shared/utils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [limit, setLimit] = useState(3);
  const [active, setActive] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isDisabledNext, setDisabledNext] = useState(false);
  const [isDisabledPrev, setDisabledPrev] = useState(false);
  const [isSearched, setSearched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [pagination, setPagination] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { isHomeClick } = useSelector((state) => state.navbar);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const nextHandler = () => {
    const totalCountPagination = Math.ceil(totalCount / 3);
    if (totalCountPagination > limit) {
      if (totalCountPagination - limit < 3) setLimit(totalCountPagination);
      else setLimit(limit + 3);
    }
  };

  const prevHandler = () => {
    if (limit > 3) {
      if (limit % 3 === 0) setLimit(limit - 3);
      else if (limit % 3 === 2) setLimit(limit - 2);
      else setLimit(limit - 1);
    }
  };

  const limitHandler = async (count) => {
    setActive(count);
    const response = await apiHandler(
      "",
      "",
      "HOME",
      BACKEND_BASE_URL,
      BLOG_URL,
      BLOG_LIMIT,
      searchInput,
      parseInt(count * 3)
    );
    if (response?.data?.totalCount) {
      if (count * 3 - 2 > response.data.totalCount) {
      } else {
        setTotalCount(response?.data?.totalCount);
        setBlogs([...response?.data?.limitBlogs]);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleClickSearch = (e) => {
    e.preventDefault();
    setLocation("");
    const isSearchContent = trimElement(searchInput);
    if (isSearchContent) setSearched(!isSearched);
  };

  const handleDisableButton = () => {
    const totalCountPagination = Math.ceil(totalCount / 3);
    setDisabledNext(totalCountPagination <= limit);
    setDisabledPrev(limit <= 3);
  };

  const handleLocation = (event) => {
    setSearchInput("");
    setLocation(event.target.value);
  };

  const fetchBlogs = async () => {
    const response = await apiHandler(
      "",
      "",
      "HOME",
      BACKEND_BASE_URL,
      BLOG_URL,
      BLOG_LIMIT,
      location,
      searchInput,
      parseInt(active * 3)
    );
    if (response?.data?.totalCount) {
      if (active * 3 - 2 > response.data.totalCount) setActive(1);
    } else setActive(1);

    setPagination((prevPagination) => {
      let limitPagination = 3;
      if (response.data.totalCount <= 3) {
        limitPagination = 1;
        setLimit(3);
      } else if (response.data.totalCount <= 6) {
        limitPagination = 2;
        setLimit(6);
      } else limitPagination = limit;
      const pagination = [];
      for (let i = 0; i < limitPagination; i++) {
        if (i + 1 > limitPagination - 3) {
          pagination.push(i + 1);
        }
      }
      return pagination;
    });

    setTotalCount(response?.data?.totalCount);
    setBlogs([...response?.data?.limitBlogs]);
  };

  useEffect(() => {
    setLocation("");
    setSearchInput("");
    setSearched(!isSearched);
    setLimit(3);
    setActive(1);
  }, [isHomeClick]);

  useEffect(() => {
    fetchBlogs();
  }, [limit, active]);

  useEffect(() => {
    if (searchInput.trim()) {
      navigate(HOME_SEARCH);
    } else {
      navigate(HOME);
    }
    fetchBlogs();
  }, [isSearched]);

  useEffect(() => {
    if (location) {
      navigate(`${HOME}/${location}`);
    } else {
      navigate(HOME);
    }
    fetchBlogs();
  }, [location]);

  useEffect(() => {
    handleDisableButton();
  }, [limit, totalCount]);

  return (
    <>
      <Navbar />
      {loading && <Spinner />}
      <img
        onLoad={handleImageLoad}
        src="https://shorturl.at/I2367"
        alt="welcome"
      />
      <div className="filter-blogs">
        <SearchBlog
          searchInput={searchInput}
          handleSearch={handleSearch}
          handleClickSearch={handleClickSearch}
        />
        <Dropdown handleLocation={handleLocation} location={location} />
      </div>
      <div className="outer-box-home">
        {blogs.length !== 0 &&
          blogs.map((element, idx) => {
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
      </div>
      {totalCount ? (
        <div className="pagination">
          <div
            className={isDisabledPrev ? "disabledPrev" : "prev"}
            onClick={prevHandler}
          >
            &laquo; Prev
          </div>
          {pagination.map((count, idx) => {
            if (idx + 1)
              return (
                <div
                  onClick={() => limitHandler(count)}
                  className={`page ${active === count && "active"}`}
                  key={idx}
                >
                  {count}
                </div>
              );
            return null;
          })}
          <div
            className={isDisabledNext ? "disabledNext" : "next"}
            onClick={nextHandler}
          >
            Next &raquo;
          </div>
        </div>
      ) : (
        <Alert msg="Sorry, no blog result! please try with other keyword" />
      )}
      <Footer />
    </>
  );
};
