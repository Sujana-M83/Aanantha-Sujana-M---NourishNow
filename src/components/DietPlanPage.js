import React from 'react';
import './DietCards.css'; // For styling

const DietCards = () => {
  const diets = [
    {
      name: 'The "Original"',
      description: 'A DASH-aligned meal plan following the eating plan from the original Mayo Clinic Diet book. (Available as gluten-free.)',
      pdf: 'pdfs/sample-original (1).pdf',
      image: 'https://i.pinimg.com/originals/ab/6b/4e/ab6b4e1c31aabc89cd9a245f63540585.jpg'
    },
    {
      name: 'Simple',
      description: 'Our most popular menu with fuss-free meals that use ready-prepped ingredients to save time. (Available as gluten-free.)',
      pdf: 'pdfs/sample-simple.pdf',
      image: 'https://www.shugarysweets.com/wp-content/uploads/2023/01/chocolate-chip-brownies-recipe-600x600.jpg'
    },
    {
      name: 'Mediterranean',
      description: 'A plant-based meal plan featuring fish, nuts, legumes, and unlimited vegetables and fruits. It is a great choice for members focused on heart health. (Available as gluten-free.)',
      pdf:  'pdfs/sample-mediterranean-cropped.pdf',
      image: 'https://dailyaccessnews.com/wp-content/uploads/2021/01/Optimized-AdobeStock_331503689.jpeg'
    },
    {
      name: 'Higher Protein',
      description: 'This tasty meal plan distributes protein evenly across each meal of the day. Balancing protein helps control appetite and curb cravings.',
      pdf: 'pdfs/sample-higher-protein.pdf',
      image: 'https://eatthegains.com/wp-content/uploads/2022/12/High-Protein-Meal-Prep-10-683x1024.jpg'
    },
    {
      name: 'Healthy Keto',
      description: 'A high-fat, low-carb diet which delivers healthy fats from extra virgin olive oil, avocado, nuts and seeds, and keeps daily net carbs to around 50 grams.',
      pdf: 'pdfs/sample-keto.pdf',
      image: 'https://i.pinimg.com/originals/e2/ca/b5/e2cab591879892ed5622e3a1f96ae56f.jpg'
    },
    {
      name: 'Vegetarian',
      description: 'A meat-free, plant-packed meal plan that delivers hunger-busting protein from beans, soy, eggs and dairy. Suitable for lacto-ovo vegetarians.',
      pdf: 'pdfs/sample-vegetarian_edited.pdf',
      image: 'https://domf5oio6qrcr.cloudfront.net/media/content/images/cr/f5282d05-33f5-4c93-a08e-b000164a54db.jpg'
    },
    {
      name: 'Meal plan for GLP-1s',
      description: 'A higher protein, lower volume version of our most popular meal plan, designed for members using GLP-1s.',
      pdf: 'pdfs/protein-balance-for-glp1s-sample-meal-plan.pdf',
      image: 'https://media.post.rvohealth.io/wp-content/uploads/2024/05/food-table-nestle-732x549-thumbnail.jpg'
    },
    // Add more diets as needed
  ];

  return (
    <div className="diet-section">
      <h3>You are not dieting; you are changing your lifestyle</h3>
      <div className="diet-cards-container">
        {diets.map((diet, index) => (
          <div className="diet-card" key={index}>
            <img src={diet.image} alt={diet.name} className="diet-image" />
            <h3>{diet.name}</h3>
            <p>{diet.description}</p>
            <button onClick={() => window.open(diet.pdf, '_blank')} style={{backgroundColor:"teal"}}>
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietCards;
