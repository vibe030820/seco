import { faArrowRight, faCopy, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ffetchProgramById } from '../components/ffetchprogram';

const FPopup = ({ isOpen, onClose, programDetails }) => {
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const program = await ffetchProgramById(programDetails.id);
      setProgram(program);
    };

    if (programDetails && programDetails.id) {
      fetchDetails();
    }
  }, [programDetails]);

  if (!program) return null;

  const {
    title,
    image,
    description,
    location,
    endDate,
    eligibility,
    incentives,
  } = program;

  const formattedEndDate = new Date(endDate);

  const formatMonth = (date) => date.toLocaleString('default', { month: 'short' }).toUpperCase();
  const formatDay = (date) => date.getDate();

  const handleEventPageClick = () => {
    navigate(`/program/${programDetails.id}`, { state: { program: programDetails.id } });
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy the link.');
    }
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-[30%] bg-white shadow-lg overflow-y-auto z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="p-4">
        <div className="sticky top-0 bg-white z-20 pb-2">
          <div className="flex items-start gap-4 mb-2">
            <button 
              aria-label="Close" 
              onClick={onClose} 
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
            >
              <i className="far fa-times-circle text-black text-lg"></i>
            </button>

            <div className="flex space-x-2">
              {/* <button 
                onClick={handleEventPageClick} 
                className="flex items-center bg-gray-200 px-3 py-2 rounded-xl hover:bg-gray-300 transition"
              >
                <span className="mr-2 text-black text-sm">event page</span>
                <FontAwesomeIcon 
                  icon={faArrowRight} 
                  style={{ transform: 'rotate(305deg)' }} 
                  className="w-4 h-4"
                />
              </button> */}

              {/* <button 
                onClick={handleCopyLink} 
                className="flex items-center bg-gray-200 px-3 py-2 rounded-xl hover:bg-gray-300 transition"
              >
                <span className="mr-2 text-black text-sm">copy link</span>
                <FontAwesomeIcon 
                  icon={faCopy} 
                  className="w-4 h-4"
                />
              </button> */}

              <button 
                onClick={() => window.location.href = 'https://getseco.com/contact-1'}
                className="flex items-center bg-[#F99F31] hover:bg-[#FACB82] px-3 py-2 rounded-xl transition"
              >
                <span className="mr-2 text-black text-sm">apply</span>
                <FontAwesomeIcon 
                  icon={faNewspaper} 
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>
          <hr className="border-t border-black" />
        </div>

        {image && <img src={image} alt={title} className="w-full h-auto object-cover mb-4" />}
        
        <h2 className="text-3xl font-bold mb-4 text-left">{title}</h2>

        <div className="flex items-start mb-4">
          <div className="flex items-center space-x-2">
            <div className="border-2 border-slate-300 rounded-md w-10 h-10 flex flex-col">
              <div className="bg-slate-300 text-xs text-center">{formatMonth(formattedEndDate)}</div>
              <div className="text-center text-sm">{formatDay(formattedEndDate)}</div>
            </div>
            <div>
              <p className="font-medium text-left">
                {formattedEndDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                })}
              </p>
              <p className="text-sm text-gray-500 text-left">deadline</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <div className="border-2 border-slate-300 rounded-md w-10 h-10 flex items-center justify-center">
            <img src="../../location.png" alt="location" className="w-6 h-6" />
          </div>
          <div>
            <p className="font-medium text-left">{location}</p>
            <p className="text-sm text-gray-500 text-left">location</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-2 text-left">about</h3>
            <hr className="border-t border-gray-300 mb-4" />
            <p className="text-left">{description}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2 text-left">eligibility</h3>
            <hr className="border-t border-gray-300 mb-4" />
            <p className="text-left">{eligibility}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2 text-left">incentives</h3>
            <hr className="border-t border-gray-300 mb-4" />
            <p className="mb-2 text-left">{incentives}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FPopup;