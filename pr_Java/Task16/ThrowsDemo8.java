package Task16;

import java.util.Objects;
import java.util.Scanner;

public class ThrowsDemo8 {
    public void getKey() {
        boolean r = true;
        while (r)
            try {
                Scanner myScanner = new Scanner(System.in);
                String key = myScanner.next();
                printDetails(key);
                r = false;
            }catch (Exception e){
                r = true;
            }
    }
    public void printDetails(String key) throws Exception {
            String message = getDetails(key);
            System.out.println(message);
    }
    private String getDetails(String key) throws Exception {
        if(Objects.equals(key,"!")){
            throw new Exception("Key set to empty string");
        }
        return "data for " + key;
    }
    public static void main(String[] args) {
        ThrowsDemo8 n = new ThrowsDemo8();
        n.getKey();
    }
}
