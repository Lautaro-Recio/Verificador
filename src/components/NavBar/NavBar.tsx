import { useState } from "react";
import menu from "../../assets/imgs/menu-outline.svg"
interface Props {
  navBar: boolean;
  setSection: (section: number) => void;
  setNavBar: (section: boolean) => void;
}

const NavBar: React.FC<Props> = ({ navBar, setSection, setNavBar }) => {
  const [openNav, setOpenNav] = useState(false)

  return (
    <div className="absolute z-50 h-full">
      <button onClick={() => setOpenNav(!openNav)} className={`overflow-hidden ${!navBar ? "w-0" : "w-auto py-2 px-10"} `}><img src={menu} className="w-10 h-10 ml-4" alt="Menu" /></button>
      <div className={`overflow-hidden ${openNav ? " w-48  p-4" : " w-0"}  h-full absolute z-50 transition-all bg-white border-r-2`}>
        <button className="border-2 p-2 rounded-lg text-orangeMedit border-orangeMedit text-base w-full my-4 bg-white font-bold hover:bg-orangeMedit hover:text-white transition-all" onClick={() => setSection(1)}>Actualizar Precios</button>
        <button className="border-2 p-2 rounded-lg text-orangeMedit border-orangeMedit text-base w-full my-4 bg-white font-bold hover:bg-orangeMedit hover:text-white transition-all" onClick={() => setSection(2)}>Subir Ofertas</button>
        <button className="border-2 p-2 rounded-lg text-orangeMedit border-orangeMedit text-base w-full my-4 bg-white font-bold hover:bg-orangeMedit hover:text-white transition-all" onClick={() => { setSection(0), setOpenNav(false), setNavBar(false) }}>Verificar Precios</button>
      </div>
    </div>
  );
};

export default NavBar;
