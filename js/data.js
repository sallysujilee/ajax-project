/* exported data */
var dataAPI = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
  favorites: []
};

window.addEventListener('beforeunload', function () {
  localStorage.setItem('data', JSON.stringify(dataAPI));
});

if (localStorage.getItem('data')) {
  dataAPI = JSON.parse(localStorage.getItem('data'));
}
