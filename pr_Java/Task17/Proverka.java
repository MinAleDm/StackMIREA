package Task17;

public class Proverka extends Exception{
    public Proverka(String fio){
        super("ИНН "+fio+" не верный");
    }
}
