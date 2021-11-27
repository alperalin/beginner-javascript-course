const tabs = document.querySelector('.tabs');
const tabButtons = document.querySelectorAll('[role="tab"]');
const tabPanels = document.querySelectorAll('[role="tabpanel"]');

const handleTab = (event) => {
  // get current button
  const currentButton = event.currentTarget;
  const { id } = currentButton;

  // hide all tabs
  tabPanels.forEach((panel) => {
    panel.hidden = true;
  });

  // inactivate all buttons
  tabButtons.forEach((tab) => {
    tab.setAttribute('aria-selected', false);
  });

  // activate current button
  currentButton.setAttribute('aria-selected', true);

  // find and show tabpanel that has same id with current button
  tabs.querySelector(`[aria-labelledby=${id}]`).removeAttribute('hidden');
};

tabButtons.forEach((button) => {
  button.addEventListener('click', handleTab);
});
