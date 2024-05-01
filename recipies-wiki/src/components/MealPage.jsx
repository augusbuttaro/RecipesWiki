import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';

function MealPage() {

  const params = useParams(); // Use useParams hook here to access the id parameter
  const { data, loading, error, fetchData } = useFetchData("", params.id);
  console.log(data);
  
  if (!data) {
    return <p>Loading...</p>; // Display a loading message while waiting for data
}
  const meal = data[0]
  const renderIngredients = () => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && measure) {
        ingredients.push(
          <li key={i}>{`${ingredient}: ${measure}`}</li>
        );
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
          <h1 className='text-4xl'>{meal.strMeal}</h1>
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