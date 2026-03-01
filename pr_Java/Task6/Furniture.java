package Task6;

public abstract class Furniture {
    public double h, w, l;
    public String Name, material;

    public Furniture(double h, double w, double l, String Name, String material) {
        this.h = h;
        this.w = w;
        this.l = l;
        this.Name = Name;
        this.material = material;
    }
    public double getH() {
        return h;
    }
    public void setH(double h) {
        this.h = h;
    }
    public double getW() {
        return w;
    }
    public void setW(double w) {
        this.w = w;
    }
    public double getL() {
        return l;
    }
    public void setL(double l) {
        this.l = l;
    }
    public String getName() {
        return Name;
    }
    public void setName(String Name) {
        this.Name = Name;
    }
    public String getMaterial() {
        return material;
    }
    public void setMaterial(String material) {
        this.material = material;
    }
    @Override
    public String toString() {
        return "Furniture{" + "h=" + h + ", w=" + w + ", l=" + l + ", name='" + Name + '\'' + ", material='" + material + '\'' + '}';
    }
}
