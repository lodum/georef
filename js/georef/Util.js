/*
Copyright © 2013 Alber Sanchez <albhasan@gmail.com>
This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See the COPYING file for more details.
*/

/**
* Tests if the given URL points to an image
* @param testUrl - Image URL to be tested
* @returns TRUE if the file extension match an image format FALSE otherwise
*/
function isUrlOfImage(testUrl){
	res = false;
	if(isUrlValid(testUrl)){
		// Check for common image file extension
		return /^.*\.(jpg|JPG|jpeg|JPEG|gif|GIF|bmp|BMP)$/.test(testUrl);
	}
	return res;
}

/**
* Tests if the given URL is valid
* @param url - URL to be tested
* @returns TRUE if the URL is valid, FALSE otherwise
*/
function isUrlValid(url){
	var res = false;
	if(isTextValid(url)){
		//TODO: There are some URLs which doesn't start with WWW
		var urlregex = new RegExp("^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)");
		if (urlregex.test(url)) {
			res = true;
		}
	}
    return res;
}

/**
* Tests if the given string is valid
* @param txt - Text to be tested
* @returns TRUE if the text is not null and it has more than 0 characters, FALSE otherwise
*/
function isTextValid(txt){
	var res = false;
	if(txt != null){
		if(txt.length > 0){
			//TODO: check if txt is made of only white spaces
			res = true;
		}
	}
	return res;
}

/**
* Tests if the given URI is valid
* @param uri - URI to be tested
* @returns TRUE if the URL is valid, FALSE otherwise
*/
function isUriValid(uri){
	//TODO
	var res = false;
	if(isTextValid(uri)){
		//var urlregex = new RegExp("^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)");
		//if (urlregex.test(uri)) {
		//TODO: Find a regular expression for URI validation
		res = true;
		//}
	}
    return res;
}

/**
* Add 0s in the left of a number
* @param number - Number to which 0s are being added
* @param size - Final lenght of the returned string
* @returns A string with some 0s to the left of the number
*/
function padNumber(number, size) {
    var res = "0000000000" + number;
    return res.substr(res.length - size);
}	

/**
* Round a number
* @param number - Number to be rounded
* @param places - Number of decimals to be rounded to
* @returns A rounded number
*/
function roundNumber(number, places) {
    var multiplier = Math.pow(10, places);
    return (Math.round(number * multiplier) / multiplier);
}

/**
* Switch the dimension of a 2 dimensional array
* @param anArray - Array to be transposed
* @returns An array
*/
function trasposeArray(anArray){
	var res = anArray.slice(0);//Clone array
	for (var i = 0; i < res.length; i++) {
	  for (var j = 0; j < i; j++) {
		var temp = res[i][j];
		res[i][j] = res[j][i];
		res[j][i] = temp;
	  }
	}
	return res;
}

/**
* Test if the given parameter is a number
* @param n - parameter
* @returns TRUE is the parameter is a number, FALSE otherwise
*/
function isNumber(n) {
	//Coded adapted from http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
	return !isNaN(parseFloat(n)) && isFinite(n);
}


/**
* Swaps the columns in a 2-dimensional array
* @param xyArray - Array made of [x,y] arrays where x and y are numbers
* @returns An array
*/
function xySwap(xyArray){
	var res = new Array();
	for(var i = 0; i < xyArray.length; i++){
		var xy = xyArray[i];
		var x = xy[0];
		var y = xy[1];
		var yx = new Array();
		yx.push(y);
		yx.push(x);
		res.push(yx);
	}
	return res;
}

/**
* Calculates the area of a polygon
* @param xyArray - Array of points [x,y] representing the polygon coordinates
* @returns A number
*/
function calculatePolygonArea(xyArray){
	var res;
	var isClosed = false;
	var pointCount = xyArray.length;
	if(pointCount > 2){
		if(xyArray[0][0] == xyArray[pointCount - 1][0] && xyArray[0][1] == xyArray[pointCount - 1][1]){
			isClosed = true;
		}
		var l2r = 0;
		var r2l = 0;
		for(var i = 1; i < pointCount; i++){
			var l2rTmp = xyArray[i - 1][0] * xyArray[i][1];
			var r2lTmp = xyArray[i][0] * xyArray[i-1][1];
			l2r = l2r + l2rTmp;
			r2l = r2l + r2lTmp;
		}
		if(isClosed == false){
			var l2rTmp = xyArray[pointCount - 1][0] * xyArray[0][1];
			var r2lTmp = xyArray[0][0] * xyArray[pointCount-1][1];
			l2r = l2r + l2rTmp;
			r2l = r2l + r2lTmp;
		}
		res = (l2r - r2l) / 2;
	}
	//if(res < 0){}//Clockwise polygon
	return Math.abs(res);
}

