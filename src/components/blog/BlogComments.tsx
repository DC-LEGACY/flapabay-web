import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  date: string;
  content: string;
  likes: number;
}

interface BlogCommentsProps {
  comments: Comment[];
}

const BlogComments: React.FC<BlogCommentsProps> = ({ comments: initialComments }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const comment: Comment = {
        id: comments.length + 1,
        user: {
          name: 'You',
          avatar: 'https://ui-avatars.com/api/?name=You&background=random',
        },
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        content: newComment,
        likes: 0,
      };
      
      setComments([comment, ...comments]);
      setNewComment('');
      setIsSubmitting(false);
      
      toast({
        title: "Comment added",
        description: "Your comment has been published successfully.",
      });
    }, 1000);
  };

  const handleLikeComment = (id: number) => {
    setComments(comments.map(comment => 
      comment.id === id 
        ? { ...comment, likes: comment.likes + 1 } 
        : comment
    ));
  };

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
      
      <div className="mb-8">
        <Textarea
          placeholder="Leave a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-4 min-h-[100px]"
        />
        <Button onClick={handleAddComment} disabled={isSubmitting || !newComment.trim()}>
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </div>
      
      {comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-6">
              <div className="flex items-start gap-4">
                <img
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-bold">{comment.user.name}</h4>
                      <p className="text-sm text-gray-500">{comment.date}</p>
                    </div>
                  </div>
                  <p className="text-black mb-3">{comment.content}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    Like ({comment.likes})
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-gray-500">Be the first to comment</p>
        </div>
      )}
    </div>
  );
};

export default BlogComments;
