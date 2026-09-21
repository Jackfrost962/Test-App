const services = [
  { name: 'Pijat Tradisional', base: 120000, durations: [60, 90, 120] },
  { name: 'Refleksi Kaki', base: 100000, durations: [60, 90] },
  { name: 'Pijat Aromaterapi', base: 150000, durations: [60, 90, 120] },
  { name: 'Pijat & Lulur', base: 180000, durations: [90, 120] }
];
const $ = (id) => document.getElementById(id);
const money = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
const dialog = $('booking-dialog');
let selected = 0;
let saved = null;
try { saved = JSON.parse(localStorage.getItem('raga-booking')); $('address').value = localStorage.getItem('raga-address') || ''; } catch {}
if (window.lucide) window.lucide.createIcons();
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => {
    item.classList.toggle('selected', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  document.querySelectorAll('.service-card').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
}));
$('save-location').addEventListener('click', () => {
  const address = $('address').value.trim();
  if (!address) { $('location-feedback').textContent = 'Isi alamat perawatan terlebih dahulu.'; $('address').focus(); return; }
  try { localStorage.setItem('raga-address', address); $('location-feedback').textContent = 'Alamat tersimpan untuk perawatan Anda.'; }
  catch { $('location-feedback').textContent = 'Alamat siap digunakan selama halaman ini terbuka.'; }
});
function updatePrice() {
  const service = services[selected];
  $('price').textContent = money(service.base + (Number($('duration').value) - service.durations[0]) / 30 * 50000);
}
function openBooking(index, previous = null) {
  selected = index;
  const service = services[index];
  $('booking-title').textContent = service.name;
  $('duration').replaceChildren(...service.durations.map(duration => new Option(`${duration} menit`, duration)));
  const today = new Date();
  const localDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  $('date').min = localDate;
  $('date').value = previous?.date >= localDate ? previous.date : localDate;
  $('booking-address').value = previous?.address || $('address').value;
  $('time').value = previous?.time || '09:00';
  if (previous && service.durations.includes(Number(previous.duration))) $('duration').value = previous.duration;
  $('booking-status').textContent = '';
  updatePrice();
  dialog.showModal();
}
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => openBooking(Number(button.dataset.service))));
$('duration').addEventListener('change', updatePrice);
$('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
$('booking-form').addEventListener('submit', event => {
  event.preventDefault();
  const address = $('booking-address').value.trim();
  if (!address) { $('booking-address').setCustomValidity('Masukkan alamat perawatan.'); $('booking-address').reportValidity(); return; }
  const appointment = new Date(`${$('date').value}T${$('time').value}:00`);
  if (appointment <= new Date()) { $('booking-status').textContent = 'Pilih tanggal dan waktu yang belum lewat.'; return; }
  saved = { service: selected, duration: $('duration').value, address, date: $('date').value, time: $('time').value };
  $('address').value = address;
  try { localStorage.setItem('raga-booking', JSON.stringify(saved)); $('booking-status').textContent = 'Pilihan tersimpan di perangkat ini. Belum ada pesanan atau pembayaran yang dibuat.'; }
  catch { $('booking-status').textContent = 'Pilihan tersimpan sementara selama halaman ini terbuka. Belum ada pesanan yang dibuat.'; }
});
$('booking-address').addEventListener('input', () => $('booking-address').setCustomValidity(''));
$('history').addEventListener('click', () => {
  if (saved && Number.isInteger(saved.service) && services[saved.service]) openBooking(saved.service, saved);
  else { $('location-feedback').textContent = 'Belum ada pilihan tersimpan. Pilih perawatan untuk mulai.'; $('layanan').scrollIntoView({ behavior: 'smooth' }); }
});
