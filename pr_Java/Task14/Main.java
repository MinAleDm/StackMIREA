package Task14;

import java.util.ArrayList;

public class Main {
    static public void main(String[] args){
        WaitList <String> wait = new WaitList<>();
        ArrayList<String> al = new ArrayList<>();
        al.add("O");
        wait.add("L");
        wait.add("O");
        wait.add("L");
        System.out.println(wait);
        wait.remove();
        System.out.println(wait);
        System.out.println("Есть ли 'L' ? - " + wait.contains("L"));
        al.add("D");
        System.out.println("Есть ли 'D'? - " + wait.containsAll(al));
        System.out.println("Список пуст ? - " +  wait.isEmpty());
        System.out.println("------------------------------");
        BoundedWaitList<String> bout = new BoundedWaitList<>(4);
        bout.add("f");
        bout.add("a");
        bout.add("B");
        bout.add("a");
        bout.add("!");
        System.out.println(bout);
        bout.remove();
        System.out.println(bout);
        bout.add("!");
        System.out.println(bout);
        System.out.println("Объем списка: "+bout.getCapacity());
        System.out.println("----------------------------");
        UnfairWaitList<String> unf = new UnfairWaitList<>();
        unf.add("L");
        unf.add("O");
        unf.add("T");
        unf.add("p");
        System.out.println(unf);
        unf.remove("L");
        System.out.println("Попытка удаления первого элемента: "+unf);
        unf.remove("O");
        System.out.println("Удаление элемента: "+unf);
        unf.moveToBack("T");
        System.out.println("Перенос элемента в конец: "+unf);

    }
}
