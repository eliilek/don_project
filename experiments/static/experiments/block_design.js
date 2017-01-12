//IDs will break if a two digit number
var GRID_SIZE = 7;

var result_grid_1 = new Array(GRID_SIZE);
var result_grid_2 = new Array(GRID_SIZE);
var result_grid_3 = new Array(GRID_SIZE);
var result_grid_4 = new Array(GRID_SIZE);
var result_grid_5 = new Array(GRID_SIZE);
for (var i = 0; i < GRID_SIZE; i++) {
  result_grid_1[i] = new Array(GRID_SIZE);
  result_grid_2[i] = new Array(GRID_SIZE);
  result_grid_3[i] = new Array(GRID_SIZE);
  result_grid_4[i] = new Array(GRID_SIZE);
  result_grid_5[i] = new Array(GRID_SIZE);
}
var active_block = null;
var used_pieces = 0;

var current_record = [false,false,false,false,false];

function drag(evt){
  evt.originalEvent.dataTransfer.setData("text", $(evt.target));
}

function check_valid(target, drop_target){
  //Add 1,2,3 x and y from dragged target
  //If any are out of bounds, valid=false
  //If any are filled in the result grid, valid=false
  alert("checking valid with target: " + target + " and drop_target: " + drop_target)
  var valid = true;
  var x = drop_target.data("data-x");
  var y = drop_target.data("data-y");
  if (x + target.data("data-x1") >= GRID_SIZE || x + target.data("data-x1") < 0){
    valid = false;
  } else if (y + target.data("data-y1") >= GRID_SIZE || y + target.data("data-y1") < 0){
    valid = false;
  } else if (x + target.data("data-x2") >= GRID_SIZE || x + target.data("data-x2") < 0){
    valid = false;
  } else if (y + target.data("data-y2") >= GRID_SIZE || y + target.data("data-y2") < 0){
    valid = false;
  } else if (x + target.data("data-x3") >= GRID_SIZE || x + target.data("data-x3") < 0){
    valid = false;
  } else if (y + target.data("data-y3") >= GRID_SIZE || y + target.data("data-y3") < 0){
    valid = false;
  } else {
    var temp_grid;
    if (drop_target.parent().attr('id') == "big1") temp_grid = result_grid_1;
    else if (drop_target.parent().attr('id') == "big2") temp_grid = result_grid_2;
    else if (drop_target.parent().attr('id') == "big3") temp_grid = result_grid_3;
    else if (drop_target.parent().attr('id') == "big4") temp_grid = result_grid_4;
    else if (drop_target.parent().attr('id') == "big5") temp_grid = result_grid_5;
    if (temp_grid[x + target.data("data-x1")][y + target.data("data-y1")]){
      valid = false;
    } else if (temp_grid[x + target.data("data-x2")][y + target.data("data-y2")]){
      valid = false;
    } else if (temp_grid[x + target.data("data-x3")][y + target.data("data-y3")]){
      valid = false;
    } else if (temp_grid[x][y]){
      valid = false;
    }
  }
  return valid;
}

//USE ONLY AFTER CHECKING VALID
function add_css(target, drop_target, css){
  //Algorithmically generate IDs, use to add CSS to neighbors
  //Target.attr('id'), modify with data x and y 1-3
  drop_target.css(css);
  var x = drop_target.data("data-x");
  var y = drop_target.data("data-y");
  var big_id = 0;
  if (drop_target.parent().attr('id') == "big1") big_id = 100;
  else if (drop_target.parent().attr('id') == "big2") big_id = 200;
  else if (drop_target.parent().attr('id') == "big3") temp_grid = 300;
  else if (drop_target.parent().attr('id') == "big4") temp_grid = 400;
  else if (drop_target.parent().attr('id') == "big5") temp_grid = 500;
  big_id = big_id + drop_target.data("data-x") * 10 + drop_target.data("data-y");
  var temp_id = big_id + target.data("data-x1") * 10 + drop_target.data("data-y1");
  $("#" + temp_id).css(css);
  temp_id = big_id + target.data("data-x2") * 10 + drop_target.data("data-y2");
  $("#" + temp_id).css(css);
  temp_id = big_id + target.data("data-x3") * 10 + drop_target.data("data-y3");
  $("#" + temp_id).css(css);
}

