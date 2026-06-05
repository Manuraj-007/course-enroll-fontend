import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from './components/Navbar';
import CourseCatalog from './components/CourseCatalog';
import AdminPanel from './components/AdminPanel';
import CourseModal from './components/CourseModal';
import EnrollModal from './components/EnrollModal';
import './App.css';
import { 
  getCourses, 
  createCourse, 
  updateCourse, 
  deleteCourse, 
  getEnrollments, 
  enrollStudent, 
  deleteEnrollment
} from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('catalog');
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal States
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [selectedCourseForEdit, setSelectedCourseForEdit] = useState(null);
  
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState(null);

  // Fetch initial data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const fetchedCourses = await getCourses();
      const fetchedEnrollments = await getEnrollments();
      setCourses(fetchedCourses);
      setEnrollments(fetchedEnrollments);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load records from server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Course CRUD handlers
  const handleOpenAddCourse = () => {
    setSelectedCourseForEdit(null);
    setIsCourseModalOpen(true);
  };

  const handleOpenEditCourse = (course) => {
    setSelectedCourseForEdit(course);
    setIsCourseModalOpen(true);
  };

  const handleSaveCourse = async (courseData) => {
    try {
      if (selectedCourseForEdit) {
        await updateCourse(selectedCourseForEdit.id, courseData);
        toast.success('Course details updated successfully!');
      } else {
        await createCourse(courseData);
        toast.success('Course created and added to catalog!');
      }
      setIsCourseModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Error occurred while saving course.');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to permanently delete this course? All associated enrollments will be wiped.')) {
      try {
        await deleteCourse(courseId);
        toast.success('Course deleted from system.');
        fetchData();
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete course.');
      }
    }
  };

  // Enroll handlers
  const handleOpenEnroll = (course) => {
    setSelectedCourseForEnroll(course);
    setIsEnrollModalOpen(true);
  };

  const handleEnrollStudent = async (courseId, studentName) => {
    try {
      await enrollStudent(courseId, studentName);
      toast.success(`Successfully enrolled ${studentName}!`, { icon: '🎉' });
      setIsEnrollModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Enrollment registration failed.');
    }
  };

  const handleDeleteEnrollment = async (enrollmentId) => {
    if (window.confirm('Are you sure you want to unenroll this student from the course?')) {
      try {
        await deleteEnrollment(enrollmentId);
        toast.success('Student successfully unenrolled.');
        fetchData();
      } catch (err) {
        console.error(err);
        toast.error('Unenrollment request failed.');
      }
    }
  };

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'card-glass',
          style: {
            background: 'var(--bg-modal)',
            color: 'var(--text-title)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-main)'
          }
        }}
      />
      
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <main style={{ flex: 1 }}>
        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', border: '4px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 500 }}>Syncing records...</span>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : activeTab === 'catalog' ? (
          <CourseCatalog 
            courses={courses}
            enrollments={enrollments}
            onEnrollClick={handleOpenEnroll}
          />
        ) : (
          <AdminPanel 
            courses={courses}
            enrollments={enrollments}
            onAddCourse={handleOpenAddCourse}
            onEditCourse={handleOpenEditCourse}
            onDeleteCourse={handleDeleteCourse}
            onDeleteEnrollment={handleDeleteEnrollment}
          />
        )}
      </main>

      {/* Modals */}
      <CourseModal 
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        onSave={handleSaveCourse}
        course={selectedCourseForEdit}
      />

      <EnrollModal 
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        onEnroll={handleEnrollStudent}
        course={selectedCourseForEnroll}
      />

      <footer>
        <div className="container">
          <p>© {new Date().getFullYear()} EduEnroll Management Systems. Designed with pure visual elegance.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
