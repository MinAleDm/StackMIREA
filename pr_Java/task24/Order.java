    package task24;

    public interface Order extends OrdersManager{
        public boolean add(MenuItem item);
        public String[] itemsNames();
        public int itemsQuantity();
        public int itemsQuantity(String itemName);
        public int itemsQuantity(MenuItem itemName);
        public MenuItem[] getItems();
        public boolean remove(MenuItem item);
        public int removeAll(String itemName);
        public int removeAll(MenuItem item);
        public boolean remove(String itemName);

        public int costTotal();
        public Customer getCustomer();
        public Customer setCustomer(Customer customer);

    }
