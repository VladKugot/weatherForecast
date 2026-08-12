import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { MainPage } from './components/MainPage/MainPage';

function App() {
  return (
    <main className="flex min-h-dvh flex-col gap-20 bg-blue-50">
      <Header />

      <section
        className="box-border flex flex-1 flex-col md:flex-row justify-between
          rounded-2xl border border-blue-500 bg-blue-100
          p-4 sm:p-8 md:p-12 mx-4 sm:mx-8 md:mx-12"
      >
        <MainPage />
      </section>

      <Footer />
    </main>
  );
}

export default App;
