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
var clean = false;

var current_record = [false,false,false,false,false];

function drag(evt){
  evt.target.id = "current_dragged";
}
function dragend(evt){
  $("#current_dragged").removeAttr('id');
}

function check_valid(target, drop_target){
  //Add 1,2,3 x and y from dragged target
  //If any are out of bounds, valid=false
  //If any are filled in the result grid, valid=false
  var valid = true;
  var x = drop_target.data("data-x");
  var y = drop_target.data("data-y");
  if (x + target.data("data-y1") >= GRID_SIZE || x + target.data("data-y1") < 0){
    valid = false;
  } else if (y + target.data("data-x1") >= GRID_SIZE || y + target.data("data-x1") < 0){
    valid = false;
  } else if (x + target.data("data-y2") >= GRID_SIZE || x + target.data("data-y2") < 0){
    valid = false;
  } else if (y + target.data("data-x2") >= GRID_SIZE || y + target.data("data-x2") < 0){
    valid = false;
  } else if (x + target.data("data-y3") >= GRID_SIZE || x + target.data("data-y3") < 0){
    valid = false;
  } else if (y + target.data("data-x3") >= GRID_SIZE || y + target.data("data-x3") < 0){
    valid = false;
  } else {
    var temp_grid;
    if (drop_target.parent().attr('id') == "big1") temp_grid = result_grid_1;
    else if (drop_target.parent().attr('id') == "big2") temp_grid = result_grid_2;
    else if (drop_target.parent().attr('id') == "big3") temp_grid = result_grid_3;
    else if (drop_target.parent().attr('id') == "big4") temp_grid = result_grid_4;
    else if (drop_target.parent().attr('id') == "big5") temp_grid = result_grid_5;
    else return false;
    if (temp_grid[y + target.data("data-x1")][x + target.data("data-y1")]){
      valid = false;
    } else if (temp_grid[y + target.data("data-x2")][x + target.data("data-y2")]){
      valid = false;
    } else if (temp_grid[y + target.data("data-x3")][x + target.data("data-y3")]){
      valid = false;
    } else if (temp_grid[y][x]){
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
  var y = drop_target.data("data-x");
  var x = drop_target.data("data-y");
  var big_id = 0;
  if (drop_target.parent().attr('id') == "big1") big_id = 100;
  else if (drop_target.parent().attr('id') == "big2") big_id = 200;
  else if (drop_target.parent().attr('id') == "big3") big_id = 300;
  else if (drop_target.parent().attr('id') == "big4") big_id = 400;
  else if (drop_target.parent().attr('id') == "big5") big_id = 500;
  big_id = big_id + Number(drop_target.data("data-x")) * 10 + Number(drop_target.data("data-y"));
  var temp_id = big_id + Number(target.data("data-y1")) * 10 + Number(target.data("data-x1"));
  $("#" + temp_id.toString()).css(css);
  temp_id = big_id + Number(target.data("data-y2")) * 10 + Number(target.data("data-x2"));
  $("#" + temp_id.toString()).css(css);
  temp_id = big_id + Number(target.data("data-y3")) * 10 + Number(target.data("data-x3"));
  $("#" + temp_id.toString()).css(css);
}

function drag_enter(evt){
  evt.preventDefault();
  evt.stopPropagation();

  var drop_target = $(this);
  drop_target.parent().children().css("background-color", "white");
  clean = true;

  var target = $("#current_dragged");
  var valid = check_valid(target, drop_target);
  if (valid){
    add_css($(target), drop_target, {"background-color":"grey"});
  }
}

function drag_leave(evt){
  evt.preventDefault();
  evt.stopPropagation();
  if (clean){
    clean = false;
  } else {
    var drop_target = $(this);
    drop_target.parent().children().css("background-color", "white");
  }
}

function createShapes(key){
  var container = $('<div></div>');
  container.addClass("block_container");
  var block1 = $('<div class="block_internal" draggable=true></div>');
  block1.on('dragstart', drag);
  block1.on('dragend', dragend);
  var block2 = $('<div class="block_internal" draggable=true></div>');
  block2.on('dragstart', drag);
  block2.on('dragend', dragend);
  var block3 = $('<div class="block_internal" draggable=true></div>');
  block3.on('dragstart', drag);
  block3.on('dragend', dragend);
  var block4 = $('<div class="block_internal" draggable=true></div>');
  block4.on('dragstart', drag);
  block4.on('dragend', dragend);

  if (key == 0){
    block1.data({"data-x1":1, "data-x2":0, "data-x3":1, "data-y1":0, "data-y2":1, "data-y3":1});
    block2.data({"data-x1":-1, "data-x2":-1, "data-x3":0, "data-y1":0, "data-y2":1, "data-y3":1});
    block2.css("left", 30);
    block3.data({"data-x1":0, "data-x2":1, "data-x3":1, "data-y1":-1, "data-y2":-1, "data-y3":0});
    block3.css("top", 30)
    block4.data({"data-x1":-1, "data-x2":0, "data-x3":-1, "data-y1":-1, "data-y2":-1, "data-y3":0});
    block4.css({"left": 30, "top": 30});
  } else if (key == 1) {
    block1.data({"data-x1":0, "data-x2":0, "data-x3":1, "data-y1":1, "data-y2":2, "data-y3":2});
    block2.data({"data-x1":0, "data-x2":0, "data-x3":1, "data-y1":-1, "data-y2":1, "data-y3":1});
    block2.css("top", 30);
    block3.data({"data-x1":0, "data-x2":0, "data-x3":1, "data-y1":-2, "data-y2":-1, "data-y3":0});
    block3.css("top", 60);
    block4.data({"data-x1":-1, "data-x2":-1, "data-x3":-1, "data-y1":-2, "data-y2":-1, "data-y3":0});
    block4.css({"left":30, "top":60});
  } else if (key == 2) {
    block1.data({"data-x1":-2, "data-x2":-1, "data-x3":0, "data-y1":1, "data-y2":1, "data-y3":1});
    block1.css("left", 60);
    block2.data({"data-x1":1, "data-x2":2, "data-x3":2, "data-y1":0, "data-y2":0, "data-y3":-1});
    block2.css("top", 30);
    block3.data({"data-x1":-1, "data-x2":1, "data-x3":1, "data-y1":0, "data-y2":0, "data-y3":-1});
    block3.css({"left":30, "top":30});
    block4.data({"data-x1":-2, "data-x2":-1, "data-x3":0, "data-y1":0, "data-y2":0, "data-y3":-1});
    block4.css({"left":60, "top":30});
  } else if (key == 3) {
    block1.data({"data-x1":1, "data-x2":1, "data-x3":1, "data-y1":0, "data-y2":1, "data-y3":2});
    block2.data({"data-x1":-1, "data-x2":0, "data-x3":0, "data-y1":0, "data-y2":1, "data-y3":2});
    block2.css("left", 30);
    block3.data({"data-x1":-1, "data-x2":0, "data-x3":0, "data-y1":-1, "data-y2":-1, "data-y3":1});
    block3.css({"left":30, "top":30});
    block4.data({"data-x1":-1, "data-x2":0, "data-x3":0, "data-y1":-2, "data-y2":-2, "data-y3":-1});
    block4.css({"left":30, "top":60});
  } else if (key == 4) {
    block1.data({"data-x1":1, "data-x2":2, "data-x3":0, "data-y1":0, "data-y2":0, "data-y3":1});
    block2.data({"data-x1":-1, "data-x2":1, "data-x3":-1, "data-y1":0, "data-y2":0, "data-y3":1});
    block2.css("left", 30);
    block3.data({"data-x1":-2, "data-x2":-1, "data-x3":-2, "data-y1":0, "data-y2":0, "data-y3":1});
    block3.css("left", 60);
    block4.data({"data-x1":0, "data-x2":1, "data-x3":2, "data-y1":-1, "data-y2":-1, "data-y3":-1});
    block4.css("top", 30);
  } else if (key == 5) {
    block1.data({"data-x1":1, "data-x2":1, "data-x3":1, "data-y1":0, "data-y2":-1, "data-y3":-2});
    block1.css("top", 60);
    block2.data({"data-x1":-1, "data-x2":0, "data-x3":0, "data-y1":0, "data-y2":-1, "data-y3":-2});
    block2.css({"top":60, "left":30});
    block3.data({"data-x1":-1, "data-x2":0, "data-x3":0, "data-y1":1, "data-y2":1, "data-y3":-1});
    block3.css({"top":30, "left":30});
    block4.data({"data-x1":-1, "data-x2":0, "data-x3":0, "data-y1":2, "data-y2":2, "data-y3":1});
    block4.css("left", 30);
  } else if (key == 6) {
    block1.data({"data-x1":1, "data-x2":2, "data-x3":2, "data-y1":0, "data-y2":0, "data-y3":1});
    block2.data({"data-x1":-1, "data-x2":1, "data-x3":1, "data-y1":0, "data-y2":0, "data-y3":1});
    block2.css("left", 30);
    block3.data({"data-x1":-2, "data-x2":-1, "data-x3":0, "data-y1":0, "data-y2":0, "data-y3":1});
    block3.css("left", 60);
    block4.data({"data-x1":-2, "data-x2":-1, "data-x3":0, "data-y1":-1, "data-y2":-1, "data-y3":-1});
    block4.css({"top":30, "left":60});
  } else if (key == 7) {
    block1.data({"data-x1":1, "data-x2":0, "data-x3":0, "data-y1":0, "data-y2":1, "data-y3":2});
    block2.data({"data-x1":-1, "data-x2":-1, "data-x3":-1, "data-y1":0, "data-y2":1, "data-y3":2});
    block2.css("left", 30);
    block3.data({"data-x1":0, "data-x2":1, "data-x3":0, "data-y1":-1, "data-y2":-1, "data-y3":1});
    block3.css("top", 30);
    block4.data({"data-x1":0, "data-x2":1, "data-x3":0, "data-y1":-2, "data-y2":-2, "data-y3":-1});
    block4.css("top", 60);
  } else if (key == 8) {
    block1.data({"data-x1":0, "data-x2":1, "data-x3":2, "data-y1":1, "data-y2":1, "data-y3":1});
    block2.data({"data-x1":0, "data-x2":1, "data-x3":2, "data-y1":-1, "data-y2":0, "data-y3":0});
    block2.css("top", 30);
    block3.data({"data-x1":-1, "data-x2":-1, "data-x3":1, "data-y1":-1, "data-y2":0, "data-y3":0});
    block3.css({"top":30, "left":30});
    block4.data({"data-x1":-2, "data-x2":-2, "data-x3":-1, "data-y1":-1, "data-y2":0, "data-y3":0});
    block4.css({"top":30, "left":60});
  } else if (key == 9) {
    block1.data({"data-x1":0, "data-x2":1, "data-x3":1, "data-y1":1, "data-y2":1, "data-y3":2});
    block2.data({"data-x1":0, "data-x2":1, "data-x3":1, "data-y1":-1, "data-y2":0, "data-y3":1});
    block2.css("top", 30);
    block3.data({"data-x1":-1, "data-x2":-1, "data-x3":0, "data-y1":-1, "data-y2":0, "data-y3":1});
    block3.css({"top":30, "left":30});
    block4.data({"data-x1":-1, "data-x2":-1, "data-x3":0, "data-y1":-2, "data-y2":-1, "data-y3":-1});
    block4.css({"top":60, "left":30});
  } else if (key == 10) {
    block1.data({"data-x1":1, "data-x2":1, "data-x3":2, "data-y1":0, "data-y2":-1, "data-y3":-1});
    block1.css("top", 30);
    block2.data({"data-x1":-1, "data-x2":0, "data-x3":1, "data-y1":0, "data-y2":-1, "data-y3":-1});
    block2.css({"top":30, "left":30});
    block3.data({"data-x1":-1, "data-x2":0, "data-x3":1, "data-y1":1, "data-y2":1, "data-y3":0});
    block3.css("left", 30);
    block4.data({"data-x1":-2, "data-x2":-1, "data-x3":-1, "data-y1":1, "data-y2":1, "data-y3":0});
    block4.css("left", 60);
  } else if (key == 11) {
    block1.data({"data-x1":-1, "data-x2":0, "data-x3":-1, "data-y1":1, "data-y2":1, "data-y3":2});
    block1.css("left", 30);
    block2.data({"data-x1":1, "data-x2":1, "data-x3":0, "data-y1":-1, "data-y2":0, "data-y3":1});
    block2.css("top", 30);
    block3.data({"data-x1":0, "data-x2":-1, "data-x3":-1, "data-y1":-1, "data-y2":0, "data-y3":1});
    block3.css({"top":30, "left":30});
    block4.data({"data-x1":1, "data-x2":0, "data-x3":1, "data-y1":-2, "data-y2":-1, "data-y3":-1});
    block4.css("top", 60);
  } else if (key == 12) {
    block1.data({"data-x1":1, "data-x2":1, "data-x3":2, "data-y1":0, "data-y2":1, "data-y3":1});
    block2.data({"data-x1":-1, "data-x2":0, "data-x3":1, "data-y1":0, "data-y2":1, "data-y3":1});
    block2.css("left", 30);
    block3.data({"data-x1":-1, "data-x2":0, "data-x3":1, "data-y1":-1, "data-y2":-1, "data-y3":0});
    block3.css({"left":30, "top":30});
    block4.data({"data-x1":-2, "data-x2":-1, "data-x3":-1, "data-y1":-1, "data-y2":-1, "data-y3":0});
    block4.css({"left":60, "top":30});
  } else if (key == 13) {
    block1.data({"data-x1":1, "data-x2":1, "data-x3":2, "data-y1":-1, "data-y2":0, "data-y3":0});
    block1.css("top", 30);
    block2.data({"data-x1":-1, "data-x2":0, "data-x3":1, "data-y1":1, "data-y2":1, "data-y3":1});
    block2.css("left", 30);
    block3.data({"data-x1":-1, "data-x2":0, "data-x3":1, "data-y1":0, "data-y2":-1, "data-y3":0});
    block3.css({"top":30, "left":30});
    block4.data({"data-x1":-2, "data-x2":-1, "data-x3":-1, "data-y1":0, "data-y2":-1, "data-y3":0});
    block4.css({"top":30, "left":60});
  } else if (key == 14) {
    block1.data({"data-x1":0, "data-x2":1, "data-x3":0, "data-y1":1, "data-y2":1, "data-y3":2});
    block2.data({"data-x1":0, "data-x2":1, "data-x3":0, "data-y1":-1, "data-y2":0, "data-y3":1});
    block2.css("top", 30);
    block3.data({"data-x1":-1, "data-x2":-1, "data-x3":-1, "data-y1":-1, "data-y2":0, "data-y3":1});
    block3.css({"top":30, "left":30});
    block4.data({"data-x1":0, "data-x2":0, "data-x3":1, "data-y1":-2, "data-y2":-1, "data-y3":-1});
    block4.css("top", 60);
  } else if (key == 15) {
    block1.data({"data-x1":1, "data-x2":2, "data-x3":1, "data-y1":0, "data-y2":0, "data-y3":1});
    block2.data({"data-x1":-1, "data-x2":1, "data-x3":0, "data-y1":0, "data-y2":0, "data-y3":1});
    block2.css("left", 30);
    block3.data({"data-x1":-2, "data-x2":-1, "data-x3":-1, "data-y1":0, "data-y2":0, "data-y3":1});
    block3.css("left", 60);
    block4.data({"data-x1":-1, "data-x2":0, "data-x3":1, "data-y1":-1, "data-y2":-1, "data-y3":-1});
    block4.css({"top":30, "left":30});
  } else if (key == 16) {
    block1.data({"data-x1":-1, "data-x2":0, "data-x3":0, "data-y1":1, "data-y2":1, "data-y3":2});
    block1.css("left", 30);
    block2.data({"data-x1":1, "data-x2":1, "data-x3":1, "data-y1":-1, "data-y2":0, "data-y3":1});
    block2.css("top", 30);
    block3.data({"data-x1":0, "data-x2":-1, "data-x3":0, "data-y1":-1, "data-y2":0, "data-y3":1});
    block3.css({"top":30, "left":30});
    block4.data({"data-x1":0, "data-x2":-1, "data-x3":0, "data-y1":-2, "data-y2":-1, "data-y3":-1});
    block4.css({"top":60, "left":30});
  } else if (key == 17) {
    block1.data({"data-x1":0, "data-x2":0, "data-x3":0, "data-y1":1, "data-y2":2, "data-y3":3});
    block2.data({"data-x1":0, "data-x2":0, "data-x3":0, "data-y1":-1, "data-y2":1, "data-y3":2});
    block2.css("top", 30);
    block3.data({"data-x1":0, "data-x2":0, "data-x3":0, "data-y1":-2, "data-y2":-1, "data-y3":1});
    block3.css("top", 60);
    block4.data({"data-x1":0, "data-x2":0, "data-x3":0, "data-y1":-3, "data-y2":-2, "data-y3":-1});
    block4.css("top", 90);
  } else if (key == 18) {
    block1.data({"data-x1":1, "data-x2":2, "data-x3":3, "data-y1":0, "data-y2":0, "data-y3":0});
    block2.data({"data-x1":-1, "data-x2":1, "data-x3":2, "data-y1":0, "data-y2":0, "data-y3":0});
    block2.css("left", 30);
    block3.data({"data-x1":-2, "data-x2":-1, "data-x3":1, "data-y1":0, "data-y2":0, "data-y3":0});
    block3.css("left", 60);
    block4.data({"data-x1":-3, "data-x2":-2, "data-x3":-1, "data-y1":0, "data-y2":0, "data-y3":0});
    block4.css("left", 90);
  }

  container.append(block1);
  container.append(block2);
  container.append(block3);
  container.append(block4);

  return container;
}

function proceed(){
  //For each result grid, find left/right/top/bottom boundaries
  var end_time = Date.now();
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
  //Deal with skipped grids
  if (current_record[0] == false){
    grid_1_unique = false;
  }
  if (current_record[1] == false){
    grid_2_unique = false;
  }
  if (current_record[2] == false){
    grid_3_unique = false;
  }
  if (current_record[3] == false){
    grid_4_unique = false;
  }
  if (current_record[4] == false){
    grid_5_unique = false;
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
  if (index >= Object.keys(stimuli).length){
    //ajax back the data, display generic message, button submits back to master views
    end_trial();
  } else {
    refresh();
  }
}

function check(grid_1, left_1, right_1, top_1, bottom_1, grid_2, right_2, left_2, top_2, bottom_2){
  var unique = false;
  for (var i=0; i<(right_1 - left_1) && !unique; i++){
    for (var j=0; j<bottom_1-top_1; j++){
      console.log(i.toString() + " " + j.toString() + " " + left_1.toString() + " " + top_1.toString() + " " + left_2.toString() + " " + top_2.toString())
      if (grid_1[i+left_1][j+top_1] != grid_2[i+left_2][j+top_2]){
        unique = true;
        break;
      }
    }
  }
  return unique;
}

function refresh(){
  responses[index] = {};
  var shape_set = stimuli[index].stim.split(",");
  $(".stimuli").empty();
  for (var i=0; i<5; i++){
    $(".stimuli").append(createShapes(shape_set[i]));
  }
  //Clear result_grids, clear response blocks
  for (var i=0; i<GRID_SIZE; i++){
    for (var j=0; j<GRID_SIZE; j++){
      result_grid_1[i][j] = false;
      result_grid_2[i][j] = false;
      result_grid_3[i][j] = false;
      result_grid_4[i][j] = false;
      result_grid_5[i][j] = false;
    }
  }
  $("#big1").children().css({"background-color":"white", "border":"0px", "width":30, "height":30});
  $("#big1").children().on('dragover', function(evt){
    evt.preventDefault();
  });
  $("#big1").children().on('dragenter', drag_enter);
  $("#big2").children().css({"background-color":"white", "border":"0px", "width":30, "height":30});
  $("#big2").children().on('dragover', function(evt){
    evt.preventDefault();
  });
  $("#big2").children().on('dragenter', drag_enter);
  $("#big3").children().css({"background-color":"white", "border":"0px", "width":30, "height":30});
  $("#big3").children().on('dragover', function(evt){
    evt.preventDefault();
  });
  $("#big3").children().on('dragenter', drag_enter);
  $("#big4").children().css({"background-color":"white", "border":"0px", "width":30, "height":30});
  $("#big4").children().on('dragover', function(evt){
    evt.preventDefault();
  });
  $("#big4").children().on('dragenter', drag_enter);
  $("#big5").children().css({"background-color":"white", "border":"0px", "width":30, "height":30});
  $("#big5").children().on('dragover', function(evt){
    evt.preventDefault();
  });
  $("#big5").children().on('dragenter', drag_enter);
  trial_start_time = Date.now();
}

//Records after each block finishes
function record(){
  var end_time = Date.now();
  //Mark grid as complete
  if (active_block == result_grid_1){
    current_record[0] = true;
    $("#big1").children().css({"background-color":"grey"});
    $("#big1").children().off("dragover");
    $("#big1").children().off("dragenter");
    $("#big1").children().off("dragleave");
    responses[index]['time_1'] = end_time - response_start_time;
  } else if (active_block == result_grid_2){
    current_record[1] = true;
    $("#big2").children().css({"background-color":"grey"});
    $("#big2").children().off("dragover");
    $("#big2").children().off("dragenter");
    $("#big2").children().off("dragleave");
    responses[index]['time_2'] = end_time - response_start_time;
  } else if (active_block == result_grid_3){
    current_record[2] = true;
    $("#big3").children().css({"background-color":"grey"});
    $("#big3").children().off("dragover");
    $("#big3").children().off("dragenter");
    $("#big3").children().off("dragleave");
    responses[index]['time_3'] = end_time - response_start_time;
  } else if (active_block == result_grid_4){
    current_record[3] = true;
    $("#big4").children().css({"background-color":"grey"});
    $("#big4").children().off("dragover");
    $("#big4").children().off("dragenter");
    $("#big4").children().off("dragleave");
    responses[index]['time_4'] = end_time - response_start_time;
  } else if (active_block == result_grid_5){
    current_record[4] = true;
    $("#big5").children().css({"background-color":"grey"});
    $("#big5").children().off("dragover");
    $("#big5").children().off("dragenter");
    $("#big5").children().off("dragleave");
    responses[index]['time_5'] = end_time - response_start_time;
  }
  active_block = null;
  //If 5th block recording, check uniqueness, refresh
  var done = true;
  for (var i = 0; i < 5; i++){
    if (current_record[i] == false){
      done = false;
    }
  }
  if (done){
    proceed();
  } else {
    //If not, reenable incomplete grids, reenable tetris pieces
    if (current_record[0] == false){
      $("#big1").children().css({"background-color":"white"});
      $("#big1").children().on('dragover', function(evt){
        evt.preventDefault();
      });
      $("#big1").children().on('dragenter', drag_enter);
    }
    if (current_record[1] == false){
      $("#big2").children().css({"background-color":"white"});
      $("#big2").children().on('dragover', function(evt){
        evt.preventDefault();
      });
      $("#big2").children().on('dragenter', drag_enter);

    }
    if (current_record[2] == false){
      $("#big3").children().css({"background-color":"white"});
      $("#big3").children().on('dragover', function(evt){
        evt.preventDefault();
      });
      $("#big3").children().on('dragenter', drag_enter);
    }
    if (current_record[3] == false){
      $("#big4").children().css({"background-color":"white"});
      $("#big4").children().on('dragover', function(evt){
        evt.preventDefault();
      });
      $("#big4").children().on('dragenter', drag_enter);
    }
    if (current_record[4] == false){
      $("#big5").children().css({"background-color":"white"});
      $("#big5").children().on('dragover', function(evt){
        evt.preventDefault();
      });
      $("#big5").children().on('dragenter', drag_enter);
    }
    //Should reenable all block-containers
    $(".block_container").children().css({"background-color":"white"});
    $(".block_container").children().attr("draggable", true);
    response_start_time = Date.now();
  }
}

$(document).ready(function(){
  responses = {};
  var instructions = "In this task, you will be presented with a sample of 5 shapes located in the middle top part of the screen. From the given sample, use your mouse to drag each of the shapes<br>to the blank space provided in order for you to create a design.  The shapes will snap together when placed near each other.  Once you have completed filling up the blank spaces with your<br>designs, you can then click on the next button at the bottom right corner of your computer screen to proceed to the next trial. In instances where you cannot think of new designs<br>to fill all of the blank spaces, you can still proceed to the next trial by clicking the next button. There are a total of 5 trials for you to<br>complete." + last_trial_instructions;
  $(".instructions").html(instructions);
  $("button").click(function(e){
    $(".instructions_div").remove();
    $(".stimuli").css("display", "flex");
  var div = $('<div></div>');
  div.attr('id', 'big1');
  div.addClass('block_design_response');
  $('#top').append(div);
  div = $('<div></div>');
  div.attr('id', 'big2');
  div.addClass('block_design_response');
  $('#top').append(div);
  div = $('<div></div>');
  div.attr('id', 'big3');
  div.addClass('block_design_response');
  $('#top').append(div);
  div = $('<div></div>');
  div.attr('id', 'big4');
  div.addClass('block_design_response');
  $('#bottom').append(div);
  div = $('<div></div>');
  div.attr('id', 'big5');
  div.addClass('block_design_response');
  $('#bottom').append(div);

  for(var i=0; i<GRID_SIZE; i++){
    for(var j=0; j<GRID_SIZE; j++){

      div = $('<div></div>');
      div.addClass('destination');
      div.data({"data-x":i, "data-y":j});
      div.on('dragenter', drag_enter);
      div.on('dragover', function(evt){
        evt.preventDefault();
      });
      div.on('dragleave', drag_leave);
      div.on("drop", function(evt){
        evt.preventDefault();
        evt.stopPropagation();

        var target = $("#current_dragged");
        var drop_target = $(this);
        var valid = check_valid(target, drop_target);
        var x = drop_target.data("data-x");
        var y = drop_target.data("data-y");
        //If valid, unshade each, set borders on each, set true in result grid
        if (valid){
          add_css(target, drop_target, {"border":"1px solid black", "width":"28px", "height":"28px", "background-color":"white"});
          var temp_grid;
          if (drop_target.parent().attr('id') == "big1") temp_grid = result_grid_1;
          else if (drop_target.parent().attr('id') == "big2") temp_grid = result_grid_2;
          else if (drop_target.parent().attr('id') == "big3") temp_grid = result_grid_3;
          else if (drop_target.parent().attr('id') == "big4") temp_grid = result_grid_4;
          else if (drop_target.parent().attr('id') == "big5") temp_grid = result_grid_5;
          temp_grid[y][x] = true;
          temp_grid[y + target.data('data-x1')][x + target.data('data-y1')] = true;
          temp_grid[y + target.data('data-x2')][x + target.data('data-y2')] = true;
          temp_grid[y + target.data("data-x3")][x + target.data("data-y3")] = true;
          //If there is no active block, set to temp_grid
          if (active_block == null){
            response_start_time = Date.now();
            active_block = temp_grid;
            if (temp_grid != result_grid_1){
              $("#big1").children().css({"background-color":"grey"});
              $("#big1").children().off("dragover");
              $("#big1").children().off("dragenter");
              $("#big1").children().off("dragleave");
            }
            if (temp_grid != result_grid_2){
              $("#big2").children().css({"background-color":"grey"});
              $("#big2").children().off("dragover");
              $("#big2").children().off("dragenter");
              $("#big2").children().off("dragleave");
            }
            if (temp_grid != result_grid_3){
              $("#big3").children().css({"background-color":"grey"});
              $("#big3").children().off("dragover");
              $("#big3").children().off("dragenter");
              $("#big3").children().off("dragleave");
            }
            if (temp_grid != result_grid_4){
              $("#big4").children().css({"background-color":"grey"});
              $("#big4").children().off("dragover");
              $("#big4").children().off("dragenter");
              $("#big4").children().off("dragleave");
            }
            if (temp_grid != result_grid_5){
              $("#big5").children().css({"background-color":"grey"});
              $("#big5").children().off("dragover");
              $("#big5").children().off("dragenter");
              $("#big5").children().off("dragleave");
            }
          }
          //Disable the tetris piece
          target.parent().children().css({"background-color":"grey"});
          target.parent().children().attr("draggable", false);
          //Check for 5 pieces dropped, if yes call record
          used_pieces += 1;
          if (used_pieces == 5){
            record();
            used_pieces = 0;
          }
        }
      });
      div.attr('id', (100+(i*10)+j).toString());
      $("#big1").append(div.clone(true));
      div.attr('id', (200+(i*10)+j).toString());
      $("#big2").append(div.clone(true));
      div.attr('id', (300+(i*10)+j).toString());
      $("#big3").append(div.clone(true));
      div.attr('id', (400+(i*10)+j).toString());
      $("#big4").append(div.clone(true));
      div.attr('id', (500+(i*10)+j).toString());
      $("#big5").append(div.clone(true));
    }
  }
  var button = $('<button>Next</button>');
  button.prop('type', 'button');
  button.click(proceed);
  $('body').append(button);
  refresh();
})
});
