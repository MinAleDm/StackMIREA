package Task21;

public class ArrayQueue {
    int SIZE = 5;
    int[] arr;
    int front, rear;
    int count;

    public ArrayQueue(){
        arr = new int[SIZE];
        front=rear=-1;
        count = 0;
    }
    public void enqueue(int element){
        if(count==SIZE){
            throw new IllegalStateException("Переполнение массива");
        }
        if(isEmpty()){
            front=rear=0;
        }else{
            rear=(rear+1)%SIZE;
        }
        arr[rear] = element;
        count++;
    }
    public int element(){
        if (isEmpty()) {
            throw new IllegalStateException("Queue is empty");
        }
        return arr[front];
    }

    public int dequeue() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue is empty");
        }
        int value = arr[front];
        if (front == rear) {
            front = rear = -1;
        } else {
            front = (front + 1) % SIZE;
        }

        count--;
        return value;
    }

    public int size() {
        return count;
    }
    public void clear() {
        front = rear = -1;
        count = 0;
    }
    public boolean isEmpty(){
        if (front==-1){
            return true;
        }else {
            return false;
        }
    }
}
