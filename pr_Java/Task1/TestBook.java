package Task1;

public class TestBook {
    public static void main(String[] args){
        Book b1 = new Book("lord", 123);
        Book b2 = new Book("res", 34);
        Book b3 = new Book("got"); b3.setNumber(78);
        System.out.println(b1);
        System.out.println(b2);
        System.out.println(b3);
    }
}
