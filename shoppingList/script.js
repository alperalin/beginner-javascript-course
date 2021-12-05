const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// we need an array to hold our state
let items = [];

const handleSubmit = (event) => {
  event.preventDefault();
  const name = event.currentTarget.item.value;

  // if no name return
  if (!name) return;

  const item = {
    id: Date.now(),
    name,
    complete: false,
  };

  // push the items into our state
  items.push(item);

  // clear the from
  event.currentTarget.reset();

  // fire off a custom event that will tell anyone else who cares that the items have been updated!
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
};

const displayItems = () => {
  const html = items
    .map(
      (item) =>
        `<li class="shopping-item" data-id=${item.id}>
            <input type="checkbox" ${item.complete ? 'checked' : ''}>
            <span class="itemName">${item.name}</span>
            <button aria-label="Remove ${item.name}">&times;</button>
        </li>`
    )
    .join('');
  list.innerHTML = html;
};

// Set items to localStorage
const mirrorToLocalStorage = () => {
  localStorage.setItem('items', JSON.stringify(items));
};

// Get items from localStorage
const restoreFromLocalStorage = () => {
  const LSitems = JSON.parse(localStorage.getItem('items'));

  if (!LSitems.length) return;

  items.push(...LSitems);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
};

// Delete items
const deleteItem = (id) => {
  items = items.filter((item) => item.id !== id);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
};

// Control the checkbox
const markAsComplete = (id) => {
  const itemRef = items.find((item) => item.id === id);
  itemRef.complete = !itemRef.complete; // toggles the value. If true change to false vice versa.
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
};

// Event listener for form
shoppingForm.addEventListener('submit', handleSubmit);

// Custom Event listener for list element.
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);

// Event Delegation: We listen for the click on the list <ul>
// but then delegate the click over to the button if that is what was clicked
list.addEventListener('click', (event) => {
  const { target } = event;

  if (target.matches('button')) {
    deleteItem(parseInt(target.parentElement.dataset.id));
  }
  if (target.matches('input[type="checkbox"]')) {
    markAsComplete(parseInt(target.parentElement.dataset.id));
  }
});

// When the page is loaded, data will pull from local storage
window.addEventListener('DOMContentLoaded', restoreFromLocalStorage);
