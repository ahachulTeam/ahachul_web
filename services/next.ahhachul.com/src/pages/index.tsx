import { HomeComponent, UiComponent } from '../components';
import { useAppSelector } from '../stores';

export default function Home() {
  const { auth } = useAppSelector((state) => state.auth);

  return (
    <section>
      {auth?.accessToken ? <HomeComponent.Dashboard /> : <HomeComponent.Landing />}
      <UiComponent.Footer />
    </section>
  );
}
