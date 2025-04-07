import React, { useState } from "react";

const WhatWeDo: React.FC = () => {
  const [experienceStory, setExperienceStory] = useState("");
  const [duration, setDuration] = useState("3 hours");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [isLocationTypeModalOpen, setIsLocationTypeModalOpen] = useState(false);
  const [isLocationDescModalOpen, setIsLocationDescModalOpen] = useState(false);
 
  const [locationDescription, setLocationDescription] = useState("");

  const locationOptions = [
    { category: "Place of Worship", options: ["Cemetery", "Church", "Mosque", "Synagogue", "Temple"] },
    { category: "Residential Venue", options: ["Apartment", "Backyard", "Common area", "Garage","House", "Patio","Rooftop patio"] },
    { category: "Tourist attraction", options: ["Fountain", "Historic site", "Lighthouse", "Memorial site", "Monument", "Plaza", "Tourist information center"] },
    { category: "Government or education venue", options: ["Animal" ,"rescue center", "City hall", "Hospital", "Library", "Neighborhood", "Palace", "School", "University"] },
    { category: "Sports and wellness venue", options: ["Bath house","Beauty venue","Gym","Massage studio","Nail salon","Sauna","Sports venue","Wellness venue","Workout studio"] },
    { category: "Retail venue", options: ["Bookstores","Boutique","Clothing store","Cosmetics shop","Costume shop","Flea market","Flower shop","Market","Shopping mall","Shops"] },
    { category: "Food venue", options: ["Bakery","Bar","Beer shop","Brewery","Butcher shop","Cafe","Cheese shop","Cooking school","Delicatessen","Distillery","Farmers market","Fish market","Food court","Food stand","Food truck","Grocery stores","Ice cream shop","Restaurants","Winery"] },
    { category: "Entertainment venue", options: ["Amusement park","Aquarium","Arcade","Art gallery","Arts venue","Bar","Beer garden","Casino","Club","Event venue","Film studio","Jazz club","Karaoke","Movie theater","Museums","Music venue","Observatory","Pub","Stadium","Theater venue","Wine bar","Zoo"] },
    { category: "In nature", options: ["Bay","Beach","Campground","Cave","Countryside","Desert","Farm","Field","Forest","Garden","Harbor","Hot Spring","Island","Jungle","Lake","Mountain","Ocean","Parks","Pond","Pool","Rainforest","River","Ski area","Tidepools","Trail","Tundra","Vineyard","Volcano","Waterfall","Waterfront"] },





    ];


    const [isSocialTopicModalOpen, setIsSocialTopicModalOpen] = useState(false);
    const [selectedSocialTopics, setSelectedSocialTopics] = useState<string[]>([]);
    const [socialTopicSearchQuery, setSocialTopicSearchQuery] = useState("");

    const socialTopics = [
        "Action",
        "Adventure",
        "Animation",
        "Biography",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Fantasy",
        "Historical",
        "Horror",
        "Mystery",
        "Romance",
        "Sci-Fi",
        "Thriller",
        "Western",
        
      ];
    
      const filteredSocialTopics = socialTopics.filter((topic) =>
        topic.toLowerCase().includes(socialTopicSearchQuery.toLowerCase())
      );
    
      const toggleSocialTopicSelection = (topic: string) => {
        if (selectedSocialTopics.includes(topic)) {
          setSelectedSocialTopics(selectedSocialTopics.filter((item) => item !== topic));
        } else if (selectedSocialTopics.length < 3) {
          setSelectedSocialTopics([...selectedSocialTopics, topic]);
        }
      };

    const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genreSearchQuery, setGenreSearchQuery] = useState("");

  const genreOptions = [
    
    "Action",
        "Adventure",
        "Animation",
        "Biography",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Fantasy",
        "Historical",
        "Horror",
        "Mystery",
        "Romance",
        "Sci-Fi",
        "Thriller",
        "Western",
  ];

  const filteredGenres = genreOptions.filter((genre) =>
    genre.toLowerCase().includes(genreSearchQuery.toLowerCase())
  );

  const toggleGenreSelection = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((item) => item !== genre));
    } else if (selectedGenres.length < 3) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  // Filtered options based on search
  const filteredOptions = locationOptions.map((group) => ({
    category: group.category,
    options: group.options.filter((option) =>
      option.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  const toggleSelection = (location: string) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter((item) => item !== location));
    } else if (selectedLocations.length < 3) {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Section Heading */}
      <h2 className="text-2xl font-semibold pb-2">What will you and your guests do?</h2>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Provide specific plans from start to finish, not multiple ideas or options</li>
        <li>Describe what makes your experience special—something that guests wouldn’t do on their own</li>
      </ul>

      {/* Experience Story Input */}
      <textarea
        className="w-full p-3 rounded-lg border"
        rows={4}
        placeholder="Tell guests the story of what they’ll do during your experience."
        value={experienceStory}
        onChange={(e) => setExperienceStory(e.target.value)}
      ></textarea>
      <p className="text-sm text-gray-500 mt-1">
        200 more required <span className="underline cursor-pointer hover:font-medium">Show examples</span>
      </p>

      {/* Duration Dropdown */}
      <h2 className="text-xl font-semibold pt-6 pb-2">How long is your experience?</h2>
      <label className="block text-gray-700 text-sm font-medium mb-1">Duration</label>
      <select
        className="w-full border p-3 rounded-lg"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((hour) => (
          <option key={hour} value={`${hour} hour${hour > 1 ? "s" : ""}`}>
            {hour} hour{hour > 1 ? "s" : ""}
          </option>
        ))}
      </select>
      <p className="text-sm text-gray-500 mt-1">
        We suggest <span className="font-semibold">3 hours</span> based on your activity. You can always change this later.
      </p>

      {/* Additional Fields */}
      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center border-b py-3">
          <div>
            <p className="font-medium">Location type</p>
            <p className="text-sm text-gray-500">
              {selectedLocations.length ? selectedLocations.join(", ") : "Required"}
            </p>
          </div>
          <button className="text-blue-600 hover:underline" onClick={() => setIsModalOpen(true)}>
            Add
          </button>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center border-b py-3">
          <div>
            <p className="font-medium">Location description</p>
            <p className="text-sm text-gray-500">{locationDescription ? locationDescription : "Optional"}</p>
          </div>
          <button className="text-blue-600 hover:underline"onClick={() => setIsLocationDescModalOpen(true)} >
            Add
          </button>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center border-b py-3">
          <div>
            <p className="font-medium">Literary genre</p>
            <p className="text-sm text-gray-500"> {selectedGenres.length ? selectedGenres.join(", ") : "Optional"}</p>
          </div>
          <button className="text-blue-600 hover:underline" onClick={() => setIsGenreModalOpen(true)} >
            Add
          </button>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center border-b py-3">
          <div>
            <p className="font-medium">Social topic</p>
            <p className="text-sm text-gray-500">    {selectedSocialTopics.length ? selectedSocialTopics.join(", ") : "Optional"}</p>
          </div>
          <button className="text-blue-600 hover:underline" onClick={() => setIsSocialTopicModalOpen(true)} >
            Add
          </button>
        </div>
      </div>

      {isSocialTopicModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white shadow-lg p-6 rounded-lg w-[90%] max-w-md flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Social Topic</h2>
              <button className="text-gray-600 text-xl" onClick={() => setIsSocialTopicModalOpen(false)}>
                &times;
              </button>
            </div>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search"
              className="w-full border rounded-lg p-2"
              value={socialTopicSearchQuery}
              onChange={(e) => setSocialTopicSearchQuery(e.target.value)}
            />

            <p className="text-gray-600 text-sm mt-2">Choose up to 3 options</p>

            {/* Social Topics List */}
            <div className="overflow-y-auto flex-grow mt-2 px-2" style={{ maxHeight: "300px" }}>
              {filteredSocialTopics.map((topic) => (
                <div key={topic} className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id={topic}
                    className="mr-2"
                    checked={selectedSocialTopics.includes(topic)}
                    onChange={() => toggleSocialTopicSelection(topic)}
                  />
                  <label htmlFor={topic} className="text-gray-700">
                    {topic}
                  </label>
                </div>
              ))}
              {filteredSocialTopics.length === 0 && (
                <p className="text-gray-500 text-center mt-4">No results found.</p>
              )}
            </div>

            {/* Save Button */}
            <div className="mt-4 pt-4 border-t flex justify-end">
              <button
                className={`px-4 py-2 rounded-lg text-white ${
                  selectedSocialTopics.length > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={selectedSocialTopics.length === 0}
                onClick={() => setIsSocialTopicModalOpen(false)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isLocationDescModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" >
          <div className="bg-white shadow-lg p-6 rounded-lg w-[90%] max-w-md flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Describe the location</h2>
              <button className="text-gray-600 text-xl" onClick={() => setIsLocationDescModalOpen(false)}>
                &times;
              </button>
            </div>

            <p className="text-gray-600 text-sm mb-2">
              Describe the location’s unique details, like atmosphere or historical significance.
            </p>

            <textarea
              className="w-full p-3 rounded-lg border"
              rows={4}
              placeholder="Enter location description..."
              value={locationDescription}
              onChange={(e) => setLocationDescription(e.target.value)}
            ></textarea>

            <div className="mt-4 pt-4 border-t flex justify-end">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => setIsLocationDescModalOpen(false)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Modal */}
      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" >
    <div className="bg-white shadow-lg p-6 rounded-lg w-[90%] h-[70%] max-w-md flex flex-col">
      {/* Modal Header - Fixed */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add location type</h2>
        <button className="text-gray-600 text-xl" onClick={() => setIsModalOpen(false)}>
          &times;
        </button>
      </div>

      {/* Search Bar - Fixed */}
      <input
        type="text"
        placeholder="Search"
        className="w-full border rounded-lg p-2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <p className="text-gray-600 text-sm mt-2">Choose up to 3 options</p>

      {/* Scrollable Location List */}
      <div className="overflow-y-auto flex-grow mt-2 px-2" style={{ maxHeight: "300px" }}>
        {filteredOptions.map((group) =>
          group.options.length > 0 ? (
            <div key={group.category} className="mt-4">
              <h3 className="text-lg font-semibold">{group.category}</h3>
              {group.options.map((option) => (
                <div key={option} className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id={option}
                    className="mr-2"
                    checked={selectedLocations.includes(option)}
                    onChange={() => toggleSelection(option)}
                  />
                  <label htmlFor={option} className="text-gray-700">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          ) : null
        )}

        {/* No Results Message */}
        {filteredOptions.every((group) => group.options.length === 0) && (
          <p className="text-gray-500 text-center mt-4">No results found.</p>
        )}
      </div>

      {/* Fixed Save Button */}
      <div className="mt-4 pt-4 border-t flex justify-end">
        <button
          className={`px-4 py-2 rounded-lg text-white ${
            selectedLocations.length > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={selectedLocations.length === 0}
          onClick={() => setIsModalOpen(false)}
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}


{isGenreModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white shadow-lg p-6 rounded-lg w-[90%] max-w-md flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add genre</h2>
              <button className="text-gray-600 text-xl" onClick={() => setIsGenreModalOpen(false)}>
                &times;
              </button>
            </div>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search"
              className="w-full border rounded-lg p-2"
              value={genreSearchQuery}
              onChange={(e) => setGenreSearchQuery(e.target.value)}
            />

            <p className="text-gray-600 text-sm mt-2">Choose up to 3 options</p>

            {/* Genre List */}
            <div className="overflow-y-auto flex-grow mt-2 px-2" style={{ maxHeight: "300px" }}>
              {filteredGenres.map((genre) => (
                <div key={genre} className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id={genre}
                    className="mr-2"
                    checked={selectedGenres.includes(genre)}
                    onChange={() => toggleGenreSelection(genre)}
                  />
                  <label htmlFor={genre} className="text-gray-700">
                    {genre}
                  </label>
                </div>
              ))}
              {filteredGenres.length === 0 && (
                <p className="text-gray-500 text-center mt-4">No results found.</p>
              )}
            </div>

            {/* Save Button */}
            <div className="mt-4 pt-4 border-t flex justify-end">
              <button
                className={`px-4 py-2 rounded-lg text-white ${
                  selectedGenres.length > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={selectedGenres.length === 0}
                onClick={() => setIsGenreModalOpen(false)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default WhatWeDo;

