






var drawSpace = function(){	
	var h = window.innerHeight;
	var w = window.innerWidth;
	var data = d3.range(350);
	var count = 0;

	var svg = d3.select('.space').append('svg')
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


var drawEarth = function(){
	var svg = d3.select('svg');
	var earth = svg.selectAll('.earth').data([1]);

	earth.enter()
		.append("circle")
		.attr("cx", 150)
		.attr("cy", 450)
		.attr("r", 50)
		.style("fill", 'blue');

	earth.exit()
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

	earth.exit()
		.remove("circle");
}()