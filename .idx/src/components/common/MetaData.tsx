import React from 'react';
// import { Helmet } from 'react-helmet-async'; // You might use a library like react-helmet for full SEO features

interface MetaDataProps {
  meta: {
    title?: string;
    description?: string;
    // Add other meta tags as needed: keywords, image, etc.
  };
}

const MetaData: React.FC<MetaDataProps> = ({ meta }) => {
  // This is a basic placeholder. For actual meta tag management, 
  // consider using a library like react-helmet-async or Next.js Head.
  if (typeof document !== 'undefined' && meta.title) {
    document.title = meta.title;
  }
  // You could also render <meta name="description" content={meta.description} /> directly if not using a helmet library
  return null; // Or <Helmet>...</Helmet> if using react-helmet
};

export default MetaData; 