const $homepage = document.querySelector('[data-view="homepage"]');
const $weaponsContainer = document.querySelector('[data-view="weaponsList"]');
const $row = document.querySelector('.row');

function viewSwap(viewName) {
  if (viewName === 'homepage') {
    $homepage.classList.remove('hidden');
    $weaponsContainer.classList.add('hidden');
  } else if (viewName === 'weaponsList') {
    $weaponsContainer.classList.remove('hidden');
    $homepage.classList.add('hidden');
  }
  data.view = viewName;
}

const $weaponsNav = document.querySelector('.task-weapons');
$weaponsNav.addEventListener('click', function () {
  viewSwap('weaponsList');
});
// ajax request //
// 1. when make ajax request?
document.addEventListener('DOMContentLoaded', function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://valorant-api.com/v1/weapons');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log(xhr.status);
    // console.log(xhr.response);
    const data = xhr.response;
    for (let i = 0; i < data.data.length; i++) {
      // data.data.length = data is looking through the data array//
      // console.log(data.data[i]);
      const gunTree = renderGunTree(data.data[i]);
      $row.appendChild(gunTree);
    }
  });
  xhr.send();
}
);

function renderGunTree(gun) {

  const $column = document.createElement('div');
  $column.className = 'column-third';

  const $imgContainer = document.createElement('div');
  $imgContainer.className = 'img-container';
  $column.appendChild($imgContainer);

  const $gunImg = document.createElement('img');
  $gunImg.className = 'gun-img';
  $gunImg.setAttribute('src', gun.displayIcon);
  $imgContainer.appendChild($gunImg);

  const $gunName = document.createElement('div');
  $gunName.className = 'gun-name';
  $gunName.textContent = gun.displayName;
  $column.appendChild($gunName);

  const $starIcon = document.createElement('i');
  $starIcon.className = 'fa fa-star';
  // console.log(data);
  if (data.favorites.includes(gun.uuid)) {
    $starIcon.classList.add('favorited');
  }
  $imgContainer.appendChild($starIcon);

  $starIcon.addEventListener('click', function (event) {
    if (event.target.classList.contains('favorited')) {
      data.favorites = data.favorites.filter(function (favorite) {
        return favorite !== gun.uuid;
      });
    } else {
      data.favorites.push(gun.uuid);
    }
    event.target.classList.toggle('favorited');
  });

  return $column;
}
