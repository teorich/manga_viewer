import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Tab, Chapter, Page } from '../interfaces';
import { BookSection } from './BookSection';
import { ChapterContent } from './ChapterContent';
import { ChapterSection } from './ChapterSection';





const BookList = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [currentTab, setCurrentTab] = useState<Tab | null>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [loadingBooks, setLoadingBooks] = useState<boolean>(true);
  const [loadingChapter, setLoadingChapter] = useState<boolean>(true);
  const [bookError, setBookError] = useState<string | null>(null);
  const [chapterError, setChapterError] = useState<string | null>(null);

  
  const fetchBooks = useCallback(async () => {
    setLoadingBooks(true);
    setBookError(null);
    try {
      const response = await axios.get('/books/');
      setTabs(response.data);
      setCurrentTab(response.data[0]);
    } catch (error) {
      setBookError('Failed to load data.');
      console.error(error);
    } finally {
      setLoadingBooks(false);
    }
  }, []);

  const fetchChapter = useCallback(async (chapterId: number) => {
    setLoadingChapter(true);
    setChapterError(null);
    try {
      const response = await axios.get(`/chapters/${chapterId}`);
      setCurrentChapter(response.data);
      setCurrentPageIndex(0);
    } catch (error) {
      setChapterError('Failed to load chapter.');
      console.error(error);
    } finally {
      setLoadingChapter(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    if (currentTab) {
      fetchChapter(currentTab.chapter_ids[0]);
    }
  }, [currentTab, fetchChapter]);

  const nextPage = () => {
    if (currentChapter && currentPageIndex < currentChapter.pages.length - 1) {
      setCurrentPageIndex((prevIndex) => prevIndex + 1);
    }
  };

  const previousPage = () => {
    if (currentChapter && currentPageIndex > 0) {
      setCurrentPageIndex((prevIndex) => prevIndex - 1);
    }
  };

  const getImageSrc = (page: Page): string => {
    const cachedImage = localStorage.getItem(`image_${page.image.id}`);
    if (cachedImage) {
      return cachedImage;
    }
    return page.image.file;
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const clickX = e.nativeEvent.offsetX;
    const imageWidth = e.currentTarget.width;

    if (clickX < imageWidth / 2) {
      previousPage();
    } else {
      nextPage();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 border border-gray-300 shadow-lg rounded-lg">
      <BookSection
        tabs={tabs}
        currentTab={currentTab}
        onTabClick={setCurrentTab}
        loadingBooks={loadingBooks}
        bookError={bookError}
      />
      <div className="p-2">
        {currentTab ? (
          <ChapterSection
            chapterIds={currentTab.chapter_ids}
            currentChapter={currentChapter}
            fetchChapter={fetchChapter}
          />
        ) : null}
        {currentChapter ? (
          <ChapterContent
            currentChapter={currentChapter}
            currentPageIndex={currentPageIndex}
            handleImageClick={handleImageClick}
            loadingChapter={loadingChapter}
            chapterError={chapterError}
            getImageSrc={getImageSrc}
          />
        ): null}
      </div>
    </div>
  );
};

export default BookList;
