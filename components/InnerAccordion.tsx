import { useState } from "react";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

const InnerAccordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-2 bg-gray-50 hover:bg-gray-100"
      >
        {title}
      </button>
      {isOpen && <div className="p-2">{children}</div>}
    </div>
  );
};

export default InnerAccordion;
