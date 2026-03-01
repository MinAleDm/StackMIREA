package task24;

import java.util.Objects;

public class DrinkTypeEnum {
    public static String Proverc(String n){
        String t = "";
        if (Objects.equals(n, "AL")){
            t = "Предъявите паспор";
        }
        return t;
    }
}
