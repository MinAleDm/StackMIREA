package Task11;

public class Student {
    String name;
    int iDNumber;

    public Student(String name, int iDNumber) {
        this.name = name;
        this.iDNumber = iDNumber;
    }
    public void setName(String name){
        this.name=name;
    }
    public String getName(){
        return name;
    }
    public int getiDNumber() {
        return iDNumber;
    }
    public void setiDNumber(int iDNumber) {
        this.iDNumber = iDNumber;
    }
    public static void main(String[] args){
        Student[] s = new Student[6];
        s[0]=new Student("Sol",1);
        s[1]=new Student("Pol",2);
        s[2]=new Student("Kol",3);
        s[3]=new Student("Tol",7);
        s[4]=new Student("Fol",0);
        s[5]=new Student("Rol",4);
        for(int i = 1; i < s.length; i++){
            Student current = s[i];
            int j = i-1;
            while (j>=0 && s[j].getiDNumber() > current.getiDNumber()){
                s[j+1]=s[j];
                j--;
            }
            s[j+1]=current;
        }
        System.out.println("     ");
        for(Student f: s){
            System.out.println("Name: "+f.getName()+" id: "+f.getiDNumber());
        }
    }
}
