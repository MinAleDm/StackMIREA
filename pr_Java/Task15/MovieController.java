package Task15;

public class MovieController {
    private Movie model;
    private MovieView view;
    public MovieController(Movie model, MovieView view){
        this.model = model;
        this.view = view;
    }
    public void updet(String imagePath, String date, String opis){
        model.setDate(date);
        model.setOpis(opis);
        view.updateView(imagePath, date, opis);
    }

}
