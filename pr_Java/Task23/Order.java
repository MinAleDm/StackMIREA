package Task23;


import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class Order  {
    private List<Item> items;
    private int size;
    private Dish[] dishes;
    Order(int size){
        this.items = new ArrayList<>();
    }
    public boolean add(Dish dish){
        return items.add(dish);
    }
    public boolean remove(String Name){
        for(int i = 0; i < items.size();i++){
            if(items.get(i).getName().equals(Name)){
                items.remove(i);
                return true;
            }
        }
        return false;
    }
    public int removaAll(String Name){
        int count = 0;
        for (int i = 0; i < items.size();i++){
            Item temp = items.get(i);
            if (temp.getName().equals(Name)){
                count++;
                items.remove(i);
            }
        }
        return count;
    }
    public int dishQuantity(){
        return items.size();
    }
    public int dishQuantity(String Name){
        return (int) items.stream().filter(n->n.getName().equals(Name)).count();
    }

    public Dish[] getDishes() {
        return items.toArray(new Dish[0]);
    }
    public double costTotal(){
        return items.stream().mapToDouble(Item::getCoast).sum();
    }
    public String[] dishesName(){
        return new String[]{items.stream().filter(n -> n.getName() != "").toArray().toString()};
    }
    public Dish[] sortedDishesByCostDesc(){
        return  items.stream().sorted(Comparator.comparingInt(Item::getCoast)).toList().toArray(new Dish[0]);
    }
}
