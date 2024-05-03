var simstatus = 0;
var rotstatus = 1;
var rtst = false;
var commenttext = "Some Text";
var commentloc = 0;
var tabchanges = 0;

var trans = new point(140, 250);

var o = new point(0, 0, " ");
var a = new point(0, 0, "1");
var b = new point(0, 0, "2");
var c = new point(0, 0, "A");
var d = new point(0, 0, "B");

var trans1 = new point(300, 250);
var z = new point(0, 0, " ");
var w = new point(0, 0, " ");
var v = new point(0, 0, " ");
var u = new point(0, 0, " ");
var t = new point(0, 0, " ");
var s = new point(0, 0, " ");
var a1 = new point(0, 0, "1");
var b1 = new point(0, 0, "2");
var c1 = new point(0, 0, "A");
var d1 = new point(0, 0, "B");

var r1 = 20;
var r2 = 20;
var m1 = 0,
  m2 = 0;
var l1 = 20;
var omega = 2;
var theta = 0;
var Bb;
var Ba;
var Fh;
var Fv;
var Fu;
var ra;
var la;
var rb;
var lb;
var thetab;
var thetaa;
var ma;
var mb;
var m;
var th;
var submitbut = 0;
var flaggrashof = true;

var canvas;
var ctx;
//timing section
var simTimeId = setInterval("", "1000");
var pauseTime = setInterval("", "1000");
var time = 0;
//point tracing section
var ptx = [];
var pty = [];
ptxdot = [];
ptxddot = [];
ptxdddot = [];
//click status of legend and quick reference
var legendCS = false;
var quickrefCS = false;
var temp = 0;
var offset = 0;

var acc, vel, jerk;
var j = 20;
var tempPt = new point(0, 0, "");
var truncate = 290;
var forvar = 0;
var canvas = document.getElementById("simscreen");
var ctx = canvas.getContext("2d");

function editcss() {
  $(".variable").css("padding-top", "5px");
  //$('.usercheck').css('left','40px');
  $(".submitbutton").css("padding-top", "8px");
  $(".submitbutton").css("padding-left", "60px");
  $(".text").css("padding-left", "-10px");
  $(".text").css("padding-top", "28px");
}

function startsim() {
  simTimeId = setInterval("time=time+0.1; varupdate(); ", "100");
}

// switches state of simulation between 0:Playing & 1:Paused

// function simstate() {
//   //for play pause button
//   var imgfilename = document.getElementById("playpausebutton").src;
//   imgfilename = imgfilename.substring(
//     imgfilename.lastIndexOf("/") + 1,
//     imgfilename.lastIndexOf(".")
//   );

//   if (imgfilename == "bluepausedull") {
//     document.getElementById("playpausebutton").src = "images/blueplaydull.svg";
//     clearInterval(simTimeId);
//     simstatus = 1;
//     drawrem(ctx);
//     $("#theta1spinner").spinner("value", theta); //to set simulation parameters on pause -->
//     pauseTime = setInterval("varupdate();", "100");
//   }
//   if (imgfilename == "blueplaydull") {
//     time = 0;
//     clearInterval(pauseTime);
//     document.getElementById("playpausebutton").src = "images/bluepausedull.svg";
//     simTimeId = setInterval("time=time+0.1; varupdate(); ", "100");
//     simstatus = 0;
//   }
// }

function simstate()//for play pause button
{
  var imgfilename=document.getElementById('playpausebutton').src;
  imgfilename = imgfilename.substring(imgfilename.lastIndexOf('/') + 1, imgfilename.lastIndexOf('.'));
  
    if (imgfilename=="bluepausedull")
  {
    document.getElementById('playpausebutton').src="images/blueplaydull.svg";
	 clearInterval(simTimeId);
    simstatus=1;
	drawrem(ctx);
    // $('#theta1spinner').spinner("value",theta);			//to set simulation parameters on pause -->
    pauseTime=setInterval("varupdate();",'100');
    document.querySelector(".playPause").textContent = "Play";
  }
    if (imgfilename=="blueplaydull")
  {
  	 time=0;			
  	 clearInterval(pauseTime);
    document.getElementById('playpausebutton').src="images/bluepausedull.svg";
    simTimeId=setInterval("time=time+0.1; varupdate(); ",'100');  
    document.querySelector(".playPause").textContent = "Pause";  
    simstatus=0;
  } 

}

