package Task21;

public interface Queue {
    void enqueue(Object o);
    Object element();
    Object dequeue();
    boolean isEmpty();
    boolean clear();
}
