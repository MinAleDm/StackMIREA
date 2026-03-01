package Task22.one;

public class TestComplex {
    public static void main(String[] args){
        ComplexAbstractFactory c = new ConcreteFactory();
        System.out.println(c.CreateComplex(1,7));
        System.out.println(c.createComplex());
    }
}
