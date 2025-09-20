import { Avatar, message } from "antd";
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaPen } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { 
  useGetUserProfileQuery, 
  useUpdateProfileImageMutation, 
  useUpdateProfileMutation 
} from "../../../../store/apis/apiSlice";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data, refetch } = useGetUserProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [updateProfileImage] = useUpdateProfileImageMutation();
  const [form, setForm] = useState({
    first_name: "",
    email: "",
    phone: "",
    city: "",
    date_of_birth: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  // Initialize form with user data when it's available
  useEffect(() => {
    if (data) {
      setForm({
        first_name: data?.first_name || "",
        email: data?.email || "",
        phone: data?.phone || "",
        city: data?.city || "",
        date_of_birth: data?.date_of_birth || "",
      });
    }
  }, [data]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      // Update profile information
      await updateProfile(form).unwrap();
      
      // Update profile image if a new one was selected
      if (selectedImage) {
        const formData = new FormData();
        formData.append("profile_photo", selectedImage);
        await updateProfileImage(formData).unwrap();
      }
      
      // Refetch user data to get updated information
      await refetch();
      
      Swal.fire({
        title: 'Saved!',
        text: 'Your profile has been updated successfully.',
        icon: 'success',
        confirmButtonColor: '#009844',
        confirmButtonText: 'OK'
      });
      
      setIsEditing(false);
      setSelectedImage(null);
      setImagePreview("");
    } catch (error) {
      console.error('Failed to update profile:', error);
      message.error('Failed to update profile. Please try again.');
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
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
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <Avatar 
              size={130} 
              src={imagePreview || (data?.profile_photo ? `http://10.10.13.36/${data.profile_photo}` : null)}
            />
            {isEditing && (
              <div className="absolute bottom-0 right-0 bg-yellow-400 p-1 rounded-full">
                <FaPen className="text-xs" />
              </div>
            )}
          </label>
          {isEditing && (
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          )}
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
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition mt-2"
              />
            ) : (
              <p className=" text-[22px] bg-[#F5F5F5] p-3 w-full">{form.first_name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-[18px] text-[#545454]">Email</label>
            {isEditing ? (
              <input
                type="email"
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

          {/* City */}
          <div>
            <label className="text-[18px] text-[#545454]">City</label>
            {isEditing ? (
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition mt-2"
              />
            ) : (
              <p className=" text-[22px] bg-[#F5F5F5] p-3 w-full">{form.city || "Not specified"}</p>
            )}
          </div>

          {/* Date of Birth */}
          {/* <div>
            <label className="text-[18px] text-[#545454]">Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                name="date_of_birth"
                value={form.date_of_birth}
                onChange={handleChange}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition mt-2"
              />
            ) : (
              <p className=" text-[22px] bg-[#F5F5F5] p-3 w-full">
                {form.date_of_birth ? new Date(form.date_of_birth).toLocaleDateString() : "Not specified"}
              </p>
            )}
          </div> */}

          <div className="flex justify-end">
            {isEditing && (
              <button
                onClick={handleSave}
                className="bg-[#009844] text-white px-6 py-2 rounded-lg transition mr-4"
              >
                Save Changes
              </button>
            )}
            {isEditing && (
              <button
                onClick={() => {
                  setIsEditing(false);
                  setSelectedImage(null);
                  setImagePreview("");
                  // Reset form to original data
                  setForm({
                    first_name: data?.first_name || "",
                    email: data?.email || "",
                    phone: data?.phone || "",
                    city: data?.city || "",
                    date_of_birth: data?.date_of_birth || "",
                  });
                }}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;