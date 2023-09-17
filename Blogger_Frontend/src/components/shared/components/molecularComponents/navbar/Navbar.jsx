import { useEffect, useState } from "react";
import "./Style.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setHomeClick,
  setOption,
} from "../../../../../features/navbar/navbarSlice";
import { signout, reset } from "../../../../../features/auth/authSlice";
import {
  CONTACT,
  CREATE_BLOGS,
  HOME,
  LOGIN,
  MEDIA,
  REGISTER,
  SHOW_BLOGS,
} from "../../../../constants";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { home, isMedia, isNewBlog, isMyBlog, isContact } = useSelector(
    (state) => state.navbar
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);
  console.log(username,'username');

  const handleHome = () => {
    dispatch(setHomeClick());
    dispatch(setOption("HOME"));
    navigate(HOME);
  };

  const handleOptions = (option) => {
    dispatch(setOption(option));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = (event) => {
    if (event.target.value === "LOGOUT") {
      dispatch(signout());
      dispatch(reset());
    }
  };

  useEffect(() => {
    if (user?.userDetails?.isAdmin) setUsername("ADMIN");
    else if (user?.userDetails?.username)
      setUsername(user?.userDetails?.username);
  }, [user]);

  return (
    <nav>
      <img
        onClick={handleHome}
        src="http://surl.li/hntuu"
        className="logo-img"
        alt="blogger-logo"
      />
      <div className="menu-icon" onClick={toggleMenu}>
        &#9776;
      </div>

      <ul
        className={`${menuOpen ? "menu menu-open" : "menu"} ${!home && "home"}`}
      >
        <li key="media">
          <Link
            to={MEDIA}
            onClick={() => {
              handleOptions("MEDIA");
            }}
            className={`link-router-dom ${isMedia && "nav-option"}`}
          >
            Media
          </Link>
        </li>
        {user && (
          <>
            <li key="createblog" className={isNewBlog && "nav-option"}>
              <Link
                to={CREATE_BLOGS}
                className={`link-router-dom ${isNewBlog && "nav-option"}`}
                onClick={() => {
                  handleOptions("NEWBLOG");
                }}
              >
                Create new blog
              </Link>
            </li>
            <li key="showblogs">
              <Link
                to={SHOW_BLOGS}
                className={`link-router-dom ${isMyBlog && "nav-option"}`}
                onClick={() => {
                  handleOptions("MYBLOG");
                }}
              >
                Show my blogs
              </Link>
            </li>
          </>
        )}
        <li key="contact" className={isContact && "nav-option"}>
          <Link
            to={CONTACT}
            className={`link-router-dom ${isContact && "nav-option"}`}
            onClick={() => {
              handleOptions("CONTACT");
            }}
          >
            Contact US
          </Link>
        </li>
        {!user && (
          <li key="login">
            <Link className="link-router-dom" to={REGISTER}>
              Sign Up
            </Link>
          </li>
        )}
      </ul>
      <ul
        className={`${menuOpen ? "menu menu-open" : "menu"} ${
          !home && "home"
        } ${user ? "second-ul-auth" : "second-ul-no-auth"}`}
      >
        {user ? (
          <li key="logout">
            <select
              className="dropdown-nav"
              defaultValue={username}
              onChange={handleLogout}
            >
              <option key={username} value={username} selected disabled>
                {username}
              </option>
              <option value="LOGOUT" key="logout">
                Logout
              </option>
            </select>
          </li>
        ) : (
          <li key="register">
            <Link className="link-router-dom" to={LOGIN}>
              <button className="signIn">SignIn</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
