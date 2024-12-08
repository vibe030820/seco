import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import './Reviewsection.css';

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
    name,
    image,
    endDate,
    description,
    sector,
    
    startDate,
    Eligibility,
    Incentives,
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
      <div className="overflow-auto">
       <div className="text-left mb-8">
       <p className='text-4xl font-bold my-4' style={{fontFamily: 'CFont'}}>
                {name}
              </p>
        <div className="flex border-b border-gray-300 justify-left mt-4"></div>
      <div className='bg-white h-full w-full font-poppins justify-center'>
        <div className='flex justify-center mt-4 '>
          <div className='w-full lg:w-4/6 grid grid-cols-1 lg:grid-cols-3 gap-8 '> 
            <div className='col-span-1 lg:col-span-3 order-1 lg:order-1'>
              <img
                src={image}
                className='w-full h-auto object-fit rounded-lg'
                alt={name}
              />
            </div>
            
            <div className='col-span-1 mb-0 lg:col-span-2 order-2 lg:order-2 mr-0 lg:mr-6 p-4'> 
             

              <nav className="bg-white rounded-3xl">
                <div className="max-w-6xl mx-auto py-2">
                  <div className="flex justify-start space-x-6">
                    <div className="flex border-b border-gray-300 rounded-3xl"> 
                      <Link 
                        to="details" 
                        smooth={true} 
                        duration={500} 
                        offset={-80}
                        className={`text-gray-700 text-sm hover:text-blue-600 relative mx-2 ${activeTab === 'Details' ? 'border-blue-600 pb-1' : ''}`}
                        onSetActive={() => handleSetActive('Details')}
                        style={{fontFamily: 'CFont'}}
                      >
                        details
                      </Link>
                      <Link 
                        to="eligibility" 
                        smooth={true} 
                        duration={500} 
                        offset={-80}
                        className={`text-sm text-gray-500 hover:text-blue-600 relative
                        ${activeTab === 'Eligibility' ? 'border-blue-600 pb-1' : ''} mx-2`}
                        onSetActive={() => handleSetActive('Eligibility')}
                        style={{fontFamily: 'CFont'}}
                      >
                        eligibility
                      </Link>
                      <Link 
                        to="incentives" 
                        smooth={true} 
                        duration={500} 
                        offset={-80}
                        className={`text-sm text-gray-500 hover:text-blue-600 relative
                        ${activeTab === 'Incentives' ? 'border-blue-600 pb-1' : ''}    mx-2`}
                        onSetActive={() => handleSetActive('Incentives')}
                        style={{fontFamily: 'CFont'}}
                      >
                        incentives
                      </Link>
                      <Link 
                        to="faq" 
                        smooth={true} 
                        duration={500} 
                        offset={-80}
                        className={`text-sm text-gray-500 hover:text-blue-600 relative
                        ${activeTab === 'FAQs' ? 'border-blue-600 pb-1' : ''} mx-2`}
                        onSetActive={() => handleSetActive('FAQs')}
                        style={{fontFamily: 'CFont'}}
                      >
                        faqs
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
              <hr className='my-4 border-t border-gray-300' />
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

            <div id='eligibility' className='mt-6'>
              <p className='font-medium'style={{
                    fontFamily: 'CFont',
                    textTransform: 'lowercase' 
                    }}>eligibility</p>
              <hr className='my-4 border-t border-gray-300' />
              <div className='flex flex-col gap-6'>
                <p style={{
                    fontFamily: 'CFont',
                    
                    }}>{Eligibility}</p>
                {/* <p style={{
                    fontFamily: 'CFont',
                    textTransform: 'lowercase' 
                    }}>startup stage for applications:</p>
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
</p> */}

                
                {/* <p style={{
                    fontFamily: 'CFont',
                    textTransform: 'lowercase' 
                    }}>For:</p>
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
              <p className='font-medium'style={{
                    fontFamily: 'CFont',
                    
                    }}>incentives</p>
              <hr className='my-4 border-t border-gray-300' />
              <div className='flex flex-col gap-6'>
                
               
                <p style={{
                    fontFamily: 'CFont',
                    
                    }}>
                  {Incentives}
                </p>
                
                {/* <p style={{
                    fontFamily: 'CFont',
                    textTransform: 'lowercase' 
                    }}>non-fiscal incentives:</p>
                
                <p style={{
                    fontFamily: 'CFont',
                    
                    }}>-{incentives.nonFiscal}</p> */}
              </div>
            </div>
            {/* <div id='portfolio' className='mt-6'>
              <p className='font-medium'style={{
                    fontFamily: 'CFont',
                    
                    }}>portfolio</p>
              <hr className='my-4 border-t border-gray-300' />
              <div className='flex flex-col gap-6'>
                <p style={{
                    fontFamily: 'CFont',
                    
                    }}>about:</p>
                <p style={{
                    fontFamily: 'CFont',
                    textTransform: 'lowercase' 
                    }}>
{organizerDetails}                </p>
                
                <p style={{
                    fontFamily: 'CFont',
                    
                    }}>portfolio companies:</p>
                <p style={{
                    fontFamily: 'CFont',
                    
                    }}>{portfolioCompanies}</p>
                <div>
      <p style={{
                    fontFamily: 'CFont',
                    
                    }}>logos:</p>
      <Slider {...settings}>
        {logos.map((logo, index) => (
          <div key={index} className="p-4">
            <img 
              src={logo} 
              alt={`Logo ${index + 1}`} 
              className="mx-auto" 
              style={{ maxWidth: '100%', height: '80px' }} // Responsive image
            />
          </div>
        ))}
      </Slider>
    </div>
              </div>
            </div> */}
            {/* <div id='faq' className='mt-6 lg:mb-44'>
      <p className='font-medium'style={{
                    fontFamily: 'CFont',
                    
                    }}>faqs</p>
      <hr className='my-4 border-t border-gray-300' />
      <div className='flex flex-col gap-6'>
        {faqs.map((faq, index) => (
          <div key={index} className='border-b border-gray-200 pb-2'>
            <div
              className='flex justify-between cursor-pointer'
              onClick={() => toggleAnswer(index)}
            >
              <p className='font'style={{
                    fontFamily: 'CFont',
                     
                    
                    }}>{faq.question}</p>
              <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                <span className='material-icons'>expand_more</span>
              </span>
            </div>
            {openIndex === index && (
              <div className='mt-2 text-gray-600'style={{
                fontFamily: 'CFont',
                
                }}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div> */}
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
                      onClick={() => window.location.href = 'https://getseco.com/contact-1'}
                      className="rounded-xl text-sm text-black bg-[#F99F31] hover:text-gray-100 hover:bg-[#FACB82] w-full h-12 px-8"
                      style={{ fontFamily: 'CFont' }}
                    >
                      apply
                    </button>
                  </div>
                  {/* <div className='flex justify-between mb-4'>
      <div className='flex flex-row gap-2'>
        <div className='flex justify-center items-center w-10 h-12 rounded-lg text-gray-800'>
          <span className="material-icons">group</span> 
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
   

    </div> */}

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

    {/* <div id='location' className='flex  flex-row gap-2 mb-6'> 
    <div className="w-10 border-2 border-slate-300 rounded-md h-10 flex items-center justify-center"> 
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
    </div> */}

   

    <div id='Hosted' className='mb-4'> {/* Added bottom margin */}
      <p style={{
                    fontFamily: 'CFont',
                    
                    }}>industry</p>
      <hr className='my-4 border-t border-slate-300' />
      <div className='flex flex-wrap gap-2'style={{
                    fontFamily: 'CFont',
                    
                    }}> {/* Allows items to wrap */}
        
          <div className='bg-gray-200 rounded-full px-2 py-1 text-xs'>
            {sector}
          </div>
        
      </div>
    </div>


{/* */}


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
