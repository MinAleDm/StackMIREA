package Task10;

import java.util.Scanner;

public class Recursion13 {
    public static void Recurs(){
        Scanner s = new Scanner(System.in);
        int n = s.nextInt();
        if (n >0){
            System.out.println(n);
            int m = s.nextInt();
            if (m>0){
                Recurs();
            }
        }
    }
    public static void main(String[] args){
        Recurs();
    }
}
