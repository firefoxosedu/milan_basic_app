var list;
window.onload = function() {
  console.log('Hola Milano!');

  //http://www.gazzetta.it/rss/home.xml

  document.getElementById('addButton').
    addEventListener('click', fetchData);

  list = document.getElementById('newsList');
  fetchData();
}

function fetchData() {
  var myRequest = new XMLHttpRequest({mozSystem: true});
  myRequest.open('GET', 'http://www.gazzetta.it/rss/home.xml');
  myRequest.addEventListener('load', function() {
    if (myRequest.status === 200) {
      list.innerHTML = '';
      var items = myRequest.responseXML.querySelectorAll('item');
      items = Array.prototype.slice.call(items,0);
      items.forEach(function(item) {
        var title = item.getElementsByTagName('title')[0].textContent;
        var description = item.getElementsByTagName('description')[0].textContent;
        var photo = item.getElementsByTagName('enclosure')[1].getAttribute('url');
        var listItem = '<li><aside class="pack-end"><img alt="placeholder" src="' + photo + '"></aside><a href="#"><p>' + title + '</p><p>' + description + '</p></a></li>';
        list.innerHTML = list.innerHTML + listItem;
      });
    }
  });
  myRequest.send();
}
