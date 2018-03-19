var Model = function Model() {
    this.squaresColors = [];
};
Model.prototype.randomColor = function () {
    var getRandomInt = function () {return Math.floor(Math.random() * 256)};
    return "rgba("+getRandomInt() + ","+getRandomInt() + ","+getRandomInt() + ","+getRandomInt() + ")";
};
Model.prototype.init = function (){
    for (var i=0; i<25; i++){
        this.changeOne(i);
    }
};
Model.prototype.changeOne = function (ChangingSquare){
    var flag = true;
    var x = this.randomColor();
    for (var i=0;i < this.squaresColors.length; i++){
        if (x===this.squaresColors[i]){flag = false}
    }
    if (flag){this.squaresColors[ChangingSquare]= x}
    else {this.changeOne()}
};
Model.prototype.getChange = function (coord) {
    var x = Math.ceil(coord[0]/100)-1;
    var y = Math.ceil(coord[1]/100)-1;
    var changeN = x + y*5;
    this.changeOne(changeN);
};


var View = function View() {};
View.prototype.draw = function (squaresColors) {
    this.paint = document.getElementById("draw");
    this.paint.width = 500;
    this.paint.height = 500;
    var x = this.paint.getContext("2d");
    for (var i = 0; i<5; i++){
        for (var j = 0; j<5; j++){
            x.fillStyle = squaresColors[i*5+j];
            x.fillRect(100*j,100*i,100,100);
        }
    }
};
View.prototype.clickXY = function (event) {
       return [event.offsetX, event.offsetY];
};

var Controller = function Controller(view, model) {
    this.view = view;
    this.model = model;
    this.init();
};

Controller.prototype.init = function () {
    this.drawSquares();
    this.view.paint.addEventListener('click', function (event) {
        this.onClickSquare(event);
    }.bind(this));
};

Controller.prototype.drawSquares = function () {
    this.model.init();
    this.view.draw(this.model.squaresColors);
};

Controller.prototype.onClickSquare = function (event) {
    this.model.getChange(this.view.clickXY(event));
    this.view.draw(this.model.squaresColors);
};

window.onload = function () {
    var view = new View();
    var model = new Model();
    var controller = new Controller(view, model);
};