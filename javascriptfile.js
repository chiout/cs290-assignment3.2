
var number=5;
var count = 1;
var languageArray = []; // elements are each of the language values from gists objects
var htmlArray = []; // elements are html urls from gists objects
var displayNumber; // counts number of nodes displayed (number of results)
var totalDisplayed;
var python = false; 
var json = false;
var javascript_l = false;
var sql = false;
var searchArray = []; // holds the ids of displayed nodes for search function
var searchArrayText1 = []; // holds the html urls in the same order as they are initially displayed (all strings)
var searchArrayText2 = []; // holds the language values in the same order as they are initially displayed (all strings)
var descripArray = []; // holds the description values of objects
var favDescrip = []; // holds the description values of objects (all strings)
var idArray = []; // holds the ids of all objects
//global variables declared and used in multiple functions


window.onload = function () {
	/*var form = document.getElementById("resultsForm");
	form.onsubmit = setNumber;*/

	var opt1 = document.getElementById("noResults1");
	var opt2 = document.getElementById("noResults2");
	var opt3 = document.getElementById("noResults3");
	var opt4 = document.getElementById("noResults4");
	var opt5 = document.getElementById("noResults5");

	var opt6 = document.getElementById("results1");
	var opt7 = document.getElementById("results2");
	var opt8 = document.getElementById("results3");
	var opt9 = document.getElementById("results4");
	var opt10 = document.getElementById("results5");

	opt1.onclick = setNumber30;
	opt2.onclick = setNumber60;
	opt3.onclick = setNumber90;
	opt4.onclick = setNumber120;
	opt5.onclick = setNumber150;
	opt6.onclick = setLang1;
	opt7.onclick = setLang2;
	opt8.onclick = setLang3;
	opt9.onclick = setLang4;
	opt10.onclick = setLang5;
	/* This was modeled from an example I saw on stackoverflow, specifically lines 6-18 from Tom's post.
	   Basically I referred to every radio button and check list, set it to an onclick event, and then referred it to a function.
		 http://stackoverflow.com/questions/362614/calling-onclick-on-a-radiobutton-list-using-javascript
	*/	 

	function setNumber30 () {
		displayNumber = 30;
		totalDisplayed = displayNumber;
		//console.log(number);
	}

	function setNumber60 () {
		displayNumber = 60;
		totalDisplayed = displayNumber;
		//console.log(number);
	}

	function setNumber90 () {
		displayNumber = 90;
		totalDisplayed = displayNumber;
		//console.log(number);
	}

	function setNumber120 () {
		displayNumber = 120;
		totalDisplayed = displayNumber;
		//console.log(number);
	}

	function setNumber150 () {
		displayNumber = 150;
		totalDisplayed = displayNumber;
		//console.log(number);
	}

	function setLang1 () {
		python = true;
		//console.log(python);
	}

	function setLang2 () {
		json = true;
		//console.log(json);
	}

	function setLang3 () {
		javascript_l = true;
		//console.log(javascript_l);
	}

	function setLang4 () {
		sql = true;
		//console.log(sql);
	}

	function setLang5 () {
		python = false;
		json = false;
		javascript_l = false;
		sql = false;
		displayResults();
		//console.log(sql);
	}

}


function controlGist() {
	for (var i=0; i<number; i++) {
		openGist();
		count = count + 1;
	}

} // Purpose: control Gists calls to make sure each execute fully

function openGist () {

	var url;
	var request = new XMLHttpRequest();
	url = 'https://api.github.com/gists' + '?page=' + count;
	request.onreadystatechange = ifready;
	request.open('GET', url, true);
	request.send();


	function ifready() {
		if (request.readyState === 4 && request.status === 200) {
			var data = JSON.parse(request.responseText);
			getArray(data);
		}
	}
	// got these commands from the examples https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started

function getArray (input) {
	var parent;
	var fileName;
	for (var i=0; i<input.length; i++) {
		htmlArray.push(input[i].html_url);

		parent = input[i].files;
		for (var property in parent) {
			fileName = property;
		}

		for (var cProp in parent[fileName]) {
			if (cProp === "language") {
				languageArray.push(parent[fileName][cProp]);
			}
		}	

		descripArray.push(input[i].description);
		
		idArray.push(input[i].id);
	}

}
}

// getArray pushes the object data into different arrays 
// htmlArray holds all the html urls
// languageArray holds all the language values
// descripArray holds the description values
// idArray holds the id values - figured this could be a good way to identify different entries

