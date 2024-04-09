import { HomeComponent, UiComponent } from '../components';
import { Layout } from '@/src//components/layout';
import { useAppSelector } from '../stores';

export default function Home() {
  const { auth } = useAppSelector((state) => state.auth);

  return (
    <Layout>
      {auth?.accessToken ? <HomeComponent.Dashboard /> : <HomeComponent.Landing />}
      <UiComponent.Footer />
    </Layout>
  );
}
