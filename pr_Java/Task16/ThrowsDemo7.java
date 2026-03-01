package Task16;

import java.util.*;

public class ThrowsDemo7 {
    public void getKey() throws Exception {
        Scanner myScanner = new Scanner(System.in);
        String key = myScanner.next();
        printDetails(key);
    }
    public void printDetails(String key) throws Exception {
            String message = getDetails(key);
            System.out.println(message);

    }
    private String getDetails(String key) throws Exception {
        if(Objects.equals(key, "!")){
            throw new Exception("Key set to empty string");
        }
        return "data for " + key;
    }
    public static void main(String[] args) throws Exception {
        ThrowsDemo7 n = new ThrowsDemo7();
        n.getKey();
    }
}
