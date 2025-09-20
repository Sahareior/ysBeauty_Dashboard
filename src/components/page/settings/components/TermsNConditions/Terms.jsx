import React, { useState } from "react";
import EditSection from "../editor/EditSection";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetTermsQuery } from "../../../../../store/apis/apiSlice";

const Terms = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [clicked, setIsClicked] = useState(false);
  const { data } = useGetTermsQuery();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-6">
      <div
        onClick={handleBack}
        className="flex hover:cursor-pointer gap-3 items-center"
      >
        <FaChevronLeft size={20} />
        <h1 className="text-2xl font-semibold">Terms & Conditions</h1>
      </div>

      <div className="my-11">
        <p className="text-[28px]">Terms & Conditions Content</p>
        <div className="w-full bg-black h-[0.2px]" />
      </div>

      {!isEditing ? (
        <div>
          <div className="relative w-full">
            <div className="p-4 rounded-lg min-h-[200px]">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: data?.terms }}
              />
            </div>
          </div>
          <button
            style={{
              background: "linear-gradient(90deg, #D9AB1D 0%, #F1BE20 100%)",
            }}
            onClick={() => setIsEditing(true)}
            className="absolute bottom-4 right-12 px-14 py-2 text-white rounded-lg"
          >
            Edit
          </button>
        </div>
      ) : (
        <EditSection
          setIsClicked={setIsClicked}
          data={data?.terms}
          type="terms"
        />
      )}
    </div>
  );
};

export default Terms;
