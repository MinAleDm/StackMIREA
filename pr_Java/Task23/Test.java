package Task23;

import java.util.Arrays;

public class Test {
    public static void main(String[] args) {
        Order order = new Order(5);
        order.add(new Dish(450,"Оливье","Холодное блюдо"));
        order.add(new Dish(300,"Лимонад","Напиток"));
        order.add(new Dish(600,"Рёбра","Горячее блюдо"));
        order.add(new Dish(400,"Борщ","Горячее блюдо"));
        System.out.println(order.remove("Лимонад"));
        System.out.println(order.dishQuantity());
        System.out.println(order.costTotal());
        System.out.println(order.dishQuantity("Борщ"));
        System.out.println(Arrays.stream(order.sortedDishesByCostDesc()).toList().toString());
    }
}
