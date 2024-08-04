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
          className="bg-[#bbd1b573] border rounded-[8px] px-[8px] py-[4px] text-[#1f733a] font-bold text-[12px]"
        >
          {typeName}
        </div>
      ))}
    </div>
  );
};

export default TagType;
