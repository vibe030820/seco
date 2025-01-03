import { faArrowRight, faCopy, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProgramById } from '../components/fetchProgram'; // Adjust the import path based on your project structure
import './Popup.css'; // Ensure CSS styles for the popup

const Popup = ({ isOpen, onClose, programDetails }) => {
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const program = await fetchProgramById(programDetails.id); // Use the passed id to fetch program details
      setProgram(program);
    };

    if (programDetails && programDetails.id) {
      fetchDetails();
    }
  }, [programDetails]);

  if (!program) return null; // Render nothing if data is not yet available

  const {
    title,
    image,
    description,
    location, // Assuming this is the city
    endDate,
    eligibility,
    incentives,
    organizerDetails,
    contactInfo,
  } = program;

  const formattedEndDate = new Date(endDate);

  const formatMonth = (date) => date.toLocaleString('default', { month: 'short' }).toUpperCase();
  const formatDay = (date) => date.getDate();

  const handleEventPageClick = () => {
    navigate(`/program/${programDetails.id}`, { state: { program: programDetails.id } }); // Pass the id in state
  };
  const handleCopyLink = async () => {
    try {
      if (!programDetails || !programDetails.id) {
        alert('Program details are not available.');
        return;
      }
  
      const currentUrl = window.location.origin; // Use the base URL of the app
      const linkToCopy = `${currentUrl}/program/${programDetails.id}`; // Construct the program-specific URL
  
      await navigator.clipboard.writeText(linkToCopy); // Copy the link to clipboard
      alert('Link with Program ID copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link: ', err);
      alert('An error occurred while copying the link.');
    }
  };
  
  

  return (
    <div className={`overlay ${isOpen ? 'show' : ''}`}
    onClick={onClose} // Close popup when clicking on the overlay
>
<div className={`popup ${isOpen ? 'show' : ''}`}
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
>
  <div className="popup-content">
  <div className="pane-header flex flex-col p-4 sticky top-8 z-20 mb-0">
  <div className="flex items-center gap-4">
    {/* Close Button */}
    <button 
      id="close-button"
      aria-label="Close" 
      onClick={onClose} 
      className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full transition-colors duration-300 hover:bg-gray-200"
    >
      <i className="far fa-times-circle text-black text-sm sm:text-lg"></i>
    </button>

    {/* Event Page Button */}
    <button 
      id="event-page-button"
      onClick={handleEventPageClick} 
      className="flex items-center bg-gray-200 px-2 py-1 sm:px-4 sm:py-2 rounded-xl transition duration-300 ease-in-out"
      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#D1D5DB'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#E5E7EB'}
    >
      <span className="mr-1 text-black text-xs sm:text-sm" style={{ fontFamily: 'CFont' }}>
        event page
      </span>
      <FontAwesomeIcon 
        icon={faArrowRight} 
        style={{ transform: 'rotate(305deg)' }} 
        className="w-3 h-3 sm:w-4 sm:h-4"
      />
    </button>

    {/* Copy Link Button */}
    <button 
      id="copy-link-button"
      onClick={handleCopyLink} 
      className="flex items-center bg-gray-200 px-2 py-1 sm:px-4 sm:py-2 rounded-xl transition duration-300 ease-in-out"
      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#D1D5DB'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#E5E7EB'}
    >
      <span className="mr-1 text-black text-xs sm:text-sm" style={{ fontFamily: 'CFont' }}>
        copy link
      </span>
      <FontAwesomeIcon 
        icon={faCopy} 
        className="w-3 h-3 sm:w-4 sm:h-4"
      />
    </button>

    {/* Apply Button */}
    <button 
  id="apply-button"
  onClick={() => window.location.href = 'https://getseco.com/contact-1'}
  className="flex items-center bg-[#F99F31] hover:bg-[#FACB82] px-2 py-1 sm:px-4 sm:py-2 rounded-xl transition duration-300 ease-in-out"
>
  <span className="mr-1 text-black text-xs sm:text-sm" style={{ fontFamily: 'CFont' }}>
    apply
  </span>
  <FontAwesomeIcon 
    icon={faNewspaper} 
    className="w-3 h-3 sm:w-4 sm:h-4"
  />
</button>

  </div>

  {/* Manual Line */}
  <div className="w-full h-px bg-black mt-2 mb-0" style={{ marginLeft: '-32px', marginRight: '-16px' }}></div>
</div>



        {image && <img src={image} alt={title} className="popup-image mb-6 mt-14" />}
        <p className='text-4xl font-bold my-4 'style={{
                    fontFamily: 'CFont',
                    textAlign: 'left',
                    }}>
              {title}
            </p>

        
        <div className="date-and-location flex justify-between items-center mt-10 mb-10">
  {/* Date Section - Left Aligned */}
  <div id="date" className="flex flex-row gap-2">
    <div className="w-10 border-2 border-slate-300 rounded-md h-10">
      <div className="bg-slate-300 text-xs text-center"style={{
                    fontFamily: 'CFont',
                    textTransform: 'uppercase', 
                    textAlign: 'center'
                    }}>
        {formatMonth(formattedEndDate)}
      </div>
      <div>
        <p className="text-center text-sm"style={{
                    fontFamily: 'CFont',
                    textTransform: 'lowercase' 
                    }}>{formatDay(formattedEndDate)}</p>
      </div>
    </div>
    <div>
    
      <p className="font-medium" >
        {formattedEndDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
        })}
      </p>
      <p className="text-sm text-gray-500"style={{
                    fontFamily: 'CFont',
                    textTransform: 'lowercase', 
                    textAlign: 'left'
                    }}>deadline</p>
    </div>
  </div>

  {/* Location Section - Right Aligned */}
 
