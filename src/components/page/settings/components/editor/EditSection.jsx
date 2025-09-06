import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import Editor from "./Editor";
import Swal from "sweetalert2";

const Delta = Quill.import("delta");

const EditSection = ({ data, type,setIsClicked }) => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const [previewHTML, setPreviewHTML] = useState("");

  useEffect(()=>{
    setIsClicked(true);
  },[setIsClicked])

  const quillRef = useRef(null);
  const text = data || "This is some static content. You can edit it here.";

  const handleLogContent = () => {
    if (quillRef.current) {
      const html = quillRef.current.root.innerHTML;
      console.log("Updated content:", html);
      Swal.fire("Success!", "Content updated successfully", "success");
      setPreviewHTML(html);
    }
  };

  return (
    <div className=" flex flex-col gap-4">
      <Editor
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={new Delta().insert(text)}
        onSelectionChange={setRange}
        onTextChange={setLastChange}
      />

      {/* Update button always below editor */}
      <div className="flex justify-end mt-4 right-12  absolute bottom-4">
          <button
          style={{
            background: 'linear-gradient(90deg, #D9AB1D 0%, #F1BE20 100%)',
          }}
            onClick={() => handleLogContent}
            className="  px-14 py-2  text-white rounded-lg "
          >
            Update
          </button>
      </div>

      {previewHTML && (
        <div className="preview-container mt-10">
          <h3 className="preview-title">📄 Preview:</h3>
          <div
            className="preview-content"
            dangerouslySetInnerHTML={{ __html: previewHTML }}
          />
        </div>
      )}
    </div>
  );
};

export default EditSection;
