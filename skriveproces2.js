

//====================================================== 
//		ATO: Funktionalitet gem word-fil: 
//======================================================
    var content = "<h1> HEJ Thomas</h1> <p>Det er faktisk js..Er det ikke smart..!</p>";

    var converted = htmlDocx.asBlob(content);
    console.log(converted);


    $(".saveFile").click(function() {
        saveAs(converted, 'test.docx');
    });

//====================================================== 
//		Test local storage
//======================================================

var testJsonObj = {"A": {"A1": 1, "A2": 2, "A3": 3}, "B": {"B1": 1, "B2": 2, "B3": 3}};
var testArray = [1,2,3,4,5];


function checkForLocalStoargeSupport(){
	var TtestJsonObj; var TtestArray;
	if(typeof(Storage) !== "undefined") {
	    // alert("LocalStorage supported!");
	    console.log("checkForLocalStoargeSupport - LocalStorage supported!");
	} else {
	    // alert("LocalStorage NOT supported!");
	    console.log("checkForLocalStoargeSupport - LocalStorage NOT supported!");
	}

	localStorage.setItem("testJsonObj", JSON.stringify(testJsonObj));  	// This is how to save an object in "LocalStorage"
	TtestJsonObj = JSON.parse(localStorage.getItem("testJsonObj"))		// This is how to get an object in "LocalStorage"
	console.log("checkForLocalStoargeSupport - getItem 1: " + JSON.stringify(TtestJsonObj));

	localStorage.setItem("testArray", JSON.stringify(testArray));  	// This is how to save an array in "LocalStorage"
	TtestArray = JSON.parse(localStorage.getItem("testArray"))		// This is how to get an array in "LocalStorage"
	console.log("checkForLocalStoargeSupport - getItem 1: " + JSON.stringify(TtestArray));
}

$( document ).on('click', "#testLocalStorage", function(event){
	checkForLocalStoargeSupport();
    console.log("testLocalStorage - PRESSED");
});

checkForLocalStoargeSupport();


//################################################################################################################################
//
//									VERSION 2	-	MAMs med rettelser fra d. 07-01-2016
//
//################################################################################################################################

// Audio:
// http://www.w3schools.com/html/tryit.asp?filename=tryhtml5_audio_all

// Bootstrap input fields
// http://getbootstrap.com/components/#input-groups


// TO-DO fra referat far møde med Morten og Andreas 11-02-2016:
// -----------------------------------------------------------
// Skriveproces - skønlitterær analyse
// Vi laver teksten som pdf, der åbnes i nyt vindue / downloades. 
// UX og teksten: hvor skal den være, og være tilgængelig:
// Ide: vi viser et tekstuddrag + en knap der åbner en pdf, som man kan downloade og ha åben ved siden af øvelsesvinduet
// markere med PDF’ens markeringsredskaber, diigo eller andre digitale tekstmarkeringsredskaber
// Nyt billede til step 0 (evt. en farvevariation - eller nogle tekster over)
// Step 1: afklare copyright med Michael???
// Step 3: tilføje brugervenlighed - “Brug evt. sætningsstarterne herunder”
// Step 4: evt. minimere fokuspunkter til 5? (tilføjelse: UserMessageBox med beskrivelse af fokuspunktet - knappen er valgt.)
// Step 5: “Find og indsæt tre citater fra teksten” - FR skal se på feedbackteksterne (fx ved manglende udfyldning etc. OBS husk: tekstindgange/paragrafskift.)
// Step 6: citaterne er i anførselstegn
// Step 7: UX og design-blik på dette step (TLY og THAN) (ato viser hvor teksterne om øvelsesinstrukserne ligger inden da.)
// Step 8: stramme op på instruksteksterne.
// Step 9: vi fjerner knapperne og erstatter med et inputfelt og et txt-area OBS - BUG, den sletter noget, når man går tilbage, i f.t. datahåndtering fra 8’eren?
// step 10: UX og design-blik på dette step (TLY og THAN) (ato viser hvor teksterne om øvelsesinstrukserne ligger inden da. og ato og than kigger på wordfilen)

// TO DO :
// først en tekst som PDF til test. (anchortag til pdf plejer at fungere, siger than.)
// Rigtige instrukstekster ind
// UX derefter




var jsonData = "<h1>OK</h1>";


function ReturnAjaxData(Type, Url, Async, DataType) {
    $.ajax({
        type: Type,
        url: Url,
        async: Async,
        dataType: DataType,
        success: function(Data) {
            console.log("ReturnAjaxData: " + JSON.stringify(Data));
            jsonData = JSON.parse(JSON.stringify(Data));
            // JsonExternalData = JSON.parse(JSON.stringify(Data));
        }
    }).fail(function() {
        alert("Ajax failed to fetch data - the requested quizdata might not exist...");
    });
}


function getSelectedIndexNum(){
	for (var n in jsonData.studentSelectedTexts){
    	if (jsonData.studentSelectedTexts[n].selected){
    		return n;
    	}
    }
    return null;
}

function getSelected(varType){
	for (var n in jsonData.studentSelectedTexts){
    	if (jsonData.studentSelectedTexts[n].selected){
    		if (jsonData.studentSelectedTexts[n].hasOwnProperty(varType)){
    			return jsonData.studentSelectedTexts[n][varType];
    		} else {
    			alert('getSelected - ERROR: varType: "' + varType + '" does not exist!');
    		}
    	}
    }
    alert('getSelected - ERROR: No subject is selected by the student!');
}


// {name: studentSelectedTexts, val: [], selected: false}
function setSelected(varType, varValue){
	for (var n in jsonData.studentSelectedTexts){
    	if (jsonData.studentSelectedTexts[n].selected){
    		if (jsonData.studentSelectedTexts[n].hasOwnProperty(varType)){
    			jsonData.studentSelectedTexts[n][varType] = varValue;
    			break;
    		} else {
    			alert('setSelected - ERROR: varType: "' + varType + '" does not exist!');
    		}
    	}
    }
}


function returnAudioControls(audioData){
	if (typeof(autoPlay) === 'undefined'){
		window.autoPlay = true;
		console.log("returnAudioControls - autoPlay - SET");
	}

	var HTML = '';
	console.log("returnAudioControls - autoPlay: " + autoPlay);
	// HTML += '<audio id="audioPlayer" controls="controls"'+((autoPlay)?' autoplay="autoplay"':'')+'>';   	// <---- ORGINAL - SKAL VÆRE UKOMMENTERET I LIVE QUIZ
	HTML += '<audio id="audioPlayer" controls="controls">';    												// <----- SLUK FOR AUTO PLAY
	for (var n in audioData) {
		HTML += '<source src="'+audioData[n].name+'" type="audio/'+audioData[n].type+'"/>';
	}
	HTML += 	'Your browser does not support the audio element.';
	HTML += '</audio>';
	return HTML;
}
// console.log("returnAudioControls: " + returnAudioControls([{"name": "step_0.mp3", "type": "mpeg"}, {"name": "step_0.ogg", "type": "ogg"}]));


function setJsAudioEventLitsner(){
	var audioObj = document.getElementById("audioPlayer");
    audioObj.onpause = function() {
    	autoPlay = false;
        console.log("setJsAudioEventLitsner - PAUSE");
    }
    audioObj.onplay = function() {
    	autoPlay = true;
        console.log("setJsAudioEventLitsner - PLAY");
    }
}



function returnInputBoxes3(numOfBoxes, Class, placeholderText){
	var HTML = '';
	for (var i = 0; i < numOfBoxes; i++) {
		HTML += '<span class="input-group">';
		// HTML += 	'<span class="input-group-addon" id="sizing-addon2">@</span>';
		if (typeof(placeholderText) == 'string')
			HTML += 	'<input type="text" class="'+Class+' form-control" placeholder="'+placeholderText+'" aria-describedby="sizing-addon2">';
		if ((Array.isArray(placeholderText)) && (placeholderText.length == numOfBoxes))
			HTML += 	'<input type="text" class="'+Class+' form-control" value="'+placeholderText[i]+'" placeholder="'+placeholderText[i]+'" aria-describedby="sizing-addon2">';
		HTML += '</span>';
	};
	return HTML;
}


function returnInputBoxes4(numOfBoxes, Class, savedValues, placeholderText){
	var HTML = '';
	for (var i = 0; i < numOfBoxes; i++) {
		HTML += '<span class="input-group">';
		// HTML += 	'<span class="input-group-addon" id="sizing-addon2">@</span>';
		if (typeof(placeholderText) == 'string')
			// HTML += 	'<input type="text" class="'+Class+' form-control" placeholder="'+placeholderText+'" aria-describedby="sizing-addon2">';                               // 16-02-2016        
			HTML += 	'<input type="text" class="'+Class+' form-control"'+((savedValues!=='')?' value="'+savedValues+'"':'')+' placeholder="'+placeholderText+'" aria-describedby="sizing-addon2">';   // 16-02-2016
		if ((Array.isArray(savedValues)) && (savedValues.length == numOfBoxes) && (Array.isArray(placeholderText)) && (placeholderText.length == numOfBoxes))
			HTML += 	'<input type="text" class="'+Class+' form-control"'+((savedValues[i]!=='')?' value="'+savedValues[i]+'"':'')+' placeholder="'+placeholderText[i]+'" aria-describedby="sizing-addon2">';
		HTML += '</span>';
	};
	return HTML;
}


function hasUniqueElements(Tarray){
	for (var i in Tarray){
		for (var j in Tarray){
			if (i != j){
				if (Tarray[i] === Tarray[j]){
					return false;
				}
			}
		}
	}
	return true;
}

function elementInArray(tArray, element){
    for (x in tArray){
        if (tArray[x] == element) return true 
    }
    return false;
}
console.log("elementInArray - true: " + elementInArray([1,2,3,4,5], 3));
console.log("elementInArray - false: " + elementInArray([1,2,3,4,5], 6));


function returnStudentTextArray(){
	var StudentSubjectArray = [];
	for (var n in jsonData.studentSelectedTexts){
		StudentSubjectArray.push(jsonData.studentSelectedTexts[n].textNo);
	}
	return StudentSubjectArray;
}


function removeEmptyElements(Tarray){
	for (var i in Tarray){
		if (Tarray[i] === '') {
			Tarray.splice(i, 1);
		}
	}
	return Tarray;
}


function returnElementNumInArray(tArray, element){
    for (x in tArray){
        if (tArray[x] == element) return x 
    }
    return false;
}
console.log("returnElementNumInArray - (returns 2): " + returnElementNumInArray([1,2,3,4,5], 3));
console.log("returnElementNumInArray - false: " + returnElementNumInArray([1,2,3,4,5], 6));


function isSimilar(array1, array2){
	if (array1.length != array1.length) return false;
	for (var n in array1){
		if (array1[n] !== array2[n]) return false;
	}
	return true;
}


function isLastStep(step) {
	for (var i = 0; i < jsonData.steps.length; i++) {
		if (jsonData.steps[i].step == step) {
			if (jsonData.steps.length-1 == i) {
				return true;
			} else {
				return false;
			}
		}
	}
}


function hasNonEmptyStrElm(Tarray) {
	console.log("hasNonEmptyStrElm - Tarray: " + Tarray);
	for (var n in Tarray) {
		if (Tarray[n] === '') return true;
		if (Tarray[n] === null) return true;
	}
	return false;
}

// This function replaces all "???" wildcards in strToReplace with the corrosponding "num" value translated into a string-word (between zero and twenty)
function replaceWildcard(strToReplace, num){
	var numArray = ['nul','en','to','tre','fire','fem','seks','syv','otte','ni','ti','elleve','tolv','tretten','fjorten','femten','seksten','sytten','atten','nitten','tyve'];
	var strArray = strToReplace.split(" ??? ");
	if (num > numArray.length-1) {
		return strArray.join(' '+String(num)+' ');
	} else {
		return strArray.join(' '+numArray[num]+' ');
	}
	return strToReplace;
}
console.log('replaceWildcard: ' + replaceWildcard('Du har ??? gode cykler tilrådighed, eller ??? dårlige?', 20)); 


// This function replaces all "???" wildcards in strToReplace with the corrosponding "num" value translated into a string-word (between zero and twenty). 
// The function also allows for replacement of all "???-x" and "???+x" wildcards, where x is a number. 
// BUG: This version has to have a blank char " " after each wildcard - eg. "???+x " to work propery!  <---- BUG IS FIXED - see below.
function replaceWildcard2(strToReplace, num){
	var numArray = ['nul','en','to','tre','fire','fem','seks','syv','otte','ni','ti','elleve','tolv','tretten','fjorten','femten','seksten','sytten','atten','nitten','tyve'];
	var Tstr = strToReplace.substring(0);
	var preStr = ''; var sumStr = '';
	var pos1 = strToReplace.indexOf(' ???');
	var pos2 = 0;
	var len = strToReplace.split(" ???").length-1;
	for (var i = 0; i < len; i++) {
		console.log('replaceWildcard2 - =====================');
		preStr = Tstr.substring(pos2, pos1);
		console.log('replaceWildcard2 - preStr:' + preStr);
		Tstr = Tstr.substring(pos1);
		console.log('replaceWildcard2 - Tstr 1:' + Tstr);
		pos2 = Tstr.indexOf(' ', 1);
		console.log('replaceWildcard2 - pos2:' + pos2);

		if (pos2 === -1) { // BUGFIX - by adding a blankspace the bug is removed.
			Tstr += ' ';
			pos2 = Tstr.indexOf(' ', 1);
			console.log('replaceWildcard2 - pos2:' + pos2);
		}

		if ((pos2 !== -1) && (pos2 >= 4)){
			var TTstr = Tstr.substring(0, pos2).replace(' ???', '');
			console.log('replaceWildcard2 - TTstr: _' + TTstr + '_');
			var val;
			if (TTstr.substring(0,1) == '+'){  // Addition operator
				val = num + parseInt(TTstr.substring(1));
			}
			if (TTstr.substring(0,1) == '-'){  // Subtraction operator
				val = num - parseInt(TTstr.substring(1));
			}
			if ((TTstr.substring(0,1) == '')){  // If there is no char in TTstr - eg. if the wildcard "???" does not have an attached number "+x" or "-x")
				val = num;
			}
			console.log('replaceWildcard2 - val:' + val);
		} 
		 
		if (val > numArray.length-1) {
			sumStr += preStr+' '+String(val);
		} else {
			sumStr += preStr+' '+numArray[val];
		}
		console.log('replaceWildcard2 - sumStr:' + sumStr);

		pos1 = Tstr.indexOf(' ???', pos2);
		console.log('replaceWildcard2 - Tstr 2:' + Tstr);
	};

	// var TpreStr = TTstr.substring(0,1);
	// console.log('replaceWildcard2 - TTstr: '+TTstr+', TpreStr:' + TpreStr);

	sumStr += (pos2 !== -1)? Tstr.substring(pos2):'';
	console.log('replaceWildcard2 - sumStr END:' + sumStr);

	return sumStr;
}
console.log('replaceWildcard2 - OUTPUT 1: ' + replaceWildcard2('Du har ???+3 gode cykler tilrådighed, eller ???-3 dårlige?', 10)); 
console.log('replaceWildcard2 - OUTPUT 2: ' + replaceWildcard2('Du har ???+3 gode cykler tilrådighed, eller ???-1 og ??? .', 20));
console.log('replaceWildcard2 - OUTPUT 3: ' + replaceWildcard2('Du har ???-13 gode cykler tilrådighed, eller ???-9 dårlige?', 30));
console.log('replaceWildcard2 - OUTPUT 4: ' + replaceWildcard2('Du har ???-23 gode cykler tilrådighed, eller ??? dårlige?', 30));
console.log('replaceWildcard2 - OUTPUT 5: ' + replaceWildcard2('Du har ???-23 gode cykler tilrådighed, eller ???-32.', 50));





