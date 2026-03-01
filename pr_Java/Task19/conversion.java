package Task19;

import java.util.ArrayList;

public class conversion<T> {
    public static <T> ArrayList<T> convertArrToList(T[] arr){
            ArrayList<T> conversion_list = new ArrayList<>();
            for (int i = 0; i < arr.length; i++) {
                conversion_list.add((T) arr[i]);
            }
            return conversion_list;
    }
    public static void main(String[] args){
        Integer[] arr = new Integer[] {1,2,3,4,56,7,8};
        System.out.println(convertArrToList(arr));
    }
}
