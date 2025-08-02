const Category = () => {
  return (
    <div className="flex items-center m-3">
      <div className="relative bg-[url('/equipment.jpg')] bg-no-repeat bg-cover bg-center bg-slate-300 h-[500px] w-[400px] flex items-center justify-center m-[20px]">
        <div className="absolute inset-0 bg-gradient-to-1 from-black/50 to-transparent"></div>
        <div className="relative flex items-center justify-center"></div>
        <h1 className="font-semibold text-[30px] text-white">Equipment</h1>
      </div>
      <div className="relative bg-[url('/piping.jpg')] bg-no-repeat bg-cover bg-center bg-slate-300 h-[500px] w-[400px] flex items-center justify-center m-[20px]">
        <div className="absolute inset-0 bg-gradient-to-1 from-black/50 to-transparent"></div>
        <div className="relative flex items-center justify-center"></div>
        <h1 className="font-semibold text-[30px] text-white">Piping</h1>
      </div>
      <div className="relative bg-[url('/buildingblocks.jpg')] bg-no-repeat bg-cover bg-center bg-slate-300 h-[500px] w-[400px] flex items-center justify-center m-[20px]">
        <div className="absolute inset-0 bg-gradient-to-1 from-black/50 to-transparent"></div>
        <div className="relative flex items-center justify-center"></div>
        <h1 className="font-semibold text-[30px] text-white">Building blocks</h1>
      </div>
      <div className="relative bg-[url('/tiling.jpg')] bg-no-repeat bg-cover bg-center bg-slate-300 h-[500px] w-[400px] flex items-center justify-center m-[20px]">
        <div className="absolute inset-0 bg-gradient-to-1 from-black/50 to-transparent"></div>
        <div className="relative flex items-center justify-center"></div>
        <h1 className="font-semibold text-[30px] text-white">Tiling</h1>
      </div>
    </div>
  );
};

export default Category;
