import React, { useState, useEffect } from "react";
import { FaUserCircle, FaSearch, FaShoppingCart } from "react-icons/fa";
import { Modal } from "./Modal";
import { useLocation } from "../hooks/useLocation";
import { usePhoneNumber } from "../hooks/usePhoneNumber";
import { useOtp } from "../hooks/useOtp";
import CartDrawer from "./CartDrawer"; // Import CartDrawer
import { useDispatch, useSelector } from "react-redux"; // Import useSelector and useDispatch for Redux
import LocationModal from "./LocationModal";

const Header = () => {
  const { location, setLocation } = useLocation();
  const { phoneNumber, phoneError, handlePhoneChange, handlePhoneSubmit } = usePhoneNumber();
  const { otp, isOtpValid, handleOtpChange } = useOtp();

  const [isPhoneNumberStep, setIsPhoneNumberStep] = useState(true);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Now controlled explicitly on button click
  const [manualLocation, setManualLocation] = useState(""); // Store manual location input
  const [locationError, setLocationError] = useState(""); // Store location error message
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false); 

  const cartItems = useSelector((state: any) => state.cart.items);

  // In LocationModal component
  useEffect(() => {
    console.log("Location Modal is open", isLocationModalOpen);
  }, [isLocationModalOpen]);


  // Function to fetch geolocation
  const getGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocationDetails(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error: ", error);
          setLocationError("Unable to retrieve your location. Please enter it manually.");
          setLocation(null); // Location not available
          setIsLocationModalOpen(true); 
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setLocationError("Geolocation is not supported. Please enter it manually.");
      setLocation(null); // Location not available
      setIsLocationModalOpen(true); 
    }
  };

  // Function to fetch location details from the API using coordinates
  const fetchLocationDetails = async (latitude: number, longitude: number) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const userLocation = data.results[0]?.formatted_address;

      if (userLocation) {
        setLocation(userLocation);
        localStorage.setItem("userLocation", userLocation);
        setLocationError(""); // Clear error if location found
      } else {
        setLocation(null); // Location not found
        setLocationError("Unable to find your location.");
        setIsLocationModalOpen(true);

      }
    } catch (error) {
      console.error("Error fetching location:", error);
      setLocation(null); // Error fetching location
      setLocationError("Unable to retrieve your location. Please enter it manually.");
      setIsLocationModalOpen(true);
    }
  };

  // Function to handle the manual location submission
  const handleManualLocationSubmit = () => {
    if (manualLocation.trim()) {
      setLocation(manualLocation);
      localStorage.setItem("userLocation", manualLocation);
      setLocationError(""); // Clear error on manual input
      setIsLocationModalOpen(true); 
    } else {
      setLocationError("Please enter a valid location.");
    }
  };

  // On component mount, check if a saved location exists or attempt to get geolocation
  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setLocation(savedLocation);
    } else {
      getGeolocation(); // Attempt to get geolocation on component mount
    }
  }, []);

  // Close modal if clicked outside
  const closeModal = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "modal-backdrop") {
      setIsModalOpen(false);
    }
  };

  return (
    <header className="bg-white p-4 border-b">
      <div className="w-full flex flex-col md:flex-row justify-between items-center mx-auto">
        <div className="flex md:hidden w-full flex-col space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <div className="text-lg font-extrabold text-gray-700">Delivery in 0 mins {isLocationModalOpen}</div>
              <div className="text-sm text-gray-500">({location || "location"})</div>
            </div>

            <button onClick={() => setIsModalOpen(true)}>
              <FaUserCircle className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center relative">
            <input
              type="text"
              placeholder="Search products"
              className="border rounded-lg px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <FaSearch className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="hidden md:flex w-full flex-row justify-between items-center">
          <div className="flex items-center p-2 rounded-md">
            <img src="/assets/images/logo.webp" alt="Logo" className="h-8" />
          </div>
          <div className="border-l-[1px] h-16"></div>

          <div>
            <div className="text-lg font-bold text-gray-700">Delivery in 0 mins {isLocationModalOpen}</div>
            <div className="text-sm text-gray-500">({location || "location"})</div>
          </div>

          <div className="border-l-[1px] h-16"></div>

          <div className="flex w-7/12 bg-red-50 items-center relative space-x-4">
            <input
              type="text"
              placeholder="Search products"
              className="border rounded-lg px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <FaSearch className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          <div className="flex items-center space-x-6">
            <button
              className="text-sm text-green-600 font-semibold hover:underline"
              onClick={() => setIsModalOpen(true)} // Open modal on login button click
            >
              Login
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm hover:bg-green-700"
              onClick={() => setIsCartDrawerOpen(true)} // Open the cart drawer
            >
              <FaShoppingCart />
              {cartItems.length > 0 ? (
                <span className="ml-2 text-sm font-bold text-white rounded-full px-2">
                  {cartItems.length} ({cartItems.reduce((total, el) => total + parseFloat(el.price.replace("₹", "")) * el.quantity, 0).toFixed(2)})
                </span>
              ) : (
                <span>My Cart</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Location Input (manual) */}

      {isLocationModalOpen && (
        <LocationModal
          manualLocation={manualLocation}
          setManualLocation={setManualLocation}
          handleManualLocationSubmit={handleManualLocationSubmit}
          closeModal={closeModal}
          setIsLocationModalOpen={setIsLocationModalOpen}
          
        />
      )}

      {/* Login Modal */}
      {isModalOpen && (
        <Modal
          handlePhoneChange={handlePhoneChange}
          handleOtpChange={handleOtpChange}
          setIsPhoneNumberStep={setIsPhoneNumberStep}
          isPhoneNumberStep={isPhoneNumberStep}
          setIsModalOpen={setIsModalOpen}
          handlePhoneSubmit={handlePhoneSubmit}
          handleOtpSubmit={() => console.log("OTP Submitted")}
          phoneNumber={phoneNumber}
          otp={otp}
          phoneError={phoneError}
          isOtpValid={isOtpValid}
          closeModal={closeModal}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
    </header>
  );
};

export default Header;
