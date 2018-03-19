var Model = function Model() {
    this.squaresColors = [];
};
Model.prototype.randomColor = function () {
    var getRandomInt = function () {return Math.floor(Math.random() * 256)};
    return "rgb("+getRandomInt() + ","+getRandomInt() + ","+getRandomInt() + ")";
};
Model.prototype.init = function (){
    for (var i=0; i<25; i++){
        this.changeOne(i);
    }
};
Model.prototype.changeOne = function (ChangingSquare){
    var x = this.randomColor();
    if (this.squaresColors.every(function (item) {
        return x !== item
    })){this.squaresColors[ChangingSquare]= x}
    else {this.changeOne()}
};

var View = function View() {};
View.prototype.init = function (squaresColors) {
    var xmlns = "http://www.w3.org/2000/svg";
    this.paint = document.createElementNS(xmlns, "svg");
    this.paint.setAttributeNS(null, "width", 500);
    this.paint.setAttributeNS(null, "height", 500);
    this.paint.setAttributeNS(null, "viewBox", "0 0 " + 500 + " " + 500);
    var squares = [];
    for (var i=0; i<5; i++){
         for (var j=0; j<5;j++){
             var square = document.createElementNS(xmlns, 'rect');
             this.paint.appendChild(square);
             square.setAttributeNS(null, 'fill', squaresColors[i*5+j]);
             square.setAttributeNS(null, 'x',j*100);
             square.setAttributeNS(null, 'y',i*100);
             square.setAttributeNS(null, 'width','100');
             square.setAttributeNS(null, 'height','100');
             square.setAttributeNS(null, 'id',j+i*5);
             squares.push(square);
             square.addEventListener('click', function(event){
                 this.onClickSquare( event.target.id )
             }.bind(this));
         }
    }
    var x = document.getElementById('conteiner');
        x.appendChild(this.paint)
};

View.prototype.changeOne = function (id, newColor) {
    var x = document.getElementById(id);
    x.setAttributeNS(null, 'fill', newColor);
};

var Controller = function Controller(view, model) {
    this.view = view;
    this.model = model;
    this.init();
};

Controller.prototype.init = function () {
    this.view.onClickSquare = this.getChange.bind(this);
    this.drawSquares();
};

Controller.prototype.drawSquares = function () {
    this.model.init();
    this.view.init(this.model.squaresColors);
};

Controller.prototype.getChange = function (id) {
    this.model.changeOne(id);
    this.view.changeOne(id, this.model.squaresColors[id]);
};

window.onload = function () {
    var view = new View();
    var model = new Model();
    var controller = new Controller(view, model);
};