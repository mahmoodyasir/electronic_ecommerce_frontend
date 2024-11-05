import { Outlet } from "react-router-dom"
import Header from "../component/Navbar/Header/Header"


const GenericLayout = () => {
  return (
    <main className="flex flex-col min-h-screen">

      <Header/>

      <div className="mb-4"></div>
      
      <section className="flex-grow">
        <Outlet />
      </section>
    </main>
  )
}

export default GenericLayout
