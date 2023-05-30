import { Outlet } from "react-router-dom";
import Navbar from "../Conponents/Shared/Navbar/Navbar";

const Main = () => {
  return (
    <section>
      <Navbar />
      <article className="pt-28 pb-20">
      <Outlet />
      </article>
    </section>
  )
}

export default Main;
