package Task18;

public class MinMax <T extends Comparable<T>>{
    private T[] array;

    public MinMax(T[] array) {
        this.array = array;
    }
    public T min(){
        T min = array[0];
        for(int i=0; i<array.length;i++){
            if(array[i].compareTo(min) < 0){
                min = array[i];
            }
        }
        return min;
    }
    public T max(){
        T max = array[0];
        for(int i=0;i<array.length;i++){
            if(array[i].compareTo(max)>0){
                max=array[i];
            }
        }
        return max;
    }
    public static void main(String[] args){
        MinMax<Integer> m = new MinMax<>(new Integer[] {5, 2, 3, 4, 5,10});
        System.out.println("min: "+m.min());
        System.out.println("max: "+m.max());
    }
}
