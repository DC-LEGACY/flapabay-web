import { useState } from "react";
import { Plus, Upload } from "lucide-react";

const PhotoUpload = () => {
  const [photos, setPhotos] = useState<string[]>([]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).slice(0, 5 - photos.length);
      const newPhotos = filesArray.map((file) => URL.createObjectURL(file));
      setPhotos([...photos, ...newPhotos]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">Add your photos</h2>
      <p className="text-gray-600 text-sm mt-2">
        We’ll review every photo before it goes live on your experience page.
      </p>

      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-medium">Upload at least 1 more</p>
        <label className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded cursor-pointer">
          <Upload size={16} />
          Upload
          <input type="file" multiple accept="image/*" className="hidden" onChange={handlePhotoUpload} />
        </label>
      </div>

      <div className="grid grid-cols-3 gap-4 ">
        {photos.map((photo, index) => (
          <div key={index} className="relative group pt-6">
            <img src={photo} alt={`Upload ${index + 1}`} className="w-full h-36 object-cover rounded border" />
            <button
              onClick={() => removePhoto(index)}
              className="absolute top-7 right-2 bg-black text-white h-8 w-8 rounded-full opacity-75 hover:opacity-100 transition"
            >
              ✕
            </button>
          </div>
        ))}

        {photos.length < 5 && (
            <div className=" pt-6">
          <label className=" border border-dashed rounded flex items-center justify-center w-full h-36 cursor-pointer">
            <Plus size={24} />
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
          </label>
          </div>
        )}
      </div>

      <div className="pt-6 text-sm text-gray-700">
        <p className="font-medium">Your photos must have:</p>
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>A variety of details and angles, including photos of people in action</li>
          <li>Candid moments that accurately illustrate the experience</li>
          <li>Good image quality—no heavy filters, distortions, overlaid text, or watermarks</li>
        </ul>
      </div>
    </div>
  );
};

export default PhotoUpload;
