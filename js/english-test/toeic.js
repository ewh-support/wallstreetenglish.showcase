 
/*
 * Main JS Toeic Test
 */

$(document).ready(function(){

	var totalQuestion = 40;
	var currentQuestion = 0;
	var currentQuestionInPart = 0;
	var currentSection = "Listening";
	var currentChoiceWrapper = "#choice-part-01";
	var currentPartSection = 0;
	var currentPart = 0;
	var currentSectionData;
	var currentMaterials = 0;
	var directionIsOpen = false;
	var mainAudioIsPlaying = false;
	var playedAudio = false;
	
	var resultObj = new Array();
	var resulListeningtObj = new Array();
	var resulReadingObj = new Array(); 
	
	var reponsive_type_submit;
	var datas;
	var current_audio = "";	
	var current_audio_direction = "";
	var current_audio_example = "";
	var firstTimePlay = true;
	var timeLimit = 30*60*1000;
	var lastScore = 0;
	var levelTitle = new Array("BASIC","ELEMENTARY","INTERMEDIATE","ADVANCED","PROFICIENT","EXPERT");
	
	var audio_directions = new Array(
			'/js/english-test/mp3/Listening Comprehension.mp3',
			'/js/english-test/mp3/Part 1 - Directions.mp3',
			'/js/english-test/mp3/Part 1 - Example.mp3',
			'/js/english-test/mp3/Part 2 - Directions.mp3',
			'/js/english-test/mp3/Part 2 - Example.mp3',
			'/js/english-test/mp3/Part 3 - Directions.mp3',
			'/js/english-test/mp3/Part 4 - Directions.mp3'
	);	
	
	current_audio_direction = audio_directions[1];
	current_audio_example = audio_directions[2];	
	
	
	
	var audio =  new Audio(audio_directions[0]);
	var audio2 =  new Audio(audio_directions[1]);
	var audio3 =  new Audio(audio_directions[2]);
	var audio4 =  new Audio(audio_directions[3]);
	var audio5 =  new Audio(audio_directions[4]);
	var audio6 =  new Audio(audio_directions[5]);
	var audio7 =  new Audio(audio_directions[6]);

	
	
	// Setup Intro Screen
	TweenMax.to($("#intro-listening"),0, {autoAlpha:0});
	TweenMax.to($("#intro-reading"),0, {autoAlpha:0});
	
	$("#intro-continue-btn,#intro-continue-btn-small").on('click', function(){
		TweenMax.to($("#intro-test"), 0.2, {autoAlpha:0 , onComplete: function(){
//			setUpAudioListeningComp();
			$("#intro-listening").removeClass("hidden");
			$("#intro-test").remove();
			TweenMax.to($("#intro-listening"),0.2, {autoAlpha:1});			
		}});
		
		if($(this).attr('class')=="imgstart") { return false; }
		 
	});
	
	$("#start-the-test-btn,#start-the-test-btn-small").on('click', function(){
		audio.pause();
		
		TweenMax.to($("#intro-listening"),0.2, {autoAlpha:0 , onComplete: function(){
			
			my_jPlayer_listening_comp.jPlayer("destroy");
			$(".jp-play-listening-comp").removeClass("playing");		
			
			$("#intro-listening").remove();
			$("#toeic-wrapper").removeClass("hidden");		
			openDirection(0);
		}});
		
		if($(this).attr('class')=="imgstart") { return false; } 
	});
	
	$("#start-the-reading-btn,#start-the-reading-btn-small").on('click', function(){
		TweenMax.to($("#intro-reading"),0.2, {autoAlpha:0 , onComplete: function(){
			$("#intro-reading").remove();				
			$("#toeic-wrapper").removeClass("hidden");
			openDirection(4);			
		}});
	});
	
	$('#modal-direction').on('hidden.bs.modal', function (e) {		
		
		if(currentSection == "Listening")
		{			
			audio2.pause();audio3.pause();audio4.pause();
			audio5.pause();audio6.pause();audio7.pause();
			my_jPlayer_direction.jPlayer("destroy");
			$(".jp-play-direction").removeClass("playing");
			my_jPlayer_example.jPlayer("destroy");
			$(".jp-play-example").removeClass("playing");
		}
		
		if(firstTimePlay)
		{
			testInit();
			firstTimePlay = false;
		}
		else
		{
			if(currentSection == "Listening")
			{				
				if(!playedAudio)
				{
					first_track = true;
					setUpPlayer();
				}
			}
			$('#toeic-timer').stopwatch({format: '{MM}:{ss}'}).stopwatch('start');
		}		
		
	})
	
	$('#modal-direction').on('show.bs.modal', function (e) {
		if(currentSection == "Listening")
		{	
			if(!playedAudio)
			{
				my_jPlayer.jPlayer("destroy");
				$(".jp-play").removeClass("playing");			
			}
			first_track_direction = true;
			first_track_example = true;
			setUpAudioDirection();
			setupAudioExample();			
		}
		
		$('#toeic-timer').stopwatch({format: '{MM}:{ss}'}).stopwatch('stop');
	});
	
	loadQuestion();	
	function loadQuestion()
	{		
		$.getJSON( "/js/english-test/data.json", function( data ) {		 
			  datas = data.section;
			  current_audio = datas.listening[currentPartSection][currentQuestionInPart].audio;			
			  console.log(current_audio);
		});	
	}
	
	function testInit()
	{	
//		$.getJSON( "/js/english-test/data.json", function( data ) {		 
//			  datas = data.section;		  
//			  current_audio = datas.listening[currentPartSection][currentQuestionInPart].audio;		  
//			  setUpToeicTest();
//		});		
		
		setUpToeicTest();
	}	
		
	$(".toeic-direction-btn").on('click', function(e){	
		if(!mainAudioIsPlaying)		
			$('#modal-direction').modal();		
		else		
			alert("You cannot open Directions when listening. Please wait until the track finishes playing.");
			
		e.preventDefault();
	});
	
	$(".toeic-choice-btn").on('click', function(e){		
		$(".toeic-choice-btn").removeClass("selected");
		$(this).addClass("selected");		
		e.preventDefault();		
	});

	
	

	
	$(".jp-play-listening-comp").on('click', function(e){
		$(this).addClass("playing");
		audio.play();
		return false;		
	});
	
	

	
	function openDirection(part)
	{
		$("#modal-direction .modal-body .child-part").addClass("hidden");
		$('#modal-direction .modal-body').children('.child-part').eq(part).removeClass("hidden");
		$('#modal-direction').modal();
	}
	
	function setUpToeicTest()
	{
		$('#toeic-timer').stopwatch({format: '{MM}:{ss}'}).stopwatch('start').bind('tick.stopwatch', function(e, elapsed){		
		    if (elapsed >= timeLimit){		     
		      $('#toeic-timer').stopwatch({format: '{MM}:{ss}'}).stopwatch('stop');
		      
		      submitResult();		      	      
		    }
		});
		
		updateTestStatus();		
		setUpEvent();
		
		if(currentSection == "Listening")
		{			
			first_track = true;
			setUpPlayer();		
		}	
	}
	

	
	
	
	function setUpEvent()
	{
		$("#next-question").on('click', function(){
			
			playedAudio = false;
			mainAudioIsPlaying = false;
			
			console.log('slide'+currentQuestion);
			if(currentQuestion > 2) {
				$('body').find('.col-align').removeClass('col-sm-5').addClass('col-sm-12');
			}
			
			
			if(currentQuestion < 40)
				saveResult();
			
			if(currentSection == "Result")
			{
				submitResult();				
			}			
			
			if(currentQuestion < 15 )
			{
				currentQuestion++;
				currentQuestionInPart++;
				
				my_jPlayer.jPlayer("destroy");
				$(".jp-play").removeClass("playing");
				first_track = true;
				
				// Check for Audio files				
				// Begin Part 01
				if(currentQuestion < 4){					
					current_audio = datas.listening[currentPartSection][currentQuestionInPart].audio;	
				}
				else if(currentQuestion >=4 && currentQuestion <10)
				{
					// Begin Part 02
					if(currentQuestion == 4){
						
						$("#audio_player").removeClass("col-xs-10").addClass("col-xs-12");
						
						current_audio_direction = audio_directions[3];
						current_audio_example = audio_directions[4];
						openDirection(1);
						currentPartSection++;
						currentQuestionInPart = 0;
					}					
					
					current_audio  = datas.listening[currentPartSection][currentQuestionInPart].audio;	
				}
				else if(currentQuestion >=10 && currentQuestion < 16)
				{
					// Begin Part 03
					if(currentQuestion == 10){
						
						$("#audio_example_container").remove();
						$("#audio_direction_container").removeClass("col-sm-6").addClass("col-xs-12");
						
						current_audio_direction = audio_directions[5];
						openDirection(2);
						currentPartSection++;
						currentQuestionInPart = 0;
					}					
				
					current_audio  = datas.listening[currentPartSection][currentQuestionInPart].audio;	
				}			
				
				// Check for Image				
				if(currentQuestion < 4)
				{				
					$("#response-img").attr("src", datas.listening[currentPartSection][currentQuestionInPart].image);
				}
				
				currentPart = currentPartSection;
				setUpPlayer(); 
			}
			else if(currentQuestion < 19)
			{
				currentQuestion++;
				
				if(currentQuestion == 16)
				{
					$(".tick-node-part-04").removeClass("hidden");
					$("#next-question").addClass("hidden");
					
					current_audio_direction = audio_directions[6];
					openDirection(3);
					my_jPlayer.jPlayer("destroy");
					$(".jp-play").removeClass("playing");
					first_track = true;
					
					currentPartSection++;
					currentQuestionInPart = 0;					
					current_audio  = datas.listening[currentPartSection].audio;
					
					setUpPlayer();
				}
				else
				{
					if(currentQuestion == 17)
					{
						my_jPlayer.jPlayer("destroy");
						$(".jp-play").addClass("playing");
						$("#audio_player").remove();
					}
					else
					{						
					}	
					
					currentQuestionInPart++;
				}			
				
				currentPart = currentPartSection;
			}
			// Section 2 : Reading.
			else
			{			
				if(currentQuestion < 39)
				{				
					currentQuestion++;
					
					if(currentSection == 'Listening')
					{
						$("#toeic-wrapper").addClass("hidden");
						$('#toeic-timer').stopwatch({format: '{MM}:{ss}'}).stopwatch('stop');
						$("#intro-reading").removeClass("hidden");				
						TweenMax.to($("#intro-reading"),0.2, {autoAlpha:1});
						currentPartSection = 0;
						currentQuestionInPart = 0;
						$("#audio_player_direction").remove();
					}
					
					currentSection = "Reading";				
					
					if(currentQuestion == 20)
					{
						currentPartSection = 0;
						currentQuestionInPart = 0;
					}
					else if(currentQuestion == 28)
					{
						openDirection(5);	
						currentPartSection++;
						currentQuestionInPart = 0;
					}	
					else if(currentQuestion == 32)
					{
						openDirection(6);	
						currentPartSection++;
						currentQuestionInPart = 0;
					}
					else if(currentQuestion == 35)
					{
						currentQuestionInPart = 0;
					}	
					else
						currentQuestionInPart++;				
					
				}
				if(currentQuestion == 39)
				{				
					$("#next-question").removeClass("next-btn").addClass("finish-btn");				
				}
			}		
			
			TweenMax.to($(".toeic-choice-btn"), 0.3, {css:{autoAlpha:0}, onComplete: function(){	
				// Check for listening carefuly on part 4
				if(currentQuestion != 16)
				{
					TweenMax.to($(".toeic-choice-btn"), 0.5, {css:{ autoAlpha:1}, onComplete: function(){}});			
				}
			}});
			
			switchPart();						
			updateTestStatus();
			setUpQuestionResponse();		
			
			
		}); 
		
		
	} 
	
	function switchPart()
	{
		if(currentQuestion ==4)
		{			
			$("#part-01-image").remove();
			$("#choice-part-01").remove();
			
			$("#part-wrapper").addClass('col-xs-12').removeClass('col-xs-5');
			$("#choice-part-02").removeClass("hidden");
		}		
		if(currentQuestion == 10)
		{		
			$("#choice-part-02").remove();				
			$("#choice-part-03").removeClass("hidden");
		}			
		if(currentQuestion == 16)
		{		
			$("#choice-part-03").remove();				
			//$("#choice-part-04").removeClass("hidden");
		}		
		if(currentQuestion == 20)
		{		
			$("#choice-part-04").remove();				
			$("#choice-part-05").removeClass("hidden");
		}
		if(currentQuestion == 28)
		{		
			$("#choice-part-05").remove();				
			$("#choice-part-06").removeClass("hidden");
		}
		if(currentQuestion == 32)
		{		
			$("#choice-part-06").remove();				
			$("#choice-part-07").removeClass("hidden");
		}
	}
	
	function setUpQuestionResponse()
	{
		
		
		if(currentSection == "Listening")		
			currentSectionData = datas.listening;
		
		else if(currentSection == "Reading")		
			currentSectionData = datas.reading;		
		
		if(currentQuestion >=10 && currentQuestion < 16)
		{			
			$("#part03-question").html(datas.listening[currentPartSection][currentQuestionInPart].question);			
			$("#part03-res-01 .res-txt").html(currentSectionData[currentPartSection][currentQuestionInPart].response[0]);
			$("#part03-res-02 .res-txt").html(currentSectionData[currentPartSection][currentQuestionInPart].response[1]);
			$("#part03-res-03 .res-txt").html(currentSectionData[currentPartSection][currentQuestionInPart].response[2]);
			$("#part03-res-04 .res-txt").html(currentSectionData[currentPartSection][currentQuestionInPart].response[3]);
			
		}
		else if(currentQuestion >=16 && currentQuestion < 20)
		{
			$("#part04-question").html(datas.listening[currentPartSection].question[currentQuestionInPart].question);			
			$("#part04-res-01 .res-txt").html(currentSectionData[currentPartSection].question[currentQuestionInPart].response[0]);
			$("#part04-res-02 .res-txt").html(currentSectionData[currentPartSection].question[currentQuestionInPart].response[1]);
			$("#part04-res-03 .res-txt").html(currentSectionData[currentPartSection].question[currentQuestionInPart].response[2]);
			$("#part04-res-04 .res-txt").html(currentSectionData[currentPartSection].question[currentQuestionInPart].response[3]);
		}	
		else if(currentQuestion >=20 && currentQuestion < 28)
		{
			$("#part05-question").html(currentSectionData[currentPartSection][currentQuestionInPart].question);			
			$("#part05-res-01 .res-txt").html(currentSectionData[currentPartSection][currentQuestionInPart].response[0]);
			$("#part05-res-02 .res-txt").html(currentSectionData[currentPartSection][currentQuestionInPart].response[1]);
			$("#part05-res-03 .res-txt").html(currentSectionData[currentPartSection][currentQuestionInPart].response[2]);
			$("#part05-res-04 .res-txt").html(currentSectionData[currentPartSection][currentQuestionInPart].response[3]);
		}
		else if(currentQuestion >=28 && currentQuestion < 32)
		{
			$("#part06-question").html(currentSectionData[currentPartSection][currentQuestionInPart].question);
		}
		else if(currentQuestion >= 32)
		{			
			if(currentQuestion >= 35)		
				currentMaterials = 1;			
				
			$("#part07-materials").html(currentSectionData[currentPartSection][currentMaterials].materials);
			$("#part07-question").html(currentSectionData[currentPartSection][currentMaterials].question[currentQuestionInPart].question);	
			
			$("#part07-res-01 .res-txt").html(currentSectionData[currentPartSection][currentMaterials].question[currentQuestionInPart].response[0]);
			$("#part07-res-02 .res-txt").html(currentSectionData[currentPartSection][currentMaterials].question[currentQuestionInPart].response[1]);
			$("#part07-res-03 .res-txt").html(currentSectionData[currentPartSection][currentMaterials].question[currentQuestionInPart].response[2]);
			$("#part07-res-04 .res-txt").html(currentSectionData[currentPartSection][currentMaterials].question[currentQuestionInPart].response[3]);
		}	
	}
	
	function saveResult()
	{
		var user_choosen = "-1";
		var question_id;		
		
		if(currentQuestion < 16){					
			question_id = datas.listening[currentPartSection][currentQuestionInPart].id;	
		}
		else if(currentQuestion < 20)
		{
			question_id = datas.listening[currentPartSection].question[currentQuestionInPart].id;	
		}
		else if(currentQuestion < 32)
		{
			question_id = datas.reading[currentPartSection][currentQuestionInPart].id;
		}
		else			
		{
			question_id = currentSectionData[currentPartSection][currentMaterials].question[currentQuestionInPart].id
		}
		
		if(currentQuestion == 39)
		{
			$('#toeic-timer').stopwatch({format: '{MM}:{ss}'}).stopwatch('stop');
		}		
		if(currentQuestion ==4)					
			currentChoiceWrapper = "#choice-part-02";				
		if(currentQuestion == 10)				
			currentChoiceWrapper = "#choice-part-03";					
		if(currentQuestion == 16)				
			currentChoiceWrapper = "#choice-part-04";			
		if(currentQuestion == 20)				
			currentChoiceWrapper = "#choice-part-05";		
		if(currentQuestion == 28)				
			currentChoiceWrapper = "#choice-part-06";		
		if(currentQuestion == 32)				
			currentChoiceWrapper = "#choice-part-07";			
		
		var _question = {
			question_id: question_id,				
			user_answer: $(currentChoiceWrapper +" .toeic-choice-btn.selected").data("value")				
		}			
		
		if(currentSection == "Listening")		
			resulListeningtObj.push(_question);
		else if(currentSection == "Reading")
			resulReadingObj.push(_question);		
		
		// Reset choosen from user
		$(".toeic-choice-btn").removeClass("selected");
		
		if(currentQuestion == 39)
		{	
			currentSection = "Result";				
		}		
	}		
	
	$('#modal-progess').on('hidden.bs.modal', function (e) {	
		 		
		$('#toeic-timer').stopwatch('reset');
	    $('#toeic-timer').stopwatch().unbind('tick.stopwatch');		
	    	    
	    if(reponsive_type_submit == 1)
    	{
	    	$(".form-toeic-result").addClass("decrease-height");
	    	$("#test-complete-form").remove();	       	 
	    	$(".last-form").removeClass('hidden');    	
    	}
	    else
    	{ 	    	
	    	$(".form-toeic-result").remove();  
	    	$(".last-form").remove();    
    	} 
	}); 
	
	function submitResult()
	{
		resultObj.push(resulListeningtObj);	
		resultObj.push(resulReadingObj);
		
		//$('.submit_type').trigger('click'); 
		
		$("#toeic-wrapper").addClass("hidden");
		$('.form-toeic-result').removeClass("hidden");		
	}

	function showLastResult(response)
	{
		$("#last_score span:first-child").text(lastScore);
		$("#last_listening_score").text("Listening: "+response.score_listening + " points / " + response.true_listening +" correct answers");
		$("#last_reading_score").text("Reading: "+response.score_reading + " points / "+ response.true_reading +" correct answers");
		
		if(lastScore < 550){
			$(".score-level-title").text(levelTitle[0]);	
			$(".desc-level-0").removeClass("hidden");
		}
		else if(lastScore >=550 && lastScore < 649){
			$(".desc-level-1").removeClass("hidden");
			$(".score-level-title").text(levelTitle[1]);
			$(".score-level-line-wrapper").addClass("col-sm-offset-2");
		}		
		else if(lastScore >= 650 && lastScore < 749){
			$(".desc-level-2").removeClass("hidden");
			$(".score-level-title").text(levelTitle[2]);	
			$(".score-level-line-wrapper").addClass("col-sm-offset-4");
		}
		else if(lastScore >=750 && lastScore < 849){			
			$(".desc-level-3").removeClass("hidden");
			$(".score-level-title").text(levelTitle[3]);
			$(".score-level-line-wrapper").addClass("col-sm-offset-6");
		}
		else if(lastScore >= 850 && lastScore < 900){
			$(".desc-level-4").removeClass("hidden");
			$(".score-level-title").text(levelTitle[4]);			
			$(".score-level-line-wrapper").addClass("col-sm-offset-8");
		}
		else{			
			$(".desc-level-5").removeClass("hidden");
			$(".score-level-title").text(levelTitle[5]);			
			$(".score-level-flip-line").removeClass("hidden");
			$(".score-level-line").addClass("hidden");
			$(".score-level-line-wrapper").addClass("col-sm-offset-10");
		}
		
		$("#result_screen").removeClass("hidden");
		$(".check-your-english-test-blink").remove();
	}

	function updateTestStatus()
	{			
		if(currentQuestion == 20 || currentQuestion == 28 || currentQuestion == 32)
		{
			currentPart++;
		}			
		
		$("#part_name_txt").text(currentSection+ " / Part " + (currentPart + 1));
		$("#current_question_txt").text("Question " + (currentQuestion + 1) + " / " + totalQuestion);
	}
	
	/////////////////////////////////////////////////////////////////////////
	$form = $("#test-complete-form");      
		 
	$('.submit_type').click(function(e){  
	
		var $this = $(e.currentTarget);
		
		$type_submit = 2;//$this.attr('data-value');
				
		if($type_submit==2)
		{			
			$form = $("#test-complete-form");			
			
			$form.validate({

				rules : {
					name : {
						required : true,
						minlength : 2
					},			
					email : {
						required : true,
						email : true
					},
					telephone : {
						required : true
					},
					sales_act_id : {
						required : true
					},
					'cityform': {
						required: true
					},
					'yearform': {
						required: true
					},

				},
				submitHandler : function(form) {
					//ssda('send', 'submit_form', form);
					// set goal
					dataLayer.push({'event': 'GAevent', 'eventCategory': 'English Test', 'eventAction': 'Send Contact'});
					var district = $(form).find('.district').val();
									
					if(district != 0)
					{
						var user_name = $('input[name=name]').val();
						var user_email = $('input[name=email]').val();
						var user_telephone = $('input[name=telephone]').val();
						var age = $('select[name=yearform]').val();
						var city = $('select[name=cityform]').val();

						$('#modal-progess').modal({
							backdrop: 'static'
						});

						setGoal();

						var dataJson = {
								data: {
									user_name: user_name,
									user_email: user_email,
									user_telephone: user_telephone,
									current_url: window.location.href,
									district: $("select[name=district]").val(),
									cityform: city,
									yearform: age,
									formid: 5,
									type_submit: 2,
									resultObj:JSON.stringify(resultObj)
								}
							};

						$.ajax({
							type:'POST',
							data:dataJson,
							cache: false,
							url: '/'+$("html").attr("lang")+'/english-tests/toeic/result.html',
							success: function(response){
								fbq('track', 'Lead');

								reponsive_type_submit = 2;

								//$("#iframe_thank").get(0).contentWindow.location.href = "/"+$("html").attr("lang")+"/contact/thank.html";
								$('#modal-progess').modal("hide");
								lastScore = response.score;
								showLastResult(response);
							},
							failure: function(){
								alert('Failed');
							}
						});
					}
					else
					{
//						$('#district_select').modal('show');
					}
				},
				errorPlacement: function(error, element) {
	                $element = $(element);
	                $type = $element.attr('type');
	                if($type != 'radio')
	                {
	                    $element.after($(error));

	                }
	                else
	                {
	                    $element.closest('.form-group').find('.sales-act-id-area').append($(error));
	                }
	            },
	            errorElement: 'p'
			});
		}
		else
		{
			$form = $("#test-complete-form");
			
			// NO, SUBMIT LATER.
			$form.validate({
				submitHandler : function(form) {					
					//ssda('send', 'submit_form', form);
						var user_name = $('input[name=name]').val();
						var user_email = $('input[name=email]').val();
						var user_telephone = $('input[name=telephone]').val();
						
						$('#modal-progess').modal({
							backdrop: 'static'
						});	
						
						setGoal();
						
						var dataJson = {
								data: {										
									user_name: user_name,
									user_email: user_email,
									user_telephone: user_telephone,
									current_url: window.location.href,
									district: $("select[name=district]").val(),
									formid: 5,
									type_submit:1,
									resultObj:JSON.stringify(resultObj)
								}
							};			 
								
						$.ajax({ 
							type:'POST',
							data:dataJson,
							cache: false,
							url: '/'+$("html").attr("lang")+'/english-tests/toeic/result.html',			
							success: function(response){
								fbq('track', 'Lead');
								$("#iframe_thank").get(0).contentWindow.location.href = "/"+$("html").attr("lang")+"/contact/thank.html";	
								
								reponsive_type_submit = 1;
								
								$form[0].reset(); 
								
								$('#modal-progess').modal("hide");	
								
								lastScore = response.score;
								showLastResult(response);							
								
							},
							failure: function(){
								alert('Failed');
							}
						});			
					
				}
			});
		}
		 
	});
	
	$('#last-complete-form').submit(function() {
		return false;
	});	
	
	$(".last-complete-submit-btn").on('click', function(e){
		
		$('#last-complete-form').validate({

			rules : {
				name : {
					required : true,
					minlength : 2
				},			
				email : {
					required : true,
					email : true
				},
				telephone : {
					required : true
				},
//				district : {
//					required: true
//				}

			},
			submitHandler : function(form) {	
				//ssda('send', 'submit_form', form);
				var user_name = $('input[name=name]').val();
				var user_email = $('input[name=email]').val();
				var user_telephone = $('input[name=telephone]').val();

				$('#modal-progess').modal({
					backdrop: 'static'
				});

				setGoal();

				var dataJson = {
						data: {
							user_name: user_name,
							user_email: user_email,
							user_telephone: user_telephone,
							current_url: window.location.href,
							district: $("select[name=district]").val(),
							formid: 5,
							type_submit:2,
							resultObj:JSON.stringify(resultObj)
						}
					};
				$.ajax({
					type:'POST',
					data:dataJson,
					cache: false,
					url: '/'+$("html").attr("lang")+'/english-tests/toeic/result.html',
					success: function(response){

						reponsive_type_submit = 2;

						$("#iframe_thank").get(0).contentWindow.location.href = "/"+$("html").attr("lang")+"/contact/thank.html";
						$('#modal-progess').modal("hide");
						lastScore = response.score;
						showLastResult(response);
					},
					failure: function(){
						alert('Failed');
					}
				});
			}
		});
		
	});
	
	function setGoal()
	{
	  console.log("set goal");
//	  var _gaq = window._gaq || [];
//	    _gaq.push(['_setAccount', 'UA-40208321-1']);
//	    _gaq.push(['_trackPageview', '/english-test/toeic-test.html']);		
	  
	  //_gaq.push(['_setAccount', 'UA-40208321-1']);
	  //_gaq.push(['_trackEvent', 'English Test', 'Send Contact']);
	  //ga('send', 'event', 'English Test', 'Send Contact');
	  
	  dataLayer.push({'event': 'GAevent', 'eventCategory': 'English Test', 'eventAction': 'Send Contact'});
	   
	  sendFacebookConversion();
	}
	 
		$("#share-btn").on('click', function(){
		
		FB.ui(
				{
				    method: 'feed',
				    name: 'I just took a TOEIC sample test.',
				    link: 'http://wallstreetenglish.edu.vn/'+$("html").attr("lang")+'/english-tests/toeic/test.html',
				    picture: 'http://wallstreetenglish.edu.vn/images/application/facebook_share.png',
				    caption: 'Wall Street English',
				    description: 'My score is : '+ lastScore +"/990"
				  },
				  function(response) {
				    if (response && response.post_id) {				    	 
				      
				    } else {
				      alert('Post was not published.');
				    }
				  }
				);
		
		return false;
		
	});	
	
	//****************************************************************************************************
	// Setup Main Audio Player For Question
	//****************************************************************************************************
	
	function setUpPlayer()
	{
		// Instance jPlayer
		my_jPlayer.jPlayer({
			ready: function () {
				setNewAudio();
			},
			timeupdate: function(event) {				
			},
			playing: function()
			{				
			},
			play: function(event) {	
				
				playedAudio = true;
				mainAudioIsPlaying = true;
				$(".toeic-direction-btn").attr("data-toggle","").attr("data-target","");
				
				$(".jp-play").addClass("playing");				
				event.preventDefault();								
			},
			pause: function(event) {				
			},
			ended: function(event) {	
				
				mainAudioIsPlaying = false;
				$(".toeic-direction-btn").attr("data-toggle","modal").attr("data-target","#modal-direction");
				
				my_jPlayer.jPlayer("destroy");
				if(currentQuestion == 16)
				{
//					$(".tick-node-part-04").addClass("hidden");
//					$("#choice-part-04").removeClass("hidden");
//					$("#next-question").removeClass("hidden");
//					
					
//					TweenMax.to($(".toeic-choice-btn"), 0.5, {css:{ autoAlpha:1}, onComplete: function(){}});
				}
			},
			swfPath: "../js",
			cssSelectorAncestor: "#jp_container",
			supplied: "mp3",
			wmode: "window"
		});	
	}

	// Create click handlers for the different tracks
	function setNewAudio(){
//			
//		my_jPlayer.jPlayer("setMedia", {
//			mp3: current_audio
//		});
//		if((opt_play_first && first_track) || (opt_auto_play && !first_track)) {
//			my_jPlayer.jPlayer("play");
//		}
//		first_track = false;
//		$(this).blur();
//		return false;
	}
	
	
	$(".jp-play-direction").on('click', function(e){
		console.log('ssss='+currentQuestion);
		if (currentQuestion==4){
			audio5.pause();
			audio4.play();								
		}
		else if (currentQuestion==10){
			audio6.play();
		}
		else if (currentQuestion==16){
			audio7.play();
		}		
		else{
			audio2.play();
			audio3.pause();		
		}
		
		$(".jp-play-example").removeClass("playing");
		$(this).addClass("playing");	
		return false;		
	});
	
	$(".jp-play-example").on('click', function(e){
		if (currentQuestion==4){
			audio5.play();
			audio4.pause();
		}else{
			audio3.play();
			audio2.pause();
			
		}
	    
			    
		$(this).addClass("playing");
		$(".jp-play-direction").removeClass("playing");
		
		return false;		
	});
	
	
	
		
	$(".jp-play").on('click', function(e){
		
		$('body').find('.next-btn').hide();
		
		var audioquestion =  new Audio(current_audio);
		console.log(current_audio);
		$(this).addClass("playing");
		audioquestion.play();
		
		if (current_audio=='/js/english-test/mp3/Part 4 - Short Passage.mp3'){
			 delayNext = setTimeout(function(){
				 $("#choice-part-04").removeClass("hidden");
					$("#next-question").removeClass("hidden");
					TweenMax.to($(".toeic-choice-btn"), 0.5, {css:{ autoAlpha:1}, onComplete: function(){}});
				  clearTimeout(delayNext);        						 
			  },35000); 
			
		}	
		
		 $(audioquestion).bind("ended", function(){ $('body').find('.next-btn').show() });
		return false;		
	});
	
	
	
	
	
	//****************************************************************************************************
	// Setup Audio Player Direction and Example
	//****************************************************************************************************
	
	// Change the time format
	$.jPlayer.timeFormat.padMin = false;
	$.jPlayer.timeFormat.padSec = false;
	$.jPlayer.timeFormat.sepMin = " min ";
	$.jPlayer.timeFormat.sepSec = " sec";
	
	var	my_jPlayer = $("#jquery_jplayer");	
	var	my_jPlayer_direction = $("#jquery_jplayer_direction");
	var	my_jPlayer_listening_comp = $("#jquery_jplayer_listening_comp");
	var	my_jPlayer_example = $("#jquery_jplayer_example");
	
	var first_track = true;
	var first_track_direction = true;
	var first_track_example = true;
	var first_track_listening_comp = true;
	var	opt_play_first = false, opt_auto_play = true; 	
	
	function setupAudioExample()
	{
		// Instance jPlayer
//		my_jPlayer_example.jPlayer({
//			cssSelector:{
//				play:'.jp-play-example'			
//			},
//			ready: function () {
//				setUpNewAudioExample();
//			},
//			timeupdate: function(event) {				
//			},
//			play: function(event) {				
//				event.preventDefault();								
//				$(".jp-play-example").addClass("playing");
//
//				my_jPlayer_direction.jPlayer("destroy");
//				$(".jp-play-direction").removeClass("playing");
//				first_track_direction = true;
//				setUpAudioDirection();
//			},
//			pause: function(event) {				
//			},
//			ended: function(event) {				
//				my_jPlayer_example.jPlayer("destroy");
//			},
//			swfPath: "../js",
//			cssSelectorAncestor: "#jp_container_example",
//			supplied: "mp3",
//			wmode: "window"
//		});
	}
	
	function setUpNewAudioExample()
	{
//		my_jPlayer_example.jPlayer("setMedia", {
//			mp3: current_audio_example
//		});
//		if((opt_play_first && first_track_example) || (opt_auto_play && !first_track_example)) {
//			my_jPlayer_example.jPlayer("play");
//		}
//		first_track_example = false;
//		$(this).blur();
		return false;
	}
	
	function setUpNewAudioListeningDirection()
	{
		// Instance jPlayer
		my_jPlayer_listening_comp.jPlayer({
			cssSelector:{
				play:'.jp-play-listening-comp'			
			},
			ready: function () {
//				setUpNewAudioListeningDirection();
			},
			timeupdate: function(event) {				
			},
			play: function(event) {				
				event.preventDefault();								
				$(".jp-play-listening-comp").addClass("playing");
			},
			pause: function(event) {				
			},
			ended: function(event) {				
				my_jPlayer_listening_comp.jPlayer("destroy");
			},
			swfPath: "../js",
			cssSelectorAncestor: "#jp_container_listening_comp",
			supplied: "mp3",
			wmode: "window"
		});
	}
	
	function setUpNewAudioListeningDirection()
	{
//		my_jPlayer_listening_comp.jPlayer("setMedia", {
//			mp3: audio_directions[0]
//		});
//		if((opt_play_first && first_track_listening_comp) || (opt_auto_play && !first_track_listening_comp)) {
//			my_jPlayer_listening_comp.jPlayer("play");
//		}
//		first_track_listening_comp = false;
//		$(this).blur();
//		return false;
	}

	function setUpAudioDirection()
	{
		// Instance jPlayer
//		my_jPlayer_direction.jPlayer({
//			cssSelector:{
//				play:'.jp-play-direction'			
//			},
//			ready: function () {
//				setNewAudioDirection();
//			},
//			timeupdate: function(event) {				
//			},
//			play: function(event) {		
//				
//				event.preventDefault();								
//				$(".jp-play-direction").addClass("playing");
//				
//				my_jPlayer_example.jPlayer("destroy");
//				$(".jp-play-example").removeClass("playing");
//				first_track_example = true;
//				setupAudioExample();
//				
//			},
//			pause: function(event) {				
//			},
//			ended: function(event) {				
//				my_jPlayer_direction.jPlayer("destroy");
//			},
//			swfPath: "../js",
//			cssSelectorAncestor: "#jp_container_direction",
//			supplied: "mp3",
//			wmode: "window"
//		});
	}
	
	function setNewAudioDirection()
	{		
//		my_jPlayer_direction.jPlayer("setMedia", {
//			mp3: current_audio_direction
//		});
//		if((opt_play_first && first_track_direction) || (opt_auto_play && !first_track_direction)) {
//			my_jPlayer_direction.jPlayer("play");
//		}
//		first_track_direction = false;
//		$(this).blur();
		return false;
	}	
	
	
	
});