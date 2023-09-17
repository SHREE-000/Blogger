import { useEffect, useState } from "react";
import { Alert, Dropdown, Footer, Navbar, Spinner } from "../shared/components";
import "./Component.scss";
import {
  BACKEND_BASE_URL,
  BLOG_URL,
  FILTERED_BLOGS,
  MEDIA,
} from "../constants";
import { setOption } from "../../features/navbar/navbarSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiHandler } from "../shared/utils";

export const Media = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const { isClickMedia } = useSelector((state) => state.navbar);

  const handleLocation = (event) => {
    setLocation(event.target.value);
  };

  const downloadImage = (url, title) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title}.jpg`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchApi = async () => {
    const response = await apiHandler(
      "",
      "",
      "MEDIA",
      BACKEND_BASE_URL,
      BLOG_URL,
      FILTERED_BLOGS,
      location,
      ""
    );
    setBlogs(response?.data);
  };

  useEffect(() => {
    dispatch(setOption("MEDIA"));
  }, [dispatch]);

  useEffect(() => {
    if (location && location.trim()) navigate(`${MEDIA}/${location}`);
    else navigate(MEDIA);
    fetchApi();
  }, [location]);

  useEffect(() => {
    setLocation("");
  }, [isClickMedia]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="media">
      <Navbar />
      {blogs.length !== 0 && (
        <div className="dropdown-media">
          <Dropdown handleLocation={handleLocation} location={location} />
        </div>
      )}
      <div className="outer-box-media">
        {blogs.length !== 0 &&
          blogs.map((element, idx) => {
            return (
              <div
                className="card-media"
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={`data:image/png;base64,${element.media}`}
                  alt="Media"
                />
                {hoveredIndex === idx && (
                  <button
                    onClick={() =>
                      downloadImage(
                        `data:image/png;base64,${element.media}`,
                        element.title
                      )
                    }
                    className="download-button"
                  >
                    &#x2B07;
                  </button>
                )}
              </div>
            );
          })}
        <div className="alert-showBlogs">
          {blogs.length === 0 && (
            <>
              {loading ? (
                <Spinner />
              ) : (
                <Alert msg="There is no media with your filter, please try another" />
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
