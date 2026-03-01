package Task17;

import java.util.ArrayList;

public class LabClass {
    public static void main(String[] args) {
        ArrayList<Student> new_stud = new ArrayList<>();
        new_stud.add(new Student("Иванов Иван Иванович", 123456, 4.0));
        new LabClassUI(new_stud);
    }
}

