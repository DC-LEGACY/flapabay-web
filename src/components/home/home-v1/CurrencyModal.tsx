import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { atom, useAtom } from "jotai";
import { userAtom } from "@/store/authStore";
import { useSetAtom } from "jotai";
import { translationsAtom } from "@/store/languageStore";
// import { data } from "react-router-dom"; Remove data import since it's not exported from react-router-dom



// Define Jotai atoms for global state
const currenciesAtom = atom<Currency[]>([]);
const languagesAtom = atom<Language[]>([]);
const loadingAtom = atom(false);
const errorAtom = atom<string | null>(null);

const API_URL =
  "https://localhost:8000/api/v1/get-supported-currencies";
const API_LANGUAGES =
  "https://localhost:8000/api/v1/supported-lang";
const API_SET_CURRENCY =
  "https://localhost:8000/api/v1/set-user-currency";
const API_SET_LANGUAGE =
  "https://localhost:8000/api/v1/supported-lang";
  const API_TRANSLATIONS = "https://localhost:8000/api/v1/translations";

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface Language {
  code: string;
  name: string;
}

const CurrencyModal = ({
  isOpen,
  onClose,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
}) => {
  const [activeTab, setActiveTab] = useState("Language and Region");
  const [currencies, setCurrencies] = useAtom(currenciesAtom);
  const [languages, setLanguages] = useAtom(languagesAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  //  const [user, setUser] = useAtom(userAtom);
  const [user] = useAtom(userAtom);
  useEffect(() => {
    if (activeTab === "currency") {
      fetchCurrencies();
    } else if (activeTab === "Language and Region") {
      fetchLanguages();
    }
  }, [activeTab]);

  const fetchLanguages = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(API_LANGUAGES, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      if (response.data.success) {
        setLanguages(response.data.data);
      } else {
        throw new Error("Failed to fetch languages.");
      }
    } catch (err) {
      setError("Error fetching languages. Unauthorized access.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrencies = async () => {
    setLoading(true);
    setError(null);

    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    console.log("heelo", token);

    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach auth token
        },
      });

      if (response.data.success) {
        setCurrencies(response.data.data);
      } else {
        throw new Error("Failed to fetch currencies.");
      }
    } catch (err) {
      setError("Error fetching currencies. Unauthorized access.");
    } finally {
      setLoading(false);
    }
  };

  const setUserCurrency = async (currencyCode: string) => {
    if (!user || !user.user || !user.user.id) {
      console.error("User ID is missing.", user);
      setError("User ID is missing.");
      return;
    }

    setLoading(true);
    setError(null);

    console.log("Sending request with:", {
      user_id: user.user.id, // FIXED: Access user.user.id
      currency: currencyCode,
    });

    try {
      const response = await axios.post(
        API_SET_CURRENCY,
        { user_id: user.user.id, currency: currencyCode }, // FIXED
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      console.log("Response:", response.data);

      if (response.data.success) {
        console.log("Currency updated successfully");
      } else {
        throw new Error("Failed to update currency.");
      }
    } catch (err) {
      console.error(
        "Error updating currency:",
        err.response?.data || err.message
      );
      setError("Error updating currency.");
    } finally {
      setLoading(false);
    }
  };

  const setUserLanguage = async (languageCode: string, languageName: string) => {
    if (!user || !user.user || !user.user.id) {
      console.error("User ID is missing.", user);
      setError("User ID is missing.");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    console.log("Sending request with:", {
      user_id: user.user.id, 
      code: languageCode,
      name: languageName, // ✅ Added name field
    });
  
    try {
      const response = await axios.post(
        API_LANGUAGES, 
        { 
          user_id: user.user.id, 
          code: languageCode, 
          name: languageName // ✅ Ensure name is included
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
  
      console.log("Response:", response.data);
  
      if (response.data.success) {
        console.log("Language updated successfully");
        fetchTranslations();
       
      } else {
        throw new Error("Failed to update language.");
      }
    } catch (err) {
      console.error("Error updating language:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Error updating language.");
    } finally {
      setLoading(false);
    }
  };
  
  const fetchTranslations = async () => {
    try {
      const response = await axios.get(API_TRANSLATIONS, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
  
      if (response.data.success) {
        setTranslations(response.data.data); // Store in global state
        console.log(data)
      } else {
        throw new Error("Failed to fetch translations.");
      }
    } catch (err) {
      console.error("Error fetching translations:", err.response?.data || err.message);
    }
  };
  
  const setTranslations = useSetAtom(translationsAtom);
  

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto shadow-lg relative z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          <IoClose />
        </button>
        <div className="flex border-b mb-4 w-96">
          <button
            className={`flex-1 p-2 font-medium ${
              activeTab === "Language and Region"
                ? "border-b-2 border-black"
                : ""
            }`}
            onClick={() => setActiveTab("Language and Region")}
          >
            Language and Region
          </button>
          <button
            className={`flex-1 p-2 font-medium ${
              activeTab === "currency" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setActiveTab("currency")}
          >
            Currency
          </button>
        </div>

        {activeTab === "currency" && loading && (
          <div className="flex justify-center items-center my-6">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {activeTab === "Language and Region" && loading && (
          <div className="flex justify-center items-center my-6">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {activeTab === "currency" && error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {(activeTab === "Language and Region" ? languages : currencies).map(
            (item: any) => (
              <li
                key={item.code || item}
                className="p-3 border rounded-lg cursor-pointer hover:text-white hover:bg-[#ffc500] text-sm"
                onClick={() => {
                  if (activeTab === "Language and Region") {
                    setUserLanguage(item.code,item.name); // Use setUserLanguage for languages
                  } else {
                    setUserCurrency(item.code); // Use setUserCurrency for currencies
                  }
                  onSelect(item.code || item);
                  onClose();
                }}


               
              >
                <p className=" flex items-center justify-between">
                  <p>{item.name || item}</p>
                  <p>({item.code})</p>
                </p>

                {activeTab === "currency" && (
                  <p className="font-medium">{item.symbol}</p>
                )}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default CurrencyModal;
