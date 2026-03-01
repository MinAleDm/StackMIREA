package Task18;

public class Calculator<T extends Number, V extends Number> {
    private T a;
    private V b;

    public Calculator(T a, V b) {
        this.a=a;
        this.b=b;
    }

    public double sum(){
        return a.doubleValue()+b.doubleValue();
    }
    public double multiply(){
        return a.doubleValue()*b.doubleValue();
    }
    public double divide(){
        return a.doubleValue()-b.doubleValue();
    }
    public double subtraction(){

            return a.doubleValue() / b.doubleValue();

    }
    public static void main(String[] args){
        Calculator<Integer, Integer> r = new Calculator<>(1, 0);
        System.out.println("Сумма: "+r.sum());
        System.out.println("Вычитание: " + r.divide());
        System.out.println("Умножение: " +r.multiply());
        System.out.println("Деление: " + r.subtraction());
    }
}
