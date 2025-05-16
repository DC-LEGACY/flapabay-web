import { PublicProfileHeader } from "@/components/dashboard/host/profile/PublicProfileHeader";
import { PublicProfileContent } from "@/components/dashboard/host/profile/PublicProfileContent";

const PublicGuestProfile = () => {
  // In a real app, we would fetch this data from an API based on the guest ID
  const guestData = {
    name: "Mbolela Muluba",
    location: "Lusaka, Zambia",
    memberSince: "April 2021",
    isVerified: true,
    avatarUrl: "https://i.pravatar.cc/150?u=mbolela",
    bio: "Tech enthusiast building digital solutions in Zambia",
    rating: 4.8,
    reviewsCount: 15,
    languages: ["English", "Bemba", "Nyanja"]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <a href="/" className="text-xl font-bold text-[#ffc500]">
                  StayShare
                </a>
              </div>
              
              <div className="flex items-center gap-4">
                <a href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  Log in
                </a>
                <a href="/signup" className="text-sm font-medium bg-[#ffc500] text-black px-4 py-2 rounded-md hover:bg-[#ffc500]/90">
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#ffc500]/10 to-transparent py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm">
            <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
            <span className="mx-2 text-gray-400">/</span>
            <a href="/guests" className="text-gray-500 hover:text-gray-700">Guests</a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Mbolela Muluba</span>
          </div>
        </div>
      </div>

      <PublicProfileHeader 
        profileType="Guest"
        {...guestData}
      />
      
      <PublicProfileContent 
        profileType="Guest"
      />
    </div>
  );
};

export default PublicGuestProfile;
