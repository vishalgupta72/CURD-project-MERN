import { useState } from "react"

const Navbar = ({setSearch}) =>{
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () =>{
        setShowMenu(prev => !prev);
    }
    return(
        <header className="shadow">
        <nav className="container mx-auto  px-6 py-2">
            <div className="flex items-center justify-between">
            <div className=" font-bold text-xl">
                <a href="#" className="md:text-2xl text-sm">CRUD-app</a>
            </div>

            <div className="flex justify-center">
              <input type="text" className="p-2 sm:w-96 border border-gray-300 rounded" placeholder="Search for a user"
              onChange={(e) => setSearch(e.target.value)}
              />
              
            </div>
            <div className="hidden md:block">
                <ul className="flex items-center space-x-8">
                <li><a href="#" className="">Home</a></li>
                <li><a href="#" className="">About</a></li>
                <li><a href="#" className="">Services</a></li>
                <li><a href="#" className="">Contact</a></li>
                </ul>
            </div>
            <div className="md:hidden">
                <button className="outline-none mobile-menu-button" onClick={toggleMenu}>
                <svg className="w-6 h-6 " x-show="!showMenu" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
                </button>
            </div>
            </div>

             {/* Toggle the mobile menu based on state */}
            <div className={`mobile-menu ${showMenu ? 'block' : 'hidden'}`}>
            <ul className="mt-4 space-y-4">
                <li><a href="#" className="block px-4 py-2  bg-gray-900 rounded">Home</a></li>
                <li><a href="#" className="block px-4 py-2  bg-gray-900 rounded">About</a></li>
                <li><a href="#" className="block px-4 py-2  bg-gray-900 rounded">Services</a></li>
                <li><a href="#" className="block px-4 py-2  bg-gray-900 rounded">Contact</a></li>
            </ul>
            </div>
            
        </nav>
        </header>
    )
}

export default Navbar