function returnDropdownMarkup(DropdownObj){
    var Selected = -1;
    var DO = DropdownObj;
    console.log("DO: " + DO);
    var HTML = '<select'+((DO.hasOwnProperty("id"))?' id="'+DO.id+'"':"")+((DO.hasOwnProperty("class"))?' class="'+DO.class+'"':"")+'>';
    if (DO.hasOwnProperty("selected"))
            Selected = parseInt( DO.selected );
            console.log("returnDropdownMarkup - Selected: " + Selected);
    var DOO = DropdownObj.options;
    for (n in DOO){
        HTML += '<option'+((DOO[n].hasOwnProperty("id"))?' id="'+DOO[n].id+'"':"")+((DOO[n].hasOwnProperty("class"))?' class="'+DOO[n].class+'"':"")+((n == Selected)?' disabled selected':"")+' value="'+((n == Selected)?'':DOO[n].value)+'">'+DOO[n].value+'</option>';
        // HTML += '<option'+((DOO[n].hasOwnProperty("id"))?' id="'+DOO[n].id+'"':"")+((DOO[n].hasOwnProperty("class"))?' class="'+DOO[n].class+'"':"")+' value="'+((n == Selected)?'':DOO[n].value)+'">'+DOO[n].value+'</option>';
        
        // HTML += '<option'+((DOO[n].hasOwnProperty("id"))?' id="'+DOO[n].id+'"':"")+((DOO[n].hasOwnProperty("class"))?' class="'+DOO[n].class+'"':"")+' value="'+DOO[n].value+'">'+DOO[n].value+'</option>';
    };
    HTML += "</select>";
    return HTML;
}

var TDropdown = {id:"Dropdown1", class:"Dropdown", selected: "1",
                    options:[
                        {id:"id1", class:"class1", value:"val 1"},
                        {id:"id2", class:"class2", value:"val 2"},
                        {id:"id3", class:"class3", value:"val 2"}
                    ]
                };
var TDropdown2 = {options:[
                    {value:"val 1"},
                    {value:"val 2"},
                    {value:"val 2"}]
                };
// console.log("returnDropdownMarkup: " + returnDropdownMarkup(TDropdown));
// console.log("returnDropdownMarkup: " + returnDropdownMarkup(TDropdown2));




function getJsonDataArrayIndex(stepNo){
	console.log('getJsonDataArrayIndex - jsonData.steps: ' + JSON.stringify(jsonData.steps));
	for (var n in jsonData.steps){
		console.log('getJsonDataArrayIndex - jsonData.steps['+n+'].step: ' + jsonData.steps[n].step);
		if (jsonData.steps[n].step == stepNo){
			return n;
		}
	}
	alert("getJsonDataArrayIndex ERROR: stepNo not found!");
	return null;
}


function htmlEntities(str) {
    return String(str).replace(/\$/g, '&#36;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}


function returnLastStudentSession() {
	window.osc = Object.create(objectStorageClass);
	osc.init('studentSession_2');
	osc.exist('jsonData');

	// osc.startAutoSave('test1', [1,2,3], 500);
	// osc.setAutoSaveMaxCount('test1', 5);

	// osc.startAutoSave('test2', [4,5,6], 1000);
	// osc.setAutoSaveMaxCount('test2', 10);

	// osc.startAutoSave('test3', [7,8,9], 1500);
	// osc.setAutoSaveMaxCount('test3', 15);

	var TjsonData = osc.load('jsonData');
	console.log('returnLastStudentSession - TjsonData: ' + JSON.stringify(TjsonData));
	
	if ((TjsonData !== null) && (typeof(TjsonData) !== 'undefined')){
		console.log('returnLastStudentSession - getTimeStamp: ' + osc.getTimeStamp());
	// if (TjsonData !== null){
		var HTML = '';
		HTML += 'Du har lavet denne øvelse før, og indtastet data i øvelsen.';
		HTML += '<div> <span id="objectStorageClass_yes" class="objectStorageClass btn btn-info">Jeg ønsker at fortsætte hvor jeg slap</span> <span id="objectStorageClass_no" class="objectStorageClass btn btn-info">Jeg ønsker starte forfra</span> </div>';
		UserMsgBox("body", HTML);

	    $('#UserMsgBox').unbind('click');
	    $('.MsgBox_bgr').unbind('click');

	    $( document ).on('click', "#objectStorageClass_yes", function(event){
	        console.log("objectStorageClass.init - objectStorageClass_yes - CLICK" );
	        $(".MsgBox_bgr").fadeOut(200, function() {
	            $(this).remove();
	        });
	       
	        jsonData = TjsonData;
			$('#DataInput').html(eval('step_'+TjsonData.currentStep+'_template()'));
			if (!isLastStep(TjsonData.currentStep)) {
				console.log('returnLastStudentSession - NOT LAST STEP');
				setJsAudioEventLitsner();
			} else {
				console.log('returnLastStudentSession - LAST STEP');
			}
			
	    });

	    $( document ).on('click', "#objectStorageClass_no", function(event){
	    	// osc.stopAutoSave('test1');
	        console.log("objectStorageClass.init - objectStorageClass_no - CLICK" );
	        osc.delete(osc.localStorageObjName);
	        $(".MsgBox_bgr").fadeOut(200, function() {
	            $(this).remove();
	        });

	        $('#DataInput').html(step_0_template());
	        setJsAudioEventLitsner();
	    });
	} else {
		$('#DataInput').html(step_0_template());
		setJsAudioEventLitsner();
	}
}



function returnMissingElements(arrayName, elementName){
	// var JSN = jsonData.studentSelectedTexts[jsonData.selectedTextNo];
	var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];
	var wordArray = [];
	for (var n in JST[arrayName]){  // Find the missing words:
		// var t = JST.textQuotes[n];
		if ((typeof(JST[arrayName][n]) === 'undefined') || (JST[arrayName][n] == '')){
			// if (JSN.subjectTexts[t] != btnPrimaryText){
				
				// wordArray.push(elementName +' '+String(parseInt(n)+1));   // <------- OLD - WORKING OK!

				if (Array.isArray(elementName)) {  // <------- NEW: IF-ELSE CLAUSE
					wordArray.push(elementName[n]);
				} else { // Assume "elementName" is a string:
					wordArray.push(elementName +' '+String(parseInt(n)+1));
				}

			// }
		}
	}
	console.log("returnMissingWords - wordArray 1: " + wordArray );
	// wordArray = removeElement(wordArray, btnPrimaryText);
	wordArray = removeEmptyElements(wordArray);
	var k = wordArray.length;
	var count = 0;
	var HTML = '"';
	console.log("returnMissingWords - k: "+k+", wordArray 2: " + wordArray );
	for (var i in wordArray) {  // Construct a sentence containing the missing words:
		// console.log("returnMissingWords - wordArray["+i+"]: " + wordArray[i] + ", btnPrimaryText: " + btnPrimaryText);

		// if (wordArray[i] != btnPrimaryText){
			if (k-count > 2) HTML += wordArray[i] + '", "';
			if (k-count == 2) HTML += wordArray[i] + '" og "';
			if (k-count == 1) HTML += wordArray[i];
		// }
		++count;
	};
	HTML += '"';
	return HTML;
}




//////////////////////
//  	STEP 0 		//
//////////////////////


function step_0_template(){
	console.log("step_0_template - jsonData 1: " + JSON.stringify(jsonData)); 
	jsonData.currentStep = 0;
	jsonData.autoPlay = true;
	// osc.save('jsonData', jsonData);  // Not necessary to save step 0!
	// osc.exist('jsonData');	// Not necessary to save step 0!
	var stepNo = 0;
	var HTML = '';
	HTML += '<div id="step_0" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_0" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('img'))?'<img id="stepImg_0" class="img-responsive" src="'+jsonData.steps[stepNo].img.src+'" alt="'+jsonData.steps[stepNo].img.alt+'"/>':'');
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_0_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
	HTML +=					'<div class="Clear"></div>';
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	return HTML;
}

$( document ).on('click', "#step_0_goOn", function(event){
	$('#DataInput').html(step_1_template());
	setJsAudioEventLitsner();
});


//////////////////////
//  	STEP 1 		//	CHOOSE YOUR TEKST
//////////////////////

// "subjects" : ["Rygning", "Syrien", "Atomkraft", "Grafitti", "Spis mindre kød", "Doping", "Prostitution", "Lægeordineret heroin", "Fri hash"],

// textNo

// jsonData.studentSelectedTexts : [{"textNo":"Prostitution","selected":false,"subjectTexts":[]}]

// MARK 10:49 - COPY/REPLACE: studentSelectedSubject  --->  studentSelectedTexts

function step_1_template(){
	console.log("step_1_template - jsonData 1: " + JSON.stringify(jsonData)); 
	jsonData.currentStep = 1;
	osc.save('jsonData', jsonData);
	var stepNo = 1;
	var textNo = null;
	// if (jsonData.hasOwnProperty("studentSelectedTexts")){
	if (jsonData.hasOwnProperty("selectedTextNo")){
		// textNo = getSelected('textNo');
		textNo = jsonData.selectedTextNo;
	}

	if (jsonData.hasOwnProperty("studentSelectedTexts")){
	    	textNo = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum].textNo;
    }

	console.log("step_1_template - textNo: " + textNo); 
	var HTML = '';
	HTML += '<div id="step_1" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_1" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');
	HTML += 			'<div id="TextContainer" class="btnActions">';
			var JT = jsonData.texts;
			for (var n in JT){
				HTML += 	'<span class="Texts btn btn-'+((textNo == n)?'primary':'info')+'" >'+JT[n].author+': "'+JT[n].title+'", '+JT[n].year+'</span>';
			}
	HTML += 			'</div>';
	// HTML += 			'<div class="stepInput">';
	// HTML += 				'<span class="helperText">Eller vælg dit eget emne:</span>';
	// HTML +=					returnInputBoxes3(1, 'studentSubject', 'Skriv dit emne her...');
	// HTML += 			'</div>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_1_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
	HTML +=					'<div class="Clear"></div>';
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	return HTML;
}



$( document ).on('click', ".Texts", function(event){
	window.studentTextPressed = true;
    console.log("Subjects - PRESSED");
    $('.Texts').removeClass('btn-primary').addClass('btn-info');
    $(this).addClass('btn-primary');

    // $('.studentSubject').val('');

    var studentSelectedTexts = $(this).text();
    var textNo = $(this).index();
    console.log("Subjects - textNo: " + textNo); 

    if (!jsonData.hasOwnProperty("studentSelectedTexts")){
    	jsonData.studentSelectedTexts = [];
    }

    if (!elementInArray(returnStudentTextArray(), textNo)) {  // If studentSelectedTexts is not allready in studentSelectedTexts.textNo, then add it: 
    	// jsonData.studentSelectedTexts.push({textNo: studentSelectedTexts, selected: false, subjectTexts: [] });
    	jsonData.studentSelectedTexts.push({textNo: textNo, selected: false, subjectTexts: [] });
	}

    console.log("Subjects - jsonData.studentSelectedTexts 1: " + JSON.stringify(jsonData.studentSelectedTexts)); 

    // if (!studentChangeSubject(studentSelectedTexts)){
	    for (var n in jsonData.studentSelectedTexts){
	    	if (textNo == jsonData.studentSelectedTexts[n].textNo){
	    		jsonData.studentSelectedTexts[n].selected = true;
	    	} else {
	    		jsonData.studentSelectedTexts[n].selected = false;
	    	}
	    }
	// }

	// jsonData.selectedTextNo = textNo; // = returnElementNumInArray(returnStudentTextArray(), studentSelectedTexts);
	jsonData.selectedTextIndexNum = getSelectedIndexNum();
	console.log("Subjects - jsonData.selectedTextIndexNum: " + jsonData.selectedTextIndexNum);  // <------- ########  SE HER !!! ##############

    console.log("Subjects - jsonData.studentSelectedTexts 2: " + JSON.stringify(jsonData.studentSelectedTexts)); 

    var JT = jsonData.texts[textNo];
    console.log("Subjects - JT: " + JSON.stringify(JT));

    var HTML = '';
    HTML += '<h1>'+JT.title+'</h1> <i>Af '+JT.author+', '+JT.year+'</i> <br/><br/>';
    HTML += '<h4>Tekstuddrag:</h4>'
    HTML += JT.textSnippet;
    HTML += '<br/> <a class="btn btn-lg btn-info" href="'+JT.src+'" target="_blank">Læs pdf i nyt browser vindue</a> <a class="btn btn-lg btn-info" href="'+JT.src+'" download="'+String(JT.src.split('/').pop())+'">Download pdf</a>';

    // UserMsgBox("body", '<h1>'+JT.title+'</h1> <i>Af '+JT.author+', '+JT.year+'</i><br/><br/>'+'<a href="test.pdf" target="_blank">test-pdf</a> <a href="test.pdf" download="test.pdf">Download the pdf</a> <br/> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> <br/> <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p> <br/> <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>');
    UserMsgBox("body", HTML);

});

$( document ).on('click', "#step_1_goOn", function(event){

	if (typeof(fallbackStudentTextNo) === 'undefined'){
		window.fallbackStudentTextNo = null;
	}

	// var studentSubject = htmlEntities($('.studentSubject').val());
	// console.log("step_1_goOn - studentSubject: " + studentSubject + ", studentSubject.length: " + studentSubject.length);

	// 	if (studentSubject.length > 0){

	// 		console.log("step_1_goOn - jsonData 1: " + JSON.stringify(jsonData)); 

	// 	    if (!elementInArray(returnStudentTextArray(), studentSubject)){

	// 			if (!jsonData.hasOwnProperty("studentSelectedTexts")){
	// 		    	jsonData.studentSelectedTexts = [];
	// 		    }

	// 			for (var n in jsonData.studentSelectedTexts){
	// 		    	jsonData.studentSelectedTexts[n].selected = false;
	// 		    }

	// 			jsonData.studentSelectedTexts.push({textNo: studentSubject, selected: true, subjectTexts: [] });
	// 		}
	// 		// jsonData.Themes.push(studentSubject);  // Commented out 08-01-2016: We desided against saveing all subjects.

	// 		jsonData.selectedTextNo = returnElementNumInArray(returnStudentTextArray(), studentSubject);
	// 		console.log("step_1_goOn - jsonData.selectedTextNo: " + jsonData.selectedTextNo);  // <------- ########  SE HER !!! ##############
	// 		jsonData.studentSelectedTexts[jsonData.selectedTextNo].selected = true;
	// 		console.log("step_1_goOn - jsonData.studentSelectedTexts 0: " + JSON.stringify(jsonData.studentSelectedTexts));

	// 	}

		console.log("step_1_goOn - fallbackStudentTextNo: " + fallbackStudentTextNo); 
		console.log("step_1_goOn - jsonData.studentSelectedTexts 1: " + JSON.stringify(jsonData.studentSelectedTexts)); 

		console.log("step_1_goOn - fallbackStudentTextNo: " + fallbackStudentTextNo);

		if ((typeof(studentTextPressed) !== "undefined") && (studentTextPressed == true)){

		    // ORGINAL KODE:
			fallbackStudentTextNo = jsonData.selectedTextNo;
		 	$('#DataInput').html(step_2_template());
		 	setJsAudioEventLitsner();
		} else {
			UserMsgBox("body", "Du skal vælge en tekst før du kan gå videre!");
		}
	// }
});