function rotstate() {
  //anticlockwise and clowise rotation
  var imgfilename = document.getElementById("rotationbutton").src;
  imgfilename = imgfilename.substring(
    imgfilename.lastIndexOf("/") + 1,
    imgfilename.lastIndexOf(".")
  );
  if (imgfilename == "bluecwdull") {
    document.getElementById("rotationbutton").src = "images/blueccwdull.svg";
    rotstatus = -1;
  }
  if (imgfilename == "blueccwdull") {
    document.getElementById("rotationbutton").src = "images/bluecwdull.svg";
    rotstatus = 1;
  }
}

function tabchangeb() {
  //imgfilename = imgfilename.substring(imgfilename.lastIndexOf('/') + 1, imgfilename.lastIndexOf('.'));

  tabchanges--;
  if (tabchanges < 0) tabchanges = 0;
}

function tabchangef() {
  // Check if the function is called

  // Increment tabchanges variable (assuming it's global)
  tabchanges++;
  if (tabchanges > 2) tabchanges = 2;

  // Check the value of tabchanges
}

function tabchange() {
  if (tabchanges >= 2) {
    tabchanges = 2;
    document.getElementById("tabchangeforward").src = "images/bluebkwdulls.svg";
  } else {
    document.getElementById("tabchangeforward").src = "images/bluebkwdulls.svg";
  }

  if (tabchanges <= 0) {
    tabchanges = 0;
    document.getElementById("tabchangebackward").src = "images/bluebkdulls.svg";
  } else {
    document.getElementById("tabchangebackward").src = "images/bluebkdulls.svg";
  }
}

//Initialise system parameters here
function varinit() {
  varchange();
  //Variable m1 slider and number input types
  $("#m1spinner").spinner("value", 30);
  $("#m1slider").slider("value", 30);
  //Variable m2 slider and number input types
  $("#m2spinner").spinner("value", 30);
  $("#m2slider").slider("value", 30);
  //Variable r1 slider and number input types
  $("#r1spinner").spinner("value", 12.5);
  $("#r1slider").slider("value", 12.5);
  //Variable r2 slider and number input types
  $("#r2spinner").spinner("value", 20);
  $("#r2slider").slider("value", 20);
  //Variable theta1 slider and number input types
  $("#theta1spinner").spinner("value", 360);
  $("#theta1slider").slider("value", 360);
  //Variable l1 slider and number input types
  $("#l1spinner").spinner("value", -60);
  $("#l1slider").slider("value", -60);
  //Variable ra slider and number input types
  $("#raspinner").spinner("value", 10);
  $("#raslider").slider("value", 10);
  //Variable la slider and number input types
  $("#laspinner").spinner("value", -120);
  $("#laslider").slider("value", -120);
  //Variable rb slider and number input types
  $("#rbspinner").spinner("value", 15);
  $("#rbslider").slider("value", 15);
  //Variable lb slider and number input types
  $("#lbspinner").spinner("value", 60);
  $("#lbslider").slider("value", 60);
  $("#thetabspinner").spinner("value", 360);
}

