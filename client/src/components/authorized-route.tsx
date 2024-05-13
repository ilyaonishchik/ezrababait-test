import { useGetMeQuery } from '../services/auth';
import { Loader } from './ui';
import { Navigate } from 'react-router-dom';
import { ChildrenProps } from '../types/props/ChildrenProps';

export default function AuthorizedRoute({ children }: ChildrenProps) {
  const { isLoading, isError } = useGetMeQuery();

  if (isLoading) return <Loader />;
  if (isError) return <Navigate to='/sign-in' />;
  return children;
}
