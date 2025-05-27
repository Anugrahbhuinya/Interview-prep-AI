import React, { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { LucideCircleAlert, LucideListCollapse } from "lucide-react";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import QuestionCard from "../../components/cards/QuestionCard";
import AIResponsePreview from "./components/AIResponsePreview";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/loader/SkeletonLoader";
import SpinLoader from "../../components/loader/SpinLoader";

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  const fetchSessionDetailsById = async () => {
    console.log("Session ID:", sessionId);
    console.log("Axios headers:", axiosInstance.defaults.headers);
    if (!sessionId) {
      console.error("No sessionId provided");
      setErrorMsg("Invalid session ID.");
      toast.error("No session ID provided.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );
      console.log(
        "Session API Response:",
        response.data,
        "Status:",
        response.status
      );
      if (response.data?._id) {
        setSessionData(response.data);
      } else {
        console.warn("No session data in response:", response.data);
        setErrorMsg(response.data?.error || "No session data found.");
        toast.error(response.data?.error || "Failed to load session data.");
      }
    } catch (error) {
      console.error("Error fetching session:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      const status = error.response?.status;
      let message = "Failed to fetch session details.";
      if (status === 401) {
        message = "Please log in to access this session.";
      } else if (status === 404) {
        message = "Session not found.";
      }
      setErrorMsg(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const generateConceptExplanation = async (question) => {
    console.log('Sending question:', question);
    try {
      setErrorMsg('');
      setExplanation(null);
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, { question });
      
      if (response.data?.title && response.data?.explanation) {
        setExplanation(response.data);
      } else {
        throw new Error('Invalid explanation data received.');
      }
    } catch (error) {
      console.error('Error generating explanation:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        'Failed to generate explanation. Try again later.';
      setExplanation(null);
      setErrorMsg(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleQuestionPinStatus = async (questionId) => {
    if (!questionId) {
      console.error('No questionId provided');
      toast.error('Invalid question ID.');
      return;
    }
    setIsUpdateLoader(true);
    try {
      const url = API_PATHS.QUESTION.PIN(questionId);
      console.log('Pin URL:', url);
      const response = await axiosInstance.put(url); // Changed from post to put
      if (response.data && response.data.question) {
        fetchSessionDetailsById();
        toast.success("Pin status updated.");
      } else {
        throw new Error("Failed to update pin status.");
      }
    } catch (error) {
      console.error("Error toggling pin status:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      const errorMessage =
        error.response?.status === 404
          ? 'Question not found.'
          : error.response?.status === 401
          ? 'Please log in to update pin status.'
          : 'An error occurred while updating pin status.';
      toast.error(errorMessage);
    } finally {
      setIsUpdateLoader(false);
    }
  };

  // InterviewPrep.jsx
// InterviewPrep.jsx
const uploadMoreQuestions = async () => {
  if (!sessionData) return;
  setIsUpdateLoader(true);
  try {
    const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
      role: sessionData.role,
      experience: sessionData.experience,
      topicsToFocus: sessionData.topicsToFocus,
      numberOfQuestions: 10,
    });

    const generateQuestions = aiResponse.data;
    

    if (!Array.isArray(generateQuestions) || generateQuestions.length === 0) {
      throw new Error("No valid questions received from AI.");
    }

    for (const [index, q] of generateQuestions.entries()) {
      if (!q.question || !q.answer || typeof q.question !== 'string' || typeof q.answer !== 'string') {
        throw new Error(`Invalid question at index ${index}: ${JSON.stringify(q)}`);
      }
    }

    console.log("Sending questions to:", `/api/questions/${sessionId}`);
    const response = await axiosInstance.post('/api/questions/add', { sessionId, questions: generateQuestions });

    
    

    if (response.data) {
      toast.success("Added More Q&A");
      fetchSessionDetailsById();
    } else {
      throw new Error("Failed to add questions.");
    }
  } catch (error) {
    console.error("Error uploading more questions:", error);
    if (error.response) {
      console.log("Server response:", JSON.stringify(error.response.data, null, 2));
    }
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    setErrorMsg(errorMessage);
    toast.error(errorMessage);
  } finally {
    setIsUpdateLoader(false);
  }
};

  useEffect(() => {
    fetchSessionDetailsById();
  }, [sessionId]);

  return (
    <DashboardLayout>
      {isLoading && !sessionData && (
        <div className="text-center py-4">
          <SkeletonLoader />
        </div>
      )}
      {errorMsg && !sessionData && (
        <div className="flex items-center text-red-600 py-4" role="alert">
          <LucideCircleAlert className="mr-2" />
          {errorMsg}
        </div>
      )}
      {sessionData && (
        <>
          <RoleInfoHeader
            role={sessionData.role || "Unknown Role"}
            topicsToFocus={sessionData.topicsToFocus || "No topics specified"}
            experience={sessionData.experience || "Not specified"}
            questions={sessionData.questions?.length || 0}
            description={sessionData.description || "No description available"}
            lastUpdated={
              sessionData.updatedAt
                ? moment(sessionData.updatedAt).format("DD MMMM YYYY")
                : "Not updated"
            }
          />
          <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
            <h2 className="text-lg font-semibold text-black">
              Interview Q & A
            </h2>
            <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
              <div
                className={`col-span-12 ${
                  openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
                }`}
              >
                <AnimatePresence>
                  {sessionData.questions?.map((data, index) => {
                    try {
                      return (
                        <motion.div
                          key={data._id || index}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{
                            duration: 0.4,
                            type: "spring",
                            stiffness: 100,
                            delay: index * 0.1,
                            damping: 15,
                          }}
                        >
                          <QuestionCard
                            question={data.question || "No question"}
                            answer={data.answer || "No answer"}
                            onLearnMore={() =>
                              generateConceptExplanation(data.question)
                            }
                            isPinned={data.isPinned || false}
                            onTogglePin={() =>
                              toggleQuestionPinStatus(data._id)
                            }
                            isLoading={isUpdateLoader && data._id}
                          />
                          {!isLoading &&
                            sessionData.questions.length === index + 1 && (
                              <div className="flex items-center justify-center mt-5">
                                <button
                                  className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
                                  disabled={isLoading || isUpdateLoader}
                                  onClick={uploadMoreQuestions}
                                  aria-label="Load more questions"
                                >
                                  {isUpdateLoader ? (
                                    <SpinLoader />
                                  ) : (
                                    <LucideListCollapse className="text-lg" />
                                  )}
                                  Load More
                                </button>
                              </div>
                            )}
                        </motion.div>
                      );
                    } catch (error) {
                      console.error(
                        "Error rendering question:",
                        error,
                        "Question:",
                        data
                      );
                      return null;
                    }
                  })}
                </AnimatePresence>
                {!isLoading && sessionData.questions?.length === 0 && (
                  <p className="text-gray-500 text-center">
                    No questions available. Click "Load More" to fetch
                    questions.
                  </p>
                )}
              </div>
              <Drawer
                isOpen={openLearnMoreDrawer}
                onClose={() => setOpenLearnMoreDrawer(false)}
                title={
                  isLoading ? "Loading..." : explanation?.title || "Explanation"
                }
              >
                <div
                  aria-live="polite"
                  style={{
                    maxHeight: '70vh',
                    overflowY: 'auto',
                    paddingRight: '8px',
                  }}
                  className="custom-scrollbar"
                >
                  {errorMsg && (
                    <p
                      className="flex gap-2 text-sm text-amber-600 font-medium"
                      role="alert"
                    >
                      <LucideCircleAlert className="mt-1" />
                      {errorMsg}
                    </p>
                  )}
                  {isLoading && <SkeletonLoader />}
                  {!isLoading && explanation && (
                    <AIResponsePreview content={explanation.explanation} />
                  )}
                </div>
              </Drawer>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default InterviewPrep;