function drag_enter(evt){
  alert("Drag enter");
  evt.preventDefault();
  evt.stopPropagation();
  var drop_target = $(this);

  var target = evt.originalEvent.dataTransfer.getData("text");
  var valid = check_valid(target, drop_target);
  if (valid){
    add_css(target, drop_target, {"background":"grey"});
  }
}

function drag_leave(evt){
  evt.preventDefault();
  evt.stopPropagation();
  var drop_target = $(this);

  var target = evt.dataTransfer.getData("text");
  var valid = check_valid(target, drop_target);
  if (valid){
    add_css(target, drop_target, {"background":"none"})
  }
}

function createShapes(key){
  var container = $('<div></div>');
  container.addClass("block_container");
  var block1 = $('<div></div>');
  block1.addClass("block_internal");
  var block2 = $('<div></div>');
  block2.addClass("block_internal");
  var block3 = $('<div></div>');
  block3.addClass("block_internal");
  var block4 = $('<div></div>');
  block4.addClass("block_internal");

  //if (key == 0){
    block1.data({"data-x1":1, "data-x2":0, "data-x3":1, "data-y1":0, "data-y2":1, "data-y3":1});
    block2.data({"data-x1":-1, "data-x2":-1, "data-x3":0, "data-y1":0, "data-y2":1, "data-y3":1});
    block2.css("left", 30);
    block3.data({"data-x1":0, "data-x2":1, "data-x3":1, "data-y1":-1, "data-y2":-1, "data-y3":0});
    block3.css("top", 30)
    block4.data({"data-x1":-1, "data-x2":0, "data-x3":-1, "data-y1":-1, "data-y2":-1, "data-y3":0});
    block4.css({"left": 30, "top": 30});
  //} else if (key == 1) {

  //}

  container.append(block1);
  container.append(block2);
  container.append(block3);
  container.append(block4);

  container.on('dragstart', drag);
  container.css({"draggable":true});

  return container;
}

function check(grid_1, left_1, right_1, top_1, bottom_1, grid_2, left_2, right_2, top_2, bottom_2){
  var unique = false;
  for (var i=0; i<(right_1 - left_1) && !unique; i++){
    for (var j=0; j<bottom_1-top_1; j++){
      if (grid_1[i+left_1][j+top_1] != grid_2[i+left_2][j+top_2]){
        unique = true;
        break;
      }
    }
  }
}

function refresh(){
  var shape_set = stimuli[index].stim.split(",");
  $(".stimuli").empty();
  for (var i=0; i<5; i++){
    $(".stimuli").append(createShapes(shape_set[i]));
  }
  //Clear result_grids, clear response blocks
  trial_start_time = Date.now();
}

