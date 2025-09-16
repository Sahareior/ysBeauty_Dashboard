import { Avatar } from 'antd';
import React from 'react';

const Header = ({heading,subHeading}) => {
    return (
        <div>
                          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {/* Title & Subtitle */}
        <div>
          <h2 className="text-2xl popreg md:text-3xl font-bold text-gray-900">{heading}</h2>
          <h3 className="text-[16px] popreg mt-3 font-semibold text-gray-700">{subHeading}</h3>

        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="w-full md:w-2/6 h-12 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
        />

        {/* User Info */}
        <div className="flex items-center gap-3">
          <Avatar
            size={40}
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Avatar"
          />
          <div>
            <h3 className="font-medium text-gray-800">Merina</h3>
            <p className="text-sm text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
        </div>
    );
};

export default Header;