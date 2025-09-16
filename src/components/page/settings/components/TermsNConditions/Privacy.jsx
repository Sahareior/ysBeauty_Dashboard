import React, { useState } from 'react';
import EditSection from '../editor/EditSection';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [clicked,setIsClicked]=useState(false);
    const navigate = useNavigate();

 

  const privacyText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam labore deserunt tempore commodi veritatis omnis odit odio pariatur. Exercitationem aliquid autem dolor hic, expedita illo id, porro magni quam quaerat consequatur excepturi, recusandae ab tenetur fugiat fuga. Nesciunt enim quas illo tenetur ducimus iusto minima eveniet ipsam officia, odio porro iure tempore similique libero sunt! Harum architecto repellat officia est vero rem unde aspernatur, mollitia voluptatum? Nisi earum asperiores explicabo voluptas! Sed quod vero, distinctio tempore non perspiciatis a odit obcaecati debitis doloremque numquam asperiores quaerat molestias consequuntur assumenda. Quas recusandae dolorum nobis! Suscipit dolore error rerum soluta iure! Sint!";

  const handleBack = () => {
navigate(-1);
  }
  return (
    <div className="p-6">
      <div onClick={handleBack} className="flex hover:cursor-pointer gap-3 items-center">
        <FaChevronLeft size={20} />
        <h1 className="text-2xl font-semibold">Privacy Policy</h1>
      </div>

      <div  className="my-11">
        <p className='text-[28px]'>Privacy Policy Content</p>
        <div className="w-full bg-black h-[0.2px]" />
      </div>

      {!isEditing ? (
<div>
            <div className="relative w-full ">
          <div className=' p-4 rounded-lg min-h-[200px]'>
            <p className="whitespace-pre-line">{privacyText}</p>
          </div>
  
        </div>
                <button
          style={{
            background: 'linear-gradient(90deg, #D9AB1D 0%, #F1BE20 100%)',
          }}
            onClick={() => setIsEditing(true)}
            className="absolute bottom-4 right-12 px-14 py-2  text-white rounded-lg "
          >
            Edit
          </button>
</div>
      ) : (
        <EditSection setIsClicked={setIsClicked} data={privacyText} type="privacy" />
      )}
    </div>
  );
};

export default Privacy;
