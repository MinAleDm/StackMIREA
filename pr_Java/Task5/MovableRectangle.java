package Task5;

public class MovableRectangle implements Movable{
    MovablePoint topLeft;
    MovablePoint bottomRight;
    public MovableRectangle(int x1, int y1, int x2, int y2, int xSpeed, int ySpeed){
        this.topLeft = new MovablePoint(x1, y1, xSpeed, ySpeed);
        this.bottomRight = new MovablePoint(x2, y2, xSpeed, ySpeed);
    }
    public void proverkX(){
        if (this.topLeft.xSpeed != this.bottomRight.xSpeed){
            MovablePoint terx;
            if(this.topLeft.xSpeed > this.bottomRight.xSpeed){
                terx = this.topLeft;
                terx.xSpeed -= this.bottomRight.xSpeed;
                this.topLeft.xSpeed = this.bottomRight.xSpeed;
            }else{
                terx = this.bottomRight;
                terx.xSpeed -= this.topLeft.xSpeed;
                this.bottomRight.xSpeed = this.topLeft.xSpeed;
            }
        }
    }
    public void proverkY(){
        if (this.topLeft.ySpeed != this.bottomRight.ySpeed){
            MovablePoint tery;
            if(this.topLeft.ySpeed > this.bottomRight.ySpeed){
                tery = this.topLeft;
                tery.ySpeed -= this.bottomRight.ySpeed;
                this.topLeft.ySpeed = this.bottomRight.ySpeed;
            }else{
                tery = this.bottomRight;
                tery.ySpeed -= this.topLeft.ySpeed;
                this.bottomRight.ySpeed = this.topLeft.ySpeed;
            }
        }
    }
    @Override
    public String toString() {
        return "MovableRectangle{" +
                "topLeft=" + topLeft +
                ", bottomRight=" + bottomRight +
                '}';
    }
    @Override
    public void moveUp() {
        this.proverkY();
        MovablePoint rety = this.topLeft;
        rety.y += this.topLeft.ySpeed;
        rety = this.bottomRight;
        rety.y += this.bottomRight.ySpeed;
    }
    @Override
    public void moveDown() {
        this.proverkY();
        MovablePoint rety = this.topLeft;
        rety.y -= this.topLeft.ySpeed;
        rety = this.bottomRight;
        rety.y -= this.bottomRight.ySpeed;
    }
    @Override
    public void moveLeft() {
        this.proverkX();
        MovablePoint retX = this.topLeft;
        retX.x -= this.topLeft.xSpeed;
        retX = this.bottomRight;
        retX.x -= this.bottomRight.xSpeed;
    }

    @Override
    public void moveRight() {
        this.proverkX();
        MovablePoint retX = this.topLeft;
        retX.x += this.topLeft.xSpeed;
        retX = this.bottomRight;
        retX.x += this.bottomRight.xSpeed;
    }
}
