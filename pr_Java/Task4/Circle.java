package Task4;

public class Circle {
    private double radius;
    private float diametr;
    public Circle(double radius, float diametr) {
        this.radius = radius;
        this.diametr = diametr;
    }
    public double getRadius() {
        return radius;
    }
    public void setRadius(double r) {
        this.radius = r;
    }

    public float getDiametr() {
        return diametr;
    }

    public void setDiametr(float d) {
        this.diametr = d;
    }

}
