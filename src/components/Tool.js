import { assets } from '../config/assets'

export const Tool = ({ 
  icon,
  title,
  description,
  category,
  link 
}) => {
  return (
    <div className="tool">
      <img src={assets.images[icon]} alt={title} />
      <div className="tool-content">
        <div className="tool-tag">{category}</div>
        <h3 className="tool-title">{title}</h3>
        <p className="tool-description">{description}</p>
      </div>
    </div>
  )
} 