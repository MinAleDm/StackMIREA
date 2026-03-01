package Task16;

import java.util.Scanner;

public class Exception4 {
    public static void exceptionDemo(){
        try {
            Scanner myScanner = new Scanner(System.in);
            System.out.println("Enter an integer ");
            String intString = myScanner.next();
            int i = Integer.parseInt(intString);
            System.out.println(2/i);
        }catch (NumberFormatException e){
            System.out.println("error");
        }finally {
            System.out.println("Проверка работы блока finally");
        }
    }
    public static void main(String[] args){
        exceptionDemo();
    }
}
