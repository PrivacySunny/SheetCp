import { useState, useEffect } from "react";

interface TagInfo {
  title: string;
  description: string;
}

interface TagInfoComponentProps {
  selectedTags: string[];
}

function TagInfoComponent({ selectedTags }: TagInfoComponentProps) {
  const [tagInfo, setTagInfo] = useState<TagInfo | null>(null);

  useEffect(() => {
    if (selectedTags.length > 0) {
      const fetchTagInfo = async () => {
        try {
          const response = await fetch(`/api/tagInfo?tag=${selectedTags[0]}`);
          const data: TagInfo = await response.json();
          setTagInfo(data);
        } catch (error) {
          console.error("Failed to fetch tag information", error);
        }
      };

      fetchTagInfo();
    }
  }, [selectedTags]);

  return (
    <div>
      {tagInfo ? (
        <div>
          {/* Render the tag information here */}
          <h3>{tagInfo.title}</h3>
          <p>{tagInfo.description}</p>
        </div>
      ) : (
        <p>No tag information available!!!!!!!!!!!!!!</p>
      )}
    </div>
  );
}

export default TagInfoComponent;
