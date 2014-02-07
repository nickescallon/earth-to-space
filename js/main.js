






var drawSpace = function(){	
	var h = window.innerHeight;
	var w = window.innerWidth;
	var data = d3.range(350);
	var count = 0;

	var svg = d3.select('.space').append('svg')
		.attr('xmlns','http://www.w3.org/2000/svg xmlns:xhtml=http://www.w3.org/1999/xhtml')
    //.attr('xmlns:xhtml','http://www.w3.org/1999/xhtml')
		.attr('height', h)
		.attr('width', w);

	var stars = svg.selectAll('.stars').data(data);

	stars.enter()
		.append("circle")
		.attr("cx", function(d){ return Math.floor(Math.random()*w)})
	  .attr("cy", function(d){ return Math.floor(Math.random()*h)})
	  .attr("r", function(d){ return Math.floor(Math.random()*3)})
	  .style("fill", 'white');

	stars.exit()
		.remove("circle");
}()

var drawMoon = function(){
	var svg = d3.select('svg');
	var moon = svg.selectAll('.earth').data([1]);

	moon.enter()
		.append("circle")
		.attr("cx", 250)
		.attr("cy", 400)
		.attr("r", 12)
		.style("fill", 'grey');

	moon.exit()
		.remove("circle");
}()

var width = 240,
    height = 180,
    origin = [71, -42],
    velocity = [.010, -.002],
    t0 = Date.now();

var sphere = {type: "Sphere"};

var projection = d3.geo.orthographic()
    .scale(height / 2.1)
    .translate([width / 2, height / 2])
    .clipAngle(90)
    .precision(.5);

var canvas = d3.select("body").append("canvas")
		.attr("class", "globe")
    .attr("width", width)
    .attr("height", height);

var context = canvas.node().getContext("2d");

var path = d3.geo.path()
    .projection(projection)
    .context(context);

d3.json("http://127.0.0.1:8080/", function(error, topo) {
  var land = topojson.feature(topo, topo.objects.land);

  d3.timer(function() {
    var dt = Date.now() - t0;
    projection.rotate([velocity[0] * dt + origin[0], 0]);

    context.clearRect(0, 0, width, height);

    context.beginPath();
    path(sphere);
    context.lineWidth = 1;
    context.strokeStyle = "blue";
    context.stroke()
    context.fillStyle = "blue";
		context.fill();
    

    context.beginPath();
    path(land);
    context.lineWidth = 1;
    context.strokeStyle = "green";
    context.stroke()
    context.fillStyle = "green";
		context.fill();
  });
});






