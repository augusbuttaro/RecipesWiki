import { useState, useEffect } from 'react'
import { getDatabase, ref, onValue } from 'firebase/database';
import Card from './Card';

function Favorites() {
  const [favoriteMeals, setFavoriteMeals] = useState([]);

  useEffect(() => {
    const db = getDatabase();

    const favoritesRef = ref(db, 'favoriteMeals');
    onValue(favoritesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const favoriteMealsArray = Object.values(data).filter((meal) => meal.isFavorite);
        setFavoriteMeals(favoriteMealsArray);
      }
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold my-16 mx-auto w-fit text-4xl">Favorite Meals</h1>
      {favoriteMeals.length === 0 ? (
        <p className=' w-3/5 mx-auto my-24 px-8 py-4 bg-red text-white text-center text-3xl'>No favorite meals found. Click on the chef hat to add a meal to your favorites!</p>
      ) : (
        <div >
          {favoriteMeals.map((meal) => (
            <Card key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;