package Task6;

public class FurnitureShop {
    private Furniture[] goods;
    public FurnitureShop(int count){
        goods = new Furniture[count];
        for(int i=0; i<count;){
            goods[i++] = new Bed(43, 23, 45, "lol", "metal", 2, 45, "pux");
            if (i>=count) break;
            goods[i++] = new Bed(43, 23, 45, "lul", "derevo", 2, 45, "len");
            if (i>=count) break;
            goods[i++] = new Chair(43, 23, 45, "lyl", "derevo",  "derevo12");
        }
    }
    public Furniture[] getGoods() {
        return goods;
    }
    public Furniture buy(int number){
        Furniture f = goods[number];
        Furniture[] prod = new Furniture[goods.length -1];
        for (int i=0; i<goods.length;i++){
            if (i<number) prod[i] = goods[i];
            if (i>number) prod[i-1] = goods[i];
        }
        goods=prod;
        return f;
    }
    public String Asortiment(){
        String vr = "Асортимент магазина: \n";
        for (Furniture f : goods){
            vr += f.toString()+"\n";
        }
        return vr;
    }
}
