import React from "react";
import './footer.css'; // Optional: For custom styling
const isLargeScreen = window.innerWidth >= 768; // Adjust the breakpoint as needed

const Footer = () => {
  return (
    <footer className="bg-black py-10 pl-10 pr-8 md:px-20 rounded-t-[50px]">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start px-4 space-y-10 md:space-y-0 footer-text">
        
        {/* Left Section: Logo and Waitlist Form */}
        <div className="flex flex-col items-start">
          {/* Logo */}
          <h1
            className="font-bold text-[139px] lowercase"
            style={{ fontFamily: 'CustomFont' }}
          >
            seco
          </h1>

          {/* Waitlist Form */}
          <div className="footer-waitlist mt-4">
            <p
              className="text-lg mb-4 lowercase"
              style={{ fontFamily: 'CFont', fontSize: '34px' }}
            >
              ready to get started?
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
  contact us
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
  button:hover span {
  border-radius: 50%;
    background-color: white; /* Invert background color of span on hover */
    color: black; /* Invert text color of span on hover */
  }
`}</style>

          </div>

          <div
            className="mt-5 text-[16px] lowercase"
            style={{ fontFamily: 'CFont' }}
          >
            <p>&copy; 2024 by seco.</p>
          </div>
        </div>

        {/* Right Section: Links */}
        <div className="mt-10 md:mt-[340px]" style={{ marginTop: isLargeScreen ? '340px' : '10px' }}>
          <div className="flex flex-col md:flex-row md:space-x-20 space-y-10 md:space-y-0">
            {/* Quick Links */}
            <div className="flex flex-col">
              <p className="text-lg mb-2 lowercase" style={{ fontFamily: 'CFont' }}>quick links</p>
              <ul className="list-none space-y-2">
                <li><a href="https://twisteddco.wixstudio.io/getseco" className="no-underline" style={{ fontFamily: 'CFont' }}>home</a></li>
                <li><a href="#" className="no-underline" style={{ fontFamily: 'CFont' }}>discover</a></li>
                <li><a href="https://twisteddco.wixstudio.io/getseco/contact" className="no-underline" style={{ fontFamily: 'CFont' }}>contact</a></li>
              </ul>
            </div>

            {/* Socials */}
            <div className="flex flex-col">
              <p className="text-lg mb-2 lowercase" style={{ fontFamily: 'CFont' }}>socials</p>
              <ul className="list-none space-y-2">
                <li><a href="https://www.linkedin.com/company/getseco/" className="no-underline" style={{ fontFamily: 'CFont' }}>linkedin</a></li>
                <li><a href="https://www.instagram.com/get.seco/" className="no-underline" style={{ fontFamily: 'CFont' }}>instagram</a></li>
                <li><a href="https://x.com/getsecoapp" className="no-underline" style={{ fontFamily: 'CFont' }}>x</a></li>
              </ul>
            </div>

            {/* Policy */}
            <div className="flex flex-col">
              <p className="text-lg mb-2 lowercase" style={{ fontFamily: 'CFont' }}>policy</p>
              <ul className="list-none space-y-2">
                <li><a href="#" className="no-underline" style={{ fontFamily: 'CFont' }}>terms & conditions</a></li>
                <li><a href="https://twisteddco.wixstudio.io/getseco/privacy-policy" className="no-underline" style={{ fontFamily: 'CFont' }}>privacy policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
