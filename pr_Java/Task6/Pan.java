package Task6;

public class Pan extends Dish{
    protected double r;
    protected double h;
    public Pan (String color, boolean filled, double r, double h) {
        super(color, filled);
        this.r = r;
        this.h = h;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public double getH() {
        return h;
    }

    public void setH(double h) {
        this.h = h;
    }

    @Override
    public String toString() {
        return "Pan{" +
                "r=" + r +
                ", h=" + h +
                ", color='" + color + '\'' +
                ", filled=" + filled +
                '}';
    }
    /*
    @Override
    public double Radus() {
        return 2;
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
