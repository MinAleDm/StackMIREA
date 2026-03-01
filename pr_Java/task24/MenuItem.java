package task24;

import java.util.*;
import java.util.stream.Collectors;

public class MenuItem implements Order{
    private int cost;
    private String name;
    private String description;

    public  int getCost(){
        return cost;
    }

    public String getName(){
        return name;
    }

    public String getDescription(){
        return description;
    }

    @Override
    public boolean add(MenuItem item) {
        orderManager.put(item.getName(),item);
        return true;
    }

    @Override
    public String[] itemsNames() {
        return orderManager.keySet().stream().filter(key -> orderManager.get(key) != null).toArray(String[]::new);
    }

    @Override
    public int itemsQuantity() {
        return orderManager.keySet().size();
    }

    @Override
    public int itemsQuantity(String itemName) {
        return (int) orderManager.keySet().stream().filter(key -> key.equals(itemName)).count();
    }

    @Override
    public int itemsQuantity(MenuItem itemName) {
        int count = 0;
        for (Map.Entry<String, Order> entry : orderManager.entrySet()) {
            Order order = entry.getValue();
            if (order.equals(itemName)) {
                count++;
            }
        }
        return count;
    }


    @Override
    public Order[] getOrders() {
        return orderManager.values().toArray(new Order[0]);
    }

    @Override
    public int ordersCostSummary() {
        return 0;
    }

    @Override
    public int ordersQuantity() {
        return orderManager.size();
    }

    @Override
    public MenuItem[] getItems() {
        return orderManager.values().toArray(new MenuItem[0]);
    }

    @Override
    public boolean remove(MenuItem item) {
        return orderManager.remove(item.getName(),item);
    }

    @Override
    public int removeAll(String itemName) {
        int initialSize = orderManager.size(); // Запоминаем начальный размер HashMap
        orderManager.entrySet().removeIf(entry -> entry.getKey().equals(itemName));
        int countDel = initialSize - orderManager.size(); // Вычисляем количество удаленных элементов
        return countDel;
    }


    @Override
    public int removeAll(MenuItem item) {
        int count = 0;
        for(int i = 0 ; i < orderManager.size();i++){
            if(orderManager.remove(item.name,item)) {
                count++;
            }
        }
        return count;
    }

    @Override
    public boolean remove(String itemName) {
        return orderManager.remove(itemName) != null;
    }
    @Override
    public int costTotal() {
        return 0;
    }

    @Override
    public Customer getCustomer() {
        return null;
    }

    @Override
    public Customer setCustomer(Customer customer) {
        return null;
    }
    @Override
    public String toString() {
        return "cost = " + cost + ", name = " + name + ", description = " + description;
    }
    public String prints(){
        return orderManager.toString();
    }
}
