package task24;

import Task23.Item;

import java.util.Comparator;
import java.util.Scanner;

public final class Dish extends MenuItem {
    private int coast;
    private String name;
    private String description;
    Dish(String name,String description){
        super();
        if (name.isEmpty()){
            throw new IllegalArgumentException("Название блюда должно быть не пустым");
        }
        else if (description.isEmpty()){
            throw new IllegalArgumentException("Описание должно быть не пустым");

        }else {
            this.coast = 0;
            this.name = name;
            this.description = description;
        }
    }
    Dish(int coast,String name,String description){
        super();
        if (name.isEmpty()){
            throw new IllegalArgumentException("Название блюда должно быть не пустым");
        }
        else if (description.isEmpty()){
            throw new IllegalArgumentException("Описание должно быть не пустым");

        }
        else if ( coast < 0){
            throw new IllegalArgumentException("Стоимость должны быть больше 0");

        }else {
            this.coast = coast;
            this.name = name;
            this.description = description;
        }
    }
    public Dish(double cost, Scanner name, Scanner opis) {
        super();
    }

    @Override
    public int getCost() {
        return coast;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getDescription() {
        return description;
    }

}
