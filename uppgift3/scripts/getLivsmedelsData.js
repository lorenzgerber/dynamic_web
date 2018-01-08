addLoadEvent(attachButtonEvent);
addLoadEvent(preventEnter);
addLoadEvent(toggleTableVisibility);

function emptyTable(){
  var table = document.getElementById("tabell");
  while(table.rows.length > 1) {
    table.deleteRow(1);
  }
  toggleTableVisibility();
}

function preventEnter(){
  document.getElementById("livsmedelsSokOrd").onkeydown = function(e) {
    if ((e.keyCode == 13) && (typeof this.form != "undefined")) {
      this.form.addEventListener('submit', function (e) {
        e.preventDefault();
      }, {"once": true});
    }
  }
}

function toggleTableVisibility(){
  var table = document.getElementById('tabell');
  if (table.rows.length > 1){
    table.style.display = 'block';
  } else {
    table.style.display = 'none';
  }
}

function populateTable(jsonData){
  var livsmedel = jsonData.livsmedel;
  var table = document.getElementById("tabell").getElementsByTagName('tbody')[0];

  for(var i = 0; i < livsmedel.length; i ++){
    var row = table.insertRow(i);
    var namn = row.insertCell(0).innerHTML = livsmedel[i].namn;
    var energi = row.insertCell(1).innerHTML = livsmedel[i].energi;
    var kolhydrater = row.insertCell(2).innerHTML = livsmedel[i].kolhydrater;
    var protein = row.insertCell(3).innerHTML = livsmedel[i].protein;
    var fett = row.insertCell(4).innerHTML = livsmedel[i].fett;

  }
  toggleTableVisibility();
}

function getLivsmedel(){

  var userEntry = document.getElementById('livsmedelsSokOrd').value;

  $.ajax({
          url: "https://webservice.informatik.umu.se/webservice_livsmedel/getlivsmedel.php",
          dataType: "jsonp",
          data: {
              namn: userEntry
          },
          // Om förfrågan gått bra...
          success: function (response) {
            console.log(response);
            emptyTable();
            populateTable(response);
          }
      });
}

function attachButtonEvent(){
  var sokButton = document.getElementById('sok-button');
  sokButton.setAttribute('onclick', 'getLivsmedel()');
}

// taken from 'DOM Scripting', Jeremy Keith &
// Jeffery Sambells. friendsofED (2010)
function addLoadEvent(func){
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}
