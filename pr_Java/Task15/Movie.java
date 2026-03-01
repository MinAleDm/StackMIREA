package Task15;

public class Movie {
    private String opis;
    private String date;

    public Movie(String opis, String date) {
        this.opis=opis;
        this.date=date;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }
    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}