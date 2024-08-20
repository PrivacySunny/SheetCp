import { useState } from "react";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

const OuterAccordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200"
      >
        {title}
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};

export default OuterAccordion;
