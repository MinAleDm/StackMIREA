package Task6;

public class Dish {
    String color;
    boolean filled;
    public Dish(String c, boolean f) {
        this.color = c;
        this.filled = f;
    }
    public String getC() {
        return color;
    }
    public void setC(String c) {
        this.color = c;
    }
    public boolean getFilled() {
        return filled;
    }
    public void setFilled(boolean f) {
        this.filled = f;
    }
    @Override
    public String toString() {
        return "Dish{" + "color = " + color + ", r=" + filled + '}';
    }
}
