import DashboardHeader from "../common/DashboardHeader";
import { Link } from "react-router-dom";
import MobileMenu from "../common/mobile-menu";

export default function WishlistPage() {
    return (
        <>
        <DashboardHeader/>
        <MobileMenu />
      <div className="max-w-3xl px-2 mx-auto sm:mt-2 md:mt-2 lg:mt-28">
        <h1 className="text-3xl font-bold">Wishlists</h1>
        
        <div className="pt-6">
          <div className="inline-block p-2 shadow-lg rounded-2xl">
            <Link to={"/wishlist-page-recently"}>
            <div className="grid w-56 h-56 grid-cols-2 gap-1">
              <img
                src="https://img.freepik.com/premium-photo/side-view-adventurous-couple-bivouacking_23-2150562891.jpg"
                alt="Snow cabin"
                className="object-cover w-full h-full rounded-tl-2xl"
              />
              <img
                src="https://img.freepik.com/premium-photo/side-view-adventurous-couple-bivouacking_23-2150562891.jpg"
                alt="City view apartment"
                className="object-cover w-full h-full rounded-tr-2xl"
              />
              <img
                src="https://img.freepik.com/premium-photo/side-view-adventurous-couple-bivouacking_23-2150562891.jpg"
                alt="Countryside house"
                className="object-cover w-full h-full rounded-bl-2xl"
              />
              <img
                src="https://img.freepik.com/premium-photo/side-view-adventurous-couple-bivouacking_23-2150562891.jpg"
                alt="Mountain retreat"
                className="object-cover w-full h-full rounded-br-2xl"
              />
            </div>
            </Link>
          </div>
          
          <div className="mt-4">
            <p className="text-lg font-semibold">Recently viewed</p>
            <p className="text-gray-600">Yesterday</p>
          </div>
        </div>
      </div>
      </>
    );
  }
  