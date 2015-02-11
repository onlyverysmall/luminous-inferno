var fb = new Firebase("https://luminous-inferno-6876.firebaseio.com");
var thingsRef = fb.child("things");

var addThing = function() {
  var thing = document.getElementById("thing");
  thingsRef.push(thing.value);
  thing.value = '';
};

var removeThing = function(element) {
  var thing = element.parentElement;
  thingsRef.child(thing.id).remove();
};

thingsRef.on("value", function(snap) {
  // console.log(snap.val());
}, function(errorObject) {
  console.log("fail: " + errorObject.code);
});

thingsRef.on("child_added", function(snap) {
  var list = document.getElementById("thingList");
  var item = document.createElement("li");
  var remove = document.createElement("a");
  var liText = document.createTextNode(" " + snap.val());
  var removeText = document.createTextNode("[x]");
  remove.setAttribute("href", "#");
  remove.setAttribute("onclick", "removeThing(this)");
  remove.appendChild(removeText);
  item.id = snap.key();
  item.appendChild(remove);
  item.appendChild(liText);
  list.appendChild(item);
});

thingsRef.on("child_changed", function(snap) {
  var changedThing = document.getElementById(snap.key());
  changedThing.innerHTML = snap.val();
});

thingsRef.on("child_removed", function(snap) {
  var removedThing = document.getElementById(snap.key());
  removedThing.remove();
});
