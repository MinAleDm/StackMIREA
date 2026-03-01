package Task9;

import java.awt.print.Printable;

public class Dishes implements Priceable{
    double price;
    public Dishes(double price){
        this.price = price;
    }
    @Override
    public void getPrice() {
        System.out.printf("Цена = %s", price);
        //return price;
    }
    public static void main(String[] args){
        Priceable p = new Dishes(12345);
        //System.out.println(p);
        p.getPrice();
    }
}