//Records after each block finishes
function record(){
  var end_time = Date.now();
  //Mark grid as complete
  if (active_block == result_grid_1){
    current_record[0] == true;
    responses[index]['time_1'] = end_time - response_start_time;
  } else if (active_block == result_grid_2){
    current_record[1] == true;
    responses[index]['time_2'] = end_time - response_start_time;
  } else if (active_block == result_grid_3){
    current_record[2] == true;
    responses[index]['time_3'] = end_time - response_start_time;
  } else if (active_block == result_grid_4){
    current_record[3] == true;
    responses[index]['time_4'] = end_time - response_start_time;
  } else if (active_block == result_grid_5){
    current_record[4] == true;
    responses[index]['time_5'] = end_time - response_start_time;
  }
  //If 5th block recording, check uniqueness, refresh
  var done = true;
  for (var i = 0; i < 5; i++){
    if (current_record[i] == false){
      done = false;
    }
  }
  if (done){
    //For each result grid, find left/right/top/bottom boundaries
    var grid_1_left = GRID_SIZE-1;
    var grid_1_right = 0;
    var grid_1_top = GRID_SIZE-1;
    var grid_1_bottom = 0;
    var grid_2_left = GRID_SIZE-1;
    var grid_2_right = 0;
    var grid_2_top = GRID_SIZE-1;
    var grid_2_bottom = 0;
    var grid_3_left = GRID_SIZE-1;
    var grid_3_right = 0;
    var grid_3_top = GRID_SIZE-1;
    var grid_3_bottom = 0;
    var grid_4_left = GRID_SIZE-1;
    var grid_4_right = 0;
    var grid_4_top = GRID_SIZE-1;
    var grid_4_bottom = 0;
    var grid_5_left = GRID_SIZE-1;
    var grid_5_right = 0;
    var grid_5_top = GRID_SIZE-1;
    var grid_5_bottom = 0;
    for (var i = 0; i < GRID_SIZE; i++){
      for (var j = 0; j < GRID_SIZE; j++){
        if (result_grid_1[i][j]){
          grid_1_left = Math.min(grid_1_left, i);
          grid_1_right = Math.max(grid_1_right, i);
          grid_1_top = Math.min(grid_1_top, j);
          grid_1_bottom = Math.max(grid_1_bottom, j);
        }
        if (result_grid_2[i][j]){
          grid_2_left = Math.min(grid_2_left, i);
          grid_2_right = Math.max(grid_2_right, i);
          grid_2_top = Math.min(grid_2_top, j);
          grid_2_bottom = Math.max(grid_2_bottom, j);
        }
        if (result_grid_3[i][j]){
          grid_3_left = Math.min(grid_3_left, i);
          grid_3_right = Math.max(grid_3_right, i);
          grid_3_top = Math.min(grid_3_top, j);
          grid_3_bottom = Math.max(grid_3_bottom, j);
        }
        if (result_grid_4[i][j]){
          grid_4_left = Math.min(grid_4_left, i);
          grid_4_right = Math.max(grid_4_right, i);
          grid_4_top = Math.min(grid_4_top, j);
          grid_4_bottom = Math.max(grid_4_bottom, j);
        }
        if (result_grid_5[i][j]){
          grid_5_left = Math.min(grid_5_left, i);
          grid_5_right = Math.max(grid_5_right, i);
          grid_5_top = Math.min(grid_5_top, j);
          grid_5_bottom = Math.max(grid_5_bottom, j);
        }
      }
    }
    //For each grid, check size vs others
    var grid_1_unique = true;
    var grid_2_unique = true;
    var grid_3_unique = true;
    var grid_4_unique = true;
    var grid_5_unique = true;
    //Any grids of same size, compare virtual grids for uniqueness at each point
    if ((grid_1_right - grid_1_left) == (grid_2_right - grid_2_left) && (grid_1_bottom-grid_1_top) == (grid_2_bottom-grid_2_top)){
      grid_2_unique = (check(result_grid_1, grid_1_left, grid_1_right, grid_1_top, grid_1_bottom, result_grid_2, grid_2_right, grid_2_left, grid_2_top, grid_2_bottom) && grid_2_unique);
    }
    if ((grid_1_right - grid_1_left) == (grid_3_right - grid_3_left) && (grid_1_bottom-grid_1_top) == (grid_3_bottom-grid_3_top)){
      grid_3_unique = (check(result_grid_1, grid_1_left, grid_1_right, grid_1_top, grid_1_bottom, result_grid_3, grid_3_right, grid_3_left, grid_3_top, grid_3_bottom) && grid_3_unique);
    }
    if ((grid_1_right - grid_1_left) == (grid_4_right - grid_4_left) && (grid_1_bottom-grid_1_top) == (grid_4_bottom-grid_4_top)){
      grid_4_unique = (check(result_grid_1, grid_1_left, grid_1_right, grid_1_top, grid_1_bottom, result_grid_4, grid_4_right, grid_4_left, grid_4_top, grid_4_bottom) && grid_4_unique);
    }
    if ((grid_1_right - grid_1_left) == (grid_5_right - grid_5_left) && (grid_1_bottom-grid_1_top) == (grid_5_bottom-grid_5_top)){
      grid_5_unique = (check(result_grid_1, grid_1_left, grid_1_right, grid_1_top, grid_1_bottom, result_grid_5, grid_5_right, grid_5_left, grid_5_top, grid_5_bottom) && grid_5_unique);
    }
    if ((grid_2_right - grid_2_left) == (grid_3_right - grid_3_left) && (grid_2_bottom-grid_2_top) == (grid_3_bottom-grid_3_top)){
      grid_3_unique = (check(result_grid_2, grid_2_left, grid_2_right, grid_2_top, grid_2_bottom, result_grid_3, grid_3_right, grid_3_left, grid_3_top, grid_3_bottom) && grid_3_unique);
    }
    if ((grid_2_right - grid_2_left) == (grid_4_right - grid_4_left) && (grid_2_bottom-grid_2_top) == (grid_4_bottom-grid_4_top)){
      grid_4_unique = (check(result_grid_2, grid_2_left, grid_2_right, grid_2_top, grid_2_bottom, result_grid_4, grid_4_right, grid_4_left, grid_4_top, grid_4_bottom) && grid_4_unique);
    }
    if ((grid_2_right - grid_2_left) == (grid_5_right - grid_5_left) && (grid_2_bottom-grid_2_top) == (grid_5_bottom-grid_5_top)){
      grid_5_unique = (check(result_grid_2, grid_2_left, grid_2_right, grid_2_top, grid_2_bottom, result_grid_5, grid_5_right, grid_5_left, grid_5_top, grid_5_bottom) && grid_5_unique);
    }
    if ((grid_3_right - grid_3_left) == (grid_4_right - grid_4_left) && (grid_3_bottom-grid_3_top) == (grid_4_bottom-grid_4_top)){
      grid_4_unique = (check(result_grid_3, grid_3_left, grid_3_right, grid_3_top, grid_3_bottom, result_grid_4, grid_4_right, grid_4_left, grid_4_top, grid_4_bottom) && grid_4_unique);
    }
    if ((grid_3_right - grid_3_left) == (grid_5_right - grid_5_left) && (grid_3_bottom-grid_3_top) == (grid_5_bottom-grid_5_top)){
      grid_5_unique = (check(result_grid_3, grid_3_left, grid_3_right, grid_3_top, grid_3_bottom, result_grid_5, grid_5_right, grid_5_left, grid_5_top, grid_5_bottom) && grid_5_unique);
    }
    if ((grid_4_right - grid_4_left) == (grid_5_right - grid_5_left) && (grid_4_bottom-grid_4_top) == (grid_5_bottom-grid_5_top)){
      grid_5_unique = (check(result_grid_4, grid_4_left, grid_4_right, grid_4_top, grid_4_bottom, result_grid_5, grid_5_right, grid_5_left, grid_5_top, grid_5_bottom) && grid_5_unique);
    }
    //Store response
    responses[index]['total_time'] = end_time - trial_start_time;
    responses[index]['stimulus'] = stimuli[index].id;
    responses[index]['response_1_unique'] = grid_1_unique;
    responses[index]['response_2_unique'] = grid_2_unique;
    responses[index]['response_3_unique'] = grid_3_unique;
    responses[index]['response_4_unique'] = grid_4_unique;
    responses[index]['response_5_unique'] = grid_5_unique;
    index += 1;
    refresh();
  } else {
    //If not, reenable incomplete grids, reenable tetris pieces
    if (current_record[0] == false){
      $("#big1").css({"background":"none"});
      $("#big1").on("dragenter", function(event){
        event.preventDefault();
      });
    }
    if (current_record[1] == false){
      $("#big2").css({"background":"none"});
      $("#big2").on("dragenter", function(event){
        event.preventDefault();
      });
    }
    if (current_record[2] == false){
      $("#big3").css({"background":"none"});
      $("#big3").on("dragenter", function(event){
        event.preventDefault();
      });
    }
    if (current_record[3] == false){
      $("#big4").css({"background":"none"});
      $("#big4").on("dragenter", function(event){
        event.preventDefault();
      });
    }
    if (current_record[4] == false){
      $("#big5").css({"background":"none"});
      $("#big5").on("dragenter", function(event){
        event.preventDefault();
      });
    }
    //Should reenable all block-containers
    $(".block_container").css({"background":"none", "draggable":true});
    response_start_time = Date.now();
  }
}

