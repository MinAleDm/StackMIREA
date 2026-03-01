package task24;

import java.util.Arrays;
import java.util.Scanner;

import static task24.DrinkTypeEnum.Proverc;

public class Test {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        Scanner r = new Scanner(System.in);
        Scanner w = new Scanner(System.in);
        MenuItem menuItem = new MenuItem();
        double cost;
        boolean bool = true;
        String name, opis;
        Scanner nomder = new Scanner(System.in);
        System.out.println("Ввелитед 1 если вы делаете заказ в ресторане:\n" +
                "Введите 2 если делаете заказ на сайте:\n" +
                "Введите 3 если хотите популярные блюда ресторана:");
        switch (nomder.nextInt()) {
            case 1:
                while (bool) {
                    System.out.println("Что хотите добавить в заказ \n1 если еду: \n2 если напиток:");
                    switch (nomder.nextInt()) {
                        case 1:
                            System.out.println("Введите название товара: ");
                            name = r.nextLine();
                            System.out.println("Введите цену товара: ");
                            cost = s.nextDouble();
                            System.out.println("Введите описание товара: ");
                            opis = w.nextLine();
                            Dish d = new Dish((int) cost, name, opis);
                            menuItem.add(d);
                            System.out.println("Ввелите 1 если вы хотите заказать еще или 0 если вы закончили с заказом");
                            if (nomder.nextInt() == 1){
                                bool = true;
                                break;
                            }else {
                                bool=false;
                                break;
                            }
                        case 2:
                            System.out.println("Введите название напитка: ");
                            name = r.nextLine();
                            System.out.println("Введите цену напитка: ");
                            cost = s.nextDouble();
                            System.out.println("Введите описание напитка если он алкагольный введите AL: ");
                            opis = w.nextLine();
                            Drink dr = new Drink((int) cost, name, opis);
                            menuItem.add(dr);
                            System.out.println(Proverc(opis));
                            System.out.println("Ввелите 1 если вы хотите заказать еще или 0 если вы закончили с заказом");
                            if (nomder.nextInt() == 1){
                                bool = true;
                                break;
                            }else {
                                bool=false;
                                break;
                            }
                    }
                }
                break;
            case 2:
                while (bool) {
                    System.out.println("Что хотите добавить в заказ \n1 если еду: \n2 если напиток:");
                    switch (nomder.nextInt()) {
                        case 1:
                            System.out.println("Введите название товара: ");
                            name = r.nextLine();
                            System.out.println("Введите цену товара: ");
                            cost = s.nextDouble();
                            System.out.println("Введите описание товара: ");
                            opis = w.nextLine();
                            Dish d = new Dish((int) cost, name, opis);
                            menuItem.add(d);
                            System.out.println("Ввелите 1 если вы хотите заказать еще или 0 если вы закончили с заказом");
                            if (nomder.nextInt() == 1){
                                bool = true;
                                break;
                            }else {
                                bool=false;
                                break;
                            }
                        case 2:
                            System.out.println("Введите название напитка: ");
                            name = r.nextLine();
                            System.out.println("Введите цену напитка: ");
                            cost = s.nextDouble();
                            System.out.println("Введите описание напитка если он алкагольный введите AL: ");
                            opis = w.nextLine();
                            Drink dr = new Drink((int) cost, name, opis);
                            menuItem.add(dr);
                            System.out.println(Proverc(opis));
                            System.out.println("Ввелите 1 если вы хотите заказать еще или 0 если вы закончили с заказом");
                            if (nomder.nextInt() == 1){
                                bool = true;
                                break;
                            }else {
                                bool=false;
                                break;
                            }
                    }
                }
                break;
            case 3:
                Dish dishOne = new Dish(10,"Название№1","Описание№1");
                Dish dishTwo = new Dish(500,"Название№2","Описание№2");
                Dish dishFree = new Dish(1000,"Название№3","Описание№3");
                Drink drink = new Drink(120,"dsd","dsds");
                menuItem.add(dishOne);
                menuItem.add(dishTwo);
                menuItem.add(dishFree);
                menuItem.add(drink);
        }
        System.out.println(Arrays.stream(menuItem.itemsNames()).toList());
    }
}
