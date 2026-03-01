package Task22.three;

import java.io.*;

public class TextDocument implements IDocument{
    private String text;
    private String name;

    TextDocument(String name) {
        this.name = name;
    }

    TextDocument(String name, String text) {
        this.name = name;
        this.text = text;
    }
    @Override
    public String getName() {
        return name;
    }
    @Override
    public void setName(String name) {
        this.name = name;
    }
    @Override
    public String getContent() {
        return text;
    }
    @Override
    public void setContent(String text) {
        this.text = text;
    }
    @Override
    public void save() throws IOException {
        BufferedWriter writer = new BufferedWriter(new FileWriter(name));
        writer.write(text);
        writer.close();
    }

}
