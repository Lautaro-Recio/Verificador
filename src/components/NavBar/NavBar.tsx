interface Props {
  cod: string;
  setSection: (section: number) => void;
}

const NavBar: React.FC<Props> = ({ cod, setSection }) => {
  return (
    <div className={`overflow-hidden ${cod !== "10" ? "w-0" : "w-32 p-4"} h-full absolute z-50 transition-all bg-white border-r-2`}>
      <button className="p-2 bg-slate-300 w-full my-1 cursor-pointer" onClick={() => setSection(1)}>Actualizar Precios</button>
      <button className="p-2 bg-slate-300 w-full my-1 cursor-pointer" onClick={() => setSection(2)}>Subir Ofertas</button>
    </div>
  );
};

export default NavBar;
