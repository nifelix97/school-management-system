import { useState } from "react";
import { Plus, Upload, FileText, Video, Presentation, Trash2, Edit3, X } from "lucide-react";

interface Resource {
  id: number;
  name: string;
  type: "ppt" | "video" | "document" | "other";
  size: string;
  uploadDate: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  resources: Resource[];
  isPublished: boolean;
}

export default function SetCourse() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: "HTML & CSS Fundamentals",
      description: "Learn the basics of web development with HTML and CSS",
      category: "Web Development",
      duration: "8 weeks",
      level: "Beginner",
      isPublished: true,
      resources: [
        { id: 1, name: "Introduction to HTML.pptx", type: "ppt", size: "2.5 MB", uploadDate: "2024-01-15" },
        { id: 2, name: "CSS Basics Video.mp4", type: "video", size: "45 MB", uploadDate: "2024-01-16" },
      ]
    },
    {
      id: 2,
      title: "JavaScript Basics",
      description: "Master JavaScript fundamentals and DOM manipulation",
      category: "Programming",
      duration: "10 weeks",
      level: "Intermediate",
      isPublished: false,
      resources: [
        { id: 3, name: "JS Variables.pdf", type: "document", size: "1.2 MB", uploadDate: "2024-01-20" },
      ]
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState<{
    title: string;
    description: string;
    category: string;
    duration: string;
    level: "Beginner" | "Intermediate" | "Advanced";
  }>({
    title: "",
    description: "",
    category: "",
    duration: "",
    level: "Beginner"
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "ppt": return <Presentation className="w-5 h-5 text-orange-500" />;
      case "video": return <Video className="w-5 h-5 text-blue-500" />;
      case "document": return <FileText className="w-5 h-5 text-green-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleCreateCourse = () => {
    const course: Course = {
      id: Date.now(),
      ...newCourse,
      resources: [],
      isPublished: false
    };
    setCourses([...courses, course]);
    setNewCourse({ title: "", description: "", category: "", duration: "", level: "Beginner" });
    setShowCreateModal(false);
  };

  const handlePublishToggle = (courseId: number) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, isPublished: !course.isPublished } : course
    ));
  };

  const handleDeleteCourse = (courseId: number) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  const handleFileUpload = (courseId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newResources: Resource[] = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.name.endsWith('.pptx') || file.name.endsWith('.ppt') ? 'ppt' :
            file.name.endsWith('.mp4') || file.name.endsWith('.avi') ? 'video' :
            file.name.endsWith('.pdf') || file.name.endsWith('.doc') ? 'document' : 'other',
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split('T')[0]
    }));

    setCourses(courses.map(course =>
      course.id === courseId 
        ? { ...course, resources: [...course.resources, ...newResources] }
        : course
    ));
  };

  const handleDeleteResource = (courseId: number, resourceId: number) => {
    setCourses(courses.map(course =>
      course.id === courseId
        ? { ...course, resources: course.resources.filter(r => r.id !== resourceId) }
        : course
    ));
  };

  if (selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 xxs:p-2 xs:p-3 sm:p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedCourse(null)}
            className="mb-4 xxs:mb-3 xs:mb-4 text-primary-50 hover:text-primary-100 flex items-center gap-2"
          >
            ← Back to Courses
          </button>

          <div className="bg-white rounded-xl shadow-sm p-6 xxs:p-4 xs:p-5 sm:p-6">
            <div className="flex xxs:flex-col xs:flex-col sm:flex-row justify-between items-start gap-4 mb-6">
              <div>
                <h1 className="text-2xl xxs:text-xl xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
                  {selectedCourse.title}
                </h1>
                <p className="text-gray-600 mb-2">{selectedCourse.description}</p>
                <div className="flex xxs:flex-col xs:flex-row gap-4 xxs:gap-2 xs:gap-4 text-sm text-gray-500">
                  <span>Category: {selectedCourse.category}</span>
                  <span>Duration: {selectedCourse.duration}</span>
                  <span>Level: {selectedCourse.level}</span>
                </div>
              </div>
              <div className="flex xxs:w-full xs:w-auto gap-2">
                <button
                  onClick={() => handlePublishToggle(selectedCourse.id)}
                  className={`px-4 py-2 rounded-lg font-medium xxs:flex-1 xs:flex-none ${
                    selectedCourse.isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {selectedCourse.isPublished ? "Published" : "Draft"}
                </button>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex xxs:flex-col xs:flex-row justify-between items-start xxs:items-stretch xs:items-center gap-4 mb-4">
                <h2 className="text-lg font-semibold text-primary-50">Course Resources</h2>
                <label className="bg-primary-50 text-white px-4 py-2 rounded-lg hover:bg-primary-100 cursor-pointer flex items-center gap-2 xxs:justify-center xs:justify-start">
                  <Upload className="w-4 h-4" />
                  Upload Resources
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileUpload(selectedCourse.id, e)}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.mov"
                  />
                </label>
              </div>

              <div className="grid xxs:grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectedCourse.resources.map((resource) => (
                  <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getResourceIcon(resource.type)}
                        <span className="font-medium text-sm text-primary-50 truncate">
                          {resource.name}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteResource(selectedCourse.id, resource.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-xs text-gray-500">
                      <div>Size: {resource.size}</div>
                      <div>Uploaded: {resource.uploadDate}</div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedCourse.resources.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Upload className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No resources uploaded yet</p>
                  <p className="text-sm">Upload PPT, videos, documents and other materials</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 xxs:p-2 xs:p-3 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex xxs:flex-col xs:flex-row justify-between items-start xxs:items-stretch xs:items-center gap-4 mb-6">
          <h1 className="text-2xl xxs:text-xl xs:text-2xl font-bold text-primary-50">Set Courses</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-primary-50 text-white px-4 py-2 rounded-lg hover:bg-primary-100 flex items-center gap-2 xxs:justify-center xs:justify-start"
          >
            <Plus className="w-4 h-4" />
            Create New Course
          </button>
        </div>

        <div className="grid xxs:grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6 xxs:p-4 xs:p-5 sm:p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-primary-50 text-lg">{course.title}</h3>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="text-primary-50 hover:text-primary-100 p-1"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Category:</span>
                    <span className="text-primary-50">{course.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="text-primary-50">{course.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Level:</span>
                    <span className="text-primary-50">{course.level}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Resources:</span>
                    <span className="text-primary-50">{course.resources.length}</span>
                  </div>
                </div>

                <div className="flex xxs:flex-col xs:flex-row gap-2">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="flex-1 bg-primary-50 text-white py-2 px-3 rounded-lg hover:bg-primary-100 text-sm"
                  >
                    Manage Course
                  </button>
                  <button
                    onClick={() => handlePublishToggle(course.id)}
                    className={`xxs:w-full xs:w-auto px-3 py-2 rounded-lg text-sm font-medium ${
                      course.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {course.isPublished ? "Published" : "Draft"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Course Modal */}
        {showCreateModal && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 xxs:p-4 xs:p-5 sm:p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-primary-50">Create New Course</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-1">Course Title</label>
                  <input
                    type="text"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-50"
                    placeholder="Enter course title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-1">Description</label>
                  <textarea
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-50 h-20"
                    placeholder="Enter course description"
                  />
                </div>

                <div className="grid xxs:grid-cols-1 xs:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Category</label>
                    <input
                      type="text"
                      value={newCourse.category}
                      onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-50"
                      placeholder="e.g. Programming"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Duration</label>
                    <input
                      type="text"
                      value={newCourse.duration}
                      onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-50"
                      placeholder="e.g. 8 weeks"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-1">Level</label>
                  <select
                    value={newCourse.level}
                    onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value as "Beginner" | "Intermediate" | "Advanced" })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-50"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="flex xxs:flex-col xs:flex-row gap-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="xxs:w-full xs:flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCourse}
                  disabled={!newCourse.title || !newCourse.description}
                  className="xxs:w-full xs:flex-1 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Course
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}