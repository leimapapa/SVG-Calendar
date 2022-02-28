// output an SVG calendar into whichever element we pass in
const svgCalendar = (el) => {
	if (!el) {
		console.error('Tell us where to put the calendar!');
		return;
	}
	const DAYS = [
		"sunday",
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday"
	];
	const MONTHS = [
		"january",
		"february",
		"march",
		"april",
		"may",
		"june",
		"july",
		"august",
		"september",
		"october",
		"november",
		"december"
	];

	let today = new Date();
	let month = today.getMonth();
	let dayOfMonth = today.getDate();
	let year = today.getFullYear();
	let firstDayOfMonth = new Date(
		today.getFullYear(),
		today.getMonth(),
		1
	).getDay();
	let daysInMonth = new Date(
		today.getFullYear(),
		today.getMonth() + 1,
		0
	).getDate();

	let weekIndex = [0, 1, 2, 3, 4, 5, 6];
	let daysToColorFirst = weekIndex.filter((x) => {
		return x >= firstDayOfMonth;
	});

	let numOfDays = daysInMonth - daysToColorFirst.length;

	let dayFill = "rgba(0,0,0,0.3)";
	let dayStroke = "rgba(255,255,255,0.1)";

	//create svg container
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttributeNS(
		"http://www.w3.org/2000/xmlns/",
		"xmlns:xlink",
		"http://www.w3.org/1999/xlink"
	);
	svg.setAttribute("viewBox", "0 0 140 140");

	//month container
	let rectBG = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	rectBG.classList.add("monthContainer");
	//is rect today?
	let rectBGAttrs = {
		x: 0,
		y: 20,
		height: 120,
		width: 140,
		fill: "none",
		stroke: "none",
		"stroke-width": 1
	};
	for (let key in rectBGAttrs) {
		rectBG.setAttribute(key, rectBGAttrs[key]);
	}
	svg.appendChild(rectBG);

	//loop through the days
	for (let i = 0; i < weekIndex.length; i++) {
		if (daysToColorFirst.includes(i)) {
			const dayOfMonthDisplay = i + daysToColorFirst.length - 6;

			let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			rect.classList.add("day");
			rect.classList.add(DAYS[i]);
			//is rect today?
			if (i - 1 == dayOfMonth) {
				dayFill = "rgba(255,255,255,0.2)";
				rect.classList.add("today");
			} else {
				dayFill = "rgba(0,0,0,0.3)";
			}
			let rectAttrs = {
				x: i * 20,
				y: 20,
				height: 20,
				width: 20,
				fill: dayFill,
				stroke: dayStroke,
				"stroke-width": 1
			};
			for (let key in rectAttrs) {
				rect.setAttribute(key, rectAttrs[key]);
			}
			//title of each rect
			let title = document.createElementNS("http://www.w3.org/2000/svg", "title");
			title.textContent = `${
				DAYS[i].charAt(0).toUpperCase() + DAYS[i].slice(1)
			}, ${
				MONTHS[month].charAt(0).toUpperCase() + MONTHS[month].slice(1)
			} ${dayOfMonthDisplay}, ${year}`;
			rect.appendChild(title);
			//text of each rect
			let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
			text.textContent = dayOfMonthDisplay;
			let textAttrs = {
				x: i * 20 + 10,
				y: 30,
				"dominant-baseline": "middle",
				fill: "#fff",
				"font-family": "monospace",
				"font-size": 5,
				"text-anchor": "middle",
				"pointer-events": "none",
				"user-select": "none"
			};
			for (let key in textAttrs) {
				text.setAttribute(key, textAttrs[key]);
			}
			svg.appendChild(rect);
			svg.appendChild(text);
		}
	}

	for (let i = 0; i < numOfDays; i++) {
		let yPos;
		if (i <= 6) {
			yPos = 40;
		} else if (i > 6 && i <= 13) {
			yPos = 60;
		} else if (i > 13 && i <= 20) {
			yPos = 80;
		} else if (i > 20 && i <= 27) {
			yPos = 100;
		} else if (i > 27 && i <= 34) {
			yPos = 120;
		}

		//rect for each day
		let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		rect.classList.add("day");
		rect.classList.add(DAYS[i % 7]);
		//is rect today?
		const dayOfMonthDisplay = i + daysInMonth - (numOfDays - 1);
		if (dayOfMonthDisplay == dayOfMonth) {
			dayFill = "rgba(255,255,255,0.2)";
			rect.classList.add("today");
		} else {
			dayFill = "rgba(0,0,0,0.3)";
		}

		let rectAttrs = {
			x: (i % 7) * 20,
			y: yPos,
			height: 20,
			width: 20,
			fill: dayFill,
			stroke: dayStroke,
			"stroke-width": 1
		};
		for (let key in rectAttrs) {
			rect.setAttribute(key, rectAttrs[key]);
		}
		//title of each day rect
		let title = document.createElementNS("http://www.w3.org/2000/svg", "title");
		title.textContent = `${
			DAYS[i % 7].charAt(0).toUpperCase() + DAYS[i % 7].slice(1)
		}, ${
			MONTHS[month].charAt(0).toUpperCase() + MONTHS[month].slice(1)
		} ${dayOfMonthDisplay}, ${year}`;
		rect.appendChild(title);
		//text of each day rect
		let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text.textContent = dayOfMonthDisplay;
		let textAttrs = {
			x: (i % 7) * 20 + 10,
			y: yPos + 10,
			"dominant-baseline": "middle",
			fill: "#fff",
			"font-family": "monospace",
			"font-size": 5,
			"text-anchor": "middle",
			"pointer-events": "none",
			"user-select": "none"
		};
		for (let key in textAttrs) {
			text.setAttribute(key, textAttrs[key]);
		}
		svg.appendChild(rect);
		svg.appendChild(text);
	}
	//month
	const monthDisplay = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"text"
	);
	monthDisplay.textContent = `${
		MONTHS[month].charAt(0).toUpperCase() + MONTHS[month].slice(1)
	}`;
	monthDisplay.classList.add("month");
	monthDisplay.classList.add(MONTHS[month]);
	let monthTextAttrs = {
		x: "50%",
		y: 10,
		"dominant-baseline": "middle",
		fill: "#fff",
		"font-family": "monospace",
		"font-size": 10,
		"text-anchor": "middle",
		"pointer-events": "none",
		"user-select": "none"
	};
	for (let key in monthTextAttrs) {
		monthDisplay.setAttribute(key, monthTextAttrs[key]);
	}
	svg.appendChild(monthDisplay);

	//year
	const yearDisplay = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"text"
	);
	yearDisplay.textContent = year;
	yearDisplay.classList.add("year");
	let yearTextAttrs = {
		x: 128,
		y: 10,
		"dominant-baseline": "middle",
		fill: "#fff",
		"font-family": "Roboto Condensed",
		"font-size": 6,
		"text-anchor": "middle",
		"pointer-events": "none",
		"user-select": "none"
	};
	for (let key in yearTextAttrs) {
		yearDisplay.setAttribute(key, yearTextAttrs[key]);
	}
	svg.appendChild(yearDisplay);
	el.appendChild(svg);
};
