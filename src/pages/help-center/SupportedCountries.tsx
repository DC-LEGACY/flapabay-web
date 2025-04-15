import { Card, CardContent } from "@/components/ui/card";
import { Check, Clock, Globe, Search } from "lucide-react";
import { Global, SearchNormal } from "iconsax-react";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Footer from "@/components/common/default-footer";
import Header from "@/components/common/DefaultHeader";
import { Input } from "@/components/ui/input";
import MobileMenu from "@/components/common/mobile-menu";
import { motion } from "framer-motion";

const SupportedCountries = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const regions = {
    africa: [
      "Algeria",
      "Angola",
      "Benin",
      "Botswana",
      "Burkina Faso",
      "Burundi",
      "Cameroon",
      "Cape Verde",
      "Central African Republic",
      "Chad",
      "Comoros",
      "Congo",
      "Djibouti",
      "Egypt",
      "Equatorial Guinea",
      "Eritrea",
      "Ethiopia",
      "Gabon",
      "Gambia",
      "Ghana",
      "Guinea",
      "Guinea-Bissau",
      "Ivory Coast",
      "Kenya",
      "Lesotho",
      "Liberia",
      "Libya",
      "Madagascar",
      "Malawi",
      "Mali",
      "Mauritania",
      "Mauritius",
      "Morocco",
      "Mozambique",
      "Namibia",
      "Niger",
      "Nigeria",
      "Rwanda",
      "Senegal",
      "Seychelles",
      "Sierra Leone",
      "Somalia",
      "South Africa",
      "South Sudan",
      "Sudan",
      "Swaziland",
      "Tanzania",
      "Togo",
      "Tunisia",
      "Uganda",
      "Zambia",
      "Zimbabwe",
    ],
    americas: [
      "Argentina",
      "Bahamas",
      "Barbados",
      "Belize",
      "Bolivia",
      "Brazil",
      "Canada",
      "Chile",
      "Colombia",
      "Costa Rica",
      "Cuba",
      "Dominican Republic",
      "Ecuador",
      "El Salvador",
      "Guatemala",
      "Haiti",
      "Honduras",
      "Jamaica",
      "Mexico",
      "Nicaragua",
      "Panama",
      "Paraguay",
      "Peru",
      "Puerto Rico",
      "Trinidad and Tobago",
      "United States",
      "Uruguay",
      "Venezuela",
    ],
    asia: [
      "Afghanistan",
      "Bahrain",
      "Bangladesh",
      "Bhutan",
      "Brunei",
      "Cambodia",
      "China",
      "Hong Kong",
      "India",
      "Indonesia",
      "Iran",
      "Iraq",
      "Israel",
      "Japan",
      "Jordan",
      "Kazakhstan",
      "Kuwait",
      "Kyrgyzstan",
      "Laos",
      "Lebanon",
      "Malaysia",
      "Maldives",
      "Mongolia",
      "Myanmar",
      "Nepal",
      "North Korea",
      "Oman",
      "Pakistan",
      "Palestine",
      "Philippines",
      "Qatar",
      "Saudi Arabia",
      "Singapore",
      "South Korea",
      "Sri Lanka",
      "Syria",
      "Taiwan",
      "Tajikistan",
      "Thailand",
      "Timor-Leste",
      "Turkey",
      "Turkmenistan",
      "United Arab Emirates",
      "Uzbekistan",
      "Vietnam",
      "Yemen",
    ],
    europe: [
      "Albania",
      "Andorra",
      "Austria",
      "Belarus",
      "Belgium",
      "Bosnia and Herzegovina",
      "Bulgaria",
      "Croatia",
      "Cyprus",
      "Czech Republic",
      "Denmark",
      "Estonia",
      "Finland",
      "France",
      "Germany",
      "Greece",
      "Hungary",
      "Iceland",
      "Ireland",
      "Italy",
      "Kosovo",
      "Latvia",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Malta",
      "Moldova",
      "Monaco",
      "Montenegro",
      "Netherlands",
      "North Macedonia",
      "Norway",
      "Poland",
      "Portugal",
      "Romania",
      "Russia",
      "San Marino",
      "Serbia",
      "Slovakia",
      "Slovenia",
      "Spain",
      "Sweden",
      "Switzerland",
      "Ukraine",
      "United Kingdom",
      "Vatican City",
    ],
    oceania: [
      "Australia",
      "Fiji",
      "Kiribati",
      "Marshall Islands",
      "Micronesia",
      "Nauru",
      "New Zealand",
      "Palau",
      "Papua New Guinea",
      "Samoa",
      "Solomon Islands",
      "Tonga",
      "Tuvalu",
      "Vanuatu",
    ],
  };

  const comingSoon = [
    "North Korea",
    "Somalia",
    "Syria",
    "Yemen",
    "Afghanistan",
    "Iran",
    "Iraq",
    "Libya",
    "Sudan",
  ];

  const filterCountries = (countries: string[]) => {
    return countries.filter((country) =>
      country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <>
      <Header />
      <MobileMenu />
      <main className="items-center flex-1">
        {/* Hero Section */}
        <section className="px-6 py-20 pb-10 lg:pt-36 md:pt-16 bg-flapabay-yellow">
          <div className="flapabay-container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center pb-4">
                <Global className="w-12 h-12 text-white" />
              </div>
              <motion.h1
                className="pb-4 text-3xl font-bold text-white md:text-4xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Supported Countries
              </motion.h1>
              <motion.p
                className="pt-2 pb-6 text-lg text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Discover where FlapaBay is available for hosts and travelers
              </motion.p>

              <motion.div
                className="relative w-full max-w-3xl mx-auto"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Input
                  type="text"
                  placeholder="Search for a country..."
                  className="w-full px-6 py-8 border rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#FFC500]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* Search Button */}
                <button
                  className="absolute transform top-2.5 rounded-2xl right-3 ud-btn btn-thm ms-2 search-tbn search-btn"
                  type="button"
                  onClick={() => alert("faq")}
                >
                  <SearchNormal color="white" />
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Countries List */}
        <section className="py-16 bg-white">
          <div className="flapabay-container">
            <Tabs defaultValue="africa" className="w-full">
              <TabsList className="justify-start w-full pb-8 overflow-x-auto flex-nowrap whitespace-nowrap">
                <TabsTrigger value="africa">Africa</TabsTrigger>
                <TabsTrigger value="americas">Americas</TabsTrigger>
                <TabsTrigger value="asia">Asia</TabsTrigger>
                <TabsTrigger value="europe">Europe</TabsTrigger>
                <TabsTrigger value="oceania">Oceania</TabsTrigger>
              </TabsList>

              {Object.entries(regions).map(([region, countries]) => (
                <TabsContent key={region} value={region} className="mt-0">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filterCountries(countries).map((country, index) => (
                      <Card
                        key={index}
                        className={`hover:shadow-md transition-shadow ${
                          comingSoon.includes(country) ? "bg-gray-50" : ""
                        }`}
                      >
                        <CardContent className="flex items-center p-4">
                          {comingSoon.includes(country) ? (
                            <Global className="flex-shrink-0 w-5 h-5 mr-3 text-dark" />
                          ) : (
                            <Global className="flex-shrink-0 w-5 h-5 mr-3 text-dark" />
                          )}
                          <div>
                            <p
                              className={
                                comingSoon.includes(country)
                                  ? "text-gray-500"
                                  : ""
                              }
                            >
                              {country}
                            </p>
                            {comingSoon.includes(country) && (
                              <p className="text-xs text-gray-400">
                                Coming soon
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {filterCountries(countries).length === 0 && (
                    <div className="py-12 text-center">
                      <p className="text-gray-500">
                        No countries found matching "{searchTerm}"
                      </p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Currency & Language Support */}
        <section className="py-16 bg-gray-50">
          <div className="flapabay-container">
            <h2 className="pb-12 text-2xl font-bold text-center">
              Currency & Language Support
            </h2>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <h3 className="pb-4 text-xl font-semibold">
                    Supported Currencies
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {[
                      "USD - US Dollar",
                      "EUR - Euro",
                      "GBP - British Pound",
                      "CAD - Canadian Dollar",
                      "AUD - Australian Dollar",
                      "JPY - Japanese Yen",
                      "CNY - Chinese Yuan",
                      "ZAR - South African Rand",
                      "AED - UAE Dirham",
                      "INR - Indian Rupee",
                      "BRL - Brazilian Real",
                      "MXN - Mexican Peso",
                    ].map((currency, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="flex-shrink-0 w-4 h-4 mr-2 text-flapabay-yellow" />
                        <span className="text-sm">{currency}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <h3 className="pb-4 text-xl font-semibold">
                    Supported Languages
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {[
                      "English",
                      "Spanish",
                      "French",
                      "German",
                      "Italian",
                      "Portuguese",
                      "Dutch",
                      "Russian",
                      "Chinese",
                      "Japanese",
                      "Arabic",
                      "Korean",
                      "Hindi",
                      "Swahili",
                      "Turkish",
                      "Thai",
                      "Vietnamese",
                      "Polish",
                    ].map((language, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="flex-shrink-0 w-4 h-4 mr-2 text-flapabay-yellow" />
                        <span className="text-sm">{language}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Regional Support */}
        <section className="py-16 bg-white">
          <div className="flapabay-container">
            <h2 className="pb-8 text-2xl font-bold text-center">
              Regional Support Centers
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  region: "North America",
                  location: "Miami, USA",
                  languages: ["English", "Spanish", "French"],
                  hours: "24/7",
                },
                {
                  region: "Europe",
                  location: "Amsterdam, Netherlands",
                  languages: [
                    "English",
                    "German",
                    "French",
                    "Dutch",
                    "Spanish",
                  ],
                  hours: "24/7",
                },
                {
                  region: "Asia Pacific",
                  location: "Singapore",
                  languages: [
                    "English",
                    "Chinese",
                    "Japanese",
                    "Korean",
                    "Thai",
                  ],
                  hours: "24/7",
                },
                {
                  region: "Middle East",
                  location: "Dubai, UAE",
                  languages: ["English", "Arabic", "French"],
                  hours: "24/7",
                },
                {
                  region: "Africa",
                  location: "Cape Town, South Africa",
                  languages: ["English", "French", "Swahili", "Arabic"],
                  hours: "24/7",
                },
                {
                  region: "South America",
                  location: "São Paulo, Brazil",
                  languages: ["English", "Portuguese", "Spanish"],
                  hours: "24/7",
                },
              ].map((center, index) => (
                <Card key={index} className="shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="pb-2 text-xl font-semibold">
                      {center.region}
                    </h3>
                    <p className="pb-4 text-gray-600">{center.location}</p>

                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium">Languages:</span>
                        <span className="ml-2 text-sm text-gray-600">
                          {center.languages.join(", ")}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Hours:</span>
                        <span className="ml-2 text-sm text-gray-600">
                          {center.hours}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <section className="pb-0 footer-style1 pt60">
        <Footer />
      </section>
    </>
  );
};

export default SupportedCountries;
