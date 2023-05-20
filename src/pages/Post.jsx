import { useState } from 'react';

import PostDetails from '../components/Post/PostDetails';
import Headbar from '../components/Headbar';
import EditModal from '../components/Post/EditModal';

export default function Post() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const [post, setPost] = useState(null);

  const handleEdit = (post) => {
    setPostToEdit(post);
    setIsEditModalOpen(true);
  };

  const handleUpdate = (updatedPost) => {
    setPost((prevPost) => ({ ...prevPost, ...updatedPost }));
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Headbar />
      <PostDetails onEdit={handleEdit} post={post} />
      {isEditModalOpen && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          post={postToEdit}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}
