package Task18;

public class Matrix <T extends  Number>{
    private T[][] a;
    private T[][] b;
    public Matrix(T[][] a, T[][] b){
        this.a=a;
        this.b=b;
    }
    public void sum(){
        System.out.println("Сумма: ");
        for(int i=0; i<a.length;i++){
           for(int j=0;j<a.length;j++){
                System.out.print(a[i][j].doubleValue()+b[i][j].doubleValue()+" ");
            }
            System.out.println();
        }
    }
    public void print(){
        System.out.println("Матрица A: ");
        for (int i =0;i< a.length;i++){
            for (int j = 0;j<a.length;j++){
                System.out.print(a[i][j]+" ");
            }
            System.out.println();
        }
        System.out.println("Матрица B: ");
        for (int i =0;i< b.length;i++){
            for (int j =0;j<b.length;j++){
                System.out.print(b[i][j]+ " ");
            }
            System.out.println();
        }
    }
    public void multi(){
        double d[][] = new double[a.length][b.length];
        System.out.println("Произведение матриц: ");
        for (int i =0;i<a.length;i++){
            for (int j=0;j<a.length;j++){
                for (int k =0;k<a.length;k++){
                    d[i][j] += a[i][k].doubleValue()*b[k][j].doubleValue();
                }
                System.out.print(d[i][j]+" ");
            }
            System.out.println();
        }
    }
    public static void main(String[] args){
        Integer[][] arra = new Integer[][] {{1,1},{2,3}};
        Integer[][] arrb = new Integer[][] {{5,2},{2,3}};
        Matrix<Integer> arr = new Matrix<>(arra, arrb);
        arr.print();
        arr.sum();
        arr.multi();
    }
}
