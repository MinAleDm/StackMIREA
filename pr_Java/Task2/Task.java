package Task2;

import java.util.Arrays;
import java.util.Scanner;

public class Task {
    public static String Factorial(int input) {
        int tr = 1;
        if (input >= 0) {
            for (int i = 1; i < input + 1; i++) {
                tr = tr * i;
            }
            return String.valueOf(tr);
        } else {
            return "ERROR";
        }
    }
    public static void main(String[] args){
        int [] b = new int[] {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
        int f = 0;
        for (int i = 0; i < b.length; i++) {
            f += b[i];
        }
        System.out.println(f);
        System.out.println("1.1----------------");
        int r = 0;
        int t1 = 0;
        while (r < b.length){
            t1 += b[r];
            r +=1;
       }
        System.out.println(t1);
        System.out.println("1.2-----------------");
        int t = 0;
        int t2 = 0;
        do{
            t2 += b[t];
            t += 1;
        }
        while (t<b.length);
        System.out.println(t2);
        System.out.println("2-----------------");
        for (int i = 0; i<args.length;i++) {
            System.out.println("Аргумент = " + args[i]);
        }
        System.out.println("3-----------------");
        for(int i =1;i<11; i++){
            System.out.println(1./i);
        }
        System.out.println("4-----------------");
        int [] ty = new int[10];
        for (int i=0; i<ty.length;i++){
            ty[i] = ((int) (Math.random() * 100));
        }
        System.out.println(Arrays.toString(ty));
        System.out.println("--------------------------------------------------------");
        Arrays.sort(ty);
        System.out.println(Arrays.toString(ty));
        System.out.println("0-----------0");
        for(int i= ty.length-1; i>0; i--){
            for (int j = 0; j<i;j++){
                if (ty[j]>ty[j+1]){
                    int tmp = ty[j+1];
                    ty[j+1] = ty[j];
                    ty[j] = tmp;
                }
            }
        }
        for(int i =0; i<ty.length; i++){
        }
        System.out.println(Arrays.toString(ty));
        System.out.println("5--------------------------------------");
        System.out.println(Factorial(5));
    }
}
