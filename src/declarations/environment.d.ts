declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      AMAZON_API_BASE_URL: string;
      AMAZON_API_PATH_NAME: string;
      AMAZON_API_QUERY_PARAMETER: string;
      BYPASS_SERVER_ERROR_STATUS_CODE: string;
    }
  }
}

export {};