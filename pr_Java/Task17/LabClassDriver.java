package Task17;

import java.util.ArrayList;

public class LabClassDriver {
    public int compare(Student stud1, Student stud2) {
        return Double.compare(stud1.getGPA(),stud2.getGPA());
    }
    public void quick_sort(ArrayList<Student> arr, int begin, int end) {
        if (begin < end) {
            int partIndex = part(arr, begin, end);
            quick_sort(arr, begin, partIndex-1);
            quick_sort(arr, partIndex+1, end);
        }
    }
    public int part(ArrayList<Student> arr, int begin, int end) {
        Student pt = arr.get(end);
        int i = (begin - 1);
        for (int j = begin; j < end; j++) {
            if (compare(arr.get(j), pt) >= 0) {
                i++;
                Student swapTemp = arr.get(i);
                arr.set(i, arr.get(j));
                arr.set(j, swapTemp);
            }
        }
        Student swapt = arr.get(i + 1);
        arr.set(i + 1, arr.get(end));
        arr.set(end, swapt);
        return i + 1;
    }
}


