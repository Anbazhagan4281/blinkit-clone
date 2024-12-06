import { useState } from "react";

export const useOtp = () => {
	const [otp, setOtp] = useState<string>("");
	const [isOtpValid, setIsOtpValid] = useState<boolean>(false);

	const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOtp(e.target.value);
		setIsOtpValid(e.target.value.length === 4); // OTP is valid if exactly 4 digits
	};

	return { otp, isOtpValid, handleOtpChange };
};
