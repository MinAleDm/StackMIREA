package Task14;

public class UnfairWaitList<E> extends WaitList<E> {
    public UnfairWaitList(){}
    public void remove(E element){
        for(int i =0; i<content.size();i = i) {
            E el = content.remove();
            if(!el.equals(element) | (el.equals(element) && i == 0)){
                content.add(el);
                i++;
            }
        }
    }
    public void moveToBack(E element){
        remove(element);
        content.add(element);
    }
}
