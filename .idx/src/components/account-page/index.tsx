export default function AccountPage() {
  const accountOptions = [
    {
      title: "Personal info",
      description: "Provide personal details and how we can reach you",
      icon: "\u{1F5C3}", // Unicode for Card Index Dividers emoji
    },
    {
      title: "Login & security",
      description: "Update your password and secure your account",
      icon: "\u{1F512}", // Unicode for Lock emoji
    },
    {
      title: "Payments & payouts",
      description: "Review payments, payouts, coupons, and gift cards",
      icon: "\u{1F4B3}", // Unicode for Credit Card emoji
    },
    {
      title: "Taxes",
      description: "Manage taxpayer information and tax documents",
      icon: "\u{1F4C3}", // Unicode for Page with Curl emoji
    },
    {
      title: "Notifications",
      description:
        "Choose notification preferences and how you want to be contacted",
      icon: "\u{1F514}", // Unicode for Bell emoji
    },
    {
      title: "Privacy & sharing",
      description:
        "Manage your personal data, connected services, and data sharing settings",
      icon: "\u{1F441}", // Unicode for Eye emoji (often used for privacy)
    },
    {
      title: "Global preferences",
      description: "Set your default language, currency, and timezone",
      icon: "\u{1F310}", // Unicode for Globe with Meridians emoji
    },
    {
      title: "Travel for work",
      description: "Add a work email for business trip benefits",
      icon: "\u{1F3E2}", // Unicode for Office Building emoji
    },
    {
      title: "Professional hosting tools",
      description:
        "Get professional tools if you manage several properties on Airbnb",
      icon: "\u{1F4CA}", // Unicode for Bar Chart emoji
    },
    {
      title: "Referral credit & coupon",
      description: "You have $0 AUD referral credits and coupon. Learn more.",
      icon: "\u{1F3F7}", // Unicode for Label emoji (often used for tags/coupons)
    },
  ];

  return (
    // Removed DashboardHeader and MobileMenu, assuming DashboardLayout handles these.
    // The main content area (p-6 max-w-4xl mx-auto etc.) is retained as it's specific to this page content.
    <div className="p-6 max-w-4xl mx-auto sm:mt-2 md:mt-2 lg:mt-28">
      <h1 className="text-3xl font-bold pb-2">Account</h1>
      <p className="text-lg font-semibold">
        George Munganga,
        <span className=" font-medium"> georgemunganga@gmail.com ·</span>{" "}
        <a href="#" className="underline font-medium">
          Go to profile
        </a>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 ">
        {accountOptions.map((option, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex items-start space-x-4 cursor-pointer"
          >
            <span className="text-2xl">{option.icon}</span>
            <div>
              <h3 className="text-lg font-semibold">{option.title}</h3>
              <p className="text-gray-600 text-sm">{option.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
