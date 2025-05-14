import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

interface MetaDataProps {
  meta?: {
    title?: string;
  };
}

const MetaData: React.FC<MetaDataProps> = ({ meta }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{meta?.title}</title>
      </Helmet>
    </HelmetProvider>
  );
};

export default MetaData; 