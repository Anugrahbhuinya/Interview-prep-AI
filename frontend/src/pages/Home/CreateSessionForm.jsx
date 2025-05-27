import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpinLoader from "../../components/loader/SpinLoader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Input from "../../components/inputs/input";

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill the required details");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      const generateQuestions = aiResponse.data;

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generateQuestions,
      });

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data.session._id}`);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-[90vw] max-w-md">
        <h3 className="text-xl font-bold mb-2">Start a New Interview Journey</h3>
        <p className="text-sm text-gray-600 mb-4">
          Fill out a few quick details and unlock your personalized set of interview questions
        </p>

        <form onSubmit={handleCreateSession} className="flex flex-col gap-4">
          <Input
            value={formData.role}
            onChange={({ target }) => handleChange("role", target.value)}
            label="Target Role"
            placeholder="e.g. Frontend Developer"
            type="text"
          />

          <Input
            value={formData.experience}
            onChange={({ target }) => handleChange("experience", target.value)}
            label="Years of Experience"
            placeholder="e.g. 1 year, 3 years"
            type="number"
          />

          <Input
            value={formData.topicsToFocus}
            onChange={({ target }) => handleChange("topicsToFocus", target.value)}
            label="Topics to Focus On"
            placeholder="e.g. React, Node"
            type="text"
          />

          <Input
            value={formData.description}
            onChange={({ target }) => handleChange("description", target.value)}
            label="Description"
            placeholder="(Any specific goals for this session)"
            type="text"
          />

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="submit"
            className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-all flex items-center justify-center disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading && <SpinLoader />}{" "}
            <span className="ml-2">Create Session</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSessionForm;
