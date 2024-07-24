"use client";

import React from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const RichText = ({ content }: { content: string }) => {
  const modules = {
    toolbar: false,
  };

  return (
    <ReactQuill
      value={content}
      readOnly={true}
      theme="snow"
      modules={modules}
      className="rich-text border-0 p-0"
    />
  );
};

export default RichText;
