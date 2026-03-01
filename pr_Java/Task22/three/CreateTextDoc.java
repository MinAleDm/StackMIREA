package Task22.three;

import java.io.*;
import java.util.stream.Collectors;

public class CreateTextDoc<T> implements ICreateDocument{
    public IDocument<T> CreateNew() {
        return (IDocument<T>) new TextDocument("Безымянный");
    }

    @Override
    public IDocument<T> CreateOpen(String path) throws FileNotFoundException {
        BufferedReader file = new BufferedReader(new FileReader(path));
        return (IDocument<T>) new TextDocument(path, file.lines().collect(Collectors.joining("\n")));
    }

}
