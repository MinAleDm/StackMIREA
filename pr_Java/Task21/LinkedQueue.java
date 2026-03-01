package Task21;


import java.util.LinkedList;

public class LinkedQueue extends AbstractQueue implements Queue {
   private LinkedList<Object> queue;
    public LinkedQueue(){
        queue=new LinkedList<>();
        front=0;
        rear=0;
    }
    @Override
    public void enqueue(Object o) {
        queue.add(o);
        rear++;
    }

    @Override
    public Object element() {
        if(isEmpty())throw new IndexOutOfBoundsException("Массив пуст!!");
        return queue.get(front);
    }
    @Override
    public Object dequeue() {
        if (isEmpty()) throw new IndexOutOfBoundsException("Массив пуст!!");
        System.out.println(front+" "+rear);
        return queue.remove(front);
    }

    @Override
    public boolean isEmpty() {
        return queue.isEmpty();
    }

    @Override
    public boolean clear() {
        queue.clear();
        front=0;
        rear=0;
        return false;
    }
}
