import { useGetMeQuery } from '../services/auth';
import { Loader } from './ui';
import { Navigate } from 'react-router-dom';
import { ChildrenProps } from '../types/ChildrenProps';

export default function UnauthorizedRoute({ children }: ChildrenProps) {
  const { isLoading, isSuccess } = useGetMeQuery();

  if (isLoading) return <Loader />;
  if (isSuccess) return <Navigate to='/profile' />;
  return children;
}
