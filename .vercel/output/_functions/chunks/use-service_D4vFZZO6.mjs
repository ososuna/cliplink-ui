import { useMemo } from 'react';

const useService = (ServiceClass, ViewServiceClass) => {
  const viewService = useMemo(() => {
    const serviceInstance = new ServiceClass();
    return new ViewServiceClass(serviceInstance);
  }, [ServiceClass, ViewServiceClass]);
  return viewService;
};

export { useService as u };
