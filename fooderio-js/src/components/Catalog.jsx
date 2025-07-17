// src/components/Catalog.jsx
import DishCard from './DishCard';

export default function Catalog({ user, dishes, loading, onRefresh }) {
  if (loading) {
    return <p className="text-center mt-8">Loading dishes…</p>;
  }

  return (
    <div className="catalog px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Fooderio Studio 🍽️</h1>
        {user && (
          <button
            onClick={onRefresh}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Refresh
          </button>
        )}
      </div>

      {dishes.length === 0 ? (
        <p>No dishes yet. Be the first to publish one!</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map(dish => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      )}
    </div>
  );
}
