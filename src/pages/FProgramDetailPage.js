import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import './FProgramDetail.css';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';
import { ClipLoader } from 'react-spinners';
import { ffetchProgramById } from '../components/ffetchprogram';

const FProgramDetailPage = ({ programId }) => {
  const navigate = useNavigate();
  const [programDetails, setProgramDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('Details');
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    // Fetch the program details using the programId
    const fetchProgram = async () => {
      try {
        if (programId) {
          const fetchedProgram = await ffetchProgramById(programId);
          
          if (!fetchedProgram) {
            // Redirect to a 404 or programs page if no program is found
            navigate('/programs');
            return;
          }
          
          setProgramDetails(fetchedProgram);
        }
      } catch (error) {
        console.error('Error fetching program details:', error);
        navigate('/programs');
      }
    };

    fetchProgram();
  }, [programId, navigate]);

  if (!programDetails) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ClipLoader size={50} color={'#3498db'} loading={true} />
      </div>
    );
  }

  const {
    title,
    orgname,
    tag,
    image,
    endDate,
    description,
    industry,
    location,
    startDate,
    eligibility,
    incentives,
    organizerDetails,
    logos,
    portfolioCompanies,
    faqs,
    contactInfo,
  } = programDetails;

  const formattedStartDate = new Date(startDate);
  const formattedEndDate = new Date(endDate);

  const formatMonth = (date) => date.toLocaleString('default', { month: 'short' }).toUpperCase();
  const formatDay = (date) => date.getDate();

  const handleSetActive = (to) => {
    setActiveTab(to);
  };

  return (
    <div>
      <div className="md:px-56 overflow-auto">
       <div className="text-left mb-8">
       <p className='text-4xl font-bold my-4' style={{fontFamily: 'CFont'}}>
                {title}
              </p>
        <div className="flex fborder-b border-gray-300 justify-left mt-4"></div>
      <div className='bg-white h-full fw-full font-poppins justify-center'>
        <div className='flex justify-center mt-4 '>
          <div className='fw-full lg:w-4/6 grid grid-cols-1 lg:grid-cols-3 gap-8 '> 
            <div className='col-span-1 lg:col-span-3 order-1 lg:order-1'>
              <img
                src={image}
                className='fw-full h-auto object-fit rounded-lg'
                alt={title}
              />
            </div>
            
            <div className='col-span-1 mb-0 lg:col-span-2 order-2 lg:order-2 mr-0 lg:mr-6 p-4'> 
             

              <nav className="bg-white rounded-3xl">
                <div className="max-w-6xl mx-auto py-2">
                  <div className="flex justify-start space-x-6">
                    <div className="flex fborder-b border-gray-300 rounded-3xl"> 
                      <Link 
                        to="details" 
                        smooth={true} 
                        duration={500} 
                        offset={-80}
                        className={`text-gray-700 text-sm hover:text-blue-600 relative mx-2 ${activeTab === 'Details' ? 'fborder-blue-600 pb-1' : ''}`}
                        onSetActive={() => handleSetActive('Details')}
                        style={{fontFamily: 'CFont'}}
                      >
                        details
                      </Link>
                      <Link 
                        to="form questions" 
                        smooth={true} 
                        duration={500} 
                        offset={-80}
                        className={`text-sm text-gray-500 hover:text-blue-600 relative
                        ${activeTab === 'Eligibility' ? 'fborder-blue-600 pb-1' : ''} mx-2`}
                        onSetActive={() => handleSetActive('Eligibility')}
                        style={{fontFamily: 'CFont'}}
                      >
                        form questions
                      </Link>
                     
                    </div>
                  </div>
                </div>
              </nav>
              <div id='details' className='mt-6'>
              <p className='font-medium'style={{
                    fontFamily: 'CFont',
                    textTransform: 'lowercase' 
                    }}>details</p>
              <hr className='my-4 fborder-t border-gray-300' />
              <div className='flex flex-col gap-6'>
              <p style={{
        fontFamily: 'CFont',
    }}>
    



    <div className='flex flex-col gap-6'style={{
                    fontFamily: 'CFont',
                    
                    }}>
                <p>{description}</p>
                
               
              </div>
</p>

                
               
              </div>
            </div>

          </div>

          <div 
                className='col-span-1 mb-10 order-3 lg:order-3 lg:sticky lg:top-20 lg:h-[calc(100vh-4rem)] h-auto overflow-y-auto overflow-x-hidden lg:mb-40 p-4'
                style={{ 
                  '-ms-overflow-style': 'none',
                  scrollbarWidth: 'none'
                }}
              >
                {/* Apply and contact details sections */}
                <div className='mt-4'>
                  <div className='flex justify-between mb-4'>
                    <button
                      onClick={() => window.location.href = '#'}
                      className="rounded-xl text-sm text-black bg-[#F99F31] hover:text-gray-100 hover:bg-[#FACB82] fw-full h-12 px-8"
                      style={{ fontFamily: 'CFont' }}
                    >
                      apply
                    </button>
                  </div>
                  <div className='flex justify-between mb-4'> {/* Added bottom margin */}
      <div className='flex flex-row gap-2'>
        <div className='flex justify-center items-center w-10 h-12 rounded-lg text-gray-800'>
          <span className="material-icons">group</span> {/* Organizer Icon */}
        </div>

        <div className='flex flex-col'>
        <p className='font-medium text-md'style={{
                    fontFamily: 'CFont',
                    
                    }}>{orgname}</p>
          <p className='text-sm text-gray-500'style={{
                    fontFamily: 'CFont',
                    
                    }}>organised by</p>
          
        </div>
      </div>
   

    </div>

    <div id='date' className='flex flex-row gap-2 mb-6 mt-6'> {/* Added bottom margin */}
      <div className='w-10 border-2 border-slate-300 rounded-md h-10'>
        <div className='bg-slate-300 text-xs text-center'style={{
                    fontFamily: 'CFont',
                    
                    }}>{formatMonth(formattedStartDate)}</div>
        <div><p className='text-center text-sm'style={{
                    fontFamily: 'CFont',
                    
                    }}>{formatDay(formattedStartDate)}</p></div>
      </div>
      <div>
      
        <p className='font-medium'style={{
                    fontFamily: 'CFont',
                    
                    }}>
        {formattedStartDate.toLocaleDateString("en-US", {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        })}</p>
        <p className='text-sm text-gray-500'style={{
                    fontFamily: 'CFont',
                    
                    }}>Start Date</p>
      </div>
    </div>

    <div id='date' className='flex flex-row gap-2 mb-6 mt-6'> {/* Added bottom margin */}
      <div className='w-10 border-2 border-slate-300 rounded-md h-10'>
        <div className='bg-slate-300 text-xs text-center'style={{
                    fontFamily: 'CFont',
                    
                    }}>{formatMonth(formattedEndDate)}</div>
        <div><p className='text-center text-sm'style={{
                    fontFamily: 'CFont',
                    
                    }}>{formatDay(formattedEndDate)}</p></div>
      </div>
      <div>
      <p className='font-medium'style={{
                    fontFamily: 'CFont',
                    
                    }}>
        {formattedEndDate.toLocaleDateString("en-US", {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        })}</p>
      <p className='text-sm text-gray-500'style={{
                    fontFamily: 'CFont',
                    
                    }}>End Date</p>
      
        
      </div>
    </div>

    <div id='location' className='flex  flex-row gap-2 mb-6'> {/* Added bottom margin */}
    <div className="w-10 border-2 border-slate-300 rounded-md h-10 flex items-center justify-center"> {/* Added flex properties */}
  <img
    src="../../location.png"
    alt="location"
    className="w-6 h-6"
  />
</div>

      <div>
      <p className='font-medium'style={{
                    fontFamily: 'CFont',
                    
                    }}>{location}</p>
        <p className='text-sm text-gray-500'style={{
                    fontFamily: 'CFont',
                    
                    }}>location</p>
       
      </div>
    </div>

   

    <div id='Hosted' className='mb-4'> {/* Added bottom margin */}
      <p style={{
                    fontFamily: 'CFont',
                    
                    }}>industry</p>
      <hr className='my-4 fborder-t border-slate-300' />
      <div className='flex flex-wrap gap-2'style={{
                    fontFamily: 'CFont',
                    
                    }}> {/* Allows items to wrap */}
        {industry.map((industry, index) => (
          <div key={index} className='bg-gray-200 rounded-full px-2 py-1 text-xs'>
            {industry}
          </div>
        ))}
      </div>
    </div>


<div className='text-sm mt-2'>
  <p className='mb-2'style={{
                    fontFamily: 'CFont',
                    
                    }}>contact the host</p>
  <hr className='my-4 fborder-t border-gray-300' />

  <div className='mb-4'> {/* Added margin for spacing */}
    <p className='font-medium mb-4'style={{
                    fontFamily: 'CFont',
                    
                    }}> {/* Added margin bottom */}
      person In Charge: 
      <a className='text-sm text-gray-500 ml-2'style={{
                    fontFamily: 'CFont',
                    
                    }}>{contactInfo.contactPerson}</a> {/* Added margin left */}
    </p>
    <p className='font-medium mb-4'style={{
                    fontFamily: 'CFont',
                    
                    }}> {/* Added margin bottom */}
      designation: 
      <a className='text-sm text-gray-500 ml-2'style={{
                    fontFamily: 'CFont',
                    
                    }}>{contactInfo.designation}</a> {/* Added margin left */}
    </p>
    <p className='font-medium mb-4' style={{ fontFamily: 'CFont' }}> {/* Added margin bottom */}
  email ID:
  <a href={`mailto:${contactInfo.email}`} className='text-sm text-gray-500 ml-2' style={{ fontFamily: 'CFont' }}>
    {contactInfo.email}
  </a> {/* Added margin left */}
</p>
<p className='font-medium mb-4' style={{ fontFamily: 'CFont' }}> {/* Added margin bottom */}
  website:
  <a href={contactInfo.website} target='_blank' rel='noopener noreferrer' className='text-sm text-gray-500 ml-2' style={{ fontFamily: 'CFont' }}>
    {contactInfo.website}
  </a> {/* Added margin left */}
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
      </div>
     </div>
     </div>
    </div>
  );
};

export default FProgramDetailPage;
