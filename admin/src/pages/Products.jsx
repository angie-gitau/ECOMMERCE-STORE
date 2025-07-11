import {DataGrid} from '@mui/x-data-grid';
import {FaTrash} from "react-icons/fa"
import {Link} from "react-router-dom"

const Products = () => {
  const data = [
  {
    _id: "101",
    title: "Cement",
    img:"",
    desc:"build",
    originalPrice: 500.0,
    discountedPrice: 450.0,
    inStock: true,
   },
   {
    _id: "102",
    title: "Cement",
    img:"",
    desc:"build",
    originalPrice: 500.0,
    discountedPrice: 450.0,
    inStock: true,
   },
   {
    _id: "103",
    title: "Cement",
    img:"",
    desc:"build",
    originalPrice: 500.0,
    discountedPrice: 450.0,
    inStock: true,
   },
   {
    _id: "104",
    title: "Cement",
    img:"",
    desc:"build",
    originalPrice: 500.0,
    discountedPrice: 450.0,
    inStock: true,
   },
   {
    _id: "105",
    title: "Cement",
    img:"",
    desc:"build",
    originalPrice: 500.0,
    discountedPrice: 450.0,
    inStock: true,
   },
   {
    _id: "106",
    title: "Cement",
    img:"",
    desc:"build",
    originalPrice: 500.0,
    discountedPrice: 450.0,
    inStock: true,
   },
   {
    _id: "107",
    title: "Cement",
    img:"",
    desc:"build",
    originalPrice: 500.0,
    discountedPrice: 450.0,
    inStock: true,
   },
];

const columns = [
  {field: "_id", headerName: "ID", width: 90},
  {
    field:"product",
    headerName:"Product",
    width:300,
    renderCell:(params)=>{
      return (
        <div className="flex items-center">
          <img className="h-12 w-12 rounded-full object-cover mr-2"
           src={params.row.img} 
           alt=""
           height="50px"
           width="100px"
           />
           {params.row.title}                              
        </div>
      );
    },
  },

  {field:"desc", headerName: "Description", width:150},
  {field:"originalPrice", headerName: "Price (Ksh)", width:100},
  {field:"inStock", headerName: "In Stock", width:100},
  {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <button className="bg-[#9ca3af] text-[#ffffff] cursor-pointer w-[70px]">
                Edit
              </button>
            </Link>
          </>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: () => {
        return (
          <>
            <FaTrash className="text-[#ef4444] cursor-pointer m-2" />
          </>
        );
      },
    },
  ];

  return (
    <div className="p-5 w-[70vw]">
      <div className="flex items-center justify-between m-[30px]">
        <h1 className="m-[20px] text-[20px]">All Products</h1>
        <button className="bg-[#1e1e1e] p-[10px] font-semibold text-[#ffffff]  cursor-pointer">
          Create
        </button>
      </div>
      <div className='m-[30px]'>
      <DataGrid getRowId={(row) => row._id} rows={data} checkboxSelection columns={columns} />
      </div>

    </div>
  );
};

export default Products; 