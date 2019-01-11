/*---- placeholder1----*/
$(function(e) {
	var d1 = [];
	for (var i = 0; i <= 60; i += 1) {
		d1.push([i, parseInt(Math.random() * 30 - 10)]);
	}

	function plotWithOptions(t) {
		$.plot("#placeholder01", [{
			data: d1,
			color: "#ad59ff",
			threshold: {
				below: t,
				color: "#ad59ff "
			},
			lines: {
				steps: true
			},

		}]);
	}
	plotWithOptions(0);
	$(document).on("click", ".controls button", function(e) {
		e.preventDefault();
		var t = parseFloat($(this).text().replace("Threshold at ", ""));
		plotWithOptions(t);
	});
	// Add the Flot version string to the footer
});
$(function(e) {
	var data = [],
		totalPoints = 300;

	function getRandomData() {
		if (data.length > 0) data = data.slice(1);
		while (data.length < totalPoints) {
			var prev = data.length > 0 ? data[data.length - 1] : 50,
				y = prev + Math.random() * 10 - 5;
			if (y < 0) {
				y = 0;
			} else if (y > 100) {
				y = 100;
			}
			data.push(y);
		}
		var res = [];
		for (var i = 0; i < data.length; ++i) {
			res.push([i, data[i]])
		}
		return res;
	}
	// Set up the control widget
	var updateInterval = 30;
	$("#updateInterval").val(updateInterval).change(function() {
		var v = $(this).val();
		if (v && !isNaN(+v)) {
			updateInterval = +v;
			if (updateInterval < 1) {
				updateInterval = 1;
			} else if (updateInterval > 2000) {
				updateInterval = 2000;
			}
			$(this).val("" + updateInterval);
		}
	});
	var plot = $.plot("#placeholder02", [getRandomData()], {
		series: {
			shadowSize: 0,
			color: "#ad59ff "
		},
		yaxis: {
			min: 0,
			max: 100
		},
		xaxis: {
			show: false
		},
	});

	function update() {
		plot.setData([getRandomData()]);
		plot.draw();
		setTimeout(update, updateInterval);
	}
	update();
});
$(function(e) {
	var d1 = [];
	for (var i = 0; i < 20; ++i) {
		d1.push([i, Math.sin(i)]);
	}
	var data = [{
		data: d1,
		label: "Pressure",
		color: "#ad59ff"
	}];
	var markings = [{
		color: "transparent",
		yaxis: {
			from: 1
		}
	}, {
		color: "transparent",
		yaxis: {
			to: -1
		}
	}, {
		color: "transparent",
		lineWidth: 1,
		xaxis: {
			from: 2,
			to: 2
		}
	}, {
		color: "#1eb1fe",
		lineWidth: 1,
		xaxis: {
			from: 8,
			to: 8
		}
	}];
	var placeholder = $("#placeholder03");
	var plot = $.plot(placeholder, data, {
		bars: {
			show: true,
			barWidth: 0.5,
			fill: 0.9
		},
		xaxis: {
			ticks: [],
			autoscaleMargin: 0.02
		},
		yaxis: {
			min: -2,
			max: 2
		},
		grid: {
			markings: markings
		}
	});
	var o = plot.pointOffset({
		x: 2,
		y: -1.2
	});
	// Append it to the placeholder that Flot already uses for positioning
	placeholder.append("<div style='position:absolute;left:" + (o.left + 4) + "px;top:" + o.top + "px;color:rgba(255,255,255,0.5);font-size:smaller'>Warming up</div>");
	o = plot.pointOffset({
		x: 8,
		y: -1.2
	});
	placeholder.append("<div style='position:absolute;left:" + (o.left + 4) + "px;top:" + o.top + "px;color:rgba(255,255,255,0.5);font-size:smaller'>Actual measurements</div>");
	// Draw a little arrow on top of the last label to demonstrate canvas
	// drawing
	var ctx = plot.getCanvas().getContext("2d");
	ctx.beginPath();
	o.left += 4;
	ctx.moveTo(o.left, o.top);
	ctx.lineTo(o.left, o.top - 10);
	ctx.lineTo(o.left + 10, o.top - 5);
	ctx.lineTo(o.left, o.top);
	ctx.fillStyle = "#ad59ff";
	ctx.fill();
});
$(function(e) {
	var d1 = [];
	for (var i = 0; i <= 10; i += 1) {
		d1.push([i, parseInt(Math.random() * 30)]);
	}
	var d2 = [];
	for (var i = 0; i <= 10; i += 1) {
		d2.push([i, parseInt(Math.random() * 30)]);
	}
	var d3 = [];
	for (var i = 0; i <= 10; i += 1) {
		d3.push([i, parseInt(Math.random() * 30)]);
	}
	var stack = 0,
		bars = true,
		lines = false,
		steps = false;

	function plotWithOptions() {
		$.plot("#placeholder04", [d1, d2, d3], {
			series: {
				stack: stack,
				lines: {
					show: lines,
					fill: true,
					steps: steps
				},
				bars: {
					show: bars,
					barWidth: 0.6
				},
			},
			colors: ['#00d9bf ', '#fc0', '#ad59ff'],
		});
	}
	plotWithOptions();
});