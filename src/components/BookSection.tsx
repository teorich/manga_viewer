import { Tab } from "../interfaces";


interface BookSectionProps {
    tabs: Tab[];
    currentTab: Tab | null;
    onTabClick: (tab: Tab) => void;
    loadingBooks: boolean;
    bookError: string | null;
  }

  export const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
    </div>
  );
  
  export const ErrorMessage = ({ message }: { message: string }) => (
    <div className="flex items-center justify-center h-64">
      <p className="text-red-500">{message}</p>
    </div>
  );
  
  
  export const BookSection = ({ tabs, currentTab, onTabClick, loadingBooks, bookError }: BookSectionProps) => {
    if (loadingBooks) return <LoadingSpinner />;
    if (bookError) return <ErrorMessage message={bookError} />;
  
    return (
      <div className="bg-gray-100 px-4 py-2 border-b">
        <nav className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabClick(tab)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentTab?.id === tab.id ? 'bg-green-800 text-white' : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </nav>
      </div>
    );
  };
  