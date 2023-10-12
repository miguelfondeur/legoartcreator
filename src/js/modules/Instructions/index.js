//Consolodate
this.circles.forEach((circle, i) => {
    let fill = this.circles[i].fill;
    this.uniqueColors.push( `rgb( ${fill} )`); 
});

this.uniqueColors =  [...new Set(this.uniqueColors)];