package Task5;

public class TestMovable {
    public static void main(String[] args){
        MovablePoint m1 = new MovablePoint(3, 4, 6, 7);
        MovableRectangle r1 = new MovableRectangle(5,0,5, 0,9, 8);

        MovableCircle c1 = new MovableCircle(4, 6, 8, 9, 10);
        //System.out.println(((MovableCircle)c1).toString());
        System.out.println(r1);
        c1.moveDown();
        r1.moveUp();
        m1.moveLeft();
        //System.out.println(((MovableCircle)c1).toString());
        System.out.println(r1);
        //System.out.println(m1);
    }
}
