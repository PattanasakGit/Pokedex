"use client";
import React from "react";

interface TagTypeProps {
  type: string[];
}

const TagType: React.FC<TagTypeProps> = ({ type }) => {
  return (
    <div className="flex gap-[10px]">
      {type.map((typeName, index) => (
        <div
          key={index}
          className="bg-[#FFF4E3] rounded-[8px] px-[8px] py-[4px] text-[#FFAE33] font-bold text-[12px]"
        >
          {typeName}
        </div>
      ))}
    </div>
  );
};

export default TagType;