//////////////////////
//  	STEP 2 		//   // CHOOSE YOUR THEME
//////////////////////


function step_2_template(){
	console.log("step_2_template - jsonData 1: " + JSON.stringify(jsonData)); 
	jsonData.currentStep = 2;
	osc.save('jsonData', jsonData);
	var stepNo = 2;
	var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];
	console.log("step_2_template - JST: " + JSON.stringify(JST));
	var studentTheme = null;
	if (JST.hasOwnProperty("studentTheme")){
		studentTheme = JST.studentTheme;
	}
	console.log("step_2_template - studentTheme: " + studentTheme);
	console.log("step_2_template - jsonData.texts["+JST.textNo+"].title: " + jsonData.texts[JST.textNo].title);

	var HTML = '';
	HTML += '<div id="step_2" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_2" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction + '&quot;'+jsonData.texts[JST.textNo].title+'&quot;'):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');
	HTML += 			'<div id="ThemeContainer" class="btnActions">';
			// var JS = jsonData.themes;
			var JTT = jsonData.texts[JST.textNo].themes;
			for (var n in JTT){
				HTML += 	'<span class="Themes btn btn-'+((studentTheme === JTT[n])?'primary':'info')+'" >'+JTT[n]+'</span>';
			}
	HTML += 			'</div>';
	HTML += 			'<div class="stepInput">';
	HTML += 				'<span class="helperText">Eller vælg dit eget tema: </span>';

		// studentTheme = (((JST.hasOwnProperty('studentTheme')) && (!elementInArray(jsonData.themes, JST.studentTheme))))? JST.studentTheme : 'Skriv dit tema her...';
		studentTheme = (((JST.hasOwnProperty('studentTheme')) && (!elementInArray(JTT, JST.studentTheme))))? JST.studentTheme : 'Skriv dit tema her...';
		// if ((JST.hasOwnProperty('TextTheme')) && (!elementInArray(jsonData.themes, JST.TextTheme))) {

		// }
	HTML += 			returnInputBoxes3(1, 'studentTheme', studentTheme);

	// HTML +=					returnInputBoxes3(1, 'studentTheme', 'Skriv dit tema her...');
	HTML += 			'</div>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_2_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_2_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
	HTML +=					'<div class="Clear"></div>';
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	return HTML;
}



$( document ).on('focusin', ".studentTheme", function(event){
	$('.Themes').removeClass('btn-primary').addClass('btn-info');
});


$( document ).on('click', ".Themes", function(event){
	window.studentThemePressed = true;
    console.log("Subjects - PRESSED");
    $('.Themes').removeClass('btn-primary').addClass('btn-info');
    $(this).addClass('btn-primary');

    $('.studentTheme').val('');
    $('.studentTheme').prop('placeholder', 'Skriv dit tema her...');

    var studentTheme = $(this).text();
    var themeNo = $(this).index();

    var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];
    if (!JST.hasOwnProperty("studentTheme")){
    	JST.studentTheme = null;
    }
    JST.studentTheme = studentTheme;

    console.log("Themes - jsonData.studentSelectedTexts: " + JSON.stringify(jsonData.studentSelectedTexts));
    console.log("Themes - jsonData: " + JSON.stringify(jsonData));  
});


$( document ).on('click', "#step_2_goBack", function(event){
	$('#DataInput').html(step_1_template());
	setJsAudioEventLitsner();
});


$( document ).on('click', "#step_2_goOn", function(event){

	if (typeof(fallbackStudentTheme) === 'undefined'){
		window.fallbackStudentTheme = null;
	}

	var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];

	var studentTheme = htmlEntities($('.studentTheme').val());
	console.log("step_2_goOn - studentTheme: " + studentTheme + ", studentTheme.length: " + studentTheme.length);

	if ((studentTheme.length > 0)){

		console.log("step_2_goOn - jsonData 1: " + JSON.stringify(jsonData)); 

	    if (!elementInArray(jsonData.themes, studentTheme)){

			if (!JST.hasOwnProperty("studentTheme")){
		    	JST.studentTheme = null;
		    }

			jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum].studentTheme = studentTheme;
		}
	}

	console.log("step_2_goOn - fallbackStudentTheme: " + fallbackStudentTheme); 
	console.log("step_2_goOn - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 

	console.log("step_2_goOn - fallbackStudentTheme: " + fallbackStudentTheme + ", studentTheme: " + studentTheme);

	if (((typeof(studentThemePressed) !== "undefined") && (studentThemePressed == true)) || (studentTheme.length > 0)){

	    // ORGINAL KODE:
		fallbackStudentTheme = studentTheme;
	 	$('#DataInput').html(step_3_template());
	 	setJsAudioEventLitsner();
	} else {
		UserMsgBox("body", "Du skal vælge et tema, eller skrive et valfrit tema, før du kan gå videre!");
	}
});



//////////////////////
//  	STEP 3 		//  PUT WORDS ON YOUR THEME
//////////////////////


function step_3_template(){
	console.log("step_3_template - jsonData 1: " + JSON.stringify(jsonData)); 
	jsonData.currentStep = 3;
	osc.save('jsonData', jsonData);
	var stepNo = 3;

	var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];

	var HTML = '';
	HTML += '<div id="step_3" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_3" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div id="subjectTextThemeContainer" class="btnActions">';
			
	HTML += 				'<div class="DropdownWrap">';
	HTML += 					returnDropdownMarkup(jsonData.sentenceStarters_theme);
	HTML += 				'</div>';

	HTML += 				'<textarea id="textInputTheme" val="">';
				if (JST.hasOwnProperty('TextTheme')) {
					HTML += JST.TextTheme;
				}			
	HTML += 				'</textarea>';

	HTML += 			'</div>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_3_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_3_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	return HTML;
}

$(document).on('change', '#Dropdown0', function(){
	// var selectedText = $('#Dropdown1:selected').text();
	var textInputTheme = $('#Dropdown0').val();
	console.log("textInputTheme - textInputTheme: " + textInputTheme);
	$('#textInputTheme').val(textInputTheme);
});


$( document ).on('click', "#step_3_goBack", function(event){
	$('#DataInput').html(step_2_template());
	setJsAudioEventLitsner();
});


$( document ).on('click', "#step_3_goOn", function(event){

	var TextTheme = $('#textInputTheme').val();
	if (TextTheme.length > 0){
		var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];
		if (!JST.hasOwnProperty('TextTheme')){
			JST.TextTheme = null;
		}

		JST.TextTheme = TextTheme;
		
		$('#DataInput').html(step_4_template());
		setJsAudioEventLitsner();
		
	} else {
		UserMsgBox("body", 'Du skal formulere hvad dit tema handler om i tekstboksen. Brug evt. sætningsstarterne i dropdownmenuen som inspiration til din formulering.');
	}
});



//////////////////////
//  	STEP 4 		//	ANALYTICAL FOCUS
//////////////////////



function step_4_template(){
	console.log("step_4_template - jsonData 1: " + JSON.stringify(jsonData)); 
	jsonData.currentStep = 4;
	osc.save('jsonData', jsonData);
	var stepNo = 4;

	var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];

	var analyticalFocus = null;
	// if (jsonData.hasOwnProperty("studentSelectedTexts")){
	if (JST.hasOwnProperty("analyticalFocus")){
		// textNo = getSelected('textNo');
		analyticalFocus = JST.analyticalFocus;
	}
	console.log("step_4_template - analyticalFocus: " + analyticalFocus); 
	var HTML = '';
	HTML += '<div id="step_4" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_4" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');
	HTML += 			'<div id="analyticalFocusContainer" class="btnActions">';
			var JA = jsonData.analyticalFocus;
			for (var n in JA){
				HTML += 	'<span class="AnalyticalFocus btn btn-'+((analyticalFocus == n)?'primary':'info')+'" >'+JA[n].name+'</span>';
			}
	HTML += 			'</div>';
	// HTML += 			'<div class="stepInput">';
	// HTML += 				'<span class="helperText">Eller vælg dit eget emne:</span>';
	// HTML +=					returnInputBoxes3(1, 'studentSubject', 'Skriv dit emne her...');
	// HTML += 			'</div>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_4_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_4_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
	HTML +=					'<div class="Clear"></div>';
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	return HTML;
}


$( document ).on('click', "#step_4_goBack", function(event){
	$('#DataInput').html(step_3_template());
	setJsAudioEventLitsner();
});

$( document ).on('click', ".AnalyticalFocus", function(event){
	
    console.log("AnalyticalFocus - PRESSED");
    $('.AnalyticalFocus').removeClass('btn-primary').addClass('btn-info');
    $(this).addClass('btn-primary');

    // $('.studentSubject').val('');

    var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];

    var studentSelectedTexts = $(this).text();
    var analyticalFocus = $(this).index();
    console.log("AnalyticalFocus - analyticalFocus: " + analyticalFocus); 

    if (!JST.hasOwnProperty("analyticalFocus")){
    	JST.analyticalFocus = null;
    }

    JST.analyticalFocus = analyticalFocus;

    console.log("AnalyticalFocus - jsonData.studentSelectedTexts 1: " + JSON.stringify(jsonData.studentSelectedTexts)); 

	console.log("AnalyticalFocus - $(this).index(): " + parseInt($(this).index()));    
    UserMsgBox("body", jsonData.analyticalFocus[parseInt($(this).index())].description);
});

$( document ).on('click', "#step_4_goOn", function(event){

	console.log("step_4_goOn - jsonData.studentSelectedTexts 1: " + JSON.stringify(jsonData.studentSelectedTexts)); 

	var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];
	if (JST.hasOwnProperty("analyticalFocus")){

	 	$('#DataInput').html(step_5_template());
	 	setJsAudioEventLitsner();
	} else {
		UserMsgBox("body", "Du skal vælge et analytisk fokuspunkt før du kan gå videre!");
	}
});



//#################################
//
//		OLD STEP 4
//
//#################################

//////////////////////
//  	STEP 5		//	FIND QUOTES IN THE TEXT
//////////////////////

function step_5_template(){
	jsonData.currentStep = 5;
	osc.save('jsonData', jsonData);
	console.log("step_5_template - quoteCount: " + ((typeof(quoteCount) !== 'undefined')?quoteCount:'undefined'));
	console.log("step_5_template - jsonData 1: " + JSON.stringify(jsonData)); 
	console.log("step_5_template - jsonData.studentSelectedTexts 1: " + JSON.stringify(jsonData.studentSelectedTexts)); 
	if ((typeof(quoteCount) === 'undefined') || (quoteCount === null)) { 
		window.quoteCount = 0;
	} else {
		++quoteCount;
	}
	if (typeof(autoPlay) === 'undefined'){
		window.autoPlay = true;
	} 
	if (typeof(TautoPlay) === 'undefined'){
		window.TautoPlay = autoPlay;  // This remembers the state before step 4.
		console.log("step_4_template - TautoPlay: " + TautoPlay);
	}
	if (quoteCount > 0) {  // This ensures that the player does not start when the word-buttons > 0 are pressed.
		autoPlay = false;
	}
	console.log("step_5_template - quoteCount: " + quoteCount);

	// var JSN = jsonData.studentSelectedTexts[jsonData.selectedTextNo];
	var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];  // <-----  NEW!
	var textQuotes = [];
	if (JST.hasOwnProperty("textQuotes")){
		// textNo = getSelected('textNo');
		textQuotes = JST.textQuotes;
	}
	var stepNo = 5;
	var HTML = '';
	HTML += '<div id="step_5" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';

	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_5" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div id="TextAndQuoteContainer">';
			
	HTML +=				'<span class="Texts btn btn-info" >'+jsonData.texts[JST.textNo].author+': "'+jsonData.texts[JST.textNo].title+'", '+jsonData.texts[JST.textNo].year+'</span>';
	
	HTML += 				'<div id="QuoteContainer" class="btnActions">';
				for (var i = 0; i < jsonData.numOfChoosenWords; i++) {
					HTML += 	'<span class="quoteBtn btn btn-'+((i==quoteCount)?'primary':'info')+'">Citat '+String(i+1)+'</span>';
				}
	HTML += 				'</div>';


	HTML += 			'</div>';

	HTML += 			'<textarea id="textInput_'+quoteCount+'" val="">';
			if ((JST.hasOwnProperty('textQuotes')) && (typeof(JST.textQuotes[quoteCount]) !== 'undefined')) {
				HTML += JST.textQuotes[quoteCount];
			}			
	HTML += 			'</textarea>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_5_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_5_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	return HTML;
}



$( document ).on('click', ".quoteBtn", function(event){
	var index = $(this).index();
	console.log("quoteBtn - index: " + index);
	 
	// -----------------------
	console.log("quoteBtn - jsonData.studentSelectedTexts 1: " + JSON.stringify(jsonData.studentSelectedTexts)); 
	var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];
	if (!JST.hasOwnProperty('textQuotes')){
		JST.textQuotes = [];
		for (var i = 0; i < jsonData.numOfChoosenWords; i++) {
			JST.textQuotes.push('');
		};
	}

	var sentence = $('#textInput_'+quoteCount).val();
	console.log("quoteBtn - quoteCount: " + quoteCount + ", sentence: " + sentence);
	console.log("quoteBtn - $('#textInput_'+quoteCount).val(): " + $('#textInput_'+quoteCount).val());
	
	if (quoteCount < jsonData.numOfChoosenWords-1){
		// JSN.subjectTexts_sentences.push(sentence);
		JST.textQuotes[quoteCount] = sentence;
		// $('#DataInput').html(step_4_template());
		console.log("quoteBtn - jsonData.studentSelectedTexts 2: " + JSON.stringify(jsonData.studentSelectedTexts)); 
	} 
	// else {
	// 	JST.subjectTexts_sentences[quoteCount] = sentence;
	// 	// $('#DataInput').html(step_4b_template());
	// 	console.log("quoteBtn - jsonData.studentSelectedTexts 3: " + JSON.stringify(jsonData.studentSelectedTexts));
	// 	// makeSortable();
	// }

	// -----------------------
	quoteCount = index-1; 
	$('#DataInput').html(step_5_template());   // 12-01-2016  <-----------  DATA SKAL GEMMENS HER!!!
	setJsAudioEventLitsner();
});


$( document ).on('click', "#step_5_goBack", function(event){
	if ((typeof(quoteCount) === 'undefined') || (quoteCount == 0)){
		$('#DataInput').html(step_4_template());
		setJsAudioEventLitsner();
		quoteCount = null;
		console.log("step_4_goBack - quoteCount: " + quoteCount);
	} else {
		--quoteCount;  	// Once...
		--quoteCount;	// twice... because of the inscreasement inside step_XXX_template
		$('#DataInput').html(step_5_template());
		setJsAudioEventLitsner();
	}
});

