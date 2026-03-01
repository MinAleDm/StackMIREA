package Task5;
public class Square extends Rectangle {
    public Square(){
        this.filled = false;
        this.color = "red";
        this.width = 1;
    }
    public Square(double side){
        this.filled = false;
        this.color = "red";
        this.width = side;
    }
    public Square(double side, String color, boolean filled){
        this.width = side;
        this.filled = filled;
        this.color = color;
    }
    public double getSide(){
        return width;
    }
    public void setSide(double side){
        this.width = side;
    }
    @Override
    public double getArea() {
        return width*width;
    }
    @Override
    public double getPerimeter() {
        return 4*width;
    }
    @Override
    public String toString() {
        return "Shape: rectangle width: "+this.width+", color: "+this.color+" Plosh "+getArea();
    }
}
