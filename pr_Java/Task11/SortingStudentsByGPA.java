package Task11;
import java.util.*;
public class SortingStudentsByGPA implements Comparable<SortingStudentsByGPA>{
    public String name;
    public int bal;

    public SortingStudentsByGPA(String name, int bal) {
        this.name = name;
        this.bal = bal;
    }

    @Override
    public int compareTo(SortingStudentsByGPA o) {
        return o.bal - this.bal;
    }
    public static void main(String[] args){
        List<SortingStudentsByGPA> r = new ArrayList<>();
        r.add(new SortingStudentsByGPA("Nicolai", 123));
        r.add(new SortingStudentsByGPA("Oleg", 200));
        r.add(new SortingStudentsByGPA("Sasha", 260));
        r.add(new SortingStudentsByGPA("Nikita", 250));
        Collections.sort(r);
        for (SortingStudentsByGPA s : r){
            System.out.println(s.name+ " Баллы "+s.bal);
        }
    }
}


