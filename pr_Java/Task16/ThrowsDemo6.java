package Task16;
public class ThrowsDemo6 {
    public void printMessage(String key){
        try {
            String message = getDetails(key);
            System.out.println(message);
        }catch (Exception e){

        }
        System.out.println(key);
    }
    public  String getDetails(String key){
        if (key == null){
            throw new NullPointerException("null key in getDetails");
        }
        return "data for " + key;
    }
    public static void main(String[] args){
        ThrowsDemo6 n = new ThrowsDemo6();
        n.printMessage("tol");
        n.printMessage(null);
        n.getDetails("kol");
        n.getDetails(null);
    }
}
