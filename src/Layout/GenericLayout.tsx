import { Outlet } from "react-router-dom"
import Header from "../component/Navbar/Header/Header"
import Footer from "./Footer"


const GenericLayout = () => {
  return (
    <main className="flex flex-col min-h-screen">

      <Header />

      <section className="flex-grow">
        <Outlet />
      </section>

      <Footer />

    </main>
  )
}

export default GenericLayout
