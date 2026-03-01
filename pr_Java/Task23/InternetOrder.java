package Task23;

import java.util.ArrayList;
import java.util.List;

public class InternetOrder {
    private Order[] orders;
    public Order getOrder(String name){
        return new Order(1);
    }
    public void addDish(Dish dish,String name){
        return;
    }
    public boolean removeOrder(String name){
        return true;
    }
    public int freeTableNumber(){
        return 0;
    }
    public int[] freeTableNumbers(){
        return new int[]{};
    }
    public Order[] getOrders(){
        return new Order[]{};
    }
    public double orderCoastSummary(){
        return 0.0;
    }
    public int dishQuantity(String dishName){
        return 0;
    }
}
