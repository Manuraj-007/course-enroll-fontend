import React, { useState } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import CourseCard from './CourseCard';

export default function CourseCatalog({ courses, enrollments, onEnrollClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Extract unique categories from courses list
  const categories = Array.from(new Set(courses.map(c => c.category).filter(Boolean)));

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter ? course.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const getEnrollmentCount = (courseId) => {
    return enrollments.filter(e => e.courseId === courseId).length;
  };

  return (
    <div className="container" style={{ paddingBottom: '60px' }}>
      <section className="hero-section">
        <span className="hero-tag">Empower Your Future</span>
        <h1>Expand Your Knowledge & Skills</h1>
        <p>Browse through our interactive academic course catalog, register for premium lectures, and manage your student enrollments with ease.</p>
      </section>

      {/* Filters row */}
      <div className="controls-row">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search by course title or instructor..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div style={{ width: '200px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} style={{ color: 'var(--text-muted)' }} />
          <select 
            value={categoryFilter} 
            onChange={e => setCategoryFilter(e.target.value)}
            style={{ width: '100%' }}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Courses display */}
      {filteredCourses.length > 0 ? (
        <div className="course-grid">
          {filteredCourses.map(course => (
            <CourseCard 
              key={course.id}
              course={course}
              enrollmentCount={getEnrollmentCount(course.id)}
              onEnroll={onEnrollClick}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <BookOpen size={48} />
          <h3>No Courses Found</h3>
          <p style={{ marginTop: '8px' }}>We couldn't find any courses matching your search query or selected category.</p>
        </div>
      )}
    </div>
  );
}
