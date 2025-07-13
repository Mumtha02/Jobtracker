import React, { useEffect, useState } from "react";
import API from "../services/api";
import JobCard from "../components/JobCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("jobs/");
      setJobs(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await API.delete(`jobs/${id}/`);
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>My Job Applications</h2>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default Dashboard;
