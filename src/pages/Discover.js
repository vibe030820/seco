// import React, { useEffect, useState } from 'react';
// import './Discover.css';
// import ArticleCard from '../components/ArticleCard'; // Import the ArticleCard component
// import Pagination from '../components/Pagination'; // Import the Pagination component
// import { db } from '../firebase'; // Import Firestore instance
// import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions

// function App() {
//   const [programs, setPrograms] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const programsPerPage = 6; // Set how many programs to display per page
//   const [filterCategory, setFilterCategory] = useState('all');
//   const [filterCity, setFilterCity] = useState('any city');

//   // Fixed orientation pattern
//   const orientationPattern = ['vertical', 'horizontal', 'vertical', 'vertical', 'horizontal', 'horizontal'];

//   // Fetch programs from Firestore
//   useEffect(() => {
//     const fetchPrograms = async () => {
//       const programsCollection = collection(db, 'programs');
//       const programsSnapshot = await getDocs(programsCollection);
//       const programsList = programsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setPrograms(programsList);
//     };

//     fetchPrograms();
//   }, []);

//   // Apply filters based on selected values
//   const filteredPrograms = programs.filter(program => {
//     const matchesCategory = filterCategory === 'all' || program.industry.includes(filterCategory);
//     const matchesCity = filterCity === 'any city' || program.location === filterCity;
//     return matchesCategory && matchesCity;
//   });

//   const totalPages = Math.ceil(filteredPrograms.length / programsPerPage);
  
//   const handlePageChange = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   const indexOfLastProgram = currentPage * programsPerPage;
//   const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
//   const currentPrograms = filteredPrograms.slice(indexOfFirstProgram, indexOfLastProgram);

//   return (
//     <div className="app-container">
//       <h1 className="heading">Discover Programs</h1>
//       {/* Dropdown Filters Section */}
//       <div className="filters-container">
//         <p>Show me</p>
//         <div className="filter-dropdown">
//           <select className="dropdown" onChange={e => setFilterCategory(e.target.value)}>
//             <option value="all">All</option>
//             <option value="Finance">Finance</option>
//             <option value="Technology">Technology</option>
//             <option value="Education">Education</option>
//             <option value="Healthcare & Lifesciences">Healthcare & Lifesciences</option>
//             <option value="Media & Entertainment">Media & Entertainment</option>
//             <option value="Retail">Retail</option>
//           </select>
//         </div>
//         <p>programs, active in</p>
//         <div className="filter-dropdown">
//           <select className="dropdown" onChange={e => setFilterCity(e.target.value)}>
//             <option value="any city">Any City</option>
//             <option value="remote">Remote</option>
//             <option value="New York">New York</option>
//             <option value="San Francisco">San Francisco</option>
//             {/* Add more cities as needed */}
//           </select>
//         </div>
//       </div>

//       <br /><br />
//       <div className="articles-container">
//         {/* Article Cards */}
//         {currentPrograms.map((program, index) => (
//           <ArticleCard
//             key={program.id}
//             title={program.title}
//             imageUrl={program.image} // Use the image field
//             author={program.contactInfo.contactPerson} // Adjust as necessary
//             content={program.description}
//             orientation={orientationPattern[index]} // Assign orientation based on the pattern
//           />
//         ))}
//       </div>

//       <br /><br />
//       {/* Pagination Component */}
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={handlePageChange}
//       />

//       {/* Header Section (Below Cards) */}
//       <div className="header-section">
//         <h1 className="main-heading">
//           We have a lot of exciting startup opportunities and candidates — only a few are perfect for you.
//         </h1>
//         <p className="subheading">We’ll help you find the few.</p>
//         <button className="find-button">Find what's next</button>

//         {/* Dropdown Section */}
//         <div className="dropdowns-container">
//           <select className="dropdown">
//             <option>Featured Lists</option>
//             {/* Add more options as needed */}
//           </select>
//           <select className="dropdown">
//             <option>Remote Jobs</option>
//           </select>
//           <select className="dropdown">
//             <option>Jobs by Location</option>
//           </select>
//           <select className="dropdown">
//             <option>Jobs by Role & Location</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

















import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ProgramCard from '../components/ProgramCard'; // Import the ProgramCard component
import { fetchPrograms } from '../components/fetchPrograms';
import Footer from '../components/footer';
import './Discover.css';