function displayResults () {

var dispArea = document.getElementById("results");

while (dispArea.childNodes[0]) {
	dispArea.childNodes[0].removeChild(dispArea.childNodes[0].childNodes[2]);
	dispArea.childNodes[0].removeChild(dispArea.childNodes[0].childNodes[1]);
	dispArea.childNodes[0].removeChild(dispArea.childNodes[0].childNodes[0]);
	dispArea.removeChild(dispArea.childNodes[0]);
}
/* I based this code off a stackoverflow post:
http://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
Gabriel McAdam's Code (modified by Denilson Sa); Option 2, lines 2-3
I use this code multiple times in this program as a means of clearing all the nodes from the div

Not sure if the childNodes method is the best or only way, but I based it on Mark Meyer's text.
Found in the fourth page of Chapter 60 (Kindle version)
(book source explained at the bottom of the script section)
*/

var text;
var langText;

for (var z=0; z<displayNumber; z++) {
	text = String(htmlArray[z]);
	langText = String(languageArray[z]);
	searchArrayText1[z] = text; 
	searchArrayText2[z] = langText; //dunno if necessary
	var newP = document.createElement("p");
	var addText = document.createElement("p");
	addText.innerHTML = '<a href=\"' + text + '">' + text + '</a>         ';
	//var addText = document.createTextNode("<a href=\"" + text + "\">         ");
	var addMoreText = document.createTextNode(langText);
	var addButton = document.createElement("div");
	addButton.innerHTML = '<input type ="button" id='+ idArray[z] + ' value="Add to Favorites" onClick="favorites(this.id);" />';
	newP.appendChild(addText);
	newP.appendChild(addMoreText);
	newP.appendChild(addButton);
	dispArea.appendChild(newP);
	// code extracts information from the arrays and appends them to the div to display results

	descripText = String(descripArray[z]);
	favDescrip[z] = descripText;
}

}

