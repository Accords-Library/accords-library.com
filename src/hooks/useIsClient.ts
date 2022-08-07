import { useEffect, useState } from "react";

const useIsClient = (): boolean => {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return isClient;
};

export default useIsClient;
