import { useState } from 'react';
import { Center } from '@chakra-ui/react';

import Headbar from '../components/Headbar';
import LoadingBar from '../components/Create/LoadingBar';
import ShareModal from '../components/Create/ShareModal';
import ImageGenerationForm from '../components/Create/ImageGenerationForm';
import ImagesDisplay from '../components/Create/ImageDisplay';
import TipCard from '../components/Create/TipCard';
import { getRandomTip } from '../services/tips-service';

export default function Create() {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [currentTip, setCurrentTip] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (input) => {
    const timestamp = Date.now();
    const randomTip = await getRandomTip();

    setInputValue(input);
    setIsImageLoading(true);
    setError(null);
    setCurrentTip(randomTip);

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

      const errorResponses = responses.filter((response) => !response.ok);
      if (errorResponses.length > 0) {
        const errorData = await errorResponses[0].json();
        setError(errorData.error);
      } else {
        const blobs = await Promise.all(
          responses.map((response) => response.blob())
        );
        setImages(blobs.map((blob) => URL.createObjectURL(blob)));
      }
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
      {isImageLoading && (
        <>
          <LoadingBar />
          <Center>
            <TipCard
              tip={currentTip?.tip}
              prompt={currentTip?.prompt}
              exampleImage={currentTip?.exampleImage}
            />
          </Center>
        </>
      )}
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
