import { useState } from 'react';
import Headbar from '../components/Headbar';
import LoadingBar from '../components/Create/LoadingBar';
import ShareModal from '../components/Create/ShareModal';
import ImageGenerationForm from '../components/Create/ImageGenerationForm';
import ImagesDisplay from '../components/Create/ImageDisplay';

export default function Create() {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (input) => {
    setInputValue(input);
    const timestamp = Date.now();
    setIsImageLoading(true);
    setError(null);

    try {
      const responses = await Promise.all(
        Array(4)
          .fill()
          .map(() =>
            fetch(process.env.REACT_APP_HUGGINGFACE_API_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_HUGGINGFACE_API_TOKEN}`,
              },
              body: JSON.stringify({ inputs: input, timestamp }),
            })
          )
      );

      if (responses.some((response) => !response.ok)) {
        const response = responses.find((response) => !response.ok);
        const errorData = await response.json();
        new Error(errorData.error);
      }

      const blobs = await Promise.all(
        responses.map((response) => response.blob())
      );
      setImages(blobs.map((blob) => URL.createObjectURL(blob)));
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsImageLoading(false);
    }
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleShareModalClose = () => {
    setIsShareModalOpen(false);
  };

  return (
    <>
      <Headbar />
      <ImageGenerationForm
        onSubmit={handleSubmit}
        isImageLoading={isImageLoading}
        error={error}
      />
      {isImageLoading && <LoadingBar />}
      {!isImageLoading && images.length > 0 && (
        <ImagesDisplay
          images={images}
          onShare={handleShare}
          setSelectedImage={setSelectedImage}
          inputValue={inputValue}
        />
      )}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={handleShareModalClose}
        image={selectedImage}
        prompt={inputValue}
      />
    </>
  );
}
