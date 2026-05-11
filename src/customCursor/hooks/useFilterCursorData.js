import { useEffect, useState } from 'react';

export const useFilterCursorData = (pageData, globalData) => {
  const [cursorData, setCursorData] = useState(null);

  useEffect(() => {
    if (pageData || globalData) {
      // If pageData is empty, return globalData
      if (!pageData) {
        setCursorData(globalData);
        return;
      }

      // If globalData is empty, return pageData
      if (!globalData) {
        setCursorData(pageData);
        return;
      }

      // Both data exist, apply filtering logic
      const filteredData = {
        ...globalData,
        ...pageData,
        shape: (pageData?.shape?.type === '' || !pageData?.shape) ? globalData?.shape : pageData?.shape,
        effect: (pageData?.effect?.type === '' || !pageData?.effect) ? globalData?.effect : pageData?.effect,
      };

      setCursorData(filteredData);
    }
  }, [pageData, globalData]);

  return cursorData;
};
