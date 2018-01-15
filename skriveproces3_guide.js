


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
	var value = $('#'+sid).val();
	$(sthis).text(value);
	wpc.api.userData['#'+sid] = value;
	wpc.close_template_userMsgBox(null);
	osc.save('apiData', wpc.api);

	console.log('CLICK summerySave - value: ' + value + ', sid: ' + sid);
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


function contentOf2(parentTag, userDataId) {
	
	return '<'+parentTag+'>'+((wpc.api.userData.hasOwnProperty(userDataId))? wpc.api.userData[userDataId] : '')+'</'+parentTag+'>';
}


// FRA ERWIN'S SKRIVEGUIDE
function summery(selector) {
	console.log('\nEXTERNAL FUNCTION summery - CALLED');

	var HTML = '';

	HTML += '<div id="summeryContainer">';

	HTML += 	contentOf('h1','#textArea_14_1', 'Rubrik');  		// Step 14: Rubrik
	HTML += 	contentOf('h3','#textArea_15_1', 'Underrubrik');  		// Step 15: Underrubrik
	HTML += 	'<h4>Indledning</h4>';
	HTML += 	contentOf('p','#textArea_13_1', 'Indledning');  		// Step 13: Indledning
	HTML += 	'<h4>Mellemrubrik</h4>';
	HTML += 	'<textarea id="textArea_16_1"></textarea>'; 
	HTML += 	'<h4>Indtroduktion</h4>';
	HTML += 	contentOf('p','#textArea_7_2', 'Indtroduktion');  		// Step 13: Indledning 
	HTML += 	'<h4>Mellemrubrik</h4>';
	HTML += 	'<textarea id="textArea_16_2"></textarea>'; 
	HTML += 	'<h4>Analyse</h4>';
	HTML += 	'<h5><b>Anslag for analyseafsnit</b></h5>';
	HTML += 	contentOf('p','#textArea_8a_2', 'Anslag for analyseafsnit');  		// Step 13: Indledning 
	HTML += 	'<h5><b>Besvarelse af hvordan/hvilke-spørgsmål</b></h5>';
	HTML += 	contentOf('p','#textArea_8a_3', 'Besvarelse af hvordan/hvilke-spørgsmål'); 
	HTML += 	'<h5><b>karakteristik el. undersøgelse</b></h5>';
	HTML += 	contentOf('p','#textArea_8b_1', 'karakteristik el. undersøgelse'); 
	HTML += 	'<h5><b>Begreber</b></h5>';
	HTML += 	contentOf('p','#textArea_9_1', 'Begreber'); 
	HTML += 	'<h5><b>Primærtekstens svage led</b></h5>';
	HTML += 	contentOf('p','#textArea_10_1', 'Primærtekstens svage led'); 
	HTML += 	'<h4>Mellemrubrik</h4>';
	HTML += 	'<textarea id="textArea_16_3"></textarea>';  
	HTML += 	'<h4>Perspektiverende diskussion</h4>';
	HTML += 	contentOf('p','#textArea_11_1', 'Perspektiverende diskussion'); 
	HTML += 	'<h4>Mellemrubrik</h4>';
	HTML += 	'<textarea id="textArea_16_4"></textarea>'; 
	HTML += 	'<h4>Afslutning</h4>';
	HTML += 	contentOf('p','#textArea_12_1', 'Afslutning'); 


	HTML += '</div>';
	
	$(selector).html(HTML);

	// $('#summeryContainer h1, #summeryContainer h3, #summeryContainer span, #summeryContainer p').wrap("<span class='glyphicon glyphicon-pencil'></span>");
}


function download() {
	console.log('\nEXTERNAL FUNCTION download - CALLED');

	var HTML = wordTemplate();
	// var HTML = "TEST DOWNLOAD"; 
	
	var converted = htmlDocx.asBlob(HTML);
    console.log("EXTERNAL FUNCTION download - converted: " + JSON.stringify(converted));
	saveAs(converted, 'Min introducerende artikel.docx');
}


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
	
	HTML += 	contentOf('h1','#textArea_14_1', 'Rubrik');  		// Step 14: Rubrik
	HTML += 	contentOf('h3','#textArea_15_1', 'Underrubrik');  		// Step 15: Underrubrik
	HTML += 	'<h4>Indledning</h4>';
	HTML += 	contentOf('p','#textArea_13_1', 'Indledning');  		// Step 13: Indledning
	HTML += 	'<h4>Mellemrubrik</h4>';
	HTML += 	contentOf('p','#textArea_16_1', 'Mellemrubrik');
	HTML += 	'<h4>Indtroduktion</h4>';
	HTML += 	contentOf('p','#textArea_7_2', 'Indtroduktion');  		// Step 13: Indledning 
	HTML += 	'<h4>Mellemrubrik</h4>';
	HTML += 	contentOf('p','#textArea_16_2', 'Mellemrubrik');
	HTML += 	'<h4>Analyse</h4>';
	HTML += 	'<h5><b>Anslag for analyseafsnit</b></h5>';
	HTML += 	contentOf('p','#textArea_8a_2', 'Anslag for analyseafsnit');  		// Step 13: Indledning 
	HTML += 	'<h5><b>Besvarelse af hvordan/hvilke-spørgsmål</b></h5>';
	HTML += 	contentOf('p','#textArea_8a_3', 'Besvarelse af hvordan/hvilke-spørgsmål'); 
	HTML += 	'<h5><b>karakteristik el. undersøgelse</b></h5>';
	HTML += 	contentOf('p','#textArea_8b_1', 'karakteristik el. undersøgelse'); 
	HTML += 	'<h5><b>Begreber</b></h5>';
	HTML += 	contentOf('p','#textArea_9_1', 'Begreber'); 
	HTML += 	'<h5><b>Primærtekstens svage led</b></h5>';
	HTML += 	contentOf('p','#textArea_10_1', 'Primærtekstens svage led'); 
	HTML += 	'<h4>Mellemrubrik</h4>';
	HTML += 	contentOf('p','#textArea_16_3', 'Mellemrubrik');
	HTML += 	'<h4>Perspektiverende diskussion</h4>';
	HTML += 	contentOf('p','#textArea_11_1', 'Perspektiverende diskussion'); 
	HTML += 	'<h4>Mellemrubrik</h4>';
	HTML += 	contentOf('p','#textArea_16_4', 'Mellemrubrik');
	HTML += 	'<h4>Afslutning</h4>';
	HTML += 	contentOf('p','#textArea_12_1', 'Afslutning'); 

	HTML += 	'</body>';
	HTML += '</html>';
	// document.write(HTML);
	return HTML;
}




