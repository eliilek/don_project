$(document).ready(function(){
  responses = {};
  var instructions = "In this task, you will be presented with a sample of 5-alphanumeric combinations located in the middle top part of the screen. From the given sample, type a<br>variety of recombinations using the characters in the sample on each of the blank spaces provided.  Once you have completed filling up the blank spaces with your<br>answers, you can then click on the next button at the bottom right corner of your computer screen to proceed to the next trial. In instances where you cannot think<br>of new combinations to fill all of the blank spaces, you can still proceed to the next trial by clicking the next button. There are a total of 5 trials for you to<br>complete." + last_trial_instructions;
  $(".instructions").html(instructions);
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

//text_box is the jquery object $(this) from the blur trigger
function record_response(text_box){
  //Checks validity
  var response_str = $(text_box).val().toUpperCase();
  if (response_str.split('').sort().join('') != stimuli[index].stim.split('').sort().join('')){
    $(text_box).val('');
    return;
  }
  console.log(response_index.toString());
  if (response_index > 1){
    for (var i = response_index-1; i > 0; i--){
      console.log(i.toString());
      console.log(response_str);
      console.log(responses[index]['response_' + i.toString()]);
      if (response_str == responses[index]['response_' + i.toString()]){
        $(text_box).val('');
        return;
      }
    }
  }

  var response_end_time = Date.now();
  responses[index]['time_' + response_index] = response_start_time - response_end_time
  responses[index]['response_' + response_index] = $(text_box).val().toUpperCase();
  response_index += 1;
  $(text_box).prop('disabled', true);
  response_start_time = Date.now();
  if (response_index == 6){
    proceed();
  }
}
