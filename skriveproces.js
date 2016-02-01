

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


//====================================================== 
//		Funktioner til shared_functions.js
//======================================================


// function instruction(instructionText) {
// 	HTML =  '<h4 class="instruktion">';
// 	HTML += 	'<div class="left glyphicon glyphicon-arrow-right"></div>';
// 	HTML += 	'<div class="left instructionText">'+instructionText+'</div>';
// 	HTML += '</h4>';
// 	HTML += '<div class="Clear"></div>';
// 	return HTML;
// }

// function explanation(explanationText) {
// 	HTML =  '<div class="explanation">';
// 	HTML += 	'<div class="left glyphicon glyphicon-bookmark"></div>';
// 	HTML += 	'<div class="left explanationText">'+explanationText+'</div>';
// 	HTML += 	'<div class="Clear"></div>';
// 	HTML += '</div>';
// 	return HTML;
// }


//################################################################################################################################
//
//									VERSION 2	-	MAMs med rettelser fra d. 07-01-2016
//
//################################################################################################################################

// Audio:
// http://www.w3schools.com/html/tryit.asp?filename=tryhtml5_audio_all

// Bootstrap input fields
// http://getbootstrap.com/components/#input-groups


// BUGS 18-01-2016:
// ----------------
// STEP 1: 	Hvis man først har valgt et emne (via btn), og senere skriver et emne selv, så er btn stadig selected - ret dettet! <--- OK!!
// STEP 1: 	Hvis man først har valgt et emne, og givet dette emne data i step 2, 3, ..., så skal der komme en advarsel hvis man 
//			går tilbage og vælger et andet emne.  <--- OK!! Objektet husker nu alle emner emner - også dem man selv skriver.
// STEP 7: 	Download word-fil viker ikke i safari!!!

// STEP 4: 	Autoplay på playeren gør at afspilningen starter forfra når der trykkes på en af ordene - det skal den ikke.

// ALLE STEPS: Sæt nogle events på playerens play symbol - (se "paused" og "ended" property): http://www.w3schools.com/tags/ref_av_dom.asp


// BUGS 21-01-2016:
// ----------------
// STEP 4: 	"Gå videre" skal _KUN_ bruges til at gå til step 5. 

// TIL KVALITETSCIRKLEN: Lav en skabelon til objekt #2b


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


function getSelected(varType){
	for (var n in jsonData.studentSelectedSubject){
    	if (jsonData.studentSelectedSubject[n].selected){
    		if (jsonData.studentSelectedSubject[n].hasOwnProperty(varType)){
    			return jsonData.studentSelectedSubject[n][varType];
    		} else {
    			alert('getSelected - ERROR: varType: "' + varType + '" does not exist!');
    		}
    	}
    }
    alert('getSelected - ERROR: No subject is selected by the student!');
}


