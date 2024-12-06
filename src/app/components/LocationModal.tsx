import React, { FC } from "react";

interface LocationModalProps {
  manualLocation: string;
  setManualLocation: React.Dispatch<React.SetStateAction<string>>;
  handleManualLocationSubmit: () => void;
  closeModal: (e: React.MouseEvent) => void;
}

const LocationModal: FC<LocationModalProps> = ({
  manualLocation,
  setManualLocation,
  handleManualLocationSubmit,
  closeModal,
}) => {
  return (
    <div
      id="modal-backdrop"
      onClick={closeModal}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside modal
        className="bg-white rounded-lg p-6 w-96"
      >
        <h2 className="text-xl font-bold mb-4">Enter Location Manually</h2>
        
        <div className="mt-2">
          <input
            type="text"
            value={manualLocation}
            onChange={(e) => setManualLocation(e.target.value)}
            placeholder="Enter location manually"
            className="border rounded-lg px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button
            onClick={handleManualLocationSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700"
          >
            Submit Location
          </button>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => closeModal(new MouseEvent("click"))}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg w-full hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