function varchange() {
  //Variable m1 slider and number input types
  $("#m1spinner").spinner({ max: 30, min: 1, step: 1 }); // number initialisation : jQuery widget
  $("#m1slider").slider({ max: 30, min: 1, step: 1 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  $("#m1slider").on("slide", function (e, ui) {
    $("#m1spinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#m1spinner").on("spin", function (e, ui) {
    $("#m1slider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#m1spinner").on("change", function () {
    varchange();
  });

  //Variable m2 slider and number input types
  $("#m2spinner").spinner({ max: 30, min: 1, step: 1 }); // number initialisation : jQuery widget
  $("#m2slider").slider({ max: 30, min: 1, step: 1 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  $("#m2slider").on("slide", function (e, ui) {
    $("#m2spinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#m2spinner").on("spin", function (e, ui) {
    $("#m2slider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#m2spinner").on("change", function () {
    varchange();
  });

  //Variable r1 slider and number input types
  $("#r1spinner").spinner({ max: 30, min: 0, step: 1 }); // number initialisation : jQuery widget
  $("#r1slider").slider({ max: 30, min: 0, step: 1 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  $("#r1slider").on("slide", function (e, ui) {
    $("#r1spinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#r1spinner").on("spin", function (e, ui) {
    $("#r1slider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#r1spinner").on("change", function () {
    varchange();
  });

  //Variable r2 slider and number input types
  $("#r2spinner").spinner({ max: 30, min: 0, step: 1 }); // number initialisation : jQuery widget
  $("#r2slider").slider({ max: 30, min: 0, step: 1 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  $("#r2slider").on("slide", function (e, ui) {
    $("#r2spinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#r2spinner").on("spin", function (e, ui) {
    $("#r2slider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#r2spinner").on("change", function () {
    varchange();
  });

  //Variable l1 slider and number input types
  $("#l1spinner").spinner({ max: 75, min: -130, step: 1 }); // number initialisation : jQuery widget
  $("#l1slider").slider({ max: 75, min: -130, step: 1 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  $("#l1slider").on("slide", function (e, ui) {
    $("#l1spinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#l1spinner").on("spin", function (e, ui) {
    $("#l1slider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#l1spinner").on("change", function () {
    varchange();
  });

  //Variable theta1 slider and number input types
  $("#theta1spinner").spinner({ max: 360, min: 0, step: 1 }); // number initialisation : jQuery widget
  $("#theta1slider").slider({ max: 360, min: 0, step: 1 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  $("#theta1slider").on("slide", function (e, ui) {
    $("#theta1spinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#theta1spinner").on("spin", function (e, ui) {
    $("#theta1slider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#theta1spinner").on("change", function () {
    varchange();
  });

  //Variable ra slider and number input types
  $("#raspinner").spinner({ max: 32, min: 0, step: 1 }); // number initialisation : jQuery widget
  $("#raslider").slider({ max: 32, min: 0, step: 1 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  $("#raslider").on("slide", function (e, ui) {
    $("#raspinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#raspinner").on("spin", function (e, ui) {
    $("#raslider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#raspinner").on("change", function () {
    varchange();
  });

  //Variable la slider and number input types
  $("#laspinner").spinner({ max: 80, min: -130, step: 1 }); // number initialisation : jQuery widget
  $("#laslider").slider({ max: 80, min: -130, step: 1 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  $("#laslider").on("slide", function (e, ui) {
    $("#laspinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#laspinner").on("spin", function (e, ui) {
    $("#laslider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#laspinner").on("change", function () {
    varchange();
  });

  //Variable rb slider and number input types
  $("#rbspinner").spinner({ max: 32, min: 0, step: 1 }); // number initialisation : jQuery widget
  $("#rbslider").slider({ max: 32, min: 0, step: 1 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  $("#rbslider").on("slide", function (e, ui) {
    $("#rbspinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#rbspinner").on("spin", function (e, ui) {
    $("#rbslider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#rbspinner").on("change", function () {
    varchange();
  });

  //Variable lb slider and number input types
  $("#lbspinner").spinner({ max: 80, min: -130, step: 1 }); // number initialisation : jQuery widget
  $("#lbslider").slider({ max: 80, min: -130, step: 1 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  $("#lbslider").on("slide", function (e, ui) {
    $("#lbspinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#lbspinner").on("spin", function (e, ui) {
    $("#lbslider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#lbspinner").on("change", function () {
    varchange();
  });

  //Variable ma slider and number input types
  $("#maspinner").spinner({ step: 0.1 }); // number initialisation : jQuery widget
  $("#maslider").slider({ step: 0.1 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  $("#maslider").on("slide", function (e, ui) {
    $("#maspinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#maspinner").on("spin", function (e, ui) {
    $("#maslider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#maspinner").on("change", function () {
    varchange();
  });

  //Variable thetaa slider and number input types
  $("#thetaaspinner").spinner({ max: 360, min: 0, step: 1 }); // number initialisation : jQuery widget
  $("#thetaaslider").slider({ max: 360, min: 0, step: 1 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  $("#thetaaslider").on("slide", function (e, ui) {
    $("#thetaaspinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#thetaaspinner").on("spin", function (e, ui) {
    $("#thetaaslider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#thetaaspinner").on("change", function () {
    varchange();
  });

  //Variable mb slider and number input types
  $("#mbspinner").spinner({ step: 0.1 }); // number initialisation : jQuery widget
  $("#mbslider").slider({ step: 0.1 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  $("#mbslider").on("slide", function (e, ui) {
    $("#mbspinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#mbspinner").on("spin", function (e, ui) {
    $("#mbslider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#mbspinner").on("change", function () {
    varchange();
  });

  //Variable thetab slider and number input types
  $("#thetabspinner").spinner({ max: 360, min: 0, step: 1 }); // number initialisation : jQuery widget
  $("#thetabslider").slider({ max: 360, min: 0, step: 1 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  $("#thetabslider").on("slide", function (e, ui) {
    $("#thetabspinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#thetabspinner").on("spin", function (e, ui) {
    $("#thetabslider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#thatabspinner").on("change", function () {
    varchange();
  });
}

// function deg(degrees) {
//   return degrees * Math.PI / 180;
// }

function varupdate() {
  m1 = $("#m1spinner").spinner("value");
  m2 = $("#m2spinner").spinner("value");
  theta1 = $("#theta1spinner").spinner("value");
  if (simstatus) {
    if (flag == 0) {
      jj = 1;
      theta = 0;
      ptx = [];
      pty = [];
      ptxdot = [];
      ptxddot = [];
      ptxdddot = [];
      j = 20;
      ptx.push(30);
      ptxdot.push(270);
      ptxddot.push(270 - ptx);
      pty.push(300);
      omega2 =
        (omega * Math.cos(rad(beta))) /
        (1 -
          Math.pow(Math.sin(rad(beta)), 2) * Math.pow(Math.cos(rad(theta)), 2));
      ptxdddot.push(150 - 50 * (omega2 - omega));
    }
    flag = 1;
  }
  $("#r2spinner").spinner("enable");
  $("#r1spinner").spinner("enable");
  r1 = $("#r1spinner").spinner("value");
  r2 = $("#r2spinner").spinner("value");
  l1 = $("#l1spinner").spinner("value");
  theta = theta + rotstatus * 0.1 * deg(omega);
  theta = theta % 360;
  if (theta < 0) theta += 360;

  tabchange();

  if (tabchanges == 0) {
    $("#mass1").show();
    $("#mass2").show();
    $("#radius1").show();
    $("#radius2").show();
    $("#tt1").show();
    $("#len1").show();
    $("#radiusa").hide();
    $("#lena").hide();
    $("#radiusb").hide();
    $("#lenb").hide();
    $("#massa").hide();
    $("#tta").hide();
    $("#massb").hide();
    $("#ttb").hide();
    $("#resultdata").hide();
  }

  if (tabchanges == 1) {
    $("#mass1").hide();
    $("#mass2").hide();
    $("#radius1").hide();
    $("#radius2").hide();
    $("#tt1").hide();
    $("#len1").hide();
    $("#radiusa").show();
    $("#lena").show();
    $("#radiusb").show();
    $("#lenb").show();
    $("#massa").hide();
    $("#tta").hide();
    $("#massb").hide();
    $("#ttb").hide();
    $("#resultdata").hide();
  }
  if (tabchanges == 2) {
    $("#mass1").hide();
    $("#mass2").hide();
    $("#radius1").hide();
    $("#radius2").hide();
    $("#tt1").hide();
    $("#len1").hide();
    $("#radiusa").hide();
    $("#lena").hide();
    $("#radiusb").hide();
    $("#lenb").hide();
    $("#massa").show();
    $("#tta").show();
    $("#massb").show();
    $("#ttb").show();
    $("#resultdata").show();
  }

  $("#r1spinner").spinner("enable");
  $("#r2spinner").spinner("enable");
  ra = $("#raspinner").spinner("value");
  la = $("#laspinner").spinner("value");
  rb = $("#rbspinner").spinner("value");
  lb = $("#lbspinner").spinner("value");

  ma = $("#maspinner").spinner("value");
  tha = $("#thetaaspinner").spinner("value");
  mb = $("#mbspinner").spinner("value");
  thb = $("#thetabspinner").spinner("value");

  thetab =
    180 +
    deg(
      Math.atan(
        (m2 * r2 * la * Math.sin(rad(theta1))) /
          (m1 * r1 * la + m2 * r2 * la * Math.cos(rad(theta1)) - m1 * r1 * l1)
      )
    );
  Bb =
    (m1 * r1 * la + m2 * r2 * la * Math.cos(rad(theta1)) - m1 * r1 * l1) /
    (rb * Math.cos(rad(thetab)) * (lb - la));
  thetaa =
    180 +
    deg(
      Math.atan(
        (Bb * rb * lb * Math.sin(rad(thetab))) /
          (Bb * rb * lb * Math.cos(rad(thetab)) + m1 * r1 * l1)
      )
    );
  Ba =
    (-Bb * rb * lb * Math.sin(rad(thetab))) / (ra * la * Math.sin(rad(thetaa)));

  o.xcoord = 0;
  o.ycoord = 0;
  a.xcoord = 4 * r1 * Math.cos(rad(theta));
  a.ycoord = 4 * r1 * Math.sin(rad(theta));
  b.xcoord = 4 * r2 * Math.cos(rad(theta + theta1));
  b.ycoord = 4 * r2 * Math.sin(rad(theta + theta1));
  c.xcoord = 4 * ra * Math.cos(rad(theta + tha));
  c.ycoord = 4 * ra * Math.sin(rad(theta + tha));
  d.xcoord = 4 * rb * Math.cos(rad(theta + thb));
  d.ycoord = 4 * rb * Math.sin(rad(theta + thb));

  z.xcoord = -20;
  z.ycoord = 0;
  w.xcoord = 220;
  w.ycoord = 0;
  u.xcoord = 130;
  u.ycoord = 0;
  t.xcoord = u.xcoord + l1;
  t.ycoord = 0;
  s.xcoord = u.xcoord + la;
  s.ycoord = 0;
  v.xcoord = u.xcoord + lb;
  v.ycoord = 0;
  a1.xcoord = u.xcoord + l1;
  a1.ycoord = 4 * r1 * Math.sin(rad(theta));
  b1.xcoord = 130;
  b1.ycoord = 4 * r2 * Math.sin(rad(theta + theta1));
  c1.xcoord = u.xcoord + la;
  c1.ycoord = 4 * ra * Math.sin(rad(theta + tha));
  d1.xcoord = u.xcoord + lb;
  d1.ycoord = 4 * rb * Math.sin(rad(theta + thb));

  //  display();
  draw();
}

function display() {
  var iput1 = document.getElementById("maspinner").value;
  var iput2 = document.getElementById("mbspinner").value;
  if (iput1.trim() == "" && iput2.trim() == "") {
    document.getElementById("commentboxleft1").style.display = "block"; // Make the comment box visible
    // document.getElementById('commentboxcorrect').style.display = 'block';
    // document.getElementById('commentboxright').style.display = 'block';

    printcomment("Please enter value to the masses.", 3);
  } else {
    // document.getElementById('commentboxleft').style.display = 'block'; // Make the comment box visible
    //   document.getElementById('commentboxcorrect').style.display = 'block';
    //   document.getElementById('commentboxright').style.display = 'block';
    printcomment(
      "Balancing Mass B: " +
        roundd(Bb, 2) +
        " kg<br>Position of Balancing Mass B: " +
        roundd(thetab, 1) +
        " deg",
      2
    );
    printcomment(
      "Balancing Mass A: " +
        roundd(Ba, 2) +
        " kg<br>Position of Balancing Mass A: " +
        roundd(thetaa, 1) +
        " deg",
      1
    );
    if (submitbut) submitbut = 0;
    if (!submitbut) submitbut = 1;
  }
}

function printcomment(commenttext, commentloc) {
  if (commentloc == 0) {
    document.getElementById("commentboxright").style.display = "none";
    document.getElementById("commentboxleft").innerHTML = commenttext;
  } else if (commentloc == 1) {
    document.getElementById("commentboxright").style.display = "block";
    document.getElementById("commentboxleft").style.display = "block";
    document.getElementById("commentboxcorrect").style.display = "block";
    document.getElementById("commentboxleft").innerHTML = commenttext;
    document.getElementById("commentboxleft1").style.display = "none";
    document.getElementById("commentboxleft").innerHTML = commenttext;
    document.getElementById("commentboxcorrect").innerHTML =
      "Correct Answer is:";
  } else if (commentloc == 2) {
    document.getElementById("commentboxright").style.display = "block";
    document.getElementById("commentboxleft").style.display = "block";
    document.getElementById("commentboxcorrect").style.display = "block";
    // document.getElementById("commentboxright").style.width = "280px";
    document.getElementById("commentboxleft1").style.display = "none";
    document.getElementById("commentboxright").innerHTML = commenttext;
    document.getElementById("commentboxcorrect").innerHTML =
      "Correct Answer is:";
  } else if (commentloc == 3) {
    document.getElementById("commentboxright").style.display = "none";
    document.getElementById("commentboxleft").style.display = "none";
    document.getElementById("commentboxleft1").style.display = "block";
    document.getElementById("commentboxleft1").innerHTML =
      "Please enter value to the masses.";
    // ignore use of deprecated tag <center> . Code is executed only if printcomment function receives inappropriate commentloc value
  }
}

function draw() {

  ctx.clearRect(0, 0, 550, 400);
  var imgfilename = document.getElementById("referenceplane").src;
  imgfilename = imgfilename.substring(
    imgfilename.lastIndexOf("/") + 1,
    imgfilename.lastIndexOf(".")
  );
  document.getElementById("referenceplane").src = "images/Reference.png";

  pointtrans(o, trans);
  pointtrans(a, trans);
  pointtrans(b, trans);

  pointtrans(z, trans1);
  pointtrans(w, trans1);
  pointtrans(s, trans1);
  pointtrans(t, trans1);
  pointtrans(u, trans1);
  pointtrans(v, trans1);
  pointtrans(a1, trans1);
  pointtrans(b1, trans1);
  pointtrans(c1, trans1);
  pointtrans(d1, trans1);

  var o1 = new point(0, 0, "o");
  o1.xcoord = o.xcoord;
  o1.ycoord = o.ycoord + 7.5;
  drawrect(o1, 10, 15, 0, ctx, "#CC9933", "#CC9933", 1);

  var z1 = new point(0, 0, "z");
  z1.xcoord = z.xcoord;
  z1.ycoord = z.ycoord + 7.5;
  drawrect(z1, 10, 15, 0, ctx, "#CC9933", "#CC9933", 1);

  var w1 = new point(0, 0, "w");
  w1.xcoord = w.xcoord;
  w1.ycoord = w.ycoord + 7.5;
  drawrect(w1, 10, 15, 0, ctx, "#CC9933", "#CC9933", 1);

  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#666666";
  ctx.moveTo(30, o.ycoord + 15);
  ctx.lineTo(530, o.ycoord + 15);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "black";
  // ctx.setLineDash([5, 3]);
  ctx.moveTo(o.xcoord - 100, o.ycoord);
  ctx.lineTo(o.xcoord + 100, o.ycoord);
  ctx.stroke();

  ctx.closePath();

  if (ma > 0) {
    pointtrans(c, trans);
    pointjoin(o, c, ctx, "#008000", 5); //green//leftside A,B
    pointdisp(c, ctx, 10, "#000000", "#660000", "", "", "");
    pointjoin(s, c1, ctx, "#008000", 5); //green//leftside A,B
    pointdisp(c1, ctx, 10, "#000000", "#660000", "", "", "");
  }

  if (mb > 0) {
    pointtrans(d, trans);
    pointjoin(o, d, ctx, "#008000", 5); //green//rightside A,B
    pointdisp(d, ctx, 10, "#000000", "#660000", "", "", "");
    pointjoin(v, d1, ctx, "#008000", 5); //green//rightside A,B
    pointdisp(d1, ctx, 10, "#000000", "#660000", "", "", "");
  }

  pointjoin(o, a, ctx, "#AC1989", 5); //left side//purple
  pointjoin(o, b, ctx, "#AC1989", 5);

  //pointdisp(k,ctx,0,"#000000","#660000",'','','');

  pointdisp(o, ctx, 6, "#000000", "#003366", "", "", "");
  pointdisp(a, ctx, 10, "#000000", "#003366", "", "", "");
  pointdisp(b, ctx, 10, "#000000", "#003366", "", "", "");

  pointjoin(z, w, ctx, "#003366", 7);
  pointjoin(u, b1, ctx, "#AC1989", 5); //right side 1,2 //purple
  pointjoin(t, a1, ctx, "#AC1989", 5); //right side 1,2//purple

  pointdisp(b1, ctx, 10, "#000000", "#003366", "", "", "");
  pointdisp(a1, ctx, 10, "#000000", "#003366", "", "", "");
}

function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : event.keyCode;
  if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}


function drawrem(context) {
  if (theta1 % 360 <= 180) offset = -45;
  else offset = 20;

  //To draw Angle
  var PI2 = Math.PI * 2;
  var corners = [];
  var corners1 = [];
  var corners2 = [];
  var corners3 = [];
  var corners4 = [];
  corners.push({
    x: a.xcoord,
    y: a.ycoord,
  });
  corners.push({
    x: o.xcoord,
    y: o.ycoord,
  });
  corners.push({
    x: b.xcoord,
    y: b.ycoord,
  });

  corners1.push({
    x: b.xcoord,
    y: b.ycoord,
  });
  corners1.push({
    x: o.xcoord,
    y: o.ycoord,
  });
  corners1.push({
    x: o.xcoord,
    y: o.ycoord,
  });

  corners2.push({
    x: a.xcoord,
    y: a.ycoord,
  });
  corners2.push({
    x: o.xcoord,
    y: o.ycoord,
  });
  corners2.push({
    x: o.xcoord,
    y: o.ycoord,
  });

  corners3.push({
    x: a.xcoord,
    y: a.ycoord,
  });
  corners3.push({
    x: o.xcoord,
    y: o.ycoord,
  });
  corners3.push({
    x: c.xcoord,
    y: c.ycoord,
  });

  corners4.push({
    x: a.xcoord,
    y: a.ycoord,
  });
  corners4.push({
    x: o.xcoord,
    y: o.ycoord,
  });
  corners4.push({
    x: d.xcoord,
    y: d.ycoord,
  });

  var rectStrokeStyle = "black";

  //  between a and b
  for (var i = 0; i < corners.length - 2; i++) {
    drawAngleSymbol(
      corners[i],
      corners[i + 1],
      corners[i + 2],
      "red",
      10,
      rtst,
      280,
      100
    );
  }

  //  between o and a
  for (var i = 0; i < corners2.length - 2; i++) {
    drawAngleSymbol(
      corners2[i + 1],
      corners2[i + 1],
      corners2[i],
      "green",
      20,
      rtst,
      280,
      120
    );
  }

  //  between o and b
  for (var i = 0; i < corners1.length - 2; i++) {
    drawAngleSymbol(
      corners1[i + 1],
      corners1[i + 1],
      corners1[i],
      "blue",
      30,
      rtst,
      280,
      140
    );
  }
  if (ma > 0) {
    //  between a and c
    for (var i = 0; i < corners3.length - 2; i++) {
      drawAngleSymbol(
        corners3[i],
        corners3[i + 1],
        corners3[i + 2],
        "orange",
        40,
        rtst,
        280,
        160
      );
    }
  }
  if (mb > 0) {
    //  between a and c
    for (var i = 0; i < corners4.length - 2; i++) {
      drawAngleSymbol(
        corners4[i],
        corners4[i + 1],
        corners4[i + 2],
        "brown",
        50,
        rtst,
        280,
        180
      );
    }
  }
}

function isNumberKeyla(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode == 45 || (charCode >= 48 && charCode <= 57)) {
    return true;
  } else {
    return false;
  }
}

function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode;
  if ((charCode >= 48 && charCode <= 57) || charCode == 8 || charCode == 46) {
    return true;
  } else {
    return false;
  }
}

function validateDecimal(el) {
  var ex = /^[0-9]+\.?[0-9]*$/;
  if (!ex.test(el.value)) {
    el.value = el.value.substring(0, el.value.length - 1);
  }
}
