import React, { useState } from "react";
import Form from "react-bootstrap/Form";

function Category({ onCategoryChange }) {
  const categories = ["men", "women", "etiquette", "misc"];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    onCategoryChange(event.target.value);
  };

  return (
    <div className="m-3">
      <Form.Select onChange={handleCategoryChange} value={selectedCategory}>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}

export default Category;
