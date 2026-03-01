package Task16;

import java.util.Scanner;

public class Exception3 {
    public static void exceptionDemo() {
        try {
            Scanner myScanner = new Scanner(System.in);
            System.out.println("Enter an integer ");
            String intString = myScanner.next();
            int i = Integer.parseInt(intString);
            System.out.println(2 / i);
        } catch (Exception e) {
            System.err.println("error");
        }
    }
    public static void main(String[] args){
        exceptionDemo();
    }
}
