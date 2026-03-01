package Task5;
public class Rectangle extends Shape{
    protected double width;
    protected double length;
    public Rectangle(){
        this.width = 6;
        this.length = 5;
        this.color = "red";
        this.filled = false;
    }
    public Rectangle(double width, double length){
        this.width = width;
        this.length = length;
        this.color = "red";
        this.filled = false;
    }
    public Rectangle(double width, double length, String color, boolean filled){
        this.width = width;
        this.length = length;
        this.color = color;
        this.filled = filled;
    }
    public double getWidth(){
        return width;
    }
    public double getLength(){
        return length;
    }
    public void setWidth(double width){
        this.width = width;
    }
    public void setLength(double length){
        this.length = length;
    }
    @Override
    public double getArea() {
        return width*length;
    }
    @Override
    public double getPerimeter() {
        return 2*(width+length);
    }
    @Override
    public String toString() {
        return "Shape: rectangle width: "+this.width+", color: "+this.color+" Plosh "+getArea();
    }
}
