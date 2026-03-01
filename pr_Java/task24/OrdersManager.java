package task24;

import java.util.HashMap;

interface OrdersManager{
    HashMap<String,Order> orderManager = new HashMap<>();
    public int itemsQuantity(String itemName);
    public int itemsQuantity(MenuItem item);
    public Order[] getOrders();
    public int ordersCostSummary();
    public int ordersQuantity();

}
