package Task11;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Connection {
    String name;
    int age;

    public Connection(String name, int age) {
        this.name = name;
        this.age = age;
    }


    public static void main(String[] args){
        List<String[]> c =new ArrayList<>();

        c.add(new String[]{"Max", "10"});
        c.add(new String[]{"Nicolai", "20"});
        c.add(new String[]{"Tolic", "19"});
        c.add(new String[]{"Dane", "17"});

        List<String[]> r = new ArrayList<>();
        r.add(new String[]{"Denes","23"});
        r.add(new String[]{"Dasha", "30"});
        r.add(new String[]{"Oleg", "27"});
        //c.addAll(r);
        //System.out.print(c);
        List<String[]> t = mergeSort(c, r);
        for (String[] d: t){
            System.out.println("[" +d[0]+", "+d[1] +"]");
        }
    }
    private static List<String[]> mergeSort(List<String[]> c, List<String[]> r) {
        if (c.size()<=1 && r.size()<=1){
            return merge(c, r);
        }
        int m1 = c.size()/2;
        int m2 = r.size()/2;
        List<String[]> left1 = c.subList(0, m1);
        List<String[]> right1 = c.subList(m1, c.size());
        List<String[]> left2 = r.subList(0,m2);
        List<String[]> right2 = r.subList(m2, r.size());
        List<String[]> sortleft = mergeSort(left1, left2);
        List<String[]> sortright = mergeSort(right1, right2);
        return merge(sortleft, sortright);
    }
    public static List<String[]> merge(List<String[]> left, List<String[]> right) {
        List<String[]> result = new ArrayList<>();
        int i = 0;
        int j = 0;
        while (i < left.size() && j < right.size()) {
            if (Integer.parseInt(left.get(i)[1]) < Integer.parseInt(right.get(j)[1])) {
                result.add(left.get(i));
                i++;
            } else {
                result.add(right.get(j));
                j++;
            }
        }
            while (i < left.size()) {
                result.add(left.get(i));
                i++;
            }
            while (j < right.size()) {
                result.add(right.get(j));
                j++;
            }
        return result;
    }
}

