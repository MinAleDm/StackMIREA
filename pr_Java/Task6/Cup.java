package Task6;

public class Cup extends Dish{
    protected double h;
    protected double r;
    public Cup(String color, boolean filled, double h, double r) {
        super(color, filled);
        this.r = r;
        this.h = h;
    }
    public double getH() {
        return h;
    }
    public void setH(double h) {
        this.h = h;
    }
    public double getR() {
        return r;
    }
    public void setR(double r) {
        this.r = r;
    }

    @Override
    public String toString() {
        return "Chahca{" +
                "h=" + h +
                ", r=" + r +
                ", color='" + color + '\'' +
                ", filled=" + filled +
                '}';
    }
    /*
    @Override
    public double Radus() {
        return 2*r;
    }
    @Override
    public double Diametr() {
        return 0;
    }

    @Override
    public double Scovoroda() {
        return 0;
    }

 */
}
