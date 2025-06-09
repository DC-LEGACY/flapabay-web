import React from "react";

interface BathOption {
  id: string;
  label: string;
}

const Bathroom: React.FC = () => {
  const bathOptions: BathOption[] = [
    { id: "yany", label: "any" },
    { id: "yoneplus", label: "1+" },
    { id: "ytwoplus", label: "2+" },
    { id: "ythreeplus", label: "3+" },
    { id: "yfourplus", label: "4+" },
    { id: "yfiveplus", label: "5+" },
  ];

  return (
    <>
      {bathOptions.map((option, index) => (
        <div className="selection" key={option.id}>
          <input
            id={option.id}
            name="ybath"
            type="radio"
            defaultChecked={index === 0} // Set the first option as defaultChecked
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </>
  );
};

export default Bathroom; 