// index.js

// Callbacks
const handleClick = (ramen) => {
  const details = {
    '.detail-image': ramen.image,
    '.name': ramen.name,
    '.restaurant': ramen.restaurant,
    '#rating-display': ramen.rating,
    '#comment-display': ramen.comment,
  };

  Object.entries(details).forEach(([selector, value]) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      if (element.tagName === 'IMG') {
        element.src = value;
        element.alt = ramen.name;
      } else {
        element.textContent = value;
      }
    });
  });
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  if (!form) {
    console.error("Form with ID 'new-ramen' not found.");
    return;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);
    const newRamen = {
      name: formData.get('name'),
      restaurant: formData.get('restaurant'),
      image: formData.get('image'),
      rating: formData.get('rating'),
      comment: formData.get('comment') || '', 
    };

    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener('click', () => handleClick(newRamen));
  
    document.getElementById('ramen-menu').appendChild(img);

    // Update comment display
    const commentDisplay = document.getElementById('comment-display');
    commentDisplay.textContent = newRamen.comment || 'Insert comment here';
  
    form.reset();
  });
};

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(data => {
      data.forEach(ramen => {
        console.log(ramen.name);
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => handleClick(ramen));
        document.getElementById('ramen-menu').appendChild(img);
      });
    })
    .catch(error => {
      console.log('Error fetching ramen data', error);
    });
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

document.addEventListener("DOMContentLoaded", main);

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};