package Task10;

import java.util.Scanner;

public class Recursion12 {
    public static void Recurs(){
        Scanner s = new Scanner(System.in);
        int n = s.nextInt();
        if (n>0){
            if (n % 2  == 1){
                System.out.println(n);
                Recurs();
            }
            else{
                Recurs();
            }
        }
    }
    public static void main(String[] args){
        Recurs();
    }
}
