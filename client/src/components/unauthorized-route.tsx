import { useGetMeQuery } from '../services/api';
import { Loader } from './ui';
import { Navigate } from 'react-router-dom';
import { ChildrenProps } from '../types/props/ChildrenProps';

export default function UnauthorizedRoute({ children }: ChildrenProps) {
  const { isLoading, isSuccess } = useGetMeQuery();

  if (isLoading) return <Loader />;
  if (isSuccess) return <Navigate to='/profile' />;
  return children;
}
