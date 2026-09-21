const tabs = [...document.querySelectorAll('.service-tab')];
const form = document.getElementById('booking-form');
const result = document.getElementById('result');
const pickup = document.getElementById('pickup');
const destination = document.getElementById('destination');
let service = 'ride';

const labels = {
  ride: {
    pickup: 'Pick-up location',
    destination: 'Destination',
    pickupPlaceholder: 'Enter pick-up location',
    destinationPlaceholder: 'Where are you going?',
    title: 'Ride plan ready',
  },
  food: {
    pickup: 'Restaurant or food spot',
    destination: 'Delivery address',
    pickupPlaceholder: 'Where is the food from?',
    destinationPlaceholder: 'Where should it be delivered?',
    title: 'Food delivery plan ready',
  },
  send: {
    pickup: 'Package pick-up',
    destination: 'Delivery address',
    pickupPlaceholder: 'Where is the package?',
    destinationPlaceholder: 'Where should it go?',
    title: 'Package delivery plan ready',
  },
};

function selectService(type) {
  service = type;
  tabs.forEach(tab => {
    const selected = tab.dataset.type === type;
    tab.classList.toggle('active', selected);
    tab.setAttribute('aria-pressed', String(selected));
  });
  document.getElementById('pickup-label').textContent = labels[type].pickup;
  document.getElementById('destination-label').textContent = labels[type].destination;
  pickup.placeholder = labels[type].pickupPlaceholder;
  destination.placeholder = labels[type].destinationPlaceholder;
  result.hidden = true;
}

tabs.forEach(tab => tab.addEventListener('click', () => selectService(tab.dataset.type)));
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => selectService(link.dataset.service));
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const from = pickup.value.trim();
  const to = destination.value.trim();
  if (!from || !to) {
    form.reportValidity();
    return;
  }
  result.replaceChildren();
  const title = document.createElement('strong');
  title.textContent = labels[service].title;
  const summary = document.createElement('span');
  summary.textContent = `${from} → ${to}. This demo shows your plan only; no booking has been placed.`;
  result.append(title, summary);
  result.hidden = false;
});
