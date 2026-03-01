package Task6;

public class Bylidog extends Dog {
    public Bylidog(String name, int year) {
        super(name, year);
    }

    @Override
    public String toString() {
        return "Bylidog{" +
                "name='" + name + '\'' +
                ", year=" + year +
                '}';
    }
}