$( document ).on('click', "#step_5_goOn", function(event){
	console.log("step_4_goOn - jsonData.studentSelectedTexts 1: " + JSON.stringify(jsonData.studentSelectedTexts)); 
	var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];
	if (!JST.hasOwnProperty('textQuotes')){
		JST.textQuotes = [];
		for (var i = 0; i < jsonData.numOfChoosenWords; i++) {
			JST.textQuotes.push('');
		};
	}

	var btnPrimaryText = $("#subjectWordSentenceContainer .btn-primary").text();

	var sentence = htmlEntities($('#textInput_'+quoteCount).val());
	console.log("step_4_goOn - quoteCount: " + quoteCount + ", sentence: " + sentence);
	console.log("step_4_goOn - $('#textInput_'+quoteCount).val(): " + $('#textInput_'+quoteCount).val());
	if (sentence.length > 0) {
		// if (quoteCount < jsonData.numOfChoosenWords-1){
		// 	JSN.subjectTexts_sentences[quoteCount] = sentence;
		// 	console.log("step_4_goOn - jsonData.studentSelectedTexts 2: " + JSON.stringify(jsonData.studentSelectedTexts));
			
		// 	$('#DataInput').html(step_4_template());
			
		// } else {
			JST.textQuotes[quoteCount] = sentence;
			console.log("step_4_goOn - jsonData.studentSelectedTexts 3: " + JSON.stringify(jsonData.studentSelectedTexts));
			if (!hasNonEmptyStrElm( JST.textQuotes )){
				// JSN.subjectTexts_sentences[quoteCount] = sentence;
				console.log("step_4_goOn - jsonData.studentSelectedTexts 4: " + JSON.stringify(jsonData.studentSelectedTexts));
				autoPlay = (typeof(TautoPlay) !== 'undefined')? TautoPlay : autoPlay;  // This sets the remembered state before step 4.
				$('#DataInput').html(step_6_template());
				setJsAudioEventLitsner();
				// makeSortable();
			} else {
				UserMsgBox("body", 'Du skal skrive citater i alle tekstboksene til hver ord - du mangler at skrive citat til '+returnMissingElements('textQuotes', 'Citat')+'. Tryk på citatknapperne ord og skriv sætninger til dem.');
			}
		// }

	} else {
		UserMsgBox("body", "Du skal skrive citater i tekstboksene før du kan gå videre!");
	}

});


function returnMissingWords(btnPrimaryText){
	// var JSN = jsonData.studentSelectedTexts[jsonData.selectedTextNo];
	var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];
	var wordArray = [];
	for (var n in JST.textQuotes){  // Find the missing words:
		// var t = JST.textQuotes[n];
		if ((typeof(JST.textQuotes[n]) === 'undefined') || (JST.textQuotes[n] == '')){
			// if (JSN.subjectTexts[t] != btnPrimaryText){
				
				// wordArray.push(JST.subjectTexts[t]);
				wordArray.push('Citat '+String(parseInt(n)+1));

			// }
		}
	}
	console.log("returnMissingWords - wordArray 1: " + wordArray );
	// wordArray = removeElement(wordArray, btnPrimaryText);
	wordArray = removeEmptyElements(wordArray);
	var k = wordArray.length;
	var count = 0;
	var HTML = '"';
	console.log("returnMissingWords - k: "+k+", wordArray 2: " + wordArray );
	for (var i in wordArray) {  // Construct a sentence containing the missing words:
		console.log("returnMissingWords - wordArray["+i+"]: " + wordArray[i] + ", btnPrimaryText: " + btnPrimaryText);

		// if (wordArray[i] != btnPrimaryText){
			if (k-count > 2) HTML += wordArray[i] + '", "';
			if (k-count == 2) HTML += wordArray[i] + '" og "';
			if (k-count == 1) HTML += wordArray[i];
		// }
		++count;
	};
	HTML += '"';
	return HTML;
}



//#################################
//
//		OLD STEP 4
//
//#################################

//////////////////////
//  	STEP 6		//	WRITE TEXTS TO YOUR QUOTES
//////////////////////

function step_6_template(){
	jsonData.currentStep = 6;
	osc.save('jsonData', jsonData);
	console.log("step_6_template - quoteCount: " + ((typeof(quoteNoteCount) !== 'undefined')?quoteNoteCount:'undefined'));
	console.log("step_6_template - jsonData 1: " + JSON.stringify(jsonData)); 
	console.log("step_6_template - jsonData.studentSelectedTexts 1: " + JSON.stringify(jsonData.studentSelectedTexts)); 
	if ((typeof(quoteNoteCount) === 'undefined') || (quoteNoteCount === null)) { 
		window.quoteNoteCount = 0;
	} else {
		++quoteNoteCount;
	}
	if (typeof(autoPlay) === 'undefined'){
		window.autoPlay = true;
	} 
	if (typeof(TautoPlay) === 'undefined'){
		window.TautoPlay = autoPlay;  // This remembers the state before step 4.
		console.log("step_4_template - TautoPlay: " + TautoPlay);
	}
	if (quoteNoteCount > 0) {  // This ensures that the player does not start when the word-buttons > 0 are pressed.
		autoPlay = false;
	}
	console.log("step_6_template - quoteNoteCount: " + quoteNoteCount);

	// var JSN = jsonData.studentSelectedTexts[jsonData.selectedTextNo];
	var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];  // <-----  NEW!
	var textQuoteNotes = [];
	if (JST.hasOwnProperty("textQuoteNotes")){
		// textNo = getSelected('textNo');
		textQuoteNotes = JST.textQuoteNotes;
	}
	var stepNo = 6;
	var HTML = '';
	HTML += '<div id="step_6" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';

	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_6" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div id="TextAndQuoteContainer">';
			
	HTML +=				'<span class="Texts btn btn-info" >'+jsonData.texts[JST.textNo].author+': "'+jsonData.texts[JST.textNo].title+'", '+jsonData.texts[JST.textNo].year+'</span>';
	
	HTML += 				'<div id="QuoteContainer" class="btnActions">';
				for (var i = 0; i < jsonData.numOfChoosenWords; i++) {
					HTML += 	'<span class="quoteNoteBtn btn btn-'+((i==quoteNoteCount)?'primary':'info')+'">Udlægning '+String(i+1)+'</span>';
				}
	HTML += 				'</div>';


	HTML += 			'</div>';

	HTML += 			'<div class="QuoteHolder TextHolder"> &quot;<i>';
				HTML += JST.textQuotes[quoteNoteCount];
	HTML += 			'</i>&quot; </div>';

	HTML += 				'<div class="DropdownWrap">';
	HTML += 					returnDropdownMarkup(jsonData.sentenceStarters_quoteNote);
	HTML += 				'</div>';

	HTML += 			'<textarea id="textInput_'+quoteNoteCount+'" class="textInputQuoteNote">';
			if ((JST.hasOwnProperty('textQuoteNotes')) && (typeof(JST.textQuoteNotes[quoteNoteCount]) !== 'undefined')) {
				HTML += JST.textQuoteNotes[quoteNoteCount];
			}			
	HTML += 			'</textarea>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_6_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_6_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	return HTML;
}


$(document).on('change', '#Dropdown1', function(){
	// var selectedText = $('#Dropdown1:selected').text();
	var textInputTheme = $('#Dropdown1').val();
	console.log("textInputTheme - textInputTheme: " + textInputTheme);
	$('.textInputQuoteNote').val(textInputTheme);
});


$( document ).on('click', ".quoteNoteBtn", function(event){
	var index = $(this).index();
	console.log("quoteBtn - index: " + index);
	 
	// -----------------------
	console.log("quoteNoteBtn - jsonData.studentSelectedTexts 1: " + JSON.stringify(jsonData.studentSelectedTexts)); 
	var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];
	if (!JST.hasOwnProperty('textQuoteNotes')){
		JST.textQuoteNotes = [];
		for (var i = 0; i < jsonData.numOfChoosenWords; i++) {
			JST.textQuoteNotes.push('');
		};
	}

	var sentence = $('#textInput_'+quoteNoteCount).val();
	console.log("quoteNoteBtn - quoteNoteCount: " + quoteNoteCount + ", sentence: " + sentence);
	console.log("quoteNoteBtn - $('#textInput_'+quoteCount).val(): " + $('#textInput_'+quoteNoteCount).val());
	
	if (quoteNoteCount < jsonData.numOfChoosenWords-1){
		// JSN.subjectTexts_sentences.push(sentence);
		JST.textQuoteNotes[quoteNoteCount] = sentence;
		// $('#DataInput').html(step_4_template());
		console.log("quoteBtn - jsonData.studentSelectedTexts 2: " + JSON.stringify(jsonData.studentSelectedTexts)); 
	} 
	// else {
	// 	JST.subjectTexts_sentences[quoteCount] = sentence;
	// 	// $('#DataInput').html(step_4b_template());
	// 	console.log("quoteBtn - jsonData.studentSelectedTexts 3: " + JSON.stringify(jsonData.studentSelectedTexts));
	// 	// makeSortable();
	// }

	// -----------------------
	quoteNoteCount = index-1; 
	$('#DataInput').html(step_6_template());   // 12-01-2016  <-----------  DATA SKAL GEMMENS HER!!!
	setJsAudioEventLitsner();
});


$( document ).on('click', "#step_6_goBack", function(event){
	if ((typeof(quoteNoteCount) === 'undefined') || (quoteNoteCount == 0)){
		$('#DataInput').html(step_5_template());
		setJsAudioEventLitsner();
		quoteNoteCount = null;
		console.log("step_4_goBack - quoteCount: " + quoteCount);
	} else {
		--quoteNoteCount;  	// Once...
		--quoteNoteCount;	// twice... because of the inscreasement inside step_XXX_template
		$('#DataInput').html(step_6_template());
		setJsAudioEventLitsner();
	}
});

$( document ).on('click', "#step_6_goOn", function(event){
	console.log("step_4_goOn - jsonData.studentSelectedTexts 1: " + JSON.stringify(jsonData.studentSelectedTexts)); 
	var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];
	if (!JST.hasOwnProperty('textQuoteNotes')){
		JST.textQuoteNotes = [];
		for (var i = 0; i < jsonData.numOfChoosenWords; i++) {
			JST.textQuoteNotes.push('');
		};
	}

	var btnPrimaryText = $("#subjectWordSentenceContainer .btn-primary").text();

	var sentence = htmlEntities($('#textInput_'+quoteNoteCount).val());
	console.log("step_4_goOn - quoteCount: " + quoteNoteCount + ", sentence: " + sentence);
	console.log("step_4_goOn - $('#textInput_'+quoteCount).val(): " + $('#textInput_'+quoteNoteCount).val());
	if (sentence.length > 0) {
		// if (quoteCount < jsonData.numOfChoosenWords-1){
		// 	JSN.subjectTexts_sentences[quoteCount] = sentence;
		// 	console.log("step_4_goOn - jsonData.studentSelectedTexts 2: " + JSON.stringify(jsonData.studentSelectedTexts));
			
		// 	$('#DataInput').html(step_4_template());
			
		// } else {
			JST.textQuoteNotes[quoteNoteCount] = sentence;
			console.log("step_4_goOn - jsonData.studentSelectedTexts 3: " + JSON.stringify(jsonData.studentSelectedTexts));
			if (!hasNonEmptyStrElm( JST.textQuoteNotes )){
				// JSN.subjectTexts_sentences[quoteCount] = sentence;
				console.log("step_4_goOn - jsonData.studentSelectedTexts 4: " + JSON.stringify(jsonData.studentSelectedTexts));
				autoPlay = (typeof(TautoPlay) !== 'undefined')? TautoPlay : autoPlay;  // This sets the remembered state before step 4.
				$('#DataInput').html(step_7_template());
				setJsAudioEventLitsner();
				// makeSortable();
			} else {
				UserMsgBox("body", 'Du skal skrive en udlægning af alle citaterne i tekstboksene - du mangler at skrive en udlægning til '+returnMissingElements('textQuoteNotes', 'Udlægning')+'. Tryk på citatknapperne ord og skriv udlægninger til dem.');
			}
		// }

	} else {
		UserMsgBox("body", "Du skal skrive udlægninger til citaterne i tekstboksene før du kan gå videre!");
	}

});



//#################################
//
//		OLD STEP 4
//
//#################################

//////////////////////
//  	STEP 7		//	WRITE TEXTS TO CONNECT YOUR PASSAGES
//////////////////////

function step_7_template(){
	jsonData.currentStep = 7;
	osc.save('jsonData', jsonData);
	console.log("step_7_template - quoteCount: " + ((typeof(textPassageCount) !== 'undefined')?textPassageCount:'undefined'));
	console.log("step_7_template - jsonData 1: " + JSON.stringify(jsonData)); 
	console.log("step_7_template - jsonData.studentSelectedTexts 1: " + JSON.stringify(jsonData.studentSelectedTexts)); 
	if ((typeof(textPassageCount) === 'undefined') || (textPassageCount === null)) { 
		window.textPassageCount = 0;
		console.log("step_7_template - textPassageCount DEFINED! ");
	} else {
		++textPassageCount;
	}
	if (typeof(autoPlay) === 'undefined'){
		window.autoPlay = true;
	} 
	if (typeof(TautoPlay) === 'undefined'){
		window.TautoPlay = autoPlay;  // This remembers the state before step 4.
		console.log("step_7_template - TautoPlay: " + TautoPlay);
	}
	if (textPassageCount > 0) {  // This ensures that the player does not start when the word-buttons > 0 are pressed.
		autoPlay = false;
	}
	console.log("step_7_template - textPassageCount: " + textPassageCount);

	// var JSN = jsonData.studentSelectedTexts[jsonData.selectedTextNo];
	var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];  // <-----  NEW!
	var textPassages = [];
	if (JST.hasOwnProperty("textPassages")){
		// textNo = getSelected('textNo');
		textPassages = JST.textPassages;
	}
	var stepNo = 7;
	var HTML = '';
	HTML += '<div id="step_7" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';

	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_7" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div id="TextAndQuoteContainer">';
			
	// HTML +=				'<span class="Texts btn btn-info" >'+jsonData.texts[JST.textNo].author+': "'+jsonData.texts[JST.textNo].title+'", '+jsonData.texts[JST.textNo].year+'</span>';
	
	HTML += 				'<div id="textPassageContainer" class="btnActions">';
				for (var i = 0; i < jsonData.numOfChoosenWords-1; i++) {
					HTML += 	'<span class="textPassageBtn btn btn-'+((i==textPassageCount)?'primary':'info')+'">Sætning '+String(i+1)+'</span>';
				}
	HTML += 				'</div>';

	HTML += 				'<div id="textOverviewContainer" >';
				HTML += 		'<div class="textOverview textOverview_TextTheme">'+
									'<span class="textOverviewSubHeading">Tema:</span> <br/>'+JST.studentTheme+'<br/>'+
									'<span class="textOverviewSubHeading">Temaudlægning:</span> <br/>'+JST.TextTheme+
								'</div>';
				for (var i = 0; i < jsonData.numOfChoosenWords; i++) {
					HTML += 	'<div class="textOverview textOverview_QuotesAndNotes">'+
									'<span class="textOverviewSubHeading">Citat '+String(parseInt(i)+1)+':</span> <br/>'+
									'&quot;<i>'+JST.textQuotes[i]+'</i>&quot;<br/>'+
									'<span class="textOverviewSubHeading">Udlægning til citat '+String(parseInt(i)+1)+':</span> <br/>'+
									JST.textQuoteNotes[i]+
								'</div>';
				}
	HTML += 				'</div>';


	HTML += 			'</div>';

	// HTML += 			'<div class="QuoteHolder TextHolder"> &quot;<i>';
	// 			HTML += JST.textQuotes[textPassageCount];
	// HTML += 			'<i>&quot; </div>';

	HTML += 			'<textarea id="textInput_'+textPassageCount+'" val="">';
			if ((JST.hasOwnProperty('textPassages')) && (typeof(JST.textPassages[textPassageCount]) !== 'undefined')) {
				HTML += JST.textPassages[textPassageCount];
			}			
	HTML += 			'</textarea>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_7_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_7_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	return HTML;
}



