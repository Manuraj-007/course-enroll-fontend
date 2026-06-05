import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

export default function EnrollModal({ isOpen, onClose, onEnroll, course }) {
  const [studentName, setStudentName] = useState('');

  if (!isOpen || !course) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentName.trim()) return;
    onEnroll(course.id, studentName.trim());
    setStudentName('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Student Enrollment</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px', padding: '16px', background: 'var(--primary-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', fontWeight: 600 }}>Enrolling in</span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--primary-dark)', display: 'block', marginTop: '4px' }}>
              {course.title}
            </strong>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'block', marginTop: '4px' }}>
              Instructor: {course.instructor}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="student-name">Student Full Name</label>
            <input 
              id="student-name"
              type="text" 
              value={studentName} 
              onChange={e => setStudentName(e.target.value)}
              placeholder="e.g. Eleanor Vance"
              required 
              autoFocus
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Check size={16} />
              Confirm Enrollment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
