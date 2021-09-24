class Square {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.isInside = false;
    }
  
    show() {
        stroke(255,255,255);
        strokeWeight(4);

        if (this.isInside) {
            fill(random(), random(), random());
        }
        else {
            fill(0, 0, 0);
        }
        rect(this.x, this.y, this.size, this.size);
    }
  
    checkIfInside(positionX, positionY) {
      if (positionX >= this.x - this.size / 2 && positionX <= this.x + this.size /  2 &&
        positionY >= this.y - this.size / 2 && positionY <= this.y + this.size /  2) 
        {
            this.isInside = true;
      } 
      else this.isInside = false;
    }
  }