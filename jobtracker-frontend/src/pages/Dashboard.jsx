import React, { useEffect, useState } from "react";
import API from "../services/api";
import JobCard from "../components/JobCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
  company_name: "",
  position: "",
  status: "Applied",
  application_date: "",
  notes: "",
});
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

  const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await API.post("jobs/", formData);
    setFormData({
      company_name: "",
      position: "",
      status: "Applied",
      application_date: "",
      notes: "",
    });
    fetchJobs(); // reload jobs
  } catch (err) {
    alert("Error adding job");
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
<h2>Add Job Application</h2>
<form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
  <input
    name="company_name"
    placeholder="Company Name"
    value={formData.company_name}
    onChange={handleChange}
    required
  />
  <input
    name="position"
    placeholder="Position"
    value={formData.position}
    onChange={handleChange}
    required
  />
  <input
    type="date"
    name="application_date"
    value={formData.application_date}
    onChange={handleChange}
    required
  />
  <select name="status" value={formData.status} onChange={handleChange}>
    <option value="Applied">Applied</option>
    <option value="Interviewing">Interviewing</option>
    <option value="Rejected">Rejected</option>
    <option value="Offer">Offer</option>
  </select>
  <textarea
    name="notes"
    placeholder="Notes"
    value={formData.notes}
    onChange={handleChange}
  />
  <button type="submit">Add Job</button>
</form>
      
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default Dashboard;
