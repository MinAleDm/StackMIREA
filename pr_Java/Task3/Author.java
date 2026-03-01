package Task3;

public class Author {
    private String name;
    private String email;
    private char gender;
    public Author(String n, String e, char g){
        name = n;
        email = e;
        gender = g;
    }
    public void setName(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public String getEmail(){
        return email;
    }
    public void getGender(char gender){
        this.gender = gender;
    }
    public char setGender(){
        return gender;
    }
    public String toString(){
        return this.name+" ("+gender+") at "+email;
    }

}
