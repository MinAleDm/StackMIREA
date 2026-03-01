package Task1;

public class TestBall {
    public static void main(String[] args){
        Ball b1 = new Ball("yellow", 17);
        Ball b2 = new Ball("black", 44);
        Ball b3 = new Ball("green"); b3.setRad(78);
        b3.initSystem();
        System.out.println(b1.toString());
        System.out.println(b2.toString());
        System.out.println(b3.toString());
    }
}
