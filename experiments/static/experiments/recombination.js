$(document).ready(function(){
  responses = {};
  $(".instructions").html("From the given sample of an alphanumeric combination, type in<br />5 novel combinations of alphanumeric characters in each of the<br />empty boxes.");
  $("button").click(function(e){
    $(".instructions_div").remove();

    for(var i = 0; i < 5; i++){
      var field = $('<input />');
      field.prop('type', 'text');
      field.prop('maxLength', 5);
      $('.responses').append(field);
    }
    //If buggy, try replacing this with a single function which calls record_response($(this))
    $('input[type=text]').blur(function(){
      record_response(this);
    });
    var button = $('<button>Next</button>');
    button.prop('type', 'button');
    button.click(proceed);
    $('.responses').append(button);

    refresh();
  });
});

function proceed(e){
  var trial_end_time = Date.now()
  if (Object.keys(responses[index]).length == 10){
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

//text_box is the jquery object $(this) from the blur trigger
function record_response(text_box){
  var response_end_time = Date.now();
  responses[index]['time_' + response_index] = response_start_time - response_end_time
  responses[index]['response_' + response_index] = $(text_box).val()
  response_index += 1;
  $(text_box).prop('disabled', true);
  response_start_time = Date.now();
}
