import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface PriceRangeProps {
  filterFunctions?: {
    handlepriceRange?: (range: [number, number]) => void;
  };
}

interface PriceState {
  min: number;
  max: number;
}

const PriceRange: React.FC<PriceRangeProps> = ({ filterFunctions }) => {
  const [price, setPrice] = useState<PriceState>({ min: 20, max: 70987 });

  // Price range handler
  const handleOnChange = (value: number[]) => {
    setPrice({ min: value[0], max: value[1] });
    filterFunctions?.handlepriceRange?.([value[0], value[1]]);
  };

  return (
    <>
      <div className="range-wrapper">
        <Slider
          range
          min={0}
          max={100000}
          value={[price.min, price.max]}
          onChange={handleOnChange}
          tipFormatter={(value) => `$${value}`}
        />
        <div className="d-flex align-items-center">
          <span id="slider-range-value1">${price.min}</span>
          <i className="fa-sharp fa-solid fa-minus mx-2 dark-color icon" />
          <span id="slider-range-value2">${price.max}</span>
        </div>
      </div>
    </>
  );
};

export default PriceRange; 