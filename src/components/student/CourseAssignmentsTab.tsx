import { Calendar, FileText, Loader2, Upload } from "lucide-react";
import { useState } from "react";
import {
    useGetCourseAssignmentsQuery,
    useGetStudentSubmissionQuery,
    useSubmitAssignmentMutation
} from "../../app/api/assignments";
import type { Assignment } from "../../types/assignment";

interface CourseAssignmentsTabProps {
  courseId: string;
  assignments?: Assignment[]; // Would come from a course-specific endpoint
}

export default function CourseAssignmentsTab({ courseId }: CourseAssignmentsTabProps) {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submissionText, setSubmissionText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: assignmentsData, isLoading: assignmentsLoading } = useGetCourseAssignmentsQuery(courseId);
  const assignments = assignmentsData?.data || [];

  const { data: submissionData } = useGetStudentSubmissionQuery(
    selectedAssignment?.id || "",
    { skip: !selectedAssignment }
  );
  const [submitAssignment, { isLoading: submitting }] = useSubmitAssignmentMutation();

  const handleSubmit = async () => {
    if (!selectedAssignment) return;

    try {
      const formData = new FormData();
      if (submissionText) formData.append("submissionText", submissionText);
      if (selectedFile) formData.append("file", selectedFile);

      await submitAssignment({
        assignmentId: selectedAssignment.id,
        data: { submissionText, file: selectedFile || undefined },
      }).unwrap();

      setSubmissionText("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Failed to submit assignment:", error);
    }
  };

  const getStatusBadge = (dueDate: string, submitted: boolean) => {
    const now = new Date();
    const due = new Date(dueDate);
    const isOverdue = now > due;

    if (submitted) {
      return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">✓ Submitted</span>;
    }
    if (isOverdue) {
      return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">Overdue</span>;
    }
    return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Pending</span>;
  };

  if (assignmentsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-50" />
      </div>
    );
  }

  if (selectedAssignment) {
    const submission = submissionData?.data;

    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedAssignment(null)}
          className="text-primary-50 hover:text-opacity-80 flex items-center gap-2"
        >
          ← Back to Assignments
        </button>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-primary-50 mb-2">{selectedAssignment.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Due: {new Date(selectedAssignment.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  <span>Max Points: {selectedAssignment.maxPoints}</span>
                </div>
              </div>
            </div>
            {getStatusBadge(selectedAssignment.dueDate, !!submission)}
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-primary-50 mb-2">Description</h3>
            <p className="text-gray-700">{selectedAssignment.description}</p>
          </div>

          {submission ? (
            <div className="border-t pt-6">
              <h3 className="font-semibold text-primary-50 mb-4">Your Submission</h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700 mb-2">{submission.submissionText}</p>
                {submission.fileUrl && (
                  <a href={submission.fileUrl} className="text-sm text-primary-50 hover:underline">
                    View Attached File →
                  </a>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Submitted: {new Date(submission.submittedAt).toLocaleString()}
                </p>
              </div>

              {submission.grade !== undefined && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-primary-50">Grade</span>
                    <span className="text-2xl font-bold text-primary-50">
                      {submission.grade}/{selectedAssignment.maxPoints}
                    </span>
                  </div>
                  {submission.feedback && (
                    <div className="mt-3">
                      <p className="text-sm font-semibold text-primary-50 mb-1">Instructor Feedback</p>
                      <p className="text-sm text-gray-700">{submission.feedback}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="border-t pt-6">
              <h3 className="font-semibold text-primary-50 mb-4">Submit Assignment</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Answer
                  </label>
                  <textarea
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-transparent"
                    placeholder="Type your answer here..."
                  />
                </div>

                {selectedAssignment.submissionType !== "text" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attach File (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          {selectedFile ? selectedFile.name : "Click to upload file"}
                        </p>
                      </label>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={submitting || (!submissionText && !selectedFile)}
                  className="w-full py-3 bg-primary-50 text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submitting ? "Submitting..." : "Submit Assignment"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-primary-50 mb-6">Assignments</h2>

      {assignments.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>No assignments available yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              onClick={() => setSelectedAssignment(assignment)}
              className="p-4 border border-gray-200 rounded-lg hover:border-primary-50 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-primary-50 mb-1">{assignment.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{assignment.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      <span>{assignment.maxPoints} points</span>
                    </div>
                  </div>
                </div>
                {getStatusBadge(assignment.dueDate, false)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
