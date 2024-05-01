import { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import {Link} from 'react-router-dom'
import favsIcon from '../assets/favs-icon.png'
import nonFavsIcon from '../assets/nonfavs-icon.png'


function Card({ meal }) {

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const favoriteMealRef = ref(db, `favoriteMeals/${meal.idMeal}`);

    // Fetch the favorite status of the meal from Firebase
    onValue(favoriteMealRef, (snapshot) => {
      const data = snapshot.val();
      setIsFavorite(data ? data.isFavorite : false);
    });

    // Cleanup function to unsubscribe from Firebase listener
    return () => {
      onValue(favoriteMealRef, null);
    };
  }, [meal.idMeal]);

  const handleToggleFavorite = () => {
    // Toggle the favorite status
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    // Get a reference to the Firebase database
    const db = getDatabase();

    // Update the favorite status in the database
    set(ref(db, `favoriteMeals/${meal.idMeal}`), {
      ...meal,
      isFavorite: newFavoriteStatus, // Update the favorite status in the meal object
    });
  };

  const renderIngredients = () => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && measure) {
        ingredients.push(<li key={i}>{`${ingredient}: ${measure}`}</li>);
      }
    }
    return ingredients;
  };

  return (
    <div className="bg-red rounded-lg shadow-md mx-24 my-12 text-chocolate py-12 flex justify-around">
      <div className='flex gap-12'>
        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-72 object-cover rounded-md" />
        <div className='flex flex-col my-4 justify-between'>
                <div>
                  <div className='flex gap-4'>
                    <h1 className='text-3xl uppercase'>{meal.strMeal}</h1>
                    <button onClick={handleToggleFavorite}>
                      <img className='h-8' src={isFavorite ? favsIcon : nonFavsIcon} alt={isFavorite ? "Favorite" : "Not Favorite"} />
                    </button>
                  </div>
                    <h2 className='text-xl font-bold'>{meal.strCategory}</h2>
                    {meal.strTags && (
                                <div>
                                    <h3 className='mt-8'>Tags:</h3>
                                    <p>{meal.strTags}</p>
                                </div>
                            )}
                </div>
                <Link to={`/meal/${meal.idMeal}`} className='text-2xl text-dark-red px-8 py-2 bg-white rounded-md'>{"Check Full Recipe =>"}</Link>
        </div>
      </div>
      <div className='flex flex-col justify-end'>
        <h2 className='text-2xl mt-4'>Ingredients:</h2>
        <ul className='capitalize my-4 list-disc'>
          {renderIngredients()}
        </ul>
      </div>
    </div>
  );
}

export default Card;