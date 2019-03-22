function $(s) {
  return document.querySelectorAll(s);
}
var list = $('#list')[0];

list.addEventListener('click', function(e) {
  $('#list li').forEach(function(item) {
    item.className = '';
  })
  e.target.className = 'selected';

  load('/media/' + e.target.title);
}, true)

var audio = new Audio

function load(url) {
  axios.get(url)
    .then(function(res) {
      audio.src = url;
      audio.play();
    })
    .catch(function(err) {
      console.log(err);
    })
}

function changeVolume(percent) {
  audio.volume = percent;
}

$('#volume')[0].addEventListener('change', function() {
  changeVolume(this.value / this.max);
}, true)
