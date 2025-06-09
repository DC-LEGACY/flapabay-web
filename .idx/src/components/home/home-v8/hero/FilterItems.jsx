import Select from "react-select";
import Slider from "rc-slider";
import { useState } from "react";
import "rc-slider/assets/index.css";

const FilterItems = () => {
  const [price, setPrice] = useState({ min: 0, max: 70987 });

  // price range handler
  const handleOnChange = (value) => {
    setPrice({ min: value[0], max: value[1] });
  };

  const catOptions = [
    { value: "Apartments", label: "Apartments" },
    { value: "Bungalow", label: "Bungalow" },
    { value: "Houses", label: "Houses" },
    { value: "Loft", label: "Loft" },
    { value: "Office", label: "Office" },
    { value: "Townhome", label: "Townhome" },
    { value: "Villa", label: "Villa" },
  ];
  
  const locationOptions = [
    { value: "California", label: "California" },
    { value: "Chicago", label: "Chicago" },
    { value: "Los Angeles", label: "Los Angeles" },
    { value: "Manhattan", label: "Manhattan" },
    { value: "New Jersey", label: "New Jersey" },
    { value: "New York", label: "New York" },
    { value: "San Diego", label: "San Diego" },
    { value: "San Francisco", label: "San Francisco" },
    { value: "Texas", label: "Texas" },
  ];

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#ffc500 !important"
          : isHovered
          ? "#ffc500 !important12"
          : isFocused
          ? "#ffc500 !important12"
          : undefined,
      };
    },
  };

  return (
    <>
      <div className="col-md-12">
        <div className="bootselect-multiselect mb20">
          <Select
            defaultValue={[catOptions[0]]}
            name="categories"
            options={catOptions}
            styles={customStyles}
            className="text-start with_border"
            classNamePrefix="select"
            required
            isSearchable={false}
          />
        </div>
      </div>

      {/* Price Filter */}
      <div className="col-md-12">
        <div className="dropdown-lists at-home8 mb20">
          <div
            className="btn open-btn drop_btn3 text-start dropdown-toggle"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
          >
            Price <i className="fas fa-caret-down float-end fz11" />
          </div>
          <div className="dropdown-menu">
            <div className="widget-wrapper pb20 mb0 pl20 pr20">
              {/* Range Slider Mobile Version */}
              <div className="range-slider-style2">
                <div className="range-wrapper at-home10">
                  {/* rc-slider Range */}
                  <Slider.Range
                    min={0}
                    max={100000}
                    value={[price.min, price.max]} // Current price range
                    onChange={handleOnChange} // Update range on change
                  />
                  <div className="d-flex align-items-center">
                    <span id="slider-range-value1">${price.min}</span>
                    <i className="fa-sharp fa-solid fa-minus mx-2 dark-color icon" />
                    <span id="slider-range-value2">${price.max}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Filter */}
      <div className="col-md-12">
        <div className="bootselect-multiselect mb15">
          <Select
            defaultValue={[locationOptions[0]]}
            name="locations"
            options={locationOptions}
            styles={customStyles}
            className="text-start with_border"
            classNamePrefix="select"
            required
            isSearchable={false}
          />
        </div>
      </div>
    </>
  );
};

export default FilterItems;
