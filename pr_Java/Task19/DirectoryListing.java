package Task19;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DirectoryListing {
    public static void main(String[] args) {
        String directoryPath = "D:\\Учеба\\3 семестр\\Java";

        List<String> fileList = listFiles(directoryPath);

        for (int i = 0; i < Math.min(5, fileList.size()); i++) {
            System.out.println(fileList.get(i));
        }
    }
    public static List<String> listFiles(String directoryPath) {
        List<String> fileList = new ArrayList<>();

        File directory = new File(directoryPath);

        File[] files = directory.listFiles();

        if (files != null && files.length > 0) {
            System.out.println("Первые 5 элементов каталога:");

            fileList = Arrays.asList(files).stream().map(File::getName).toList();
        } else {
            System.out.println("Каталог пуст или не существует.");
        }

        return fileList;
    }
}