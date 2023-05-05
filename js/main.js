const $homepage = document.querySelector('[data-view="homepage"]');
const $weaponsContainer = document.querySelector('[data-view="weaponsList"]');
const $row = document.querySelector('.row');
let dataAPI;
// console.log(dataAPI);

function viewSwap(viewName) {
  if (viewName === 'homepage') {
    $homepage.classList.remove('hidden');
    $weaponsContainer.classList.add('hidden');
  } else if (viewName === 'weaponsList') {
    $weaponsContainer.classList.remove('hidden');
    $homepage.classList.add('hidden');
  }
  dataAPI.view = viewName;
}

const $weaponsNav = document.querySelector('.task-weapons');
$weaponsNav.addEventListener('click', function () {
  viewSwap('weaponsList');
});

document.addEventListener('DOMContentLoaded', function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://valorant-api.com/v1/weapons');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log(xhr.status);
    // console.log(xhr.response);
    const data = xhr.response;
    dataAPI.entries = xhr.response.data;
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
  // console.log(gun);

  const $column = document.createElement('div');
  $column.className = 'column-third';

  const $imgContainer = document.createElement('div');
  $imgContainer.className = 'img-container';
  $column.appendChild($imgContainer);

  const $gunImg = document.createElement('img');
  $gunImg.className = 'gun-img';
  $gunImg.setAttribute('id', gun.displayName);
  $gunImg.setAttribute('src', gun.displayIcon);
  $imgContainer.appendChild($gunImg);

  const $gunName = document.createElement('div');
  $gunName.className = 'gun-name';
  $gunName.textContent = gun.displayName;
  $column.appendChild($gunName);

  const $gunCost = document.createElement('div');
  $gunCost.className = 'gun-cost';
  $gunCost.textContent = gun.shopData?.cost;

  const $gunCategory = document.createElement('div');
  $gunCategory.className = 'gun-category';
  $gunCategory.textContent = gun.categoryText;

  const $gunFireRate = document.createElement('div');
  $gunFireRate.className = 'gun-fire-rate';
  $gunFireRate.textContent = gun.fireRate;

  const $gunFirstBulletAccuracy = document.createElement('div');
  $gunFirstBulletAccuracy.className = 'gun-first-bullet-accuracy';
  $gunFirstBulletAccuracy.textContent = gun.firstBulletAccuracy;

  const $gunEquipSpeed = document.createElement('div');
  $gunEquipSpeed.className = 'gun-equip-speed';
  $gunEquipSpeed.textContent = gun.equipSpeed;

  const $gunReloadTimeSeconds = document.createElement('div');
  $gunReloadTimeSeconds.className = 'gun-reload-time-seconds';
  $gunReloadTimeSeconds.textContent = gun.reloadTimeSeconds;

  const $gunZoomMultiplier = document.createElement('div');
  $gunZoomMultiplier.className = 'gun-zoom-multiplier';
  $gunZoomMultiplier.textContent = gun.zoomMultiplier;

  const $gunRunSpeedMultiplier = document.createElement('div');
  $gunRunSpeedMultiplier.className = 'gun-run-speed-multiplier';
  $gunRunSpeedMultiplier.textContent = gun.runSpeedMultiplier;

  const $gunMagazineSize = document.createElement('div');
  $gunMagazineSize.className = 'gun-first-bullet-accuracy';
  $gunMagazineSize.textContent = gun.magazineSize;

  const $gunDamageRanges = document.createElement('div');
  $gunDamageRanges.className = 'gun-damage-ranges';
  $gunDamageRanges.textContent = gun.weaponStats?.damageRanges[0].bodyDamage;
  // console.log(gun.weaponStats.damageRanges);

  // const $starIcon = document.createElement('i');
  // $starIcon.className = 'fa fa-star';
  // // console.log(data);
  // if (data.favorites.includes(gun.uuid)) {
  //   $starIcon.classList.add('favorited');
  // }
  // $imgContainer.appendChild($starIcon);

  // $starIcon.addEventListener('click', function (event) {
  //   if (event.target.classList.contains('favorited')) {
  //     data.favorites = data.favorites.filter(function (favorite) {
  //       return favorite !== gun.uuid;
  //     });
  //   } else {
  //     data.favorites.push(gun.uuid);
  //   }
  //   event.target.classList.toggle('favorited');
  // });

  return $column;
}

