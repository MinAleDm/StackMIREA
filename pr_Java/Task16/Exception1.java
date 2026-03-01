package Task16;

public class Exception1 {
    public static void exceptionDemo(){
        System.out.println(2/0);
    }
    public static void exceptionDemo1(){
        System.out.println(2.0/0.0);
    }
    public static void exceptionDemo2(){
        try {
            System.out.println(2/0);
        }catch (ArithmeticException e){
            System.out.println("Attempted division by zero");
        }
    }
        public static void main(String[] args){
            exceptionDemo1();
            exceptionDemo2();
            exceptionDemo();
        }
    }

