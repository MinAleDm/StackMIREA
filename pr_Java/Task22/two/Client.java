package Task22.two;

import Task22.two.Chair;

public class Client implements Chair {
    Chair chair;
    public void sit(){
        System.out.println("Клиент сел на стул.");
    }
    public void setChair(Chair chair){
        this.chair=chair;
    }
}
