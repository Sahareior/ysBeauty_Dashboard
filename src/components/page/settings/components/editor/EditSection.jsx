import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import Editor from "./Editor";
import Swal from "sweetalert2";
import {
  useGetPolicyQuery,
  useGetTermsQuery,
  useUpdatePolicyMutation,
  useUpdateTermsMutation,
} from "../../../../../store/apis/apiSlice";

const EditSection = ({ data, type, setIsClicked }) => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const [updateTerms] = useUpdateTermsMutation();
  const [updatePolicy] = useUpdatePolicyMutation();
    const { refetch:policyRefetch } = useGetPolicyQuery();
     const { refetch:termsRefetch } = useGetTermsQuery();

  const quillRef = useRef(null);

  useEffect(() => {
    setIsClicked(true);
  }, [setIsClicked]);

  // Load initial content into Quill when editor is ready
  useEffect(() => {
    if (quillRef.current && data) {
      // Paste HTML into editor (keeps bold, color, etc.)
      quillRef.current.clipboard.dangerouslyPasteHTML(0, data);
    }
  }, [data]);

  const handleLogContent = async () => {
    if (!quillRef.current) return;

    try {
      const html = quillRef.current.root.innerHTML; // HTML output
      console.log("Updated content:", html);

      let res;
      if (type === "privacy") {
        res = await updatePolicy({ policy: html }).unwrap();
        policyRefetch()
      } else if (type === "terms") {
        res = await updateTerms({ terms: html }).unwrap();
        termsRefetch()
      }
      
      Swal.fire("Success!", "Content updated successfully", "success");
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire("Error!", "Failed to update content", "error");
    }
  };

  return (
    <div
      className="flex bg-white border border-[#F1BE20] flex-col gap-4 relative"
      style={{ minHeight: "500px" }}
    >
      <Editor
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={""} // leave blank, we’ll insert HTML in useEffect
        onSelectionChange={setRange}
        onTextChange={setLastChange}
      />

      {/* Update button */}
      <div className="flex justify-end mt-4 right-12 absolute bottom-4">
        <button
          style={{
            background: "linear-gradient(90deg, #D9AB1D 0%, #F1BE20 100%)",
          }}
          onClick={handleLogContent}
          className="px-14 py-2 text-white rounded-lg"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditSection;
