import { BookOpen, CheckCircle2, Circle, Clock, FileText, Loader2, PlayCircle } from "lucide-react";
import { useState } from "react";
import {
  useCompleteLessonMutation,
  useGetCourseAnnouncementsQuery,
  useGetCourseModulesQuery,
  useGetCourseProgressQuery,
  useGetModuleLessonsQuery,
} from "../../app/api/learning";
import type { Lesson } from "../../types/learning";

interface CourseContentTabProps {
  courseId: string;
}

export default function CourseContentTab({ courseId }: CourseContentTabProps) {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const { data: modulesData, isLoading: modulesLoading } = useGetCourseModulesQuery(courseId);
  const { data: progressData, isLoading: progressLoading } = useGetCourseProgressQuery(courseId);
  const { data: announcementsData } = useGetCourseAnnouncementsQuery(courseId);
  const [completeLesson, { isLoading: completing }] = useCompleteLessonMutation();

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const handleCompleteLesson = async (lessonId: string) => {
    try {
      await completeLesson({
        lessonId,
        data: { timeSpent: 300 }, // 5 minutes default
      }).unwrap();
    } catch (error) {
      console.error("Failed to complete lesson:", error);
    }
  };

  if (modulesLoading || progressLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-50" />
      </div>
    );
  }

  const modules = modulesData?.data;
  const progress = progressData?.data;

  // Debug logging
  console.log('CourseContentTab - Modules Data:', modulesData);
  console.log('CourseContentTab - Modules Array:', modules);
  console.log('CourseContentTab - Progress Data:', progressData);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Course Structure - Left Side */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-primary-50 mb-4">Course Content</h2>
          
          {progress && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-primary-50">Overall Progress</span>
                <span className="text-sm font-bold text-primary-50">{progress.progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-50 h-2 rounded-full transition-all"
                  style={{ width: `${progress.progressPercentage}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-600">
                {progress.completedLessons} of {progress.totalLessons} lessons completed
              </div>
            </div>
          )}

          <div className="space-y-3">
            {!modules || modules.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p className="font-medium">No modules available yet</p>
                <p className="text-sm mt-1">The instructor hasn't added any content to this course yet.</p>
              </div>
            ) : (
              modules.map((module: any) => (
                <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary-50" />
                      <div className="text-left">
                        <h3 className="font-semibold text-primary-50">{module.title}</h3>
                        <p className="text-xs text-gray-500">{module.lesson_count || module.lessons?.length || 0} lessons</p>
                      </div>
                    </div>
                    <div className="text-primary-50">
                      {expandedModules.has(module.id) ? "−" : "+"}
                    </div>
                  </button>

                  {expandedModules.has(module.id) && <ModuleLessons moduleId={module.id} selectedLesson={selectedLesson} onSelectLesson={setSelectedLesson} />}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Lesson Content & Announcements - Right Side */}
      <div className="space-y-4">{selectedLesson ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-primary-50 mb-2">{selectedLesson.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span className="capitalize">{selectedLesson.type}</span>
              {selectedLesson.duration && (
                <>
                  <span>•</span>
                  <span>{selectedLesson.duration} min</span>
                </>
              )}
            </div>

            {selectedLesson.videoUrl && (
              <div className="mb-4 aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <PlayCircle className="w-12 h-12 text-gray-400" />
              </div>
            )}

            <div className="prose prose-sm max-w-none mb-4">
              <p className="text-gray-700">{selectedLesson.content}</p>
            </div>

            {!selectedLesson.isCompleted && (
              <button
                onClick={() => handleCompleteLesson(selectedLesson.id)}
                disabled={completing}
                className="w-full py-2 bg-primary-50 text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {completing && <Loader2 className="w-4 h-4 animate-spin" />}
                {completing ? "Marking Complete..." : "Mark as Complete"}
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>Select a lesson to view content</p>
          </div>
        )}

        {/* Announcements */}
        {announcementsData?.data && announcementsData.data.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-primary-50 mb-4">Announcements</h3>
            <div className="space-y-3">
              {announcementsData.data.slice(0, 3).map((announcement) => (
                <div key={announcement.id} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-sm text-primary-50 mb-1">{announcement.title}</h4>
                  <p className="text-xs text-gray-600 line-clamp-2">{announcement.content}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(announcement.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper component to fetch and display lessons for a module
function ModuleLessons({ moduleId, selectedLesson, onSelectLesson }: { moduleId: string; selectedLesson: Lesson | null; onSelectLesson: (lesson: Lesson) => void }) {
  const { data: lessonsData, isLoading } = useGetModuleLessonsQuery(moduleId);

  if (isLoading) {
    return (
      <div className="px-4 py-6 text-center">
        <Loader2 className="w-4 h-4 animate-spin text-primary-50 mx-auto" />
      </div>
    );
  }

  const lessons = lessonsData?.data || [];

  if (lessons.length === 0) {
    return (
      <div className="px-4 py-6 text-center text-gray-500 text-sm">
        No lessons in this module yet
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {lessons.map((lesson: any) => (
        <button
          key={lesson.id}
          onClick={() => onSelectLesson(lesson)}
          className={`w-full px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between ${
            selectedLesson?.id === lesson.id ? "bg-blue-50" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            {lesson.is_completed ? (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            ) : (
              <Circle className="w-4 h-4 text-gray-300" />
            )}
            <div className="text-left">
              <p className="text-sm font-medium text-primary-50">{lesson.title}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                {lesson.type === "video" && <PlayCircle className="w-3 h-3" />}
                {lesson.type === "reading" && <FileText className="w-3 h-3" />}
                <span>{lesson.type}</span>
                {lesson.duration && (
                  <>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{lesson.duration} min</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
