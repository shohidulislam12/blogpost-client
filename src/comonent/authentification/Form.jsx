import axios from "axios";
import { useState } from "react";


const bankingFields = {
    India: ["Account Number", "IFSC Code", "Bank Name"],
    America: ["Account Number","Routing Number", "Bank Name"],
    bagladesh: ["Account Number","BIC code",  "Bank Name"],
};

const Form = () => {
    const [country, setCountry] = useState("");
    const [formData, setFormData] = useState({});

    // Handle country selection
    const handleCountryChange = (e) => {
        const selected = e.target.value;
        setCountry(selected);

        // Reset form fields based on selected country
        const initialData = bankingFields[selected]?.reduce((data, field) => {
            data[field] = "";
            return data;
        }, {}) || {};

        setFormData(initialData);
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit =async (e) => {
        e.preventDefault();
        console.log("Submitted Data:", { country, ...formData });
        const submitdata={
            country, ...formData }
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/accountinf`,submitdata);
            console.log(response)
        }
       
 

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-xl font-bold mb-4 text-center">Banking Details Form</h2>

            {/* Country Selection */}
            <label className="block font-medium text-gray-700 mb-2">Select Country:</label>
            <select 
                value={country} 
                onChange={handleCountryChange} 
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">-- Select --</option>
                {Object.keys(bankingFields).map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>

            {/* Dynamic Banking Fields */}
            {country && (
                <form onSubmit={handleSubmit} className="mt-4">
                    {bankingFields[country].map((field) => (
                        <div key={field} className="mb-3">
                            <label className="block font-medium text-gray-700">{field}:</label>
                            <input
                                type="text"
                                name={field}
                                value={formData[field] || ""}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    ))}

                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
};

export default Form;
