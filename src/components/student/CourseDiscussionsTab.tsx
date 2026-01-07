import { Loader2, MessageCircle, Plus, Send } from "lucide-react";
import { useState } from "react";
import {
    useCreateDiscussionMutation,
    useGetCourseDiscussionsQuery,
    useGetDiscussionQuery,
    useReplyToDiscussionMutation,
} from "../../app/api/discussions";
import type { Discussion } from "../../types/discussion";

interface CourseDiscussionsTabProps {
  courseId: string;
}

export default function CourseDiscussionsTab({ courseId }: CourseDiscussionsTabProps) {
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [replyContent, setReplyContent] = useState("");

  const { data: discussionsData, isLoading } = useGetCourseDiscussionsQuery(courseId);
  const { data: discussionDetailData } = useGetDiscussionQuery(selectedDiscussion?.id || "", {
    skip: !selectedDiscussion,
  });
  const [createDiscussion, { isLoading: creating }] = useCreateDiscussionMutation();
  const [replyToDiscussion, { isLoading: replying }] = useReplyToDiscussionMutation();

  const handleCreateDiscussion = async () => {
    if (!newTitle || !newContent) return;

    try {
      await createDiscussion({
        courseId,
        data: { title: newTitle, content: newContent },
      }).unwrap();
      setNewTitle("");
      setNewContent("");
      setShowCreateForm(false);
    } catch (error) {
      console.error("Failed to create discussion:", error);
    }
  };

  const handleReply = async () => {
    if (!selectedDiscussion || !replyContent) return;

    try {
      await replyToDiscussion({
        discussionId: selectedDiscussion.id,
        data: { content: replyContent },
      }).unwrap();
      setReplyContent("");
    } catch (error) {
      console.error("Failed to reply:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-50" />
      </div>
    );
  }

  // Show discussion detail view
  if (selectedDiscussion && discussionDetailData?.data) {
    const discussion = discussionDetailData.data;

    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedDiscussion(null)}
          className="text-primary-50 hover:text-opacity-80 flex items-center gap-2"
        >
          ← Back to Discussions
        </button>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-primary-50 mb-2">{discussion.title}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <span className="font-medium">{discussion.authorName}</span>
            <span>•</span>
            <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
          </div>
          <p className="text-gray-700 mb-6">{discussion.content}</p>

          {/* Replies */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-primary-50 mb-4">
              Replies ({discussion.replies?.length || 0})
            </h3>

            <div className="space-y-4 mb-6">
              {discussion.replies?.map((reply) => (
                <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <span className="font-medium text-primary-50">{reply.authorName}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{new Date(reply.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700">{reply.content}</p>
                </div>
              ))}
            </div>

            {/* Reply Form */}
            <div className="border-t pt-4">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-transparent mb-3"
                placeholder="Write your reply..."
              />
              <button
                onClick={handleReply}
                disabled={replying || !replyContent}
                className="px-4 py-2 bg-primary-50 text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {replying && <Loader2 className="w-4 h-4 animate-spin" />}
                <Send className="w-4 h-4" />
                {replying ? "Posting..." : "Post Reply"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show create discussion form
  if (showCreateForm) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setShowCreateForm(false)}
          className="text-primary-50 hover:text-opacity-80 flex items-center gap-2"
        >
          ← Cancel
        </button>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-primary-50 mb-6">Start a Discussion</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-transparent"
                placeholder="Enter discussion title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-transparent"
                placeholder="What would you like to discuss?"
              />
            </div>

            <button
              onClick={handleCreateDiscussion}
              disabled={creating || !newTitle || !newContent}
              className="w-full py-3 bg-primary-50 text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {creating && <Loader2 className="w-4 h-4 animate-spin" />}
              {creating ? "Creating..." : "Create Discussion"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show discussions list
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-primary-50">Discussions</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-primary-50 text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Discussion
        </button>
      </div>

      {!discussionsData?.data || discussionsData.data.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p className="mb-4">No discussions yet</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="text-primary-50 hover:underline"
          >
            Start the first discussion
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {discussionsData.data.map((discussion) => (
            <div
              key={discussion.id}
              onClick={() => setSelectedDiscussion(discussion)}
              className="p-4 border border-gray-200 rounded-lg hover:border-primary-50 transition-all cursor-pointer"
            >
              <h3 className="font-semibold text-primary-50 mb-2">{discussion.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{discussion.content}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="font-medium">{discussion.authorName}</span>
                <span>•</span>
                <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>{discussion.replyCount || 0} replies</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
