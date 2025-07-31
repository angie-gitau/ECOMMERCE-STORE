import React, { useState } from 'react';
import { FaCalculator, FaTimes, FaRobot, FaSpinner } from 'react-icons/fa';
import { estimateQuantityWithAI, validateInputs } from '../utils/aiEstimator';

const AIQuantityEstimator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [materialType, setMaterialType] = useState('');
  const [inputs, setInputs] = useState({
    area: '',
    thickness: '',
    height: '',
    length: '',
    tileSize: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');

  const materialOptions = [
    'Concrete',
    'Bricks',
    'Tiles',
    'Paint',
    'Steel',
    'Wood',
    'Roofing',
    'Insulation'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getInputFields = () => {
    switch (materialType) {
      case 'Concrete':
        return (
          <>
            <input
              type="number"
              name="area"
              placeholder="Area (m²)"
              value={inputs.area}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="number"
              name="thickness"
              placeholder="Thickness (cm)"
              value={inputs.thickness}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
          </>
        );
      case 'Bricks':
        return (
          <>
            <input
              type="number"
              name="area"
              placeholder="Wall Area (m²)"
              value={inputs.area}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="number"
              name="height"
              placeholder="Wall Height (m)"
              value={inputs.height}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="number"
              name="length"
              placeholder="Wall Length (m)"
              value={inputs.length}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
          </>
        );
      case 'Tiles':
        return (
          <>
            <input
              type="number"
              name="area"
              placeholder="Floor Area (m²)"
              value={inputs.area}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              name="tileSize"
              placeholder="Tile Size (e.g., 30x30cm)"
              value={inputs.tileSize}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
          </>
        );
      case 'Paint':
        return (
          <>
            <input
              type="number"
              name="area"
              placeholder="Wall Area (m²)"
              value={inputs.area}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="number"
              name="height"
              placeholder="Wall Height (m)"
              value={inputs.height}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
          </>
        );
      default:
        return (
          <input
            type="number"
            name="area"
            placeholder="Area (m²)"
            value={inputs.area}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
        );
    }
  };

  const estimateQuantity = async () => {
    // Validate inputs
    const errors = validateInputs(materialType, inputs);
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    setIsLoading(true);
    setResult('');

    try {
      const result = await estimateQuantityWithAI(materialType, inputs);
      setResult(result.estimate);
    } catch (error) {
      console.error('Estimation error:', error);
      setResult('Sorry, there was an error calculating your estimate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center space-x-2"
      >
        <FaCalculator className="text-xl" />
        <span className="hidden sm:inline">AI Estimator</span>
      </button>

      {/* Modal Panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <FaRobot className="text-orange-500 text-xl" />
                <h2 className="text-lg font-semibold">AI Quantity Estimator</h2>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setResult('');
                  setInputs({ area: '', thickness: '', height: '', length: '', tileSize: '' });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Material Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Material Type
                </label>
                <select
                  value={materialType}
                  onChange={(e) => setMaterialType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Choose material...</option>
                  {materialOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Dynamic Input Fields */}
              {materialType && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Measurements
                  </label>
                  {getInputFields()}
                </div>
              )}

              {/* Estimate Button */}
              {materialType && (
                <button
                  onClick={estimateQuantity}
                  disabled={isLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Calculating...</span>
                    </>
                  ) : (
                    <>
                      <FaRobot />
                      <span>Get AI Estimate</span>
                    </>
                  )}
                </button>
              )}

              {/* Result */}
              {result && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                  <h3 className="font-semibold text-green-800 mb-2">Estimate Result:</h3>
                  <p className="text-green-700">{result}</p>
                </div>
              )}

              {/* Info */}
              <div className="mt-4 text-xs text-gray-500">
                <p>💡 This estimator uses AI to provide accurate quantity estimates based on your measurements.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIQuantityEstimator; 