function App() {
  const [programs, setPrograms] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterCity, setFilterCity] = useState('any city');

  // Fixed orientation pattern
  const orientationPattern = ['vertical', 'horizontal', 'vertical', 'vertical', 'horizontal', 'horizontal'];

  // Fetch programs from Firestore
  useEffect(() => {
    const loadPrograms = async () => {
      const programsList = await fetchPrograms();
      setPrograms(programsList);
    };

    loadPrograms();
  }, []);

  // Apply filters based on selected values
  const filteredPrograms = programs.filter(program => {
    const matchesCategory = filterCategory === 'all' || program.industry.includes(filterCategory);
    const matchesCity = filterCity === 'any city' || program.location === filterCity;
    return matchesCategory && matchesCity;
  });

  // Calculate the number of programs
  const totalFiltered = filteredPrograms.length;
  const remainder = totalFiltered % 6;

  // Create an array for orientation based on the total number of programs
  const orientationArray = [];
  for (let i = 0; i < totalFiltered; i++) {
    if (i < totalFiltered - remainder) {
      orientationArray.push(orientationPattern[i % 6]);
    } else {
      orientationArray.push('vertical'); // Ensure the last programs are vertical
    }
  }

  return (
    <div>
      <Header />
      <div className="app-container mt-20">
        <h1 className="heading" style={{ fontFamily: 'CFont', fontSize: '48px' }}>
          discover programs
        </h1>
        {/* Dropdown Filters Section */}
        <div className="filters-container">
          <p style={{ fontFamily: 'CFont' }}>show me</p>
          <div className="filter-dropdown">
            <select className="dropdown" onChange={e => setFilterCategory(e.target.value)}>
              <option value="all">all</option>
              <option value="Finance">finance</option>
              <option value="Technology">technology</option>
              <option value="Education">education</option>
              <option value="Healthcare & Lifesciences">healthcare & lifesciences</option>
              <option value="Media & Entertainment">media & entertainment</option>
              <option value="Retail">retail</option>
            </select>
          </div>
          <p style={{ fontFamily: 'CFont' }}>programs, active in</p>
          <div className="filter-dropdown">
            <select className="dropdown" onChange={e => setFilterCity(e.target.value)}>
              <option value="any city">any city</option>
              <option value="remote">Remote</option>
              <option value="india">India</option>
              {/* Add more cities as needed */}
            </select>
          </div>
        </div>

        <br /><br />
        <div className="articles-container">
          {/* Program Cards */}
          {filteredPrograms.map((program, index) => (
            <ProgramCard
              key={program.id} // Add a key for each program
              id={program.id}
              title={program.title}
              image={program.image} // Use the image field
              location={program.location} // Adjust as necessary
              description={program.description}
              category={program.industry.join(', ')} // Join the array for display
              orientation={orientationArray[index]} // Assign orientation based on the array
            />
          ))}
        </div>

        <br /><br />

        {/* Header Section (Below Cards) */}
        <div className="h-section bg-[#F99F31] w-full h-96 flex flex-col items-center -mb-12 justify-center">
          <h1 className="main-heading text-black text-center text-2xl font-bold mr-5 ml-5 mb-4 px-4" style={{ fontFamily: 'CFont' }}>
            built to empower founders, seco brings all your interactions with incubators, accelerators, events into one intuitive platform.
          </h1>
          <p className="subheading text-black text-center text-lg mb-6 px-4" style={{ fontFamily: 'CFont' }}>
            be the first to access.
          </p>
          <button
            onClick={() => window.location.href = 'https://getseco.com/contact'}
            className="flex items-center bg-white text-black px-4 py-2 rounded-full transition duration-300 ease-in-out hover:bg-black hover:text-white"
            style={{
              fontFamily: 'CFont',
              fontSize: '16px',
              borderRadius: '30px', // Ensures the button has rounded corners
              padding: '12px 24px',
            }}
          >
            join waitlist
            <span
              className="ml-2 flex items-center justify-center transition duration-300 ease-in-out bg-black text-white"
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%', // Make the span circular
              }}
            >
              <span className="material-icons">chevron_right</span>
            </span>
          </button>

          <style jsx>{`
            a:hover span {
              border-radius: 50%;
              background-color: white; /* Invert background color of span on hover */
              color: black; /* Invert text color of span on hover */
            }
          `}</style>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
