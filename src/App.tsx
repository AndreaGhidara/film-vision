import { Outlet } from "react-router-dom"
import Navbar from "./components/custom/Navbar"


function App() {

  return (
    <>
      <div className="flex min-h-screen w-full flex-col ">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
          <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default App
