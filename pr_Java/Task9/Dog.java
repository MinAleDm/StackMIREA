package Task9;

public class Dog implements Nameable{
    String name;

    public Dog(String name) {
        this.name = name;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return "Dog  = " + name;
    }

}