/**
* Gets the bounding box coordinates from a set of coordinates
* @param xyArray - Array of points [x,y] 
* @returns An 1-dimension array [xMin, yMin, xMax, yMax]
*/
function getBoundary(xyArray){
	var xMin = Infinity;
	var yMin = Infinity;
	var xMax = -Infinity;
	var yMax = -Infinity;

	for(var i = 0; i < xyArray.length; i++){
		var xy = xyArray[i];
		var xMin = (xMin > xy[0]) ? xy[0] : xMin;
		var yMin = (yMin > xy[1]) ? xy[1] : yMin;
		var xMax = (xMax < xy[0]) ? xy[0] : xMax;
		var yMax = (yMax < xy[1]) ? xy[1] : yMax;
	}
	var res = new Array(xMin, yMin, xMax, yMax);
	return res;	
}

/**
* Centers the map in the specified coordinates
* @param lng - Longitude
* @param lat - Latitude
*/
function zoomToSuggestion(lng, lat){
	//TODO: Refactor to panToSuggestion
	//TODO: Moves to Gui.js because of the dependency on the global "map" variable
	map.panTo(new L.LatLng(lat, lng));
	if(trans != null){
		var tmp = new Array(new Array(lng, lat));
		var imgCoords = trans.transformReverse(tmp);
		var imgScaledCoords = imgModelScaled.scaleCoords(imgCoords[0][0], imgCoords[0][1]);
		mapImage.panTo(new L.LatLng(imgScaledCoords[1], imgScaledCoords[0]));
	}
	
}	

/**
* Gets the bounding box coordinates from a set of coordinates
* @param xyArray - Array of points [x,y] 
* @param proj - Projection object
* @returns An array of points [x,y] 
*/
function xyProject(xyArray, proj){
	var res = new Array();
	for(var i = 0; i < xyArray.length; i++){
		var xy = xyArray[i];
		var ll = new L.LatLng(xy[1], xy[0]);
		var p = proj.project(ll);//Leaflet doesn't make transformations!!! http://leafletjs.com/reference.html#icrs
		var tmp = new Array(p.x, p.y);
		res.push(tmp);
	}
	return res;
}

/**
* Converts latlong objects to a 2-dimension array
* @param latlonArray - Array of latlong objects
* @returns An array of points [x,y] 
*/
function latlon2xyArray(latlonArray){
	var res = new Array();
	for(var i = 0; i < latlonArray.length; i++){
		var ll = latlonArray[i];
		var tmpCoords = new Array(ll.lng, ll.lat);
		res.push(tmpCoords);
	}
	return res;
}

/**
* Converts a 2-dimension array [x,y] to an array of latlong objects
* @param xyArray - An array of points [x,y] 
* @returns A 1-dimension array of latlong objects
*/
function xyArray2latlon(xyArray){
	var res = new Array();
	for(var i = 0; i < xyArray.length; i++){
		var xy = xyArray[i];
		var latlng = new L.LatLng(xy[1], xy[0]);
		res.push(latlng);
	}
	return res;
}

/**
* Converts an array of point objects to an array of points [x,y] 
* @param pointArray - An array of point objects
* @returns An array of points [x,y] 
*/
function point2xyArray(pointArray){
	var res = new Array();
	for(var i = 0; i < pointArray.length; i++){
		var p = pointArray[i];
		var tmpCoords = new Array(p.x, p.y);
		res.push(tmpCoords);
	}
	return res;
}

/**
* Converts an array of points [x,y] to point an array of point objects
* @param xyArray - An array of points [x,y] 
* @returns An array of point objects
*/
function xyArray2point(xyArray){
	var res = new Array();
	for(var i = 0; i < xyArray.length; i++){
		var xy = xyArray[i];
		var point = new L.Point(xy[0], xy[1]);
		res.push(point);
	}
	return res;
}

/**
* Calculates the length of a line made of latlong objects
* @param latlonArray - An array of latlon objects
* @returns The distance in meters
*/
function latLngArrayDistance(latlonArray){
	var res = 0;
	for(var i = 1; i < latlonArray.length; i++){
		var ll0 = latlonArray[i - 1];
		var ll1 = latlonArray[i];
		res = res + ll0.distanceTo(ll1);
	}
	return res;//Meters
}

