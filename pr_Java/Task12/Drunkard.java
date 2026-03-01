package Task12;

import java.util.*;

public class Drunkard {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("Ведите 5 карт для первого игрока: ");
        Scanner s = new Scanner(System.in);
        Scanner r = new Scanner(System.in);
        int t1 = s.nextInt();
        System.out.println("Ведите 5 карт для второго игрока: ");
        int t2 = r.nextInt();
        int[] b1 = new int[5];
        int[] b2 = new int[5];
        while (t1 > 0) {
            for (int i = b1.length - 1; i >= 0; i--) {
                b1[i] = t1 % 10;
                t1 = t1 / 10;
            }
        }
        while (t2 > 0) {
            for (int i = b2.length - 1; i >= 0; i--) {
                b2[i] = t2 % 10;
                t2 = t2 / 10;
            }
        }
        int count = 0;
        while (b1.length != 0 && b2.length != 0 && count < 106) {
            int card1 = b1[0];
            int card2 = b2[0];
            if ((card1 > card2 || (card1 == 0 && card2 == 9)) && (card1!=9&&card2!=0)) {
                int[] newb1 = new int[b1.length + 1];
                System.arraycopy(b1, 1, newb1, 0, b1.length - 1);
                newb1[newb1.length - 2] = card1;
                newb1[newb1.length - 1] = card2;
                b1 = newb1;
                int[] newb2 = new int[b2.length - 1];
                System.arraycopy(b2, 1, newb2, 0, b2.length - 1);
                b2 = newb2;
                count += 1;
                for(int i =0; i<b2.length;i++)
                {
                    System.out.println(b2[i]);
                }
                System.out.println("==========================");
            } else {
                int[] newb2 = new int[b2.length + 1];
                System.arraycopy(b2, 1, newb2, 0, b2.length - 1);
                newb2[newb2.length - 2] = card2;
                newb2[newb2.length - 1] = card1;
                b2 = newb2;
                int[] newb1 = new int[b1.length - 1];
                System.arraycopy(b1, 1, newb1, 0, b1.length - 1);
                b1 = newb1;
                count += 1;
            }
        }
        if (count == 106) {
            System.out.println("botva");
        }
        if (b2.length == 0) {
            System.out.println("first " + count);
        } else {
            System.out.println("second " + count);
        }
        //Удаление переменной из массива
        /*
        int index = 0;
        int[] newArray = new int[b1.length-1];
        System.arraycopy(b1,0,newArray,0,index);
        System.arraycopy(b1, index+1,newArray,index,b1.length-index-1);
        b1=newArray;
        for(int i= 0; i<b1.length;i++) {
            System.out.println(b1[i]);
        }
         */
    }
}
