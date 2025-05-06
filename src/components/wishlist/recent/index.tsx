import DashboardHeader from "../common/DashboardHeader";
import MobileMenu from "../common/mobile-menu";

const properties = [
    {
      date: 'Yesterday',
      items: [
        {
          image: 'https://img.freepik.com/premium-photo/full-shot-kid-father-living-countryside_23-2150642400.jpg',
          title: 'Treehouse in Gaular',
          beds: '1 bed',
          rating: '4.94'
        },
        {
          image: 'https://img.freepik.com/premium-photo/full-shot-kid-father-living-countryside_23-2150642400.jpg',
          title: 'Serviced apartment in Vila Nova Conceição',
          beds: '1 bed',
          rating: '4.95'
        }
      ]
    },
    {
      date: 'Tuesday, February 11',
      items: [
        {
          image: 'https://img.freepik.com/premium-photo/full-shot-kid-father-living-countryside_23-2150642400.jpg',
          title: 'Room in Hunder',
          beds: '4 beds',
          rating: '5.0'
        },
        {
          image: 'https://img.freepik.com/premium-photo/full-shot-kid-father-living-countryside_23-2150642400.jpg',
          title: 'Room in Pharog',
          beds: '4 beds',
          rating: 'New'
        },
        {
          image: 'https://img.freepik.com/premium-photo/full-shot-kid-father-living-countryside_23-2150642400.jpg',
          title: 'Room in Badowala',
          beds: '1 bed',
          rating: 'New'
        }
      ]
    }
  ];
  
  export default function RecentlyViewed() {
    return (
        <>
        <DashboardHeader/>
        <MobileMenu />
      <div className="max-w-3xl mx-auto sm:mt-2 md:mt-2 lg:mt-28 px-2">
        <h1 className="text-2xl font-bold Pb-4">Recently viewed</h1>
        {properties.map((section, index) => (
          <div key={index} className="pb-6">
            <h2 className="text-lg font-medium mb-2">{section.date}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {section.items.map((item, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="text-gray-600">{item.beds} • ★ {item.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      </>
    );
  }