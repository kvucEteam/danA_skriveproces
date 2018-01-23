

function contentOf(parentTag, userDataId, heading) {
console.log('contentOf - parentTag: ' + parentTag + ', userDataId: ' + userDataId + ', heading: ' + heading + ', wpc.api.userData.hasOwnProperty('+userDataId+'): ' + wpc.api.userData.hasOwnProperty(userDataId));

	// return '<'+parentTag+' data-id="'+userDataId+'">'+((wpc.api.userData.hasOwnProperty(userDataId))? wpc.api.userData[userDataId] : '')+'</'+parentTag+'>';

	// return '<div class="contentWrap"> <span class="glyphicon glyphicon-pencil"></span> <'+parentTag+' data-id="'+userDataId+'">'+((wpc.api.userData.hasOwnProperty(userDataId))? wpc.api.userData[userDataId] : '')+'</'+parentTag+'> </div>';
	// return '<div class="contentWrap"> <'+parentTag+' data-id="'+userDataId+'" data-heading="'+heading+'">'+((wpc.api.userData.hasOwnProperty(userDataId))? wpc.api.userData[userDataId] : '')+'</'+parentTag+'> </div>';  					 // <----  COMMENTED OUT 02-01-2018
	return '<div class="contentWrap"> <'+parentTag+' class="fieldData" data-id="'+userDataId+'" data-heading="'+heading+'">'+((wpc.api.userData.hasOwnProperty(userDataId) && (wpc.api.userData[userDataId]!==''))? wpc.api.userData[userDataId] : '<span class="emptyField">[Indsæt ' + heading.toLowerCase() + ']</span>')+'</'+parentTag+'> </div><div class="Clear"></div>';	// <------ ADDED 02-01-2018
}




// function download() {
// 	console.log('\nEXTERNAL FUNCTION download - CALLED');

// 	var HTML = wordTemplate();
// 	// var HTML = "TEST DOWNLOAD"; 
	
// 	var converted = htmlDocx.asBlob(HTML);
//     console.log("EXTERNAL FUNCTION download - converted: " + JSON.stringify(converted));
// 	saveAs(converted, 'Metatekst.docx');
// }


// ADDED 18/1-2018 - HTML-to-Word-conversion by PHP
// The btn #submit by input type="submit" has a diffrent CSS-style... therefore another btn .download is used and click on the #submit btn.
function download() {  
	var HTML = '';
	HTML += '<form action="htmlToWord.php" method="post">';
    HTML += 	'<input type="hidden" name="fileName" id="hiddenField" value="Metatekst" />';
    HTML += 	'<input id="html" type="hidden" name="html" id="hiddenField" />';
    HTML += 	'<input id="submit" type="submit" class="btn btn-info" value="Konverter" onclick="clearInterval(downloadTimer);">';  // <---- NOTE: The "downloadTimer" is cleared here!
    HTML += '</form>';
    $('#interface').append(HTML);
}

// ADDED 18/1-2018 - HTML-to-Word-conversion by PHP
// If this is not present, some browseres starts to download an empty htmlToWord.php file instead of the intended .docx file.
$( document ).on('click', '#submit', function(){  
    console.log('#submit - CLICKED - submit');
    $('#html').val(wordTemplate());
});

// ADDED 18/1-2018 - HTML-to-Word-conversion by PHP
// Some browsers need two clicks on the ".download" btn before the download starts. Therefore a timer is set to loop untill the variable "downloadTimer" is cleared.
$( document ).on('click', '.download', function(){    
	console.log('.download - CLICKED - submit');
    window.Tcount = 0;
	window.downloadTimer = setInterval(function(){  // <---- NOTE: The "downloadTimer" is cleared inline in the input-tag "#submit"
		$('#submit').trigger('click');
		++Tcount;
		console.log('download - CLICKED - Tcount: ' + Tcount);
	}, 200);
});


function wordTemplate() {
	var HTML = '';
	HTML += '<!DOCTYPE html>';
	HTML += '<html>';
	HTML += 	'<head>';
	HTML += 	'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';  // Fixes issue with danish characters on Internet Explore 
	HTML += 		'<style type="text/css">';
	HTML += 			'body {font-family: arial;}';
	HTML += 			'h1 {}';
	HTML += 			'h2 {}';
	// HTML += 			'h3 {font-style: italic; color: #717272;}';
	// HTML += 			'h4 {color: #56bfc5;}';
	HTML += 			'h5 {}';
	HTML += 			'h6 {}';
	HTML += 			'.selected {color: #56bfc5; width: 25%;}';
	HTML += 			'p {font-size: 14px; margin-bottom: 5px}';
	HTML += 			'table {padding: 8px; width: 100%;}';
	HTML += 			'td {width: 25%;}';
	HTML += 			'ul {font-size: 14px;}';
	HTML += 			'#author div {display: inline-block;}';
	HTML += 			'.instruction {color: #999;}';
	HTML += 		'</style>';
	HTML += 	'</head>';
	HTML += 	'<body>';
	
	HTML += 	'<h1>Metatekst</h1>';
	HTML += 	contentOf('p','#textArea_1', 'Underrubrik');  		// Step 15: Underrubrik

	HTML += 	'</body>';
	HTML += '</html>';
	// document.write(HTML);
	return HTML;
}





