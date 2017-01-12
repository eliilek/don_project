function record_response(text_box){
  var response_end_time = Date.now();
  responses[index]['time_' + response_index] = response_start_time - response_end_time
  responses[index]['response_' + response_index] = $(text_box).val()
  response_index += 1;
  $(text_box).prop('disabled', true);
  response_start_time = Date.now();
  if (response_index == 6){
    proceed();
  }
}

$(document).ready(function(){
  responses = {};
  $(".instructions").html("“In this task, you will be presented with a sample word located in the middle top part of the screen, and you will type an associated word in each of the blank <br> spaces below the sample word.  Once you complete filling up the blank spaces with your answers, you can then click on the next button at the bottom right corner <br> of your computer screen to proceed to the next trial. In instances where you cannot think of associated words to fill all of the blank spaces, you can still proceed to <br> the next trial by clicking the next button. There are a total of 5 trials for you to complete. Once you complete your last trial, the computer will lead you to the next task.”");
  $("button").click(function(e){
    $(".instructions_div").remove();

    for(var i = 0; i < 3; i++){
      var field = $('<input />');
      field.prop('type', 'text');
      field.prop('maxLength', 50);
      $('#top').append(field);
    }
    for(var i = 0; i < 2; i++){
      var field = $('<input />');
      field.prop('type', 'text');
      field.prop('maxLength', 50);
      $('#bottom').append(field);
    }
    //If buggy, try replacing this with a single function which calls record_response($(this))
    $('input[type=text]').blur(function(){
      if ($(this).val() != ""){
        record_response(this);
    }});
    var button = $('<button>Next</button>');
    button.prop('type', 'button');
    button.click(proceed);
    $('body').append(button);

    refresh();
  });
});

function proceed(){
  var trial_end_time = Date.now()
  responses[index]['total_time'] = trial_start_time - trial_end_time;
  responses[index]['stimulus'] = stimuli[index].id;
  index += 1;
  if (index >= Object.keys(stimuli).length){
    //ajax back the data, display generic message, button submits back to master views
    end_trial();
  } else {
    refresh();
  }
}

function refresh(){
  $(".stimuli").html(stimuli[index].stim);
  trial_start_time = Date.now();
  response_start_time = trial_start_time;
  response_index = 1;
  $('input[type=text]').prop('disabled', false);
  $('input[type=text]').val('');
  responses[index] = {};
}
