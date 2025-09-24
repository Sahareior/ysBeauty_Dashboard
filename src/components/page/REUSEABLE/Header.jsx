import { Avatar, Dropdown, Input } from 'antd';
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserProfileQuery } from '../../../store/apis/apiSlice';
import { useGetAllEventsQuery } from "../../../store/apis/apiSlice";
import { CalendarOutlined, FrownOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words"; // install if needed
import { SearchOutlined } from '@ant-design/icons';

const Header = ({ heading, subHeading }) => {
    const { data } = useGetUserProfileQuery();
    const { data: eventData } = useGetAllEventsQuery();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Filter events based on search term
    const filteredEvents = useMemo(() => {
        if (!eventData || !searchTerm.trim()) return [];
        
        return eventData.filter(event => 
            event.event_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [eventData, searchTerm]);

    // Handle event selection from dropdown
    const handleEventSelect = (event) => {
        navigate('/dashboard/eventlist', { 
            state: { 
                filteredEvents: [event], // Pass the selected event
                searchTerm: searchTerm
            }
        });
    };

    // Handle view all results
    const handleViewAll = () => {
        navigate('/dashboard/eventlist', { 
            state: { 
                filteredEvents: filteredEvents,
                searchTerm: searchTerm
            }
        });
    };

    // Dropdown content
const dropdownContent = (
  <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
    {filteredEvents.length === 0 ? (
      <div className="p-6 text-center text-gray-500 flex flex-col items-center">
        <FrownOutlined className="text-2xl mb-2 text-gray-400" />
        <span>No events found</span>
      </div>
    ) : (
      <>
        <div className="max-h-72 overflow-y-auto custom-scrollbar">
          {filteredEvents.slice(0, 5).map((event) => (
            <div
              key={event.id}
              className="flex gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all duration-200"
              onClick={() => handleEventSelect(event)}
            >
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-yellow-100 rounded-lg text-yellow-600">
                <CalendarOutlined />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  <Highlighter
                    highlightStyle={{ backgroundColor: "#fff2a8", padding: 0 }}
                    searchWords={[searchTerm]}
                    autoEscape
                    textToHighlight={event.event_name}
                  />
                </div>
                <div className="text-sm text-gray-600 truncate">
                  {event.date} • {event.address}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Status:{" "}
                  <span
                    className={
                      event.status === "active"
                        ? "text-green-600 font-medium"
                        : "text-red-500 font-medium"
                    }
                  >
                    {event.status}
                  </span>{" "}
                  • {event.paid ? "Paid" : "Unpaid"}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* {filteredEvents.length > 5 && (
          <div
            className="p-3 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer border-t border-gray-200 transition"
            onClick={handleViewAll}
          >
            <span className="text-blue-600 font-medium">
              View all {filteredEvents.length} results
            </span>
          </div>
        )} */}
      </>
    )}
  </div>
);

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                {/* Title & Subtitle */}
                <div>
                    <h2 className="text-2xl popreg md:text-3xl font-bold text-gray-900">{heading}</h2>
                    <h3 className="text-[16px] popreg mt-3 font-semibold text-gray-700">{subHeading}</h3>
                </div>

                {/* Search with Dropdown */}
                <Dropdown 
                    overlay={dropdownContent} 
                    trigger={['click']}
                    open={searchTerm.length > 0}
                    placement="bottomRight"
                >
                    <div className="w-full md:w-2/6">
                        <Input
                            size="large"
                            placeholder="Search events by name..."
                            prefix={<SearchOutlined className="text-gray-400" />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-12 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                </Dropdown>

                {/* User Info */}
                <div className="flex items-center gap-3">
                    <Avatar
                        size={40}
                        src={data?.profile_photo ? `http://10.10.13.36/${data.profile_photo}` : null}
                        alt="Avatar"
                    />
                    <div>
                        <h3 className="font-medium text-gray-800">{data?.first_name || 'Anonymous'}</h3>
                        <p className="text-sm text-gray-500">Administrator</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;