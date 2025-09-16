import { Avatar } from "antd";
import React, { useState } from "react";
import { FaChevronLeft, FaPen } from "react-icons/fa";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: "Name",
    email: "sijan@gmail.com",
    phone: "01725856220",
  });
  const navigate = useNavigate();


  const handleSave = () => {
  // Here you can also send API request to save changes
  Swal.fire({
    title: 'Saved!',
    text: 'Your profile has been updated successfully.',
    icon: 'success',
    confirmButtonColor: '#009844',
    confirmButtonText: 'OK'
  });
  setIsEditing(false); // Exit edit mode after saving
};


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };


  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center ">
        <div onClick={() => navigate(-1)} className="flex items-center gap-6 cursor-pointer mb-6">
          <FaChevronLeft />
          <span className="text-[29px] ml-3">Personal Information</span>
        </div>
        <button
          onClick={toggleEdit}
          className="bg-yellow-400  px-6 text-black py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-500 transition"
        >
          <FaPen /> {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      <div className="bg-black h-[0.2px] w-full " />

      {/* Content */}
      <div className="flex  items-start mt-10 gap-12">
        {/* Avatar */}
        <div className="flex flex-col bg-[#FAFAFA] p-9 gap-8 px-20 border border-[#F1BE20] justify-center items-center ">
          <Avatar size={130} src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <h5>Profile</h5>
          <h4>User/Admin</h4>
        </div>

        {/* Info Fields */}
        <div className="space-y-6 w-full">
          {/* First Name */}
          <div>
            <label className="text-[18px] text-[#545454]">First Name</label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition mt-2"
              />
            ) : (
              <p className=" text-[22px] bg-[#F5F5F5] p-3 w-full">{form.firstName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-[18px] text-[#545454]">Email</label>
            {isEditing ? (
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition mt-2"
              />
            ) : (
              <p className=" text-[22px] bg-[#F5F5F5] p-3 w-full">{form.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-[18px] text-[#545454]">Phone No</label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition mt-2"
              />
            ) : (
              <p className=" text-[22px] bg-[#F5F5F5] p-3 w-full">{form.phone}</p>
            )}
          </div>
<div className="flex justify-end">
  {isEditing && (
    <button
      onClick={handleSave}
      className="bg-[#009844] text-white px-6 py-2 rounded-lg transition"
    >
      Save Changes
    </button>
  )}
</div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
