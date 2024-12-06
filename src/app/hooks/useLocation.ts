import { useState, useEffect } from "react";

export const useLocation = () => {
	const [location, setLocation] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [manualLocation, setManualLocation] = useState<string>("");

	// Function to get geolocation if available
	const getGeolocation = () => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					fetchLocationDetails(latitude, longitude);
				},
				(error) => {
					console.error("Geolocation error: ", error);
					setIsModalOpen(true); // Show the modal for manual input
				}
			);
		} else {
			console.log("Geolocation is not supported by this browser.");
			setIsModalOpen(true); // Show the modal if geolocation is not supported
		}
	};

	// Fetch location details from a geocoding API using the coordinates
	const fetchLocationDetails = async (latitude: number, longitude: number) => {
		const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
		const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

		try {
			const response = await fetch(url);
			const data = await response.json();
			const userLocation = data.results[0]?.formatted_address;

			if (userLocation) {
				setLocation(userLocation);
				localStorage.setItem("userLocation", userLocation);
			} else {
				setIsModalOpen(true); // Show modal if location is not found
			}
		} catch (error) {
			console.error("Error fetching location:", error);
			setIsModalOpen(true); // Show modal if there's an error in fetching location
		}
	};

	// Function to handle manual location input
	const handleManualLocationSubmit = () => {
		if (manualLocation.trim()) {
			setLocation(manualLocation);
			localStorage.setItem("userLocation", manualLocation);
			setIsModalOpen(false); // Close the modal once location is set
		} else {
			alert("Please enter a valid location.");
		}
	};

	// Effect to check for saved location or attempt to fetch the geolocation
	useEffect(() => {
		const savedLocation = localStorage.getItem("userLocation");
		if (savedLocation) {
			setLocation(savedLocation);
		} else {
			getGeolocation();
		}
	}, []);

	return {
		location,
		setLocation,
		isModalOpen,
		setIsModalOpen,
		manualLocation,
		setManualLocation,
		handleManualLocationSubmit,
	};
};
