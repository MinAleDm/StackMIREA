package Task17;

import java.util.Scanner;

public class FIOINN {
    public void red() {
        System.out.println("Введите ФИО");
        Scanner fi = new Scanner(System.in);
        String fio = fi.nextLine();
        System.out.println("Введите ИНН");
        Scanner in = new Scanner(System.in);
        String[] inn = in.nextLine().split("");
        try {
            if (inn.length == 12) {
                System.out.println("ИНН " + fio + " верный!");
            } else {
                throw new Proverka(fio);
            }
        }catch (Proverka e){
            System.out.println(e.getMessage());
        }
    }
    public static void main(String[] args){
        FIOINN n = new FIOINN();
        n.red();
    }
}
