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