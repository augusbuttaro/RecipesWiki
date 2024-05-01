import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'
import Card from './components/Card'
import useFetchData from './hooks/useFetchData';
import MealPage from './components/MealPage'
import MealList from './components/MealList'

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, loading, error, fetchData } = useFetchData(searchQuery, "");

  const handleSearch = (query) => {
      setSearchQuery(query);
  };


  // Find the meal based on the id parameter


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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
