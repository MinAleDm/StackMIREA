package Task21;

public class ArrayQueueADT {
    public ArrayQueueADT(ArrayQueueModule queue){
        this.queue = queue;
    }
    private ArrayQueueModule queue;
    public void enqueue(int elemen) {
        queue.enqueue(elemen);
    }
    public int element(){
        return queue.element();
    }
    public int dequeue(){
        return queue.dequeue();
    }
    public int size(){
        return queue.size();
    }
    public void clear(){
        queue.clear();
    }
    public boolean isEmpty(){
        return queue.isEmpty();
    }
}
