package Task6;

public class Haski extends Dog{
    public Haski(String name, int year) {
        super(name, year);
    }

    @Override
    public String toString() {
        return "Haski{" +
                "name='" + name + '\'' +
                ", year=" + year +
                '}';
    }
}
