import React from "react";
import { Link } from "react-router-dom";
import "./SideNav.css"; // Make sure to create this CSS file

export default function SideNav() {
  return (
    <div className='sidenav'>
      <h1>SFL</h1>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/program">Programs</Link></li>
        <li><Link to="/learners">Learners</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
        <li><Link to="/assessment">Assessment</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </div>
  );
}
