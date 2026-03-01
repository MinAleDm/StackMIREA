package Task17;

public class Student {
    private int iDNumber;
    private String fio;
    private double GPA;
    public Student(String fio,int iDNumber, double GPA) {
        this.iDNumber = iDNumber;
        this.fio = fio;
        this.GPA = GPA;
    }
    @Override
    public String toString() {
        return fio +
                " (iDNumber: " + iDNumber +
                ", GPA: " + GPA + ")" ;
    }
    public int getiDNumber() {
        return iDNumber;
    }
    public void setiDNumber(int iDNumber) {
        this.iDNumber = iDNumber;
    }
    public String getFio() {
        return fio;
    }
    public void setFio(String fio) {
        this.fio = fio;
    }
    public double getGPA() {
        return GPA;
    }
    public void setGPA(double GPA) {
        this.GPA = GPA;
    }
}


