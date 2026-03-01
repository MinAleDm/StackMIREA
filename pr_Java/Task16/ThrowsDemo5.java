package Task16;

public class ThrowsDemo5 {
    public static String getDetails1(String key){
        if (key == null) {
            throw new NullPointerException("null key in getDetails");
        }
        return key;
    }
    public static String getDetails(String key){
        try {
            if (key == null){
                throw new NullPointerException("null key in getDetails");

            }
        }catch (NullPointerException e){}
        return "data " + key;
    }
    public static void main(String[] args){
        System.out.println(getDetails(null));
        System.out.println(getDetails1(null));
    }
}
