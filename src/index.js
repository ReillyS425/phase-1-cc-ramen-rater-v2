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

  // Populate the "Update Featured Ramen" form with the selected ramen's values
  document.getElementById('edit-rating').value = ramen.rating;
  document.getElementById('edit-comment').value = ramen.comment;
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
      comment: formData.get('new-comment') || '', // Make sure we're using the correct key for the comment
    };

    // Create the image element for the new ramen
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener('click', () => handleClick(newRamen));
  
    document.getElementById('ramen-menu').appendChild(img);

    // Update the comment display
    const commentDisplay = document.getElementById('comment-display');
    commentDisplay.textContent = newRamen.comment || 'Insert comment here'; // This updates the text content

    // Reset the form after submission
    form.reset();
  });
};

const addEditListener = () => {
  const editForm = document.getElementById('edit-ramen');
  if (!editForm) {
    console.error("Edit form with ID 'edit-ramen' not found.");
    return;
  }

  editForm.addEventListener('submit', event => {
    event.preventDefault(); // Prevent page reload

    const newRating = document.getElementById('edit-rating').value;
    const newComment = document.getElementById('edit-comment').value;

    // Update the displayed rating and comment for the featured ramen
    document.getElementById('rating-display').textContent = newRating;
    document.getElementById('comment-display').textContent = newComment;

    // Update the current ramen object (for frontend consistency)
    currentRamen.rating = newRating;
    currentRamen.comment = newComment;
  });
};

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        handleClick(data[0]); // Display the first ramen's details
      }

      data.forEach(ramen => {
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
  addEditListener();
};

document.addEventListener("DOMContentLoaded", main);

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};