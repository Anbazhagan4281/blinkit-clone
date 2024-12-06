import { useState } from "react";

export const usePhoneNumber = () => {
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [phoneError, setPhoneError] = useState<string>("");

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhoneNumber(e.target.value);
		setPhoneError(""); // Clear any previous error
	};

	const handlePhoneSubmit = () => {
		const phoneRegex = /^[0-9]{10}$/;
		if (phoneRegex.test(phoneNumber)) {
			console.log("testtsttsts")
			return true;
		} else {
			setPhoneError("Please enter a valid 10-digit phone number.");
			return false;
		}
	};

	return { phoneNumber, phoneError, handlePhoneChange, handlePhoneSubmit };
};
