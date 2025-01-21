import { useAuth } from '@/contexts';
import { useFetchUserFavoriteStations } from '@/services/user';

const Stations = () => {
  const { isCheckingAuthState } = useAuth();
  const { isLoading } = useFetchUserFavoriteStations();

  if (isLoading || isCheckingAuthState) return null;

  return <div>Stations</div>;
};

export default Stations;
