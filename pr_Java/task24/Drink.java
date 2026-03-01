package task24;

import Task23.Item;

final class Drink extends MenuItem implements AlcohoTable {
    private double alcoholVol;
    private DrinkTypeEnum type;
    private int coast;
    private String name;
    private String description;

    public DrinkTypeEnum getType() {
        return type;
    }
    Drink(String name,String description){
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
    Drink(int coast,String name,String description){
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
    Drink(int coast,String name,String description, int alcoholVol,DrinkTypeEnum type){
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
            this.alcoholVol = alcoholVol;
            this.type = type;
        }
    }

    @Override
    public boolean isAlcoholicDrink() {
        return false;
    }

    @Override
    public double getAlcoholVol() {
        return 0;
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
