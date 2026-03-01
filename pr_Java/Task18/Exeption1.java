package Task18;

public class Exeption1<T extends String, V extends Animal, K extends Integer>{
    private T v1;
    private  V v2;
    private  K v3;

    public Exeption1(T v1, V v2, K v3) {
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
    }

    public T getV1() {
        return v1;
    }

    public void setV1(T v1) {
        this.v1 = v1;
    }

    public V getV2() {
        return v2;
    }

    public void setV2(V v2) {
        this.v2 = v2;
    }

    public K getV3() {
        return v3;
    }

    public void setV3(K v3) {
        this.v3 = v3;
    }

    @Override
    public String toString() {
        return "{" + v1 +" (" + v1.getClass() +")"+ '\n' +
                v2 + " ("+v2.getClass() +")" +'\n'+
                v3+" (" + v3.getClass() +")"+
                '}';
    }
    public static void main(String[] args){
        Exeption1<String, Animal, Integer> t = new Exeption1<>("Test", new Animal(), 5);
        System.out.println(t.toString());
    }
}