/**
* Calculates the length of a line made of point objects
* @param pointArray - An array of point objects
* @returns A number
*/
function pointArrayDistance(pointArray){
	var res = 0;
	for(var i = 1; i < pointArray.length; i++){
		var p0 = pointArray[i - 1];
		var p1 = pointArray[i];
		res = res + p0.distanceTo(p1);
	}
	return res;
}

/**
* Generates KML code for overlaying an image
* @param imgUrl - Image's URL
* @param north - North coordinate
* @param south - South coordinate
* @param east - East coordinate
* @param west - West coordinate
* @param rotation - Rotation angle in degrees measured from the north. To the left is positive
* @returns KML overlay code
*/
function getOverlayText(imgUrl, north, south, east, west, rotation){
	var res = "";
	var c = new Constants();
	var template = c.getConstant("KML_OVERLAY");
	
	res = template.replace("<PARAM_URL>", imgUrl);
	res = res.replace("<PARAM_NORTH>", north);
	res = res.replace("<PARAM_SOUTH>", south);
	res = res.replace("<PARAM_EAST>", east);
	res = res.replace("<PARAM_WEST>", west);
	res = res.replace("<PARAM_ROTATION>", rotation);
	
	return res;
}


/**
* Approximates the image's rotation angle from its projected corners
* @param xyImgProjectedBorders - An array of arrays [[xFrom,yFrom],[xTo,yTo]]
* @returns An angle in radians.
*/
function calculateRotation(xyImgProjectedBorders){
	var res;
	var tmpArray = new Array();
	for(var i = 1; i < xyImgProjectedBorders.length; i++){
		var xyFrom  = xyImgProjectedBorders[0];
		var xyTo = xyImgProjectedBorders[1];
		var slope = (xyTo[1] - xyFrom[1])-(xyTo[0] - xyFrom[0]);
		var angle = Math.atan(slope);
		tmpArray.push(angle);
	}
	//Angle average
	var sum = 0;
	var count = 0;
	for(var i = 0; i < tmpArray.length; i++){
		sum += tmpArray[i];
		count++;
	}
	res = sum/count;
	
	return res;
}

/**
* Encodes an xyArray [x,y] as Well Known Text
* @param xyArray - An array of points [x,y] 
* @param srsUrl - URL of a Spatial Reference System
* @returns A polygon encoded as WKT
*/
function xyArray2wktPolygon(xyArray, srsUrl){
//NOTE: An xyArray [x,y] can only represent a single polygon
//NOTE: Some srs require you to switch xy to yx. This function does not check for that
	var res;
	var first;
	var last;
	var closed = true;
	for(var i = 0; i < xyArray.length; i++){
		var xy = xyArray[i];
		if(i == 0){
			res = xy[0] + " " + xy[1];
			first = xy;
		}else{
			res = res + "," + xy[0] + " " + xy[1];
		}
		last = xy;
	}
	if(first[0] != last[0]){
		closed = false;
	}
	if(first[1] != last[1]){
		closed = false;
	}
	if(closed == false){
		res = res + "," + first[0] + " " + first[1];
	}
	res = "POLYGON((" + res + "))";
	if(srsUrl != null && srsUrl != ""){
		res = "<" + srsUrl + ">" + res;
	}
	return res;
}

/**
* Converts a comma separated value list to an array
* @param commaSeparatedValuesString - A text of comma separated values
* @returns An array
*/
function csv2array(commaSeparatedValuesString){	
	var res;
	if(commaSeparatedValuesString != null && commaSeparatedValuesString.length > 0){
		//var tmp = commaSeparatedValuesString.replace(" , ", "@@@");
		//tmp = tmp.replace(", ", "@@@");
		//tmp = tmp.replace(",", "@@@");
		//tmp = tmp.replace("  ", "@@@");
		var tmpSplit = commaSeparatedValuesString.split(",");//tmp.split("@@@");
		for(var i = 0; i < tmpSplit.length; i++){
			//tmpSplit[i] = tmpSplit[i].trim();//TODO: This could fail with old browsers
			tmpSplit[i] = tmpSplit[i].replace(/\s/g, '');
		}
		res = tmpSplit;
	}
	return res;
}

/**
* Tests if a number is a positive integer
* @param n - A number to be tested
* @returns TRUE if the given number is a positive integer, FALSE otherwise
*/
function isPositiveInteger(n){
//Code adapted from http://stackoverflow.com/questions/10834796/validate-that-a-string-is-a-positive-integer
	return n >>> 0 === parseFloat(n);
}

function replaceAll(find, replace, str) {
http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
	return str.replace(new RegExp(find, 'g'), replace);
}

function removeElement(id){
	$('#' + id).remove();
}