const $popUp = document.querySelector('.pop-up');

$row.addEventListener('click', function (event) {
  if (event.target.tagName === 'IMG') {
    // console.log(event.target.id);
    $popUp.classList.toggle('hidden');
    // console.log(dataAPI.entries);

    for (let i = 0; i < dataAPI.entries.length; i++) {
      // console.log(dataAPI.entries[i].displayName);
      if (event.target.id === dataAPI.entries[i].displayName) {
        // console.log('match');
        const $popUpGun = dataAPI.entries[i];
        // console.log($popUpGun);
        const gunDisplayName = document.querySelector('#gun-display-name');
        gunDisplayName.textContent = $popUpGun.displayName;
        const gunCostHeader = document.querySelector('#gun-cost-header');
        gunCostHeader.textContent = $popUpGun.shopData.cost;
        if ($popUpGun.shopData.cost === null) {
          return 0;
        }
        // } else if ($popUpGun.shopData.cost !== null) {
        //   return i;
        // }

        const category = document.querySelector('#category');
        // console.log(category);
        category.textContent = 'Category: ' + $popUpGun.shopData.category;
        const fireRate = document.querySelector('#fire-rate');
        fireRate.textContent = 'Fire Rate: ' + $popUpGun.weaponStats.fireRate;
        const firstBulletAccuracy = document.querySelector('#first-bullet-accuracy');
        firstBulletAccuracy.textContent = 'First Bullet Accuracy: ' + $popUpGun.weaponStats.firstBulletAccuracy;
        const runSpeed = document.querySelector('#run-speed');
        runSpeed.textContent = 'Run Speed: ' + $popUpGun.weaponStats.runSpeedMultiplier;
        const zoom = document.querySelector('#zoom');
        zoom.textContent = 'Zoom: ' + $popUpGun.weaponStats.adsStats.zoomMultiplier;
        const equipSpeed = document.querySelector('#equip-speed');
        equipSpeed.textContent = 'Equip Speed: ' + $popUpGun.weaponStats.equipTimeSeconds;
        const magazine = document.querySelector('#magazine');
        magazine.textContent = 'Magazine: ' + $popUpGun.weaponStats.magazineSize;
        const reloadSpeed = document.querySelector('#reload-speed');
        reloadSpeed.textContent = 'Reload Speed: ' + $popUpGun.weaponStats.reloadTimeSeconds;

        const headDamage = document.querySelector('#head');
        headDamage.textContent = 'Head: ' + $popUpGun.weaponStats.damageRanges[0].headDamage;
        const bodyDamage = document.querySelector('#body');
        bodyDamage.textContent = 'Body: ' + $popUpGun.weaponStats.damageRanges[0].bodyDamage;
        const legDamage = document.querySelector('#leg');
        legDamage.textContent = 'Leg: ' + $popUpGun.weaponStats.damageRanges[0].legDamage;

        const headDamageFar = document.querySelector('#head-far');
        headDamageFar.textContent = 'Head: ' + $popUpGun.weaponStats.damageRanges[1].headDamage;
        const bodyDamageFar = document.querySelector('#body-far');
        bodyDamageFar.textContent = 'Body: ' + $popUpGun.weaponStats.damageRanges[1].bodyDamage;
        const legDamageFar = document.querySelector('#leg-far');
        legDamageFar.textContent = 'Leg: ' + $popUpGun.weaponStats.damageRanges[1].legDamage;

        // const burstCount = document.querySelector('#fireRate')Burst Count:' + $popUpGun.
      }
    }
  }
//   } else if (event.target.tagName === 'weapons') {
//     $gunCost.textContent = gun.shopData?.cost;
//     $popUpColumnHalf.appendChild($gunCost);
//   }
});
