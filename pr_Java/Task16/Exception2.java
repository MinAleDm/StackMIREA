package Task16;

import java.util.Scanner;

public class Exception2 {
    public static void exceptionDemo1(){
        Scanner myScanner = new Scanner(System.in);
        System.out.println("Enter an integer ");
        String intString = myScanner.next();
        int i = Integer.parseInt(intString);
        System.out.println(2/i);
    }
    public static void exceptionDemo(){
        try {
            Scanner myScanner = new Scanner(System.in);
            System.out.println("Enter an integer ");
            String intString = myScanner.next();
            int i = Integer.parseInt(intString);
            System.out.println(2/i);
        }catch (NumberFormatException e){
            System.out.println("error");
        }
    }
    public static void main(String[] args){
        exceptionDemo();
        exceptionDemo1();
    }
}
