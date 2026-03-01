package Task6;

public class TestDish {
    public static void main(String[] args) {
        Dish d = new Cup("red", true, 4, 5);
        Dish d1 = new Dish("black", false);
        Dish d2 = new Pan("white", false, 78, 56);
        Dish d3 = new Plate("blue", true, "Boorg", 32);
        System.out.println(d);
        System.out.println(d1);
        System.out.println(d2);
        System.out.println(d3);
    }
}
