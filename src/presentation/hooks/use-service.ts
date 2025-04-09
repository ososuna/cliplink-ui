import { useMemo } from 'react';

// Hook for creating a repository and service
export const useService = <RepositoryType, ServiceType>(
  RepositoryClass: new () => RepositoryType,
  ServiceClass: new (repository: RepositoryType) => ServiceType
): ServiceType => {
  const service = useMemo(() => {
    const repositoryInstance = new RepositoryClass();
    return new ServiceClass(repositoryInstance);
  }, [RepositoryClass, ServiceClass]);
  return service;
};