</div>
<div id="location" className="flex flex-row gap-2 mb-10">
<div className="w-10 border-2 border-slate-300 rounded-md h-10 flex items-center justify-center"> {/* Added flex properties */}
  <img
    src="../../location.png"
    alt="location"
    className="w-6 h-6"
  />
</div>

    <div>
      
      <p className="font-medium"style={{
                    fontFamily: 'CFont',
                    
                    textAlign: 'left'
                    }}>{location}</p>
                    <p className="text-sm text-gray-500"style={{
                    fontFamily: 'CFont',
                    textTransform: 'lowercase' 
                    }}>location</p>
    </div>
  </div>
        

<div
  className="about-section"
  style={{
    // Adjust the thickness and color as needed
    borderRadius: '8px', // Optional: adds rounded corners
    padding: '0px', // Optional: adds space inside the border
  }}
>
<div id='details' className='mt-6'>
              <p className='font-bold'style={{
                    fontFamily: 'CFont',
                    textTransform: 'lowercase' 
                    }}>about</p>
              <hr className='my-4 border-t border-gray-300' />
              <div className='flex flex-col gap-6'style={{
                    fontFamily: 'CFont',
                    
                    }}>
                <p>{description}</p>
                
               
              </div>
            </div>

            <div id='eligibility' className='mt-6'>
              <p className='font-bold'style={{
                    fontFamily: 'CFont',
                    textTransform: 'lowercase' 
                    }}>eligibility</p>
              <hr className='my-4 border-t border-gray-300' />
              <div className='flex flex-col gap-6'>
                <p style={{ fontFamily: 'CFont',
                   }}>{eligibility[0]}</p>
                <p style={{
                    fontFamily: 'CFont',
                    textTransform: 'lowercase' 
                    }}>Startup Stage for Applications:</p>
               <p>
  {eligibility[1] && typeof eligibility[1] === 'string' ? (
    <ul className="list-disc pl-0 ml-0">
      {eligibility[1].split('+').map((item, index) => (
        <li key={index} className="font-CFont text-left ml-6"style={{
          fontFamily: 'CFont',
           
          }}>
          {item}
        </li>
      ))}
    </ul>
  ) : null}
