package Task4;

public class BookTest {
    public static void main(String[] args){
        Book b = new Book("Lev", "Man", 2000);
        b.setAuthor("Pol");
        b.setName("Dog");
        b.setYear(2000);
        System.out.println("Author: "+b.getAuthor()+" name: "+b.getName()+" Year: "+b.getYear());
    }
}
