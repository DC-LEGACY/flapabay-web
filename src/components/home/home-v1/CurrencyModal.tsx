import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { atom, useAtom } from "jotai";
import { userAtom } from "@/store/authStore";
import { translationsAtom } from "@/store/languageStore";
import { currencyService, type Currency, type Language } from "@/api/services/currency";
import { useToast } from "@/hooks/use-toast";
import { AxiosResponse } from "axios";

// Define Jotai atoms for global state
const currenciesAtom = atom<Currency[]>([]);
const languagesAtom = atom<Language[]>([]);
const loadingAtom = atom(false);
const errorAtom = atom<string | null>(null);

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
}

const CurrencyModal: React.FC<CurrencyModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [activeTab, setActiveTab] = useState("Language and Region");
  const [currencies, setCurrencies] = useAtom(currenciesAtom);
  const [languages, setLanguages] = useAtom(languagesAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [user] = useAtom(userAtom);
  const { toast } = useToast();

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

    const [response, error] = await currencyService.getSupportedLanguages();
    
    if (error) {
      setError("Error fetching languages. Please try again later.");
      toast({
        title: "Error",
        description: "Failed to fetch languages",
        variant: "destructive",
      });
      return;
    }

    if (response?.data.success) {
      setLanguages(response.data.data);
    }
    setLoading(false);
  };

  const fetchCurrencies = async () => {
    setLoading(true);
    setError(null);

    const [response, error] = await currencyService.getSupportedCurrencies();
    
    if (error) {
      setError("Error fetching currencies. Please try again later.");
      toast({
        title: "Error",
        description: "Failed to fetch currencies",
        variant: "destructive",
      });
      return;
    }

    if (response?.data.success) {
      setCurrencies(response.data.data);
    }
    setLoading(false);
  };

  const handleCurrencySelect = async (currencyCode: string) => {
    const [response, error] = await currencyService.setUserCurrency(currencyCode);
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to update currency",
        variant: "destructive",
      });
      return;
    }

    if (response?.data.success) {
      onSelect(currencyCode);
      toast({
        title: "Success",
        description: "Currency updated successfully",
      });
    }
  };

  const handleLanguageSelect = async (languageCode: string) => {
    const [response, error] = await currencyService.setUserLanguage(languageCode);
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to update language",
        variant: "destructive",
      });
      return;
    }

    if (response?.data.success) {
      const [translationsResponse] = await currencyService.getTranslations(languageCode);
      if (translationsResponse?.data.success) {
        // Update translations in global state
        // Implementation depends on your translation management system
      }
      toast({
        title: "Success",
        description: "Language updated successfully",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Language and Region</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoClose size={24} />
          </button>
        </div>

        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 ${
              activeTab === "Language and Region"
                ? "border-b-2 border-blue-500"
                : ""
            }`}
            onClick={() => setActiveTab("Language and Region")}
          >
            Language and Region
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "currency" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("currency")}
          >
            Currency
          </button>
        </div>

        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {activeTab === "currency" ? (
              <div className="space-y-2">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                    onClick={() => handleCurrencySelect(currency.code)}
                  >
                    {currency.name} ({currency.symbol})
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                    onClick={() => handleLanguageSelect(language.code)}
                  >
                    {language.name} ({language.native_name})
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyModal;