</p>

                
                {/* <p>for:</p>
                <p>
  {eligibility[2] && typeof eligibility[2] === 'string' ? (
    <div className="flex flex-wrap gap-6"> 
      {eligibility[2].split(';').map((item, index) => (
        <span 
          key={index} 
          className="bg-slate-300 rounded-3xl p-2 inline-block"style={{
            fontFamily: 'CFont',
             
            }}
        >
          {item}
          <br />
        </span>
      ))}
    </div>
  ) : null}
</p> */}


              </div>
            </div>



            <div id='incentives' className='mt-6'>
              <p className='font-bold'style={{
                    fontFamily: 'CFont',
                    textTransform: 'lowercase' 
                    }}>incentives</p>
              <hr className='my-4 border-t border-gray-300' />
              <div className='flex flex-col gap-6'>
                
                <p style={{
                    fontFamily: 'CFont',
                    textTransform: 'lowercase' 
                    }}>Fiscal Incentives:</p>
                <p style={{
                    fontFamily: 'CFont',
                    
                    }}>
                  -{incentives.fiscal}
                </p>
                
                <p style={{
                    fontFamily: 'CFont',
                    textTransform: 'lowercase' 
                    }}>Non-Fiscal Incentives:</p>
                
                <p style={{
                    fontFamily: 'CFont',
                    
                    }}>-{incentives.nonFiscal}</p>
              </div>
            </div>

            <div className='text-sm mt-2'>
  <p className='mb-2 font-bold'style={{
                    fontFamily: 'CFont',
                    textTransform: 'lowercase' 
                    }}>contact the host</p>
  <hr className='my-4 border-t border-gray-300' />

  <div className='mb-4'> {/* Added margin for spacing */}
    <p className='font-medium mb-4'style={{
                    fontFamily: 'CFont',
                    textTransform: 'lowercase' 
                    }}> {/* Added margin bottom */}
      Person In Charge: 
      <a className='text-sm text-gray-500 ml-2'style={{
                    fontFamily: 'CFont',
                    
                    }}>{contactInfo.contactPerson}</a> {/* Added margin left */}
    </p>
    <p className='font-medium mb-4'style={{
                    fontFamily: 'CFont',
                    textTransform: 'lowercase' 
                    }}> {/* Added margin bottom */}
      Designation: 
      <a className='text-sm text-gray-500 ml-2'style={{
                    fontFamily: 'CFont',
                    
                    }}>{contactInfo.designation}</a> {/* Added margin left */}
    </p>
    <p className='font-medium mb-4'style={{
                    fontFamily: 'CFont',
                    textTransform: 'lowercase' 
                    }}> {/* Added margin bottom */}
      Email ID:
      <a href='mailto:atoms@accel.com' className='text-sm text-gray-500 ml-2'style={{
                    fontFamily: 'CFont',
                    
                    }}> {contactInfo.email}</a> {/* Added margin left */}
    </p>
    <p className='font-medium mb-4'style={{
                    fontFamily: 'CFont',
                    textTransform: 'lowercase' 
                    }}> {/* Added margin bottom */}
      Website:
      <a href='https://atoms.accel.com/' target='_blank' rel='noopener noreferrer' className='text-sm text-gray-500 ml-2'style={{
                    fontFamily: 'CFont',
                    
                    }}> {contactInfo.website}</a> {/* Added margin left */}
    </p>
  </div>

  <div className='flex flex-row gap-7 mb-4'>
      <a href={contactInfo.socialMedia.twitter} target='_blank' rel='noopener noreferrer'>
        <img src='../../twitter.png' alt='twitter' className='w-5 h-5 my-2' />
      </a>
      <a href={contactInfo.socialMedia.instagram} target='_blank' rel='noopener noreferrer'>
        <img src='../../instagram.png' alt='instagram' className='w-5 h-5 my-2' />
      </a>
      <a href={contactInfo.socialMedia.linkedin} target='_blank' rel='noopener noreferrer'>
        <img src='../../linkedin.png' alt='linkedin' className='w-5 h-5 my-2' />
      </a>
      <a href={contactInfo.socialMedia.facebook} target='_blank' rel='noopener noreferrer'>
        <img src='../../facebook.png' alt='facebook' className='w-5 h-5 my-2' />
      </a>
    </div>

 
</div>

</div>
</div>

      </div>
    </div>
  );
};

export default Popup;
