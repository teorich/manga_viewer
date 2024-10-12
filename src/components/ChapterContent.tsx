import { useState, useCallback } from 'react';
import { Chapter, Page } from '../interfaces';
import { LoadingSpinner, ErrorMessage } from './BookSection';

interface ChapterContentProps {
  currentChapter: Chapter;
  currentPageIndex: number;
  handleImageClick: (e: React.MouseEvent<HTMLImageElement>) => void;
  loadingChapter: boolean;
  chapterError: string | null;
  getImageSrc: (page: Page) => string;
}

export const ChapterContent = ({
  currentChapter,
  currentPageIndex,
  handleImageClick,
  loadingChapter,
  chapterError,
  getImageSrc,
}: ChapterContentProps) => {
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const currentPage = currentChapter.pages[currentPageIndex];

  
  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);


  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      if (!localStorage.getItem(`image_${currentPage.image.id}`)) {
        setImageLoading(true);
      }
      handleImageClick(e);
    },
    [currentPage, handleImageClick]
  );

  if (loadingChapter) return <LoadingSpinner />;
  if (chapterError) return <ErrorMessage message={chapterError} />;

  return (
    <div className="border-2 border-dashed border-gray-400 p-6 text-center text-gray-500 mt-4">
      <div className="flex justify-center items-center relative">
      
        {imageLoading ? (
          <div className="absolute">
            <LoadingSpinner />
          </div>
        ) : null}

        <img
          src={getImageSrc(currentPage)}
          alt={`Page ${currentPage.page_index + 1}`}
          onClick={handleClick}
          onLoad={handleImageLoad}
          className={`cursor-pointer ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
        />
      </div>

      <p className="mt-4">
        Page {currentPageIndex + 1} of {currentChapter.pages.length}
      </p>
    </div>
  );
};

export default ChapterContent;
