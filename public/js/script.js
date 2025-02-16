window.onload = show;

function show() {
  $("#proj1").click(function () {
    loadDescription1("/text/project1.txt");
  });
  $("#proj2").click(function () {
    loadDescription2("/text/project2.txt");
  });
  $("#proj3").click(function () {
    loadDescription3("/text/project3.txt");
  });
}

function loadDescription1(fileName) {
  $.get(fileName, function (data) {
    $("#description1").html(data).show();
    $("#btn1").show();
  });
  if (!$("#cOne").find(".hide-btn").length) {
    $("#cOne").append("<button id=btn1 class='hide-btn'>Hide</button>");
  }
  $("#cOne")
    .find(".hide-btn")
    .click(function () {
      $("#description1").hide();
      $("#btn1").hide();
    });
}

function loadDescription2(fileName) {
  $.get(fileName, function (data) {
    $("#description2").html(data).show();
    $("#btn2").show();
  });

  if (!$("#cTwo").find(".hide-btn").length) {
    $("#cTwo").append("<button id=btn2 class='hide-btn'>Hide</button>");
  }

  $("#cTwo")
    .find(".hide-btn")
    .click(function () {
      $("#description2").hide();
      $("#btn2").hide();
    });
}

function loadDescription3(fileName) {
  $.get(fileName, function (data) {
    $("#description3").html(data).show();
    $("#btn3").show();
  });
  if (!$("#cThree").find(".hide-btn").length) {
    $("#cThree").append("<button  id=btn3 class='hide-btn'>Hide</button>");
  }
  $("#cThree")
    .find(".hide-btn")
    .click(function () {
      $("#description3").hide();
      $("#btn3").hide();
    });
}
