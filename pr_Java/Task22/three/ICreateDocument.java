package Task22.three;
import java.io.*;
public interface ICreateDocument <T>{
    IDocument<T> CreateNew();
    IDocument<T> CreateOpen(String path) throws FileNotFoundException;

}
