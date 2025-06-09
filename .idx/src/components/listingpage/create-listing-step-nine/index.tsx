import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const CreateListingStepNine = () => {
  const [imageVisible, setImageVisible] = useState(true);
  const [photos, setPhotos] = useState<File[]>([]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setPhotos((prev) => [...prev, ...files]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full fixed top-0 left-0 flex justify-between items-center p-4">
        <div className="text-2xl font-bold text-black">
          <Link className="header-logo logo1" to="/">
            <img src="/images/logo.svg" alt="Header Logo" />
          </Link>
        </div>
        <button className="text-sm flex items-center border border-gray-100 rounded-full px-3 py-2">
          Save & exit
        </button>
      </header>
      
      {/* Content */}
      <div className="flex  items-center justify-center mt-24">
        <div className="max-w-lg">
          
          <h1 className="text-2xl font-medium pt-2">Add some photos of your boat</h1>
          <p className="text-gray-500 pt-1">
            You'll need 5 photos to get started. You can add more or make changes later.
          </p>

          {/* Photo Upload Section */}
          <div className="pt-8">
            <label className="block text-lg font-semibold mb-3">Add photos</label>
            <div className="grid grid-cols-3 gap-4">
              {photos.slice(0, 5).map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setPhotos((prev) => prev.filter((_, i) => i !== index))}
                    className="absolute top-1 right-1 bg-[#FFC500] text-white rounded-full p-1 h-7 w-7 font-semibold"
                  >
                    ✕
                  </button>
                </div>
              ))}
              {photos.length < 5 && (
                <label className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-32 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <span className="text-gray-500">+ Add Photo</span>
                </label>
              )}
            </div>
          </div>
        </div>
        
        
      </div>

      {/* Footer */}
      <div className="w-full left-0 fixed bottom-0 bg-white shadow-md flex flex-col">
        <div className="w-full h-1 bg-gray-300 rounded-full relative">
          <div
            className="absolute bg-[#FFC500] top-0 left-0 h-full rounded-full"
            style={{ width: "42%" }} // Adjust progress bar width as needed
          ></div>
        </div>
      
        <div className="flex items-center justify-between">
          <Link to={"/create-listing-step-eight"}>
            <button className="flex items-center ml-4 underline font-medium">
              Back
            </button>
          </Link>
          <Link to={"/create-listing-step-ten"}>
            <button
              className={`mt-2 px-3 py-1 text-lg rounded-lg mb-2 mr-2 bg-[#FFC500] text-white`
                
                
              }
              disabled={photos.length < 5}
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateListingStepNine;