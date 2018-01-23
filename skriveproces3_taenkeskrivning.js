





// $( document ).on('click', "#summeryContainer h1, #summeryContainer h3, #summeryContainer span, #summeryContainer p, #summeryContainer i", function(event){   // COMMENTED OUT 02-01-2018
$( document ).on('click', ".fieldData", function(event){																										// ADDED 02-01-2018
	console.log('editText - api: ' + JSON.stringify(wpc.api));
	
	window.sthis = this;
	window.sid = $(this).attr('data-id').replace('#', '');
	window.sheading = $(this).attr('data-heading');
	window.stagName = $(this).prop("tagName").toLowerCase();

	console.log('CLICK summeryContainer - sid: ' + sid + ', sheading: ' + sheading);

	var HTML = '<h4>'+sheading+'</h4>';
	HTML += '<textarea id="'+sid+'" class="autoSaveOff"></textarea>';
	HTML += '<span class="save summerySave btn btn-info">GEM</span>';
	wpc.template_userMsgBox({id: "summeryTemplate"}, HTML);
});


$( document ).on('click', ".summerySave", function(event){
	var value = $('#'+sid).val().trim();
	if (value.length>0) { // If the user has entered some data...
		$(sthis).text(value);
	} else {
		$(sthis).parent().replaceWith(contentOf(stagName, sid, sheading));
	}

	wpc.api.userData['#'+sid] = value;
	wpc.close_template_userMsgBox(null);
	osc.save('apiData', wpc.api);

	console.log('CLICK summerySave - value: ' + value + ', sid: ' + sid);
});


function contentOf(parentTag, userDataId, heading) {
console.log('contentOf - parentTag: ' + parentTag + ', userDataId: ' + userDataId + ', heading: ' + heading + ', wpc.api.userData.hasOwnProperty('+userDataId+'): ' + wpc.api.userData.hasOwnProperty(userDataId));

	// return '<'+parentTag+' data-id="'+userDataId+'">'+((wpc.api.userData.hasOwnProperty(userDataId))? wpc.api.userData[userDataId] : '')+'</'+parentTag+'>';

	// return '<div class="contentWrap"> <span class="glyphicon glyphicon-pencil"></span> <'+parentTag+' data-id="'+userDataId+'">'+((wpc.api.userData.hasOwnProperty(userDataId))? wpc.api.userData[userDataId] : '')+'</'+parentTag+'> </div>';
	// return '<div class="contentWrap"> <'+parentTag+' data-id="'+userDataId+'" data-heading="'+heading+'">'+((wpc.api.userData.hasOwnProperty(userDataId))? wpc.api.userData[userDataId] : '')+'</'+parentTag+'> </div>';  					 // <----  COMMENTED OUT 02-01-2018
	return '<div class="contentWrap"> <'+parentTag+' class="fieldData" data-id="'+userDataId+'" data-heading="'+heading+'">'+((wpc.api.userData.hasOwnProperty(userDataId) && (wpc.api.userData[userDataId]!==''))? wpc.api.userData[userDataId] : '<span class="emptyField">[Indsæt ' + heading.toLowerCase() + ']</span>')+'</'+parentTag+'> </div><div class="Clear"></div>';	// <------ ADDED 02-01-2018
}


// FRA ERWIN'S SKRIVEGUIDE
function summery(selector) {
	console.log('\nEXTERNAL FUNCTION summery - CALLED');

	var HTML = '';

	HTML += '<div id="summeryContainer">';

	HTML += 	'<h1>Tænkeskrivning</h1>';
	HTML += 	contentOf('p','#textArea_2_2', 'Emnet med egne ord');  
	HTML += 	contentOf('h3','#textArea_2_3', 'Forventninger til dig');  

	HTML += 	'<h4>Resumér</h4>';
	HTML += 	'<h5><b>Resumé af primærteksten</b></h5>';
	HTML += 	contentOf('p','#textArea_3_1', 'Resumé af primærteksten'); 
	HTML += 	'<h5><b>Resumé af sekundærteksten</b></h5>';
	HTML += 	contentOf('p','#textArea_3_2', 'Resumé af sekundærteksten'); 
	HTML += 	'<h5><b>Resumé af tekster fundet på internettet</b></h5>';
	HTML += 	contentOf('p','#textArea_3_3', 'Resumé af tekster fundet på internettet');  

	HTML += 	'<h4>Citater</h4>';
	HTML += 	'<h5><b>Citater fra primærteksten eller videoen</b></h5>';
	HTML += 	contentOf('p','#textArea_4_1', 'Citater fra primærteksten eller videoen'); 
	HTML += 	'<h5><b>Citater fra sekundærteksten eller videoen</b></h5>';
	HTML += 	contentOf('p','#textArea_4_2', 'Citater fra sekundærteksten eller videoen'); 
	HTML += 	'<h5><b>Citater fra tekster fundet på internettet</b></h5>';
	HTML += 	contentOf('p','#textArea_4_3', 'Citater fra tekster fundet på internettet');  

	HTML += 	'<h4>Begreber</h4>';
	HTML += 	'<h5><b>Begreber fra lærebog</b></h5>';
	HTML += 	contentOf('p','#textArea_5_1', 'Begreber fra lærebog'); 
	HTML += 	'<h5><b>Begreber - de tre bedste</b></h5>';
	HTML += 	contentOf('p','#textArea_5_2', 'Begreber - de tre bedste');

	HTML += 	'<h4>Taksonomi</h4>';
	HTML += 	'<h5><b>Redegørende spørgsmål</b></h5>';
	HTML += 	contentOf('p','#textArea_6_1', 'Redegørende spørgsmål'); 
	HTML += 	'<h5><b>Analyserende spørgsmål</b></h5>';
	HTML += 	contentOf('p','#textArea_6_2', 'Analyserende spørgsmål'); 
	HTML += 	'<h5><b>Perspektiverende/diskuterende spørgsmål</b></h5>';
	HTML += 	contentOf('p','#textArea_6_3', 'Perspektiverende/diskuterende spørgsmål');  


	HTML += '</div>';
	
	$(selector).html(HTML);

	// $('#summeryContainer h1, #summeryContainer h3, #summeryContainer span, #summeryContainer p').wrap("<span class='glyphicon glyphicon-pencil'></span>");
}


// function download() {
// 	console.log('\nEXTERNAL FUNCTION download - CALLED');

// 	var HTML = wordTemplate();
// 	// var HTML = "TEST DOWNLOAD"; 
	
// 	var converted = htmlDocx.asBlob(HTML);
//     console.log("EXTERNAL FUNCTION download - converted: " + JSON.stringify(converted));
// 	saveAs(converted, 'Tænkeskrivning.docx');
// }

// ADDED 18/1-2018 - HTML-to-Word-conversion by PHP
// The btn #submit by input type="submit" has a diffrent CSS-style... therefore another btn .download is used and click on the #submit btn.
function download() {  
	var HTML = '';
	HTML += '<form action="htmlToWord.php" method="post">';
    HTML += 	'<input type="hidden" name="fileName" id="hiddenField" value="Tænkeskrivning" />';
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
	
	HTML += 	'<h1>Tænkeskrivning</h1>';
	HTML += 	contentOf('p','#textArea_2_2', 'Emnet med egne ord');  
	HTML += 	contentOf('h3','#textArea_2_3', 'Forvendtninger til dig');  

	HTML += 	'<h4>Resumér</h4>';
	HTML += 	'<h5><b>Resumé af primærteksten</b></h5>';
	HTML += 	contentOf('p','#textArea_3_1', 'Resumé af primærteksten'); 
	HTML += 	'<h5><b>Resumé af sekundærteksten</b></h5>';
	HTML += 	contentOf('p','#textArea_3_2', 'Resumé af sekundærteksten'); 
	HTML += 	'<h5><b>Resumé af tekster fundet på internettet</b></h5>';
	HTML += 	contentOf('p','#textArea_3_3', 'Resumé af tekster fundet på internettet');  

	HTML += 	'<h4>Citater</h4>';
	HTML += 	'<h5><b>Citater fra primærteksten eller videoen</b></h5>';
	HTML += 	contentOf('p','#textArea_4_1', 'Citater fra primærteksten eller videoen'); 
	HTML += 	'<h5><b>Citater fra sekundærteksten eller videoen</b></h5>';
	HTML += 	contentOf('p','#textArea_4_2', 'Citater fra sekundærteksten eller videoen'); 
	HTML += 	'<h5><b>Citater fra tekster fundet på internettet</b></h5>';
	HTML += 	contentOf('p','#textArea_4_3', 'Citater fra tekster fundet på internettet');  

	HTML += 	'<h4>Begreber</h4>';
	HTML += 	'<h5><b>Begreber fra lærebog</b></h5>';
	HTML += 	contentOf('p','#textArea_5_1', 'Begreber fra lærebog'); 
	HTML += 	'<h5><b>Begreber - de tre bedste</b></h5>';
	HTML += 	contentOf('p','#textArea_5_2', 'Begreber - de tre bedste');

	HTML += 	'<h4>Taksonomi</h4>';
	HTML += 	'<h5><b>Redegørende spørgsmål</b></h5>';
	HTML += 	contentOf('p','#textArea_6_1', 'Redegørende spørgsmål'); 
	HTML += 	'<h5><b>Analyserende spørgsmål</b></h5>';
	HTML += 	contentOf('p','#textArea_6_2', 'Analyserende spørgsmål'); 
	HTML += 	'<h5><b>Perspektiverende/diskuterende spørgsmål</b></h5>';
	HTML += 	contentOf('p','#textArea_6_3', 'Perspektiverende/diskuterende spørgsmål');  

	HTML += 	'</body>';
	HTML += '</html>';
	// document.write(HTML);
	return HTML;
}