$( document ).on('click', ".textPassageBtn", function(event){
	var index = $(this).index();
	console.log("quoteBtn - index: " + index);
	 
	// -----------------------
	console.log("quoteNoteBtn - jsonData.studentSelectedTexts 1: " + JSON.stringify(jsonData.studentSelectedTexts)); 
	var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];
	if (!JST.hasOwnProperty('textPassages')){
		JST.textPassages = [];
		for (var i = 0; i < jsonData.numOfChoosenWords-1; i++) {
			JST.textPassages.push('');
		};
	}

	var sentence = $('#textInput_'+textPassageCount).val();
	console.log("quoteNoteBtn - textPassageCount: " + textPassageCount + ", sentence: " + sentence);
	console.log("quoteNoteBtn - $('#textInput_'+textPassageCount).val(): " + $('#textInput_'+textPassageCount).val());
	
	if (textPassageCount < jsonData.numOfChoosenWords-1){
		// JSN.subjectTexts_sentences.push(sentence);
		JST.textPassages[textPassageCount] = sentence;
		// $('#DataInput').html(step_4_template());
		console.log("quoteBtn - jsonData.studentSelectedTexts 2: " + JSON.stringify(jsonData.studentSelectedTexts)); 
	} 
	// else {
	// 	JST.subjectTexts_sentences[textPassageCount] = sentence;
	// 	// $('#DataInput').html(step_4b_template());
	// 	console.log("quoteBtn - jsonData.studentSelectedTexts 3: " + JSON.stringify(jsonData.studentSelectedTexts));
	// 	// makeSortable();
	// }

	// -----------------------
	textPassageCount = index-1; 
	$('#DataInput').html(step_7_template());  
	setJsAudioEventLitsner();
});


$( document ).on('click', "#step_7_goBack", function(event){
	if ((typeof(textPassageCount) === 'undefined') || (textPassageCount == 0)){
		$('#DataInput').html(step_6_template());
		setJsAudioEventLitsner();
		textPassageCount = null;
		console.log("step_4_goBack - textPassageCount: " + textPassageCount);
	} else {
		--textPassageCount; // Once...
		--textPassageCount;	// twice... because of the inscreasement inside step_XXX_template
		$('#DataInput').html(step_7_template());
		setJsAudioEventLitsner();
	}
});

$( document ).on('click', "#step_7_goOn", function(event){
	console.log("step_7_goOn - jsonData.studentSelectedTexts 1: " + JSON.stringify(jsonData.studentSelectedTexts)); 
	var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];
	if (!JST.hasOwnProperty('textPassages')){
		JST.textPassages = [];
		for (var i = 0; i < jsonData.numOfChoosenWords-1; i++) {
			JST.textPassages.push('');
		};
	}

	var btnPrimaryText = $("#subjectWordSentenceContainer .btn-primary").text();

	var sentence = htmlEntities($('#textInput_'+textPassageCount).val());
	console.log("step_7_goOn - textPassageCount: " + textPassageCount + ", sentence: " + sentence);
	console.log("step_7_goOn - $('#textInput_'+textPassageCount).val(): " + $('#textInput_'+textPassageCount).val());
	if (sentence.length > 0) {
		// if (quoteCount < jsonData.numOfChoosenWords-1){
		// 	JSN.subjectTexts_sentences[quoteCount] = sentence;
		// 	console.log("step_4_goOn - jsonData.studentSelectedTexts 2: " + JSON.stringify(jsonData.studentSelectedTexts));
			
		// 	$('#DataInput').html(step_4_template());
			
		// } else {
			JST.textPassages[textPassageCount] = sentence;
			console.log("step_7_goOn - jsonData.studentSelectedTexts 3: " + JSON.stringify(jsonData.studentSelectedTexts));
			if (!hasNonEmptyStrElm( JST.textPassages )){
				// JSN.subjectTexts_sentences[quoteCount] = sentence;
				console.log("step_7_goOn - jsonData.studentSelectedTexts 4: " + JSON.stringify(jsonData.studentSelectedTexts));
				console.log("step_7_goOn - jsonData: " + JSON.stringify(jsonData));
				autoPlay = (typeof(TautoPlay) !== 'undefined')? TautoPlay : autoPlay;  // This sets the remembered state before step 4.
				$('#DataInput').html(step_8_template());
				setJsAudioEventLitsner();
				// makeSortable();
			} else {
				UserMsgBox("body", 'Du skal skrive sætninger i tekstboksene der forbinder dine tekstafsnit - du mangler at skrive tekst til '+returnMissingElements('textPassages', 'sætning')+'. Tryk på sætningsknapperne og skriv tekst i tekstboksene.');
			}
		// }

	} else {
		UserMsgBox("body", "Du skal skrive sætninger i tekstboksene før du kan gå videre!");
	}

});


//#################################
//
//		OLD STEP 3
//
//#################################

//////////////////////
//  	STEP 8 		//  WRITE YOUR CONCLUSION BY WRITING TWO SENTENCES
//////////////////////


function step_8_template(){
	console.log("step_8_template - jsonData 1: " + JSON.stringify(jsonData)); 
	jsonData.currentStep = 8;
	osc.save('jsonData', jsonData);
	var stepNo = 8;

	var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];

	var HTML = '';
	HTML += '<div id="step_8" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_8" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div id="subjectTextConclusionContainer" class="btnActions">';
			
	HTML += 				'<div class="DropdownWrap">';
	HTML += 					returnDropdownMarkup(jsonData.sentenceStarters_conclusion);
	HTML += 				'</div>';

	HTML += 				'<textarea id="textInputConclusion" val="">';
				if (JST.hasOwnProperty('conclusion')) {
					HTML += JST.conclusion;
				}			
	HTML += 				'</textarea>';

	HTML += 			'</div>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_8_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_8_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	return HTML;
}

$(document).on('change', '#Dropdown2', function(){
	// var selectedText = $('#Dropdown1:selected').text();
	var textInput = $('#Dropdown2').val();
	console.log("textInputTheme - textInput: " + textInput);
	$('#textInputConclusion').val(textInput);
});


$( document ).on('click', "#step_8_goBack", function(event){
	$('#DataInput').html(step_7_template());
	setJsAudioEventLitsner();
});


$( document ).on('click', "#step_8_goOn", function(event){

	var conclusion = $('#textInputConclusion').val();
	if (conclusion.length > 0){
		var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];
		if (!JST.hasOwnProperty('conclusion')){
			JST.conclusion = null;
		}

		JST.conclusion = conclusion;
		
		$('#DataInput').html(step_9_template());
		setJsAudioEventLitsner();
		
	} else {
		UserMsgBox("body", 'Du skal du skrive et par afsluttende sætninger, der kort og præcist konkluderer, hvad du har fundet ud af. Brug evt. sætningsstarterne i dropdownmenuen som inspiration til formulering af dine sætninger.');
	}
});



//#################################
//
//		OLD STEP 4
//
//#################################

//////////////////////
//  	STEP 9		//	WRITE A HEADING AND AN INTRODUCTION
//////////////////////

function step_9_template(){
	jsonData.currentStep = 9;
	osc.save('jsonData', jsonData);
	// console.log("step_9_template - headAndIntroCount: " + ((typeof(headAndIntroCount) !== 'undefined')?headAndIntroCount:'undefined'));
	console.log("step_9_template - jsonData 1: " + JSON.stringify(jsonData)); 
	console.log("step_9_template - jsonData.studentSelectedTexts 1: " + JSON.stringify(jsonData.studentSelectedTexts)); 
	// if ((typeof(headAndIntroCount) === 'undefined') || (headAndIntroCount === null)) { 
	// 	window.headAndIntroCount = 0;
	// } else {
	// 	++headAndIntroCount;
	// }
	if (typeof(autoPlay) === 'undefined'){
		window.autoPlay = true;
	} 
	// if (typeof(TautoPlay) === 'undefined'){
	// 	window.TautoPlay = autoPlay;  // This remembers the state before step 4.
	// 	console.log("step_9_template - TautoPlay: " + TautoPlay);
	// }
	// if (headAndIntroCount > 0) {  // This ensures that the player does not start when the word-buttons > 0 are pressed.
	// 	autoPlay = false;
	// }
	// console.log("step_9_template - headAndIntroCount: " + headAndIntroCount);

	// var JSN = jsonData.studentSelectedTexts[jsonData.selectedTextNo];
	var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];  // <-----  NEW!
	var headAndIntro = ['', ''];
	if (JST.hasOwnProperty("headAndIntro")){
		// textNo = getSelected('textNo');
		headAndIntro = JST.headAndIntro;
	} else {
		JST.headAndIntro = headAndIntro;
	}
	console.log("step_9_template - headAndIntro: " + headAndIntro);
	// var headAndIntroArray = ["Overskrift", "Indledning"];
	var stepNo = 9;
	var HTML = '';
	HTML += '<div id="step_9" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';

	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_9" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	// HTML += 			'<div id="TextAndQuoteContainer">';
	// HTML += 				'<div id="headAndIntroContainer" class="btnActions">';
	// 			for (var i = 0; i < 2; i++) {
	// 				HTML += 	'<span class="headAndIntroBtn btn btn-'+((i==headAndIntroCount)?'primary':'info')+'">'+headAndIntroArray[i].toLowerCase()+'</span>';
	// 			}
	// HTML += 				'</div>';
	// HTML += 			'</div>';

	// HTML +=					returnInputBoxes3(1, 'studentSubject', 'Skriv din overskrift her...');

	// if (headAndIntroCount == 0) {
			// var TheadAndIntro = removeEmptyElements(headAndIntro);
			// HTML += returnInputBoxes3(TheadAndIntro.length, 'headerField', TheadAndIntro);
			HTML +=					returnInputBoxes4(1, 'headerField', ((typeof(headAndIntro[0])!=='undefined') && (headAndIntro[0]!==''))?headAndIntro[0]:'', 'Skriv din overskrift her...');
	// }
	// if (headAndIntroCount == 1) {
			HTML += 	'<textarea class="introField" val="" placeholder="Skriv din indledning her..." >';
					if ((typeof(headAndIntro[1])!=='undefined') && (headAndIntro[1]!=='')) {
						HTML += headAndIntro[1];
					}			
			HTML += 	'</textarea>';
	// }

	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_9_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_9_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	return HTML;
}



// $( document ).on('click', ".headAndIntroBtn", function(event){
// 	var index = $(this).index();
// 	console.log("headAndIntroBtn - index: " + index);
	 
// 	// -----------------------
// 	console.log("headAndIntroBtn - jsonData.studentSelectedTexts 1: " + JSON.stringify(jsonData.studentSelectedTexts)); 
// 	var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];
// 	if (!JST.hasOwnProperty('headAndIntro')){
// 		JST.headAndIntro = [];
// 		for (var i = 0; i < 2; i++) {
// 			JST.headAndIntro.push('');
// 		};
// 	}

// 	var sentence = $('.headerField').val();
// 	console.log("headAndIntroBtn - headAndIntroCount: " + headAndIntroCount + ", sentence: " + sentence);
	
// 	if (headAndIntroCount < 2){
// 		// JSN.subjectTexts_sentences.push(sentence);
// 		JST.headAndIntro[headAndIntroCount] = sentence;
// 		// $('#DataInput').html(step_4_template());
// 		console.log("headAndIntroBtn - jsonData.studentSelectedTexts 2: " + JSON.stringify(jsonData.studentSelectedTexts)); 
// 	} 
// 	// else {
// 	// 	JST.subjectTexts_sentences[textPassageCount] = sentence;
// 	// 	// $('#DataInput').html(step_4b_template());
// 	// 	console.log("quoteBtn - jsonData.studentSelectedTexts 3: " + JSON.stringify(jsonData.studentSelectedTexts));
// 	// 	// makeSortable();
// 	// }

// 	// -----------------------
// 	headAndIntroCount = index-1; 
// 	$('#DataInput').html(step_9_template());  
// 	setJsAudioEventLitsner();
// });


$( document ).on('focusout', ".headerField", function(event){
// $( document ).on('focusin', ".studentTheme", function(event){  
	var headerField = htmlEntities($('.headerField').val());
	console.log("focusout - headerField: _" + headerField + "_");
	// if (headerField.length > 0) {
		// var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];
		jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum].headAndIntro[0] = headerField;
	// }
});

$( document ).on('focusout', ".introField", function(event){
// $( document ).on('focusin', ".studentTheme", function(event){  
	var introField = htmlEntities($('.introField').val());
	console.log("focusout - introField: _" + introField + "_");
	// if (introField.length > 0) {
		jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum].headAndIntro[1] = introField;
	// }
});


$( document ).on('click', "#step_9_goBack", function(event){
	if ((typeof(headAndIntroCount) === 'undefined') || (headAndIntroCount == 0)){
		$('#DataInput').html(step_8_template());
		setJsAudioEventLitsner();
		headAndIntroCount = null;
		console.log("step_9_goBack - headAndIntroCount: " + headAndIntroCount);
	} else {
		--headAndIntroCount; // Once...
		--headAndIntroCount; // twice... because of the inscreasement inside step_XXX_template
		$('#DataInput').html(step_9_template());
		setJsAudioEventLitsner();
	}
});

