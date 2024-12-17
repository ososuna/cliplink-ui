import { useMemo } from 'react';

// Hook for creating a service and view service
export const useService = <ServiceType, ViewServiceType>(
  ServiceClass: new () => ServiceType,
  ViewServiceClass: new (service: ServiceType) => ViewServiceType
): ViewServiceType => {
  const viewService = useMemo(() => {
    const serviceInstance = new ServiceClass(); // Core service
    return new ViewServiceClass(serviceInstance); // View service with dependency injection
  }, [ServiceClass, ViewServiceClass]); // Runs once if classes remain stable

  return viewService;
};
