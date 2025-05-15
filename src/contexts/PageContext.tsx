import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PageContextType {
  pageTitle: string;
  setPageTitle: (title: string) => void;
  pageSubtitle: string;
  setPageSubtitle: (subtitle: string) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider = ({ children }: { children: ReactNode }) => {
  const [pageTitle, setPageTitle] = useState<string>('Dashboard'); // Default title
  const [pageSubtitle, setPageSubtitle] = useState<string>('Welcome!'); // Default subtitle

  return (
    <PageContext.Provider value={{ pageTitle, setPageTitle, pageSubtitle, setPageSubtitle }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
}; 