const Card = (props) => {
  const defaultImage = "https://via.placeholder.com/150"; // Placeholder image URL
  
  return (
    <div className="Card">
      <div className="image-wrapper">
        {/* Use default image if props.image is null or undefined */}
        <img src={props.image || defaultImage} alt={props.name} />
      </div>
      <h2>{props.name}</h2>
      <p>Price: {props.price}</p>
      <div className="button-group">
        <button>Add to Cart</button>
        <button>Buy Now</button>
      </div>
    </div>
  );
};

export default Card;