$( document ).on('click', "#step_9_goOn", function(event){
	console.log("step_9_goOn - jsonData.studentSelectedTexts 1: " + JSON.stringify(jsonData.studentSelectedTexts)); 
	var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];
	// if (!JST.hasOwnProperty('headAndIntro')){
	// 	JST.headAndIntro = [];
	// 	for (var i = 0; i < 2; i++) {
	// 		JST.headAndIntro.push('');
	// 	};
	// }

	// var btnPrimaryText = $("#subjectWordSentenceContainer .btn-primary").text();

	// var headerField = htmlEntities($('.headerField').val());
	// var introField = htmlEntities($('.introField').val());
	// console.log("step_9_goOn - headerField: _" + headerField + "_, introField: _" + introField + "_");
	// if (((headerField.length > 0) || (JST.headAndIntro[0]!=='')) && ((introField.length > 0) || (JST.headAndIntro[0]!==''))) {
	// if ((JST.headAndIntro[0].length > 0) && (JST.headAndIntro[1].length > 0)) {
		// if (quoteCount < jsonData.numOfChoosenWords-1){
		// 	JSN.subjectTexts_sentences[quoteCount] = sentence;
		// 	console.log("step_4_goOn - jsonData.studentSelectedTexts 2: " + JSON.stringify(jsonData.studentSelectedTexts));
			
		// 	$('#DataInput').html(step_4_template());
			
		// } else {
			// if (headerField.length > 0) {
			// 	JST.headAndIntro[0] = headerField;
			// }
			// if (introField.length > 0) {
			// 	JST.headAndIntro[1] = introField;
			// }
			console.log("step_9_goOn - jsonData.studentSelectedTexts 3: " + JSON.stringify(jsonData.studentSelectedTexts));
			if (!hasNonEmptyStrElm( JST.headAndIntro )){
				// JSN.subjectTexts_sentences[quoteCount] = sentence;
				console.log("step_9_goOn - jsonData.studentSelectedTexts 4: " + JSON.stringify(jsonData.studentSelectedTexts));
				// autoPlay = (typeof(TautoPlay) !== 'undefined')? TautoPlay : autoPlay;  // This sets the remembered state before step 4.
				$('#DataInput').html(step_10_template());
				// setJsAudioEventLitsner();
				// makeSortable();
			} else {
				UserMsgBox("body", 'Du skal en overskrift og indledning til din analyse - du mangler at skrive tekst til '+returnMissingElements('headAndIntro', ["overskrift", "indledning"]));
			}
		// }

	// } else {
	// 	UserMsgBox("body", "Du skal en overskrift og indledning til din analyse før du kan gå videre!");
	// }

});




//#################################
//
//		OLD STEP 4
//
//#################################

//////////////////////
//  	STEP 10		//	DOWNLOAD YOUR WORD-FILE
//////////////////////

function step_10_template(){
	jsonData.currentStep = 10;
	osc.save('jsonData', jsonData);
	console.log("step_10_template - jsonData 1: " + JSON.stringify(jsonData)); 
	console.log("step_10_template - jsonData.studentSelectedTexts 1: " + JSON.stringify(jsonData.studentSelectedTexts)); 

	// var JSN = jsonData.studentSelectedTexts[jsonData.selectedTextNo];
	var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];  // <-----  NEW!
	
	var stepNo = 10;
	var HTML = '';
	HTML += '<div id="step_10" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';

	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_10" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div id="TextAndQuoteContainer">';
			
	// HTML +=				'<span class="Texts btn btn-info" >'+jsonData.texts[JST.textNo].author+': "'+jsonData.texts[JST.textNo].title+'", '+jsonData.texts[JST.textNo].year+'</span>';
	

	HTML += 				'<div id="textOverviewContainer" >';
				HTML += 		'<h3>'+JST.headAndIntro[0]+'</h3>';
				HTML += 		'<p>'+JST.headAndIntro[1]+'</p>';
				HTML += 		'<div class="textOverview textOverview_TextTheme">'+
									'<span class="textOverviewSubHeading">Tema:</span> <br/>'+JST.studentTheme+'<br/>'+
									'<span class="textOverviewSubHeading">Temaudlægning:</span> <br/>'+JST.TextTheme+
								'</div>';
				for (var i = 0; i < jsonData.numOfChoosenWords; i++) {
					HTML += 	'<div class="textOverview textOverview_QuotesAndNotes">'+
									'<span class="textOverviewSubHeading">Citat '+String(parseInt(i)+1)+':</span> <br/>'+
									'&quot;<i>'+JST.textQuotes[i]+'</i>&quot;<br/>'+
									'<span class="textOverviewSubHeading">Udlægning til citat '+String(parseInt(i)+1)+':</span> <br/>'+
									JST.textQuoteNotes[i]+
								'</div>';
					// HTML += 	(typeof(JST.textPassages[i]!=='undefined'))?'<p id="textPassages_'+i+'">'+JST.textPassages[i]+'</p>':'';
					HTML += 	(i < jsonData.numOfChoosenWords-1)?'<p id="textPassages_'+i+'">'+JST.textPassages[i]+'</p>':'';
				}
				HTML += 		'<p>'+JST.conclusion+'</p>';
	HTML += 				'</div>';


	HTML += 			'</div>';

	
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_10_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_10_download" class="btn btn-lg btn-primary">DOWNLOAD Word fil (.docx)</span>';
	// HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	return HTML;
}


$( document ).on('click', "#step_10_goBack", function(event){
	$('#DataInput').html(step_9_template());
	setJsAudioEventLitsner();
});

$( document ).on('click', "#step_10_download", function(event){
	
	var HTML = wordTemplate();
	var converted = htmlDocx.asBlob(HTML);
    console.log("step_10_download - converted: " + JSON.stringify(converted));
	saveAs(converted, 'test2.docx');
});


function wordTemplate() {
	var JST = jsonData.studentSelectedTexts[jsonData.selectedTextIndexNum];
	var text = JST.texts[textNo];
	var HTML = '';
	HTML += '<!DOCTYPE html>';
	HTML += '<html>';
	HTML += 	'<head>';
	HTML += 		'<style type="text/css">';
	HTML += 			'body {font-family: arial;}';
	HTML += 			'h1 {}';
	HTML += 			'h2 {}';
	HTML += 			'h3 {font-style: italic; color: #717272;}';
	HTML += 			'h4 {color: #56bfc5;}';
	HTML += 			'h5 {}';
	HTML += 			'h6 {}';
	HTML += 			'.selected {color: #56bfc5; width: 25%;}';
	HTML += 			'p {font-size: 14px;}';
	HTML += 			'table {padding: 8px; width: 100%;}';
	HTML += 			'td {width: 25%;}';
	HTML += 			'ol {color: #717272;}';
	HTML += 		'</style>';
	HTML += 	'</head>';
	HTML += 	'<body>';
	HTML += 		'<h1>'+JST.headAndIntro[0]+'</h1>';
	HTML += 		'<hr/>';
	HTML += 		'<div class="instruktion">';
	HTML += 			'<h3>Din valgte tekst: </h3>';
	HTML += 			'<h4>'+text.title+'</h4>';
	HTML += 			'<h3>Dine brainstorm-ord:</h3>';

						var subjectTexts = getSelected('subjectTexts');
						var subjectTexts_selected = getSelected('subjectTexts_selected');
	HTML += 			returnHtmlTable(subjectTexts, subjectTexts_selected, 4);
	
	HTML += 			'<hr/>';
	HTML += 			'<h3>Dine sætninger skal nu udbygges til 5 afsnit. Skriv videre på din tekst herunder:</h3>';
	HTML += 			'<ol>';
	HTML += 				'<li>Forklar og uddyb hvad du mener med hver enkelt sætning</li>';
	HTML += 				'<li>Hurtigskriv et par minutter, hvor du skriver så meget du kan uden at standse op og rette i det du skriver.</li>';
	HTML += 				'<li>Arbejd med sætningerne på denne måde indtil du har 5 afsnit.</li>';
	HTML += 			'</ol>';
	HTML += 		'</div>';
	HTML += 		'<hr/>';
	HTML += 		'<h3>Din tekst:</h3>';
	HTML += 		'<h2>'+JSN.studentSubjectTitel[0]+'</h2>';
	HTML += 		'<p>'+JSN.sentenceStarters_begin_text+'</p>';
					for (var n in JSN.subjectTexts_sentences_2){
						HTML += '<p>'+JSN.subjectTexts_sentences_2[n]+'</p>';
					}
	HTML += 		'<p>'+JSN.sentenceStarters_end_text+'</p>';
	HTML += 		'<hr/>';
	HTML += 		'<div class="instruktion">';
	HTML += 			'<h3>Gennemlæs din tekst. Hænger den sammen i forhold til:</h3>';
	HTML += 			'<ol>';
	HTML += 				'<li>Tydelige overgange mellem afsnit.</li>';
	HTML += 				'<li>Sammenhæng mellem sætningerne.</li>';
	HTML += 				'<li>Godt og levende sprog.</li>';
	HTML += 				'<li>Korrekt brug af punktum og komma.</li>';
	HTML += 				'<li>Så få formuleringsmæssige uklarheder og stavefejl som muligt.</li>';
	HTML += 			'</ol>';
	HTML += 			'<h3>Når du har gennemgået disse trin, har du en rigtig god tekst!</h3>';
	HTML += 			'<hr/>';
	HTML += 		'</div>';
	HTML += 	'</body>';
	HTML += '</html>';
	// document.write(HTML);
	return HTML;
}



//////////////////////
//  	STEP 4b 	//
//////////////////////


// function step_4b_template(){
// 	console.log("step_4b_template - jsonData 1: " + JSON.stringify(jsonData));
// 	jsonData.currentStep = "4b";
// 	osc.save('jsonData', jsonData);
// 	var JSN = jsonData.studentSelectedTexts[jsonData.selectedTextNo];
// 	var JSNS = (JSN.hasOwnProperty('subjectTexts_sentences_2'))? JSN.subjectTexts_sentences_2 : JSN.subjectTexts_sentences;
// 	var stepNo = "4b";
// 	stepNo = getJsonDataArrayIndex(stepNo);
// 	console.log("step_4b_template - stepNo: " + stepNo);
// 	var HTML = '';
// 	HTML += '<div id="step_4b" class="step">';
// 	HTML +=     '<div class="row">';
// 	HTML += 		'<div class="col-xs-12 col-md-8">';

// 	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_4b" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
// 	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
// 	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');
// 	HTML += 			'<div id="subjectSentenceSortableContainer" class="btnActions">';
// 			for (var n in JSNS) {
// 				HTML += 	'<div id="Sort_"'+n+' class="Sortable sortable_text_container">'+JSNS[n]+'</div>';
// 			}
// 	HTML += 			'</div>';
// 	HTML += 			'<div class="stepNav">';
// 	HTML += 				'<span id="step_4b_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
// 	HTML += 				'<span id="step_4b_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
// 	HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
// 	HTML += 			'</div>';
// 	HTML += 		'</div>';
// 	HTML += 	'</div>';
// 	HTML += '</div>';
// 	HTML = replaceWildcard(HTML, jsonData.numOfChoosenWords);
// 	return HTML;
// }


// function makeSortable() {
// 	// Sort function are placed here due to readiness issues of the DOM:
// 	$( "#subjectSentenceSortableContainer" ).sortable({
// 		axis: 'y',
// 		sortAnimateDuration: 500,
// 	    sortAnimate: true,
// 	    distance: 25,
// 	    update: function(event, ui) {
// 	    	console.log('makeSortable - UPDATE');
// 	    	updateSubjectSentenceOrder();
// 	    },
// 	    start: function(event, ui) {
// 	    	console.log('makeSortable - START');
// 	        console.log('makeSortable - ui.item.index: ' + ui.item.index());
// 	    },
// 	    stop: function(event, ui) {
// 	        console.log('makeSortable - STOP');
// 	    }
// 	});
// }


// function updateSubjectSentenceOrder(){
// 	console.log("updateSubjectSentenceOrder - jsonData.studentSelectedTexts 1: " + JSON.stringify(jsonData.studentSelectedTexts));
// 	var Tarray = [];
// 	$( ".Sortable" ).each(function( index, element ) {
// 		Tarray.push($(element).text());
// 	});

// 	var JSN = jsonData.studentSelectedTexts[jsonData.selectedTextNo];
// 	if (!JSN.hasOwnProperty('subjectTexts_sentences')){
// 		JSN.subjectTexts_sentences_2 = [];
// 	}
// 	jsonData.studentSelectedTexts[jsonData.selectedTextNo].subjectTexts_sentences_2 = Tarray;
// 	console.log("updateSubjectSentenceOrder - jsonData.studentSelectedTexts 2: " + JSON.stringify(jsonData.studentSelectedTexts));
// 	console.log("updateSubjectSentenceOrder - jsonData 1: " + JSON.stringify(jsonData)); 
// }


// $( document ).on('click', "#step_4b_goBack", function(event){
// 	if (typeof(step_4b_hasBeenSorted) === 'undefined'){
// 		window.step_4b_hasBeenSorted = false;
// 	}
// 	var JSN = jsonData.studentSelectedTexts[jsonData.selectedTextNo];
// 	if ((!JSN.hasOwnProperty('subjectTexts_sentences_2')) || (step_4b_hasBeenSorted)) {
// 		window.quoteCount = jsonData.numOfChoosenWords-2;  // Sets the state to the last btn of step 4. 
// 		console.log("step_4b_goBack - quoteCount: " + quoteCount); 
// 		$('#DataInput').html(step_4_template());
// 		setJsAudioEventLitsner();
// 	}
// 	if ((JSN.hasOwnProperty('subjectTexts_sentences_2')) && (step_4b_hasBeenSorted == false)) {
// 		$( ".Sortable" ).each(function( index, element ) {
// 			$(element).text(JSN.subjectTexts_sentences[index]);
// 		});
// 		step_4b_hasBeenSorted = true;
// 	} 

// });

// $( document ).on('click', "#step_4b_goOn", function(event){
// 	$('#DataInput').html(step_5_template());
// 	setJsAudioEventLitsner();
// });



//////////////////////
//  	STEP 5 		//
//////////////////////


// function step_5_template(){
// 	console.log("step_5_template - jsonData 1: " + JSON.stringify(jsonData));
// 	jsonData.currentStep = 5;
// 	osc.save('jsonData', jsonData);
// 	var JSN = jsonData.studentSelectedTexts[jsonData.selectedTextNo];
// 	var stepNo = 5;
// 	stepNo = getJsonDataArrayIndex(stepNo);
// 	var HTML = '';
// 	HTML += '<div id="step_5" class="step">';
// 	HTML +=     '<div class="row">';
// 	HTML += 		'<div class="col-xs-12 col-md-8">';
	
// 	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_5" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
// 	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
// 	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

// 	HTML += 			'<h4>Brug evt. nedenstående sætningsstartere til at skrive videre ud fra:</h4>';

// 	HTML += 			'<div class="DropdownWrap">';
// 	HTML += 				returnDropdownMarkup(jsonData.sentenceStarters_begin);
// 	HTML += 			'</div>';
	
// 	HTML += 			'<textarea id="textInput2" val="">';
// 			HTML += (JSN.hasOwnProperty('sentenceStarters_begin_text'))? JSN.sentenceStarters_begin_text : '';
// 	HTML += 			'</textarea>';
// 	HTML += 			'<div class="stepNav">';
// 	HTML += 				'<span id="step_5_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
// 	HTML += 				'<span id="step_5_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
// 	HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
// 	HTML += 			'</div>';
// 	HTML += 		'</div>';
// 	HTML += 	'</div>';
// 	HTML += '</div>';
// 	HTML = replaceWildcard(HTML, jsonData.numOfChoosenWords);
// 	return HTML;
// }


// $(document).on('change', '#Dropdown2', function(){
// 	// var selectedText = $('#Dropdown1:selected').text();
// 	var selectedText = $('#Dropdown2').val();
// 	console.log("Dropdown1 - selectedText: " + selectedText);
// 	$('#textInput2').val(selectedText);
// 	jsonData.studentSelectedTexts[jsonData.selectedTextNo].JSN.sentenceStarters_begin_text = textInputText;
// });

// $( document ).on('click', "#step_5_goBack", function(event){
// 	$('#DataInput').html(step_4b_template());
// 	setJsAudioEventLitsner();
// 	makeSortable();
// });

