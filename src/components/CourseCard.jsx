import React from 'react';
import { Users, User, ArrowRight } from 'lucide-react';

export default function CourseCard({ course, enrollmentCount, onEnroll }) {
  const isFull = enrollmentCount >= course.capacity;
  const initial = course.instructor ? course.instructor.charAt(0) : '?';
  const progressPercent = Math.min(100, (enrollmentCount / course.capacity) * 100);

  return (
    <div className="card-glass">
      <div className="course-card-body">
        <span className="course-category">{course.category || 'General'}</span>
        <h3 className="course-card-title">{course.title}</h3>
        <p className="course-card-desc">{course.description}</p>
        
        {/* Progress Bar for enrollment capacity */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-muted)' }}>
            <span>Class Capacity</span>
            <span style={{ color: isFull ? 'var(--accent)' : 'var(--text-title)' }}>
              {enrollmentCount} / {course.capacity}
            </span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ 
              width: `${progressPercent}%`, 
              height: '100%', 
              backgroundColor: isFull ? 'var(--accent)' : 'var(--primary)',
              borderRadius: '10px',
              transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' 
            }} />
          </div>
        </div>

        <div className="course-card-footer">
          <div className="instructor-info">
            <div className="avatar">
              {initial}
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1 }}>Instructor</span>
              <span className="instructor-name">{course.instructor}</span>
            </div>
          </div>
          
          <button 
            onClick={() => onEnroll(course)}
            disabled={isFull}
            className={`btn ${isFull ? 'btn-outline' : 'btn-primary'}`}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            {isFull ? 'Full' : 'Enroll'}
            {!isFull && <ArrowRight size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}
