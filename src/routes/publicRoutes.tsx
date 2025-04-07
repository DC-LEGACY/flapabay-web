import About from "@/pages/pages/about";
import Contact from "@/pages/pages/contact";
import Faq from "@/pages/pages/faq";
import Login from "@/pages/pages/login";
import Mainpage from "@/pages";
import NotFound from "@/pages/not-found";
import Register from "@/pages/register";
import { Route } from "react-router-dom";

// Add other public components

const PublicRoutes = () => (
  <>
    <Route index element={<Mainpage />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="faq" element={<Faq />} />
    <Route path="*" element={<NotFound />} />
    {/* Add more public routes here */}
  </>
);

export default PublicRoutes;
