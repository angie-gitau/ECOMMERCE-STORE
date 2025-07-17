import { FaPlus, FaTrash } from "react-icons/fa";
import axios from "axios";
import { userRequest } from "../requestMethods";
import { useState } from "react";

const NewProduct = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputs, setInputs] = useState({});
  const [uploading, setUploading] = useState("Uploading is 0%");
  const [selectedOptions, setSelectedOptions] = useState({
    concern: [],
    projectType: [],
    categories: [],
  });

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: [...prev[name], value],
    }));
  };

  const handleRemoveOption = (name, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: prev[name].filter((options) => options !== value),
    }));
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", selectedImage);
    data.append("upload_preset", "uploads");

    setUploading("Uploading ...");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dhy4x59zy/image/upload",
        data
      );

      const { url } = uploadRes.data;

      setUploading("Uploaded 100%");
      await userRequest.post("/products", {
        img: url,
        ...inputs,
        ...selectedOptions,
      });
    } catch (error) {
      console.log(error);
      setUploading("Uploading failed");
    }
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-center mb-5">
        <h1 className="text-2xl font-semibold">New Product</h1>
      </div>

      <div className="mt-5 bg-[#ffffff] p-5 shadow-lg rounded-lg">
        <form className="flex flex-col md:flex-row rounded-lg">
          {/* LEFT */}
          <div className="flex-1 space-y-5">
            <div>
              <label className="font-semibold">Product Image:</label>
              {!selectedImage ? (
                <div className="border-2 h-[100px] w-[100px] border-[#444] border-solid rounded-md">
                  <div className="flex items-center justify-center mt-[40px]">
                    <label htmlFor="file" className="cursor-pointer">
                      <FaPlus className="text-[20px]" />
                    </label>
                  </div>
                </div>
              ) : (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Product"
                  className="h-[100px] w-[100px] object-cover rounded-md"
                />
              )}
              <input
                type="file"
                id="file"
                onChange={imageChange}
                style={{ display: "none" }}
              />
            </div>

            <span className="text-[#22c55e]">{uploading}</span>

            <div>
              <label className="block mb-2 font-semibold">Product Name</label>
              <input
                type="text"
                name="title"
                id=""
                placeholder="Product Name"
                className="w-full p-2 border-[#d1d5db] rounded"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">
                Product Description
              </label>
              <textarea
                type="text"
                name="desc"
                cols={15}
                rows={7}
                placeholder="Product Description"
                className="w-full p-2 border-[#d1d5db] rounded"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">
                Product Original Price
              </label>
              <input
                type="number"
                name="originalPrice"
                id=""
                placeholder="Ksh100"
                className="w-full p-2 border-[#d1d5db] rounded"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">
                Product Discounted Price
              </label>
              <input
                type="number"
                name="discountedPrice"
                placeholder="Ksh80"
                className="w-full p-2 border-[#d1d5db] rounded"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="ml-5 flex-1 space-y-5">
            <div>
              <label className="block mb-2 font-semibold">
                Wholesale Price
              </label>
              <input
                type="number"
                name="wholesalePrice"
                placeholder="Ksh80"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">
                Wholesale Minimum Quantity
              </label>
              <input
                type="number"
                name="wholesaleMinimumQuantity"
                id=""
                placeholder="10"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Brand</label>
              <input
                type="text"
                name="brand"
                id=""
                placeholder="Simba cement"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Concern</label>
              <select
                name="concern"
                id=""
                className="border-2 border-[#444] border-solid p-2 mb-4 sm:mb-0 sm:mr-4"
                onChange={handleSelectChange}
              >
                <option disabled defaultValue>
                  Select Concern
                </option>
                <option>Structural Materials</option>
                <option>Cement & Concrete</option>
                <option>Steel & Reinforcement</option>
                <option>Bricks & Blocks</option>
                <option>Wood & Timber</option>
                <option>Roofing Materials</option>
                <option>Flooring & Tiles</option>
                <option>Doors & Windows</option>
                <option>Paints & Coatings</option>
                <option>Plumbing & Pipes</option>
                <option>Electrical Components</option>
                <option>Lighting Fixtures</option>
                <option>Glass & Glazing</option>
                <option>Insulation Materials</option>
                <option>Wall Panels & Cladding</option>
                <option>Waterproofing Solutions</option>
                <option>Fasteners & Adhesives</option>
                <option>Hand Tools</option>
                <option>Power Tools</option>
                <option>Safety Equipment & Gear</option>
                <option>Heavy Machinery & Equipment</option>
                <option>Landscaping & Outdoor Materials</option>
                <option>Drainage & Plumbing Fixtures</option>
                <option>Interior Finishes & Decor</option>
                <option>Sealants & Bonding Agents</option>
              </select>
            </div>
            <div className="mt-2">
              {selectedOptions.concern.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <span>{option}</span>
                  <FaTrash
                    className="cursor-pointer text-[#ef4444]"
                    onClick={() => handleRemoveOption("concern", option)}
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block mb-2 font-semibold">Project Type</label>
              <select
                name="projectType"
                id=""
                className="border-2 border-[#444] border-solid p-2 mb-4 sm:mb-0 sm:mr-4"
                onChange={handleSelectChange}
              >
                <option disabled defaultValue>
                  Select Project Type
                </option>
                <option>All</option>
                <option>Foundation Work</option>
                <option>Repairs & Maintenance</option>
                <option>Ongoing Construction</option>
                <option>Detailing</option>
              </select>
            </div>

            <div className="mt-2">
              {selectedOptions.projectType.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <span>{option}</span>
                  <FaTrash
                    className="cursor-pointer text-[#ef4444]"
                    onClick={() => handleRemoveOption("projectType", option)}
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block mb-2 font-semibold">Category</label>
              <select
                name="categories"
                className="border-2 border-[#444] border-solid p-2 mb-4 sm:mb-0 sm:mr-4"
                id=""
                onChange={handleSelectChange}
              >
                <option disabled defaultValue>
                  Category
                </option>
                <option>Structural Materials</option>
                <option>Finishing Materials</option>
                <option>Tools & Equipment</option>
                <option>Plumbing, Electrical & Safety</option>
              </select>
            </div>

            <div className="mt-2">
              {selectedOptions.categories.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <span>{option}</span>
                  <FaTrash
                    className="cursor-pointer text-[#ef4444]"
                    onClick={() => handleRemoveOption("categories", option)}
                  />
                </div>
              ))}
            </div>

            <button
              className="bg-[#64748B] text-[#ffffff] py-2 px-4 rounded"
              onClick={handleUpload}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
