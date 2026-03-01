package Task10;

import java.util.Scanner;

public class Recursion11 {
    public static int Recurs(){
        Scanner s = new Scanner(System.in);
        int n = s.nextInt();
        if (n==1){
            int m = s.nextInt();
            if (m == 1){
                return Recurs()+n+m;
            }
            else{
                int k = s.nextInt();
                if(k == 1){
                    return Recurs()+m+n+k;
                }
                else{
                    return n+m+k;
                }
            }
        }
        else{
            int m = s.nextInt();
            if (m==1){
                return Recurs()+m+n;
            }
            else{
                return n+m;
            }
        }
    }
    public static void main(String[] args){
        System.out.println(Recurs());
    }
}
