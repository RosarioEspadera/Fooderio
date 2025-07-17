import './DishCard.css'; // optional CSS

export default function DishCard({ dish }) {
  return (
    <div className="dish-card">
      <img src={dish.imageUrl} alt={dish.name} className="dish-img" />
      <div className="dish-info">
        <h3>{dish.name}</h3>
        <p>{dish.description}</p>
        <div className="tags">
          {dish.tags?.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <p className="price">₱{dish.price}</p>
        <p className="creator">by {dish.creatorName}</p>
      </div>
    </div>
  );
}
