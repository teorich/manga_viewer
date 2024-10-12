import { Chapter } from "../interfaces";

interface ChapterSectionProps {
    chapterIds: number[];
    currentChapter: Chapter | null;
    fetchChapter: (chapterId: number) => void;
  }
  
  export const ChapterSection = ({ chapterIds, currentChapter, fetchChapter }: ChapterSectionProps) => {
    return (
      <div className="border-b border-gray-300 pb-2">
        <nav className="flex justify-center space-x-0 mt-2">
          {chapterIds.map((chapterId, index) => (
            <button
              key={chapterId}
              onClick={() => fetchChapter(chapterId)}
              className={`w-8 h-8 border border-l-0 first:border-l rounded-none text-center transition-colors ${
                currentChapter?.id === chapterId ? 'bg-green-800 text-gray-50' : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </nav>
      </div>
    );
  };
  