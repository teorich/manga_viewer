// index.tsx

export interface Page {
    id: number;
    page_index: number;
    image: {
      id: number;
      file: string;
      width: number;
      height: number;
    };
  }
  
  export interface Chapter {
    id: number;
    title: string;
    book: {
      id: number;
      title: string;
    };
    chapter_index: number;
    pages: Page[];
  }
  
  export interface Tab {
    id: number;
    title: string;
    chapter_ids: number[];
  }