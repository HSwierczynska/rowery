


window.onload = function onWindowReady() {
  fetch('https://app.socialbicycles.com/api/networks/105/hubs?per_page=150')
  .then(response => response.json())
  .then(data => {
    $("#loader").css("opacity", 0);


    data.items.map(hub => {
      var status = hub.available_bikes/hub.racks_amount;
      var statusClass = 'red-status';
      if (status >= 0.5) {
        statusClass = 'green-status';
      } else if (status >= 0.1) {
        statusClass = 'yellow-status';
      }

      $('#rowery > tbody:last-child').append(
        $('<tr>').append(
          $('<td>').append(
            $('<div>').text(hub.name).addClass('header'),
            $('<div>').text(hub.address).addClass('description')

          ),
          $('<td>').append(
            hub.available_bikes + '/' + hub.racks_amount
          )
        ).addClass(statusClass)
      );
    });

  });
}


function whichTransitionEvent(element){
    var t;
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( element.style[t] !== undefined ){
            return transitions[t];
        }
    }
}

var transitionEvent = whichTransitionEvent(document.getElementById("loader"));
var e = document.getElementById("loader");
transitionEvent && e.addEventListener(transitionEvent, function() {
  e.parentElement.removeChild(e);
});