// $( document ).on('click', "#step_5_goOn", function(event){
// 	console.log("step_5_goOn - jsonData.studentSelectedTexts 1: " + JSON.stringify(jsonData.studentSelectedTexts));
// 	var textInputText = htmlEntities($('#textInput2').val());
// 	if (textInputText.length > 0) {
// 		var JSN = jsonData.studentSelectedTexts[jsonData.selectedTextNo];
// 		JSN.sentenceStarters_begin_text = textInputText;
// 		$('#DataInput').html(step_6_template());
// 		setJsAudioEventLitsner();
// 	}
// 	console.log("step_5_goOn - jsonData.studentSelectedTexts 2: " + JSON.stringify(jsonData.studentSelectedTexts));
// });

//////////////////////
//  	STEP 6 		//
//////////////////////


// function step_6_template(){
// 	console.log("step_6_template - jsonData 1: " + JSON.stringify(jsonData));
// 	jsonData.currentStep = 6;
// 	var JSN = jsonData.studentSelectedTexts[jsonData.selectedTextNo];
// 	var stepNo = 6;
// 	stepNo = getJsonDataArrayIndex(stepNo);
// 	var HTML = '';
// 	HTML += '<div id="step_6" class="step">';
// 	HTML +=     '<div class="row">';
// 	HTML += 		'<div class="col-xs-12 col-md-8">';
	
// 	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_6" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
// 	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
// 	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

// 	HTML += 			'<h4>Brug evt. nedenstående sætningsstartere til at skrive videre ud fra:</h4>';

// 	HTML += 			'<div class="DropdownWrap">';
// 	HTML += 				returnDropdownMarkup(jsonData.sentenceStarters_end);
// 	HTML += 			'</div>';
	
// 	HTML += 			'<textarea id="textInput3" val="">';
// 			HTML += (JSN.hasOwnProperty('sentenceStarters_end_text'))? JSN.sentenceStarters_end_text : '';
// 	HTML += 			'</textarea>';
// 	HTML += 			'<div class="stepNav">';
// 	HTML += 				'<span id="step_6_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
// 	HTML += 				'<span id="step_6_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
// 	HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
// 	HTML += 			'</div>';
// 	HTML += 		'</div>';
// 	HTML += 	'</div>';
// 	HTML += '</div>';
// 	return HTML;
// }


// $(document).on('change', '#Dropdown3', function(){
// 	// var selectedText = $('#Dropdown1:selected').text();
// 	var selectedText = $('#Dropdown3').val();
// 	console.log("Dropdown3 - selectedText: " + selectedText);
// 	$('#textInput3').text(selectedText);
// 	jsonData.studentSelectedTexts[jsonData.selectedTextNo].JSN.sentenceStarters_end_text = textInputText;
// });

// $( document ).on('click', "#step_6_goBack", function(event){
// 	$('#DataInput').html(step_5_template());
// 	setJsAudioEventLitsner();
// });

// $( document ).on('click', "#step_6_goOn", function(event){
// 	console.log("step_6_goOn - jsonData.studentSelectedTexts 1: " + JSON.stringify(jsonData.studentSelectedTexts));
// 	var textInputText = htmlEntities($('#textInput3').val());
// 	if (textInputText.length > 0) {
// 		var JSN = jsonData.studentSelectedTexts[jsonData.selectedTextNo];
// 		JSN.sentenceStarters_end_text = textInputText;
// 		$('#DataInput').html(step_6b_template());
// 		setJsAudioEventLitsner();
// 	}
// 	console.log("step_6_goOn - jsonData.studentSelectedTexts 2: " + JSON.stringify(jsonData.studentSelectedTexts));
// });

//////////////////////
//  	STEP 6b 	//
//////////////////////


// function step_6b_template(){
// 	console.log("step_6b_template - jsonData 1: " + JSON.stringify(jsonData));
// 	jsonData.currentStep = "6b";
// 	osc.save('jsonData', jsonData);
// 	var JSN = jsonData.studentSelectedTexts[jsonData.selectedTextNo];
// 	var stepNo = "6b";
// 	stepNo = getJsonDataArrayIndex(stepNo);
// 	var HTML = '';
// 	HTML += '<div id="step_6b" class="step">';
// 	HTML +=     '<div class="row">';
// 	HTML += 		'<div id="subjectHeadingContainer" class="col-xs-12 col-md-8">';
	
// 	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_6b" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
// 	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
// 	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

// 	// HTML += 			returnInputBoxes3(1, 'studentSubjectTitel', ' Skriv din overskrift her');
// 			var studentSubjectTitel = (JSN.hasOwnProperty('studentSubjectTitel'))? JSN.studentSubjectTitel : 'Skriv din overskrift her';
// 	HTML += 			returnInputBoxes3(1, 'studentSubjectTitel', studentSubjectTitel);
	
// 	HTML += 			'<div class="stepNav">';
// 	HTML += 				'<span id="step_6b_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
// 	HTML += 				'<span id="step_6b_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
// 	HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
// 	HTML += 			'</div>';
// 	HTML += 		'</div>';
// 	HTML += 	'</div>';
// 	HTML += '</div>';
// 	HTML = replaceWildcard(HTML, jsonData.numOfChoosenWords);
// 	return HTML;
// }


// $( document ).on('click', "#step_6b_goBack", function(event){
// 	$('#DataInput').html(step_6_template());
// 	setJsAudioEventLitsner();
// });

// $( document ).on('click', "#step_6b_goOn", function(event){
// 	console.log("step_6b_goOn - jsonData.studentSelectedTexts 1: " + JSON.stringify(jsonData.studentSelectedTexts));
// 	var textInputText = htmlEntities($('.studentSubjectTitel').val());
// 	if (textInputText.length > 0) {
// 		var JSN = jsonData.studentSelectedTexts[jsonData.selectedTextNo];
// 		JSN.studentSubjectTitel = [];
// 		JSN.studentSubjectTitel[0] = textInputText;
// 		$('#DataInput').html(step_7_template());
// 		setJsAudioEventLitsner();
// 	}
// 	console.log("step_6b_goOn - jsonData.studentSelectedTexts 2: " + JSON.stringify(jsonData.studentSelectedTexts));
// });


//////////////////////
//  	STEP 7 		//
//////////////////////


// function step_7_template(){
// 	console.log("step_7_template - jsonData 1: " + JSON.stringify(jsonData));
// 	jsonData.currentStep = 7;
// 	osc.save('jsonData', jsonData);
// 	var JSN = jsonData.studentSelectedTexts[jsonData.selectedTextNo];
// 	var stepNo = "7";
// 	stepNo = getJsonDataArrayIndex(stepNo);
// 	var HTML = '';
// 	HTML += '<div id="step_7" class="step">';
// 	HTML +=     '<div class="row">';
// 	HTML += 		'<div id="XXXXXXX" class="col-xs-12 col-md-8">';

// 	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_7" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
// 	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
// 	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

// 	HTML += 			'<div class="TextHolder">';
// 	// HTML += 				'<h3>Titel står her</h3><p>Alle kan blive enige om at det er et problem at vi nu har opbygget så meget af verdens energiforbrug på atomkraft, da det har så stor risiko for fremtiden knyttet til sig.</p><p>Hvis nogen skulle være i tvivl om at det er et problem at vi får så meget energi fra atomkraft, så bør man tænke på ulykken i Tjernobyl.</p><p>Mit hovedsynspunkt er at det er uforsvarligt overfor fremtidens børn at bygge et energiforbrug op der har så ukendte konsekvenser for fremtiden.</p><p>På den ene side kan man være for atomkraft, da der reelt er mange fordele ved at skrue op for brugen af atomkraft og derved mindske forbruget af fossile brændstoffer, indtil vi har bedre og renere energikilder i det omfang det kræves til den voksende verdensbefolkning. På den anden siden kan man være i mod atomkraft da man med rette kan hævde at vi reelt ikke hvad der vil ske med det opbevarede atomaffald.</p><p>Afslutningsvis kan man sige at fremtiden nok vil afgøre atomkrafts skæbne. Enten vil der ske en voldsomulykke der gør at menneskeheden dropper det, eller så vil nye energikilder vinde hastigt frem.</p>';
// 	HTML += 				'<h3>'+JSN.studentSubjectTitel[0]+'</h3>';
// 	HTML += 				'<p>'+JSN.sentenceStarters_begin_text+'</p>';
// 			for (var n in JSN.subjectTexts_sentences_2){
// 				HTML += 	'<p>'+JSN.subjectTexts_sentences_2[n]+'</p>';
// 			}
// 	HTML += 				'<p>'+JSN.sentenceStarters_end_text+'</p>';

// 	HTML += 			'</div>';
// 	HTML += 			'<div class="stepNav">';
// 	HTML += 				'<span id="step_7_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
// 	HTML += 				'<span id="step_7_download" class="btn btn-lg btn-primary">DOWNLOAD Word fil (.docx)</span>';
// 	// HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
// 	HTML += 			'</div>';
// 	HTML += 		'</div>';
// 	HTML += 	'</div>';
// 	HTML += '</div>';
// 	HTML = replaceWildcard(HTML, jsonData.numOfChoosenWords);
// 	return HTML;
// }


// $( document ).on('click', "#step_7_goBack", function(event){
// 	$('#DataInput').html(step_6b_template());
// 	setJsAudioEventLitsner();
// });


$( document ).on('click', "#step_7_download", function(event){
	
	var HTML = wordTemplate();
	var converted = htmlDocx.asBlob(HTML);
    console.log("step_7_download - converted: " + JSON.stringify(converted));
	saveAs(converted, 'test.docx');
});


function returnHtmlTable(dataArray, selectedArray, numOfColumns) {
	var length = dataArray.length;
	var numOfRows = Math.ceil(length/numOfColumns);
	var HTML = '';
	HTML += '<table>';
	for (var i = 0; i < numOfRows; i++) {
		HTML += '<tr>';
		for (var j = i*numOfColumns; j < (i+1)*numOfColumns; j++) {
			HTML += '<td '+((elementInArray(selectedArray, j))?'class="selected"':'')+'>'+((typeof(dataArray[j]) !== 'undefined')?dataArray[j]:'&nbsp;')+'</td>';
		}
		HTML +=  '</tr>';
	}
	HTML += '</table>';
	console.log("returnHtmlTable: " + HTML);
	return HTML;
}
console.log("returnHtmlTable: " + returnHtmlTable([0,1,2,3,4,5,6,7,8,9,10,11,12,13], [], 3));


// function wordTemplate() {
// 	var JSN = jsonData.studentSelectedTexts[jsonData.selectedTextNo];
// 	var HTML = '';
// 	HTML += '<!DOCTYPE html>';
// 	HTML += '<html>';
// 	HTML += 	'<head>';
// 	HTML += 		'<style type="text/css">';
// 	HTML += 			'body {font-family: arial;}';
// 	HTML += 			'h1 {}';
// 	HTML += 			'h2 {}';
// 	HTML += 			'h3 {font-style: italic; color: #717272;}';
// 	HTML += 			'h4 {color: #56bfc5;}';
// 	HTML += 			'h5 {}';
// 	HTML += 			'h6 {}';
// 	HTML += 			'.selected {color: #56bfc5; width: 25%;}';
// 	HTML += 			'p {font-size: 14px;}';
// 	HTML += 			'table {padding: 8px; width: 100%;}';
// 	HTML += 			'td {width: 25%;}';
// 	HTML += 			'ol {color: #717272;}';
// 	HTML += 		'</style>';
// 	HTML += 	'</head>';
// 	HTML += 	'<body>';
// 	HTML += 		'<h1>'+jsonData.headerAndWordTemplateHeader+'</h1>';
// 	HTML += 		'<hr/>';
// 	HTML += 		'<div class="instruktion">';
// 	HTML += 			'<h3>Dit valgte emne: </h3>';
// 	HTML += 			'<h4>'+getSelected('textNo')+'</h4>';
// 	HTML += 			'<h3>Dine brainstorm-ord:</h3>';

// 						var subjectTexts = getSelected('subjectTexts');
// 						var subjectTexts_selected = getSelected('subjectTexts_selected');
// 	HTML += 			returnHtmlTable(subjectTexts, subjectTexts_selected, 4);
	
// 	HTML += 			'<hr/>';
// 	HTML += 			'<h3>Dine sætninger skal nu udbygges til 5 afsnit. Skriv videre på din tekst herunder:</h3>';
// 	HTML += 			'<ol>';
// 	HTML += 				'<li>Forklar og uddyb hvad du mener med hver enkelt sætning</li>';
// 	HTML += 				'<li>Hurtigskriv et par minutter, hvor du skriver så meget du kan uden at standse op og rette i det du skriver.</li>';
// 	HTML += 				'<li>Arbejd med sætningerne på denne måde indtil du har 5 afsnit.</li>';
// 	HTML += 			'</ol>';
// 	HTML += 		'</div>';
// 	HTML += 		'<hr/>';
// 	HTML += 		'<h3>Din tekst:</h3>';
// 	HTML += 		'<h2>'+JSN.studentSubjectTitel[0]+'</h2>';
// 	HTML += 		'<p>'+JSN.sentenceStarters_begin_text+'</p>';
// 					for (var n in JSN.subjectTexts_sentences_2){
// 						HTML += '<p>'+JSN.subjectTexts_sentences_2[n]+'</p>';
// 					}
// 	HTML += 		'<p>'+JSN.sentenceStarters_end_text+'</p>';
// 	HTML += 		'<hr/>';
// 	HTML += 		'<div class="instruktion">';
// 	HTML += 			'<h3>Gennemlæs din tekst. Hænger den sammen i forhold til:</h3>';
// 	HTML += 			'<ol>';
// 	HTML += 				'<li>Tydelige overgange mellem afsnit.</li>';
// 	HTML += 				'<li>Sammenhæng mellem sætningerne.</li>';
// 	HTML += 				'<li>Godt og levende sprog.</li>';
// 	HTML += 				'<li>Korrekt brug af punktum og komma.</li>';
// 	HTML += 				'<li>Så få formuleringsmæssige uklarheder og stavefejl som muligt.</li>';
// 	HTML += 			'</ol>';
// 	HTML += 			'<h3>Når du har gennemgået disse trin, har du en rigtig god tekst!</h3>';
// 	HTML += 			'<hr/>';
// 	HTML += 		'</div>';
// 	HTML += 	'</body>';
// 	HTML += '</html>';
// 	// document.write(HTML);
// 	return HTML;
// }


//====================================================== 
//      local storage test
//======================================================



