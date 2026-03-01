package Task6;

public class TestFurnitureShop {
    public static void main(String[] args){
        FurnitureShop f = new FurnitureShop(4);
        System.out.println(f.Asortiment());
        //f.buy(3);
        System.out.println("Куплено: "+"\n"+f.buy(2));

    }
}
