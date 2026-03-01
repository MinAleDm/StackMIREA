package Task6;

public class Chair extends Furniture{
    public String nameMaterial;
    public Chair(double h, double w, double l, String Name, String material, String nameMaterial) {
        super(h, w, l, Name, material);
        this.nameMaterial = nameMaterial;
    }

    public String getNameMaterial() {
        return nameMaterial;
    }

    public void setNameMaterial(String nameMaterial) {
        this.nameMaterial = nameMaterial;
    }

    @Override
    public String toString() {
        return "Chair{" +
                "nameMaterial='" + nameMaterial + '\'' +
                ", h=" + h +
                ", w=" + w +
                ", l=" + l +
                ", Name='" + Name + '\'' +
                ", material='" + material + '\'' +
                '}';
    }
}
