package Task20;

import java.util.Scanner;
import java.util.Stack;

public class calculator {
    public static void main(String[] args) throws Exception {
        Stack<Double> stack = new Stack<>();
        System.out.println("Введите число в RPN:");
        Scanner sc = new Scanner(System.in);
        String str = sc.nextLine();
        String[] elem = str.split(" ");
        for(int i =0;i< elem.length;i++){
            Double a = 0.0;
            Double b = 0.0;
            switch (elem[i]){
                case "+":
                    a = stack.pop();
                    b = stack.pop();
                    stack.push(b+a);
                    break;
                case "-":
                    a = stack.pop();
                    b = stack.pop();
                    stack.push(b-a);
                    break;
                case "*":
                    a = stack.pop();
                    b = stack.pop();
                    stack.push(a*b);
                    break;
                case "/":
                    a = stack.pop();
                    b = stack.pop();
                    if(a!=0)
                        stack.push(b/a);
                    else {
                        throw new Exception("деление на ноль ");
                    }
                    break;
                default:
                    stack.push(Double.parseDouble(elem[i]));
            }
        }
        System.out.println(stack.pop());
    }
}
