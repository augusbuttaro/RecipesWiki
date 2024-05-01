import { useState, useEffect } from 'react';
import { getDatabase,onValue, ref, set } from 'firebase/database';
import { useParams } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';
import favsIcon from '../assets/favs-icon.png'
import nonFavsIcon from '../assets/nonfavs-icon.png'

function MealPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const db = getDatabase();
        const favoriteMealRef = ref(db, `favoriteMeals/${params.id}`);
        onValue(favoriteMealRef, (snapshot) => {
          const data = snapshot.val();
          setIsFavorite(data ? data.isFavorite : false);
        });
      } catch (error) {
        console.error('Error fetching favorite status:', error);
      }
    };

    fetchFavoriteStatus();

    return () => {
      // Cleanup function to unsubscribe from Firebase listener
      const db = getDatabase();
      const favoriteMealRef = ref(db, `favoriteMeals/${params.id}`);
      onValue(favoriteMealRef, null);
    };
  }, [params.id]);

  const handleToggleFavorite = () => {
    // Toggle the favorite status
    setIsFavorite(!isFavorite);

    // Get a reference to the Firebase database
    const db = getDatabase();

    // Update the favorite status in the database
    set(ref(db, `favoriteMeals/${params.id}`), {
      ...meal,
      isFavorite: !isFavorite, // Update the favorite status in the meal object
    });
  };

  const { data, loading, error } = useFetchData('', params.id);

  if (loading) {
    return <p>Loading...</p>; // Display a loading message while waiting for data
  }

  if (error || !data || !data.length) {
    return <p>Error loading meal details.</p>; // Handle error case
  }

  const meal = data[0];
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

  const instructions = meal.strInstructions.split('\r\n');

  return (
    <div className='flex justify-center gap-16'>
      <div className='w-1/3'>
        <img className='h-96 mt-16' src={meal.strMealThumb} />
        <div className='mt-4 mb-16 mx-6'>
          <h2 className='text-xl'>Ingredients:</h2>
              <ul className='capitalize mt-4 mb-12 list-disc'>
                {renderIngredients()}
              </ul>
          <a target='_blank' href={meal.strYoutube} className='bg-red text-white text-xl px-16 py-4 ml-[-16px]'>Check Youtube Video</a>
        </div>
      </div>
      <div className='w-2/5 flex flex-col justify-center gap-16'>
        <div>
          <div className='flex mt-16 gap-4'>
            <h1 className='text-4xl'>{meal.strMeal}</h1>
            <button onClick={handleToggleFavorite}>
                <img className='h-8' src={isFavorite ? favsIcon : nonFavsIcon} alt={isFavorite ? 'Favorite' : 'Not Favorite'} />
            </button>
          </div>
          <h2 className='text-lg font-semibold italic'>{meal.strCategory}</h2>
        </div>
        <div className='w-4/5'>
          <h2>Instructions:</h2>
            <ol className='list-decimal p-5'>
              {instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
        </div>
      </div>
    </div>
  ); }

export default MealPage;