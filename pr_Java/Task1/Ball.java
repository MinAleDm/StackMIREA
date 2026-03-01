package Task1;

import java.util.Scanner;

public class Ball {
    private String colour;
    private int rad;
    public Ball(String n, int a){
        colour = n;
        rad = a;
    }
    public Ball(String n){
        colour = n;
        rad = 0;
    }
    public Ball(){
        colour = "red";
        rad = 0;
    }
    public void setRad(int rad) {
        this.rad = rad;
    }
    public void setColour(String colour) {
        this.colour = colour;
    }
    public String getColour() {
        return colour;
    }
    public int getRad() {
        return rad;
    }
    public String toString(){
        return this.colour+"'s radius "+rad;
    }

    public void initSystem() {
        Scanner scanner = new Scanner(System.in);
        String input;
        input = scanner.next();
        //System.out.println(input);
        Scanner scan = new Scanner(System.in);
        String in;
        in = scan.next();
        System.out.println(input+"'s radius "+in);
    }
}
