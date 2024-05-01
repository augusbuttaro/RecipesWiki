import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'
import Card from './components/Card'
import useFetchData from './hooks/useFetchData';
import MealPage from './components/MealPage'
import MealList from './components/MealList'
import Favorites from './components/Favorites';
import { initializeApp } from "firebase/app";
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDBKcBMTMJmTPgaA99eEzuqCBiXheSRQ3w",
  authDomain: "recipes-wiki.firebaseapp.com",
  projectId: "recipes-wiki",
  storageBucket: "recipes-wiki.appspot.com",
  messagingSenderId: "26934136226",
  appId: "1:26934136226:web:7bea6c0db54e16584a36fb"
};

const app = initializeApp(firebaseConfig);
console.log(app)

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, loading, error, fetchData } = useFetchData(searchQuery, "");

  const handleSearch = (query) => {
      setSearchQuery(query);
  };


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout onSearch={handleSearch} />}
        >
          <Route index element={<MealList data={data} />} />
          <Route path="meal/:id"
          element={<MealPage />}/>
          <Route path='favorites' element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
