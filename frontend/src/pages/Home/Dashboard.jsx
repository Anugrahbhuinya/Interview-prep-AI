import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { CARD_BG } from "../../utils/data";
import SummaryCard from "../../components/cards/SummaryCard";
import SpinLoader from "../../components/loader/SpinLoader";
import CreateSessionForm from "./CreateSessionForm";
import moment from "moment";
import DeleteAlertContent from "../../components/DeleteAlertContent";

// Modal Component
const Modal = ({ isOpen, onClose, hideHeader, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
        {!hideHeader && (
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">{title || "Modal Title"}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

// DashboardLayout (mocked for simplicity)
const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold">Interview Prep Dashboard</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSession = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      console.log("Sessions data:", response.data);
      setSessions(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      toast.error("Failed to fetch sessions");
    } finally {
      setLoading(false);
    }
  };
  

  const deleteSession = async () => {
    if (!openDeleteAlert.data) return;
    try {
      await axiosInstance.delete(
        API_PATHS.SESSION.DELETE(openDeleteAlert.data._id)
      );
      setSessions(
        sessions.filter((session) => session._id !== openDeleteAlert.data._id)
      );
      toast.success("Session deleted successfully");
    } catch (error) {
      console.error("Error deleting session:", error);
      toast.error("Failed to delete session");
    } finally {
      setOpenDeleteAlert({ open: false, data: null });
    }
  };

  useEffect(() => {
    fetchAllSession();
  }, []);

  // Filter sessions to ensure valid IDs
  const validSessions = sessions.filter((session) => session && session._id);

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-4 pb-4">
        {loading ? (
          <div className="flex justify-center mt-10">
            <SpinLoader />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
            {validSessions.length === 0 ? (
              <p className="text-center col-span-3 text-gray-500">
                No sessions available. Create a new one!
              </p>
            ) : (
              validSessions.map((data, index) => {
                console.log("Rendering session:", data); // ✅ log each card's data

                return (
                  <SummaryCard
                    key={data._id ?? `session-${index}`}
                    colors={CARD_BG[index % CARD_BG.length]}
                    role={data?.role || ""}
                    topicsToFocus={data?.topicsToFocus || []}
                    experience={data?.experience || ""}
                    questions={data?.questions?.length || "-"}
                    description={data?.description || ""}
                    lastUpdated={
                      moment(data?.updatedAt).format("DD MMMM YYYY") || "..."
                    }
                    onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                    onDelete={() =>
                      setOpenDeleteAlert({
                        open: true,
                        data: { ...data, id: data._id },
                      })
                    }
                  />
                );
              })
            )}
          </div>
        )}
        <button
          className="h-12 md:h-12 flex items-center justify-center gap-3 bg-gradient-to-r from-[#ff9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20"
          onClick={() => setOpenCreateModal(true)}
        >
          <Plus className="text-2xl text-white" />
          Add New
        </button>
      </div>
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <CreateSessionForm />
      </Modal>
      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete Session"
      >
        <DeleteAlertContent
          content="Are you sure you want to delete this session detail?"
          onDelete={deleteSession}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
