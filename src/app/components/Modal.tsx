import React from "react";

interface ModalProps {
  isPhoneNumberStep: boolean;
  handlePhoneSubmit: () => void;
  handleOtpSubmit: () => void;
  handlePhoneChange: () => any;
  handleOtpChange: () => any;
  setIsModalOpen: (bool: boolean) => any;
  setIsPhoneNumberStep: (bool: boolean) => any;
  phoneNumber: string;
  otp: string;
  phoneError: string;
  isOtpValid: boolean;
  closeModal: (e: React.MouseEvent) => void;
}

export const Modal = ({
  isPhoneNumberStep,
  setIsModalOpen,
  setIsPhoneNumberStep,
  handlePhoneChange,
  handleOtpChange,
  handlePhoneSubmit,
  handleOtpSubmit,
  phoneNumber,
  otp,
  phoneError,
  isOtpValid,
  closeModal,
}: ModalProps) => {
  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20"
      onClick={closeModal}
    >
      <div className="bg-white p-6 rounded-lg w-full sm:w-96 text-center" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-1">
          {isPhoneNumberStep ? "India's last minute app" : "Enter OTP"}
        </h2>
        <div className="text-xs font-normal mb-4">
          {isPhoneNumberStep ? "Log in or Sign up" : null}
        </div>

        {isPhoneNumberStep ? (
          <>
            <input
              type="text"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="Enter your phone number"
              className="border rounded-lg px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            {phoneError && <p className="text-red-500 text-sm mb-4">{phoneError}</p>}
            <button
              onClick={() => {
                handlePhoneSubmit()
                setIsPhoneNumberStep(false);
              }}
              disabled={!/^[0-9]{10}$/.test(phoneNumber)}
              className={`bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700 ${
                !/^[0-9]{10}$/.test(phoneNumber) ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Continue
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter OTP"
              className="border rounded-lg px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button
              onClick={() => {
                handleOtpSubmit()
                setIsModalOpen(false);
              }}
              disabled={!isOtpValid}
              className={`bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700 ${
                !isOtpValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};
