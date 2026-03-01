package Task6;

public class Plate extends Dish{
    protected String name;
    protected double r;
    public Plate(String color, boolean filled, String name, double r) {
        super(color, filled);
        this.name = name;
        this.r = r;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    @Override
    public String toString() {
        return "Plate{" +
                "name='" + name + '\'' +
                ", r=" + r +
                ", color='" + color + '\'' +
                ", filled=" + filled +
                '}';
    }
    /*
    @Override
    public double Radus() {
        return 0;
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