function search () {
// function will narrow search by language
// based on user input, only certain results will show

var displArea = document.getElementById("results");
var languageText;
var w=0;
var c=0;
var htmlText;
var displayCount;
var buttonID;


if (displArea.childNodes[0]) {

	if (python === true) {

		while (w < displayNumber) {
			languageText = displArea.childNodes[w].childNodes[1].nodeValue;
			if (languageText.toLowerCase() === "python") {
				buttonID = displArea.childNodes[w].childNodes[2].childNodes[0].id;
				// http://stackoverflow.com/questions/17428383/get-an-elements-id-and-compare-it-to-a-string-or-another-id
				// didn't copy a stretch of code, but got inspiration about the technique from Darren Davies's code here
				searchArray[c] = buttonID;
				c = c+1;
			}
			w=w+1;
		} // code identifies which results have the correct language
		// it does by comparing the language value (converted to lowercase) to the language name
		// after that it extracts an id associated with the button tag of the result (part of another sibling of the same parent node)

		while (displArea.childNodes[0]) {
			displArea.childNodes[0].removeChild(displArea.childNodes[0].childNodes[2]);
			displArea.childNodes[0].removeChild(displArea.childNodes[0].childNodes[1]);
			displArea.childNodes[0].removeChild(displArea.childNodes[0].childNodes[0]);
			displArea.removeChild(displArea.childNodes[0]);
		}
		// above removes all the existing results on the page

		for (var g=0; g<searchArray.length; g++) {

			for (var h=0; h<idArray.length; h++) {
				if (searchArray[g] === idArray[h]) {		

					var htext = searchArrayText1[h];
					var lText = searchArrayText2[h];
					var newP = document.createElement("p");
					var addText = document.createElement("p");
					addText.innerHTML = '<a href=\"' + htext + '">' + htext + '</a>         ';
					var addMoreText = document.createTextNode(lText);
					var addButton = document.createElement("div");
					addButton.innerHTML = '<input type ="button" id='+ idArray[h] + ' value="Add to Favorites" onClick="favorites(this.id);" />';
					newP.appendChild(addText);
					newP.appendChild(addMoreText);
					newP.appendChild(addButton);
					displArea.appendChild(newP);

					displayCount = displayCount + 1;
				}				

			}

		}
		displayNumber = displayCount;
	} // code will identify which result to display based on the id received from the while loop
	// it will match the id to the idArray and determine its position
	// the url, description, and language values will all be at that position in their corresponding arrays
	// those values are then extracted and appended to the div
	// this method is used for the other language options as well

	if (json === true) {

		while (w < displayNumber) {
			languageText = displArea.childNodes[w].childNodes[1].nodeValue;
			if (languageText.toLowerCase() === "json") {
				buttonID = displArea.childNodes[w].childNodes[2].childNodes[0].id;
				searchArray[c] = buttonID;
				c = c+1;
			}
			w=w+1;
		}

		while (displArea.childNodes[0]) {
			displArea.childNodes[0].removeChild(displArea.childNodes[0].childNodes[2]);
			displArea.childNodes[0].removeChild(displArea.childNodes[0].childNodes[1]);
			displArea.childNodes[0].removeChild(displArea.childNodes[0].childNodes[0]);
			displArea.removeChild(displArea.childNodes[0]);
		}

		for (g=0; g<searchArray.length; g++) {

			for (h=0; h<idArray.length; h++) {
				if (searchArray[g] === idArray[h]) {		

					htext = searchArrayText1[h];
					lText = searchArrayText2[h];
					newP = document.createElement("p");
					addText = document.createElement("p");
					addText.innerHTML = '<a href=\"' + htext + '">' + htext + '</a>         ';
					addMoreText = document.createTextNode(lText);
					addButton = document.createElement("div");
					addButton.innerHTML = '<input type ="button" id='+ idArray[h] + ' value="Add to Favorites" onClick="favorites(this.id);" />';
					newP.appendChild(addText);
					newP.appendChild(addMoreText);
					newP.appendChild(addButton);
					displArea.appendChild(newP);

					displayCount = displayCount + 1;
				}				

			}

		}

		displayNumber = displayCount;

	}

	if (javascript_l === true) {

		while (w < displayNumber) {
			languageText = displArea.childNodes[w].childNodes[1].nodeValue;
			if (languageText.toLowerCase() === "javascript") {
				buttonID = displArea.childNodes[w].childNodes[2].childNodes[0].id;
				searchArray[c] = buttonID;
				c = c+1;
			}
			w=w+1;
		}

		while (displArea.childNodes[0]) {
			displArea.childNodes[0].removeChild(displArea.childNodes[0].childNodes[2]);
			displArea.childNodes[0].removeChild(displArea.childNodes[0].childNodes[1]);
			displArea.childNodes[0].removeChild(displArea.childNodes[0].childNodes[0]);
			displArea.removeChild(displArea.childNodes[0]);
		}

		for (g=0; g<searchArray.length; g++) {

			for (h=0; h<idArray.length; h++) {
				if (searchArray[g] === idArray[h]) {		

					htext = searchArrayText1[h];
					lText = searchArrayText2[h];
					newP = document.createElement("p");
					addText = document.createElement("p");
					addText.innerHTML = '<a href=\"' + htext + '">' + htext + '</a>         ';
					addMoreText = document.createTextNode(lText);
					addButton = document.createElement("div");
					addButton.innerHTML = '<input type ="button" id='+ idArray[h] + ' value="Add to Favorites" onClick="favorites(this.id);" />';
					newP.appendChild(addText);
					newP.appendChild(addMoreText);
					newP.appendChild(addButton);
					displArea.appendChild(newP);

					displayCount = displayCount + 1;
				}				

			}

		}
		displayNumber = displayCount;

	}

	if (sql === true) {

		while (w < displayNumber) {
			languageText = displArea.childNodes[w].childNodes[1].nodeValue;
			if (languageText.toLowerCase() === "sql") {
				buttonID = displArea.childNodes[w].childNodes[2].childNodes[0].id;
				searchArray[c] = buttonID;
				c = c+1;
			}
			w=w+1;
		}

		while (displArea.childNodes[0]) {
			displArea.childNodes[0].removeChild(displArea.childNodes[0].childNodes[2]);
			displArea.childNodes[0].removeChild(displArea.childNodes[0].childNodes[1]);
			displArea.childNodes[0].removeChild(displArea.childNodes[0].childNodes[0]);
			displArea.removeChild(displArea.childNodes[0]);
		}

		for (g=0; g<searchArray.length; g++) {

			for (h=0; h<idArray.length; h++) {
				if (searchArray[g] === idArray[h]) {		

					htext = searchArrayText1[h];
					lText = searchArrayText2[h];
					newP = document.createElement("p");
					addText = document.createElement("p");
					addText.innerHTML = '<a href=\"' + htext + '">' + htext + '</a>         ';
					addMoreText = document.createTextNode(lText);
					addButton = document.createElement("div");
					addButton.innerHTML = '<input type ="button" id='+ idArray[h] + ' value="Add to Favorites" onClick="favorites(this.id);" />';
					newP.appendChild(addText);
					newP.appendChild(addMoreText);
					newP.appendChild(addButton);
					displArea.appendChild(newP);

					displayCount = displayCount + 1;
				}				

			}

		}
		displayNumber = displayCount;

	}

}
}
var favOrder = 0;
var numberDisp = totalDisplayed;

