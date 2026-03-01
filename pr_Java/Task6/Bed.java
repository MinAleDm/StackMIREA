package Task6;

public class Bed extends Furniture{
    private int count, maxw;
    private String NameMatras;
    public Bed(double h, double w, double l, String Name, String material, int count, int maxw, String NameMatras) {
        super(h, w, l, Name, material);
        this.count = count;
        this.maxw = maxw;
        this.NameMatras = NameMatras;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public int getMaxw() {
        return maxw;
    }

    public void setMaxw(int maxw) {
        this.maxw = maxw;
    }

    public String getNameMatras() {
        return NameMatras;
    }

    public void setNameMatras(String nameMatras) {
        NameMatras = nameMatras;
    }

    @Override
    public String toString() {
        return "Bed{" +
                "count=" + count +
                ", maxw=" + maxw +
                ", NameMatras='" + NameMatras + '\'' +
                ", h=" + h +
                ", w=" + w +
                ", l=" + l +
                ", Name='" + Name + '\'' +
                ", material='" + material + '\'' +
                '}';
    }
}
