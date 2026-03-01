package Task22.two;

import java.util.Scanner;

public class TestChair {
    public static void main(String[] args){
        AbstractChairFactory af = new ChairFactory();
        Scanner s = new Scanner(System.in);
        Client c = new Client();
        System.out.println("Введите 1если нужен старинный стул, 2если нужен магический стул, 3если нужен функциональный стул.");
        int a = s.nextInt();
        if (a ==1){
            VictorianChair v = af.createVictorianChair();
            System.out.println(v.getAge()+" лет");
        }
        if (a ==2){
            MagicChair m = af.createMagicanChair();
            m.doMagic();
        }
        if (a==3){
            FunctionalChair f = af.createFunctionalChair();
            System.out.println("Сумма = "+f.sum(39,12));
        }
        if (a==1||a==2||a==3){
            c.sit();
        }else{
            System.out.println("В каталоге нет такого вида стульев");
        }
    }
}
