import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero-img.png";
import { APP_FEATURES } from "../utils/data.js";
import { LuSparkles } from "react-icons/lu";
import Login from "./Auth/Login.jsx";
import Signup from "./Auth/Signup.jsx";
import Modal from "../components/Modal.jsx";
import { UserContext } from "../context/UserContext.jsx";
import ProfileInfoCard from "../components/cards/ProfileInfoCard.jsx";

function LandingPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen bg-[#FDF8EE] flex flex-col">
      <div className="relative flex-1">
        {/* Pink side borders */}
        <div className="absolute inset-y-0 left-0 w-6 sm:w-12 bg-[#FFE6E6] z-0"></div>
        <div className="absolute inset-y-0 right-0 w-6 sm:w-12 bg-[#FFE6E6] z-0"></div>

        {/* Main content container */}
        <div className="relative p-4 sm:p-6 max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex justify-between items-center py-2 border-b border-gray-200">
            <div className="text-lg sm:text-xl font-bold text-gray-800 select-none">
              Interview Prep AI
            </div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="px-3 py-1 sm:px-4 sm:py-1.5 bg-[#FF6F61] text-white rounded-full hover:bg-[#FF8A80] transition-colors text-sm sm:text-base"
                onClick={() => setOpenAuthModal(true)}
                aria-label="Open Login or Signup Modal"
              >
                Login / Sign Up
              </button>
            )}
          </header>

          {/* Hero Section */}
          <div className="flex flex-col items-center py-4 sm:py-6 gap-3 sm:gap-4">
            <div className="text-center max-w-full md:max-w-[60%]">
              <div className="inline-flex items-center bg-[#FFF3E0] text-[#FFB300] px-2 py-0.5 rounded-full text-[0.65rem] sm:text-xs mb-2 select-none">
                <LuSparkles className="mr-1 w-3 h-3" /> AI Powered
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.1] text-gray-800">
                Ace Interviews <br />
                with <span className="text-[#FFB300]">AI-Powered</span> Learning
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 my-2 sm:my-3 max-w-md mx-auto">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery — your ultimate interview toolkit is
                here.
              </p>
              <button
                className="px-3 py-1 sm:px-4 sm:py-1.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-sm sm:text-base"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
            <div className="mt-6">
              <img
                src={heroImg}
                alt="Professionals collaborating with AI interface"
                className="w-full max-w-[400px] sm:max-w-[600px] md:max-w-[800px] mx-auto rounded-lg shadow-lg"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/800x400?text=Hero+Image+Not+Found";
                  e.target.alt = "Placeholder image";
                }}
              />
            </div>
          </div>

          {/* User Profile Section */}
          <div className="py-4 sm:py-6 border-b border-gray-200">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
              Frontend Developer
            </h3>
            <p className="text-gray-600 text-sm sm:text-base space-y-1 sm:space-y-2">
              <span>React.js, DOM manipulation, CSS Flexbox</span>
              <br />
              <span className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 bg-gray-100 rounded-full text-xs sm:text-sm mr-2">
                Experience 2 Years
              </span>
              <span className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 bg-gray-100 rounded-full text-xs sm:text-sm mr-2">
                10 Q&A
              </span>
              <span className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 bg-gray-100 rounded-full text-xs sm:text-sm">
                Last Updated 30th April
              </span>
            </p>
          </div>

          {/* Interview Q&A Section */}
          <div className="py-4 sm:py-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Interview Q & A
            </h3>
            {APP_FEATURES && APP_FEATURES.length > 0 ? (
              APP_FEATURES.map((qa, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 py-3 sm:py-4"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer text-base sm:text-lg font-medium text-gray-800 select-none"
                    onClick={() => toggleQuestion(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        toggleQuestion(index);
                    }}
                    aria-expanded={expandedQuestion === index}
                    aria-controls={`answer-${index}`}
                  >
                    <span>{qa.question}</span>
                    <span className="text-xl sm:text-2xl">
                      {expandedQuestion === index ? "−" : "+"}
                    </span>
                  </div>
                  {expandedQuestion === index && (
                    <div
                      id={`answer-${index}`}
                      className="mt-3 p-3 sm:p-4 bg-gray-50 rounded-lg"
                    >
                      <p className="text-gray-600 text-sm sm:text-base">
                        {qa.answer}
                      </p>
                      <button className="mt-3 text-indigo-600 hover:underline text-sm sm:text-base">
                        Learn More
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-sm sm:text-base">
                No questions available at the moment.
              </p>
            )}
          </div>

          {/* CSS Flexbox Guide Section */}
          <div className="py-4 sm:py-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              CSS Flexbox: A Beginner’s Guide
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              CSS Flexbox is a powerful layout model in CSS. It’s designed to
              make it easier to design flexible and responsive web page layouts
              without having to rely on floats or positioning. Think of it as a
              way to organize and distribute space among items in a container
              (the parent element) to best fit the available space, or to
              display elements in the right way regardless of your screen size.
            </p>
            <h4 className="text-lg sm:text-xl font-medium text-gray-800 mt-4 sm:mt-6 mb-3">
              Basic Concepts:
            </h4>
            <ol className="list-decimal pl-5 space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base">
              <li>
                <span className="font-semibold text-gray-800">
                  Flex Container
                </span>
                : This is the parent element! You make an element a flex
                container by setting{" "}
                <code className="bg-gray-100 px-1 rounded">display: flex;</code>{" "}
                or{" "}
                <code className="bg-gray-100 px-1 rounded">
                  display: inline-flex;
                </code>{" "}
                on it. All direct children of this container become flex items.
                <pre className="bg-gray-50 p-3 sm:p-4 rounded-lg my-3 text-xs sm:text-sm whitespace-pre-wrap">
                  .container {"{\n  display: flex;\n}"}
                </pre>
              </li>
              <li>
                <span className="font-semibold text-gray-800">Flex Items</span>:
                These are the direct children of the flex container. Flexbox
                controls the layout of these items.
              </li>
              <li>
                <span className="font-semibold text-gray-800">Main Axis</span>:
                This is the primary axis of the flex container. By default, the
                main axis is horizontal (left to right).
              </li>
              <li>
                <span className="font-semibold text-gray-800">Cross Axis</span>:
                This axis runs perpendicular to the main axis. If the main axis
                is horizontal, the cross axis is vertical (top to bottom).
              </li>
              <li>
                <span className="font-semibold text-gray-800">
                  flex-direction
                </span>
                : This property defines the direction of the main axis. Common
                values are:
                <ul className="list-disc pl-5 mt-3 space-y-2">
                  <li>
                    <code className="bg-gray-100 px-1 rounded">row</code>{" "}
                    (default): Horizontal, items are displayed left to right.
                  </li>
                  <li>
                    <code className="bg-gray-100 px-1 rounded">
                      row-reverse
                    </code>
                    : Horizontal, items are displayed right to left.
                  </li>
                </ul>
              </li>
            </ol>
          </div>

          {/* Modal for Login/Signup */}
          <Modal
            isOpen={openAuthModal}
            onClose={() => {
              setOpenAuthModal(false);
              setCurrentPage("login");
            }}
            title={currentPage === "login" ? "Login" : "Sign Up"}
            hideheader={false}
          >
            <div>
              {currentPage === "login" ? (
                <Login setCurrentPage={setCurrentPage} />
              ) : (
                <Signup setCurrentPage={setCurrentPage} />
              )}
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
