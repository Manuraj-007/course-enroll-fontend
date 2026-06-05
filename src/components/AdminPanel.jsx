import React, { useState } from 'react';
import { Plus, Edit, Trash2, Users, BookOpen, Calendar, User } from 'lucide-react';

export default function AdminPanel({ 
  courses, 
  enrollments, 
  onAddCourse, 
  onEditCourse, 
  onDeleteCourse,
  onDeleteEnrollment // Added unenroll support
}) {
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' or 'enrollments'

  // Map course title for enrollments list
  const getCourseTitle = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.title : `Course #${courseId}`;
  };

  const getEnrollmentCount = (courseId) => {
    return enrollments.filter(e => e.courseId === courseId).length;
  };

  return (
    <div className="container" style={{ paddingBottom: '60px', paddingTop: '40px' }}>
      <div className="admin-header">
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-title)' }}>Admin Management Control</h2>
          <p style={{ color: 'var(--text-muted)' }}>Configure classes, update capacities, and view enrollment details.</p>
        </div>
        
        {activeTab === 'courses' && (
          <button className="btn btn-primary" onClick={onAddCourse}>
            <Plus size={16} />
            Create Course
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          <BookOpen size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
          Manage Courses ({courses.length})
        </button>
        <button 
          className={`admin-tab ${activeTab === 'enrollments' ? 'active' : ''}`}
          onClick={() => setActiveTab('enrollments')}
        >
          <Users size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
          Student Enrollments ({enrollments.length})
        </button>
      </div>

      {/* Course List Table */}
      {activeTab === 'courses' && (
        <div className="table-container">
          {courses.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Category</th>
                  <th>Instructor</th>
                  <th style={{ textAlign: 'center' }}>Enrollment</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => {
                  const count = getEnrollmentCount(course.id);
                  return (
                    <tr key={course.id}>
                      <td style={{ fontWeight: 600, color: 'var(--text-title)' }}>{course.title}</td>
                      <td>
                        <span className="course-category" style={{ fontSize: '0.7rem', margin: 0 }}>
                          {course.category || 'General'}
                        </span>
                      </td>
                      <td>{course.instructor}</td>
                      <td style={{ textAlign: 'center', fontWeight: 500 }}>
                        {count} / {course.capacity}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div className="actions-cell" style={{ justifyContent: 'center' }}>
                          <button 
                            className="action-btn-sm" 
                            onClick={() => onEditCourse(course)}
                            title="Edit Course Details"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            className="action-btn-sm delete" 
                            onClick={() => onDeleteCourse(course.id)}
                            title="Delete Course"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: '40px', textAlignment: 'center', color: 'var(--text-muted)', textAlign: 'center' }}>
              <BookOpen size={36} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
              <h4>No Courses Registered</h4>
              <p style={{ fontSize: '0.9rem', marginTop: '6px' }}>Click "Create Course" to add your first educational program.</p>
            </div>
          )}
        </div>
      )}

      {/* Enrollments List Table */}
      {activeTab === 'enrollments' && (
        <div className="table-container">
          {enrollments.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Enrolled Course</th>
                  <th>Date Registered</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map(enrollment => (
                  <tr key={enrollment.id}>
                    <td style={{ fontWeight: 600, color: 'var(--text-title)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <User size={14} style={{ color: 'var(--primary)' }} />
                        {enrollment.studentName}
                      </div>
                    </td>
                    <td>{getCourseTitle(enrollment.courseId)}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={14} />
                        {new Date(enrollment.enrolledAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button 
                        className="btn btn-danger" 
                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        onClick={() => onDeleteEnrollment ? onDeleteEnrollment(enrollment.id) : null}
                      >
                        Unenroll
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: '40px', textAlignment: 'center', color: 'var(--text-muted)', textAlign: 'center' }}>
              <Users size={36} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
              <h4>No Student Enrollments Found</h4>
              <p style={{ fontSize: '0.9rem', marginTop: '6px' }}>Once a student enrolls in a course, their details will display here.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
