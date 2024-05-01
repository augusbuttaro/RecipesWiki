import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../firebase';

const FavoriteRecipes = () => {
  const [favoriteMeals, loading, error] = useCollectionData(
    firestore.collection('favoriteMeals')
  );

  if (loading) {
    return <p>Loading favorite recipes...</p>;
  }

  if (error) {
    return <p>Error fetching favorite recipes: {error.message}</p>;
  }

  return (
    <div>
      <h2>Favorite Recipes</h2>
      {favoriteMeals && favoriteMeals.map((meal) => (
        <div key={meal.id}>
          <p>{meal.name}</p> {/* Adjust this to match your Firestore schema */}
        </div>
      ))}
    </div>
  );
};

export default FavoriteRecipes;