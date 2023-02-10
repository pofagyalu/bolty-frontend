import MainNavigation from '../components/nav/MainNavigation';

const ErrorPage = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <h1>Hiba történt</h1>
        <p>Nem találjuk a keresett oldalt</p>
      </main>
    </>
  );
};

export default ErrorPage;
