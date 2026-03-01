package Task21;

public class TestArray {
    public static void main(String[] args) {
        ArrayQueueModule m = new ArrayQueueModule();
       // b.dequeue();
        m.enqueue(1);
        m.enqueue(2);
        m.enqueue(3);
        m.enqueue(1);
        m.enqueue(2);
        System.out.println(m.size());
        System.out.println(m.element());
        System.out.println(m.dequeue());
        System.out.println(m.isEmpty());
        ArrayQueueADT a = new ArrayQueueADT(m);
        System.out.println(a.size());
        System.out.println(a.element());
        System.out.println(a.dequeue());
        System.out.println(a.isEmpty());
        ArrayQueue q = new ArrayQueue();
        q.enqueue(1);
        q.enqueue(2);
        q.enqueue(3);
        q.enqueue(1);
        q.enqueue(2);
        System.out.println(q.size());
        System.out.println(q.element());
        System.out.println(q.dequeue());
        System.out.println(q.isEmpty());
    }
}
