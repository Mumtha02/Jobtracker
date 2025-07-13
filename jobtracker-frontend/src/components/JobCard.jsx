import React from "react";

const JobCard = ({ job, onDelete }) => (
  <div style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
    <h3>{job.position} @ {job.company_name}</h3>
    <p>Status: <strong>{job.status}</strong></p>
    <p>Date: {job.application_date}</p>
    <button onClick={() => onDelete(job.id)}>Delete</button>
  </div>
);

export default JobCard;
