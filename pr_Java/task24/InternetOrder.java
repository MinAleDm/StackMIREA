package task24;

import java.util.HashMap;
import java.util.List;

public class InternetOrder implements Order{
    private int size;
    private ListNode head;
    private ListNode tail;
    class ListNode{
        private ListNode next;
        private ListNode prev;
        private MenuItem value;
        ListNode(MenuItem value){
            this.next = null;
            this.prev = null;
            this.value = value;
        }

    }
    InternetOrder(int size){
        this.tail = null;
        this.head = null;
        this.size = size;
    }
    @Override
    public boolean add(MenuItem item) {
        ListNode node = new ListNode(item);
        if(head == null){
            head = node;
            tail = node;
            return true;
        }else{
            node.next = head;
            head.prev = node;
            head = node;
            return true;
        }
    }
    @Override
    public String[] itemsNames() {
        String str[] = new String[size];
        ListNode temp = head;
        int i = 0;
        while (temp != null & i < size){
            str[i] = temp.value.getName();
            i++;
            temp = temp.next;
        }
        return str;
    }
    @Override
    public int itemsQuantity() {
        ListNode temp = head;
        int count = 0;
        while (temp != null){
            count++;
            temp = temp.next;
        }
        return count;
    }
    @Override
    public int itemsQuantity(String itemName) {
        ListNode temp = head;
        int count = 0;
        while (temp != null){
            if(temp.value.getName().equals(itemName)) {
                count++;
            }
            temp = temp.next;
        }
        return count;
    }

    @Override
    public int itemsQuantity(MenuItem itemName) {
        ListNode temp = head;
        int count = 0;
        while (temp != null){
            if(temp.value.equals(itemName)) {
                count++;
            }
            temp = temp.next;
        }
        return count;
    }

    @Override
    public Order[] getOrders() {
        return orderManager.values().toArray(new Order[0]);
    }

    @Override
    public int ordersCostSummary() {
        int sum = 0;
        ListNode temp = head;
        while (temp != null){
            sum += temp.value.getCost();
            temp = temp.next;
        }
        return sum;
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
        if (head == null){
            return false;
        }
        if (head == tail && head.value.equals(item)){
            head = null;
            tail = null;
            return true;
        }
        ListNode temp = head;
        while (temp != null & temp.value.equals(item)){
            temp = temp.next;
        }
        temp.prev.next = temp.next;
        temp.next.prev = temp.prev;
        temp.prev = null;
        temp.next = null;
        return true;
    }

    @Override
    public int removeAll(String itemName) {
        if (head == null){
            return 0;
        }
        if (head == tail & head.value.getName().equals(itemName)){
            head = null;
            tail = null;
            return 1;
        }
        int count = 0;
        ListNode temp = head;
        while (temp != null){
            if(temp.value.getName().equals(itemName)){
                count++;
                temp.prev.next = temp.next;
                temp.next.prev = temp.prev;
                temp.prev = null;
                temp.next = null;
            }
            temp = temp.next;
        }
        return count;
    }

    @Override
    public int removeAll(MenuItem item) {
        if (head == null){
            return 0;
        }
        if (head == tail & head.value.equals(item)){
            head = null;
            tail = null;
            return 1;
        }
        int count = 0;
        ListNode temp = head;
        while (temp != null){
            if(temp.value.equals(item)){
                count++;
                temp.prev.next = temp.next;
                temp.next.prev = temp.prev;
                temp.prev = null;
                temp.next = null;
            }
            temp = temp.next;
        }
        return count;
    }

    @Override
    public boolean remove(String itemName) {
        if (head == null){
            return false;
        }
        if (head == tail && head.value.getName().equals(itemName)){
            head = null;
            tail = null;
            return true;
        }
        ListNode temp = head;
        while (temp != null & temp.value.getName().equals(itemName)){
            temp = temp.next;
        }
        temp.prev.next = temp.next;
        temp.next.prev = temp.prev;
        temp.prev = null;
        temp.next = null;
        return true;
    }


    @Override
    public int costTotal() {
        orderManager.values().stream().filter(value -> orderManager.containsValue(value)).toList();
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
}
