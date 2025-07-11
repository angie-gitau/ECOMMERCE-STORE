import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";

const Cart = () => {
  return (
    <div className="min-h-screen p-8">
      <h2 className="text-[18px] font-bold mb-6">Shopping cart</h2>
      <div className="flex gap-8">
        {/*LEFT*/}
        <div className="flex-1 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Your Items</h3>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <img
                src="/cement.jpg"
                alt=""
                className="w-32 h-32 object-cover rounded-md"
              />
              <div className="flex-1 ml-4">
                <h3 className="text-xl font-semibold mb-2">Heading</h3>
                <p className="text-gray-600 mb-2">Message/text</p>
                <div className="flex items-center my-5 p-4">
                  <FaMinus className="bg-orange-600 text-white cursor-pointer p-2 rounded-full mr-4 text-3xl" />
                  <span className="text-lg font-semibold mx-4">1</span>
                  <FaPlus className="bg-orange-600 text-white cursor-pointer p-2 rounded-full mr-4 text-3xl" />
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold mb-6">Ksh 1000</p>
                <FaTrashAlt className="text-red-600 cursor-pointer" />
              </div>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <img
                src="/cement.jpg"
                alt=""
                className="w-32 h-32 object-cover rounded-md"
              />
              <div className="flex-1 ml-4">
                <h3 className="text-xl font-semibold mb-2">Heading</h3>
                <p className="text-gray-600 mb-2">Message/text</p>
                <div className="flex items-center my-5 p-4">
                  <FaMinus className="bg-orange-600 text-white cursor-pointer p-2 rounded-full mr-4 text-3xl" />
                  <span className="text-lg font-semibold mx-4">1</span>
                  <FaPlus className="bg-orange-600 text-white cursor-pointer p-2 rounded-full mr-4 text-3xl" />
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold mb-6">Ksh 1000</p>
                <FaTrashAlt className="text-red-600 cursor-pointer" />
              </div>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <img
                src="/cement.jpg"
                alt=""
                className="w-32 h-32 object-cover rounded-md"
              />
              <div className="flex-1 ml-4">
                <h3 className="text-xl font-semibold mb-2">Heading</h3>
                <p className="text-gray-600 mb-2">Message/text</p>
                <div className="flex items-center my-5 p-4">
                  <FaMinus className="bg-orange-600 text-white cursor-pointer p-2 rounded-full mr-4 text-3xl" />
                  <span className="text-lg font-semibold mx-4">1</span>
                  <FaPlus className="bg-orange-600 text-white cursor-pointer p-2 rounded-full mr-4 text-3xl" />
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold mb-6">Ksh 1000</p>
                <FaTrashAlt className="text-red-600 cursor-pointer" />
              </div>
            </div>
            <button className="bg-red-400 w-[200px] text-white p-3 mt-4 rounded-md font-semibold">
              Clear cart
            </button>
          </div>
        </div>
        {/*RIGHT*/}

        <div className="w-80 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Order summary</h3>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <span className="text-lg font-medium">Subtotal</span>
              <span className="text-lg font-medium">Ksh 2000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-medium">Shipping:</span>
              <span className="text-lg font-medium">Ksh 1000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-medium">Total:</span>
              <span className="text-lg font-medium">Ksh 3000</span>
            </div>
            <button className="bg-orange-600 text-white p-3 w-full rounded-lg font-semibold">
            Proceed to checkout
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
