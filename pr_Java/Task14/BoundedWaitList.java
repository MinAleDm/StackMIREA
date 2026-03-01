package Task14;

public class BoundedWaitList<E> extends WaitList<E>{
    private int capacity;
    public  BoundedWaitList(int capacity){
        if (capacity>0)
            this.capacity = capacity;
        else
            System.out.println("Очередь должна состоять больше чем из 0 элементов");
    }
    public int getCapacity() {
        return capacity;
    }
    public void add(E element){
        if(capacity > content.size())
            content.add(element);
        else
            System.out.println("Очередь переполнена");
    }

    @Override
    public String toString() {
        return "BoundedWaitList - " + content;
    }
}