// {name: studentSelectedSubject, val: [], selected: false}
function setSelected(varType, varValue){
	for (var n in jsonData.studentSelectedSubject){
    	if (jsonData.studentSelectedSubject[n].selected){
    		if (jsonData.studentSelectedSubject[n].hasOwnProperty(varType)){
    			jsonData.studentSelectedSubject[n][varType] = varValue;
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
	// HTML += '<span class="btn btn-info">TEST</span>';
	// HTML += '<audio controls="controls">';
	console.log("returnAudioControls - autoPlay: " + autoPlay);
	HTML += '<audio id="audioPlayer" controls="controls"'+((autoPlay)?' autoplay="autoplay"':'')+'>';
	// HTML += '<audio controls="controls"'+((autoPlay)?' autoplay="autoplay"':'')+' onclick="autoPlayControl(this);">';
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


function returnStudentSubjectArray(){
	var StudentSubjectArray = [];
	for (var n in jsonData.studentSelectedSubject){
		StudentSubjectArray.push(jsonData.studentSelectedSubject[n].subjectName);
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


function hasNonEmptyStrElm(Tarray) {
	console.log("hasNonEmptyStrElm - Tarray: " + Tarray);
	for (var n in Tarray) {
		if (Tarray[n] === '') return true;
		if (Tarray[n] === null) return true;
	}
	return false;
}


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
console.log('replaceWildcard: ' + replaceWildcard('Dun har ??? gode cykler tilrådighed, eller ??? dårlige?', 20)); 





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
	osc.init('studentSession');
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
			setJsAudioEventLitsner();
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
	HTML = replaceWildcard(HTML, jsonData.numOfChoosenWords);
	return HTML;
}

$( document ).on('click', "#step_0_goOn", function(event){
	$('#DataInput').html(step_1_template());
	setJsAudioEventLitsner();
});


//////////////////////
//  	STEP 1 		//
//////////////////////


function step_1_template(){
	console.log("step_1_template - jsonData 1: " + JSON.stringify(jsonData)); 
	jsonData.currentStep = 1;
	osc.save('jsonData', jsonData);
	var stepNo = 1;
	var subjectName = null;
	if (jsonData.hasOwnProperty("studentSelectedSubject")){
		subjectName = getSelected('subjectName');
	}
	var HTML = '';
	HTML += '<div id="step_1" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_1" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');
	HTML += 			'<div id="SubjectContainer" class="btnActions">';
			var JS = jsonData.subjects;
			for (var n in JS){
				HTML += 	'<span class="Subjects btn btn-'+((subjectName === JS[n])?'primary':'info')+'" >'+JS[n]+'</span>';
			}
	HTML += 			'</div>';
	HTML += 			'<div class="stepInput">';
	HTML += 				'<span class="helperText">Eller vælg dit eget emne:</span>';
	HTML +=					returnInputBoxes3(1, 'studentSubject', 'Skriv dit emne her...');
	HTML += 			'</div>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_1_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
	HTML +=					'<div class="Clear"></div>';
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard(HTML, jsonData.numOfChoosenWords);
	return HTML;
}


function studentChangeSubject(newSubjectName) {
	if (jsonData.hasOwnProperty("studentSelectedSubject")){
    	for (var n in jsonData.studentSelectedSubject){
	    	if (jsonData.studentSelectedSubject[n].selected){
	    		if ((jsonData.studentSelectedSubject[n].subjectTexts.length > 0) && (jsonData.studentSelectedSubject[n].subjectName != newSubjectName)){
	    			var HTML = 'ADVARSEL: Du er ved at skifte emne fra: "'+jsonData.studentSelectedSubject[n].subjectName+'" til "'+newSubjectName+'" - du vi miste alle de indtastede data til det gamle emne! <br/> <br/> Vil du skifte emne?';
	    			HTML += '<div><span class="btn btn-success">ja</span><span class="btn btn-danger">nej</span></div>';
	    			UserMsgBox('body',HTML);

	    			$('#UserMsgBox').unbind('click');
	    			$('.MsgBox_bgr').unbind('click');

	    			$( document ).on('click', ".btn-success", function(event){
                        console.log("objectStorageClass.init - btn-success - CLICK" ); 
                        console.log("studentChangeSubject - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject));
                        for (var n in jsonData.studentSelectedSubject){

                        	// jsonData.studentSelectedSubject[n] = {subjectName: newSubjectName, selected: false, subjectTexts: [] };

					    	if (newSubjectName == jsonData.studentSelectedSubject[n].subjectName){
					    		jsonData.studentSelectedSubject[n].selected = true;
					    	} else {
					    		jsonData.studentSelectedSubject[n].selected = false;
					    	}
					    }
					    console.log("studentChangeSubject - jsonData.studentSelectedSubject 2: " + JSON.stringify(jsonData.studentSelectedSubject));

				        $(".MsgBox_bgr").fadeOut(200, function() {
				            $(".MsgBox_bgr").remove();
				        });
					    
                    });

                    $( document ).on('click', ".btn-danger", function(event){
                        console.log("objectStorageClass.init - btn-danger - CLICK" ); 

                        $(".MsgBox_bgr").fadeOut(200, function() {
				            $(".MsgBox_bgr").remove();
				        });
                    });

	    			return true;
	    		}
	    	}
	    }
    } 
    return false;
}


$( document ).on('focusin', ".studentSubject", function(event){
	$('.Subjects').removeClass('btn-primary').addClass('btn-info');
});


$( document ).on('click', ".Subjects", function(event){
	window.studentSubjectPressed = true;
    console.log("Subjects - PRESSED");
    $('.Subjects').removeClass('btn-primary').addClass('btn-info');
    $(this).addClass('btn-primary');

    $('.studentSubject').val('');

    var studentSelectedSubject = $(this).text();

    if (!jsonData.hasOwnProperty("studentSelectedSubject")){
    	jsonData.studentSelectedSubject = [];
    }

    if (!elementInArray(returnStudentSubjectArray(), studentSelectedSubject)) {  // If studentSelectedSubject is not allready in studentSelectedSubject.subjectName, then add it: 
    	jsonData.studentSelectedSubject.push({subjectName: studentSelectedSubject, selected: false, subjectTexts: [] });
	}

    console.log("Subjects - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 

    // if (!studentChangeSubject(studentSelectedSubject)){
	    for (var n in jsonData.studentSelectedSubject){
	    	if (studentSelectedSubject == jsonData.studentSelectedSubject[n].subjectName){
	    		jsonData.studentSelectedSubject[n].selected = true;
	    	} else {
	    		jsonData.studentSelectedSubject[n].selected = false;
	    	}
	    }
	// }

	jsonData.selectedSubjectElementNum = returnElementNumInArray(returnStudentSubjectArray(), studentSelectedSubject);
	console.log("Subjects - jsonData.selectedSubjectElementNum: " + jsonData.selectedSubjectElementNum);  // <------- ########  SE HER !!! ##############

    console.log("Subjects - jsonData.studentSelectedSubject 2: " + JSON.stringify(jsonData.studentSelectedSubject)); 

});

$( document ).on('click', "#step_1_goOn", function(event){

	if (typeof(fallbackStudentSubject) === 'undefined'){
		window.fallbackStudentSubject = null;
	}

	var studentSubject = htmlEntities($('.studentSubject').val());
	console.log("step_1_goOn - studentSubject: " + studentSubject + ", studentSubject.length: " + studentSubject.length);

		if (studentSubject.length > 0){

			console.log("step_1_goOn - jsonData 1: " + JSON.stringify(jsonData)); 

		    if (!elementInArray(returnStudentSubjectArray(), studentSubject)){

				if (!jsonData.hasOwnProperty("studentSelectedSubject")){
			    	jsonData.studentSelectedSubject = [];
			    }

				for (var n in jsonData.studentSelectedSubject){
			    	jsonData.studentSelectedSubject[n].selected = false;
			    }

				jsonData.studentSelectedSubject.push({subjectName: studentSubject, selected: true, subjectTexts: [] });
			}
			// jsonData.subjects.push(studentSubject);  // Commented out 08-01-2016: We desided against saveing all subjects.

			jsonData.selectedSubjectElementNum = returnElementNumInArray(returnStudentSubjectArray(), studentSubject);
			console.log("step_1_goOn - jsonData.selectedSubjectElementNum: " + jsonData.selectedSubjectElementNum);  // <------- ########  SE HER !!! ##############
			jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum].selected = true;
			console.log("step_1_goOn - jsonData.studentSelectedSubject 0: " + JSON.stringify(jsonData.studentSelectedSubject));

		}

		console.log("step_1_goOn - fallbackStudentSubject: " + fallbackStudentSubject); 
		console.log("step_1_goOn - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 

		console.log("step_1_goOn - fallbackStudentSubject: " + fallbackStudentSubject + ", studentSubject: " + studentSubject);

		if (((typeof(studentSubjectPressed) !== "undefined") && (studentSubjectPressed == true)) || (studentSubject.length > 0)){

		    // ORGINAL KODE:
			fallbackStudentSubject = studentSubject;
		 	$('#DataInput').html(step_2_template());
		 	setJsAudioEventLitsner();
		} else {
			UserMsgBox("body", "Du skal vælge et emne, eller skrive et valfrit emne, før du kan gå videre!");
		}
	// }
});



//////////////////////
//  	STEP 2 		//
//////////////////////

function step_2_template(){
	console.log("step_2_template - jsonData 1: " + JSON.stringify(jsonData)); 
	jsonData.currentStep = 2;
	osc.save('jsonData', jsonData);
	var studentSubjectArray = returnStudentSubjectArray();
	var subjectName = getSelected('subjectName');
	jsonData.selectedSubjectElementNum = returnElementNumInArray(studentSubjectArray, subjectName);  // Save selectedSubjectElementNum in jsonData
	var stepNo = 2;
	var HTML = '';
	HTML += '<div id="step_2" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_2" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction + subjectName):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div id="subjectWordContainer" class="btnActions">';
				console.log("step_2_template - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 
				
				if (jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum].subjectTexts.length > 0){
					var subjectTexts = getSelected('subjectTexts');
					subjectTexts = removeEmptyElements(subjectTexts);
					HTML += returnInputBoxes3(subjectTexts.length, 'subjectWordField', subjectTexts);
					var numOfEmptyFields = (jsonData.numOfChoosenWords - subjectTexts.length <= 0)? 1 : jsonData.numOfChoosenWords - subjectTexts.length;
					HTML += returnInputBoxes3(numOfEmptyFields, 'subjectWordField', 'Skriv ord her...');
					console.log('step_2_template - 1');
				} else {
					HTML += returnInputBoxes3(3, 'subjectWordField', 'Skriv ord her...');
					console.log('step_2_template - 2');
				}
	HTML += 			'</div>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_2_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_2_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard(HTML, jsonData.numOfChoosenWords);
	return HTML;
}


$( document ).on('focusout', ".subjectWordField", function(event){ 
	// Save the choosen words 1:
	var subjectTextsArray = [];
	$( ".subjectWordField" ).each(function( index, element ) {
		subjectTextsArray.push(htmlEntities($(element).val()));
	});
	subjectTextsArray = removeEmptyElements(subjectTextsArray); // Remove the empty elements
	setSelected('subjectTexts', subjectTextsArray);
	console.log("step_2_goOn - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 
});

// $( document ).on('focusout', ".subjectWordField", function(event){  
$( document ).on('focusin', ".subjectWordField", function(event){

	// var subjectTextsArray = [];
	var filledSubjectWordField = 0;
	var numOfSubjectWordField = $('.subjectWordField').length;
	$( ".subjectWordField" ).each(function( index, element ) {
		if ($(element).val().length > 0){
			++filledSubjectWordField;
		}
	});
	console.log("focusin - numOfSubjectWordField: " + numOfSubjectWordField + ", filledSubjectWordField: " + filledSubjectWordField); 
	console.log("focusin - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 

	var Ajust = 0;
	if ($(this).val().length > 0) {  // This prevents an extra field of being added if an old field with text inside is being edited.
		Ajust = 1;
	}

	if (filledSubjectWordField == numOfSubjectWordField-1+Ajust){
		$('#subjectWordContainer').append(returnInputBoxes3(1, 'subjectWordField', 'Skriv ord her...'));
	}
});

$( document ).on('click', "#step_2_goBack", function(event){
	$('#DataInput').html(step_1_template());
	setJsAudioEventLitsner();

	var subjectNameSelected = getSelected('subjectName');
	if (!elementInArray(jsonData.subjects, subjectNameSelected)) {  // If subjectNameSelected is NOT in jsonData.subjects, then subjectNameSelected is written in the input-text-field... 
		$('.studentSubject').val(subjectNameSelected); 
	}
});

$( document ).on('click', "#step_2_goOn", function(event){

	var subjectTextsArray = getSelected('subjectTexts');
	subjectTextsArray = removeEmptyElements(subjectTextsArray); // Remove the empty elements
	setSelected('subjectTexts', subjectTextsArray);

	if (subjectTextsArray.length >= jsonData.numOfChoosenWords){
		$('#DataInput').html(step_3_template());
		setJsAudioEventLitsner();
	} else {
		UserMsgBox("body", 'Du skal skrive mindst '+jsonData.numOfChoosenWords+' ord før du kan gå videre. Du har kun skrevet '+subjectTextsArray.length+' ord.');
	}

});


//////////////////////
//  	STEP 3 		//
//////////////////////


function step_3_template(){
	console.log("step_3_template - jsonData 1: " + JSON.stringify(jsonData)); 
	jsonData.currentStep = 3;
	osc.save('jsonData', jsonData);
	var stepNo = 3;
	var HTML = '';
	HTML += '<div id="step_3" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_3" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div id="subjectWordField_btn_Container" class="btnActions">';
			var subjectTexts = getSelected('subjectTexts');
			if (jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum].hasOwnProperty('subjectTexts_selected')){
				var subjectTexts_selected = getSelected('subjectTexts_selected');
				for (var i = 0; i < subjectTexts.length; i++) {
					HTML += '<span class="subjectWordField_btn btn btn-'+((elementInArray(subjectTexts_selected, i))?'primary':'info')+'">'+subjectTexts[i]+'</span>';
				}
			} else {
				for (var n in subjectTexts){
					HTML += '<span class="subjectWordField_btn btn btn-info">'+subjectTexts[n]+'</span>';
				}
			}
	HTML += 			'</div>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_3_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_3_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard(HTML, jsonData.numOfChoosenWords);
	return HTML;
}


$( document ).on('click', ".subjectWordField_btn", function(event){
	$(this).toggleClass('btn-primary btn-info');

	if (!jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum].hasOwnProperty('subjectTexts_selected')){
		jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum].subjectTexts_selected = [];
	}

	var Tarray = []
	$( ".subjectWordField_btn" ).each(function( index, element ) {
		if ($(element).hasClass('btn-primary')){
			Tarray.push($(element).index());
		}
	});
	jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum].subjectTexts_selected = Tarray;
	console.log("subjectWordField_btn - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 
	console.log('subjectWordField_btn - index: ' + $(this).index());
});


$( document ).on('click', "#step_3_goBack", function(event){
	$('#DataInput').html(step_2_template());
	setJsAudioEventLitsner();
});


$( document ).on('click', "#step_3_goOn", function(event){

	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
	if (!JSN.hasOwnProperty('subjectTexts_selected')){
		JSN.subjectTexts_selected = [];
	}

	var numOfWords = JSN.subjectTexts_selected.length;
	console.log('step_3_goOn - numOfWords: ' + numOfWords + ', jsonData.numOfChoosenWords: ' + jsonData.numOfChoosenWords);

	if (numOfWords >= jsonData.numOfChoosenWords){
		$('#DataInput').html(step_4_template());
		setJsAudioEventLitsner();
	} else {
		UserMsgBox("body", 'Du skal vælge '+jsonData.numOfChoosenWords+' ord før du kan gå videre. Du har valgt ' + numOfWords + ' ord.');
	}
});



//////////////////////
//  	STEP 4 		//
//////////////////////



function step_4_template(){
	jsonData.currentStep = 4;
	osc.save('jsonData', jsonData);
	console.log("step_4_template - wordCount: " + ((typeof(wordCount) !== 'undefined')?wordCount:'undefined'));
	console.log("step_4_template - jsonData 1: " + JSON.stringify(jsonData)); 
	console.log("step_4_template - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 
	if ((typeof(wordCount) === 'undefined') || (wordCount === null)) { 
		window.wordCount = 0;
	} else {
		++wordCount;
	}
	if (typeof(autoPlay) === 'undefined'){
		window.autoPlay = true;
	} 
	if (typeof(TautoPlay) === 'undefined'){
		window.TautoPlay = autoPlay;  // This remembers the state before step 4.
		console.log("step_4_template - TautoPlay: " + TautoPlay);
	}
	if (wordCount > 0) {  // This ensures that the player does not start when the word-buttons > 0 are pressed.
		autoPlay = false;
	}
	console.log("step_4_template - wordCount: " + wordCount);
	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
	var stepNo = 4;
	var HTML = '';
	HTML += '<div id="step_4" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';

	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_4" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div id="subjectWordSentenceContainer" class="btnActions">';
			var subjectTexts = getSelected('subjectTexts');
			var subjectTexts_selected = getSelected('subjectTexts_selected');
			for (var i = 0; i < subjectTexts_selected.length; i++) {
				HTML += 	'<span class="subjectWordField_btn_text btn btn-'+((i == wordCount)?'primary':'info')+'">'+subjectTexts[ subjectTexts_selected[i] ]+'</span>';
			}
	HTML += 			'</div>';
	HTML += 			'<h4>Brug evt. nedenstående sætningsstartere til at skrive videre ud fra:</h4>';

	HTML += 			'<div class="DropdownWrap">';
	HTML += 				returnDropdownMarkup(jsonData.sentenceStarters_word);
	HTML += 			'</div>';

	HTML += 			'<textarea id="textInput_'+wordCount+'" val="">';
			if ((JSN.hasOwnProperty('subjectTexts_sentences')) && (typeof(JSN.subjectTexts_sentences[wordCount]) !== 'undefined')) {
				HTML += JSN.subjectTexts_sentences[wordCount];
			}			
	HTML += 			'</textarea>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_4_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_4_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard(HTML, jsonData.numOfChoosenWords);
	return HTML;
}


$(document).on('change', '#Dropdown1', function(){
	// var selectedText = $('#Dropdown1:selected').text();
	var selectedText = $('#Dropdown1').val();
	console.log("Dropdown1 - selectedText: " + selectedText);
	$('#textInput_'+wordCount).val(selectedText);
});


$( document ).on('click', ".subjectWordField_btn_text", function(event){
	var index = $(this).index();
	console.log("subjectWordField_btn_text - index: " + index);
	 
	// -----------------------
	console.log("subjectWordField_btn_text - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 
	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
	if (!JSN.hasOwnProperty('subjectTexts_sentences')){
		JSN.subjectTexts_sentences = [];
		for (var i = 0; i < jsonData.numOfChoosenWords; i++) {
			JSN.subjectTexts_sentences.push('');
		};
	}

	var sentence = $('#textInput_'+wordCount).val();
	console.log("subjectWordField_btn_text - wordCount: " + wordCount + ", sentence: " + sentence);
	console.log("subjectWordField_btn_text - $('#textInput_'+wordCount).val(): " + $('#textInput_'+wordCount).val());
	
	if (wordCount < jsonData.numOfChoosenWords-1){
		// JSN.subjectTexts_sentences.push(sentence);
		JSN.subjectTexts_sentences[wordCount] = sentence;
		// $('#DataInput').html(step_4_template());
		console.log("subjectWordField_btn_text - jsonData.studentSelectedSubject 2: " + JSON.stringify(jsonData.studentSelectedSubject)); 
	} else {
		JSN.subjectTexts_sentences[wordCount] = sentence;
		// $('#DataInput').html(step_4b_template());
		console.log("subjectWordField_btn_text - jsonData.studentSelectedSubject 3: " + JSON.stringify(jsonData.studentSelectedSubject));
		// makeSortable();
	}

	// -----------------------
	wordCount = index-1; 
	$('#DataInput').html(step_4_template());   // 12-01-2016  <-----------  DATA SKAL GEMMENS HER!!!
	setJsAudioEventLitsner();
});


$( document ).on('click', "#step_4_goBack", function(event){
	if ((typeof(wordCount) === 'undefined') || (wordCount == 0)){
		$('#DataInput').html(step_3_template());
		setJsAudioEventLitsner();
		wordCount = null;
		console.log("step_4_goBack - wordCount: " + wordCount);
	} else {
		--wordCount;  	// Once...
		--wordCount;	// twice... because of the inscreasement inside step_4_template
		$('#DataInput').html(step_4_template());
		setJsAudioEventLitsner();
	}
});

$( document ).on('click', "#step_4_goOn", function(event){
	console.log("step_4_goOn - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 
	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
	if (!JSN.hasOwnProperty('subjectTexts_sentences')){
		JSN.subjectTexts_sentences = [];
		for (var i = 0; i < jsonData.numOfChoosenWords; i++) {
			JSN.subjectTexts_sentences.push('');
		};
	}

	var btnPrimaryText = $("#subjectWordSentenceContainer .btn-primary").text();

	var sentence = htmlEntities($('#textInput_'+wordCount).val());
	console.log("step_4_goOn - wordCount: " + wordCount + ", sentence: " + sentence);
	console.log("step_4_goOn - $('#textInput_'+wordCount).val(): " + $('#textInput_'+wordCount).val());
	if (sentence.length > 0) {
		// if (wordCount < jsonData.numOfChoosenWords-1){
		// 	JSN.subjectTexts_sentences[wordCount] = sentence;
		// 	console.log("step_4_goOn - jsonData.studentSelectedSubject 2: " + JSON.stringify(jsonData.studentSelectedSubject));
			
		// 	$('#DataInput').html(step_4_template());
			
		// } else {
			JSN.subjectTexts_sentences[wordCount] = sentence;
			console.log("step_4_goOn - jsonData.studentSelectedSubject 3: " + JSON.stringify(jsonData.studentSelectedSubject));
			if (!hasNonEmptyStrElm( JSN.subjectTexts_sentences )){
				// JSN.subjectTexts_sentences[wordCount] = sentence;
				console.log("step_4_goOn - jsonData.studentSelectedSubject 4: " + JSON.stringify(jsonData.studentSelectedSubject));
				autoPlay = (typeof(TautoPlay) !== 'undefined')? TautoPlay : autoPlay;  // This sets the remembered state before step 4.
				$('#DataInput').html(step_4b_template());
				setJsAudioEventLitsner();
				makeSortable();
			} else {
				UserMsgBox("body", 'Du skal skrive noget tekst i alle tekstboksene til hver ord - du mangler at skrive tekst til '+returnMissingWords(btnPrimaryText)+'. Tryk på dine ord og skriv sætninger til dem.');
			}
		// }

	} else {
		UserMsgBox("body", "Du skal skrive noget tekst i tekstboksen - brug evt en sætningsstarter fra dropdownen.");
	}

});


function returnMissingWords(btnPrimaryText){
	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
	var wordArray = [];
	for (var n in JSN.subjectTexts_selected){  // Find the missing words:
		var t = JSN.subjectTexts_selected[n];
		if ((typeof(JSN.subjectTexts_sentences[n]) === 'undefined') || (JSN.subjectTexts_sentences[n] == '')){
			// if (JSN.subjectTexts[t] != btnPrimaryText){
				wordArray.push(JSN.subjectTexts[t]);
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


function removeElement(Tarray, element){
	var Sarray = [];
	for (var n in Tarray){
		if (Tarray[n] !== element) Sarray.push(Tarray[n]);
	}
	return Sarray;
}


//////////////////////
//  	STEP 4b 	//
//////////////////////


function step_4b_template(){
	console.log("step_4b_template - jsonData 1: " + JSON.stringify(jsonData));
	jsonData.currentStep = "4b";
	osc.save('jsonData', jsonData);
	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
	var JSNS = (JSN.hasOwnProperty('subjectTexts_sentences_2'))? JSN.subjectTexts_sentences_2 : JSN.subjectTexts_sentences;
	var stepNo = "4b";
	stepNo = getJsonDataArrayIndex(stepNo);
	console.log("step_4b_template - stepNo: " + stepNo);
	var HTML = '';
	HTML += '<div id="step_4b" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';

	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_4b" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');
	HTML += 			'<div id="subjectSentenceSortableContainer" class="btnActions">';
			for (var n in JSNS) {
				HTML += 	'<div id="Sort_"'+n+' class="Sortable sortable_text_container">'+JSNS[n]+'</div>';
			}
	HTML += 			'</div>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_4b_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_4b_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard(HTML, jsonData.numOfChoosenWords);
	return HTML;
}


function makeSortable() {
	// Sort function are placed here due to readiness issues of the DOM:
	$( "#subjectSentenceSortableContainer" ).sortable({
		axis: 'y',
		sortAnimateDuration: 500,
	    sortAnimate: true,
	    distance: 25,
	    update: function(event, ui) {
	    	console.log('makeSortable - UPDATE');
	    	updateSubjectSentenceOrder();
	    },
	    start: function(event, ui) {
	    	console.log('makeSortable - START');
	        console.log('makeSortable - ui.item.index: ' + ui.item.index());
	    },
	    stop: function(event, ui) {
	        console.log('makeSortable - STOP');
	    }
	});
}


function updateSubjectSentenceOrder(){
	console.log("updateSubjectSentenceOrder - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject));
	var Tarray = [];
	$( ".Sortable" ).each(function( index, element ) {
		Tarray.push($(element).text());
	});

	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
	if (!JSN.hasOwnProperty('subjectTexts_sentences')){
		JSN.subjectTexts_sentences_2 = [];
	}
	jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum].subjectTexts_sentences_2 = Tarray;
	console.log("updateSubjectSentenceOrder - jsonData.studentSelectedSubject 2: " + JSON.stringify(jsonData.studentSelectedSubject));
	console.log("updateSubjectSentenceOrder - jsonData 1: " + JSON.stringify(jsonData)); 
}


$( document ).on('click', "#step_4b_goBack", function(event){
	if (typeof(step_4b_hasBeenSorted) === 'undefined'){
		window.step_4b_hasBeenSorted = false;
	}
	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
	if ((!JSN.hasOwnProperty('subjectTexts_sentences_2')) || (step_4b_hasBeenSorted)) {
		window.wordCount = jsonData.numOfChoosenWords-2;  // Sets the state to the last btn of step 4. 
		console.log("step_4b_goBack - wordCount: " + wordCount); 
		$('#DataInput').html(step_4_template());
		setJsAudioEventLitsner();
	}
	if ((JSN.hasOwnProperty('subjectTexts_sentences_2')) && (step_4b_hasBeenSorted == false)) {
		$( ".Sortable" ).each(function( index, element ) {
			$(element).text(JSN.subjectTexts_sentences[index]);
		});
		step_4b_hasBeenSorted = true;
	} 

});

$( document ).on('click', "#step_4b_goOn", function(event){
	$('#DataInput').html(step_5_template());
	setJsAudioEventLitsner();
});



//////////////////////
//  	STEP 5 		//
//////////////////////


function step_5_template(){
	console.log("step_5_template - jsonData 1: " + JSON.stringify(jsonData));
	jsonData.currentStep = 5;
	osc.save('jsonData', jsonData);
	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
	var stepNo = 5;
	stepNo = getJsonDataArrayIndex(stepNo);
	var HTML = '';
	HTML += '<div id="step_5" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_5" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<h4>Brug evt. nedenstående sætningsstartere til at skrive videre ud fra:</h4>';

	HTML += 			'<div class="DropdownWrap">';
	HTML += 				returnDropdownMarkup(jsonData.sentenceStarters_begin);
	HTML += 			'</div>';
	
	HTML += 			'<textarea id="textInput2" val="">';
			HTML += (JSN.hasOwnProperty('sentenceStarters_begin_text'))? JSN.sentenceStarters_begin_text : '';
	HTML += 			'</textarea>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_5_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_5_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard(HTML, jsonData.numOfChoosenWords);
	return HTML;
}


$(document).on('change', '#Dropdown2', function(){
	// var selectedText = $('#Dropdown1:selected').text();
	var selectedText = $('#Dropdown2').val();
	console.log("Dropdown1 - selectedText: " + selectedText);
	$('#textInput2').val(selectedText);
	jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum].JSN.sentenceStarters_begin_text = textInputText;
});

$( document ).on('click', "#step_5_goBack", function(event){
	$('#DataInput').html(step_4b_template());
	setJsAudioEventLitsner();
	makeSortable();
});

$( document ).on('click', "#step_5_goOn", function(event){
	console.log("step_5_goOn - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject));
	var textInputText = htmlEntities($('#textInput2').val());
	if (textInputText.length > 0) {
		var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
		JSN.sentenceStarters_begin_text = textInputText;
		$('#DataInput').html(step_6_template());
		setJsAudioEventLitsner();
	}
	console.log("step_5_goOn - jsonData.studentSelectedSubject 2: " + JSON.stringify(jsonData.studentSelectedSubject));
});

//////////////////////
//  	STEP 6 		//
//////////////////////


function step_6_template(){
	console.log("step_6_template - jsonData 1: " + JSON.stringify(jsonData));
	jsonData.currentStep = 6;
	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
	var stepNo = 6;
	stepNo = getJsonDataArrayIndex(stepNo);
	var HTML = '';
	HTML += '<div id="step_6" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_6" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<h4>Brug evt. nedenstående sætningsstartere til at skrive videre ud fra:</h4>';

	HTML += 			'<div class="DropdownWrap">';
	HTML += 				returnDropdownMarkup(jsonData.sentenceStarters_end);
	HTML += 			'</div>';
	
	HTML += 			'<textarea id="textInput3" val="">';
			HTML += (JSN.hasOwnProperty('sentenceStarters_end_text'))? JSN.sentenceStarters_end_text : '';
	HTML += 			'</textarea>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_6_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_6_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	return HTML;
}


$(document).on('change', '#Dropdown3', function(){
	// var selectedText = $('#Dropdown1:selected').text();
	var selectedText = $('#Dropdown3').val();
	console.log("Dropdown3 - selectedText: " + selectedText);
	$('#textInput3').text(selectedText);
	jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum].JSN.sentenceStarters_end_text = textInputText;
});

$( document ).on('click', "#step_6_goBack", function(event){
	$('#DataInput').html(step_5_template());
	setJsAudioEventLitsner();
});

$( document ).on('click', "#step_6_goOn", function(event){
	console.log("step_6_goOn - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject));
	var textInputText = htmlEntities($('#textInput3').val());
	if (textInputText.length > 0) {
		var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
		JSN.sentenceStarters_end_text = textInputText;
		$('#DataInput').html(step_6b_template());
		setJsAudioEventLitsner();
	}
	console.log("step_6_goOn - jsonData.studentSelectedSubject 2: " + JSON.stringify(jsonData.studentSelectedSubject));
});

//////////////////////
//  	STEP 6b 	//
//////////////////////


function step_6b_template(){
	console.log("step_6b_template - jsonData 1: " + JSON.stringify(jsonData));
	jsonData.currentStep = "6b";
	osc.save('jsonData', jsonData);
	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
	var stepNo = "6b";
	stepNo = getJsonDataArrayIndex(stepNo);
	var HTML = '';
	HTML += '<div id="step_6b" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div id="subjectHeadingContainer" class="col-xs-12 col-md-8">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_6b" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	// HTML += 			returnInputBoxes3(1, 'studentSubjectTitel', ' Skriv din overskrift her');
			var studentSubjectTitel = (JSN.hasOwnProperty('studentSubjectTitel'))? JSN.studentSubjectTitel : 'Skriv din overskrift her';
	HTML += 			returnInputBoxes3(1, 'studentSubjectTitel', studentSubjectTitel);
	
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_6b_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_6b_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard(HTML, jsonData.numOfChoosenWords);
	return HTML;
}


$( document ).on('click', "#step_6b_goBack", function(event){
	$('#DataInput').html(step_6_template());
	setJsAudioEventLitsner();
});

$( document ).on('click', "#step_6b_goOn", function(event){
	console.log("step_6b_goOn - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject));
	var textInputText = htmlEntities($('.studentSubjectTitel').val());
	if (textInputText.length > 0) {
		var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
		JSN.studentSubjectTitel = [];
		JSN.studentSubjectTitel[0] = textInputText;
		$('#DataInput').html(step_7_template());
		setJsAudioEventLitsner();
	}
	console.log("step_6b_goOn - jsonData.studentSelectedSubject 2: " + JSON.stringify(jsonData.studentSelectedSubject));
});


//////////////////////
//  	STEP 7 		//
//////////////////////


function step_7_template(){
	console.log("step_7_template - jsonData 1: " + JSON.stringify(jsonData));
	jsonData.currentStep = 7;
	osc.save('jsonData', jsonData);
	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
	var stepNo = "7";
	stepNo = getJsonDataArrayIndex(stepNo);
	var HTML = '';
	HTML += '<div id="step_7" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div id="XXXXXXX" class="col-xs-12 col-md-8">';

	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_7" class="stepHeader">'+jsonData.steps[stepNo].header+' - '+jsonData.headerAndWordTemplateHeader.toLowerCase()+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div class="TextHolder">';
	// HTML += 				'<h3>Titel står her</h3><p>Alle kan blive enige om at det er et problem at vi nu har opbygget så meget af verdens energiforbrug på atomkraft, da det har så stor risiko for fremtiden knyttet til sig.</p><p>Hvis nogen skulle være i tvivl om at det er et problem at vi får så meget energi fra atomkraft, så bør man tænke på ulykken i Tjernobyl.</p><p>Mit hovedsynspunkt er at det er uforsvarligt overfor fremtidens børn at bygge et energiforbrug op der har så ukendte konsekvenser for fremtiden.</p><p>På den ene side kan man være for atomkraft, da der reelt er mange fordele ved at skrue op for brugen af atomkraft og derved mindske forbruget af fossile brændstoffer, indtil vi har bedre og renere energikilder i det omfang det kræves til den voksende verdensbefolkning. På den anden siden kan man være i mod atomkraft da man med rette kan hævde at vi reelt ikke hvad der vil ske med det opbevarede atomaffald.</p><p>Afslutningsvis kan man sige at fremtiden nok vil afgøre atomkrafts skæbne. Enten vil der ske en voldsomulykke der gør at menneskeheden dropper det, eller så vil nye energikilder vinde hastigt frem.</p>';
	HTML += 				'<h3>'+JSN.studentSubjectTitel[0]+'</h3>';
	HTML += 				'<p>'+JSN.sentenceStarters_begin_text+'</p>';
			for (var n in JSN.subjectTexts_sentences_2){
				HTML += 	'<p>'+JSN.subjectTexts_sentences_2[n]+'</p>';
			}
	HTML += 				'<p>'+JSN.sentenceStarters_end_text+'</p>';

	HTML += 			'</div>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_7_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_7_download" class="btn btn-lg btn-primary">DOWNLOAD Word fil (.docx)</span>';
	// HTML += 				returnAudioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard(HTML, jsonData.numOfChoosenWords);
	return HTML;
}


$( document ).on('click', "#step_7_goBack", function(event){
	$('#DataInput').html(step_6b_template());
	setJsAudioEventLitsner();
});


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


function wordTemplate() {
	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
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
	HTML += 		'<h1>'+jsonData.headerAndWordTemplateHeader+'</h1>';
	HTML += 		'<hr/>';
	HTML += 		'<div class="instruktion">';
	HTML += 			'<h3>Dit valgte emne: </h3>';
	HTML += 			'<h4>'+getSelected('subjectName')+'</h4>';
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
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedSubject":[{"subjectName":"aaa","selected":true,"subjectTexts":[]}]};
	// $('#DataInput').html(step_1_template());

	// STEP 2:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedSubject":[{"subjectName":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"]}],"selectedSubjectElementNum":"0"};
	// $('#DataInput').html(step_2_template());

	// STEP 3:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedSubject":[{"subjectName":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7]}],"selectedSubjectElementNum":"0"};
	// $('#DataInput').html(step_3_template());

	// STEP 4:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedSubject":[{"subjectName":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"]}],"selectedSubjectElementNum":"0"};
	// $('#DataInput').html(step_4_template());

	// STEP 4b:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedSubject":[{"subjectName":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"],"subjectTexts_sentences_2":["aaa","ccc","bbb"]}],"selectedSubjectElementNum":"0"};
	// $('#DataInput').html(step_4b_template());
	// makeSortable(); // VIGTIG: DENNE SKAL VÆRE AKTIV VED TEST (ellers er DOM-elementer ikke tilstæde!)

	// STEP 5:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedSubject":[{"subjectName":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"],"subjectTexts_sentences_2":["aaa","ccc","bbb"]}],"selectedSubjectElementNum":"0"};
	// $('#DataInput').html(step_5_template());

	// STEP 6:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedSubject":[{"subjectName":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"],"subjectTexts_sentences_2":["aaa","ccc","bbb"],"sentenceStarters_begin_text":"indledende sætning"}],"selectedSubjectElementNum":"0"};
	// $('#DataInput').html(step_6_template());

	// STEP 6b:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedSubject":[{"subjectName":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"],"subjectTexts_sentences_2":["aaa","ccc","bbb"],"sentenceStarters_begin_text":"indledende sætning","sentenceStarters_end_text":"afsluttende sætning"}],"selectedSubjectElementNum":"0"};
	// $('#DataInput').html(step_6b_template());

	// STEP 7:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"value":"Hvis nogen skulle være i tvivl om at det er et problem at ..., så bør man tænke på at ..."},{"value":"Debatten handler om ..."},{"value":"For det første er det vigtigt at huske på ..."},{"value":"Mange mener at ..., men man kan også argumentere for ..."},{"value":"Mit hovedsynspunkt er ..."},{"value":"På den ene side ..., men på den anden side ..."},{"value":"Det er vigtigt at ..., men det er også vigtigt ..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"value":"Alle kan blive enige om at det er et problem at ... (generel vinkel)"},{"value":"Det er et velkendt standpunkt i debatten om ..., at .... (generel vinkel)"},{"value":"Sidst jeg var i supermarkedet overhørte jeg en samtale omkring ..., hvilket fik mig til at tænke på, at det er et stort problem at vi .... (konkret vinkel)"}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"value":"Afslutningsvis kan man sige at ..."},{"value":"Når alt kommer til alt er der meget som taler for at ..."},{"value":"Til sidst vil jeg bare sige at jeg synes at det er totalt for dårligt at ..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"currentStep":0,"studentSelectedSubject":[{"subjectName":"Kvantemekanik","selected":true,"subjectTexts":["Oscillator","Partikel i brønd","Bølgefunktioner","Diffrentialligninger","dualitet","singlet","triplet","Heisenberg","schrödinger"],"subjectTexts_selected":[0,3,7],"subjectTexts_sentences":["Ocillator sætninger","Diffrentialligning sætning","Heisenberg sætning"],"subjectTexts_sentences_2":["Diffrentialligning sætning","Ocillator sætninger","Heisenberg sætning"],"sentenceStarters_begin_text":"Niels Bohr betragtes som en af kvantemekanikkens fædre...","sentenceStarters_end_text":"Kvantemekanikken kan slutteligt siges at være ejendommelig.","studentSubjectTitel":["Kvantemekanikkens elementer"]}],"selectedSubjectElementNum":"0"};
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedSubject":[{"subjectName":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"],"subjectTexts_sentences_2":["aaa","ccc","bbb"],"sentenceStarters_begin_text":"indledende sætning","sentenceStarters_end_text":"afsluttende sætning","studentSubjectTitel":["overskrift"]}],"selectedSubjectElementNum":"0"};
	// $('#DataInput').html(step_7_template());


	//#####################  DESIGN  #####################


	// $('#DataInput').html(step_6_template());

	// $('#DataInput').html(step_6b_template());

	// $('#DataInput').html(step_7_template());
	
});



