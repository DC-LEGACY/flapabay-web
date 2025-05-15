/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_URL: string;
  // Add other environment variables here as needed
  readonly VITE_GOOGLE_CLIENT_ID: string; 
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 