$(document).ready(function(){
  $(".instructions").html("“In this task, you will be presented with a sample of 5 shapes.");
  $("button").click(function(e){
    $(".instructions_div").remove();
    $(".stimuli").css("display", "flex");
  var div = $('<div></div>');
  div.attr('id', 'big1');
  div.addClass('block_design_response');
  div.on('dragover', function(event){
    event.preventDefault();
  })
  div.on('dragenter', function(event){
    event.preventDefault();
  })
  div.on('drop', function(event){
    event.preventDefault();
  })
  $('#top').append(div);
  div = $('<div></div>');
  div.attr('id', 'big2');
  div.addClass('block_design_response');
  div.on('dragover', function(event){
    event.preventDefault();
  })
  div.on('dragenter', function(event){
    event.preventDefault();
  })
  div.on('drop', function(event){
    event.preventDefault();
  })
  $('#top').append(div);
  div = $('<div></div>');
  div.attr('id', 'big3');
  div.addClass('block_design_response');
  div.on('dragover', function(event){
    event.preventDefault();
  })
  div.on('dragenter', function(event){
    event.preventDefault();
  })
  div.on('drop', function(event){
    event.preventDefault();
  })
  $('#top').append(div);
  div = $('<div></div>');
  div.attr('id', 'big4');
  div.addClass('block_design_response');
  div.on('dragover', function(event){
    event.preventDefault();
  })
  div.on('dragenter', function(event){
    event.preventDefault();
  })
  div.on('drop', function(event){
    event.preventDefault();
  })
  $('#bottom').append(div);
  div = $('<div></div>');
  div.attr('id', 'big5');
  div.addClass('block_design_response');
  div.on('dragover', function(event){
    event.preventDefault();
  })
  div.on('dragenter', function(event){
    event.preventDefault();
  })
  div.on('drop', function(event){
    event.preventDefault();
  })
  $('#bottom').append(div);

  for(var i=0; i<GRID_SIZE; i++){
    for(var j=0; j<GRID_SIZE; j++){
      result_grid_1[i][j] = false;
      result_grid_2[i][j] = false;
      result_grid_3[i][j] = false;
      result_grid_4[i][j] = false;
      result_grid_5[i][j] = false;

      var div = $('<div></div>');
      div.addClass('destination');
      div.data({"data-x":i, "data-y":j});
      div.on('dragenter', drag_enter);
      div.on('dragover', function(evt){
        alert("Blargh");
        evt.preventDefault();
      });
      div.on('dragleave', drag_leave);
      div.on("drop", function(evt){
        evt.preventDefault();
        evt.stopPropagation();

        var target = evt.dataTransfer.getData("text");
        var drop_target = $(this);
        var valid = check_valid(target, drop_target);
        //If valid, unshade each, set borders on each, set true in result grid
        if (valid){
          add_css(target, drop_target, {"border":"-1px solid black", "background":"none"});
          var temp_grid;
          if (drop_target.parent().attr('id') == "big1") temp_grid = result_grid_1;
          else if (drop_target.parent().attr('id') == "big2") temp_grid = result_grid_2;
          else if (drop_target.parent().attr('id') == "big3") temp_grid = result_grid_3;
          else if (drop_target.parent().attr('id') == "big4") temp_grid = result_grid_4;
          else if (drop_target.parent().attr('id') == "big5") temp_grid = result_grid_5;
          temp_grid[x][y] = true;
          temp_grid[x + target.data('data-x1')][y + target.data('data-y1')] = true;
          temp_grid[x + target.data('data-x2')][y + target.data('data-y2')] = true;
          temp_grid[x + target.data("data-x3")][y + target.data("data-y3")] = true;
          //If there is no active block, set to temp_grid
          if (active_block == null){
            response_start_time = Date.now();
            active_block = temp_grid;
            if (temp_grid != result_grid_1){
              $("#big1").css({"background":"grey"});
              $("#big1").off("dragover");
            } else if (temp_grid != result_grid_2){
              $("#big2").css({"background":"grey"});
              $("#big2").off("dragover");
            } else if (temp_grid != result_grid_3){
              $("#big3").css({"background":"grey"});
              $("#big3").off("dragover");
            } else if (temp_grid != result_grid_4){
              $("#big4").css({"background":"grey"});
              $("#big4").off("dragover");
            } else if (temp_grid != result_grid_5){
              $("#big5").css({"background":"grey"});
              $("#big5").off("dragover");
            }
          }
          //Disable the tetris piece
          target.parent().css({"background":"grey", "draggable":false});
          //Check for 5 pieces dropped, if yes call record
          used_pieces += 1;
          if (used_pieces == 5){
            record();
            used_pieces = 0;
          }
        }
      });
      div.attr('id', (100+(i*10)+j).toString());
      $("#big1").append(div.clone());
      div.attr('id', (200+(i*10)+j).toString());
      $("#big2").append(div.clone());
      div.attr('id', (300+(i*10)+j).toString());
      $("#big3").append(div.clone());
      div.attr('id', (400+(i*10)+j).toString());
      $("#big4").append(div.clone());
      div.attr('id', (500+(i*10)+j).toString());
      $("#big5").append(div.clone());
    }
  }
  refresh();
})
});
