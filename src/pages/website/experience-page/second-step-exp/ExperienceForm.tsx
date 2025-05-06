import { useState } from "react";

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        className={`w-5 h-5 border-2 rounded ${checked ? 'bg-black' : 'bg-white'} transition-all`}
        onClick={onChange}
      ></div>
      {label}
    </label>
  );
}

function Button({ children, active, onClick }: { children: string; active: boolean; onClick: () => void }) {
  return (
    <button 
      className={`px-4 py-2 border rounded ${active ? 'bg-[#ffc500] text-white' : 'bg-white text-black border-black'}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Textarea({ value, onChange, placeholder }: { value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; placeholder: string }) {
  return (
    <textarea 
      className="w-full p-2 border rounded" 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder}
    ></textarea>
  );
}

export default function ExperienceForm() {
  const [minimumAge, setMinimumAge] = useState("18");
  const [accessibility, setAccessibility] = useState<string[]>([]);
  const [activityLevel, setActivityLevel] = useState("Moderate");
  const [skillLevel, setSkillLevel] = useState("Intermediate");
  const [additionalRequirements, setAdditionalRequirements] = useState("");
  
  const toggleAccessibility = (feature: string) => {
    setAccessibility((prev) =>
      prev.includes(feature)
        ? prev.filter((item) => item !== feature)
        : [...prev, feature]
    );
  };
  
  return (
    <div className="max-w-xl mx-auto p-1">
      <h2 className="text-2xl font-semibold">Who can attend your experience?</h2>
      <p className="text-gray-600 text-sm mb-4">
        Keep in mind that someone booking your experience might book spots for other guests. If there are strict requirements around age, skill level, or certifications, include them here.
      </p>
      
      <div className="mb-4">
        <label className="block font-medium">Minimum age</label>
        <select className="w-full p-2 border rounded" value={minimumAge} onChange={(e) => setMinimumAge(e.target.value)}>
          <option value="18">18</option>
          <option value="21">21</option>
          <option value="All ages">All ages</option>
        </select>
      </div>
      
      <Checkbox label="Parents can bring kids under 2 years" checked={accessibility.includes("kids")} onChange={() => toggleAccessibility("kids")} />
      
      <div className="mt-4">
        <label className="block font-medium">Does your experience have any accessibility features? (optional)</label>
        <p className="text-gray-600 text-sm pb-2">Changes are reviewed before they go live on your Experience page.</p>
        <Checkbox label="Communication accessibility features" checked={accessibility.includes("communication")} onChange={() => toggleAccessibility("communication")} />
        <Checkbox label="Mobility accessibility features" checked={accessibility.includes("mobility")} onChange={() => toggleAccessibility("mobility")} />
        <Checkbox label="Sensory accessibility features" checked={accessibility.includes("sensory")} onChange={() => toggleAccessibility("sensory")} />
      </div>
      
      <div className="pt-4">
        <label className="block font-medium">What activity level should people expect?</label>
        <div className="flex gap-2 pt-2">
          {["Light", "Moderate", "Strenuous", "Extreme"].map(level => (
            <Button key={level} active={activityLevel === level} onClick={() => setActivityLevel(level)}>{level}</Button>
          ))}
        </div>
      </div>
      
      <div className="pt-4">
        <label className="block font-medium">What skill level is required?</label>
        <div className="flex gap-2 pt-2">
          {["Beginner", "Intermediate", "Advanced", "Expert"].map(level => (
            <Button key={level} active={skillLevel === level} onClick={() => setSkillLevel(level)}>{level}</Button>
          ))}
        </div>
      </div>
      
      <div className="pt-4">
        <label className="block font-medium pb-2">Additional requirements (optional)</label>
        <Textarea placeholder="E.g. Guests should have prior surfing experience, must have a scuba license..." value={additionalRequirements} onChange={(e) => setAdditionalRequirements(e.target.value)} />
      </div>
    </div>
  );
}
