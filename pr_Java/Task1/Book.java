package Task1;
public class Book {
    private String name;
    private int number;
    public Book(String n, int a){
        name = n;
        number = a;
    }
    public Book(String n){
        name = n;
        number = 0;
    }
    public Book(){
        name = "leon";
        number = 0;
    }
    public void setNumber(int number){
        this.number = number;
    }
    public void setName(String name){
        this.name = name;
    }
    public String getName(String name){
        return name;
    }
    public int getNumber(){
        return  number;
    }
    public String toString(){
        return this.name+" number str "+number;
    }
}
