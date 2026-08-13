import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { MainPage } from './components/MainPage/MainPage';
import { WeatherPage } from './components/WeatherPage/WeatherPage';

function App() {
  return (
    <BrowserRouter basename="/weatherForecast">
      <main className="flex min-h-dvh flex-col gap-20 bg-blue-50">
        <Header />

        <section
          className="box-border flex flex-1 flex-col md:flex-row justify-between
            rounded-2xl border border-blue-500 bg-linear-to-br from-blue-100
            to-indigo-100 p-4 sm:p-8 md:p-12 mx-4 sm:mx-8 md:mx-12"
        >
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/weather" element={<WeatherPage />} />
          </Routes>
        </section>

        <Footer />
      </main>
    </BrowserRouter>
  );
}

export default App;
