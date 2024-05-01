import React from 'react';
import Card from './Card';

function MealList({ data }) {
  if (!data) {
    return <div className='w-fit mx-auto my-24 px-8 py-4 bg-red text-white text-3xl'>No meals found. Start searching above!</div>; // or return loading indicator, error message, or empty state
  }

  return (
    <div>
      {data.map((meal) => (
        <Card key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
}

export default MealList;