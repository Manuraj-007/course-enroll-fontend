import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

export default function CourseModal({ isOpen, onClose, onSave, course }) {
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    description: '',
    category: '',
    capacity: 30
  });

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || '',
        instructor: course.instructor || '',
        description: course.description || '',
        category: course.category || '',
        capacity: course.capacity || 30
      });
    } else {
      setFormData({
        title: '',
        instructor: '',
        description: '',
        category: '',
        capacity: 30
      });
    }
  }, [course, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.instructor || !formData.description) return;
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{course ? 'Edit Course Details' : 'Create New Course'}</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="course-title">Course Title</label>
            <input 
              id="course-title"
              type="text" 
              value={formData.title} 
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Mastering Database Architecture"
              required 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-group">
            <div>
              <label htmlFor="course-instructor">Instructor Name</label>
              <input 
                id="course-instructor"
                type="text" 
                value={formData.instructor} 
                onChange={e => setFormData({ ...formData, instructor: e.target.value })}
                placeholder="e.g. Prof. David Malan"
                required 
              />
            </div>
            <div>
              <label htmlFor="course-category">Category</label>
              <select 
                id="course-category"
                value={formData.category} 
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                <option value="Web Development">Web Development</option>
                <option value="Backend Engineering">Backend Engineering</option>
                <option value="Data Science">Data Science</option>
                <option value="Creative Design">Creative Design</option>
                <option value="Physics & Computing">Physics & Computing</option>
                <option value="Mathematics">Mathematics</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="course-capacity">Max Capacity (Students)</label>
            <input 
              id="course-capacity"
              type="number" 
              min="1" 
              max="500"
              value={formData.capacity} 
              onChange={e => setFormData({ ...formData, capacity: parseInt(e.target.value) || 30 })}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="course-description">Description</label>
            <textarea 
              id="course-description"
              rows="4" 
              value={formData.description} 
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide a comprehensive course syllabus outline..."
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Sparkles size={16} />
              {course ? 'Update Course' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
