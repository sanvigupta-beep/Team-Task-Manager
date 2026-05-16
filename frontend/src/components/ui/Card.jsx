const Card = ({ children, className = "", hover = false, padded = true, as: Tag = "div", ...rest }) => (
  <Tag
    className={`card ${padded ? "p-5" : ""} ${hover ? "card-hover" : ""} ${className}`}
    {...rest}
  >
    {children}
  </Tag>
);

export default Card;
