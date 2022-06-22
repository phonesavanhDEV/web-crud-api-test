"use strict";

function loadTable() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/user/all");
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var trHTML = '';
      var objects = JSON.parse(this.responseText);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = objects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var object = _step.value;
          trHTML += '<tr>';
          trHTML += '<td>' + object['id'] + '</td>';
          trHTML += '<td><img width="50px" src="' + object['avatar'] + '" class="avatar"></td>';
          trHTML += '<td>' + object['fname'] + '</td>';
          trHTML += '<td>' + object['lname'] + '</td>';
          trHTML += '<td>' + object['username'] + '</td>';
          trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' + object['id'] + ')">Edit</button>';
          trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' + object['id'] + ')">Del</button></td>';
          trHTML += "</tr>";
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}

loadTable();

function showUserCreateBox() {
  Swal.fire({
    title: 'Create user',
    html: '<input id="id" class="swal2-input" placeholder="ID">' + '<input id="fname" class="swal2-input" placeholder="First">' + '<input id="lname" class="swal2-input" placeholder="Last">' + '<input id="username" class="swal2-input" placeholder="Username">' + '<input id="email" class="swal2-input" placeholder="Email">' + '<input id="avatar" class="swal2-input" placeholder="Avatar">',
    focusConfirm: false,
    preConfirm: function preConfirm() {
      userCreate();
    }
  });
}

function userCreate() {
  var id = document.getElementById("id").value;
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var avatar = document.getElementById("avatar").value;
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/user/create");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "id": id,
    "fname": fname,
    "lname": lname,
    "username": username,
    "email": email,
    "avatar": avatar
  }));

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    }
  };
}

function userDelete(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:3000/user/delete");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "id": id
  }));

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      var objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    }
  };
}

function showUserEditBox(id) {
  console.log(id);
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/user/" + id);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var objects = JSON.parse(this.responseText);
      var user = objects['user'];
      console.log(user);
      Swal.fire({
        title: 'Edit User',
        html: '<input id="id" class="swal2-input" placeholder="First" value="' + user['id'] + '" disabled>' + '<input id="fname" class="swal2-input" placeholder="First" value="' + user['fname'] + '">' + '<input id="lname" class="swal2-input" placeholder="Last" value="' + user['lname'] + '">' + '<input id="username" class="swal2-input" placeholder="Username" value="' + user['username'] + '">' + '<input id="email" class="swal2-input" placeholder="Email" value="' + user['email'] + '">' + '<input id="avatar" class="swal2-input" placeholder="Avatar" value="' + user['avatar'] + '">',
        focusConfirm: false,
        preConfirm: function preConfirm() {
          userEdit();
        }
      });
    }
  };
}

function userEdit() {
  var id = document.getElementById("id").value;
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var avatar = document.getElementById("avatar").value;
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:3000/user/update");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "id": id,
    "fname": fname,
    "lname": lname,
    "username": username,
    "email": email,
    "avatar": avatar
  }));

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    }
  };
}
//# sourceMappingURL=index.dev.js.map
