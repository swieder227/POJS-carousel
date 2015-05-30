function Carousel (obj) {
  
  this.obj = document.querySelector(obj);
  this.slide_index;
  this.slide_length;
  this.slide_current_obj;

  this._init();
}

Carousel.prototype = {
  constructor: Carousel,

  _init : function () {
    // start at [data-slide-index]
    this.slide_index = this.obj.getAttribute("data-slide-index") ? parseInt(this.obj.getAttribute("data-slide-index")) : 0;

    // starting obj
    this._getCurrentSlideObj();
    this.slide_current_obj.className += ' active';

    // length
    this.slide_length = this.obj.querySelectorAll(".carousel-item").length;

    this._setupHandlers();
  },

  _setupHandlers : function () {

    var self = this;

    var btn_L = this.obj.querySelector(".carousel-btn[data-dir='_L']");
    btn_L.addEventListener("click", function(){ self.slideLeft() });

    var btn_R = this.obj.querySelector(".carousel-btn[data-dir='_R']");
    btn_R.addEventListener("click", function(){ self.slideRight() });

    var dots = this.obj.querySelectorAll(".carousel-dot");
    for(var i = 0; i < dots.length; i++){
      dots[i].addEventListener("click", function(){ self.slideJump(this.getAttribute("data-slide-index")) });
    }

  },

  _getCurrentSlideObj : function () {
    // get current slide from DOM
    this.slide_current_obj = this.obj.querySelector(".carousel-item[data-slide-index='"+this.slide_index+"']");

    // update dots
    var dots = this.obj.querySelectorAll(".carousel-dot");
    for(var i = 0; i < dots.length; i++){
      dots[i].className = dots[i].className.replace(/(^| )active/,"");
    }
    dots[this.slide_index].className += " active";

  },


  slide : function (dir) {
    
    // set diretion-based vars. these classes apply left/right css animations
    var class_for_current = dir == "_R" ? 'prev' : 'next';
    var class_for_target = dir == "_R" ? 'next' : 'prev';

    // anim out current
    var current_slide = this.slide_current_obj;
    current_slide.className += ' ' + class_for_current;
    current_slide.className = current_slide.className.replace(/(^| )active/,"");
    setTimeout(function(){
      current_slide.className = current_slide.className.replace(new RegExp('(^| )'+class_for_current,'g'),"")
    },510);

    // anim in next
    var target_slide = this.obj.querySelector(".carousel-item[data-slide-index='"+this.slide_index+"']");
    target_slide.className += ' ' + class_for_target;
    target_slide.className += ' active';
    setTimeout(function(){
      target_slide.className = target_slide.className.replace(new RegExp('(^| )'+class_for_target,'g'),"");
    },510);

    // update current slide
    this._getCurrentSlideObj();

  },

  slideLeft : function () {
    // if index == 0, set to length, else index--
    if(this.slide_index == 0){
      this.slide_index = this.slide_length - 1;
    } else {
      this.slide_index -= 1;
    }
    this.slide("_L");
  },

  slideRight : function () {
    // if index == max, set to 0, else index++
    if(this.slide_index == this.slide_length - 1){
      this.slide_index = 0;
    } else {
      this.slide_index += 1;
    }
    this.slide("_R");
  },

  slideJump : function (jumpTo) {
    if(jumpTo > this.slide_length || jumpTo < 0){
      console.error("invalid slide index. wtf m8?");
      return false;
    } else if (jumpTo > this.slide_index) {
      this.slide_index = jumpTo;
      this.slide("_R");
    } else {
      this.slide_index = jumpTo;
      this.slide("_L");
    }
  },

}

var foo;

function main () {
  foo = new Carousel(".carousel-main--1");
}