/*******************************************************
 * 		objectStorageClass documentation
 *******************************************************
 *
 * BASIC USAGE:
 * ============
 *
 *	1.	Initialize a local storage object "lsObj" by using the two commands:
 *
 *			var lsObj = Object.create(objectStorageClass);
 *			lsObj.init("my_local_storage_object_name");
 *
 *		- where "my_local_storage_object_name" is a name of the object of your own choosing.
 *		You always need to initialize a local storage object before you can use any commands like "load", "save", "delete" etc. You only need to
 *		initialize a local storage object (eg. "lsObj") once in your program.
 *
 *	2.	Next, load the name of a PREVIOUSLY stored/saved variable - e.g. "myVarName1":
 *
 *			var myVarName1 = lsObj.load("myVarName1");
 *
 *	3.	If myVarName1 == null, then the student has not made the e-learning exercise before: load your e-learning exercise start-scenario. 
 *		If myVarName1 != null, then the student has made the e-learning exercise before: myVarName1 has whatever value you have stored 
 *		in it from the last/previous "session" - load therefor the appropriate e-learning exercise scenario.
 *
 *	4.	To save a variable like "myVarName1" (do that at a appropriate point in your e-learning exercise), you do:
 *	
 *			lsObj.save("myVarName1", myVarName1);
 *
 *		"myVarName1" is now stored in "my_local_storage_object_name", and can be retrieved by the "load" shown step 2 above. You can save 
 *		as many variables inside "my_local_storage_object_name" as you nedd – you just do: 
 *
 *			lsObj.save("myVarName1", myVarName1);
 *			lsObj.save("myVarName2", myVarName2);
 *				...
 *			lsObj.save("myVarNameN", myVarNameN);
 *
 *	5.	If you need to remove/delete the session, you do:
 *
 *			lsObj.delete():
 *
 *		- which will remove/delete the local storage object "my_local_storage_object_name".
 *
 * AUTOSAVE:
 * =========
 *
 *	1.	Initialize a local storage object "lsObj" by using the two commands:
 *
 *			var lsObj = Object.create(objectStorageClass);
 *			lsObj.init("my_local_storage_object_name");
 *
 *		- where "my_local_storage_object_name" is a name of the object of your own choosing.
 *		You always need to initialize a local storage object before you can use any commands like "load", "save", "delete" etc. You only need to
 *		initialize a local storage object (eg. "lsObj") once in your program.
 *
 *	2.	To start autosaving a variable "myVarName1", you do:
 *			
 *			lsObj.startAutoSave("myVarName1", myVarName1, timeInMilliSec);
 * 		
 *		- where "timeInMilliSec" is the time (in milliseconds) between each saving action of "myVarName1". You can have autosave on as many 
 *		variables as you need - you just do: 
 *
 *			lsObj.startAutoSave("myVarName1", myVarName1, timeInMilliSec1);
 *			lsObj.startAutoSave("myVarName2", myVarName2, timeInMilliSec2);
 *				...
 *			lsObj.startAutoSave("myVarNameN", myVarNameN, timeInMilliSecN);
 *
 *	3.	If you for some reason need to limit the duration/number of times the startAutoSave-function performs its saving-action on a given 
 *		variable, you do:
 *
 *			lsObj.setAutoSaveMaxCount("myVarName1", maxSaveCount);
 *
 *		- where maxSaveCount is the maximum number of times the startAutoSave-function performs its saving-action.
 *
 *	4.	To stop the startAutoSave-function, you do:
 *
 *			lsObj.stopAutoSave("myVarName1");
 */

var objectStorageClass = {
    // defaultMsg : 'Du har lavet denne øvelse før.',
    localStorageObjName : null, // The name of the storage object.
    localStorageObjData : {timeStamp: null},  // The default storage object.
    init : function(localStorageObjName){
        if(typeof(Storage) !== "undefined"){
        	console.log("objectStorageClass.init - LocalStorage supported!");
            this.localStorageObjName = localStorageObjName;
            this.localStorageObjData.timeStamp = this.setTimeStamp();
            var localStorageObjData =  JSON.parse(localStorage.getItem(this.localStorageObjName));
            console.log("objectStorageClass.init - localStorageObjName: " + this.localStorageObjName + ", localStorageObjData: " + JSON.stringify(localStorageObjData));
        } else {
            console.log("objectStorageClass.init - LocalStorage NOT supported!");
        } 
    },
    save : function(varName, varData) {
        if(typeof(Storage) !== "undefined"){
            console.log("objectStorageClass.save - LocalStorage supported!");

            this.localStorageObjData.timeStamp = this.setTimeStamp();
            console.log('objectStorageClass.save - timeStamp: ' + this.localStorageObjData.timeStamp);

            if (!this.localStorageObjData.hasOwnProperty(varName)) {
            	console.log("objectStorageClass.save - 0");
                this.localStorageObjData[varName] = '';
            } 

            console.log('objectStorageClass.save - varData: '+JSON.stringify(varData));

            console.log("objectStorageClass.save - this.localStorageObjData 1 : " + JSON.stringify(this.localStorageObjData));
            this.localStorageObjData[varName] = varData;
            console.log("objectStorageClass.save - this.localStorageObjData 2 : " + JSON.stringify(this.localStorageObjData));
            console.log("objectStorageClass.save - typeof(this.localStorageObjData): " + typeof(this.localStorageObjData));


            try {
                localStorage.setItem(this.localStorageObjName, JSON.stringify(this.localStorageObjData));
            }

            catch(error) {
                console.log("objectStorageClass.save - LocalStorage error: " + error.message);
            }
            
        } else {
            console.log("objectStorageClass.save - LocalStorage NOT supported!");
        }
    },
    load : function(varName) {
        if(typeof(Storage) !== "undefined"){
        	console.log("objectStorageClass.load - 0");
            var localStorageObjData = JSON.parse(localStorage.getItem(this.localStorageObjName));
            console.log("objectStorageClass.load - localStorageObjName: " + this.localStorageObjName + ", localStorageObjData: " + JSON.stringify(localStorageObjData));
            if (localStorageObjData !== null) {  // If the variable exists, then return it:
            	console.log("objectStorageClass.load - A1");
            	console.log("objectStorageClass.load - typeof(localStorageObjData):" + typeof(localStorageObjData) + 
            		", localStorageObjData.length: " + localStorageObjData.length +
            		", localStorageObjData: " + JSON.stringify(localStorageObjData) + 
            		", localStorageObjData: " + localStorageObjData);

                // this.localStorageObjData = localStorageObjData;  // only needs overwriting when saving.
                if (localStorageObjData.hasOwnProperty(varName)){
                	console.log("objectStorageClass.load - A2");
                    return localStorageObjData[varName];       
                } else {
                	console.log("objectStorageClass.load - A3");
                    return null;
                }   
            } else {
            	console.log("objectStorageClass.load - A4");
            	return null;
            }
        } else {
            console.log("objectStorageClass.load - LocalStorage NOT supported!");
            return null;
        } 
    },
    delete : function(localStorageVarName) {
        if(typeof(Storage) !== "undefined"){
            console.log("objectStorageClass.delete - LocalStorage supported!");
            localStorage.removeItem(localStorageVarName);
        } else {
            console.log("objectStorageClass.delete - LocalStorage NOT supported!");
        }
    },
    exist : function(varName){
        if(typeof(Storage) !== "undefined"){
            console.log("objectStorageClass.exist - LocalStorage supported!");
            var localStorageObjData = JSON.parse(localStorage.getItem(this.localStorageObjName));
            if (localStorageObjData !== null) {
            	console.log("objectStorageClass.exist - this.localStorageObjName exist!!!");
            	console.log('objectStorageClass.exist - typeof(localStorageObjData): '+typeof(localStorageObjData)+', localStorageObjData: '+JSON.stringify(localStorageObjData));
                if (localStorageObjData.hasOwnProperty(varName)) {
	                console.log("objectStorageClass.exist."+varName+" - TRUE ");
	            } else {
	                console.log("objectStorageClass.exist."+varName+" - FALSE ");
	            }
            } else {
                console.log("objectStorageClass.exist - this.localStorageObjName does NOT exist!!!");
            }
        } else {
            console.log("objectStorageClass.exist - LocalStorage NOT supported!");
        }
    },
    setTimeStamp : function(){
        return new Date().getTime(); 
    },
    getTimeStamp : function(){
        return this.localStorageObjData.timeStamp;
    },
    startAutoSave : function(varName, varData, timeInMilliSec){  // Starts "auto save" of a variable "varName".
    	console.log("objectStorageClass.startAutoSave - localStorageObjData 1: " + JSON.stringify(this.localStorageObjData));
    	if (!this.localStorageObjData.hasOwnProperty('autoSaveTimeIdObj')) {
        	console.log("objectStorageClass.startAutoSave - autoSaveTimeIdObj - OK!!");
            this.localStorageObjData.autoSaveTimeIdObj = {};
        } 
        if (!this.localStorageObjData.autoSaveTimeIdObj.hasOwnProperty(varName)) {
        	console.log("objectStorageClass.startAutoSave - autoSaveTimeIdObj."+varName+" - OK!");
            this.localStorageObjData.autoSaveTimeIdObj[varName] = {id: 0, saveCount: 0, maxSaveCount : null};  // "maxSaveCount = null" makes it save indefinitely.
        } 
        console.log("objectStorageClass.startAutoSave - jsonData 2: " + JSON.stringify(this.localStorageObjData));
        console.log("objectStorageClass.startAutoSave - autoSaveTimeIdObj."+varName+" - START");
        var xthis = this;
        var LSA = this.localStorageObjData.autoSaveTimeIdObj[varName];
    	LSA.id = setInterval(function(){ 
    		xthis.save(varName, varData); 
    		++LSA.saveCount;
    		console.log("objectStorageClass.startAutoSave - autoSaveTimeIdObj."+varName+" - SAVE "+ LSA.saveCount);
    		if ((LSA.maxSaveCount !== null) && (LSA.saveCount >= LSA.maxSaveCount)){
    			xthis.stopAutoSave(varName);
    		}
    	}, timeInMilliSec);
    }, 
    stopAutoSave : function(varName){  // Stops "auto save" of a variable "varName".
    	if (this.localStorageObjData.hasOwnProperty('autoSaveTimeIdObj')) {
        	if (this.localStorageObjData.autoSaveTimeIdObj.hasOwnProperty(varName)) {
	        	console.log("objectStorageClass.stopAutoSave - autoSaveTimeIdObj."+varName+" - STOP");
	            clearInterval(this.localStorageObjData.autoSaveTimeIdObj[varName].id);
	        } 
        }
    },
    setAutoSaveMaxCount : function(varName, maxSaveCount){  // Sets the maximum number of times the function startAutoSave saves the variable varName. Set maxSaveCount to null for making it save indefinitely.
    	if (this.localStorageObjData.hasOwnProperty('autoSaveTimeIdObj')) {
        	if (this.localStorageObjData.autoSaveTimeIdObj.hasOwnProperty(varName)) {
	        	console.log("objectStorageClass.setAutoSaveMaxCount - autoSaveTimeIdObj."+varName+".maxSaveCount - SET");
	            this.localStorageObjData.autoSaveTimeIdObj[varName].maxSaveCount = maxSaveCount;
	        } 
        }
    }
}



// VIRKER OK:
// var testJsonObj_2 = {"A": {"A1": 1, "A2": 2, "A3": 3}, "B": {"B1": 1, "B2": 2, "B3": 3}};
// var osc = Object.create(objectStorageClass);
// osc.init('TEST_testJsonObj_2');
// osc.save('testJsonObj_2', testJsonObj_2);
// var testJsonObj = osc.load('A');
// console.log("testJsonObj_2: " + JSON.stringify(testJsonObj));



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  							RUN CODE...
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {
	

	returnLastStudentSession(); // This function gives the student the possibility of loading the last "session".


	
	////////////////////////////////////////////
	//  	TEST	
	////////////////////////////////////////////


	// STEP 0:
	// $('#DataInput').html(step_0_template());

	// STEP 1:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedTexts":[{"textNo":"aaa","selected":true,"subjectTexts":[]}]};
	// $('#DataInput').html(step_1_template());

	// STEP 2:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedTexts":[{"textNo":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"]}],"selectedTextNo":"0"};
	// $('#DataInput').html(step_2_template());

	// STEP 3:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedTexts":[{"textNo":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7]}],"selectedTextNo":"0"};
	// $('#DataInput').html(step_3_template());

	// STEP 4:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedTexts":[{"textNo":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"]}],"selectedTextNo":"0"};
	// $('#DataInput').html(step_4_template());

	// STEP 4b:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedTexts":[{"textNo":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"],"subjectTexts_sentences_2":["aaa","ccc","bbb"]}],"selectedTextNo":"0"};
	// $('#DataInput').html(step_4b_template());
	// makeSortable(); // VIGTIG: DENNE SKAL VÆRE AKTIV VED TEST (ellers er DOM-elementer ikke tilstæde!)

	// STEP 5:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedTexts":[{"textNo":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"],"subjectTexts_sentences_2":["aaa","ccc","bbb"]}],"selectedTextNo":"0"};
	// $('#DataInput').html(step_5_template());

	// STEP 6:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedTexts":[{"textNo":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"],"subjectTexts_sentences_2":["aaa","ccc","bbb"],"sentenceStarters_begin_text":"indledende sætning"}],"selectedTextNo":"0"};
	// $('#DataInput').html(step_6_template());

	// STEP 6b:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedTexts":[{"textNo":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"],"subjectTexts_sentences_2":["aaa","ccc","bbb"],"sentenceStarters_begin_text":"indledende sætning","sentenceStarters_end_text":"afsluttende sætning"}],"selectedTextNo":"0"};
	// $('#DataInput').html(step_6b_template());

	// STEP 7:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"value":"Hvis nogen skulle være i tvivl om at det er et problem at ..., så bør man tænke på at ..."},{"value":"Debatten handler om ..."},{"value":"For det første er det vigtigt at huske på ..."},{"value":"Mange mener at ..., men man kan også argumentere for ..."},{"value":"Mit hovedsynspunkt er ..."},{"value":"På den ene side ..., men på den anden side ..."},{"value":"Det er vigtigt at ..., men det er også vigtigt ..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"value":"Alle kan blive enige om at det er et problem at ... (generel vinkel)"},{"value":"Det er et velkendt standpunkt i debatten om ..., at .... (generel vinkel)"},{"value":"Sidst jeg var i supermarkedet overhørte jeg en samtale omkring ..., hvilket fik mig til at tænke på, at det er et stort problem at vi .... (konkret vinkel)"}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"value":"Afslutningsvis kan man sige at ..."},{"value":"Når alt kommer til alt er der meget som taler for at ..."},{"value":"Til sidst vil jeg bare sige at jeg synes at det er totalt for dårligt at ..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"currentStep":0,"studentSelectedTexts":[{"textNo":"Kvantemekanik","selected":true,"subjectTexts":["Oscillator","Partikel i brønd","Bølgefunktioner","Diffrentialligninger","dualitet","singlet","triplet","Heisenberg","schrödinger"],"subjectTexts_selected":[0,3,7],"subjectTexts_sentences":["Ocillator sætninger","Diffrentialligning sætning","Heisenberg sætning"],"subjectTexts_sentences_2":["Diffrentialligning sætning","Ocillator sætninger","Heisenberg sætning"],"sentenceStarters_begin_text":"Niels Bohr betragtes som en af kvantemekanikkens fædre...","sentenceStarters_end_text":"Kvantemekanikken kan slutteligt siges at være ejendommelig.","studentSubjectTitel":["Kvantemekanikkens elementer"]}],"selectedTextNo":"0"};
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedTexts":[{"textNo":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"],"subjectTexts_sentences_2":["aaa","ccc","bbb"],"sentenceStarters_begin_text":"indledende sætning","sentenceStarters_end_text":"afsluttende sætning","studentSubjectTitel":["overskrift"]}],"selectedTextNo":"0"};
	// $('#DataInput').html(step_7_template());


	//#####################  DESIGN  #####################


	// $('#DataInput').html(step_6_template());

	// $('#DataInput').html(step_6b_template());

	// $('#DataInput').html(step_7_template());
	
});