function favorites(id_value) {
// function takes in the favorite button id as a parameter
for (var y=0; y<idArray.length; y++) {
	if (id_value === idArray[y]) {
		var index = y;
	}
}
// similar to the search function, the id is used to identify the position of its corresponding values
// position of its id in idArray is the position in the other arrays that hold the url, language, description

var favDiv = document.getElementById("favorites");

var hLink = '<a href=\"' + searchArrayText1[index] + '">' + searchArrayText1[index] + '</a>         ';
localStorage.setItem('link', hLink);
localStorage.setItem('language', searchArrayText2[index]);
localStorage.setItem('description', favDescrip[index]);
// values are extracted from the arrays and placed in local storage

var newP = document.createElement("p");
var addText = document.createElement("p");
addText.innerHTML = localStorage.getItem('link');
var addMoreText = document.createTextNode(localStorage.getItem('language'));
var gistsdesc = document.createTextNode(":    " + localStorage.getItem('description'));
var addButton = document.createElement("div");
addButton.innerHTML = '<input type ="button" id="id' + id_value + '" value="Remove from Favorites" onClick="removeFav(this.id);" />';
// id values have an added "id" in the front
// this distinguishes it from the entries in the results div
newP.appendChild(addText);
newP.appendChild(addMoreText);
newP.appendChild(gistsdesc);
newP.appendChild(addButton);
favDiv.appendChild(newP);
// local storage values are then appended to the div containing the favorites

favOrder = favOrder + 1;

var favButton = document.getElementById(id_value);
var buttonDiv = favButton.parentNode;
var pNode = buttonDiv.parentNode;
var resDiv = pNode.parentNode;

pNode.removeChild(pNode.childNodes[2]);
pNode.removeChild(pNode.childNodes[1]);
pNode.removeChild(pNode.childNodes[0]);
resDiv.removeChild(pNode);			
// here the results are then deleted frm the results div as they have been moved to favorites

displayNumber = displayNumber - 1;

searchArrayText1.splice(index, 1);
searchArrayText2.splice(index, 1);
htmlArray.splice(index, 1);
languageArray.splice(index, 1);
favDescrip.splice(index, 1);
idArray.splice(index, 1);
descripArray.splice(index, 1);
// removes the entries from ALL the arrays so that they will never reappear in the results

}

function removeFav (id_value) {

var strIndex = id_value.slice(2); // slices the id to obtain the original id

var theUrl = localStorage.getItem('link');
var theLanguage = localStorage.getItem('language');
var theId = strIndex;
var theDesc = localStorage.getItem('description');
// extracts the values from the local storage and parameter into the variables

searchArrayText1.push(theUrl);
htmlArray.push(theUrl);
languageArray.push(theLanguage);
searchArrayText2.push(theLanguage);
favDescrip.push(theDesc);
descripArray.push(theDesc);
idArray.push(theId);
// add the information back into each array

var favButton = document.getElementById(id_value);
var buttonDiv = favButton.parentNode;
var pNode = buttonDiv.parentNode;
var resDiv = pNode.parentNode;

pNode.removeChild(pNode.childNodes[3]);
pNode.removeChild(pNode.childNodes[2]);
pNode.removeChild(pNode.childNodes[1]);
pNode.removeChild(pNode.childNodes[0]);
resDiv.removeChild(pNode);		
// the above two sections of code remove the results from displaying in the favorites section

localStorage.clear(); 
// clears localStorage after all the values have been extracted back to the arrays and the results are no longer appended to the div

}

// Quick Note: I learned concepts and Javascript commands from a text I purchased (not an assigned reading).
// "A Smarter Way to Learn JavaScript" by Mark Meyers
// I did base some of my techniques here from the reading; they are cited above.
// Also referenced a lot of commands (but did not copy sections of code) from MDN and www.w3schools.com


