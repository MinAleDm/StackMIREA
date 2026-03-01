package Task17;

import javax.swing.*;

public class StudentNotFoundException extends Throwable {
    public StudentNotFoundException(String fio, LabClassUI t) {
        JOptionPane.showMessageDialog(t, "Студент " + fio + " не найден");
    }
}


