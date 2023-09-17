import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Login,
  Register,
  Home,
  Media,
  Contact,
  CreateBlog,
  ShowBlogs,
  ShowOneFullBlog,
  UpdateBlog,
  NotFoundPage,
} from "./components";
import {
  HOME,
  HOME_SEARCH,
  HOME_LOCATION,
  LOGIN,
  REGISTER,
  MEDIA,
  MEDIA_SEARCH,
  MEDIA_LOCATION,
  CONTACT,
  CREATE_BLOGS,
  SHOW_BLOGS,
  SHOW_BLOGS_SEARCH,
  SHOW_BLOGS_LOCATION,
  BLOG_DETAILS,
  UPDATE_BLOGS,
  NOT_FOUND,
} from "./components/constants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path={HOME} element={<Home />} />
        <Route path={HOME_SEARCH} element={<Home />} />
        <Route path={HOME_LOCATION} element={<Home />} />

        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTER} element={<Register />} />

        <Route path={MEDIA} element={<Media />} />
        <Route path={MEDIA_SEARCH} element={<Media />} />
        <Route path={MEDIA_LOCATION} element={<Media />} />

        <Route path={CONTACT} element={<Contact />} />
        <Route path={CREATE_BLOGS} element={<CreateBlog />} />

        <Route path={SHOW_BLOGS} element={<ShowBlogs />} />
        <Route path={SHOW_BLOGS_SEARCH} element={<ShowBlogs />} />
        <Route path={SHOW_BLOGS_LOCATION} element={<ShowBlogs />} />

        <Route path={BLOG_DETAILS} element={<ShowOneFullBlog />} />
        <Route path={UPDATE_BLOGS} element={<UpdateBlog />} />

        <Route path={NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
