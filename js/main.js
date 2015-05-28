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
    this.slide_current_obj = this.obj.querySelector(".carousel-item[data-slide-index='"+this.slide_index+"']");
    this.slide_current_obj.className += ' active';

    // length
    this.slide_length = this.obj.querySelectorAll(".carousel-item").length;

    this._setupHandlers();
  },

  _setupHandlers : function () {

    var self = this;

    var btn_L = this.obj.querySelector(".carousel-btn[data-dir='_L']");
    btn_L.addEventListener("click", function(){ self.slide("_L") });

    var btn_R = this.obj.querySelector(".carousel-btn[data-dir='_R']");
    btn_R.addEventListener("click", function(){ self.slide("_R") });

  },

  slide : function (dir) {
    
    // set diretion-based vars
    var class_for_current = dir == "_R" ? 'prev' : 'next';
    var class_for_target = dir == "_R" ? 'next' : 'prev';

    // anim out current
    var current_slide = this.slide_current_obj;
    current_slide.className += ' ' + class_for_current;
    current_slide.className = current_slide.className.replace(/(^| )active/,"");
    setTimeout(function(){
      current_slide.className = current_slide.className.replace(new RegExp('(^| )'+class_for_current,'g'),"")
    },510);

    // update index
    if(dir == "_R"){
      if(this.slide_index == this.slide_length - 1){
        this.slide_index = 0;
      } else {
        this.slide_index += 1;
      }
    } else {      
      if(this.slide_index == 0){
        this.slide_index = this.slide_length - 1;
      } else {
        this.slide_index -= 1;
      }
    }

    // anim in next
    var target_slide = this.obj.querySelector(".carousel-item[data-slide-index='"+this.slide_index+"']");
    target_slide.className += ' ' + class_for_target;
    target_slide.className += ' active';
    setTimeout(function(){
      target_slide.className = target_slide.className.replace(new RegExp('(^| )'+class_for_target,'g'),"");
    },510);

    // update current slide
    this.slide_current_obj = this.obj.querySelector(".carousel-item[data-slide-index='"+this.slide_index+"']");

  },

}

var foo;

function main () {
  foo = new Carousel(".carousel-main--1");
}