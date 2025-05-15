
// Country data with flags, currencies and payment methods
export type Country = {
  code: string;
  name: string;
  flag: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
    rate: number; // Exchange rate to USD
  };
  paymentMethods: Array<"mobile-money" | "stripe" | "wire">;
  mobileProviders?: Array<{
    id: string;
    name: string;
    logo?: string;
  }>;
};

export const countries: Country[] = [
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    currency: {
      code: "USD",
      name: "US Dollar",
      symbol: "$",
      rate: 1
    },
    paymentMethods: ["stripe", "wire"]
  },
  {
    code: "ZM",
    name: "Zambia",
    flag: "🇿🇲",
    currency: {
      code: "ZMW",
      name: "Zambian Kwacha",
      symbol: "K",
      rate: 26.3
    },
    paymentMethods: ["mobile-money", "wire"],
    mobileProviders: [
      { id: "mtn", name: "MTN Mobile Money" },
      { id: "airtel", name: "Airtel Money" },
      { id: "zamtel", name: "Zamtel Money" }
    ]
  },
  {
    code: "TZ",
    name: "Tanzania",
    flag: "🇹🇿",
    currency: {
      code: "TZS",
      name: "Tanzanian Shilling",
      symbol: "TSh",
      rate: 2550
    },
    paymentMethods: ["mobile-money", "wire"],
    mobileProviders: [
      { id: "vodacom", name: "M-Pesa" },
      { id: "airtel", name: "Airtel Money" },
      { id: "tigo", name: "Tigo Pesa" },
      { id: "halotel", name: "Halotel Money" }
    ]
  },
  {
    code: "NG",
    name: "Nigeria",
    flag: "🇳🇬",
    currency: {
      code: "NGN",
      name: "Nigerian Naira",
      symbol: "₦",
      rate: 1560.3
    },
    paymentMethods: ["mobile-money", "wire"],
    mobileProviders: [
      { id: "mtn", name: "MTN Mobile Money" },
      { id: "airtel", name: "Airtel Money" },
      { id: "9mobile", name: "9Mobile Money" },
      { id: "opay", name: "OPay" },
      { id: "palmpay", name: "PalmPay" }
    ]
  },
  {
    code: "KE",
    name: "Kenya",
    flag: "🇰🇪",
    currency: {
      code: "KES",
      name: "Kenyan Shilling",
      symbol: "KSh",
      rate: 129.8
    },
    paymentMethods: ["mobile-money", "wire"],
    mobileProviders: [
      { id: "mpesa", name: "M-Pesa" },
      { id: "airtel", name: "Airtel Money" },
      { id: "equitel", name: "Equitel Money" }
    ]
  },
  {
    code: "MW",
    name: "Malawi",
    flag: "🇲🇼",
    currency: {
      code: "MWK",
      name: "Malawian Kwacha",
      symbol: "MK",
      rate: 1700
    },
    paymentMethods: ["mobile-money", "wire"],
    mobileProviders: [
      { id: "airtel", name: "Airtel Money" },
      { id: "tnm", name: "TNM Mpamba" }
    ]
  },
  {
    code: "GH",
    name: "Ghana",
    flag: "🇬🇭",
    currency: {
      code: "GHS",
      name: "Ghanaian Cedi",
      symbol: "₵",
      rate: 13.5
    },
    paymentMethods: ["mobile-money", "wire"],
    mobileProviders: [
      { id: "mtn", name: "MTN Mobile Money" },
      { id: "vodafone", name: "Vodafone Cash" },
      { id: "airteltigo", name: "AirtelTigo Money" }
    ]
  },
  {
    code: "RW",
    name: "Rwanda",
    flag: "🇷🇼",
    currency: {
      code: "RWF",
      name: "Rwandan Franc",
      symbol: "RF",
      rate: 1250
    },
    paymentMethods: ["mobile-money", "wire"],
    mobileProviders: [
      { id: "mtn", name: "MTN Mobile Money" },
      { id: "airtel", name: "Airtel Money" }
    ]
  },
  {
    code: "LS",
    name: "Lesotho",
    flag: "🇱🇸",
    currency: {
      code: "LSL",
      name: "Lesotho Loti",
      symbol: "L",
      rate: 18.5
    },
    paymentMethods: ["mobile-money", "wire"],
    mobileProviders: [
      { id: "mpesa", name: "M-Pesa" },
      { id: "ecocash", name: "EcoCash" }
    ]
  },
  {
    code: "SN",
    name: "Senegal",
    flag: "🇸🇳",
    currency: {
      code: "XOF",
      name: "West African CFA franc",
      symbol: "CFA",
      rate: 608
    },
    paymentMethods: ["mobile-money", "wire"],
    mobileProviders: [
      { id: "orange", name: "Orange Money" },
      { id: "free", name: "Free Money" },
      { id: "wave", name: "Wave" }
    ]
  },
  {
    code: "MZ",
    name: "Mozambique",
    flag: "🇲🇿",
    currency: {
      code: "MZN",
      name: "Mozambican Metical",
      symbol: "MT",
      rate: 63.8
    },
    paymentMethods: ["mobile-money", "wire"],
    mobileProviders: [
      { id: "vodacom", name: "M-Pesa" },
      { id: "tmcel", name: "TMcel Mobile Money" }
    ]
  },
  {
    code: "UG",
    name: "Uganda",
    flag: "🇺🇬",
    currency: {
      code: "UGX",
      name: "Ugandan Shilling",
      symbol: "USh",
      rate: 3780
    },
    paymentMethods: ["mobile-money", "wire"],
    mobileProviders: [
      { id: "mtn", name: "MTN Mobile Money" },
      { id: "airtel", name: "Airtel Money" }
    ]
  },
  {
    code: "GA",
    name: "Gabon",
    flag: "🇬🇦",
    currency: {
      code: "XAF",
      name: "Central African CFA franc",
      symbol: "FCFA",
      rate: 608
    },
    paymentMethods: ["mobile-money", "wire"],
    mobileProviders: [
      { id: "airtel", name: "Airtel Money" },
      { id: "moov", name: "Moov Money" }
    ]
  },
  {
    code: "CM",
    name: "Cameroon",
    flag: "🇨🇲",
    currency: {
      code: "XAF",
      name: "Central African CFA franc",
      symbol: "FCFA",
      rate: 608
    },
    paymentMethods: ["mobile-money", "wire"],
    mobileProviders: [
      { id: "mtn", name: "MTN Mobile Money" },
      { id: "orange", name: "Orange Money" }
    ]
  },
  {
    code: "BF",
    name: "Burkina Faso",
    flag: "🇧🇫",
    currency: {
      code: "XOF",
      name: "West African CFA franc",
      symbol: "CFA",
      rate: 608
    },
    paymentMethods: ["mobile-money", "wire"],
    mobileProviders: [
      { id: "orange", name: "Orange Money" },
      { id: "moov", name: "Moov Money" }
    ]
  },
  {
    code: "BJ",
    name: "Benin",
    flag: "🇧🇯",
    currency: {
      code: "XOF",
      name: "West African CFA franc",
      symbol: "CFA",
      rate: 608
    },
    paymentMethods: ["mobile-money", "wire"],
    mobileProviders: [
      { id: "mtn", name: "MTN Mobile Money" },
      { id: "moov", name: "Moov Money" }
    ]
  },
  {
    code: "CI",
    name: "Ivory Coast",
    flag: "🇨🇮",
    currency: {
      code: "XOF",
      name: "West African CFA franc",
      symbol: "CFA",
      rate: 608
    },
    paymentMethods: ["mobile-money", "wire"],
    mobileProviders: [
      { id: "mtn", name: "MTN Mobile Money" },
      { id: "orange", name: "Orange Money" },
      { id: "moov", name: "Moov Money" }
    ]
  },
  {
    code: "SL",
    name: "Sierra Leone",
    flag: "🇸🇱",
    currency: {
      code: "SLL",
      name: "Sierra Leonean Leone",
      symbol: "Le",
      rate: 19700
    },
    paymentMethods: ["mobile-money", "wire"],
    mobileProviders: [
      { id: "orange", name: "Orange Money" },
      { id: "africell", name: "Africell Money" }
    ]
  },
  {
    code: "CD",
    name: "DR Congo",
    flag: "🇨🇩",
    currency: {
      code: "CDF",
      name: "Congolese Franc",
      symbol: "FC",
      rate: 2650
    },
    paymentMethods: ["mobile-money", "wire"],
    mobileProviders: [
      { id: "mpesa", name: "M-Pesa" },
      { id: "orange", name: "Orange Money" },
      { id: "airtel", name: "Airtel Money" }
    ]
  },
  {
    code: "CG",
    name: "Congo Brazzaville",
    flag: "🇨🇬",
    currency: {
      code: "XAF",
      name: "Central African CFA franc",
      symbol: "FCFA",
      rate: 608
    },
    paymentMethods: ["mobile-money", "wire"],
    mobileProviders: [
      { id: "mtn", name: "MTN Mobile Money" },
      { id: "airtel", name: "Airtel Money" }
    ]
  }
];

// Function to get currency exchange rates
export const getExchangeRates = (): Array<{currency: string, symbol: string, rate: number}> => {
  return countries.map(country => ({
    currency: country.currency.code,
    symbol: country.currency.symbol,
    rate: country.currency.rate
  }));
};

// Function to get countries with flags
export const getCountriesWithFlags = () => {
  return countries.map(country => ({
    code: country.code,
    name: country.name,
    flag: country.flag
  }));
};

// Function to get country by code
export const getCountryByCode = (code: string): Country | undefined => {
  return countries.find(country => country.code === code);
};

// Function to get mobile providers by country code
export const getMobileProvidersByCountry = (countryCode: string) => {
  const country = countries.find(c => c.code === countryCode);
  return country?.mobileProviders || [];
};
